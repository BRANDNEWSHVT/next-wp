"use client";

import Header from "@/components/Header";
import EntryHeader from "@/components/EntryHeader";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { createSanitizedMarkup } from "@/lib/sanitize";
import type { SiteData, MenuData, FooterMenuData } from "./front-page";

type NodeData = {
  __typename: string;
  id: string;
  uri: string;
  title?: string;
  content?: string;
  date?: string;
  author?: {
    node: {
      name: string;
    };
  };
};

type SingleProps = {
  node: NodeData;
  siteData: SiteData;
  menuData: MenuData;
  footerMenuData?: FooterMenuData;
};

export default function SingleTemplate({
  node,
  siteData,
  menuData,
  footerMenuData,
}: SingleProps) {
  const { title: siteTitle, description: siteDescription } =
    siteData?.generalSettings || { title: "", description: "" };
  const menuItems = menuData?.primaryMenuItems?.nodes || [];
  const footerMenuItems = footerMenuData?.footerMenuItems?.nodes || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";

  const articleSchema = generateArticleSchema({
    headline: node?.title || "Post",
    url: `${siteUrl}${node?.uri || ""}`,
    datePublished: node?.date,
    dateModified: node?.date,
    author: node?.author?.node?.name,
    description: node?.content
      ? node.content.replace(/<[^>]*>/g, "").slice(0, 160)
      : undefined,
    publisher: {
      name: siteTitle,
      url: siteUrl,
    },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "News", url: "/news" },
    { name: node?.title || "Post", url: node?.uri || "/" },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main className="flex-1 py-12">
        <article className="container">
          <div className="mx-auto max-w-3xl">
            <EntryHeader
              title={node?.title || "Post"}
              date={node?.date}
              author={node?.author?.node?.name}
            />

            <div
              className="prose prose-lg max-w-none text-justify-newsprint"
              style={{ fontFamily: "'Lora', serif" }}
            >
              <div
                className="drop-cap"
                dangerouslySetInnerHTML={createSanitizedMarkup(
                  node?.content || "",
                )}
              />
            </div>

            <div className="mt-12 border-t border-foreground pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                End of Article
              </p>
              <div className="mt-4 py-4 text-center font-serif text-xl tracking-[1em] text-neutral-300">
                ✧ ✧ ✧
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer menuItems={footerMenuItems} />
    </div>
  );
}
