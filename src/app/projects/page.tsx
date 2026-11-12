import type { Metadata } from "next";
import { GiantCTA, GiantHero, ProjectCard, wrap } from "@/components/blocks";
import { Reveal } from "@/components/widgets";
import { projects } from "@/data/profile";

export const metadata: Metadata = { title: "Projects", description: "Selected products, client apps and open-source tools by Marshall Presson.", alternates: { canonical: "/projects/" } };

export default function Projects() {
  return (
    <>
      <GiantHero word="Projects" sub="Products I lead, apps I built for clients, and open-source tools I wrote because I needed them." right={`${projects.length} in total`} />
      <section id="next" className={`${wrap} grid gap-x-12 gap-y-20 pb-24 md:grid-cols-2`}>
        {projects.map((p, i) => (
          <Reveal key={p.slug} className={i % 2 ? "md:mt-40" : ""} delay={(i % 2) * 0.08}>
            <ProjectCard p={p} tall={i % 3 === 0} />
          </Reveal>
        ))}
      </section>
      <GiantCTA eyebrow="Have a project in mind?" word="Let's talk" href="/contact/" />
    </>
  );
}
