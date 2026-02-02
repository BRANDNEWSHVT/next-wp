"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  uri?: string | null;
  path?: string | null;
  label?: string | null;
  parentId?: string | null;
  cssClasses?: string[];
  menu?: { node: { name?: string } };
};

type HeaderProps = {
  siteTitle?: string | null;
  siteDescription?: string | null;
  menuItems: MenuItem[];
};

type MenuTreeItem = MenuItem & {
  children: MenuTreeItem[];
};

function buildMenuTree(items: MenuItem[]): MenuTreeItem[] {
  const itemMap = new Map<string, MenuTreeItem>();
  const roots: MenuTreeItem[] = [];

  items.forEach((item) => {
    itemMap.set(item.id, { ...item, children: [] });
  });

  items.forEach((item) => {
    const treeItem = itemMap.get(item.id)!;
    if (item.parentId && itemMap.has(item.parentId)) {
      itemMap.get(item.parentId)!.children.push(treeItem);
    } else {
      roots.push(treeItem);
    }
  });

  return roots;
}

function ListItem({
  title,
  href,
  children,
  className,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 border-b border-foreground p-4 leading-none no-underline outline-none transition-all hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-foreground",
            className,
          )}
        >
          <div className="font-mono text-xs font-medium uppercase tracking-widest">
            {title}
          </div>
          {children && (
            <p className="text-xs leading-snug opacity-70">{children}</p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MegaMenuContent({ children }: { children: MenuTreeItem[] }) {
  const columnCount = Math.min(children.length > 4 ? 3 : 2, 3);

  return (
    <ul
      className={cn(
        "grid border border-foreground bg-background",
        columnCount === 2 && "w-[400px] md:w-[500px] md:grid-cols-2",
        columnCount === 3 && "w-[400px] md:w-[600px] md:grid-cols-3",
      )}
    >
      {children.map((child, index) => (
        <ListItem
          key={child.id}
          title={child.label || ""}
          href={child.uri || "/"}
          className={cn(
            index < children.length - columnCount ? "border-b" : "border-b-0",
            (index + 1) % columnCount !== 0 && "md:border-r",
          )}
        >
          {child.children.length > 0 && (
            <span>{child.children.map((c) => c.label).join(", ")}</span>
          )}
        </ListItem>
      ))}
    </ul>
  );
}

function renderMenuItem(item: MenuTreeItem) {
  const hasChildren = item.children.length > 0;

  if (hasChildren) {
    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuTrigger className="h-auto bg-transparent px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background focus:bg-transparent data-[state=open]:bg-foreground data-[state=open]:text-background">
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <MegaMenuContent>{item.children}</MegaMenuContent>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.id}>
      <NavigationMenuLink asChild>
        <Link
          href={item.uri || "/"}
          className="inline-flex h-auto items-center px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Header({
  siteTitle,
  siteDescription,
  menuItems,
}: HeaderProps) {
  const menuTree = buildMenuTree(Array.isArray(menuItems) ? menuItems : []);

  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-foreground bg-background">
      <div className="border-b border-foreground">
        <div className="container flex items-center justify-between py-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Vol. 1 | {formatDate()}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Digital Edition
          </span>
        </div>
      </div>

      <div className="container py-6 text-center">
        <Link href="/" className="inline-block">
          <h1
            className="font-serif text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {siteTitle}
          </h1>
          {siteDescription && (
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-500">
              {siteDescription}
            </p>
          )}
        </Link>
      </div>

      <nav className="border-t border-foreground">
        <div className="container flex items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">
              {menuTree.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
