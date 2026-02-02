import { getClient } from "@/lib/apollo-client";
import {
  GET_NODE_BY_URI,
  GET_SITE_DATA,
  GET_HEADER_MENU,
  GET_FOOTER_MENU,
  GET_POSTS_ARCHIVE,
  NodeByUri,
  FooterMenuData,
} from "@/lib/queries";
import { notFound } from "next/navigation";
import FrontPageTemplate, {
  type SiteData,
  type MenuData,
} from "@/wp-templates/front-page";
import PageTemplate from "@/wp-templates/page";
import SingleTemplate from "@/wp-templates/single";
import ArchiveTemplate from "@/wp-templates/archive";
import { generateSEOMetadata, type SEOData } from "@/lib/seo";
import type { Metadata } from "next";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

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

type PostsArchiveData = {
  posts: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    nodes: PostNode[];
  };
};

async function fetchWordPressData(uri: string) {
  const client = getClient();

  const [nodeResult, siteDataResult, menuResult, footerMenuResult] =
    await Promise.all([
      client.query<NodeByUri>({ query: GET_NODE_BY_URI, variables: { uri } }),
      client.query<SiteData>({ query: GET_SITE_DATA }),
      client.query<MenuData>({ query: GET_HEADER_MENU }),
      client.query<FooterMenuData>({ query: GET_FOOTER_MENU }),
    ]);

  return {
    node: nodeResult.data.nodeByUri,
    siteData: siteDataResult.data,
    menuData: menuResult.data,
    footerMenuData: footerMenuResult.data,
  };
}

async function fetchPosts() {
  const client = getClient();
  const { data } = await client.query<PostsArchiveData>({
    query: GET_POSTS_ARCHIVE,
    variables: { first: 6 },
  });
  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  };
}

export default async function WordPressPage({ params }: PageProps) {
  const { slug } = await params;
  const uri = slug ? `/${slug.join("/")}` : "/";
  const isFrontPage = uri === "/" || uri === "";

  const { node, siteData, menuData, footerMenuData } =
    await fetchWordPressData(uri);

  if (isFrontPage) {
    return (
      <FrontPageTemplate
        siteData={siteData}
        menuData={menuData}
        footerMenuData={footerMenuData}
      />
    );
  }

  if (!node) {
    notFound();
  }

  switch (node.__typename) {
    case "Page":
      return (
        <PageTemplate
          node={node}
          siteData={siteData}
          menuData={menuData}
          footerMenuData={footerMenuData}
        />
      );
    case "Post":
      return (
        <SingleTemplate
          node={node}
          siteData={siteData}
          menuData={menuData}
          footerMenuData={footerMenuData}
        />
      );
    case "Category":
    case "Tag":
    case "PostFormat":
      const { posts: categoryPosts, pageInfo: categoryPageInfo } =
        await fetchPosts();
      return (
        <ArchiveTemplate
          node={node}
          siteData={siteData}
          menuData={menuData}
          footerMenuData={footerMenuData}
          posts={categoryPosts}
          pageInfo={categoryPageInfo}
        />
      );
    case "ContentType":
      const { posts: archivePosts, pageInfo: archivePageInfo } =
        await fetchPosts();
      return (
        <ArchiveTemplate
          node={{
            ...node,
            name: node.label || node.name || "News",
          }}
          siteData={siteData}
          menuData={menuData}
          footerMenuData={footerMenuData}
          posts={archivePosts}
          pageInfo={archivePageInfo}
        />
      );
    default:
      notFound();
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uri = slug ? `/${slug.join("/")}` : "/";
  const isFrontPage = uri === "/" || uri === "";

  const client = getClient();
  const [nodeResult, siteDataResult] = await Promise.all([
    client.query<NodeByUri>({ query: GET_NODE_BY_URI, variables: { uri } }),
    client.query<SiteData>({ query: GET_SITE_DATA }),
  ]);

  const node = nodeResult.data.nodeByUri;
  const siteTitle = siteDataResult.data.generalSettings?.title || "Faust.js";
  const siteDescription = siteDataResult.data.generalSettings?.description;

  if (isFrontPage) {
    const seoData: SEOData = {
      title: siteTitle,
      description:
        siteDescription ||
        "A digital publication powered by headless WordPress.",
      url: "/",
      type: "website",
    };
    return generateSEOMetadata(seoData);
  }

  if (!node) {
    return { title: "Not Found" };
  }

  const title = node.title || node.label || node.name || "Untitled";
  const isArticle = node.__typename === "Post";

  const seoData: SEOData = {
    title,
    description: node.content
      ? node.content.replace(/<[^>]*>/g, "").slice(0, 160)
      : undefined,
    url: uri,
    type: isArticle ? "article" : "website",
    publishedTime: isArticle ? node.date : undefined,
    author: isArticle ? node.author?.node?.name : undefined,
  };

  return generateSEOMetadata(seoData, siteTitle);
}
