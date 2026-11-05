"use client"

import * as React from "react"
import { asset } from "@/components/lab/bhujangyy-asset"
import { cn } from "@/lib/utils"

/** where each named feature sits in every frame: [x 0..1, y 0..1 from top, visible 0|1] */
export type Track = { frames: number; track: Record<string, Record<string, [number, number, number]>> }

type Proj = (feature: string) => { x: number; y: number; on: boolean } | null

/**
 * A scroll-scrubbed film: a tall block whose inner frame sticks to the screen
 * while you scroll through it, drawing one rendered frame of the 3D character
 * per step onto a canvas. Overlays get the progress (0..1) and a projector that
 * says where a named feature (the khanda, the kirpan…) is on screen right now.
 */
export function Scene({
  name,
  frames,
  height = 400,
  className,
  focus = () => 0.5,
  children,
  overlay,
  behind,
  stageClass,
  id,
}: {
  name: string
  frames: number
  /** scroll length, in % of the screen height */
  height?: number
  className?: string
  /** horizontal point of the frame to keep in view on narrow screens, from the progress */
  focus?: (p: number) => number
  children?: (p: number, at: Proj) => React.ReactNode
  /** drawn on top of the film, moving with it (callouts) */
  overlay?: (p: number, at: Proj) => React.ReactNode
  /** drawn under the film, so the character stands in front of it (a title) */
  behind?: (p: number) => React.ReactNode
  /** classes for the film's own box, e.g. to nudge the character off-centre on wide screens */
  stageClass?: string
  id?: string
}) {
  const box = React.useRef<HTMLDivElement>(null)
  const cvs = React.useRef<HTMLCanvasElement>(null)
  const [view, setView] = React.useState({ p: 0, g: { sx: 0, sy: 0, sw: 1280, sh: 720, iw: 1280, ih: 720 } })
  const [track, setTrack] = React.useState<Track | null>(null)
  const geo = React.useRef(view.g)
  const focusRef = React.useRef(focus)
  React.useEffect(() => {
    focusRef.current = focus
  })

  React.useEffect(() => {
    const el = box.current
    const c = cvs.current
    if (!el || !c) return
    const ctx = c.getContext("2d")!
    const imgs: HTMLImageElement[] = new Array(frames)
    const src = (i: number) => asset(`/lab/bhujangyy/${name}/${String(i).padStart(3, "0")}.webp`)
    let started = false
    let last = -1
    let raf = 0
    let alive = true

    fetch(asset(`/lab/bhujangyy/${name}/track.json`))
      .then((r) => r.json())
      .then((t: Track) => alive && setTrack(t))
      .catch(() => {})

    // coarse frames first so scrubbing works at once, then fill the gaps
    const load = () => {
      if (started) return
      started = true
      const order: number[] = []
      for (const step of [8, 4, 2, 1]) for (let i = 0; i < frames; i += step) if (!order.includes(i)) order.push(i)
      let k = 0
      const next = () => {
        if (!alive || k >= order.length) return
        const i = order[k++]
        const im = new Image()
        im.decoding = "async"
        im.onload = () => {
          imgs[i] = im
          if (i === 0 || last < 0) draw(true)
          next()
        }
        im.onerror = next
        im.src = src(i)
      }
      for (let n = 0; n < 4; n++) next()
    }

    const nearest = (i: number) => {
      for (let d = 0; d < frames; d++) {
        if (imgs[i - d]) return imgs[i - d]
        if (imgs[i + d]) return imgs[i + d]
      }
      return null
    }

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      c.width = Math.round(c.clientWidth * dpr)
      c.height = Math.round(c.clientHeight * dpr)
      last = -1
    }

    const progress = () => {
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      return Math.min(1, Math.max(0, -r.top / Math.max(1, span)))
    }

    const draw = (force = false) => {
      const pr = progress()
      const i = Math.round(pr * (frames - 1))
      if (i === last && !force) return
      const im = nearest(i)
      if (!im) return
      last = i
      const cw = c.width
      const ch = c.height
      const iw = im.naturalWidth
      const ih = im.naturalHeight
      // cover the canvas, keeping the focus point in view
      const s = Math.max(cw / iw, ch / ih)
      const sw = cw / s
      const sh = ch / s
      const fx = focusRef.current(pr) * iw
      const sx = Math.min(iw - sw, Math.max(0, fx - sw / 2))
      const sy = (ih - sh) / 2
      geo.current = { sx, sy, sw, sh, iw, ih }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(im, sx, sy, sw, sh, 0, 0, cw, ch)
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const pr = progress()
      draw()
      const g = geo.current
      setView((old) => (Math.abs(old.p - pr) > 0.001 || old.g !== g ? { p: pr, g } : old))
    }

    size()
    const ro = new ResizeObserver(() => {
      size()
      draw(true)
    })
    ro.observe(c)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load()
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(tick)
        } else cancelAnimationFrame(raf)
      },
      { rootMargin: "150% 0px" },
    )
    io.observe(el)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [name, frames])

  const { p, g } = view
  const at: Proj = (f) => {
    if (!track) return null
    const i = Math.round(p * (track.frames - 1))
    const v = track.track[String(i)]?.[f]
    if (!v) return null
    const x = ((v[0] * g.iw - g.sx) / g.sw) * 100
    const y = ((v[1] * g.ih - g.sy) / g.sh) * 100
    return { x, y, on: v[2] === 1 && x > 4 && x < 96 && y > 6 && y < 94 }
  }

  return (
    <section ref={box} id={id} className={cn("relative", className)} style={{ height: `${height}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {behind?.(p)}
        <div className={cn("absolute inset-0", stageClass)}>
          <canvas ref={cvs} aria-hidden="true" className="absolute inset-0 size-full" />
          {overlay?.(p, at)}
        </div>
        {children?.(p, at)}
      </div>
    </section>
  )
}

/** a 0..1 ramp of `p` between a and b */
export const ramp = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)))
/** visible between a and d, fading in over a..b and out over c..d */
export const band = (p: number, a: number, b: number, c: number, d: number) => Math.min(ramp(p, a, b), 1 - ramp(p, c, d))

/** a hairline label pinned to a point on the character */
export function Callout({ at, label, note, side = "right", show }: { at: { x: number; y: number; on: boolean } | null; label: string; note: string; side?: "left" | "right"; show: number }) {
  if (!at) return null
  const o = at.on ? show : 0
  if (at.x > 58) side = "left"
  else if (at.x < 36) side = "right"
  return (
    <div
      className="pointer-events-none absolute z-10 transition-opacity duration-300"
      style={{ left: `${at.x}%`, top: `${at.y}%`, opacity: o }}
    >
      <span className="absolute -top-1 -left-1 block size-2 rounded-full bg-current shadow-[0_0_0_4px_color-mix(in_oklab,currentColor_18%,transparent)]" />
      <span className={cn("absolute top-0 block h-px w-14 bg-current/60 sm:w-24", side === "right" ? "left-1" : "right-1")} />
      <span className={cn("absolute -top-2 block w-max max-w-[11rem] sm:max-w-[14rem]", side === "right" ? "left-16 sm:left-[6.5rem]" : "right-16 text-right sm:right-[6.5rem]")}>
        <span className="block font-serif text-base leading-none italic sm:text-lg">{label}</span>
        <span className="mt-1 block text-[11px] leading-snug opacity-70">{note}</span>
      </span>
    </div>
  )
}
