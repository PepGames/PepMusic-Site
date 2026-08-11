import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lyrics } from "@/components/Lyrics";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SongMedia } from "@/components/SongMedia";
import {
  formatKind,
  getPublicRelease,
  getReleaseNeighbors,
  publicCatalog,
} from "@/data/catalog";
import { readLyrics } from "@/data/lyrics";

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
  const singleLyrics = release.lyricsFile ? readLyrics(release.lyricsFile) : undefined;
  const isSingle = release.kind === "single";
  const hasStory = Boolean(release.story?.length);
  const hasReleaseInformation = Boolean(release.tracks?.length || release.credits?.length);

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
          {(!isSingle || release.description) && <p className="release-summary">{release.description ?? release.summary}</p>}
          <dl className="release-facts release-page-facts">
            <div><dt>Artist</dt><dd>{release.artist}</dd></div>
            <div>
              <dt>{release.releaseDate ? "Released" : "Year"}</dt>
              <dd>
                {release.releaseDate
                  ? new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${release.releaseDate}T00:00:00Z`))
                  : release.year}
              </dd>
            </div>
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
          <SongMedia video={release.video} />
        </div>
      </section>

      {(hasStory || hasReleaseInformation) && <section className={`release-details section-shell${hasStory && hasReleaseInformation ? "" : " release-details-single"}`}>
        {hasStory && <div className="release-story">
          <p className="eyebrow">ABOUT THE RELEASE</p>
          <h2 className="sr-only">About {release.title}</h2>
          {release.story!.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>}

        {hasReleaseInformation && <div className="release-information">
          {release.tracks?.length ? (
            <section aria-labelledby="tracks-title"><p className="eyebrow">TRACKS</p><h2 className="sr-only" id="tracks-title">Tracks on {release.title}</h2>
              <ol className="track-list">{release.tracks.map((track) => (
                <li key={track.title}>
                  <span className="track-name">
                    {track.lyricsFile ? <Link href={`/${release.slug}/${track.slug}`}>{track.title}</Link> : <span>{track.title}</span>}
                    {track.featuredArtists?.length ? <small>Featuring {track.featuredArtists.join(", ")}</small> : null}
                  </span>
                  {track.lyricsFile ? <Link className="track-lyrics-link" href={`/${release.slug}/${track.slug}`} aria-label={`Read ${track.title} lyrics`}>Lyrics →</Link> : track.duration ? <span className="track-duration">{track.duration}</span> : null}
                </li>
              ))}</ol>
            </section>
          ) : null}
          {release.credits?.length ? (
            <section aria-labelledby="credits-title"><p className="eyebrow">CREDITS</p><h2 className="sr-only" id="credits-title">Credits for {release.title}</h2><dl className="credit-list">{release.credits.map((credit) => <div key={`${credit.role}-${credit.name}`}><dt>{credit.role}</dt><dd>{credit.name}</dd></div>)}</dl></section>
          ) : null}
        </div>}
      </section>}

      {singleLyrics ? <Lyrics lyrics={singleLyrics} title={`${release.title} lyrics`} /> : null}

      <nav className="release-pagination section-shell" aria-label="Catalog navigation">
        {previous ? <Link href={`/${previous.slug}`}><span>Previous</span><strong>← {previous.title}</strong></Link> : <span />}
        {next ? <Link href={`/${next.slug}`}><span>Next</span><strong>{next.title} →</strong></Link> : <Link href="/#music"><span>Return</span><strong>All releases →</strong></Link>}
      </nav>
      <NetworkFooter />
    </main>
  );
}
