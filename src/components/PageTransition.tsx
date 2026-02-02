"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }

    if (isFirstMount.current) {
      isFirstMount.current = false;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={containerRef} className="page-transition-container">
      {children}
    </div>
  );
}
