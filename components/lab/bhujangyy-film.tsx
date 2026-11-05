"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Scene, Callout, band, ramp } from "./bhujangyy-scene"
import { cn } from "@/lib/utils"

const gurmukhi = { fontFamily: '"Noto Serif Gurmukhi", serif' }
const insta = "https://www.instagram.com/bhujangyy/"

/** the page's chapters, shown top-left like a film's reel counter */
const CHAPTERS = [
  { id: "legend", label: "01 / The legend" },
  { id: "bana", label: "02 / The bana" },
  { id: "shastar", label: "03 / The shastar" },
  { id: "saga", label: "04 / The saga" },
]

function Nav() {
  const [ch, setCh] = React.useState(0)
  const [light, setLight] = React.useState(false)
  React.useEffect(() => {
    const on = () => {
      const mid = window.innerHeight * 0.5
      let k = 0
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top <= mid) k = i
      })
      setCh(k)
      setLight(k === 1)
    }
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])
  return (
    <header className={cn("fixed inset-x-0 top-4 z-40 px-5 transition-colors duration-700 sm:px-8", light ? "text-[#1d1a16]" : "text-[#f4ede2]")}>
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4">
        <a href="#legend" className="flex items-baseline gap-2.5">
          <span className="font-serif text-xl tracking-wide">Bhujangyy</span>
          <span className="text-xs opacity-60" style={gurmukhi}>
            ਭੁਜੰਗੀ
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-[13px] md:flex">
          {CHAPTERS.slice(1).map((c) => (
            <a key={c.id} href={`#${c.id}`} className="opacity-70 transition hover:opacity-100">
              {c.label.split(" / ")[1].replace(/^the /, "The ")}
            </a>
          ))}
          <a href={insta} target="_blank" rel="noreferrer" className="border-b border-current pb-0.5">
            Follow
          </a>
        </nav>
        <a href={insta} target="_blank" rel="noreferrer" className="border-b border-current pb-0.5 text-[13px] md:hidden">
          Follow
        </a>
      </div>
      <div className="mx-auto mt-3 flex max-w-[90rem] items-center justify-between border-b border-current/25 pb-2 font-mono text-[10px] tracking-[0.18em] uppercase opacity-80">
        <span>{CHAPTERS[ch].label}</span>
        <span className="tracking-normal normal-case" style={gurmukhi}>
          ਨਿਹੰਗ ਸਿੰਘ
        </span>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ scenes */

function Legend() {
  return (
    <Scene
      id="legend"
      name="hero"
      frames={96}
      height={460}
      className="bg-[radial-gradient(60%_75%_at_50%_45%,#b3132f_0%,#6d0718_48%,#1c0207_100%)] text-[#f7efe4]"
      focus={() => 0.5}
      behind={(p) => {
        const t3 = ramp(p, 0.8, 0.96)
        return (
          // the name rises behind him, so he stands in front of it
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[14%] text-center select-none sm:top-[11%]" style={{ opacity: t3, transform: `translateY(${(1 - t3) * 60}px)` }}>
            <span className="block font-serif text-[clamp(3.4rem,15vw,15rem)] leading-none tracking-[0.01em] text-[#f7efe4]/95 [text-shadow:0_10px_80px_rgba(40,0,8,.5)]">BHUJANGYY</span>
          </div>
        )
      }}
    >
      {(p) => {
        const t1 = band(p, 0, 0.02, 0.26, 0.34)
        const t2 = band(p, 0.42, 0.5, 0.68, 0.76)
        const t3 = ramp(p, 0.84, 0.97)
        return (
          <>
            {/* dim at first: the light finds him as you scroll */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: 0.5 * (1 - ramp(p, 0, 0.36)) }} />
            <div className="absolute inset-0 mx-auto flex max-w-[90rem] items-end px-5 pb-[12vh] sm:px-8 md:items-center md:pb-0" style={{ opacity: t1 }}>
              <div className="max-w-md max-md:rounded-2xl max-md:bg-[#1c0207]/55 max-md:p-4 max-md:backdrop-blur-md" style={{ transform: `translateY(${(1 - t1) * 20}px)` }}>
                <h1 className="font-serif text-[clamp(3.2rem,7vw,7rem)] leading-[0.95] [text-shadow:0_2px_40px_rgba(0,0,0,.35)]">
                  A legend
                  <br />
                  <em>in blue.</em>
                </h1>
                <p className="mt-6 max-w-xs text-sm leading-relaxed opacity-85">
                  Bhujangyy is a young Nihang Singh — the face of cinematic Sikh storytelling. Katha, history and the Dasam Granth, told frame by frame.
                </p>
              </div>
            </div>
            <p className="absolute right-5 bottom-[5vh] text-xs sm:right-8" style={{ opacity: t1 * 0.85 }}>
              <span style={gurmukhi}>ਹਨੇਰੇ ਤੋਂ</span> · Out of the dark
            </p>
            <div className="absolute right-5 bottom-[9vh] max-w-[20rem] text-right [text-shadow:0_2px_24px_rgba(40,0,8,.7)] sm:right-[8vw] md:top-[42%] md:bottom-auto" style={{ opacity: t2, transform: `translateY(${(1 - t2) * 16}px)` }}>
              <p className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none">
                He looks up.
                <br />
                <em>Steel in hand.</em>
              </p>
              <p className="mt-4 text-xs leading-relaxed opacity-80">Barely grown, already Akal&apos;s soldier — every reel begins with him.</p>
            </div>
            <div className="absolute inset-x-0 bottom-[6vh] text-center [text-shadow:0_2px_20px_rgba(40,0,8,.8)]" style={{ opacity: t3 }}>
              <p className="text-2xl" style={gurmukhi}>
                ਭੁਜੰਗੀ
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.3em] uppercase opacity-80">Young · Fearless · Unshakeable</p>
            </div>
            <ScrollHint show={1 - ramp(p, 0, 0.06)} />
          </>
        )
      }}
    </Scene>
  )
}

function Bana() {
  return (
    <Scene
      id="bana"
      name="mark"
      frames={90}
      height={420}
      className="bg-[#efe9df] text-[#1d1a16]"
      focus={() => 0.5}
      stageClass="md:left-[14vw] md:-right-[14vw]"
      overlay={(p, at) => {
        const c = band(p, 0.06, 0.12, 0.92, 1)
        return (
          <div className="text-[#1d1a16]">
              <Callout at={at("chakkar")} label="Chakkar" note="Steel rings, armour and a weapon in one" show={c} />
              <Callout at={at("farla")} label="Farla" note="The flowing banner of the Akali" show={c} side="left" />
              <Callout at={at("dumalla")} label="Dumalla" note="Tall, layered, tied by hand each morning" show={c * ramp(p, 0.4, 0.5)} />
            </div>
        )
      }}
    >
      {(p) => {
        const intro = band(p, 0, 0.04, 0.2, 0.28)
        const mid = band(p, 0.3, 0.38, 0.72, 0.8)
        const end = ramp(p, 0.84, 0.94)
        return (
          <>
            <div className="absolute inset-0 mx-auto flex max-w-[90rem] items-end px-5 pb-[10vh] sm:px-8 md:items-center md:pb-0">
              <div className="relative max-w-sm md:max-w-xl">
                <div style={{ opacity: intro }} className="absolute bottom-0 left-0 w-[min(22rem,calc(100vw-2.5rem))] md:static md:w-auto max-md:rounded-2xl max-md:bg-[#efe9df]/85 max-md:p-4 max-md:backdrop-blur-md">
                  <h2 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95]">
                    The mark of
                    <br />
                    <em>a Nihang.</em>
                  </h2>
                  <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#1d1a16]/65">
                    Royal blue, wound by hand and ringed in steel. Nothing on the dumalla is decoration — every piece is a vow.
                  </p>
                </div>
                <div style={{ opacity: mid }} className="absolute bottom-0 left-0 w-max md:top-1/2 md:bottom-auto md:-translate-y-1/2 max-md:rounded-2xl max-md:bg-[#efe9df]/85 max-md:p-4 max-md:backdrop-blur-md">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-60">02 / The bana</p>
                  <h2 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95]">
                    Light finds
                    <br />
                    <em>every fold.</em>
                  </h2>
                </div>
                <div style={{ opacity: end }} className="absolute bottom-0 left-0 w-max md:top-1/2 md:bottom-auto md:-translate-y-1/2 max-md:rounded-2xl max-md:bg-[#efe9df]/85 max-md:p-4 max-md:backdrop-blur-md">
                  <h2 className="font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95]">
                    Worn the same
                    <br />
                    <em>since 1699.</em>
                  </h2>
                </div>
              </div>
            </div>
            <p className="absolute bottom-6 left-5 font-mono text-[10px] tracking-[0.2em] text-[#1d1a16]/50 uppercase sm:left-8">Bhujangyy · Cinematic Sikh storytelling</p>
          </>
        )
      }}
    </Scene>
  )
}

function Shastar() {
  return (
    <Scene
      id="shastar"
      name="shastar"
      frames={72}
      height={380}
      className="bg-[radial-gradient(80%_80%_at_62%_40%,#1a2a5c_0%,#0b1330_55%,#05070f_100%)] text-[#f4ede2]"
      focus={(p) => 0.5 + 0.06 * ramp(p, 0.3, 0.7)}
      stageClass="md:left-[12vw] md:-right-[12vw]"
      overlay={(p, at) => {
        const c = band(p, 0.08, 0.14, 0.9, 1)
        return (
            <div className="text-[#f4ede2]">
              <Callout at={at("kirpan")} label="Kirpan" note="Carried at the waist, always" show={c} />
              <Callout at={at("jamdhar")} label="Jamdhar" note="The broad, curved blade in his hand" show={c} side="left" />
              <Callout at={at("kara")} label="Kara" note="Iron at the wrist, a circle with no end" show={c} />
              <Callout at={at("gatra")} label="Gatra" note="The strap that holds the kirpan" show={c * ramp(p, 0.3, 0.4)} side="left" />
              <Callout at={at("dhal")} label="Dhal" note="The shield, worn on the back" show={c} />
            </div>
        )
      }}
    >
      {(p) => {
        const t1 = band(p, 0, 0.05, 0.3, 0.38)
        const t2 = ramp(p, 0.78, 0.9)
        return (
          <>
            <div className="absolute inset-0 mx-auto flex max-w-[90rem] items-end px-5 pb-[10vh] sm:px-8 md:items-center md:pb-0">
              <div className="max-w-sm max-md:rounded-2xl max-md:bg-[#05070f]/70 max-md:p-4 max-md:backdrop-blur-md" style={{ opacity: t1 }}>
                <p className="font-mono text-[10px] tracking-[0.25em] text-[#e8c27a] uppercase">03 / The shastar</p>
                <h2 className="mt-3 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95]">
                  Iron that
                  <br />
                  <em>keeps faith.</em>
                </h2>
                <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-75">Sarbloh — all-iron. The shastar of a Nihang are carried as a promise to protect, never to provoke.</p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-[9vh] text-center [text-shadow:0_2px_30px_rgba(5,7,15,.9)]" style={{ opacity: t2 }}>
              <p className="font-serif text-[clamp(2.2rem,5vw,4.4rem)] leading-none">
                Protector of <em>the weak.</em>
              </p>
              <p className="mt-3 text-sm opacity-75" style={gurmukhi}>
                ਸੂਰਾ ਸੋ ਪਹਿਚਾਨੀਐ ਜੁ ਲਰੈ ਦੀਨ ਕੇ ਹੇਤ
              </p>
            </div>
          </>
        )
      }}
    </Scene>
  )
}

function ScrollHint({ show }: { show: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase" style={{ opacity: show }}>
      Scroll
      <span className="block h-10 w-px animate-pulse bg-current" />
    </div>
  )
}

export function BhujangyyFilm() {
  return (
    <>
      <Nav />
      <Legend />
      <Bana />
      <Shastar />
    </>
  )
}

export function FollowLinks() {
  const links = [
    { label: "Watch on Instagram", href: insta },
    { label: "Follow on Facebook", href: "https://www.facebook.com/share/1A8UsCwBqm/?mibextid=wwXIfr" },
  ]
  return (
    <ul className="w-full max-w-xs space-y-3">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-[#f4ede2]/25 pb-3 text-sm transition hover:border-[#e8c27a]">
            {l.label} <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e8c27a]" />
          </a>
        </li>
      ))}
    </ul>
  )
}
