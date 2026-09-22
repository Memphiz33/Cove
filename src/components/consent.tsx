import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const KEY = "cuve-consent";
type Choice = "accepted" | "declined";

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function ConsentAndAnalytics() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
  }, []);

  useEffect(() => {
    const open = ready && choice === null;
    document.body.style.paddingBottom = open ? "6.5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [ready, choice]);

  function choose(next: Choice) {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode */
    }
    setChoice(next);
  }

  return (
    <>
      {choice === "accepted" ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
      {ready && choice === null ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-4 py-4 shadow-[var(--shadow-lift)] sm:px-6"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-foreground">
              Cuve stores this choice on your device. Analytics and speed measurement run only if you accept.
              No advertising cookies.
            </p>
            <div className="flex shrink-0 gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => choose("declined")}>
                Decline
              </Button>
              <Button type="button" size="sm" onClick={() => choose("accepted")}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
