import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreelineLyrics from "@/components/TreelineLyrics";
import TreelineRelease from "@/components/TreelineRelease";
import { getPublicRelease, publicCatalog } from "@/data/catalog";

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
  if (release.kind === "single" && release.lyricsFile) return <TreelineLyrics release={release} />;
  return <TreelineRelease release={release} />;
}
