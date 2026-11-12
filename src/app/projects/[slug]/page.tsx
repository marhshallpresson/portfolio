import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { wrap } from "@/components/blocks";
import { TechIcon } from "@/components/logos";
import { MaskTitle, Pattern, ProjectLogo, Reveal, ShotGallery } from "@/components/widgets";
import { projects } from "@/data/profile";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name}: ${p.kicker}`, description: p.summary, alternates: { canonical: `/projects/${p.slug}/` } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const ink = p.ink === "light" ? "text-white" : "text-[#0b0b0c]";
  const blocks = [["Problem", p.problem], ["Approach", p.approach], ["Engineering decisions", p.decisions], ["Challenges", p.challenges]] as const;

  return (
    <>
      {/* Ameer: full-colour project hero */}
      <section className={`relative flex min-h-[100svh] flex-col overflow-hidden ${ink}`} style={{ backgroundColor: p.color }}>
        <Pattern kind={p.pattern} />
        <div className="relative flex flex-1 items-center justify-center px-5 pt-20 text-center">
          <MaskTitle as="h1" className="cond text-[30vw] sm:text-[19vw]">{p.name}</MaskTitle>
        </div>
        <div className="relative mx-auto grid w-full max-w-[1200px] gap-10 px-5 pb-14 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed opacity-95">{p.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
              <div><dt className="font-semibold">Role</dt><dd className="opacity-80">{p.role}</dd></div>
              <div><dt className="font-semibold">Date</dt><dd className="opacity-80">{p.year}</dd></div>
              <div><dt className="font-semibold">Platform</dt><dd className="opacity-80">{p.platform}</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0b0b0c]">Visit live site <ArrowUpRight size={15} /></a>}
              {p.link && <a href={p.link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-medium">{p.link.label} <ArrowUpRight size={15} /></a>}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:justify-self-end"><ProjectLogo p={p} size={56} /></Reveal>
        </div>
      </section>

      {p.shots?.length ? (
        <section className={`${wrap} pt-24`}>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">Screens</p><h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em]">See it working</h2></div>
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink">Open {p.live.replace(/^https?:\/\//, "")} <ArrowUpRight size={15} /></a>}
          </Reveal>
          <Reveal><ShotGallery shots={p.shots} url={p.live} name={p.name} /></Reveal>
        </section>
      ) : null}

      {/* Oladiipo: structured case study */}
      <section className={`${wrap} py-24`}>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Case study</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em]">{p.kicker}</h2>
        </Reveal>
        <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {blocks.map(([h, body], i) => (
            <Reveal key={h} delay={(i % 2) * 0.06}>
              <p className="eyebrow">{h}</p>
              <p className="mt-3 text-[17px] leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 rounded-2xl border border-line bg-surface p-8">
          <p className="eyebrow">Result</p>
          <p className="mt-3 text-xl leading-relaxed">{p.result}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((t) => <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs"><TechIcon name={t} size={13} />{t}</li>)}
          </ul>
        </Reveal>
        <div className="mt-10 text-center"><a href="/projects/" className="text-sm font-medium underline underline-offset-4">View All Projects</a></div>
      </section>

      {/* Ameer: next project transition */}
      <a href={`/projects/${next.slug}/`} data-cursor="Next" className={`group relative block overflow-hidden py-28 text-center ${next.ink === "light" ? "text-white" : "text-[#0b0b0c]"}`} style={{ backgroundColor: next.color }}>
        <Pattern kind={next.pattern} />
        <p className="relative text-[13px] uppercase tracking-[0.16em] opacity-80">Next project</p>
        <p className="cond relative mt-4 text-[24vw] transition duration-700 group-hover:scale-105 sm:text-[15vw]">{next.name}</p>
      </a>
    </>
  );
}
