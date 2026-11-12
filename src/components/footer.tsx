"use client";

import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { SocialIcon } from "./logos";

export function Footer() {
  const path = usePathname();
  if (path?.startsWith("/resume")) return null;
  const socials = profile.socials.filter((s) => s.href);
  const link = "inline-flex min-h-11 items-center text-sm text-[#a6a9b1] transition hover:text-white";
  const label = "text-xs font-semibold uppercase tracking-[0.16em] text-[#747986]";
  return (
    <footer className="no-print overflow-hidden bg-[#111214] text-[#f6f5f2]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 sm:px-10 sm:pt-24">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:pb-24">
          <div>
            <a href="/" className="text-2xl font-bold tracking-tight">marshall<span className="text-[#668cff]">.</span></a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#a6a9b1]">Full-stack and mobile engineer building useful products, thoughtful experiences and reliable integrations.</p>
            <a href={profile.booking} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-medium transition hover:border-white hover:bg-white hover:text-[#111214]">Let&apos;s talk <ArrowUpRight size={15} /></a>
          </div>
          <div><p className={label}>Explore</p><ul className="mt-4">
            <li><a href="/projects/" className={link}>Projects</a></li>
            <li><a href="/about/" className={link}>About me</a></li>
            <li><a href="/resume/" className={link}>Résumé</a></li>
            <li><a href={profile.cvFile} download className={link}>Download CV</a></li>
          </ul></div>
          <div><p className={label}>Get in touch</p><ul className="mt-4">
            <li><a href={`mailto:${profile.email}`} className={`${link} break-all`}>{profile.email}</a></li>
            {profile.phones.map((p) => <li key={p.tel}><a href={`tel:${p.tel}`} className={link}>{p.display}</a></li>)}
            <li><a href="/contact/" className={link}>Work with me</a></li>
            <li><a href={profile.tip} target="_blank" rel="noreferrer" className={link}>Tip me on TipStack <ArrowUpRight size={13} className="ml-1" /></a></li>
          </ul></div>
          <div><p className={label}>Follow</p><ul className="mt-4 flex flex-wrap gap-2">
            {socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-11 place-items-center rounded-full border border-white/15 text-[#a6a9b1] transition hover:border-white hover:text-white"><SocialIcon name={s.label} size={17} /></a></li>)}
          </ul></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-7 text-sm text-[#a6a9b1]">
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 transition hover:text-white"><ArrowUp size={15} /> Back to top</a>
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        </div>
        <div aria-hidden="true" className="select-none overflow-hidden pt-6 leading-[0.78]">
          <span className="block whitespace-nowrap bg-gradient-to-br from-[#eeeae1] via-[#c3c1bd] to-[#5d6b91] bg-clip-text text-[clamp(4rem,17.8vw,16rem)] font-bold tracking-[-0.075em] text-transparent">marshall.</span>
        </div>
      </div>
    </footer>
  );
}