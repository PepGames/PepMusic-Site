import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lyrics } from "@/components/Lyrics";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublicTrack, getTrackNeighbors, publicLyricTracks } from "@/data/catalog";
import { readLyrics } from "@/data/lyrics";

type TrackPageProps = { params: Promise<{ slug: string; track: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publicLyricTracks.map(({ release, track }) => ({ slug: release.slug, track: track.slug }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug, track: trackSlug } = await params;
  const result = getPublicTrack(slug, trackSlug);
  if (!result) return {};
  const { release, track } = result;
  const title = `${track.title} Lyrics | Pep`;
  const description = `Read the official lyrics to ${track.title} by Pep, from ${release.title}.`;
  const url = `/${release.slug}/${track.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: "music.song", url, images: release.artwork ? [{ url: release.artwork, alt: release.artworkAlt }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: release.artwork ? [release.artwork] : undefined },
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug, track: trackSlug } = await params;
  const result = getPublicTrack(slug, trackSlug);
  const lyricsFile = result?.track.lyricsFile;
  if (!result || !lyricsFile) notFound();
  const { release, track } = result;
  const { previous, next } = getTrackNeighbors(slug, trackSlug);
  const lyrics = readLyrics(lyricsFile);

  return (
    <main className={`lyric-page release-theme-${release.theme}`}>
      <SiteHeader compact />
      <section className="lyric-hero section-shell" aria-labelledby="track-title">
        <Link className="back-link" href={`/${release.slug}`}>← {release.title}</Link>
        <div className="lyric-hero-layout">
          <img src={release.artwork} alt={release.artworkAlt} />
          <div>
            <p className="eyebrow">{release.title.toUpperCase()}</p>
            <h1 id="track-title">{track.title}</h1>
            {track.featuredArtists?.length ? <p className="lyric-feature">Featuring {track.featuredArtists.join(", ")}</p> : null}
            <p>Official lyrics by {release.artist}</p>
          </div>
        </div>
      </section>
      <Lyrics lyrics={lyrics} title={`${track.title} lyrics`} />
      <nav className="release-pagination section-shell" aria-label={`${release.title} track navigation`}>
        {previous ? <Link href={`/${release.slug}/${previous.slug}`}><span>Previous track</span><strong>← {previous.title}</strong></Link> : <span />}
        {next ? <Link href={`/${release.slug}/${next.slug}`}><span>Next track</span><strong>{next.title} →</strong></Link> : <Link href={`/${release.slug}`}><span>Return</span><strong>{release.title} →</strong></Link>}
      </nav>
      <NetworkFooter />
    </main>
  );
}
