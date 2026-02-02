"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Github01Icon,
  NewTwitterIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";

type MenuItem = {
  id: string;
  uri?: string | null;
  path?: string | null;
  label?: string | null;
  parentId?: string | null;
};

type FooterProps = {
  menuItems?: MenuItem[];
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/radenadri",
    icon: Github01Icon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/pikifreak",
    icon: NewTwitterIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/pikifreak",
    icon: Linkedin01Icon,
  },
];

const resourceLinks = [
  { label: "Portfolio", href: "https://radenadri.xyz" },
  { label: "WPGraphQL", href: "https://www.wpgraphql.com" },
  { label: "Next.js", href: "https://nextjs.org" },
];

export default function Footer({ menuItems = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-4 border-foreground bg-foreground text-background">
      <div className="container grid gap-8 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            About This Publication
          </p>
          <p
            className="mt-4 text-sm leading-relaxed text-neutral-300"
            style={{ fontFamily: "'Lora', serif" }}
          >
            A headless WordPress starter template built with Next.js, Apollo
            Client, and WPGraphQL.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Navigation
          </p>
          <ul className="mt-4 space-y-2">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.uri || "/"}
                    className="font-sans text-sm text-neutral-300 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            ) : (
              <>
                {["Home", "News", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="font-sans text-sm text-neutral-300 transition-colors hover:text-accent"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Resources
          </p>
          <ul className="mt-4 space-y-2">
            {resourceLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-neutral-300 transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Connect
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-neutral-600 text-neutral-300 transition-all hover:border-background hover:bg-background hover:text-foreground"
                aria-label={social.name}
              >
                <HugeiconsIcon icon={social.icon} size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-700">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Edition: Vol 1.0 | Printed Digitally
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            &copy; {currentYear} All Rights Reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
            Created by{" "}
            <a
              href="https://radenadri.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Adriana Eka Prayudha
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
