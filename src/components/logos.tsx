import {
  siReact, siTypescript, siNextdotjs, siVite, siNodedotjs, siPython, siFastapi, siFlask, siFlutter, siDart,
  siTailwindcss, siFirebase, siPostgresql, siMysql, siStripe, siSolana, siVercel, siGit, siOllama, siFfmpeg,
  siGithub, siInstagram, siFacebook, siX, siWhatsapp, siGmail, siLinktree, siCaldotcom,
} from "simple-icons";

type Icon = { path: string; hex: string };

// Brands not in simple-icons: simple, recognisable marks.
const paystack: Icon = { hex: "00C3F7", path: "M2 3h20v2.6H2zM2 8.2h20v2.6H2zM2 13.4h14v2.6H2zM2 18.6h17v2.6H2z" };
const linkedin: Icon = { hex: "0A66C2", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" };

const tech: Record<string, Icon> = {
  React: siReact, TypeScript: siTypescript, "Next.js": siNextdotjs, Vite: siVite, "Node.js": siNodedotjs,
  Python: siPython, FastAPI: siFastapi, Flask: siFlask, Flutter: siFlutter, Dart: siDart,
  "Tailwind CSS": siTailwindcss, Firebase: siFirebase, PostgreSQL: siPostgresql, MySQL: siMysql,
  Stripe: siStripe, Paystack: paystack, Solana: siSolana, Vercel: siVercel, Git: siGit, Ollama: siOllama, FFmpeg: siFfmpeg,
};

const social: Record<string, Icon> = {
  GitHub: siGithub, Instagram: siInstagram, Facebook: siFacebook, X: siX, LinkedIn: linkedin, WhatsApp: siWhatsapp, Email: siGmail, Linktree: siLinktree, Cal: siCaldotcom,
};

// Monochrome brands (black/white logos) follow the text colour so they work in both themes.
const mono = new Set(["000000", "181717", "161618", "111111"]);

export function TechIcon({ name, size = 18, colored = true, className = "" }: { name: string; size?: number; colored?: boolean; className?: string }) {
  const i = tech[name];
  if (!i) return null;
  const fill = colored && !mono.has(i.hex) ? `#${i.hex}` : "currentColor";
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} role="img" aria-label={name}>
      <path d={i.path} fill={fill} />
    </svg>
  );
}

export function SocialIcon({ name, size = 16, className = "" }: { name: string; size?: number; className?: string }) {
  const i = social[name];
  if (!i) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <path d={i.path} fill="currentColor" />
    </svg>
  );
}

/** Logo tile: rounded square with initials (used until a real logo file is supplied). */
export function Tile({ initials, color, logo, name, size = 44, inverted = false, className = "" }: { initials: string; color: string; logo?: string; name: string; size?: number; inverted?: boolean; className?: string }) {
  if (logo) {
    return (
      <span className={`relative inline-block shrink-0 overflow-hidden rounded-[24%] bg-white ring-1 ring-black/5 ${className}`} style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={`${name} logo`} className="absolute inset-[10%] h-[80%] w-[80%] object-contain" />
      </span>
    );
  }
  return (
    <span role="img" aria-label={`${name} logo`} className={`inline-grid shrink-0 place-items-center rounded-[24%] font-bold tracking-tight ${className}`}
      style={{ width: size, height: size, background: inverted ? "#fff" : color, color: inverted ? color : "#fff", fontSize: size * (initials.length > 1 ? 0.36 : 0.46) }}>
      {initials}
    </span>
  );
}
