import type { Metadata } from "next";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy | PepMusic",
  description: "PepMusic privacy notice.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main><SiteHeader compact /><article className="legal-page section-shell">
      <p className="eyebrow">PEPMUSIC</p><h1>Privacy</h1><p className="legal-updated">Last updated August 11, 2026</p>
      <h2>What this site collects</h2><p>PepMusic does not currently offer accounts, forms, purchases, advertising, or optional analytics. The site does not intentionally collect personal information directly from visitors.</p>
      <h2>Hosting and technical records</h2><p>Hosting, DNS, and security providers may process standard technical records such as IP addresses, browser information, requested pages, and timestamps to deliver and protect the site.</p>
      <h2>External destinations</h2><p>Links to streaming services and other websites are governed by those services&apos; own privacy practices. PepMusic does not control what they collect after you leave this site.</p>
      <h2>YouTube playback</h2><p>Some song pages offer an optional YouTube player. The player is not loaded until you choose to play the video. Activating it connects your browser to YouTube using YouTube&apos;s privacy-enhanced domain, and YouTube may then process technical information under its own privacy practices.</p>
      <h2>Changes</h2><p>This notice will be updated before accounts, email collection, optional analytics, or other data-collecting features are added.</p>
      <h2>Contact</h2><p>An official privacy contact will be added when PepUniverse business email addresses are established.</p>
    </article><NetworkFooter /></main>
  );
}
