import { gql } from "@apollo/client";

export const GET_NODE_BY_URI = gql`
  query GetNodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      id
      uri
      ... on ContentNode {
        isPreview
        previewRevisionDatabaseId
        contentTypeName
      }
      ... on Page {
        title
        content
        date
      }
      ... on Post {
        title
        content
        date
        author {
          node {
            name
          }
        }
      }
      ... on Category {
        name
        description
      }
      ... on Tag {
        name
        description
      }
      ... on ContentType {
        name
        label
        description
      }
    }
  }
`;

export const GET_POSTS_ARCHIVE = gql`
  query GetPostsArchive($first: Int = 6, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        uri
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_SITE_DATA = gql`
  query GetSiteData {
    generalSettings {
      title
      description
    }
  }
`;

export const GET_HEADER_MENU = gql`
  query GetHeaderMenu {
    primaryMenuItems: menuItems(where: { location: PRIMARY }) {
      nodes {
        id
        uri
        path
        label
        parentId
        cssClasses
        menu {
          node {
            name
          }
        }
      }
    }
  }
`;

export const GET_FOOTER_MENU = gql`
  query GetFooterMenu {
    footerMenuItems: menuItems(where: { location: FOOTER }) {
      nodes {
        id
        uri
        path
        label
        parentId
        cssClasses
        menu {
          node {
            name
          }
        }
      }
    }
  }
`;

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

export type NodeByUri = {
  nodeByUri: {
    __typename: string;
    id: string;
    uri: string;
    isPreview?: boolean;
    previewRevisionDatabaseId?: number;
    contentTypeName?: string;
    title?: string;
    content?: string;
    date?: string;
    name?: string;
    label?: string;
    description?: string;
    author?: {
      node: {
        name: string;
      };
    };
  } | null;
};
