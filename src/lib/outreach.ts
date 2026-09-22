import type { KnowledgeItem } from "./types";

export type Prospect = {
  id: string;
  company: string;
  site: string;
  email: string;
  blurb: string;
  knowledge: KnowledgeItem[];
  citeQ: string;
  refuseQ: string;
  note: string;
};

function policy(id: string, title: string, content: string): KnowledgeItem[] {
  return [{ id, type: "policy", title, content }];
}

export const PROSPECTS: Prospect[] = [
  {
    id: "howler",
    company: "Howler Brothers",
    site: "https://howlerbros.com/pages/returns",
    email: "service@howlerbros.com",
    blurb: "Austin outdoor gear. Refunds carry a fee. Store credit does not.",
    knowledge: policy(
      "howler-returns",
      "Returns",
      "Howler Brothers accepts unwashed, unworn items with hang tags still attached for store credit or a refund. A refund to the original payment method has a $7 restocking fee per order. Store credit has no restocking fee. After a return is submitted, the package must be in the mail within 28 days. Free shipping applies on orders over $59. Questions go to service@howlerbros.com.",
    ),
    citeQ: "What is the restocking fee on a return for a refund?",
    refuseQ: "Do you repair jackets at a shop in Lisbon?",
    note: `Subject: A support reply that cites Howler's returns page

Hi,

I trained an agent on your public returns page and nothing else.

Asked: "What is the restocking fee on a return for a refund?"
It answered from the page: a refund has a $7 restocking fee per order. Store credit does not.

Asked: "Do you repair jackets at a shop in Lisbon?"
It refused. That is not on the page, so it did not guess.

If you want that on the site, I can set it up. Flat $39 a month, no per-reply fees.

Reply here and I will send the Howler agent.`,
  },
  {
    id: "janji",
    company: "Janji",
    site: "https://janji.com/pages/returns-exchanges",
    email: "support@janji.com",
    blurb: "Running brand. Refund window and credit window are different.",
    knowledge: policy(
      "janji-returns",
      "Returns",
      "Janji refunds may be started within 30 days of when the janji.com order ships. Exchanges or returns for credit may be started within 60 days of when the order ships. Worn or washed items are not accepted. Original hang tags must be attached. Final sale items at 40% off and up cannot be returned. Domestic US return shipping is covered. International return shipping is not covered, and international exchanges are not offered. Refunds have a $9 restocking fee per order. Email support@janji.com.",
    ),
    citeQ: "What is the restocking fee on a refund?",
    refuseQ: "Do you have a running shop in Lisbon?",
    note: `Subject: Janji's 30-day refund vs 60-day credit

Hi,

I trained an agent only on your returns page.

Asked: "What is the restocking fee on a refund?"
It cited the page: $9 per order on refunds. Domestic US return shipping is covered.

Asked: "Do you have a running shop in Lisbon?"
It refused instead of inventing a store.

The useful part is the split window: refunds within 30 days of ship, credit or exchange within 60. A generic bot blends those. This one will not.

$39 a month, flat. Reply if you want it on janji.com.`,
  },
  {
    id: "buckmason",
    company: "Buck Mason",
    site: "https://www.buckmason.com/pages/faq",
    email: "help@buckmason.com",
    blurb: "365-day returns. Worn shoes are out.",
    knowledge: policy(
      "buck-returns",
      "Returns",
      "Buck Mason accepts returns for a full refund within 365 days of purchase. Items must be unworn, unwashed, and undamaged with original tags intact. Shoes that show wear or damage are not accepted. Returns to a Buck Mason store are free. Exchanges have no return fee. International, APO, FPO, and Puerto Rico return shipping is paid by the customer. Vintage timepieces are excluded from the standard return policy. Email help@buckmason.com.",
    ),
    citeQ: "Can I return shoes that show wear?",
    refuseQ: "Do you hem trousers at a shop in Lisbon?",
    note: `Subject: Worn shoes, cited from your FAQ

Hi,

I pointed an agent at your FAQ and asked two questions.

"Can I return shoes that show wear?"
It cited the line: shoes that show wear or damage are not accepted. Unworn tagged items can still come back within 365 days.

"Do you hem trousers at a shop in Lisbon?"
It refused. Nothing on the page says that.

Happy to put that on the site. $39 a month, one reply is one reply.

help@buckmason.com is where I would send the agent if you want to try it.`,
  },
  {
    id: "marinelayer",
    company: "Marine Layer",
    site: "https://www.marinelayer.com/pages/returns",
    email: "ohhey@marinelayer.com",
    blurb: "365 days, with a shorter rule for outlet.",
    knowledge: policy(
      "marine-returns",
      "Returns",
      "Marine Layer accepts returns or exchanges for 365 days. Items not purchased from the Marine Layer website or a Marine Layer store are excluded. Outlet items can be returned within 30 days in person, with the tags attached. US return shipping is free. Refunds go back to the original payment after the return is received and processed, usually within 14 days. A one-time price adjustment may be honored within 14 days of the order date. Email ohhey@marinelayer.com.",
    ),
    citeQ: "Can I return an outlet item?",
    refuseQ: "Do you have a store in Lisbon?",
    note: `Subject: Outlet returns are not the same as the 365-day rule

Hi,

I trained an agent on your returns page only.

"Can I return an outlet item?"
It cited the exception: outlet items, 30 days, in person, tags attached. The 365-day window is for everything else bought from you.

"Do you have a store in Lisbon?"
It refused.

That outlet exception is the kind of line a chatbot usually smoothes over. This one quotes it.

$39 a month if you want it in front of ohhey@. Reply and I will send the agent.`,
  },
  {
    id: "topo",
    company: "Topo Designs",
    site: "https://topodesigns.com/pages/returns-and-shipping",
    email: "info@topodesigns.com",
    blurb: "Free US exchanges. Refunds cost $9.",
    knowledge: policy(
      "topo-returns",
      "Returns",
      "Topo Designs offers free US exchanges for a different size or color. A US return for a refund has a flat $9 fee, deducted from the refund, unless a free return was purchased. Gift returns are eligible for store credit minus a $9 fee. Returns or exchanges must be processed within 30 days and sent back unused, unwashed, unaltered, and free of pet hair. International orders and final sale items are not eligible for a return or exchange. Email info@topodesigns.com.",
    ),
    citeQ: "What is the fee to return a bag for a refund?",
    refuseQ: "Can you repair a zipper in Lisbon?",
    note: `Subject: Free exchange, $9 refund

Hi,

I trained an agent on your returns and shipping page.

"What is the fee to return a bag for a refund?"
It cited the $9 fee, and that a US size or color exchange is free.

"Can you repair a zipper in Lisbon?"
It refused. Repair and Lisbon are not on the page.

I can put that on the site for $39 a month, no message credits. Reply if you want the Topo agent.`,
  },
  {
    id: "fairharbor",
    company: "Fair Harbor",
    site: "https://www.fairharborclothing.com/pages/returns-and-exchanges",
    email: "info@fairharborclothing.com",
    blurb: "Returns page and FAQ do not match. The agent uses one page.",
    knowledge: policy(
      "fair-returns",
      "Returns",
      "For Fair Harbor orders placed on or after January 5, 2026, eligible items may be returned within 30 days of delivery for a refund or store credit. The return must be started in the returns portal within that window. Orders placed before January 5, 2026 keep a 45-day return window. Items must be unworn, unwashed, and with original tags. Without Checkout+, a prepaid USPS label costs $9. Final Sale items are not eligible for returns, exchanges, or refunds. Exchange Only items may be exchanged or returned for store credit only. Email info@fairharborclothing.com.",
    ),
    citeQ: "What does a prepaid USPS label cost without Checkout+?",
    refuseQ: "Is the navy boardshort in stock at a Lisbon shop?",
    note: `Subject: Your returns page and your FAQ disagree

Hi,

Your returns page says orders placed on or after January 5, 2026 can come back within 30 days of delivery. The FAQ still says 45 days from the order date. A bot that blends those will give the wrong window.

I trained an agent on the returns page only.

"What does a prepaid USPS label cost without Checkout+?"
It cited $9.

"Is the navy boardshort in stock at a Lisbon shop?"
It refused. Stock and Lisbon are not on that page.

$39 a month, flat. Reply if you want the agent limited to the page you choose.`,
  },
  {
    id: "taylor",
    company: "Taylor Stitch",
    site: "https://www.taylorstitch.com/pages/terms-of-sale",
    email: "hello@taylorstitch.com",
    blurb: "21 days from delivery. Last Call is final.",
    knowledge: policy(
      "taylor-returns",
      "Returns",
      "Taylor Stitch allows an exchange or return for a full refund or store credit within 21 days of the day the order is delivered. After a return is started, it must be shipped within 28 days. Last Call items are final sale and cannot be returned. Items must be unworn, unwashed, unaltered, free of stains and odors, with original tags attached. International returns are not supported. Original shipping charges are not refunded. The warehouse takes 1 to 3 business days to process a return after it arrives. Email hello@taylorstitch.com.",
    ),
    citeQ: "Are Last Call items returnable?",
    refuseQ: "Do you repair denim at a workshop in Lisbon?",
    note: `Subject: Last Call stays final

Hi,

I trained an agent on your terms of sale.

"Are Last Call items returnable?"
It cited the page: Last Call is final sale. Other items can be returned within 21 days of delivery if they are unworn, unwashed, and tagged. International returns are not supported.

"Do you repair denim at a workshop in Lisbon?"
It refused.

That is the behavior I would put on the site. $39 a month, no per-message multiplier. Reply and I will send the Taylor Stitch agent.`,
  },
  {
    id: "sophie",
    company: "Sophie The Label",
    site: "https://sophiethelabel.com/pages/returns-exchanges",
    email: "hello@sophiethelabel.com",
    blurb: "30 days, prepaid label, 10% fee. Sale is credit only.",
    knowledge: policy(
      "sophie-returns",
      "Returns",
      "Sophie The Label accepts returns within 30 days of delivery. Items must be unworn and unwashed with tags attached. Prepaid shipping labels are offered. All returns have a 10% return shipping fee deducted from the refund. Discounted or sale items can be returned for store credit only. Final Sale items cannot be returned. Email hello@sophiethelabel.com with the order number.",
    ),
    citeQ: "Can I return a sale item for a refund?",
    refuseQ: "Do you have a boutique in Lisbon?",
    note: `Subject: Sale items are credit, not a refund

Hi,

I trained an agent on your returns page.

"Can I return a sale item for a refund?"
It cited the rule: discounted or sale items come back for store credit only. Final Sale cannot be returned. A standard return is 30 days, with a 10% shipping fee taken from the refund.

"Do you have a boutique in Lisbon?"
It refused.

$39 a month if you want that on the site. Reply and I will send it.`,
  },
  {
    id: "palmarae",
    company: "Palmarae",
    site: "https://www.palmarae.com/pages/returns-policy",
    email: "orders@palmarae.com",
    blurb: "Customer pays return shipping unless the item is wrong.",
    knowledge: policy(
      "palmarae-returns",
      "Returns",
      "Palmarae has a 30-day return policy counted from the day the item is received. The item must be unworn or unused, with tags, in its original packaging, and with proof of purchase. Unless the item is faulty or incorrect, the customer pays the return shipping. Refunds go to the original payment method within 14 days of Palmarae receiving the return. Items sent back without a return request first are not accepted. Customers in the United Kingdom or European Union may cancel within 14 days of receiving the goods by emailing orders@palmarae.com.",
    ),
    citeQ: "Who pays for return shipping?",
    refuseQ: "Do you offer alterations in Lisbon?",
    note: `Subject: Who pays the return postage

Hi,

I trained an agent on your returns policy.

"Who pays for return shipping?"
It cited the page: the customer pays, unless the item is faulty or incorrect. The window is 30 days from receipt. A refund is issued within 14 days of you receiving the return.

"Do you offer alterations in Lisbon?"
It refused.

Happy to put that on the site for $39 a month. Reply if you want the Palmarae agent.`,
  },
  {
    id: "indie",
    company: "Indie Collection",
    site: "https://www.indiecollection.com",
    email: "help@indiecollection.com",
    blurb: "Store credit only, 15 days. Jewelry does not come back.",
    knowledge: policy(
      "indie-returns",
      "Returns",
      "Indie Collection offers store credit on non-final-sale items up to 15 days from the date the items were received. Items must be new and cannot be worn, altered, or washed. Store credit is issued as an e-gift card with no expiration once the return is received. Original shipping costs are not refunded. Sale items are final sale. Jewelry and accessories cannot be returned. A prepaid USPS label is available, and $5 is deducted from the store credit. Email help@indiecollection.com.",
    ),
    citeQ: "Can I return jewelry?",
    refuseQ: "Do you have a store in Lisbon?",
    note: `Subject: Jewelry does not come back

Hi,

I trained an agent on your return policy.

"Can I return jewelry?"
It cited the page: jewelry and accessories cannot be returned. Apparel that is not final sale can come back within 15 days of receipt, as store credit, not a refund to the card.

"Do you have a store in Lisbon?"
It refused.

$39 a month, flat, if you want that answering help@indiecollection.com. Reply and I will send the agent.`,
  },
];
