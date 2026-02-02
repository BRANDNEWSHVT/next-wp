import { gql } from "@apollo/client";

export interface MenuItemNode {
  id: string;
  uri: string;
  path: string;
  label: string;
  parentId: string;
  cssClasses: string[];
  menu: {
    node: {
      name: string;
    };
  };
}

export interface HeaderMenuQueryResponse {
  primaryMenuItems: {
    nodes: MenuItemNode[];
  };
}

export interface FooterMenuQueryResponse {
  footerMenuItems: {
    nodes: MenuItemNode[];
  };
}

export const HEADER_MENU_QUERY = gql`
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

export const FOOTER_MENU_QUERY = gql`
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
