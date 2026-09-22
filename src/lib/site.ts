export const SITE_URL = "https://cuve-sandy.vercel.app";
export const SITE_NAME = "Cuve";
export const SITE_DESCRIPTION =
  "Cuve is the support agent that cites its sources. If it cannot cite, it hands off.";

export function pageHead(opts: { title: string; description: string; path: string }) {
  const title = opts.title === SITE_NAME ? opts.title : `${opts.title} · ${SITE_NAME}`;
  const url = `${SITE_URL}${opts.path}`;
  const image = `${SITE_URL}/og.jpg`;
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { property: "og:title", content: title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: "Cuve. The support agent that cites its sources." },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: "Cuve. The support agent that cites its sources." },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
