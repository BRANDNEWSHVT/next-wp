import "@/styles/globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import "@faustwp/core/dist/css/toolbar.css";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import PageTransition from "@/components/PageTransition";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Headless WordPress Starter | Next.js + WPGraphQL",
    template: "%s | Headless WordPress",
  },
  description:
    "A modern headless WordPress starter template built with Next.js 15, Apollo Client, and WPGraphQL. Created by Adriana Eka Prayudha.",
  keywords: [
    "WordPress",
    "Headless CMS",
    "Next.js",
    "WPGraphQL",
    "React",
    "Apollo Client",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Adriana Eka Prayudha", url: "https://radenadri.xyz" }],
  creator: "Adriana Eka Prayudha",
  publisher: "Adriana Eka Prayudha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Headless WordPress Starter",
    title: "Headless WordPress Starter | Next.js + WPGraphQL",
    description:
      "A modern headless WordPress starter template built with Next.js 15, Apollo Client, and WPGraphQL.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Headless WordPress Starter Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Headless WordPress Starter | Next.js + WPGraphQL",
    description:
      "A modern headless WordPress starter template built with Next.js 15, Apollo Client, and WPGraphQL.",
    creator: "@pikifreak",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F9F7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <ApolloWrapper>
          <PageTransition>{children}</PageTransition>
        </ApolloWrapper>
      </body>
    </html>
  );
}
