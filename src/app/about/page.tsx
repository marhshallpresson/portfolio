import type { Metadata } from "next";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { GiantCTA, GiantHero, wrap } from "@/components/blocks";
import { SocialIcon } from "@/components/logos";
import { MaskTitle, Portrait, Reveal } from "@/components/widgets";
import { education, experience, profile, recognition } from "@/data/profile";

export const metadata: Metadata = { title: "About", description: `About ${profile.name}, ${profile.role}.`, alternates: { canonical: "/about/" } };

export default function About() {
  const rows = [
    ...experience.map((e) => ({ year: e.period.replace(" — ", "–").replace("Present", "Now"), title: e.title, org: e.org })),
  ];
  return (
    <>
      <GiantHero word="About" sub="The story behind the engineer: where I started, what I build, and how I work." right="Who is Marshall?" />
      {/* Enny: sticky vCard + content */}
      <section id="next" className={`${wrap} grid gap-12 pb-24 lg:grid-cols-[340px_1fr]`}>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="rounded-3xl border border-line bg-surface p-6 text-center">
            <Portrait className="mx-auto aspect-square w-40" rounded="rounded-3xl" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">{profile.name}</h2>
            <span className="mt-2 inline-block rounded-lg bg-surface-2 px-3 py-1 text-xs">{profile.role}</span>
            <div className="mt-4 flex justify-center gap-2">
              <a href="/contact/" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-ink">Hire me</a>
              <a href={profile.cvFile} download className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-medium"><Download size={14} /> CV</a>
            </div>
            <ul className="mt-6 space-y-4 border-t border-line pt-6 text-left text-sm">
              <li className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-surface-2 text-accent"><Mail size={16} /></span><span><span className="block text-xs uppercase text-muted">Email</span><a href={`mailto:${profile.email}`} className="hover:text-accent">{profile.email}</a></span></li>
              {profile.phones.map((p) => <li key={p.tel} className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-surface-2 text-accent"><Phone size={16} /></span><span><span className="block text-xs uppercase text-muted">Phone</span><a href={`tel:${p.tel}`} className="hover:text-accent">{p.display}</a></span></li>)}
              <li className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-surface-2 text-accent"><MapPin size={16} /></span><span><span className="block text-xs uppercase text-muted">Location</span>{profile.location}</span></li>
            </ul>
            <div className="mt-6 flex justify-center gap-2 border-t border-line pt-6">
              {profile.socials.filter((s) => s.href).map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-9 place-items-center rounded-full border border-line text-muted hover:border-accent hover:text-accent"><SocialIcon name={s.label} size={15} /></a>)}
            </div>
          </Reveal>
        </aside>
        <div>
          <Reveal><h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.03em]">About me</h2><span className="mt-4 block h-1 w-12 rounded bg-accent" /></Reveal>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
            {profile.about.map((t, i) => <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? "text-text" : ""}>{t}</p></Reveal>)}
          </div>

          {/* Ameer certifications-style rows */}
          <h3 className="eyebrow mt-20">Experience</h3>
          <ul className="mt-4 border-t border-line">
            {rows.map((r) => (
              <li key={r.title + r.org} className="group grid grid-cols-[90px_1fr] items-baseline gap-4 border-b border-line py-6 sm:grid-cols-[120px_1fr_auto]">
                <span className="text-sm text-muted">{r.year}</span>
                <MaskTitle as="p" className="cond text-4xl !leading-[0.95] transition-colors group-hover:text-accent sm:text-5xl">{r.title}</MaskTitle>
                <span className="col-start-2 text-sm sm:col-start-auto">{r.org}</span>
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-16">Education</h3>
          <ul className="mt-4 border-t border-line">
            {education.map((e) => (
              <li key={e.title} className="group grid grid-cols-[90px_1fr] items-baseline gap-4 border-b border-line py-6 sm:grid-cols-[120px_1fr_auto]">
                <span className="text-sm text-muted">{e.period.replace(" — ", "–")}</span>
                <MaskTitle as="p" className="cond text-4xl !leading-[0.95] transition-colors group-hover:text-accent sm:text-5xl">{e.title}</MaskTitle>
                <span className="col-start-2 text-sm sm:col-start-auto">{e.org}</span>
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mt-16">Recognition</h3>
          <ul className="mt-4 border-t border-line">
            {recognition.map((r) => (
              <li key={r.title} className="group grid grid-cols-[90px_1fr] items-baseline gap-4 border-b border-line py-6 sm:grid-cols-[120px_1fr_auto]">
                <span className="text-sm text-muted">{r.year}</span>
                <MaskTitle as="p" className="cond text-4xl !leading-[0.95] transition-colors group-hover:text-accent sm:text-5xl">{r.title}</MaskTitle>
                <span className="col-start-2 text-sm sm:col-start-auto"><span className="font-semibold text-accent">{r.place}</span> · {r.org}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <GiantCTA eyebrow="Interested to explore more of my work?" word="Projects" href="/projects/" />
    </>
  );
}
