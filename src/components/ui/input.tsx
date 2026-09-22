import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";
