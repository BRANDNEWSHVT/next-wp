import { Section, Container, Prose } from "@/components/craft";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <Section>
      <Container>
        <Prose>
          <Skeleton className="h-10 w-3/4" />
          <div className="flex justify-between items-center gap-4 mt-4 mb-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-96 w-full rounded-lg my-12" />
        </Prose>
        <div className="space-y-4 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </Container>
    </Section>
  );
}
