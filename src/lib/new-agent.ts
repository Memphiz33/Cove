import type { Agent, AgentRole } from "./types";
import { uid } from "./utils";

export const ROLE_LABEL: Record<AgentRole, string> = {
  support: "Support",
  sales: "Sales",
  guide: "Guide",
};

export const ROLE_BLURB: Record<AgentRole, string> = {
  support: "Returns, shipping, sizing, how-to.",
  sales: "Plans, trials, comparisons, next step.",
  guide: "Product tours, docs, onboarding.",
};

export function createBlankAgent(input: {
  name: string;
  company: string;
  role: AgentRole;
  tagline: string;
}): Agent {
  const name = input.name.trim() || "Agent";
  const company = input.company.trim() || name;
  const tagline = input.tagline.trim() || "Ask us anything.";
  return {
    id: uid("agent"),
    name,
    company,
    role: input.role,
    tagline,
    greeting: `Hi, I'm ${name} from ${company}. How can I help?`,
    suggested: ["What do you offer?", "How does pricing work?", "Can I talk to a person?"],
    persona: { formality: 40, brevity: 65, empathy: 60 },
    grounding: "strict",
    handoffLine: `I don't have that in ${company}'s sources, so I won't guess. I can connect you with a person.`,
    widget: {
      position: "right",
      palette: input.role === "support" ? "forest" : input.role === "sales" ? "slate" : "ink",
      bubble: input.role === "sales" ? "Talk to sales" : "Need a hand?",
      showBranding: true,
    },
    knowledge: [
      {
        id: uid("k"),
        type: "faq",
        title: "What we do",
        content: `${company}. ${tagline} Add policies, products, and FAQs so this agent cites real answers instead of inventing them.`,
      },
    ],
    createdAt: Date.now(),
  };
}
