import type { Metadata } from "next"
import "@fontsource/noto-serif-gurmukhi/400.css"
import "@fontsource/noto-serif-gurmukhi/700.css"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/500-italic.css"
import { ArrowUpRight } from "lucide-react"
import { LabBar, LabFooterNote } from "@/components/lab/lab-bar"
import { MahatamDays, type Day } from "@/components/lab/mahatam-days"
import { Reveal } from "@/components/site/reveal"
import { BhujangyyFilm, FollowLinks } from "@/components/lab/bhujangyy-film"
import { asset } from "@/lib/data"

export const metadata: Metadata = {
  title: "Bhujangyy — concept website",
  description: "Bhujangyy: a young Nihang Singh and the face of cinematic Sikh storytelling. A scroll-driven concept site.",
}

const gurmukhi = { fontFamily: '"Noto Serif Gurmukhi", serif' }
const reel = (code: string) => `https://www.instagram.com/reel/${code}/`
const cover = (code: string) => asset(`/work/${code}.jpg`)
const insta = "https://www.instagram.com/bhujangyy/"

const parts = [
  { code: "De2-7D0BEHB", part: "Part 41", line: "Krishna looses the Rudrastra into the sky." },
  { code: "Dewq-vvTCi8", part: "Part 40", line: "Kuber's whole army takes the field." },
]

const days: Day[] = [
  { day: "Day 2", title: "Why does Bachitar Natak open by saluting the Khadag?", code: "DeYDq3bhMoB" },
  { day: "Day 3", title: "Why is Chandi di Vaar read on Dussehra?", code: "DeaodhGhEDp" },
  { day: "Day 4", title: "Is Raktbeej still alive today?", code: "DedNQc0hi_6" },
  { day: "Day 5", title: "How does a defeated mind become king again?", code: "DegdzaezHzb" },
  { day: "Day 6", title: "Which war, once won, brings true peace?", code: "DeiW1j6B7qq" },
  { day: "Day 7", title: "Why did Guru Sahib write the stories of the avatars?", code: "Dek7oxtBzZx" },
  { day: "Day 8", title: "Are shastars only iron — or something more?", code: "DengdDrhElE" },
  { day: "Day 9", title: "Which Ravan really dies on Dussehra?", code: "DeqFOaaB7zp" },
  { day: "Day 10", title: "Bhog: the essence of ten days of vichaar.", code: "DesAiuEzkA_" },
].map((d) => ({ day: d.day, title: d.title, cover: cover(d.code), href: reel(d.code) }))

export default function BhujangyyConcept() {
  return (
    <div className="min-h-screen bg-[#070b1c] text-[#f4ede2] [--font-serif:'Cormorant_Garamond',serif] [&_.font-serif]:[font-family:'Cormorant_Garamond',ui-serif,serif] [&_.font-serif]:font-medium">
      <LabBar className="fixed inset-x-0 top-0 bg-black/40 text-white/75 backdrop-blur-md" />
      <BhujangyyFilm />

      {/* ---------- the saga ---------- */}
      <section id="saga" className="relative bg-[linear-gradient(180deg,#05070f_0%,#0d1b48_40%,#0d1b48_100%)]">
        <div className="mx-auto max-w-[90rem] px-5 pt-32 pb-24 sm:px-8">
          <Reveal className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#e8c27a] uppercase">04 / The saga</p>
              <h2 className="mt-4 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92]">
                Step into
                <br />
                <em>Kharag Singh Yudh.</em>
              </h2>
              <p className="mt-6 text-xl text-[#e8c27a]" style={gurmukhi}>
                ਖੜਗ ਸਿੰਘ ਯੁੱਧ · ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ ਸਾਹਿਬ
              </p>
            </div>
            <p className="max-w-sm text-[#f4ede2]/70">
              The war of Kharag Singh from the Dasam Granth, told scene by scene in cinematic reels — with Giani Sher Singh Ji&apos;s katha as the voice. 41 parts and counting.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parts.map((p, i) => (
              <Reveal key={p.code} delay={i * 100}>
                <a href={reel(p.code)} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-[1.25rem] border border-[#f4ede2]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cover(p.code)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-1000 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#e8c27a] uppercase">{p.part}</span>
                    <span className="mt-2 block font-serif text-3xl leading-tight">{p.line}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm opacity-80 transition group-hover:gap-2">
                      Watch the reel <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={200}>
              <a href={insta} target="_blank" rel="noreferrer" className="group flex h-full min-h-[20rem] flex-col justify-between rounded-[1.25rem] border border-[#e8c27a]/30 bg-[radial-gradient(100%_80%_at_0%_0%,#e8c27a22,transparent_60%)] p-6 transition hover:border-[#e8c27a]">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#e8c27a] uppercase">Parts 1 — 41</span>
                <span>
                  <span className="block font-serif text-4xl leading-tight">
                    Every part,
                    <br />
                    <em>in order.</em>
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm opacity-80 transition group-hover:gap-2">
                    @bhujangyy on Instagram <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* ---------- dussehra mahatam ---------- */}
        <div id="mahatam" className="border-t border-[#f4ede2]/10">
          <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8">
            <Reveal className="mb-14">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#e8c27a] uppercase">With Giani Birbal Singh Ji</p>
              <h2 className="mt-4 text-5xl leading-[1.25] sm:text-6xl" style={gurmukhi}>
                ਦੁਸਹਿਰਾ ਮਹਾਤਮ
              </h2>
              <p className="mt-4 max-w-xl text-[#f4ede2]/65">
                Ten days of katha and vichaar, one question each day — closing with the bhog samagam at Gurdwara Shahidi Bagh, Sri Anandpur Sahib.
              </p>
            </Reveal>
            <MahatamDays days={days} />
          </div>
        </div>

        {/* ---------- close ---------- */}
        <div className="border-t border-[#f4ede2]/10">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-28 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <Reveal>
              <h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92]">
                Walk with
                <br />
                <em>Bhujangyy.</em>
              </h2>
              <p className="mt-7 text-xl leading-relaxed text-[#e8c27a] sm:text-2xl" style={gurmukhi}>
                ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ · ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ
              </p>
            </Reveal>
            <Reveal delay={120} className="md:justify-self-end">
              <FollowLinks />
            </Reveal>
          </div>
          <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 border-t border-[#f4ede2]/10 px-5 py-8 sm:px-8">
            <span className="font-serif text-xl">Bhujangyy</span>
            <LabFooterNote />
          </div>
        </div>
      </section>
    </div>
  )
}
