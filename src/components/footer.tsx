"use client";

import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { SocialIcon } from "./logos";

/* Mr Bayo footer columns + Ameer footer bar */
export function Footer() {
  const path = usePathname();
  if (path?.startsWith("/resume")) return null;
  const socials = profile.socials.filter((s) => s.href);
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        <div>
          <a href="/" className="text-[22px] font-bold tracking-[-0.04em]">marshall<span className="text-accent">.</span></a>
          <p className="mt-3 max-w-xs text-sm text-muted">{profile.role}. Building products people pay for and trust.</p>
        </div>
        <div>
          <p className="eyebrow">Work</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="/projects/" className="text-muted hover:text-text">Projects</a></li>
            <li><a href="/about/" className="text-muted hover:text-text">About</a></li>
            <li><a href="/resume/" className="text-muted hover:text-text">Résumé</a></li>
            <li><a href={profile.cvFile} download className="text-muted hover:text-text">Download CV</a></li>
            {profile.listings.map((l) => <li key={l.href}><a href={l.href} target="_blank" rel="noreferrer" className="text-muted hover:text-text">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${profile.email}`} className="text-muted hover:text-text">{profile.email}</a></li>
            {profile.phones.map((p) => <li key={p.tel}><a href={`tel:${p.tel}`} className="text-muted hover:text-text">{p.display}</a></li>)}
            <li><a href={profile.booking} target="_blank" rel="noreferrer" className="text-muted hover:text-text">Let&apos;s talk (Cal.com)</a></li>
            <li><a href={profile.tip} target="_blank" rel="noreferrer" className="text-muted hover:text-text">Tip me on TipStack</a></li>
            <li><a href="/contact/" className="text-muted hover:text-text">Hire me</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Follow</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"><SocialIcon name={s.label} /></a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 pb-28 pt-5 text-[13px] sm:px-10">
          <a href="#top" className="inline-flex items-center gap-3"><ArrowUp size={14} /> Back to top</a>
          <span className="text-muted">{new Date().getFullYear()} © {profile.name}</span>
          <a href="/contact/" className="hidden sm:inline">Contact Me</a>
        </div>
      </div>
    </footer>
  );
}
