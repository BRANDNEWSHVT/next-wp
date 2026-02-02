/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetAllPages {\n    pages(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n": typeof types.GetAllPagesDocument,
    "\n  query GetAllPosts {\n    posts(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n": typeof types.GetAllPostsDocument,
    "\n  query GetAllCategories {\n    categories(first: 100) {\n      nodes {\n        uri\n      }\n    }\n  }\n": typeof types.GetAllCategoriesDocument,
    "\n  query GetNodeByUri($uri: String!) {\n    nodeByUri(uri: $uri) {\n      __typename\n      id\n      uri\n      ... on ContentNode {\n        isPreview\n        previewRevisionDatabaseId\n        contentTypeName\n      }\n      ... on Page {\n        title\n        content\n        date\n      }\n      ... on Post {\n        title\n        content\n        date\n        author {\n          node {\n            name\n          }\n        }\n      }\n      ... on Category {\n        name\n        description\n      }\n      ... on Tag {\n        name\n        description\n      }\n      ... on ContentType {\n        name\n        label\n        description\n      }\n    }\n  }\n": typeof types.GetNodeByUriDocument,
    "\n  query GetPostsArchive($first: Int = 6, $after: String) {\n    posts(first: $first, after: $after, where: { status: PUBLISH }) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        title\n        uri\n        date\n        excerpt\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetPostsArchiveDocument,
    "\n  query GetSiteData {\n    generalSettings {\n      title\n      description\n    }\n  }\n": typeof types.GetSiteDataDocument,
    "\n  query GetHeaderMenu {\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetHeaderMenuDocument,
    "\n  query GetFooterMenu {\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetFooterMenuDocument,
};
const documents: Documents = {
    "\n  query GetAllPages {\n    pages(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n": types.GetAllPagesDocument,
    "\n  query GetAllPosts {\n    posts(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  query GetAllCategories {\n    categories(first: 100) {\n      nodes {\n        uri\n      }\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  query GetNodeByUri($uri: String!) {\n    nodeByUri(uri: $uri) {\n      __typename\n      id\n      uri\n      ... on ContentNode {\n        isPreview\n        previewRevisionDatabaseId\n        contentTypeName\n      }\n      ... on Page {\n        title\n        content\n        date\n      }\n      ... on Post {\n        title\n        content\n        date\n        author {\n          node {\n            name\n          }\n        }\n      }\n      ... on Category {\n        name\n        description\n      }\n      ... on Tag {\n        name\n        description\n      }\n      ... on ContentType {\n        name\n        label\n        description\n      }\n    }\n  }\n": types.GetNodeByUriDocument,
    "\n  query GetPostsArchive($first: Int = 6, $after: String) {\n    posts(first: $first, after: $after, where: { status: PUBLISH }) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        title\n        uri\n        date\n        excerpt\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n          }\n        }\n      }\n    }\n  }\n": types.GetPostsArchiveDocument,
    "\n  query GetSiteData {\n    generalSettings {\n      title\n      description\n    }\n  }\n": types.GetSiteDataDocument,
    "\n  query GetHeaderMenu {\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetHeaderMenuDocument,
    "\n  query GetFooterMenu {\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetFooterMenuDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllPages {\n    pages(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPages {\n    pages(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllPosts {\n    posts(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllPosts {\n    posts(first: 100, where: { status: PUBLISH }) {\n      nodes {\n        uri\n        modified\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllCategories {\n    categories(first: 100) {\n      nodes {\n        uri\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllCategories {\n    categories(first: 100) {\n      nodes {\n        uri\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetNodeByUri($uri: String!) {\n    nodeByUri(uri: $uri) {\n      __typename\n      id\n      uri\n      ... on ContentNode {\n        isPreview\n        previewRevisionDatabaseId\n        contentTypeName\n      }\n      ... on Page {\n        title\n        content\n        date\n      }\n      ... on Post {\n        title\n        content\n        date\n        author {\n          node {\n            name\n          }\n        }\n      }\n      ... on Category {\n        name\n        description\n      }\n      ... on Tag {\n        name\n        description\n      }\n      ... on ContentType {\n        name\n        label\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetNodeByUri($uri: String!) {\n    nodeByUri(uri: $uri) {\n      __typename\n      id\n      uri\n      ... on ContentNode {\n        isPreview\n        previewRevisionDatabaseId\n        contentTypeName\n      }\n      ... on Page {\n        title\n        content\n        date\n      }\n      ... on Post {\n        title\n        content\n        date\n        author {\n          node {\n            name\n          }\n        }\n      }\n      ... on Category {\n        name\n        description\n      }\n      ... on Tag {\n        name\n        description\n      }\n      ... on ContentType {\n        name\n        label\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPostsArchive($first: Int = 6, $after: String) {\n    posts(first: $first, after: $after, where: { status: PUBLISH }) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        title\n        uri\n        date\n        excerpt\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostsArchive($first: Int = 6, $after: String) {\n    posts(first: $first, after: $after, where: { status: PUBLISH }) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        title\n        uri\n        date\n        excerpt\n        featuredImage {\n          node {\n            sourceUrl\n            altText\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSiteData {\n    generalSettings {\n      title\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetSiteData {\n    generalSettings {\n      title\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetHeaderMenu {\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetHeaderMenu {\n    primaryMenuItems: menuItems(where: { location: PRIMARY }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetFooterMenu {\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFooterMenu {\n    footerMenuItems: menuItems(where: { location: FOOTER }) {\n      nodes {\n        id\n        uri\n        path\n        label\n        parentId\n        cssClasses\n        menu {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;