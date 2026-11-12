"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Download, FolderKanban, Home, Mail, Menu, Monitor, Moon, Sun, User, X } from "lucide-react";
import { profile } from "@/data/profile";

declare global { interface Window { __lenis?: Lenis } }
const ease = [0.76, 0, 0.24, 1] as const;

/* ---------- Preloader (Ameer): counter + name, slides up. Once per session. ---------- */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("mp-loaded") === "1"; sessionStorage.setItem("mp-loaded", "1"); } catch {}
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) { setShow(false); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick); else setTimeout(() => setShow(false), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="no-print fixed inset-0 z-[200] flex flex-col justify-between bg-[#0b0b0c] p-6 text-white sm:p-10" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease }}>
          <span className="eyebrow !text-white/50">Portfolio · {new Date().getFullYear()}</span>
          <div className="overflow-hidden">
            <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }} className="cond text-[22vw] sm:text-[15vw]">Marshall</motion.p>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-sm text-white/60">{profile.role}</span>
            <span className="cond text-7xl tabular-nums sm:text-8xl">{n}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Custom cursor (Ameer): ring that grows over links ---------- */
export function Cursor() {
  const x = useSpring(-100, { stiffness: 500, damping: 40 });
  const y = useSpring(-100, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a,button,[data-cursor]") as HTMLElement | null;
      setBig(!!el);
      setLabel(el?.dataset.cursor || "");
    };
    addEventListener("mousemove", move);
    addEventListener("mouseover", over);
    return () => { removeEventListener("mousemove", move); removeEventListener("mouseover", over); };
  }, [x, y]);
  return (
    <motion.div aria-hidden style={{ x, y }} className="cursor-dot no-print pointer-events-none fixed left-0 top-0 z-[150] hidden md:block">
      <motion.div animate={{ width: label ? 92 : big ? 56 : 30, height: label ? 92 : big ? 56 : 30, backgroundColor: label ? "var(--accent)" : "rgba(0,0,0,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-text/60 mix-blend-difference text-[11px] font-medium uppercase tracking-wider text-white"
        style={{ borderColor: label ? "transparent" : undefined }}>
        {label}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Smooth scroll ---------- */
export function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const href = (e.target as HTMLElement).closest("a")?.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const el = href === "#top" ? document.body : document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("click", onClick); lenis.destroy(); window.__lenis = undefined; };
  }, []);
  useEffect(() => { window.__lenis?.scrollTo(0, { immediate: true }); }, [path]);
  return null;
}

/* ---------- Theme: follows the device by default; System → Light → Dark ---------- */
type Mode = "system" | "light" | "dark";
function applyMode(mode: Mode) {
  const sys = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = mode === "system" ? sys : mode;
}
export function useThemeMode() {
  const [mode, setMode] = useState<Mode>("system");
  useEffect(() => {
    let saved: Mode = "system";
    try { const t = localStorage.getItem("theme"); if (t === "light" || t === "dark") saved = t; } catch {}
    setMode(saved);
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { let m: string | null = null; try { m = localStorage.getItem("theme"); } catch {} if (m !== "light" && m !== "dark") applyMode("system"); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const cycle = () => {
    const next: Mode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    try { if (next === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", next); } catch {}
    applyMode(next);
    setMode(next);
  };
  return { mode, cycle };
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, cycle } = useThemeMode();
  const Icon = mode === "system" ? Monitor : mode === "light" ? Sun : Moon;
  const label = mode === "system" ? "Theme: system" : mode === "light" ? "Theme: light" : "Theme: dark";
  return (
    <button onClick={cycle} aria-label={`${label}. Click to change`} title={label}
      className={`grid place-items-center rounded-full text-muted transition hover:text-text ${compact ? "size-11" : "size-11 border border-line hover:border-text"}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={mode} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.25 }}><Icon size={17} /></motion.span>
      </AnimatePresence>
    </button>
  );
}

/* ---------- Floating bottom bar ---------- */
const barItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects/", label: "Projects", icon: FolderKanban },
  { href: "/about/", label: "About", icon: User },
  { href: "/contact/", label: "Contact", icon: Mail },
];
export function BottomBar() {
  const path = usePathname();
  const [visible, setVisible] = useState(true);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => { const y = scrollY; setVisible(y < 120 || y < last.current || innerHeight + y >= document.documentElement.scrollHeight - 40); last.current = y; };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  if (path?.startsWith("/resume")) return null;
  return (
    <motion.nav aria-label="Quick navigation" initial={{ y: 120, opacity: 0 }} animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.2 }}
      className="no-print fixed inset-x-0 bottom-[max(14px,env(safe-area-inset-bottom))] z-[60] flex justify-center px-3">
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-[0_18px_50px_-15px_rgba(0,0,0,.45)] backdrop-blur-xl">
        {barItems.map((it) => {
          const active = it.href === "/" ? path === "/" : path?.startsWith(it.href.replace(/\/$/, ""));
          const Icon = it.icon;
          return (
            <a key={it.href} href={it.href} aria-current={active ? "page" : undefined} className="relative flex h-11 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium sm:px-4">
              {active && <motion.span layoutId="bar-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <Icon size={17} className={`relative ${active ? "text-accent-ink" : "text-muted"}`} />
              <span className={`relative ${active ? "text-accent-ink" : "hidden text-muted sm:inline"}`}>{it.label}</span>
            </a>
          );
        })}
        <span className="mx-1 h-6 w-px bg-line" />
        <ThemeToggle compact />
      </div>
    </motion.nav>
  );
}

/* ---------- Header (Ameer blur + Mr Bayo "Hire me" pill) ---------- */
const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/projects/", label: "Projects" },
  { href: "/resume/", label: "Résumé" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const last = useRef(0);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => { const y = scrollY; setHidden(y > 200 && y > last.current); last.current = y; };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  if (path?.startsWith("/resume")) return null;

  return (
    <motion.header animate={{ y: hidden && !open ? "-100%" : 0 }} transition={{ duration: 0.4, ease }} className="no-print fixed inset-x-0 top-0 z-50">
      <div className="header-blur pointer-events-none absolute inset-0 h-28 bg-bg/40" aria-hidden />
      <nav aria-label="Primary" className="relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-10">
        <a href="/" className="text-[22px] font-bold tracking-[-0.04em]">marshall<span className="text-accent">.</span></a>
        <ul className="hidden items-center gap-9 lg:flex">
          {nav.map((l) => {
            const active = l.href === "/" ? path === "/" : path?.startsWith(l.href.replace(/\/$/, ""));
            return (
              <li key={l.href}>
                <a href={l.href} className="group relative text-[14px] font-medium">
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-text transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="/resume/" className="hidden size-11 place-items-center rounded-full border border-line text-muted transition hover:border-text hover:text-text sm:grid" aria-label="View résumé"><Download size={16} /></a>
          <a href="/contact/" className="hidden rounded-full bg-accent px-5 py-2.5 text-[14px] font-medium text-accent-ink transition hover:opacity-90 sm:inline-block">Hire me</a>
          <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full border border-line lg:hidden" aria-label="Menu" aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/60" />
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease }}
            className="fixed inset-0 top-0 -z-10 flex flex-col justify-end bg-bg px-5 pb-10 pt-24 lg:hidden">
            {nav.map((l, i) => (
              <motion.a key={l.href} href={l.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }} className="cond py-1 text-7xl">{l.label}</motion.a>
            ))}
            <a href="/contact/" className="mt-8 rounded-full bg-accent px-6 py-4 text-center font-medium text-accent-ink">Hire me</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
