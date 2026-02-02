import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";

export interface SEOData {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateSEOMetadata(
  data: SEOData,
  siteTitle?: string,
): Metadata {
  const fullTitle = siteTitle ? `${data.title} | ${siteTitle}` : data.title;

  const canonicalUrl = data.url
    ? `${SITE_URL}${data.url.startsWith("/") ? data.url : `/${data.url}`}`
    : SITE_URL;

  const metadata: Metadata = {
    title: fullTitle,
    description:
      data.description ||
      "A modern headless WordPress starter template built with Next.js and WPGraphQL.",

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: fullTitle,
      description:
        data.description ||
        "A modern headless WordPress starter template built with Next.js and WPGraphQL.",
      url: canonicalUrl,
      siteName: siteTitle || "Headless WordPress Starter",
      locale: "en_US",
      type: data.type === "article" ? "article" : "website",
      ...(data.image && {
        images: [
          {
            url: data.image,
            width: 1200,
            height: 630,
            alt: data.imageAlt || data.title,
          },
        ],
      }),
      ...(data.type === "article" && {
        article: {
          publishedTime: data.publishedTime,
          modifiedTime: data.modifiedTime,
          authors: data.author ? [data.author] : undefined,
          section: data.section,
          tags: data.tags,
        },
      }),
    },

    twitter: {
      card: data.image ? "summary_large_image" : "summary",
      title: fullTitle,
      description:
        data.description ||
        "A modern headless WordPress starter template built with Next.js and WPGraphQL.",
      ...(data.image && {
        images: [data.image],
      }),
    },

    robots: data.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" as const },
  };

  return metadata;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export interface WebSiteSchema {
  name: string;
  url: string;
  description?: string;
  publisher?: OrganizationSchema;
}

export interface ArticleSchema {
  headline: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  publisher?: OrganizationSchema;
  description?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema(org: OrganizationSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    ...(org.logo && { logo: org.logo }),
    ...(org.description && { description: org.description }),
    ...(org.sameAs && { sameAs: org.sameAs }),
  };
}

export function generateWebSiteSchema(site: WebSiteSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    ...(site.description && { description: site.description }),
    ...(site.publisher && {
      publisher: {
        "@type": "Organization",
        name: site.publisher.name,
        url: site.publisher.url,
        ...(site.publisher.logo && { logo: site.publisher.logo }),
      },
    }),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleSchema(article: ArticleSchema): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    url: article.url,
    ...(article.image && { image: article.image }),
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.description && { description: article.description }),
    ...(article.author && {
      author: {
        "@type": "Person",
        name: article.author,
      },
    }),
    ...(article.publisher && {
      publisher: {
        "@type": "Organization",
        name: article.publisher.name,
        url: article.publisher.url,
        ...(article.publisher.logo && {
          logo: {
            "@type": "ImageObject",
            url: article.publisher.logo,
          },
        }),
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateCollectionPageSchema(
  name: string,
  url: string,
  description?: string,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${SITE_URL}${url}`,
    ...(description && { description }),
  };
}
