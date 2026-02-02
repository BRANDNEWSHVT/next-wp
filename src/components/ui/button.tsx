import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 font-mono uppercase tracking-widest min-h-[44px]",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background border border-transparent hover:bg-background hover:text-foreground hover:border-foreground",
        destructive:
          "bg-accent text-background border border-transparent hover:bg-background hover:text-accent hover:border-accent",
        outline:
          "border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary:
          "bg-secondary text-foreground border border-transparent hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:bg-secondary",
        link: "text-foreground underline-offset-4 decoration-2 decoration-accent hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 text-xs",
        xs: "h-7 gap-1 px-3 text-[10px]",
        sm: "h-8 gap-1.5 px-4 text-xs",
        lg: "h-12 px-8 text-sm",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
