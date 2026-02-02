"use client";

import Header from "@/components/Header";
import EntryHeader from "@/components/EntryHeader";
import Footer from "@/components/Footer";
import { createSanitizedMarkup } from "@/lib/sanitize";
import type { SiteData, MenuData, FooterMenuData } from "./front-page";

type NodeData = {
  __typename: string;
  id: string;
  uri: string;
  title?: string;
  content?: string;
  date?: string;
};

type PageProps = {
  node: NodeData;
  siteData: SiteData;
  menuData: MenuData;
  footerMenuData?: FooterMenuData;
};

export default function PageTemplate({
  node,
  siteData,
  menuData,
  footerMenuData,
}: PageProps) {
  const { title: siteTitle, description: siteDescription } =
    siteData?.generalSettings || { title: "", description: "" };
  const menuItems = menuData?.primaryMenuItems?.nodes || [];
  const footerMenuItems = footerMenuData?.footerMenuItems?.nodes || [];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main className="flex-1 py-12">
        <article className="container">
          <div className="mx-auto max-w-3xl">
            <EntryHeader title={node?.title || "Page"} />

            <div
              className="prose prose-lg max-w-none"
              style={{ fontFamily: "'Lora', serif" }}
            >
              <div
                dangerouslySetInnerHTML={createSanitizedMarkup(
                  node?.content || "",
                )}
              />
            </div>

            <div className="mt-12 border-t border-foreground pt-8">
              <div className="py-4 text-center font-serif text-xl tracking-[1em] text-neutral-300">
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
