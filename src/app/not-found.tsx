export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="cond text-[clamp(8rem,30vw,20rem)] text-accent">404</p>
        <p className="mt-4 text-xl text-muted">This page doesn&apos;t exist.</p>
        <a href="/" className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-medium text-accent-ink">Back home</a>
      </div>
    </main>
  );
}
