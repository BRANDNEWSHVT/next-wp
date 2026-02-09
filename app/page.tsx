// Craft Imports
import { Section, Container, Box } from "@/components/craft";

// Next.js Imports
import Link from "next/link";

// shadcn/ui
import { Button } from "@/components/ui/button";

// Icons
import {
  Pen,
  FileText,
  Users,
  Tags,
  Layers,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

// Navigation items configuration
const navigationItems = [
  {
    href: "/posts",
    icon: Pen,
    title: "Posts",
    description: "Read all articles from the WordPress blog",
  },
  {
    href: "/pages",
    icon: FileText,
    title: "Pages",
    description: "Browse custom pages and static content",
  },
  {
    href: "/posts/authors",
    icon: Users,
    title: "Authors",
    description: "Discover writers and their work",
  },
  {
    href: "/posts/tags",
    icon: Tags,
    title: "Tags",
    description: "Explore content organized by topic",
  },
  {
    href: "/posts/categories",
    icon: Layers,
    title: "Categories",
    description: "Navigate through content categories",
  },
  {
    href: "https://github.com/9d8dev/next-wp/blob/main/README.md",
    icon: BookOpen,
    title: "Documentation",
    description: "Learn how to build with next-wp",
    external: true,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="py-20 md:py-28 lg:py-36">
        <Container className="max-w-6xl">
          {/* Decorative element */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-20 bg-foreground" />
          </div>

          {/* Main headline - oversized */}
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] max-w-5xl">
            Headless
            <br />
            <span className="italic">WordPress</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl mt-10 max-w-2xl text-muted-foreground leading-relaxed">
            A modern starter for building blazing-fast WordPress sites with Next.js, shadcn/ui, and
            Tailwind CSS.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-12">
            <Button
              asChild
              className="rounded-none bg-foreground text-background hover:bg-background hover:text-foreground border-2 border-foreground uppercase tracking-widest font-medium text-sm px-8 py-6 h-auto transition-colors duration-100"
            >
              <Link href="/posts">
                Explore Posts <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background uppercase tracking-widest font-medium text-sm px-8 py-6 h-auto transition-colors duration-100"
            >
              <a href="https://github.com/9d8dev/next-wp" target="_blank" rel="noopener noreferrer">
                View on GitHub <ArrowUpRight className="ml-3 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="h-[2px] bg-foreground" />

      {/* Navigation Grid Section */}
      <Section className="py-20 md:py-28">
        <Container className="max-w-6xl">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-mono">
                Navigate
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-2">
                Explore Content
              </h2>
            </div>
            <div className="hidden md:block h-[2px] w-32 bg-foreground mb-4" />
          </div>

          {/* Navigation Cards Grid */}
          <Box cols={{ base: 1, sm: 2, lg: 3 }} gap={0} className="border-2 border-foreground">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const CardWrapper = item.external ? "a" : Link;
              const externalProps = item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <CardWrapper
                  key={item.href}
                  href={item.href}
                  {...externalProps}
                  className={`
                    group relative p-8 md:p-10 flex flex-col justify-between min-h-[240px]
                    bg-background transition-colors duration-100
                    hover:bg-foreground hover:text-background
                    border-foreground
                    ${index < 3 ? "border-b-2 lg:border-b-0" : ""}
                    ${index < 4 ? "sm:border-b-2 lg:border-b-0" : ""}
                    ${index % 2 === 0 ? "sm:border-r-2 lg:border-r-0" : ""}
                    ${index % 3 !== 2 ? "lg:border-r-2" : ""}
                    ${index < 3 ? "lg:border-b-2" : ""}
                    focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-[-3px]
                  `}
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between">
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-foreground group-hover:text-background transition-colors duration-100"
                    />
                    {item.external && (
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-muted-foreground group-hover:text-background/70 transition-colors duration-100"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <h3 className="text-2xl md:text-3xl font-serif tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground group-hover:text-background/70 mt-2 text-sm leading-relaxed transition-colors duration-100">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                    <ArrowRight size={24} strokeWidth={1.5} />
                  </div>
                </CardWrapper>
              );
            })}
          </Box>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="h-[2px] bg-foreground" />

      {/* Inverted Feature Section */}
      <Section className="bg-foreground text-background py-20 md:py-28">
        <Container className="max-w-6xl">
          <Box cols={{ base: 1, md: 2 }} gap={12} className="items-center">
            {/* Left: Stats */}
            <div className="space-y-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold">100%</span>
                <span className="text-sm uppercase tracking-widest opacity-70">Open Source</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold">&lt;1s</span>
                <span className="text-sm uppercase tracking-widest opacity-70">Page Loads</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold">SEO</span>
                <span className="text-sm uppercase tracking-widest opacity-70">Optimized</span>
              </div>
            </div>

            {/* Right: Description */}
            <div className="border-l-0 md:border-l-2 border-background/30 md:pl-12">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight italic">
                Built for Performance
              </h2>
              <p className="mt-6 text-lg leading-relaxed opacity-80">
                Leverage the power of React Server Components and Next.js App Router for optimal
                performance. Automatic static generation, incremental regeneration, and smart
                caching strategies.
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm uppercase tracking-widest">
                <div className="h-[2px] w-8 bg-background" />
                <span>Next.js 16 + React 19</span>
              </div>
            </div>
          </Box>
        </Container>
      </Section>

      {/* Section Divider */}
      <div className="h-[2px] bg-foreground" />

      {/* Tech Stack Section */}
      <Section className="py-20 md:py-28">
        <Container className="max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-widest text-muted-foreground font-mono">
              Technology
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mt-4">
              Modern Stack
            </h2>
            <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
              Built with the latest technologies for the best developer experience and end-user
              performance.
            </p>
          </div>

          {/* Tech logos/badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "shadcn/ui",
              "WordPress REST API",
            ].map((tech) => (
              <div
                key={tech}
                className="border-2 border-foreground px-6 py-3 text-sm font-mono uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors duration-100"
              >
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section className="py-20 md:py-28 border-t-2 border-foreground">
        <Container className="max-w-4xl text-center">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter">
            Ready to Build?
          </h2>
          <p className="text-muted-foreground text-xl mt-6 max-w-xl mx-auto">
            Clone the repository and start building your headless WordPress site in minutes.
          </p>

          {/* Deploy button */}
          <div className="mt-12">
            <a
              href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F9d8dev%2Fnext-wp&env=WORDPRESS_URL,WORDPRESS_HOSTNAME&envDescription=Add%20WordPress%20URL%20with%20Rest%20API%20enabled%20(ie.%20https%3A%2F%2Fwp.example.com)%20abd%20the%20hostname%20for%20Image%20rendering%20in%20Next%20JS%20(ie.%20wp.example.com)&project-name=next-wp&repository-name=next-wp&demo-title=Next%20JS%20and%20WordPress%20Starter&demo-url=https%3A%2F%2Fwp.9d8.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-foreground bg-foreground text-background px-10 py-5 text-sm uppercase tracking-widest font-medium hover:bg-background hover:text-foreground transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-3"
            >
              Deploy with Vercel <ArrowRight className="inline ml-3 h-4 w-4" />
            </a>
          </div>

          {/* Decorative footer element */}
          <div className="flex items-center justify-center gap-4 mt-20">
            <div className="h-4 w-4 border-2 border-foreground" />
            <div className="h-[2px] w-32 bg-foreground" />
            <div className="h-4 w-4 border-2 border-foreground" />
          </div>
        </Container>
      </Section>
    </>
  );
}
