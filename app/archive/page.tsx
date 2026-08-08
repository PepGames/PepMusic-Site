import type { Metadata } from "next";
import Link from "next/link";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { archiveCatalog, formatKind } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Music Archive | PepMusic",
  description: "Explore Pep's albums, mixtapes, EPs, and singles across Spotify, Apple Music, YouTube Music, and SoundCloud.",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Music Archive | PepMusic",
    description: "The official archive of music released by Pep.",
    url: "/archive",
  },
};

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <SiteHeader compact />
      <header className="archive-hero section-shell">
        <p className="eyebrow">THE MUSIC OF PEP</p>
        <h1>The archive.</h1>
        <p>Projects and singles from 2016 onward. Choose a release for its story and lyrics, or listen on your preferred platform.</p>
      </header>

      <section className="archive-list section-shell" aria-label="Archived releases">
        {archiveCatalog.map((release) => (
          <article className="archive-row" key={release.slug}>
            <Link className="archive-release-link" href={`/${release.slug}`} aria-label={`Explore ${release.title}`}>
              <img src={release.artwork} alt={release.artworkAlt} />
              <div>
                <p>{formatKind(release.kind)} · {release.year}</p>
                <h2>{release.title}</h2>
                <span>{release.summary}</span>
              </div>
            </Link>
            <div className="archive-destinations" aria-label={`Listen to ${release.title}`}>
              {release.platforms.filter((destination) => destination.status === "live").map((destination) => (
                <a key={destination.platform} href={destination.url} target="_blank" rel="noopener noreferrer">
                  {destination.platform}<span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
      <NetworkFooter />
    </main>
  );
}
