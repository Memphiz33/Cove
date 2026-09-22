import type { WidgetPalette } from "./types";

export const PALETTE_SWATCH: Record<WidgetPalette, string> = {
  ink: "bg-primary",
  slate: "bg-accent",
  forest: "bg-success",
  sand: "bg-muted-foreground",
};

export const PALETTE_LABEL: Record<WidgetPalette, string> = {
  ink: "Ink",
  slate: "Slate",
  forest: "Forest",
  sand: "Sand",
};
