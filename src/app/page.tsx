import { Approach, Awards, Companies, Qualities, FindMe, GiantCTA, GiantHero, Intro, MarqueeStats, SectionHead, Services, Tagline, wrap } from "@/components/blocks";
import { projects, profile } from "@/data/profile";
import { ContactForm, ProjectStack, ResumeTabs, SkillWords } from "@/components/widgets";

export default function Home() {
  return (
    <>
      <GiantHero word="Marshall" sub={profile.oneLiner} right="Featured Projects" />
      <Intro />
      <ProjectStack items={projects.filter((p) => p.featured)} />
      <Tagline />
      <MarqueeStats />
      <Qualities />
      <Services />
      <Companies />
      <Awards />
      <section id="resume" className={`${wrap} py-24`}>
        <SectionHead eyebrow="3+ years of experience" title="My Résumé" center />
        <ResumeTabs />
      </section>
      <div className="border-t border-line"><Approach /></div>
      <SkillWords />
      <section id="contact" className="border-t border-line bg-surface-2/60 py-24">
        <div className={wrap}>
          <SectionHead eyebrow="Contact" title="Let's work together" center sub={`Messages go straight to ${profile.email}. I reply within 24 hours.`} />
          <ContactForm />
        </div>
      </section>
      <FindMe />
      <GiantCTA eyebrow="Discover the story behind the engineer" word="Who is Marshall?" href="/about/" />
    </>
  );
}
