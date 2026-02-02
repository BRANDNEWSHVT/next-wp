import type { MetadataRoute } from "next";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost";

const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        uri
        modified
      }
    }
  }
`;

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        uri
        modified
      }
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        uri
      }
    }
  }
`;

type PageNode = { uri: string; modified?: string };
type CategoryNode = { uri: string };

type PagesData = { pages: { nodes: PageNode[] } };
type PostsData = { posts: { nodes: PageNode[] } };
type CategoriesData = { categories: { nodes: CategoryNode[] } };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = getClient();

  let pages: PageNode[] = [];
  let posts: PageNode[] = [];
  let categories: CategoryNode[] = [];

  try {
    const [pagesResult, postsResult, categoriesResult] = await Promise.all([
      client.query<PagesData>({ query: GET_ALL_PAGES }),
      client.query<PostsData>({ query: GET_ALL_POSTS }),
      client.query<CategoriesData>({ query: GET_ALL_CATEGORIES }),
    ]);

    pages = pagesResult.data.pages.nodes;
    posts = postsResult.data.posts.nodes;
    categories = categoriesResult.data.categories.nodes;
  } catch {}

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${SITE_URL}${page.uri}`,
    lastModified: page.modified ? new Date(page.modified) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${post.uri}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}${category.uri}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...pageEntries, ...postEntries, ...categoryEntries];
}
