import { Section, Container, Prose } from "@/components/craft";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </Prose>

          <div className="space-y-4">
            {/* Search input skeleton */}
            <Skeleton className="h-10 w-full" />

            {/* Filter skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Posts grid skeleton */}
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
