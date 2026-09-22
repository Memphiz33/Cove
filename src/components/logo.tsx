import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
      fill="none"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M8.5 21c0-5.8 3.4-10 7.5-10s7.5 4.2 7.5 10"
        className="stroke-primary-foreground"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M11.5 21c0-3.8 2-6.5 4.5-6.5s4.5 2.7 4.5 6.5"
        className="stroke-primary-foreground"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      {wordmark ? (
        <span className="font-display text-lg font-medium tracking-tight text-foreground">Cuve</span>
      ) : null}
    </span>
  );
}
