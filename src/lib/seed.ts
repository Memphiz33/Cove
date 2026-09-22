import type { Agent, Conversation } from "./types";
import { hoursAgo } from "./utils";

export const COVE_ID = "cove";
export const NORTHLINE_ID = "northline";
export const LUMEN_ID = "lumen";

export const SEED_AGENTS: Agent[] = [
  {
    id: COVE_ID,
    name: "Cove",
    company: "Cove",
    role: "guide",
    tagline: "The support agent that cites its sources.",
    greeting: "Hi — I'm Cove. Ask how I work, what I cost, or what happens when I don't know.",
    suggested: [
      "How does grounding work?",
      "What's in the Studio plan?",
      "Do you have a store in Lisbon?",
    ],
    persona: { formality: 35, brevity: 70, empathy: 55 },
    grounding: "strict",
    handoffLine:
      "That isn't in my sources, so I won't invent it. Ask something I can cite, or I can connect you with a person.",
    widget: {
      position: "right",
      palette: "ink",
      bubble: "Ask Cove",
      showBranding: true,
    },
    knowledge: [
      {
        id: "c1",
        type: "doc",
        title: "What Cove is",
        content:
          "Cove is a grounded support agent you train on your own FAQs, policies, products, and procedures. Every reply cites the passage it used. You test in a playground with a confidence score before the widget goes live. Inbox, lead capture, coverage checks, and a live widget studio ship on the Studio plan. If a question is not in your sources, Cove hands off instead of guessing.",
      },
      {
        id: "c2",
        type: "faq",
        title: "How grounding works",
        content:
          "Before answering, Cove retrieves the most relevant knowledge passages and only writes from those. Cited titles and excerpts appear under the reply. In Strict mode, a low-confidence question never reaches the model — Cove uses your handoff line instead. Assist mode still requires a source, but the bar is a little lower. Confidence is the retrieval score of the best matching passage, shown as a percentage.",
      },
      {
        id: "c3",
        type: "policy",
        title: "Plans and pricing",
        content:
          "Cove has three plans. Free: 1 agent, playground, citations, 50 knowledge items. Studio at $39/month: 5 agents, live widget, inbox, lead capture, coverage, 200 knowledge items. Company at $129/month: unlimited agents, analytics, human handoff, custom palette, no Cove badge on the widget. Annual billing is 20% off. There are no message credits and no per-reply multipliers. One visitor message equals one answer.",
      },
      {
        id: "c4",
        type: "faq",
        title: "Will Cove invent answers",
        content:
          "No. If a refund policy, price, or feature is not in knowledge, Cove refuses and offers a handoff. Citations only appear when a real passage was used. Strict grounding skips the language model entirely when retrieval is below the bar, so a missing policy cannot be written from thin air.",
      },
      {
        id: "c5",
        type: "doc",
        title: "How to launch an agent",
        content:
          "Create an agent, name the company, pick a role (support, sales, or product guide), then add knowledge as FAQs, policies, products, procedures, or docs. Adjust formality, brevity, and empathy. Run coverage on your suggested questions. Test in the playground until confidence is consistently high. Customize the widget on a live page preview, copy the embed snippet, and paste it before your site's closing body tag. Open conversations land in Inbox. Leads (visitor emails) are tagged automatically.",
      },
      {
        id: "c6",
        type: "policy",
        title: "Data and models",
        content:
          "Cove answers with Grok. Customer knowledge is sent only as retrieval context for that turn and is not used to train foundation models. Conversations stay in your workspace. You can delete an agent and all of its knowledge at any time. Enterprise data processing terms are available on the Company plan.",
      },
    ],
    createdAt: hoursAgo(24 * 40),
  },
  {
    id: NORTHLINE_ID,
    name: "Northline",
    company: "Northline Apparel",
    role: "support",
    tagline: "Outdoor layers. Fair repairs. Easy returns.",
    greeting: "Welcome to Northline — sizing, shipping, repairs, or a jacket rec. What do you need?",
    suggested: [
      "Do you take returns?",
      "What size should I get in the Drift Jacket?",
      "How long does shipping take?",
    ],
    persona: { formality: 25, brevity: 65, empathy: 80 },
    grounding: "strict",
    handoffLine:
      "I don't have that in Northline's policies, so I won't guess. I can pass you to a person who can look it up.",
    widget: {
      position: "right",
      palette: "forest",
      bubble: "Need a hand?",
      showBranding: true,
    },
    knowledge: [
      {
        id: "n1",
        type: "policy",
        title: "Returns",
        content:
          "Northline accepts returns within 30 days of delivery. Items must be unworn, unwashed, with original tags. Start a return at northline.example/returns — a prepaid label is emailed within a few hours. Refunds go back to the original payment method in 5–8 business days after the warehouse scans the parcel. Sale items marked Final are not returnable. Exchanges for size are free.",
      },
      {
        id: "n2",
        type: "policy",
        title: "Shipping",
        content:
          "Standard shipping is $8 and arrives in 3–5 business days in the US. Orders over $75 ship free. Expedited is $18 and arrives in 1–2 business days. We ship from Portland, Oregon on weekdays before 2pm PT. International shipping is $22 and takes 7–14 days; duties are the buyer's responsibility. You receive a tracking link as soon as the label is created.",
      },
      {
        id: "n3",
        type: "product",
        title: "Drift Jacket",
        content:
          "The Drift Jacket is a recycled-nylon shell with a PFC-free DWR coat, two-way zipper, and packable hood. Price $168. Sizes XS–XXL. It runs slightly large — if you are between sizes, size down. The Regular fit is cut to layer a midweight fleece underneath. Colorways: Cedar, Fog, and Ink. The Fog colorway is currently low stock in M and L.",
      },
      {
        id: "n4",
        type: "product",
        title: "Harbor Tee",
        content:
          "The Harbor Tee is midweight organic cotton, $48, sizes XS–XXL. It fits true to size. Colors: Bone, Cedar, and Navy. Machine wash cold, hang dry. The Bone colorway can show wear at the collar after a year of heavy use — we cover that under the repair program.",
      },
      {
        id: "n5",
        type: "product",
        title: "Cove Cap",
        content:
          "The Cove Cap is unstructured organic cotton twill, $32, one size with a metal slide. Colors: Fog and Ink. Not currently offered in kids' sizing.",
      },
      {
        id: "n6",
        type: "policy",
        title: "Repairs",
        content:
          "Northline repairs zippers, seams, and delaminated DWR for free for two years from purchase. After two years, repairs are $25 plus return shipping. Email repairs@northline.example with photos and your order number. Typical turnaround is 10 days. We do not repair third-party garments.",
      },
      {
        id: "n7",
        type: "faq",
        title: "Sizing guide",
        content:
          "Drift Jacket runs slightly large; size down if you are between sizes. Harbor Tee is true to size. If you usually wear a women's M in outdoor brands, take M in Northline. If you prefer a closer streetwear fit, size down on the jacket. A printable size chart lives at northline.example/size. We do not offer petite or tall lengths yet.",
      },
      {
        id: "n8",
        type: "procedure",
        title: "Late shipment",
        content:
          "If a US order is more than 6 business days past the ship date, apologize, do not invent a tracking number, and hand off to a human with the order number. Standard shipping is 3–5 business days from Portland. The agent cannot see live carrier status.",
      },
    ],
    createdAt: hoursAgo(24 * 18),
  },
  {
    id: LUMEN_ID,
    name: "Lumen",
    company: "Lumen Cloud",
    role: "sales",
    tagline: "Observability for teams who ship on Fridays.",
    greeting: "Hey — I can walk you through Lumen plans, limits, and SSO. What are you evaluating?",
    suggested: [
      "What's the difference between Build and Scale?",
      "Do you have SSO?",
      "Can I try it without a card?",
    ],
    persona: { formality: 45, brevity: 60, empathy: 40 },
    grounding: "strict",
    handoffLine:
      "That's not in my notes. Share an email and a teammate will follow up — I won't invent a limit or a price.",
    widget: {
      position: "left",
      palette: "slate",
      bubble: "Talk to sales",
      showBranding: false,
    },
    knowledge: [
      {
        id: "l1",
        type: "product",
        title: "Build and Scale plans",
        content:
          "Lumen Cloud has three plans. Free: 1 project, 50k events/month, 7-day retention, community support. Build at $29/month: 5 projects, 2M events/month, 30-day retention, email support, 3 seats. Scale at $99/month: unlimited projects, 20M events/month, 90-day retention, SSO (Google and Okta), audit log, 10 seats, shared Slack channel. Annual billing is 2 months free. A 14-day Scale trial is available without a credit card.",
      },
      {
        id: "l2",
        type: "faq",
        title: "SSO and security",
        content:
          "SSO is included on Scale: Google Workspace and Okta SAML. SCIM provisioning is on the roadmap for Q4. All plans encrypt data at rest (AES-256) and in transit (TLS 1.2+). SOC 2 Type II report is available under NDA on Scale. We do not sell event data. EU data residency is a Scale add-on at $40/month.",
      },
      {
        id: "l3",
        type: "doc",
        title: "API and SDKs",
        content:
          "Lumen has official SDKs for JavaScript, Python, Go, and Ruby. The ingest endpoint is api.lumen.example/v1/events. Free plan rate limit is 50 requests/second. Build is 200/s. Scale is 1,000/s. API keys are project-scoped. We do not offer a PHP SDK; the REST ingest API works from any language.",
      },
      {
        id: "l4",
        type: "policy",
        title: "Trial without a card",
        content:
          "Try Scale for 14 days without a credit card. Start on Free with just an email. Upgrade in the billing page; changes are prorated. Cancel anytime — access continues through the end of the paid period. We do not offer refunds mid-cycle except if the product is down more than 8 hours in a month (then we credit a week). Nonprofit and education teams get 40% off Build and Scale — email campus@lumen.example.",
      },
      {
        id: "l5",
        type: "faq",
        title: "Who Lumen is for",
        content:
          "Lumen Cloud is product analytics and error observability for teams of 2–40 engineers. Typical customers are B2B SaaS companies that ship weekly. We are not a replacement for Datadog at thousands of hosts, and we are not a marketing analytics tool (no session replay, no funnels past 4 steps). If you need session replay, we recommend pairing with a specialist.",
      },
    ],
    createdAt: hoursAgo(24 * 9),
  },
];

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_n1",
    agentId: NORTHLINE_ID,
    visitor: "Maya Chen",
    channel: "widget",
    status: "resolved",
    sentiment: "positive",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Do you take returns on the Drift Jacket if I haven't worn it?",
        createdAt: hoursAgo(5),
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Yes — 30 days from delivery, unworn, tags on. Start at northline.example/returns and we'll email a prepaid label. Refunds land in 5–8 business days after we scan it in.",
        citations: [
          {
            title: "Returns",
            excerpt: "Northline accepts returns within 30 days of delivery.",
            type: "policy",
          },
        ],
        confidence: 0.94,
        createdAt: hoursAgo(5) + 8000,
      },
    ],
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(5),
  },
  {
    id: "conv_n2",
    agentId: NORTHLINE_ID,
    visitor: "Andre Cole",
    channel: "widget",
    status: "handoff",
    sentiment: "negative",
    messages: [
      {
        id: "m3",
        role: "user",
        content: "My order NL-10482 still isn't here and it's been 9 days.",
        createdAt: hoursAgo(2),
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "Standard US shipping is 3–5 business days from Portland. Nine days is past that window — I don't have live tracking in this chat, so I'm passing you to a human who can pull NL-10482.",
        citations: [{ title: "Shipping", excerpt: "Standard shipping arrives in 3–5 business days in the US.", type: "policy" }],
        confidence: 0.71,
        createdAt: hoursAgo(2) + 9000,
      },
    ],
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
  },
  {
    id: "conv_n3",
    agentId: NORTHLINE_ID,
    visitor: "Priya Nair",
    channel: "widget",
    status: "open",
    sentiment: "positive",
    messages: [
      {
        id: "m5",
        role: "user",
        content: "I'm between M and L and I want the Drift Jacket to layer a fleece. Size?",
        createdAt: hoursAgo(1),
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "Take M. The Drift runs slightly large and the Regular fit is already cut to layer a midweight fleece. Size down when you're between sizes.",
        citations: [
          { title: "Drift Jacket", excerpt: "It runs slightly large — if you are between sizes, size down.", type: "product" },
        ],
        confidence: 0.91,
        createdAt: hoursAgo(1) + 7000,
      },
    ],
    createdAt: hoursAgo(1),
    updatedAt: hoursAgo(1),
  },
  {
    id: "conv_l1",
    agentId: LUMEN_ID,
    visitor: "Jordan Hale",
    channel: "widget",
    status: "open",
    sentiment: "positive",
    leadEmail: "jordan@northstar.dev",
    messages: [
      {
        id: "m7",
        role: "user",
        content: "We're 12 engineers. Do we need Scale for SSO? jordan@northstar.dev",
        createdAt: hoursAgo(8),
      },
      {
        id: "m8",
        role: "assistant",
        content:
          "SSO (Google and Okta) is on Scale at $99/month. Build at $29 has no SSO. A 14-day Scale trial does not need a card — I can have someone send the NDA for the SOC 2 report too.",
        citations: [{ title: "SSO and security", excerpt: "SSO is included on Scale: Google Workspace and Okta SAML.", type: "faq" }],
        confidence: 0.88,
        createdAt: hoursAgo(8) + 6000,
      },
    ],
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(8),
  },
  {
    id: "conv_c1",
    agentId: COVE_ID,
    visitor: "Alex Rivera",
    channel: "playground",
    status: "resolved",
    sentiment: "positive",
    messages: [
      {
        id: "m9",
        role: "user",
        content: "Will this invent refund policies if I forget to add them?",
        createdAt: hoursAgo(12),
      },
      {
        id: "m10",
        role: "assistant",
        content:
          "No. If a refund policy isn't in knowledge, Cove says it doesn't know and offers a handoff instead of making one up. In Strict mode the model is not even called. Citations only appear when a real passage was used.",
        citations: [
          {
            title: "How grounding works",
            excerpt: "If a refund policy, price, or feature is not in knowledge, Cove refuses.",
            type: "faq",
          },
        ],
        confidence: 0.96,
        createdAt: hoursAgo(12) + 5000,
      },
    ],
    createdAt: hoursAgo(12),
    updatedAt: hoursAgo(12),
  },
  {
    id: "conv_c2",
    agentId: COVE_ID,
    visitor: "Sam Okonkwo",
    channel: "playground",
    status: "handoff",
    sentiment: "neutral",
    messages: [
      {
        id: "m11",
        role: "user",
        content: "Do you have a store in Lisbon?",
        createdAt: hoursAgo(3),
      },
      {
        id: "m12",
        role: "assistant",
        content:
          "That isn't in my sources, so I won't invent it. Ask something I can cite, or I can connect you with a person.",
        confidence: 0.12,
        refused: true,
        createdAt: hoursAgo(3) + 4000,
      },
    ],
    createdAt: hoursAgo(3),
    updatedAt: hoursAgo(3),
  },
  {
    id: "conv_n4",
    agentId: NORTHLINE_ID,
    visitor: "Leah Brooks",
    channel: "widget",
    status: "handoff",
    sentiment: "neutral",
    messages: [
      {
        id: "m13",
        role: "user",
        content: "Can I pick up in store in Chicago?",
        createdAt: hoursAgo(4),
      },
      {
        id: "m14",
        role: "assistant",
        content:
          "I don't have that in Northline's policies, so I won't guess. I can pass you to a person who can look it up.",
        confidence: 0.18,
        refused: true,
        createdAt: hoursAgo(4) + 5000,
      },
    ],
    createdAt: hoursAgo(4),
    updatedAt: hoursAgo(4),
  },
];
