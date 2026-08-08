import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  formatKind,
  getPublicRelease,
  getReleaseNeighbors,
  publicCatalog,
} from "@/data/catalog";

type ReleasePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicCatalog.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: ReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getPublicRelease(slug);
  if (!release) return {};

  const title = `${release.title} | PepMusic`;
  const description = `${release.summary} Official music and release information from PepMusic.`;
  return {
    title,
    description,
    alternates: { canonical: `/${release.slug}` },
    openGraph: {
      title,
      description,
      type: "music.album",
      url: `/${release.slug}`,
      images: release.artwork ? [{ url: release.artwork, alt: release.artworkAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: release.artwork ? [release.artwork] : undefined,
    },
  };
}

export default async function ReleasePage({ params }: ReleasePageProps) {
  const { slug } = await params;
  const release = getPublicRelease(slug);
  if (!release) notFound();
  const { previous, next } = getReleaseNeighbors(slug);
  const livePlatforms = release.platforms.filter((destination) => destination.status === "live");
  const pendingPlatforms = release.platforms.filter((destination) => destination.status === "coming-soon");

  return (
    <main className={`release-page release-theme-${release.theme}`}>
      <SiteHeader compact />
      <section className="release-hero" aria-labelledby="release-title">
        <div className="release-hero-art">
          <img src={release.artwork} alt={release.artworkAlt} />
        </div>
        <div className="release-hero-copy">
          <Link className="back-link" href="/#music">← All releases</Link>
          <p className="eyebrow">{release.status === "upcoming" ? "UPCOMING" : "FROM THE ARCHIVE"}</p>
          <h1 id="release-title">{release.title}</h1>
          <p className="release-summary">{release.summary}</p>
          <dl className="release-facts release-page-facts">
            <div><dt>Artist</dt><dd>{release.artist}</dd></div>
            <div><dt>Year</dt><dd>{release.year}</dd></div>
            <div><dt>Format</dt><dd>{formatKind(release.kind)}</dd></div>
          </dl>

          <div className="platform-section" aria-labelledby="listen-title">
            <div className="platform-heading">
              <h2 id="listen-title">{pendingPlatforms.length ? "Listening links" : "Listen"}</h2>
              {pendingPlatforms.length > 0 && <p>Release destinations will activate here when they are confirmed.</p>}
            </div>
            <div className="platform-grid">
              {livePlatforms.map((destination) => (
                <a key={destination.platform} className="platform-link" href={destination.url} target="_blank" rel="noopener noreferrer">
                  <span>{destination.label ?? destination.platform}</span><span aria-hidden="true">↗</span>
                </a>
              ))}
              {pendingPlatforms.map((destination) => (
                <span key={destination.platform} className="platform-link is-disabled" aria-disabled="true">
                  <span>{destination.platform}</span><small>Coming soon</small>
                </span>
              ))}
            </div>
            {!livePlatforms.length && !pendingPlatforms.length && <p className="pending-note">Verified listening destinations are still being restored.</p>}
          </div>
        </div>
      </section>

      <section className="release-details section-shell">
        <div className="release-story">
          <p className="eyebrow">ABOUT THE RELEASE</p>
          <h2>A marker on the path.</h2>
          {(release.story ?? [release.summary]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {release.publishedAt && (
            <p className="source-date">Published to SoundCloud on {new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(release.publishedAt))}. This is a platform publication timestamp, not a separately confirmed commercial release date.</p>
          )}
        </div>

        <div className="release-information">
          {release.tracks?.length ? (
            <section aria-labelledby="tracks-title"><p className="eyebrow">TRACKS</p><h2 id="tracks-title">Track list</h2>
              <ol className="track-list">{release.tracks.map((track) => <li key={track.title}><span>{track.title}</span>{track.duration && <span>{track.duration}</span>}</li>)}</ol>
            </section>
          ) : (
            <section className="archive-pending" aria-labelledby="archive-title"><p className="eyebrow">ARCHIVE STATUS</p><h2 id="archive-title">Details in progress</h2><p>Track information, lyrics, and credits will appear only after they are verified.</p></section>
          )}
          {release.credits?.length ? (
            <section aria-labelledby="credits-title"><p className="eyebrow">CREDITS</p><h2 id="credits-title">Credits</h2><dl className="credit-list">{release.credits.map((credit) => <div key={`${credit.role}-${credit.name}`}><dt>{credit.role}</dt><dd>{credit.name}</dd></div>)}</dl></section>
          ) : null}
        </div>
      </section>

      <nav className="release-pagination section-shell" aria-label="Catalog navigation">
        {previous ? <Link href={`/${previous.slug}`}><span>Previous</span><strong>← {previous.title}</strong></Link> : <span />}
        {next ? <Link href={`/${next.slug}`}><span>Next</span><strong>{next.title} →</strong></Link> : <Link href="/#music"><span>Return</span><strong>All releases →</strong></Link>}
      </nav>
      <NetworkFooter />
    </main>
  );
}
