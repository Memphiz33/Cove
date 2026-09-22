import type { KnowledgeType } from "./types";

export const KNOWLEDGE_TYPES: KnowledgeType[] = ["faq", "policy", "product", "doc", "procedure"];

export const KNOWLEDGE_TYPE_LABEL: Record<KnowledgeType, string> = {
  faq: "FAQ",
  policy: "Policy",
  product: "Product",
  doc: "Doc",
  procedure: "Procedure",
};
