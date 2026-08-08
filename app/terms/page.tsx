import type { Metadata } from "next";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms | PepMusic",
  description: "PepMusic website terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main><SiteHeader compact /><article className="legal-page section-shell">
      <p className="eyebrow">PEPMUSIC</p><h1>Terms</h1><p className="legal-updated">Last updated August 7, 2026</p>
      <h2>Informational use</h2><p>This website provides information about Pep and PepMusic releases. Content may be updated as archival information and future release details are confirmed.</p>
      <h2>Music and artwork</h2><p>Unless otherwise stated, music, lyrics, artwork, branding, and original site content are protected by applicable copyright law. The site does not grant permission to reproduce or commercially use that material.</p>
      <h2>External services</h2><p>Streaming and social links lead to independent third-party services. Their availability, content, and terms are outside PepMusic&apos;s control.</p>
      <h2>No warranties</h2><p>The site is provided as available. PepMusic does not promise that every archival detail or external destination will remain complete or continuously available.</p>
      <h2>Contact</h2><p>An official legal contact will be added when PepUniverse business email addresses are established.</p>
    </article><NetworkFooter /></main>
  );
}
