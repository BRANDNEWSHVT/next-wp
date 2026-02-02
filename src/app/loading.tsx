export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-neutral-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        </div>
        <p
          className="font-mono text-sm uppercase tracking-widest text-neutral-500"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
