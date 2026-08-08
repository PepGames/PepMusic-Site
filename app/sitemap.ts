import type { MetadataRoute } from "next";
import { publicCatalog, publicLyricTracks } from "@/data/catalog";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://music.pepuniverse.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/archive`, changeFrequency: "monthly", priority: 0.8 },
    ...publicCatalog.map((release) => ({ url: `${base}/${release.slug}`, changeFrequency: "monthly" as const, priority: release.slug === "growth" ? 0.9 : 0.7 })),
    ...publicLyricTracks.map(({ release, track }) => ({ url: `${base}/${release.slug}/${track.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
