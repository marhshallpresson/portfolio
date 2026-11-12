import type { Metadata } from "next";
import { FindMe, GiantCTA, GiantHero, wrap } from "@/components/blocks";
import { ContactForm, HireForm, MaskTitle, Reveal } from "@/components/widgets";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Contact", description: `Hire or contact ${profile.name}.`, alternates: { canonical: "/contact/" } };

export default function Contact() {
  return (
    <>
      <GiantHero word="Contact" sub="Hiring, or need a contractor? Tell me about the role or project." right="Let's Connect" />
      <section id="next" className={`${wrap} pb-24`}>
        <Reveal className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
          <div><p className="text-lg font-semibold">Prefer to talk it through?</p><p className="text-sm text-muted">Pick a time that works for you. 30-minute intro call.</p></div>
          <a href={profile.booking} target="_blank" rel="noreferrer" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-ink">Let's talk: book on Cal.com</a>
        </Reveal>
        <Reveal><HireForm /></Reveal>
      </section>
      <section className={`${wrap} grid gap-12 pb-12 md:grid-cols-[1fr_1.4fr]`}>
        <MaskTitle className="cond text-[22vw] sm:text-[12vw] md:text-[8rem]">Let&apos;s talk</MaskTitle>
        <Reveal><ContactForm variant="line" /></Reveal>
      </section>
      <FindMe />
      <GiantCTA eyebrow="Interested to explore more of my work?" word="Projects" href="/projects/" />
    </>
  );
}
