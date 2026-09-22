export type AgentRole = "support" | "sales" | "guide";
export type KnowledgeType = "faq" | "doc" | "policy" | "product" | "procedure";
export type WidgetPalette = "ink" | "slate" | "forest" | "sand";
export type WidgetPosition = "right" | "left";
export type ConversationStatus = "open" | "resolved" | "handoff";
export type Sentiment = "positive" | "neutral" | "negative";
export type GroundingMode = "strict" | "assist";

export type KnowledgeItem = {
  id: string;
  type: KnowledgeType;
  title: string;
  content: string;
};

export type Persona = {
  formality: number;
  brevity: number;
  empathy: number;
};

export type WidgetConfig = {
  position: WidgetPosition;
  palette: WidgetPalette;
  bubble: string;
  showBranding: boolean;
};

export type Agent = {
  id: string;
  name: string;
  company: string;
  role: AgentRole;
  tagline: string;
  greeting: string;
  suggested: string[];
  persona: Persona;
  widget: WidgetConfig;
  knowledge: KnowledgeItem[];
  grounding: GroundingMode;
  handoffLine: string;
  createdAt: number;
};

export type MessageCitation = {
  title: string;
  excerpt: string;
  type?: KnowledgeType;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: MessageCitation[];
  confidence?: number;
  refused?: boolean;
  createdAt: number;
};

export type Conversation = {
  id: string;
  agentId: string;
  visitor: string;
  channel: "widget" | "playground";
  status: ConversationStatus;
  sentiment: Sentiment;
  leadEmail?: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export type Citation = {
  title: string;
  excerpt: string;
  score: number;
  type?: KnowledgeType;
};
