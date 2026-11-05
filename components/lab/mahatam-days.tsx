"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type Day = { day: string; title: string; cover: string; href: string }

/** Pick a day of Dussehra Mahatam: the cover, the question it asks, and a link to the reel. */
export function MahatamDays({ days }: { days: Day[] }) {
  const [i, setI] = React.useState(days.length - 1)
  const d = days[i]
  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
      <div className="relative mx-auto w-full max-w-[320px]">
        <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle,#e8c27a33,transparent_70%)] blur-2xl" />
        {days.map((x, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={x.day}
            src={x.cover}
            alt={k === i ? `Dussehra Mahatam ${x.day} cover` : ""}
            className={cn(
              "aspect-[9/16] w-full rounded-[1.75rem] border border-white/15 object-cover shadow-2xl transition duration-700",
              k === i ? "relative opacity-100" : "absolute inset-0 scale-95 opacity-0",
            )}
          />
        ))}
      </div>

      <div>
        <div role="tablist" aria-label="Choose a day" className="flex flex-wrap gap-2">
          {days.map((x, k) => (
            <button
              key={x.day}
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs transition",
                k === i ? "border-[#e8c27a] bg-[#e8c27a] text-[#0b1330]" : "border-white/15 text-white/60 hover:border-white/40 hover:text-white",
              )}
            >
              {x.day}
            </button>
          ))}
        </div>
        <div key={d.day} className="page-in mt-10">
          <p className="font-mono text-xs tracking-[0.3em] text-[#e8c27a] uppercase">Dussehra Mahatam · {d.day}</p>
          <h3 className="mt-4 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">{d.title}</h3>
          <a href={d.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm transition hover:border-white/60">
            Watch the reel <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
