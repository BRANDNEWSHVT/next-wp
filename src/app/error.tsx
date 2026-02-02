"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // TODO: Send to error reporting service (Sentry, LogRocket, etc.)
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1
          className="mb-4 text-6xl font-black tracking-tight text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Error
        </h1>
        <div className="mb-8 border-y-2 border-foreground py-4">
          <p
            className="text-lg text-neutral-600"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Something went wrong. We apologize for the inconvenience.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="border-2 border-foreground bg-foreground px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-background transition-all hover:bg-background hover:text-foreground"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-foreground bg-background px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Go Home
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 rounded border border-red-300 bg-red-50 p-4 text-left">
            <p className="font-mono text-xs text-red-800">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
