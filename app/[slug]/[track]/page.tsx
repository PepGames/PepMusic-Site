import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreelineLyrics from "@/components/TreelineLyrics";
import { getPublicTrack, publicLyricTracks } from "@/data/catalog";

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
  const date = track.releaseDate
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${track.releaseDate}T00:00:00Z`))
    : undefined;
  const description = track.description ?? `Read the official lyrics to ${track.title} by Pep, from ${release.title}${date ? `, released ${date}` : ""}.`;
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
  if (!result?.track.lyricsFile) notFound();
  return <TreelineLyrics release={result.release} track={result.track} />;
}
