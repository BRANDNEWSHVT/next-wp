import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1
          className="mb-2 text-8xl font-black tracking-tight text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </h1>
        <h2
          className="mb-4 text-2xl font-semibold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Page Not Found
        </h2>
        <div className="mb-8 border-y-2 border-foreground py-4">
          <p
            className="text-lg text-neutral-600"
            style={{ fontFamily: "'Lora', serif" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block border-2 border-foreground bg-foreground px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-background transition-all hover:bg-background hover:text-foreground"
        >
          Return Home
        </Link>
        <div className="mt-12 text-center font-serif text-xl tracking-[1em] text-neutral-300">
          &bull; &bull; &bull;
        </div>
      </div>
    </div>
  );
}
