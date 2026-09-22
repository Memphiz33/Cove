import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { ChatPanel } from "@/components/chat-panel";
import type { Agent } from "@/lib/types";
import { cn } from "@/lib/utils";

export function WidgetBubble({
  agent,
  className,
  defaultOpen = true,
}: {
  agent: Agent;
  className?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const left = agent.widget.position === "left";

  return (
    <div
      className={cn("cuve-widget pointer-events-none absolute inset-0", className)}
      data-palette={agent.widget.palette}
    >
      <div
        className={cn(
          "pointer-events-auto absolute bottom-4 z-10 flex flex-col gap-3",
          left ? "left-4 items-start" : "right-4 items-end",
        )}
      >
        {open ? (
          <div className="h-80 w-[min(20rem,calc(100vw-5rem))] overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-lift)]">
            <div className="relative h-full">
              <ChatPanel agent={agent} channel="widget" variant="bubble" className="h-full rounded-none" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full text-[var(--w-fg)]/80 hover:bg-[var(--w-fg)]/10"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 items-center gap-2 rounded-full bg-[var(--w-bg)] px-4 text-sm font-medium text-[var(--w-fg)] shadow-[var(--shadow-lift)] transition-transform duration-150 active:scale-[0.96]"
        >
          <MessageCircle className="size-4" />
          {agent.widget.bubble}
        </button>
      </div>
    </div>
  );
}
