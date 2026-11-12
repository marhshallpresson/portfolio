import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Six_Caps } from "next/font/google";
import { profile } from "@/data/profile";
import { BottomBar, Cursor, Header, SmoothScroll } from "@/components/shell";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const sixcaps = Six_Caps({ weight: "400", subsets: ["latin"], variable: "--font-sixcaps", display: "swap" });

const title = `${profile.name} | Software Engineer & Mobile Developer`;
const description = "Marshall Presson is a full-stack software engineer and mobile developer in Nigeria, building web apps, Flutter products and payment integrations.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: profile.siteUrl, title, description, siteName: profile.name, images: [{ url: "/og.png", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var sys=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:sys}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${profile.siteUrl}/#marshall-presson`,
  name: profile.name,
  alternateName: profile.fullName,
  jobTitle: profile.role,
  description,
  image: `${profile.siteUrl}${profile.photo}`,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  telephone: profile.phones[0]?.tel,
  address: { "@type": "PostalAddress", addressLocality: "Eket", addressRegion: "Akwa Ibom", addressCountry: "NG" },
  sameAs: profile.socials.map((s) => s.href).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable} ${sixcaps.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body id="top" className="min-h-dvh overflow-x-hidden">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">Skip to content</a>
        <Cursor />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BottomBar />
      </body>
    </html>
  );
}
