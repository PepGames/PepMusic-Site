import type { MetadataRoute } from "next";
import { publicCatalog } from "@/data/catalog";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://music.pepuniverse.com";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...publicCatalog.map((release) => ({ url: `${base}/${release.slug}`, changeFrequency: "monthly" as const, priority: release.slug === "growth" ? 0.9 : 0.7 })),
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
