import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Where this deployment lives, for canonical and social-card URLs.
 *
 * NEXT_PUBLIC_SITE_URL wins, so a custom domain is a one-line project setting
 * rather than a code change. Failing that, Vercel's own variables: the stable
 * production domain first, then the per-deployment preview URL. Localhost in
 * development. Getting this wrong is invisible on the page and only shows up as
 * broken link previews, which is why it is not a hardcoded string.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sangam — Sovereign AI for Confidential Industrial Work",
    template: "%s · Sangam",
  },
  description:
    "A sovereign, on-premise agentic AI workbench for confidential industrial workflows — powered by open-weight models and designed to run entirely inside your organization.",
  keywords: [
    "on-premise AI",
    "sovereign AI",
    "agentic AI",
    "air-gapped AI",
    "open-weight models",
    "industrial AI",
    "local RAG",
  ],
  openGraph: {
    type: "website",
    title: "Sangam — Sovereign AI for Confidential Industrial Work",
    description:
      "Run powerful open-weight AI locally. No cloud. No external APIs. No data leaving your infrastructure.",
    siteName: "Sangam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangam — Sovereign AI for Confidential Industrial Work",
    description:
      "An on-premise agentic AI workbench for confidential industrial work.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
