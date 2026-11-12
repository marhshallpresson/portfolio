# marshallpresson.cv

Personal portfolio of **Marshall Presson**, full-stack & mobile developer.
Next.js 16 (static export) · TypeScript · Tailwind CSS v4 · Motion · Lenis.
Design: a merged rebuild of the reference portfolios (ameerbamigbayan.com, mrbayo.dev, ime.com.ng, devenny.vercel.app, oladiipoayomide.dev). Layout and interaction patterns are recreated from scratch; no third-party code, copy or images are used. Six Caps + Inter + JetBrains Mono; blue brand; light by default, dark in black + ash.

Pages: `/` home · `/projects/` · `/projects/<slug>/` case studies · `/about/` · `/contact/` (hire form) · `/resume/` (printable, source of the CV PDF).

## Edit content
All text lives in **`src/data/profile.ts`**: experience, projects, teams, skills, socials, phone numbers.
The homepage, the printable résumé (`/resume/`) and the CV PDF are all generated from it.
Search the file for `TODO` to find what still needs real values.

- **Headshot:** add `public/marshall.jpg` (portrait, ≥1000px). Until then an "MP" monogram is shown.
- **Logos:** drop real logos at `public/logos/<name>.svg` and set `logo: "/logos/<name>.svg"` on the org/project in `profile.ts`.
- **CV PDF:** `public/Marshall-Presson-CV.pdf` is generated from `/resume`. After editing content: `npm run build`, serve `out/` on port 4321, then `node scripts/make-cv.cjs`.
- **Contact form:** sends real email through FormSubmit (free, no account) to the address in `profile.formEndpoint`. The **first** submission on the live site triggers a one-time "Activate form" email to that inbox. Click it, and every later message arrives directly. Senders get an automatic confirmation reply.
- Social preview image: `public/og.png` (1200×630).

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy to Vercel + connect marshallpresson.cv
1. Push this repo to GitHub.
2. vercel.com → **Add New → Project** → import the repo → Deploy (framework auto-detected; no settings needed).
3. Project → **Settings → Domains** → add `marshallpresson.cv` and `www.marshallpresson.cv`.
4. At your `.cv` registrar's DNS panel, set the records Vercel shows. Usually:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
5. Wait for DNS to propagate (minutes to a few hours). Vercel issues HTTPS automatically.

Any static host works too (Netlify, Cloudflare Pages, GitHub Pages): upload the `out/` folder.

See `docs/RESEARCH_AND_PLAN.md` for the competitive research, design rationale and launch timeline.
