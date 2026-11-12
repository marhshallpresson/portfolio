/**
 * SINGLE SOURCE OF TRUTH for every page, the /resume page and the downloadable CV PDF.
 * Search for `TODO` to find values that still need confirming.
 */

export const profile = {
  name: "Marshall Presson",
  first: "Marshall",
  fullName: "Marshall Presson Nimuno",
  role: "Full-Stack & Mobile Engineer",
  roles: ["Full-Stack Engineer", "Mobile Engineer", "Payments & Integrations Engineer", "Web3 Builder"],
  oneLiner: "I'm Marshall Presson, a software engineer building web and mobile apps, payment integrations and creator tools.",
  headline: "I ship web and mobile products where the payment flow can't fail.",
  intro:
    "Full-stack and mobile software engineer with 3+ years shipping payment flows, marketplaces and creator tools. Lead Developer at TipStack (Solana creator payments). Open to full-time and contract roles, remote.",
  summary:
    "Full-stack engineer with 3+ years shipping web and cross-platform products: creator payments, e-commerce, service marketplaces and business platforms. I turn business requirements into working user journeys, integrate the services that make them real (Paystack, Stripe, OAuth2, Solana wallets), and care about debugging, maintainability and clear communication.",
  about: [
    "I'm Marshall, an engineer from Eket, Akwa Ibom, Nigeria. I started in 2022 doing IT support and teaching computer classes at Eagle Bliss Empire, taught myself mobile development, and have been shipping products for clients and teams ever since.",
    "Today I lead development at TipStack, a creator monetization platform on Solana, and build product at Kendibo, a hackathon-winning home-services marketplace. I also contract for businesses that need a platform redesigned, a marketplace built, or a payment flow that just works.",
    "I build under pressure and in public: 1st place at the DevFest Eket and Build with AI hackathons, 2nd place at Next Gen Summit Uyo, and open-source tools on GitHub. I'm completing a B.Sc. in Computer Science at Miva Open University, and I care about clean code, clear communication and owning outcomes end to end.",
  ],
  location: "Eket, Akwa Ibom, Nigeria",
  timezone: "Africa/Lagos",
  availability: "Open to full-time & contract · Remote (WAT, UTC+1)",
  email: "mobot685@gmail.com",
  phones: [
    { label: "Mobile / WhatsApp", display: "+234 901 318 6776", tel: "+2349013186776", whatsapp: true },
  ],
  siteUrl: "https://marshallpresson.cv",
  domain: "marshallpresson.cv",
  photo: "/marshall.jpg",
  /** Hero slider. Add more photos to public/photos/ and list them here. */
  photos: [
    { src: "/marshall.jpg", caption: "Marshall Presson" },
    // TODO: add the Superteam Frontier pitch photo, e.g. { src: "/photos/frontier-pitch.jpg", caption: "Pitching TipStack at Superteam NG Frontier" },
  ],
  listings: [
    { label: "Let's talk (Cal.com)", href: "https://cal.com/marshallpresson" },
    { label: "All links (Linktree)", href: "https://linktr.ee/marshallpresson" },
    { label: "Open-source on GitHub", href: "https://github.com/marhshallpresson" },
  ],
  booking: "https://cal.com/marshallpresson",
  tip: "https://tipstack.fun/mobot",
  cvFile: "/Marshall-Presson-CV.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marshall-presson/", handle: "marshall-presson" },
    { label: "GitHub", href: "https://github.com/marhshallpresson", handle: "marhshallpresson" },
    { label: "Instagram", href: "https://www.instagram.com/marshallpresson0/", handle: "marshallpresson0" },
    { label: "Linktree", href: "https://linktr.ee/marshallpresson", handle: "linktr.ee/marshallpresson" },
    { label: "Facebook", href: "", handle: "Marshall Presson" }, // TODO: Facebook profile URL
  ],
  /** Contact form delivery (https://formsubmit.co). First message triggers a one-time activation email. */
  formEndpoint: "https://formsubmit.co/ajax/mobot685@gmail.com",
};

export const stats = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 10, suffix: "+", label: "Products shipped" },
  { value: 5, suffix: "K+", label: "Users on one app" },
  { value: 3, suffix: "", label: "Hackathon podiums" },
];

export const services = [
  { title: "Full-Stack Development", body: "React / Next.js front-ends on Node.js or FastAPI back-ends, built around real user journeys.", icon: "code" },
  { title: "Mobile Apps", body: "Cross-platform Flutter apps with auth, chat, push notifications and offline-first behaviour.", icon: "phone" },
  { title: "Payments & Integrations", body: "Paystack, Stripe, OAuth2 and Solana wallet flows wired end-to-end, with failure states handled.", icon: "card" },
  { title: "Backend & APIs", body: "REST APIs and server logic designed around how they're consumed: validation, errors, idempotency.", icon: "server" },
  { title: "AI & Automation", body: "LLM-powered features, multi-agent tooling and browser automation that remove manual work.", icon: "spark" },
  { title: "Product Engineering", body: "Turning fuzzy requirements into a scoped MVP, clear user flows and shipped increments.", icon: "rocket" },
];

export type Org = { id: string; name: string; initials: string; color: string; about: string; url?: string; logo?: string };
/** Teams, clients and communities. Drop a real logo at public/logos/<id>.svg and set `logo`. */
export const orgs: Org[] = [
  { id: "tipstack", name: "TipStack", initials: "TS", color: "#9B37E6", about: "Creator monetization and rewards platform on Solana. I lead development.", logo: "/logos/tipstack.png" },
  { id: "kendibo", name: "Kendibo", initials: "K", color: "#0F9D58", about: "Home-services marketplace connecting customers with trusted professionals. Hackathon winner.", url: "https://kendibo.ng" }, // TODO: add logo: "/logos/kendibo.png"
  { id: "missnova", name: "Miss Nova Nigeria", initials: "MN", color: "#C99A16", about: "National pageant organisation. Website build and content migration.", logo: "/logos/missnova.png" },
  { id: "nextgen", name: "NextGen Talent", initials: "NG", color: "#C99A16", about: "E-voting, event tickets and commerce platform for talent shows.", url: "https://nextgentalenttv.com", logo: "/logos/nextgen.png" },
  { id: "asoeva", name: "ASO EVA", initials: "AE", color: "#6B21A8", about: "Asoeva Awards: official public voting platform for the Association of Event Vendors.", url: "https://asoeva.vercel.app", logo: "/logos/asoeva.jpg" },
  { id: "zeroyale", name: "Zeroyale Ventures", initials: "ZV", color: "#1E3A8A", about: "Digital licensing & documentation: vehicle papers and business registration online.", url: "https://zeroyale-auto.vercel.app", logo: "/logos/zeroyale.png" },
  { id: "digi", name: "Digi Exclusive Innovation", initials: "DE", color: "#7C3AED", about: "E-commerce company. I led their vendor mobile app to 5K+ users." },
  { id: "komewells", name: "Komewells Global Services", initials: "KG", color: "#0E7490", about: "Services business. Platform redesign, marketplace and travel-booking integration." },
  { id: "eaglebliss", name: "Eagle Bliss Empire", initials: "EB", color: "#1E40AF", about: "IT services company where I started: support, training and client websites." },
  { id: "superteam", name: "Superteam NG", initials: "ST", color: "#5B21B6", about: "Solana builder community. Pitched TipStack at Superteam NG's Frontier hackathon event." },
  { id: "gdg", name: "GDG DevFest Eket", initials: "G", color: "#1A73E8", about: "Google Developer Groups. 1st place at the DevFest Eket and Build with AI hackathons." },
];

export type Project = {
  slug: string;
  name: string;
  year: string;
  platform: string;
  kicker: string;
  role: string;
  featured: boolean;
  color: string;
  ink: "light" | "dark";
  pattern: "topo" | "grid" | "dots" | "rings";
  summary: string;
  problem: string;
  approach: string;
  decisions: string;
  challenges: string;
  result: string;
  stack: string[];
  link?: { label: string; href: string };
  logo?: string;
  live?: string;
  shots?: { src: string; label: string; mobile?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "tipstack",
    name: "TipStack",
    year: "2026",
    platform: "React · Solana",
    kicker: "Creator monetization platform",
    role: "Lead Developer",
    featured: true,
    color: "#9B37E6",
    ink: "light",
    pattern: "topo",
    logo: "/logos/tipstack.png",
    summary: "A creator rewards platform where fans connect a wallet and support creators in seconds.",
    problem: "Getting paid as a creator means juggling payment links, fees and confusing wallet set-ups. Every extra step in onboarding or checkout loses a supporter.",
    approach: "Built the product in React + Vite around two journeys: creator onboarding and supporter checkout. Wallet connection and on-chain payment are treated as one flow, so a supporter never leaves the creator's page.",
    decisions: "Used Dynamic SDK as the wallet layer with Phantom on Solana, rather than hand-rolling wallet adapters, to keep onboarding consistent and reduce integration surface. Preview deployments on Vercel for every branch so product changes can be reviewed live.",
    challenges: "Wallet SDK configuration behaved differently across environments. I traced issues from the UI through SDK config to network settings until each failure had a clear root cause, and documented the fixes for the team.",
    result: "A working creator onboarding and wallet-connect payment flow in active iteration, with architecture ready for rewards and on-chain features.",
    stack: ["React", "Vite", "TypeScript", "Solana", "Vercel"],
    live: "https://tipstack.fun",
    shots: [
      { src: "/shots/tipstack-home.jpg", label: "Landing page" },
      { src: "/shots/tipstack-earn.jpg", label: "Three ways to earn" },
      { src: "/shots/tipstack-glance.jpg", label: "At a glance & FAQ" },
      { src: "/shots/tipstack-mobile.jpg", label: "Mobile view", mobile: true },
    ],
  },
  {
    slug: "kendibo",
    name: "Kendibo",
    year: "2026",
    platform: "Marketplace",
    kicker: "Home-services marketplace",
    role: "Product Developer",
    featured: true,
    color: "#0B7A44",
    ink: "light",
    pattern: "grid",
    summary: "Customers discover and book trusted home-service professionals, and providers get steady work.",
    problem: "Finding a reliable plumber, electrician or cleaner runs on word of mouth. Customers can't compare providers, and good providers can't reach new customers.",
    approach: "Mapped the platform as two products sharing one core: the customer journey (discover → compare → book) and the provider journey (onboard → receive jobs → manage work), then built the MVP around booking as the central object.",
    decisions: "Kept v1 scope to discovery, booking and provider operations; payments, ratings and dispute handling were sequenced for after launch to get real usage data first.",
    challenges: "Balancing a two-sided marketplace: designing flows that work for customers without overloading providers, and defining clear launch-readiness criteria for a small team.",
    result: "Hackathon-winning MVP, live at kendibo.ng with an early-access waitlist for customers and service partners.",
    stack: ["React", "Node.js", "Firebase"], // TODO: confirm exact stack
    live: "https://kendibo.ng",
    shots: [{ src: "/shots/kendibo-home.jpg", label: "Landing page" }, { src: "/shots/kendibo-2.jpg", label: "How it works" }, { src: "/shots/kendibo-3.jpg", label: "Services" }],
  },
  {
    slug: "digimart",
    name: "DigiMart",
    year: "2024",
    platform: "Flutter",
    kicker: "E-commerce vendor app",
    role: "Mobile App Developer · Digi Exclusive",
    featured: true,
    color: "#C2410C",
    ink: "light",
    pattern: "dots",
    summary: "A cross-platform shopping and vendor app with secure payments, chat and push notifications.",
    problem: "Vendors needed a mobile storefront customers could trust with their money, and a way to keep buyers engaged after their first order.",
    approach: "Led end-to-end development in Flutter: cart and checkout first, then retention features (chat, push notifications, recommendations) once transactions were reliable.",
    decisions: "OAuth2-based authentication to protect accounts; both Stripe and Paystack for multi-currency payments so local and international buyers could pay with familiar methods.",
    challenges: "Making payment flows dependable across two providers and currencies, with clear states for pending, failed and successful transactions.",
    result: "Grew to 5K+ users; the payment integration was associated with a 25% revenue increase.",
    stack: ["Flutter", "Dart", "Firebase", "Stripe", "Paystack"],
  },
  {
    slug: "super-mcp-lite",
    name: "Super MCP Lite",
    year: "2026",
    platform: "Open source",
    kicker: "Local-first multi-agent IDE",
    role: "Creator",
    featured: true,
    color: "#111827",
    ink: "light",
    pattern: "rings",
    summary: "Orchestrates local (Ollama) and cloud AI agents on your codebase, with an Approve & Run gate on every risky command.",
    problem: "Cloud AI IDEs lock you into one provider and run code you can't always see. I wanted something local-first that mixes models and asks before doing anything destructive.",
    approach: "A Master Orchestrator receives a prompt and routes sub-tasks to the best available agent (Aider, SWE-Agent, Claude Code or local Ollama models) based on context limits and complexity.",
    decisions: "A hermetic bootstrapper: isolated Python venv plus portable static ffmpeg and Ollama binaries, so nothing touches system packages. Terminal commands render as Markdown with an explicit Approve & Run button.",
    challenges: "Cross-platform setup (Linux, macOS, WSL) and OS packaging locks such as Debian PEP 668; offline speech-to-text via a WebM → FFmpeg → Vosk pipeline.",
    result: "One-command install with a global `super` CLI and desktop shortcut; MIT-licensed on GitHub.",
    stack: ["Python", "Ollama", "FFmpeg"],
    link: { label: "View on GitHub", href: "https://github.com/marhshallpresson/super-mcp-lite" },
    shots: [{ src: "/shots/supermcp-chat.jpg", label: "Team chat & agent workspace" }],
  },
  {
    slug: "blisszits-cms",
    name: "Blisszits CMS",
    year: "2026",
    platform: "Next.js",
    kicker: "AI content OS for creators",
    role: "Product owner & developer",
    featured: false,
    color: "#DB2777",
    ink: "light",
    pattern: "topo",
    summary: "Workspaces, a content calendar, a Kanban idea board and an AI assistant that drafts scripts, captions and 30-day plans.",
    problem: "Creators run content across notes apps, spreadsheets and DMs, with no single place to go from idea to published post.",
    approach: "Wrote the PRD first, then built a multi-workspace Next.js app with status tracking (Draft → Published), calendar and Kanban views.",
    decisions: "Genkit + Google AI for generation features (30-day plans, script outlines, captions, hashtags), deployed on Firebase App Hosting.",
    challenges: "Making AI output structured enough to drop straight into the content pipeline instead of being a chat transcript.",
    result: "A full PRD and a working app on Firebase.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    link: { label: "View on GitHub", href: "https://github.com/marhshallpresson/blisszitscms" },
    shots: [{ src: "/shots/blisszits-workspace.jpg", label: "Workspace content grid (demo data)" }, { src: "/shots/blisszits-admin.jpg", label: "Workspace admin (demo data)" }, { src: "/shots/blisszits-analytics.jpg", label: "Brand analytics" }],
  },
  {
    slug: "eagle-pay",
    name: "Eagle Pay",
    year: "2023",
    platform: "Flutter",
    kicker: "Utility & subscription payments",
    role: "Mobile Developer",
    featured: false,
    color: "#EAB308",
    ink: "dark",
    pattern: "grid",
    summary: "Pay utility bills and international subscriptions from one app, with Paystack, live chat and push notifications.",
    problem: "Paying for international subscriptions and utilities from Nigeria is fragmented and often fails at the card step.",
    approach: "A mobile-first payment app built around a single checkout flow, with live chat for support when something goes wrong.",
    decisions: "Paystack as the payment rail; push notifications for payment status so users never wonder if a payment went through.",
    challenges: "Communicating payment states clearly across network failures and provider delays.",
    result: "A working mobile app covering end-to-end payment flows.",
    stack: ["Flutter", "Dart", "Paystack"],
  },
  {
    slug: "bliss-bot",
    name: "Bliss Bot",
    year: "2024",
    platform: "Node.js",
    kicker: "Browser automation at scale",
    role: "Creator",
    featured: false,
    color: "#4F46E5",
    ink: "light",
    pattern: "dots",
    summary: "Runs many virtual browser profiles with device emulation, proxy rotation and extension support for web testing and QA.",
    problem: "Manually testing how a site behaves across devices, networks and user profiles is slow and inconsistent.",
    approach: "Multi-profile Chrome automation with Puppeteer, each profile isolated with its own device, network and extensions.",
    decisions: "A one-click Windows launcher and logging so non-developers could run test sessions.",
    challenges: "Keeping many concurrent browser profiles stable and observable.",
    result: "Versioned releases (v24.09.2), public on GitHub.",
    stack: ["Node.js", "Puppeteer", "TypeScript"],
    link: { label: "View on GitHub", href: "https://github.com/marhshallpresson/Bliss-Bot" },
  },
  {
    slug: "mysql-exporter",
    name: "MySQL Exporter",
    year: "2026",
    platform: "Python",
    kicker: "One-click database dumps",
    role: "Creator",
    featured: false,
    color: "#0E7490",
    ink: "light",
    pattern: "rings",
    summary: "A small Flask app that exports a MySQL database as a SQL dump from the browser.",
    problem: "Managed hosts often don't give shell access to run mysqldump when you need a backup or migration.",
    approach: "Deploy, set DATABASE_URL, click export: the app streams a SQL dump from an env-configured or pasted connection string.",
    decisions: "Flask for minimal footprint; TLS CA support for managed databases; one-command deploy via Procfile.",
    challenges: "Handling TLS requirements of managed MySQL providers.",
    result: "Used to migrate data off a managed host without shell access.",
    stack: ["Python", "Flask", "MySQL"],
    link: { label: "View on GitHub", href: "https://github.com/marhshallpresson/mysql-exporter" },
  },
];

// Client projects added from logos supplied by Marshall. TODO: confirm descriptions, years and links.
projects.push(
  {
    slug: "aso-eva", name: "Asoeva Awards", year: "2026", platform: "Voting platform", kicker: "Official public voting platform", role: "Full-Stack Developer",
    featured: false, color: "#111111", ink: "light", pattern: "rings", logo: "/logos/asoeva.jpg", live: "https://asoeva.vercel.app",
    summary: "The official public voting portal for the Asoeva Awards, run by the Association of Event Vendors: browse award categories, search nominees and vote.",
    problem: "An awards night for the events industry needed a public, trustworthy way for fans to vote for vendors across many categories.",
    approach: "A dark, event-branded voting site with searchable award categories and per-category nominee pages, deployed on Vercel.",
    decisions: "Category-first navigation with live search so voters reach their vendor in a couple of taps on mobile.",
    challenges: "Keeping the production deployment healthy through rapid content and category changes before the event.",
    result: "A live voting portal for Asoeva Awards 2026.",
    stack: ["React", "Vercel", "Git"],
    shots: [{ src: "/shots/asoeva-home.jpg", label: "Voting portal" }, { src: "/shots/asoeva-2.jpg", label: "Award categories" }],
  },
  {
    slug: "nextgen-talent-tv", name: "NextGen Talent TV", year: "2026", platform: "Web platform", kicker: "E-voting, tickets & commerce platform", role: "Full-Stack Developer",
    featured: true, color: "#8A6408", ink: "light", pattern: "dots", logo: "/logos/nextgen.png", live: "https://nextgentalenttv.com",
    summary: "An e-voting, event ticketing and commerce platform for talent shows: organisers run contests and sell tickets, fans vote and watch live.",
    problem: "Talent show organisers were stitching together separate tools for voting, ticket sales, livestreams and payments.",
    approach: "One platform with role-based accounts (fans and organisers), event discovery, paid voting, ticketing, a gallery, livestream and adverts.",
    decisions: "Separate organiser onboarding (register?role=organiser) from fan sign-up; Google sign-in alongside email to reduce friction at the moment of voting.",
    challenges: "Designing voting and checkout flows that stay fast and fair under traffic spikes during live shows.",
    result: "Live at nextgentalenttv.com with organiser and fan accounts, events, voting and ticketing.",
    stack: ["React", "Node.js"], // TODO: confirm stack
    shots: [{ src: "/shots/nextgen-home.jpg", label: "Home & featured events" }, { src: "/shots/nextgen-2.jpg", label: "Platform stats" }, { src: "/shots/nextgen-login.jpg", label: "Sign in (fans & organisers)" }],
  },
  {
    slug: "zeroyale", name: "Zeroyale Ventures", year: "2026", platform: "Web app", kicker: "Digital licensing & documentation", role: "Full-Stack Developer",
    featured: true, color: "#4338CA", ink: "light", pattern: "grid", logo: "/logos/zeroyale.png", live: "https://zeroyale-auto.vercel.app",
    summary: "Renew car papers, apply for a driver's licence or register a business online, then track every request from a personal dashboard.",
    problem: "Vehicle papers and business registration in Nigeria mean queues, middlemen and no visibility into where a request stands.",
    approach: "A customer app for applying, paying and tracking requests, plus an agent programme so field agents can process requests on customers' behalf.",
    decisions: "Account-based tracking (sign in / register) so every request has a status history; transparent price checker before checkout; delivery or collection options.",
    challenges: "Modelling many document types and request states in one consistent flow, and onboarding agents without exposing customer data.",
    result: "A live service site with customer accounts, request tracking and agent onboarding.",
    stack: ["React", "TypeScript", "Vercel"], // TODO: confirm stack
    shots: [{ src: "/shots/zeroyale-home.jpg", label: "Landing page" }, { src: "/shots/zeroyale-signin.jpg", label: "Customer sign in" }, { src: "/shots/zeroyale-register.jpg", label: "Create account" }, { src: "/shots/zeroyale-services.jpg", label: "Services & pricing" }],
  },
  {
    slug: "miss-nova-nigeria", name: "Miss Nova Nigeria", year: "2026", platform: "Website", kicker: "Pageant organisation website", role: "Web Developer",
    featured: false, color: "#B45309", ink: "light", pattern: "dots", logo: "/logos/missnova.png",
    summary: "Website build and content migration for a national beauty pageant organisation.",
    problem: "The organisation's existing site content needed to be preserved and moved to a cleaner, easier-to-manage website.",
    approach: "Built a Python scraper to download the existing site with all its assets, normalised the content, then rebuilt the site around it.",
    decisions: "Automated extraction instead of manual copy-paste, so every page, image and asset carried over with its structure intact.",
    challenges: "Dynamic, JavaScript-rendered content that a simple crawler would miss; handled with an interactive crawl mode and JS URL mining.",
    result: "A complete content migration and a refreshed website.",
    stack: ["Python", "React"],
  },
);

export type Role = { title: string; org: string; orgId: string; period: string; place: string; badge: string; summary: string };
export const communityWork = [
  { year: "2026", title: "Organizing team", event: "WordCamp Eket", description: "Helped organize Eket's inaugural WordCamp, bringing the local WordPress community together.", source: "https://eket.wordcamp.org/2026/recap-eket-hosts-its-first-wordcamp-from-idea-to-income-building-opportunities-with-wordpress/", sourceLabel: "Read the event recap" },
  { year: "2025", title: "Volunteer and media support", event: "DevFest Eket", description: "Supported the volunteer and media teams at DevFest Eket.", source: "https://ng.linkedin.com/in/matt-kay-vic", sourceLabel: "Read the community mention" },
  { year: "2026", title: "Volunteer", event: "Build with AI Eket", description: "Supported a community event focused on hands-on AI development.", source: "https://ng.linkedin.com/in/iamjackieriel", sourceLabel: "Read the organizer's mention" },
];
export const experience: Role[] = [
  { title: "Lead Developer", org: "TipStack", orgId: "tipstack", period: "2026 — Present", place: "Remote", badge: "Remote",
    summary: "Lead the React/Vite product: creator pages, onboarding and payment UX. Own wallet-connection and Solana payment integration (Dynamic SDK, Phantom)." },
  { title: "Product Developer", org: "Kendibo", orgId: "kendibo", period: "2026 — Present", place: "Nigeria", badge: "Nigeria",
    summary: "Built the hackathon-winning MVP of a home-services marketplace: discovery, booking and provider operations." },
  { title: "Full-Stack / Mobile Developer", org: "Freelance · Komewells Global Services", orgId: "komewells", period: "2024 — Present", place: "Remote", badge: "Contract",
    summary: "Platform redesign, marketplace/e-commerce build and travel-booking integration for Komewells. Payment, geolocation, offline-first and AI features for client apps." },
  { title: "Mobile App Developer", org: "Digi Exclusive Innovation", orgId: "digi", period: "2024", place: "Nigeria", badge: "Nigeria",
    summary: "Led an e-commerce vendor app to 5K+ users with OAuth2, Stripe/Paystack, chat and push notifications. Payment integration associated with a 25% revenue lift." },
  { title: "IT Specialist", org: "Eagle Bliss Empire", orgId: "eaglebliss", period: "2022 — 2024", place: "Eket", badge: "On-site",
    summary: "IT support, computer training programmes and client web projects (eaglebliss.co)." },
];

export const education = [
  { title: "B.Sc. Computer Science", org: "Miva Open University", period: "2025 — 2028", note: "In progress" },
  { title: "Frontend Web Development", org: "GOPRO Web Academy", period: "2023", note: "Certificate" },
  { title: "Mobile App Development", org: "Udemy", period: "2022", note: "Certificate" },
  { title: "AI Automation & Data Analytics", org: "EvolveHQ Talent Hub", period: "Ongoing", note: "Programme" },
];

export type Award = { year: string; place: string; title: string; org: string; logo?: string; initials: string; color: string };
export const recognition: Award[] = [
  { year: "2026", place: "1st place", title: "DevFest Eket Hackathon", org: "Google Developer Groups Eket", logo: "/logos/gdg.svg", initials: "GDG", color: "#4285F4" },
  { year: "2026", place: "1st place", title: "Build with AI Hackathon", org: "Google Developer Groups", logo: "/logos/gdg.svg", initials: "GDG", color: "#4285F4" },
  { year: "2026", place: "2nd place", title: "Next Gen Summit Hackathon, Uyo", org: "Next Gen Summit", initials: "NGS", color: "#0F172A" }, // TODO: add logo at public/logos/nextgen-summit.png
];

export const skillWords = ["Frontend Development", "Mobile Apps", "Payments", "Backend & APIs", "Web3 / Solana", "AI Automation", "Product Engineering"];

export const skills: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
  "Backend & APIs": ["Node.js", "Express", "Python", "FastAPI", "Flask", "REST"],
  Mobile: ["Flutter", "Dart", "Push notifications", "Offline-first"],
  "Payments & Web3": ["Paystack", "Stripe", "Solana", "Phantom", "Dynamic SDK", "OAuth2"],
  "Data & Cloud": ["PostgreSQL", "MySQL", "Firebase", "Vercel", "Git"],
  "AI & Automation": ["LLM agents", "Ollama", "Genkit", "Puppeteer", "Prompt engineering"],
};

export const toolbelt = ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "Flutter", "Dart", "Tailwind CSS", "Firebase", "PostgreSQL", "MySQL", "Stripe", "Paystack", "Solana", "Vercel", "Git"];

/** Qualities: what a team gets when they hire Marshall. */
export const qualities = [
  { title: "Ownership", body: "I take features from requirement to production and stay with them after launch: monitoring, fixing, improving.", proof: "Lead Developer at TipStack" },
  { title: "Delivers under pressure", body: "Hackathons are my proving ground: scope fast, build fast, demo working software to judges.", proof: "3 hackathon podiums, two 1st places" },
  { title: "Payments-grade reliability", body: "I design for the paths that fail: timeouts, retries, duplicate webhooks, clear transaction states.", proof: "Paystack, Stripe & Solana integrations" },
  { title: "Product thinking", body: "I ask who it's for and what success looks like before writing code, then ship the smallest thing that proves it.", proof: "Kendibo MVP, Zeroyale, NextGen Talent TV" },
  { title: "Clear communicator", body: "Async-friendly updates, readable code and documentation, and straight answers about trade-offs and timelines.", proof: "Remote contract work since 2024" },
  { title: "Fast, self-driven learner", body: "Self-taught into mobile and full-stack, now formalising it with a Computer Science degree while shipping.", proof: "B.Sc. Computer Science, Miva (in progress)" },
];

export const principles = [
  { title: "Understand the problem first", body: "Before writing code I make sure I know who the system serves, what constraints exist and what failure looks like." },
  { title: "Design for failure", body: "Payments time out, wallets disconnect, webhooks arrive twice. I build explicit states, retries and idempotency for the paths that go wrong." },
  { title: "Ship in small increments", body: "A working slice in front of users this week beats a perfect plan next quarter. I iterate from real feedback." },
  { title: "Debug from symptoms to root cause", body: "I trace problems through UI, SDK config, network and API until I can explain exactly why something broke." },
  { title: "Make systems maintainable", body: "Clear structure, consistent conventions and documentation, so the next change is safe and predictable." },
  { title: "Explain it simply", body: "If I can't explain a system to a non-engineer, I don't understand it well enough. Clear docs, clear PRs, clear demos." },
];

export const process = [
  { step: "Understand", body: "Users, constraints, existing systems and the real requirement." },
  { step: "Model", body: "Journeys, data, integrations and failure states." },
  { step: "Design", body: "The simplest architecture that solves today's problem well." },
  { step: "Build", body: "Clear, testable increments, demoed early." },
  { step: "Validate", body: "Real devices, real payments, real edge cases." },
  { step: "Improve", body: "Measure, simplify and iterate on what matters." },
];
