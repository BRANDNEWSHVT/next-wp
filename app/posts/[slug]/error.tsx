"use client";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section className="py-20 md:py-28">
      <Container className="max-w-2xl text-center">
        <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-muted-foreground" strokeWidth={1.5} />
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          We couldn&apos;t load this post. This might be a temporary issue.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={reset}
            className="rounded-none bg-foreground text-background hover:bg-background hover:text-foreground border-2 border-foreground uppercase tracking-widest font-medium text-sm px-8 py-4 h-auto transition-colors duration-100"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background uppercase tracking-widest font-medium text-sm px-8 py-4 h-auto transition-colors duration-100"
          >
            Go Back
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-8 p-4 bg-muted text-left text-sm overflow-auto border-2 border-foreground">
            {error.message}
          </pre>
        )}
      </Container>
    </Section>
  );
}
