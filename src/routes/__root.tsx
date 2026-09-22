import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { StudioHydrator } from "@/components/studio-hydrator";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Cuve";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Cuve is the support agent that cites its sources. If it cannot cite, it hands off.",
      },
      { name: "theme-color", content: "#F3F1EC" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=2" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <StudioHydrator />
          <Outlet />
        </AuthProvider>
        <Toaster position="bottom-right" richColors={false} />
        <Scripts />
      </body>
    </html>
  ),
});
