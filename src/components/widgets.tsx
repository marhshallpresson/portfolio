"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check, Loader2, Send, X } from "lucide-react";
import { education, experience, orgs, profile, skills, skillWords, type Project } from "@/data/profile";
import { TechIcon, Tile } from "./logos";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Reveal ---------- */
export function Reveal({ children, delay = 0, className = "", y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
}

/* ---------- Line-mask reveal for giant condensed titles ---------- */
export function MaskTitle({ children, className = "", delay = 0, as: Tag = "h2" }: { children: React.ReactNode; className?: string; delay?: number; as?: "h1" | "h2" | "p" }) {
  return (
    <Tag className={`overflow-hidden ${className}`}>
      {/* trigger lives on the unclipped wrapper; the child animates via variants */}
      <motion.span className="block" initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -5% 0px" }}>
        <motion.span className="block" variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 1, delay, ease } } }}>{children}</motion.span>
      </motion.span>
    </Tag>
  );
}

/* ---------- Counter (Mr Bayo stats) ---------- */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.5, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- Typewriter (Ime) ---------- */
export function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(words[0]);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = words[i % words.length];
    let d = del ? 35 : 75;
    if (!del && text === w) d = 1700;
    if (del && text === "") d = 250;
    const t = setTimeout(() => {
      if (!del && text === w) setDel(true);
      else if (del && text === "") { setDel(false); setI((n) => n + 1); }
      else setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1));
    }, d);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <span aria-hidden className="text-accent">{text}<span className="caret ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-accent" /></span>;
}

/* ---------- Portrait with monogram fallback ---------- */
export function Portrait({ className = "", rounded = "rounded-full" }: { className?: string; rounded?: string }) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth === 0) setOk(false); }, []);
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${rounded} ${className}`}>
      <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#2456e6,#0b1f5c)]" aria-hidden={ok}>
        <span className="cond text-white" style={{ fontSize: "clamp(5rem,28vw,10rem)" }}>MP</span>
      </div>
      {ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={ref} src={profile.photo} alt={`Portrait of ${profile.name}`} onError={() => setOk(false)} className="absolute inset-0 size-full object-cover object-top" />
      )}
    </div>
  );
}

/* ---------- Browser frame for live screenshots ---------- */
export function BrowserFrame({ src, alt, url, className = "" }: { src: string; alt: string; url?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.55)] ring-1 ring-black/10 ${className}`}>
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#f3f4f6] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
        {url && <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 font-mono text-[11px] text-[#6b7280]">{url.replace(/^https?:\/\//, "")}</span>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

/* ---------- Screenshot gallery (case-study pages) ---------- */
export function ShotGallery({ shots, url, name }: { shots: { src: string; label: string; mobile?: boolean }[]; url?: string; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }}>
          {shots[i].mobile ? (
            <div className="mx-auto w-[min(78vw,300px)] rounded-[2.6rem] border-[10px] border-[#111] bg-[#111] shadow-[0_30px_80px_-20px_rgba(0,0,0,.55)]">
              <div className="relative overflow-hidden rounded-[1.9rem]">
                <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shots[i].src} alt={`${name}: ${shots[i].label}`} className="block aspect-[9/19] w-full object-cover object-top" />
              </div>
            </div>
          ) : (
            <BrowserFrame src={shots[i].src} alt={`${name}: ${shots[i].label}`} url={url} />
          )}
        </motion.div>
      </AnimatePresence>
      {shots.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {shots.map((s, j) => (
            <button key={s.src} onClick={() => setI(j)} className={`rounded-full px-4 py-2 text-sm transition ${i === j ? "bg-accent text-accent-ink" : "border border-line text-muted hover:text-text"}`}>{s.label}</button>
          ))}
        </div>
      )}
      {shots.length === 1 && <p className="mt-4 text-sm text-muted">{shots[0].label}</p>}
    </div>
  );
}

/* ---------- Hero photo slider ---------- */
export function PhotoSlider({ className = "" }: { className?: string }) {
  const photos = profile.photos;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % photos.length), 4500);
    return () => clearInterval(t);
  }, [photos.length]);
  return (
    <div className={`relative overflow-hidden rounded-full bg-surface-2 ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img key={photos[i].src} src={photos[i].src} alt={photos[i].caption} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease }} className="absolute inset-0 size-full object-cover object-top" />
      </AnimatePresence>
      {photos.length > 1 && (
        <div className="absolute bottom-[14%] left-1/2 flex -translate-x-1/2 gap-1.5">
          {photos.map((p, j) => <button key={p.src} aria-label={`Photo ${j + 1}`} onClick={() => setI(j)} className={`h-1.5 rounded-full transition-all ${i === j ? "w-5 bg-white" : "w-1.5 bg-white/60"}`} />)}
        </div>
      )}
    </div>
  );
}

/* ---------- Card background patterns ---------- */
export function Pattern({ kind }: { kind: Project["pattern"] }) {
  const topo = useMemo(() => {
    if (kind !== "topo") return [];
    const paths: string[] = [];
    const centers = [[0.22, 0.3], [0.78, 0.7], [0.6, 0.15]];
    centers.forEach(([cx, cy], ci) => {
      for (let k = 1; k <= 9; k++) {
        const R = k * 0.07;
        let d = "";
        for (let i = 0; i <= 32; i++) {
          const t = (i / 32) * Math.PI * 2;
          const r = R * (1 + 0.18 * Math.sin(3 * t + ci + k * 0.4) + 0.08 * Math.cos(5 * t + k));
          d += `${i ? "L" : "M"}${(cx + Math.cos(t) * r * 0.62).toFixed(4)} ${(cy + Math.sin(t) * r).toFixed(4)}`;
        }
        paths.push(d + "Z");
      }
    });
    return paths;
  }, [kind]);
  if (kind === "grid") return <div className="pat-grid absolute inset-0" aria-hidden />;
  if (kind === "dots") return <div className="pat-dots absolute inset-0" aria-hidden />;
  if (kind === "rings")
    return (
      <svg viewBox="0 0 1 1" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        {Array.from({ length: 16 }, (_, i) => <circle key={i} cx="0.5" cy="0.5" r={0.04 + i * 0.045} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="0.0015" />)}
      </svg>
    );
  return (
    <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
      {topo.map((d, i) => <path key={i} d={d} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="0.0016" />)}
    </svg>
  );
}

/** Project "logo": tile + wordmark, Ameer-style centred brand. */
export function ProjectLogo({ p, size = 44 }: { p: Project; size?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Tile initials={(p.name.match(/[A-Z]/g) || [p.name[0]]).join("").slice(0, 2)} color={p.color} logo={p.logo} name={p.name} size={size} inverted />
      <span className="font-semibold tracking-tight" style={{ fontSize: size * 0.62 }}>{p.name}</span>
    </span>
  );
}

/* ---------- Ameer showcase: full-width cards that stack on scroll ---------- */
export function ProjectStack({ items }: { items: Project[] }) {
  return (
    <div className="relative">
      {items.map((p, i) => <StackItem key={p.slug} p={p} i={i} total={items.length} />)}
    </div>
  );
}
function StackItem({ p, i, total }: { p: Project; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, i === total - 1 ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, i === total - 1 ? 0 : 0.45]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center px-3 pt-16 sm:px-10">
      <motion.a href={`/projects/${p.slug}/`} data-cursor="View" style={{ scale, backgroundColor: p.color }} className={`group relative block h-[78svh] w-full overflow-hidden rounded-2xl ${p.ink === "light" ? "text-white" : "text-[#0b0b0c]"}`}>
        <Pattern kind={p.pattern} />
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black" />
        {p.shots?.length ? (
          <motion.div style={{ y: logoY }} className="absolute inset-x-0 top-[7%] flex flex-col items-center gap-5 px-6">
            <ProjectLogo p={p} size={38} />
            <BrowserFrame src={p.shots[0].src} alt={`${p.name} live screenshot`} url={p.live} className="w-[min(86%,600px)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.02]" />
          </motion.div>
        ) : (
          <motion.div style={{ y: logoY }} className="absolute inset-0 grid place-items-center transition-transform duration-700 group-hover:scale-105">
            <ProjectLogo p={p} size={52} />
          </motion.div>
        )}
        <div className="absolute inset-x-5 top-5 flex justify-between sm:hidden">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{p.year}</span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">{p.platform}</span>
        </div>
        <div className="absolute inset-x-0 bottom-6 flex items-end justify-center px-6 sm:bottom-10 sm:justify-between sm:px-12">
          <span className="hidden rounded-full bg-white/20 px-4 py-1.5 text-sm backdrop-blur sm:inline">{p.year}</span>
          <span className="cond relative z-10 text-center text-[19vw] leading-[0.85] drop-shadow-[0_4px_24px_rgba(0,0,0,.35)] sm:text-[9vw]">{p.name}</span>
          <span className="hidden rounded-full bg-white/20 px-4 py-1.5 text-sm backdrop-blur sm:inline">{p.platform}</span>
        </div>
      </motion.a>
    </div>
  );
}

/* ---------- Ameer skills: giant words that light up as they cross the centre ---------- */
export function SkillWords() {
  return (
    <div className="py-[20vh] text-center">
      {skillWords.map((w) => <SkillWord key={w} w={w} />)}
    </div>
  );
}
function SkillWord({ w }: { w: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.2, 0.45, 0.55, 0.8], [0.12, 1, 1, 0.12]);
  const blur = useTransform(scrollYProgress, [0.15, 0.45, 0.55, 0.85], ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]);
  return <motion.p ref={ref} style={{ opacity, filter: blur }} className="cond text-[15vw] leading-[0.95] sm:text-[8.5vw]">{w}</motion.p>;
}

/* ---------- Ime résumé tabs ---------- */
export function ResumeTabs() {
  const tabs = ["Experience", "Education", "Skills"] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]>("Experience");
  const org = (id: string) => orgs.find((o) => o.id === id)!;
  return (
    <div>
      <div role="tablist" className="grid grid-cols-3 overflow-hidden rounded-2xl border border-line bg-surface p-1">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="relative rounded-xl py-3.5 text-sm font-medium sm:text-base">
            {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-xl border border-accent bg-accent-soft" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className={`relative ${tab === t ? "text-accent" : "text-muted"}`}>{t === "Skills" ? "Professional Skills" : t}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease }} className="mt-10">
          {tab === "Experience" && (
            <ol className="relative ml-2 border-l-2 border-line">
              {experience.map((r) => (
                <li key={r.title + r.org} className="relative mb-5 pl-8 last:mb-0">
                  <span className="absolute -left-[9px] top-8 size-4 rounded-full border-2 border-text bg-bg" />
                  <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:border-accent/40">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Tile {...org(r.orgId)} size={40} />
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight">{r.title}</h3>
                          <p className="text-sm text-muted">{r.org} · {r.period}</p>
                        </div>
                      </div>
                      <span className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">{r.badge}</span>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{r.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {tab === "Education" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {education.map((e) => (
                <div key={e.title} className="rounded-2xl border border-line bg-surface p-6">
                  <p className="eyebrow">{e.period}</p>
                  <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted">{e.org}</p>
                  <span className="mt-4 inline-block rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">{e.note}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "Skills" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(skills).map(([g, items]) => (
                <div key={g} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="font-semibold">{g}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((s) => <li key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-sm"><TechIcon name={s} size={14} />{s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Contact form: real delivery via FormSubmit ---------- */
function emailDraft(f: FormData) {
  const subject = String(f.get("subject") || "Portfolio enquiry");
  const body = `Name: ${f.get("name") || ""}\nEmail: ${f.get("email") || ""}\n\n${f.get("message") || ""}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
async function send(f: FormData) {
  const inboxUrl = process.env.NEXT_PUBLIC_INBOX_URL;
  if (inboxUrl) {
    const response = await fetch(`${inboxUrl.replace(/\/$/, "")}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), email: f.get("email"), subject: f.get("subject") || "Portfolio enquiry", message: f.get("message"), website: f.get("_honey") || "" }),
    });
    if (!response.ok) throw new Error("send failed");
    return;
  }
  const res = await fetch(profile.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: f.get("name"), email: f.get("email"), subject: f.get("subject") || "Portfolio enquiry", message: f.get("message"),
      _subject: `Portfolio: ${f.get("subject") || "New enquiry"} (from ${f.get("name")})`,
      _replyto: f.get("email"), _template: "table", _captcha: "false",
      _autoresponse: `Hi ${f.get("name")}, thank you for reaching out. I've received your message and will reply within 24 hours. Marshall Presson · ${profile.siteUrl}`,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === "false" || data.success === false) throw new Error("send failed");
}

export function ContactForm({ variant = "card" }: { variant?: "card" | "line" }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [draft, setDraft] = useState(`mailto:${profile.email}`);
  const [len, setLen] = useState(0);
  useEffect(() => { if (state === "sent") { const t = setTimeout(() => setState("idle"), 7000); return () => clearTimeout(t); } }, [state]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; const f = new FormData(form);
    if (f.get("_honey")) return;
    setDraft(emailDraft(f));
    setState("sending");
    try { await send(f); setState("sent"); form.reset(); setLen(0); } catch { setState("error"); }
  };

  const toast = (
    <AnimatePresence>
      {(state === "sent" || state === "error") && (
        <motion.div role="status" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl bg-[#111] px-5 py-4 text-sm text-white shadow-2xl">
          {state === "sent" ? <Check size={18} className="text-[#5b8cff]" /> : <X size={18} className="text-red-400" />}
          <span className="flex-1">{state === "sent" ? "Message sent. I'll reply within 24 hours." : <>Couldn&apos;t send. <a className="underline" href={draft}>Open your message in your email app</a>.</>}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
  const btnLabel = state === "sending" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send message <Send size={15} /></>;

  if (variant === "line") {
    const f = "w-full border-b border-line bg-transparent py-4 text-base outline-none transition placeholder:text-muted focus:border-text";
    return (
      <>
        <form onSubmit={onSubmit} className="grid gap-4">
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <input required name="name" placeholder="Your name" autoComplete="name" className={f} />
          <input required type="email" name="email" placeholder="Your email" autoComplete="email" className={f} />
          <input name="subject" placeholder="Subject" className={f} />
          <textarea required name="message" rows={3} placeholder="Your message" className={`${f} resize-none`} />
          <button disabled={state === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-text py-3.5 font-medium text-bg transition hover:bg-accent hover:text-accent-ink disabled:opacity-70">{btnLabel}</button>
        </form>
        {toast}
      </>
    );
  }
  const f = "w-full rounded-xl bg-surface-2 px-4 py-3.5 text-[15px] outline-none ring-accent/40 transition placeholder:text-muted focus:ring-2";
  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-6 md:grid-cols-2 md:gap-6">
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <div className="relative">
          <textarea required name="message" maxLength={5000} onChange={(e) => setLen(e.target.value.length)} placeholder="Your message" className={`${f} h-full min-h-[200px] resize-none`} />
          <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted">{len}/5000</span>
        </div>
        <div className="flex flex-col gap-3 md:border-l md:border-line md:pl-6">
          <input required name="name" placeholder="Your name" autoComplete="name" className={f} />
          <input required type="email" name="email" placeholder="Email" autoComplete="email" className={f} />
          <input name="subject" placeholder="Subject (optional)" className={f} />
          <button disabled={state === "sending"} className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-accent-ink transition hover:opacity-90 disabled:opacity-70">{btnLabel}</button>
        </div>
      </form>
      {toast}
    </>
  );
}

/* ---------- Mr Bayo hire form: "Tell me about your project" ---------- */
export function HireForm() {
  const kinds = [
    { v: "Full-time role", d: "Hiring for your team" },
    { v: "Web app", d: "Website or web platform" },
    { v: "Mobile app", d: "iOS or Android app" },
    { v: "Payments / integration", d: "Paystack, Stripe, wallets, APIs" },
    { v: "Other", d: "Something different" },
  ];
  const [kind, setKind] = useState(kinds[0].v);
  const [via, setVia] = useState("Email");
  const [len, setLen] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [draft, setDraft] = useState(`mailto:${profile.email}`);
  useEffect(() => { if (state === "sent") { const t = setTimeout(() => setState("idle"), 7000); return () => clearTimeout(t); } }, [state]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; const f = new FormData(form);
    if (f.get("_honey")) return;
    f.set("subject", kind);
    f.set("message", `${f.get("message")}\n\nType: ${kind}\nPhone: ${f.get("phone") || "-"}${f.get("wa") ? " (WhatsApp)" : ""}\nPreferred contact: ${via}`);
    setDraft(emailDraft(f));
    setState("sending");
    try { await send(f); setState("sent"); form.reset(); setLen(0); } catch { setState("error"); }
  };
  const field = "w-full rounded-xl bg-surface-2 px-4 py-3.5 text-[15px] outline-none ring-accent/40 transition placeholder:text-muted focus:ring-2";
  return (
    <form onSubmit={onSubmit} className="grid gap-8 rounded-2xl border border-line bg-surface p-5 sm:p-8 md:grid-cols-2">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Tell me about your project</h2>
        <p className="mt-4 text-sm text-muted">What can I help with?</p>
        <div role="radiogroup" className="mt-2 divide-y divide-line overflow-hidden rounded-xl bg-surface-2">
          {kinds.map((k) => (
            <label key={k.v} className="flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:bg-line/50">
              <input type="radio" name="kind" checked={kind === k.v} onChange={() => setKind(k.v)} className="size-4 accent-[var(--accent)]" />
              <span><span className="block text-[15px] font-medium">{k.v}</span><span className="block text-xs text-muted">{k.d}</span></span>
            </label>
          ))}
        </div>
        <div className="relative mt-4">
          <textarea required name="message" maxLength={2000} onChange={(e) => setLen(e.target.value.length)} rows={5} placeholder="Describe the role or project" className={`${field} resize-none`} />
          <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted">{len}/2000</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:border-l md:border-line md:pl-8 md:pt-[3.4rem]">
        <input required name="name" placeholder="Your name" autoComplete="name" className={field} />
        <input required type="email" name="email" placeholder="Email" autoComplete="email" className={field} />
        <input name="phone" placeholder="Phone, e.g. +234 800 000 0000" autoComplete="tel" className={field} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="wa" defaultChecked className="size-4 accent-[var(--accent)]" /> Same number on WhatsApp</label>
        <p className="mt-2 text-sm text-muted">How should I reach you?</p>
        <div className="flex flex-wrap gap-2">
          {["Email", "WhatsApp", "Phone call"].map((v) => (
            <button type="button" key={v} onClick={() => setVia(v)} className={`rounded-full px-4 py-2 text-sm transition ${via === v ? "bg-accent-soft font-medium text-accent" : "bg-surface-2 text-muted hover:text-text"}`}>{via === v ? "✓ " : ""}{v}</button>
          ))}
        </div>
        <button disabled={state === "sending"} className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-medium text-accent-ink transition hover:opacity-90 disabled:opacity-70">
          {state === "sending" ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send request <Send size={15} /></>}
        </button>
        {state === "sent" && <p className="text-sm text-ok">Request sent. I&apos;ll get back to you within 24 hours.</p>}
        {state === "error" && <p className="text-sm text-red-500">Couldn&apos;t send. <a className="underline" href={draft}>Open your message in your email app</a>.</p>}
      </div>
    </form>
  );
}

export { ArrowUpRight };
