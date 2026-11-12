// Regenerates public/Marshall-Presson-CV.pdf from the /resume page.
// Usage: npm run build && npx serve out -l 4321 & node scripts/make-cv.cjs
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto(process.env.CV_URL || "http://localhost:4321/resume/", { waitUntil: "networkidle" });
  await p.emulateMedia({ media: "print" });
  await p.pdf({ path: "public/Marshall-Presson-CV.pdf", format: "A4", printBackground: true, margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" } });
  await b.close();
  console.log("Wrote public/Marshall-Presson-CV.pdf");
})();
