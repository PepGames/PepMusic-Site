import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://music.pepuniverse.com"),
  title: "PepMusic | Pep",
  description: "The official home of PepMusic. Explore the music of Pep and the upcoming 2026 album Growth.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "PepMusic | Growth — Coming 2026",
    description: "The official home of Pep. Growth, a new album, arrives in 2026.",
    type: "website",
    siteName: "PepMusic",
    url: "/",
    images: [{ url: "/og.png", width: 1792, height: 933, alt: "PepMusic — Growth, a new album by Pep, coming 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PepMusic | Growth — Coming 2026",
    description: "The official home of Pep. Growth, a new album, arrives in 2026.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07110e" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
