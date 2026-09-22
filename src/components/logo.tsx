import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        className="fill-primary-foreground"
        d="M20.29 24.14A9.6 9.6 0 1 1 20.29 7.86L17.69 12.01A4.7 4.7 0 1 0 17.69 19.99Z"
      />
      <rect x="20.35" y="14.35" width="5.4" height="3.3" rx="1.65" className="fill-primary-foreground" />
    </svg>
  );
}

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {wordmark ? (
        <span className="font-display text-[1.35rem] font-medium leading-none tracking-tight text-foreground">
          Cuve
        </span>
      ) : null}
    </span>
  );
}
