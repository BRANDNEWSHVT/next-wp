"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import EntryHeader from "@/components/EntryHeader";
import Footer from "@/components/Footer";
import { createSanitizedMarkup } from "@/lib/sanitize";
import type { SiteData, MenuData, FooterMenuData } from "./front-page";

type PostNode = {
  id: string;
  title: string;
  uri: string;
  date: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
};

type NodeData = {
  __typename: string;
  id: string;
  uri: string;
  name?: string;
};

type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

type ArchiveProps = {
  node: NodeData;
  siteData: SiteData;
  menuData: MenuData;
  footerMenuData?: FooterMenuData;
  posts?: PostNode[];
  pageInfo?: PageInfo;
};

export default function ArchiveTemplate({
  node,
  siteData,
  menuData,
  footerMenuData,
  posts = [],
  pageInfo,
}: ArchiveProps) {
  const [allPosts, setAllPosts] = useState<PostNode[]>(posts);
  const [currentPageInfo, setCurrentPageInfo] = useState<PageInfo | undefined>(
    pageInfo,
  );
  const [isLoading, setIsLoading] = useState(false);

  const { title: siteTitle, description: siteDescription } =
    siteData?.generalSettings || { title: "", description: "" };
  const menuItems = menuData?.primaryMenuItems?.nodes || [];
  const footerMenuItems = footerMenuData?.footerMenuItems?.nodes || [];

  const loadMore = async () => {
    if (!currentPageInfo?.hasNextPage || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ after: currentPageInfo.endCursor }),
      });

      if (response.ok) {
        const data = await response.json();
        setAllPosts((prev) => [...prev, ...data.posts]);
        setCurrentPageInfo(data.pageInfo);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main className="flex-1 py-12">
        <div className="container">
          <EntryHeader title={node?.name || "Archive"} />

          <div className="grid border border-foreground md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post, index) => (
              <article
                key={post.id}
                className={`hard-shadow-hover flex flex-col bg-background transition-all ${
                  index < allPosts.length - 1
                    ? "border-b border-foreground"
                    : ""
                } ${(index + 1) % 3 !== 0 ? "lg:border-r lg:border-foreground" : ""} ${
                  (index + 1) % 2 !== 0
                    ? "md:border-r md:border-foreground"
                    : ""
                }`}
              >
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-foreground">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="newsprint-image object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </p>

                  <h2
                    className="mt-2 text-xl font-bold leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <Link
                      href={post.uri}
                      className="transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <div
                    className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600"
                    style={{ fontFamily: "'Lora', serif" }}
                    dangerouslySetInnerHTML={createSanitizedMarkup(
                      post.excerpt,
                    )}
                  />

                  <Link
                    href={post.uri}
                    className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
                  >
                    Continue Reading →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {allPosts.length === 0 && (
            <div className="border border-foreground p-12 text-center">
              <p
                className="text-lg text-neutral-500"
                style={{ fontFamily: "'Lora', serif" }}
              >
                No posts found in this archive.
              </p>
            </div>
          )}

          {currentPageInfo?.hasNextPage && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="border-2 border-foreground bg-background px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Load More Posts"
                )}
              </button>
            </div>
          )}

          <div className="mt-12 py-4 text-center font-serif text-xl tracking-[1em] text-neutral-300">
            ✧ ✧ ✧
          </div>
        </div>
      </main>

      <Footer menuItems={footerMenuItems} />
    </div>
  );
}
