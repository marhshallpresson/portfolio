import { ArrowRight, ArrowUpRight, CalendarDays, Rocket, Check, ChevronDown, Code2, CreditCard, Film, Search, Server, Smartphone, Sparkles, Layers, Shield, Bug, Wrench, MessageSquare } from "lucide-react";
import { orgs, principles, process, profile, projects, qualities, recognition, services, stats, toolbelt, type Project } from "@/data/profile";
import { SocialIcon, TechIcon, Tile } from "./logos";
import { BrowserFrame, Counter, MaskTitle, Pattern, PhotoSlider, ProjectLogo, Reveal, Typewriter } from "./widgets";

export const wrap = "mx-auto max-w-[1200px] px-5 sm:px-8";
const serviceIcons = { code: Code2, phone: Smartphone, card: CreditCard, server: Server, spark: Sparkles, video: Film, rocket: Rocket } as const;
const principleIcons = [Search, Layers, Wrench, Bug, Shield, MessageSquare];

/* ============ Ameer: giant condensed page hero ============ */
export function GiantHero({ word, sub, left = "Scroll to Explore", right }: { word: string; sub: string; left?: string; right?: string }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-20 text-center">
      <MaskTitle as="h1" className="cond text-[38vw] sm:text-[24vw] lg:text-[21vw]" delay={0.1}>{word}<span className="sr-only"> · {profile.name}, {profile.role}</span></MaskTitle>
      <Reveal delay={0.35}><p className="mt-4 max-w-2xl text-base sm:text-lg">{sub}</p></Reveal>
      <div className="absolute inset-x-0 bottom-8 hidden items-center justify-between px-5 text-[14px] font-medium sm:flex sm:px-10">
        <a href="#next" className="inline-flex items-center gap-3">{left} <ChevronDown size={16} className="animate-bounce" /></a>
        {right && <span>{right}</span>}
      </div>
    </section>
  );
}

/* ============ Mr Bayo: intro hero (eyebrow → headline → CTAs → round portrait) + Ime typewriter ============ */
export function Intro() {
  return (
    <section id="next" className={`${wrap} grid items-center gap-12 py-20 md:grid-cols-[1.3fr_1fr] md:py-28`}>
      <div>
        <Reveal><p className="text-[15px] font-medium text-accent">{profile.role}</p></Reveal>
        <Reveal delay={0.05}><h2 className="mt-4 text-[clamp(2.4rem,5.4vw,4.1rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{profile.headline}</h2></Reveal>
        <Reveal delay={0.1}><p className="mt-5 text-lg text-muted">I&apos;m a <Typewriter words={profile.roles} /><span className="sr-only">{profile.roles.join(", ")}</span></p></Reveal>
        <Reveal delay={0.15}><p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{profile.intro}</p></Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/projects/" className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition hover:opacity-90">See my work <ArrowRight size={16} /></a>
            <a href="/contact/" className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-surface-2 px-7 py-3.5 font-medium transition hover:bg-line">Hire me</a>
            <a href={profile.booking} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium transition hover:border-text"><CalendarDays size={16} /> Let&apos;s talk</a>
            <a href="/resume/" className="inline-flex items-center justify-center rounded-full px-5 py-3.5 font-medium text-muted underline-offset-4 hover:text-text hover:underline">View résumé</a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="relative mx-auto w-full max-w-[340px]">
        <PhotoSlider className="aspect-square w-full" />
        <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium shadow-lg">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" /><span className="relative size-2 rounded-full bg-ok" /></span>
          {profile.availability}
        </span>
      </Reveal>
    </section>
  );
}

/* ============ Mr Bayo: tech marquee + stats card ============ */
export function MarqueeStats() {
  const row = [...toolbelt, ...toolbelt];
  return (
    <section aria-label="Stack and highlights">
      <div className="marquee overflow-hidden border-y border-line bg-surface py-4">
        <ul className="marquee-track flex w-max gap-12 pr-12">
          {row.map((t, i) => <li key={i} aria-hidden={i >= toolbelt.length} className="flex items-center gap-2.5 whitespace-nowrap text-[15px] font-medium"><TechIcon name={t} size={18} />{t}</li>)}
        </ul>
      </div>
      <div className="bg-surface-2 py-10">
        <dl className={`${wrap} grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-4`}>
          {stats.map((s, i) => (
            <div key={s.label} className={`p-6 sm:p-7 ${i % 2 ? "" : "border-r"} border-line md:border-r md:last:border-r-0 ${i < 2 ? "border-b md:border-b-0" : ""}`}>
              <dd className="text-4xl font-semibold tracking-tight sm:text-5xl"><Counter value={s.value} suffix={s.suffix} /></dd>
              <dt className="mt-1.5 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ============ Section heading (Ime centred eyebrow + title) ============ */
export function SectionHead({ eyebrow, title, center = false, sub }: { eyebrow: string; title: string; center?: boolean; sub?: string }) {
  return (
    <Reveal className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </Reveal>
  );
}

/* ============ Ime / Enny: What I do ============ */
export function Services() {
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow="Services" title="What I do" center sub="Frontend, backend, mobile and the integrations that hold them together." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon as keyof typeof serviceIcons];
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.07} className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(36,86,230,.35)]">
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition duration-500 group-hover:scale-x-100" />
              <Icon className="text-accent" size={30} strokeWidth={1.6} />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============ Ime: Projects & companies I've worked with ============ */
export function Companies() {
  return (
    <section className="border-y border-line bg-surface-2/60 py-24">
      <div className={wrap}>
        <SectionHead eyebrow="Clients & teams" title="Teams & companies I've worked with" center />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orgs.map((o, i) => (
            <Reveal key={o.id} delay={(i % 4) * 0.06} className="group relative rounded-2xl border border-line bg-surface p-6 transition duration-500 hover:-translate-y-1">
              {o.url && <a href={o.url} target="_blank" rel="noreferrer" className="absolute inset-0 z-10 rounded-2xl" aria-label={`Visit ${o.name}`} />}
              <div className="flex items-center justify-between">
                <Tile {...o} size={48} className="transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110" />
                {o.url && <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-muted transition group-hover:bg-accent group-hover:text-accent-ink"><ArrowUpRight size={15} /></span>}
              </div>
              <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">{o.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{o.about}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Qualities: why work with me ============ */
export function Qualities() {
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow="Why work with me" title="What you get when you hire me" center sub="The habits behind the work, each backed by something I've actually done." />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {qualities.map((q, i) => (
          <Reveal key={q.title} delay={(i % 3) * 0.06} className="group bg-surface p-8 transition-colors duration-500 hover:bg-accent-soft">
            <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{q.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{q.body}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-[13px] font-medium"><Check size={14} className="text-accent" />{q.proof}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Awards (hackathons & recognition) ============ */
export function Awards() {
  return (
    <section className={`${wrap} py-24`}>
      <SectionHead eyebrow="Recognition" title="Hackathons & awards" center sub="Building under pressure, in front of judges." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recognition.map((r, i) => (
          <Reveal key={r.title} delay={(i % 3) * 0.07} className={`group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition duration-500 hover:-translate-y-1 ${i < 3 ? "" : "lg:col-span-1"}`}>
            <div className="flex items-center justify-between">
              <Tile initials={r.initials} color={r.color} logo={r.logo} name={r.org} size={52} />
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.place.startsWith("1st") ? "bg-accent text-accent-ink" : "bg-accent-soft text-accent"}`}>{r.place}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{r.title}</h3>
            <p className="mt-1 text-sm text-muted">{r.org} · {r.year}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ Oladiipo: How I approach engineering + process ============ */
export function Approach() {
  return (
    <section className={`${wrap} py-24`}>
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Engineering</p>
        <h2 className="mt-3 flex items-center gap-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em]"><Search size={22} className="text-muted" /> How I approach engineering</h2>
        <p className="mt-3 text-lg text-muted">Good software starts before code is written. Here is how I think about building systems.</p>
      </Reveal>
      <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
        {principles.map((p, i) => {
          const Icon = principleIcons[i];
          return (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <h3 className="flex items-center gap-3 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-surface-2"><Icon size={15} className="text-muted" /></span>{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-20 max-w-2xl">
        <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em]">How I solve problems</h2>
        <p className="mt-3 text-lg text-muted">The process I follow, from understanding the problem to improving the system.</p>
      </Reveal>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {process.map((s, i) => (
          <li key={s.step} className="group bg-surface p-7 transition hover:bg-accent-soft">
            <span className="font-mono text-sm text-muted transition group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-lg font-semibold">{s.step}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ============ Ameer: tagline + "see more" ============ */
export function Tagline() {
  return (
    <section className="py-24 text-center">
      <Reveal>
        <p className="mx-auto max-w-2xl px-5 text-[13px] font-medium uppercase tracking-[0.16em] text-muted">Building products where clean engineering meets the business of getting paid.</p>
        <a href="/projects/" className="mt-6 inline-flex rounded-full border border-text px-6 py-2.5 text-[14px] font-medium transition hover:bg-text hover:text-bg">See More Projects</a>
      </Reveal>
    </section>
  );
}

/* ============ Ameer / Mr Bayo: find me online ============ */
export function FindMe() {
  const items = [
    { icon: "Email", value: profile.email, label: "Email", href: `mailto:${profile.email}` },
    { icon: "Cal", value: "cal.com/marshallpresson", label: "Let's talk", href: profile.booking },
    ...profile.phones.map((p) => ({ icon: "WhatsApp", value: p.display, label: p.whatsapp ? "WhatsApp / Call" : "Call", href: p.whatsapp ? `https://wa.me/${p.tel.replace("+", "")}` : `tel:${p.tel}` })),
    ...profile.socials.filter((s) => s.href).map((s) => ({ icon: s.label, value: s.handle, label: s.label, href: s.href })),
  ];
  return (
    <section className={`${wrap} py-20`}>
      <ul className="grid grid-cols-2 gap-y-12 sm:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.label + it.value} delay={(i % 3) * 0.06}>
            <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex flex-col items-center text-center">
              {it.icon === "Cal" ? <CalendarDays size={26} className="transition duration-300 group-hover:-translate-y-1 group-hover:text-accent" /> : <SocialIcon name={it.icon} size={26} className="transition duration-300 group-hover:-translate-y-1 group-hover:text-accent" />}
              <span className="mt-3 break-all text-[15px] font-medium">{it.value}</span>
              <span className="text-sm text-muted">{it.label}</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ============ Ameer: giant footer CTA ============ */
export function GiantCTA({ eyebrow, word, href }: { eyebrow: string; word: string; href: string }) {
  return (
    <section className="py-24 text-center">
      <a href={href} data-cursor="Open" className="group block">
        <Reveal><p className="text-[13px] uppercase tracking-[0.16em] text-muted">{eyebrow}</p></Reveal>
        <MaskTitle as="p" className="cond mt-4 text-[26vw] transition-colors duration-500 group-hover:text-accent sm:text-[17vw]">{word}</MaskTitle>
      </a>
    </section>
  );
}

/* ============ Ameer projects page: staggered colour cards ============ */
export function ProjectCard({ p, tall = false }: { p: Project; tall?: boolean }) {
  return (
    <a href={`/projects/${p.slug}/`} data-cursor="View" className="group block">
      <div className={`relative overflow-hidden rounded-2xl ${tall ? "aspect-[4/5]" : "aspect-[4/3]"} ${p.ink === "light" ? "text-white" : "text-[#0b0b0c]"}`} style={{ backgroundColor: p.color }}>
        <div className="absolute inset-0 transition duration-700 group-hover:scale-110"><PatternServer p={p} /></div>
        {p.shots?.length ? (
          <div className="absolute inset-x-[8%] top-[18%] transition duration-700 group-hover:-translate-y-2"><BrowserFrame src={p.shots[0].src} alt={`${p.name} screenshot`} url={p.live} /></div>
        ) : (
          <div className="absolute inset-0 grid place-items-center transition duration-700 group-hover:scale-105"><ProjectLogo p={p} size={40} /></div>
        )}
        <span className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{p.year}</span>
        <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{p.platform}</span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="cond text-5xl transition-colors group-hover:text-accent">{p.name}</h3>
          <p className="mt-1 text-[15px] text-muted">{p.kicker}</p>
        </div>
        <span className="mb-1 grid size-11 shrink-0 place-items-center rounded-full border border-line transition group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"><ArrowUpRight size={18} /></span>
      </div>
    </a>
  );
}
function PatternServer({ p }: { p: Project }) { return <Pattern kind={p.pattern} />; }

export const allProjects = projects;
