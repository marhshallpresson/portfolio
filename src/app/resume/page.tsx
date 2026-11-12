import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import { education, experience, profile, projects, recognition, skills } from "@/data/profile";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = { title: "Résumé", description: `Résumé of ${profile.name}, ${profile.role}.`, alternates: { canonical: "/resume/" } };

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2.5 mt-7 border-b border-line pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent print:mt-5">{children}</h2>
);

export default function Resume() {
  const links = [profile.domain, "github.com/marhshallpresson", ...profile.socials.filter((s) => s.href && s.label === "LinkedIn").map((s) => s.href.replace(/^https?:\/\/(www\.)?/, ""))];
  return (
    <div className="min-h-dvh bg-surface-2 py-10 print:bg-white print:py-0">
      <div className="no-print mx-auto mb-6 flex max-w-[840px] items-center justify-between px-4">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text"><ArrowLeft size={14} /> Back to site</a>
        <div className="flex gap-2">
          <PrintButton />
        </div>
      </div>
      <article className="mx-auto max-w-[840px] bg-surface px-7 py-10 text-[14px] leading-relaxed shadow-xl sm:rounded-2xl sm:px-12 print:max-w-none print:p-0 print:shadow-none">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-text pb-5">
          <div>
            <h1 className="text-[2.4rem] font-bold leading-none tracking-[-0.04em]">{profile.name}</h1>
            <p className="mt-2 text-[15px] font-medium text-accent">{profile.role} · React · Node.js · Python · Flutter</p>
          </div>
          <div className="text-right text-[12.5px] leading-6 text-muted">
            <p>{profile.email}</p>
            {profile.phones.map((p) => <p key={p.tel}>{p.display}</p>)}
            <p>{profile.location}</p>
          </div>
        </header>
        <p className="mt-2 text-[12.5px] text-muted">{links.join("  ·  ")}</p>

        <H>Profile</H>
        <p>{profile.summary}</p>

        <H>Experience</H>
        <div className="space-y-3.5">
          {experience.map((e) => (
            <section key={e.title + e.org} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{e.title} <span className="font-normal text-muted">· {e.org}</span></h3>
                <span className="text-[12.5px] text-muted">{e.period} · {e.place}</span>
              </div>
              <p className="mt-0.5 text-[13.5px]">{e.summary}</p>
            </section>
          ))}
        </div>

        <H>Selected projects</H>
        <ul className="space-y-1.5">
          {projects.filter((p) => p.featured).map((p) => (
            <li key={p.slug} className="break-inside-avoid"><span className="font-semibold">{p.name}</span> <span className="text-muted">({p.kicker}, {p.role})</span>: {p.summary} {p.result} <span className="text-[12px] text-muted">{p.stack.join(", ")}</span></li>
          ))}
        </ul>

        <H>Skills</H>
        <dl className="grid gap-1">
          {Object.entries(skills).map(([g, items]) => (
            <div key={g} className="grid grid-cols-[140px_1fr] gap-3"><dt className="font-semibold">{g}</dt><dd className="text-muted">{items.join(", ")}</dd></div>
          ))}
        </dl>

        <div className="grid gap-x-10 sm:grid-cols-2 print:grid-cols-2">
          <div><H>Recognition</H><ul className="space-y-1">{recognition.map((r) => <li key={r.title}><span className="font-semibold">{r.place}: {r.title}</span> <span className="text-muted">({r.year})</span></li>)}</ul></div>
          <div><H>Education</H><ul className="space-y-1">{education.map((e) => <li key={e.title}><span className="font-semibold">{e.title}</span>, <span className="text-muted">{e.org}, {e.period}</span></li>)}</ul></div>
        </div>
      </article>
    </div>
  );
}
