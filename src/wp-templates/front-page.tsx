"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";

export type SiteData = {
  generalSettings: {
    title: string;
    description: string;
  };
};

export type MenuData = {
  primaryMenuItems: {
    nodes: Array<{
      id: string;
      uri: string;
      path: string;
      label: string;
      parentId: string;
      cssClasses: string[];
      menu: { node: { name: string } };
    }>;
  };
};

export type FooterMenuData = {
  footerMenuItems: {
    nodes: Array<{
      id: string;
      uri: string;
      path: string;
      label: string;
      parentId: string;
      cssClasses: string[];
      menu: { node: { name: string } };
    }>;
  };
};

type FrontPageProps = {
  siteData: SiteData;
  menuData: MenuData;
  footerMenuData?: FooterMenuData;
};

const featureCards = [
  {
    href: "https://nextjs.org/docs",
    title: "Next.js 16",
    description:
      "Built on the latest Next.js with App Router, Server Components, and modern React patterns.",
  },
  {
    href: "https://www.wpgraphql.com",
    title: "WPGraphQL",
    description:
      "Powered by GraphQL for flexible, efficient data fetching from your WordPress backend.",
  },
  {
    href: "https://ui.shadcn.com",
    title: "shadcn/ui",
    description:
      "Beautiful, accessible components built with Radix UI and Tailwind CSS.",
  },
  {
    href: "https://github.com/radenadri",
    title: "Open Source",
    description:
      "Fully open source and customizable. Fork it, extend it, make it yours.",
  },
];

const techStack = [
  { label: "Next.js 15", href: "https://nextjs.org" },
  { label: "React 19", href: "https://react.dev" },
  { label: "TypeScript", href: "https://www.typescriptlang.org" },
  { label: "Tailwind CSS", href: "https://tailwindcss.com" },
  { label: "shadcn/ui", href: "https://ui.shadcn.com" },
  { label: "Apollo Client", href: "https://www.apollographql.com" },
];

const wpPlugins = [
  { label: "WPGraphQL", href: "https://www.wpgraphql.com" },
  { label: "Faust.js", href: "https://faustjs.org" },
  { label: "ACF", href: "https://www.advancedcustomfields.com" },
  { label: "Yoast SEO", href: "https://yoast.com" },
  {
    label: "WPGraphQL for ACF",
    href: "https://github.com/wp-graphql/wp-graphql-acf",
  },
  {
    label: "WPGraphQL IDE",
    href: "https://github.com/wp-graphql/wpgraphql-ide",
  },
];

const resources = [
  { label: "Documentation", href: "https://faustjs.org/docs" },
  { label: "GitHub Repository", href: "https://github.com/radenadri" },
  {
    label: "WPGraphQL Docs",
    href: "https://www.wpgraphql.com/docs/introduction",
  },
];

export default function FrontPageTemplate({
  siteData,
  menuData,
  footerMenuData,
}: FrontPageProps) {
  const { title: siteTitle, description: siteDescription } =
    siteData?.generalSettings || { title: "", description: "" };
  const menuItems = menuData?.primaryMenuItems?.nodes || [];
  const footerMenuItems = footerMenuData?.footerMenuItems?.nodes || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";

  const organizationSchema = generateOrganizationSchema({
    name: "Adriana Eka Prayudha",
    url: "https://radenadri.xyz",
    description: "Full-stack developer specializing in modern web technologies",
    sameAs: [
      "https://github.com/radenadri",
      "https://twitter.com/AdrianaPrayudha",
      "https://www.linkedin.com/in/paboronet",
    ],
  });

  const websiteSchema = generateWebSiteSchema({
    name: siteTitle,
    url: siteUrl,
    description: siteDescription,
    publisher: {
      name: "Adriana Eka Prayudha",
      url: "https://radenadri.xyz",
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main id="main-content" className="flex-1">
        <section className="border-b-4 border-foreground py-16">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 lg:border-r lg:border-foreground lg:pr-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Starter Template
                </p>
                <h1
                  className="text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl lg:text-8xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Headless WordPress Starter
                </h1>
                <p
                  className="mt-6 text-lg leading-relaxed text-neutral-600"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  <span className="float-left mr-3 text-6xl font-bold leading-none text-foreground">
                    A
                  </span>
                  modern, performant, and beautifully designed headless
                  WordPress starter built with Next.js 16, TypeScript, and
                  Tailwind CSS. Created with the Newsprint design system for a
                  timeless editorial aesthetic.
                </p>
                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    Created by
                  </p>
                  <a
                    href="https://radenadri.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-serif text-xl font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                  >
                    Adriana Eka Prayudha
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Features
                </p>
                <div className="grid gap-0 border border-foreground">
                  {featureCards.map((card, index) => (
                    <Link
                      key={card.href}
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hard-shadow-hover block p-4 transition-all hover:bg-foreground hover:text-background ${
                        index < featureCards.length - 1
                          ? "border-b border-foreground"
                          : ""
                      }`}
                    >
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wide">
                        {card.title} →
                      </h3>
                      <p
                        className="mt-1 text-xs leading-relaxed opacity-70"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {card.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-8 text-center font-serif text-2xl tracking-[1em] text-neutral-300">
          ✧ ✧ ✧
        </div>

        <section className="border-b border-foreground py-16">
          <div className="container">
            <div className="mb-8 border-b-4 border-foreground pb-4">
              <h2
                className="text-3xl font-black uppercase tracking-tight lg:text-4xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tech Stack
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
                Built with modern technologies for performance and developer
                experience
              </p>
            </div>

            <div className="grid border border-foreground md:grid-cols-3">
              <div className="border-b border-foreground p-6 md:border-b-0 md:border-r">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Frontend
                </p>
                <h3
                  className="mt-2 text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Modern Stack
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Cutting-edge frontend technologies.
                </p>
                <ul className="mt-4 space-y-2 border-t border-neutral-200 pt-4">
                  {techStack.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground transition-colors hover:text-accent"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-foreground p-6 md:border-b-0 md:border-r">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  WordPress
                </p>
                <h3
                  className="mt-2 text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Plugin Ecosystem
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Essential plugins for headless WordPress.
                </p>
                <ul className="mt-4 space-y-2 border-t border-neutral-200 pt-4">
                  {wpPlugins.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground transition-colors hover:text-accent"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Learning
                </p>
                <h3
                  className="mt-2 text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Resources
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Guides and documentation.
                </p>
                <ul className="mt-4 space-y-2 border-t border-neutral-200 pt-4">
                  {resources.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground transition-colors hover:text-accent"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-foreground py-16 text-background">
          <div className="container text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Ready to Build?
            </p>
            <h2
              className="mt-4 text-3xl font-black uppercase tracking-tight lg:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Start Your Project Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              Clone this starter, customize it to your needs, and deploy your
              headless WordPress site in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/brandnewshvt/next-wp"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 border border-background bg-background px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-transparent hover:text-background"
              >
                View on GitHub
              </a>
              <a
                href="https://radenadri.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 border border-background bg-transparent px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-background hover:text-foreground"
              >
                About the Author
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer menuItems={footerMenuItems} />
    </div>
  );
}
