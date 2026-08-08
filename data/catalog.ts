export const platformNames = [
  "Spotify",
  "Apple Music",
  "YouTube Music",
  "SoundCloud",
  "Bandcamp",
] as const;

export type PlatformName = (typeof platformNames)[number];
export type ReleaseKind =
  | "album"
  | "ep"
  | "single"
  | "cover"
  | "remix"
  | "feature"
  | "production"
  | "snippet";
export type ReleaseVisibility = "public" | "draft" | "hidden-review";
export type ReleaseStatus = "upcoming" | "released" | "archive";
export type PlatformStatus = "live" | "coming-soon" | "unavailable";

export type PlatformDestination = {
  platform: PlatformName;
  status: PlatformStatus;
  url?: string;
  label?: string;
};

export type CatalogSource = {
  provider: "owner" | "SoundCloud" | "official-channel";
  url?: string;
  retrievedOn?: string;
  note: string;
};

export type Track = {
  title: string;
  featuredArtists?: string[];
  duration?: string;
  lyrics?: string;
};

export type Credit = {
  role: string;
  name: string;
};

export type CatalogItem = {
  slug: string;
  title: string;
  artist: "Pep";
  kind: ReleaseKind;
  visibility: ReleaseVisibility;
  status: ReleaseStatus;
  year: number;
  releaseDate?: string;
  publishedAt?: string;
  artwork?: string;
  artworkAlt?: string;
  theme: string;
  summary: string;
  story?: string[];
  tracks?: Track[];
  credits?: Credit[];
  notes?: string[];
  platforms: PlatformDestination[];
  sources: CatalogSource[];
  featured?: boolean;
  catalogOrder: number;
};

const soundCloudProfile = "https://soundcloud.com/joshuapepoli";
const researchedOn = "2026-08-07";

const growthPlatforms: PlatformDestination[] = platformNames.map((platform) => ({
  platform,
  status: "coming-soon",
}));

export const catalog: CatalogItem[] = [
  {
    slug: "growth",
    title: "Growth",
    artist: "Pep",
    kind: "album",
    visibility: "public",
    status: "upcoming",
    year: 2026,
    artwork: "/assets/releases/growth/cover.webp",
    artworkAlt: "Growth album artwork: a vivid green tree standing in a snowy blue forest",
    theme: "growth",
    summary: "A new chapter takes root in 2026.",
    story: [
      "Growth is the next full-length project from Pep. Its official release date, track list, credits, lyrics, and listening destinations will be added after they are confirmed.",
      "This page is the permanent home for the album and will become its direct listening destination when distribution links are available.",
    ],
    platforms: growthPlatforms,
    sources: [
      {
        provider: "owner",
        note: "Pep confirmed Growth as an upcoming 2026 album; no specific release date is confirmed.",
      },
    ],
    featured: true,
    catalogOrder: 1,
  },
  {
    slug: "two-halves-and-two-paths",
    title: "Two Halves and Two Paths",
    artist: "Pep",
    kind: "ep",
    visibility: "public",
    status: "archive",
    year: 2018,
    artwork: "/assets/releases/two-halves-and-two-paths/cover.webp",
    artworkAlt: "Two Halves and Two Paths EP cover artwork",
    theme: "halves",
    summary: "A 2018 EP from the Pep archive.",
    story: [
      "Two Halves and Two Paths is Pep's 2018 EP. Its original release information and platform destinations are being carefully restored for the official archive.",
    ],
    platforms: [
      { platform: "SoundCloud", status: "live", url: soundCloudProfile, label: "SoundCloud archive" },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and 2018 release year." },
      {
        provider: "SoundCloud",
        url: soundCloudProfile,
        retrievedOn: researchedOn,
        note: "Pep's public profile identifies the EP as released and available through the archive.",
      },
    ],
    catalogOrder: 2,
  },
  {
    slug: "the-descent",
    title: "The Descent",
    artist: "Pep",
    kind: "album",
    visibility: "public",
    status: "archive",
    year: 2017,
    artwork: "/assets/releases/the-descent/cover.webp",
    artworkAlt: "The Descent album cover artwork",
    theme: "descent",
    summary: "A 2017 album from the Pep archive.",
    story: [
      "The Descent is Pep's 2017 album. Verified track details, credits, lyrics, and direct platform destinations will be added as the original release archive is rebuilt.",
    ],
    platforms: [
      { platform: "SoundCloud", status: "live", url: soundCloudProfile, label: "SoundCloud archive" },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and 2017 release year." },
      {
        provider: "SoundCloud",
        url: soundCloudProfile,
        retrievedOn: researchedOn,
        note: "Pep's public profile identifies the album as released and available through the archive.",
      },
    ],
    catalogOrder: 3,
  },
  {
    slug: "lift-off",
    title: "Lift Off",
    artist: "Pep",
    kind: "album",
    visibility: "public",
    status: "archive",
    year: 2016,
    artwork: "/assets/releases/lift-off/cover.webp",
    artworkAlt: "Lift Off album cover artwork",
    theme: "lift",
    summary: "Pep's 2016 debut album.",
    story: [
      "Lift Off began Pep's project catalog in 2016. The original release currently lives in the SoundCloud archive while its official details are reconstructed here.",
    ],
    platforms: [
      { platform: "SoundCloud", status: "live", url: soundCloudProfile, label: "SoundCloud archive" },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, 2016 release year, and SoundCloud availability." },
      {
        provider: "SoundCloud",
        url: soundCloudProfile,
        retrievedOn: researchedOn,
        note: "Verified official Pep profile used as the archival listening destination.",
      },
    ],
    catalogOrder: 4,
  },
  {
    slug: "achievement",
    title: "Achievement",
    artist: "Pep",
    kind: "single",
    visibility: "public",
    status: "archive",
    year: 2022,
    publishedAt: "2022-07-06T21:17:11Z",
    artwork: "/assets/releases/achievement/cover.webp",
    artworkAlt: "Achievement single cover artwork",
    theme: "achievement",
    summary: "A track published to Pep's SoundCloud archive in 2022.",
    platforms: [
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/joshuapepoli/achievement",
      },
    ],
    sources: [
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/joshuapepoli/achievement",
        retrievedOn: researchedOn,
        note: "Track and SoundCloud publication timestamp verified through Pep's official profile.",
      },
    ],
    featured: true,
    catalogOrder: 5,
  },
  {
    slug: "mistakes",
    title: "Mistakes!",
    artist: "Pep",
    kind: "single",
    visibility: "public",
    status: "archive",
    year: 2022,
    publishedAt: "2022-05-09T21:14:36Z",
    artwork: "/assets/releases/mistakes/cover.webp",
    artworkAlt: "Mistakes single cover artwork",
    theme: "mistakes",
    summary: "A track published to Pep's SoundCloud archive in 2022.",
    platforms: [
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/joshuapepoli/mistakes",
      },
    ],
    sources: [
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/joshuapepoli/mistakes",
        retrievedOn: researchedOn,
        note: "Track and SoundCloud publication timestamp verified through Pep's official profile.",
      },
    ],
    featured: true,
    catalogOrder: 6,
  },
  ...[
    ["righteous-hearts-prod-pep", "Righteous Hearts (Prod. Pep)", "production", 2023, "2023-02-03T04:25:58Z"],
    ["less-than-zero-cover", "Less Than Zero (The Weeknd Cover)", "cover", 2023, "2023-01-30T20:47:35Z"],
    ["gh05t", "GH05T", "single", 2022, "2022-10-13T19:57:08Z"],
    ["fumble-remix", "Fumble (Tilekid/Sace Remix)", "remix", 2022, "2022-09-07T23:55:09Z"],
    ["nonchalant", "Nonchalant (Feat. $uicide Kent)", "feature", 2022, "2022-06-07T19:23:04Z"],
    ["how-u-feel-snippet", "how u feel (snippet)", "snippet", 2022, "2022-01-25T07:56:20Z"],
    ["work", "Work", "single", 2018, "2018-06-28T16:54:07Z"],
    ["my-crew", "My Crew", "single", 2018, "2018-06-28T16:54:05Z"],
  ].map(([slug, title, kind, year, publishedAt], index) => ({
    slug: String(slug),
    title: String(title),
    artist: "Pep" as const,
    kind: kind as ReleaseKind,
    visibility: "hidden-review" as const,
    status: "archive" as const,
    year: Number(year),
    publishedAt: String(publishedAt),
    theme: "archive",
    summary: "Verified on Pep's public SoundCloud profile; hidden pending editorial review.",
    platforms: [],
    sources: [
      {
        provider: "SoundCloud" as const,
        url: soundCloudProfile,
        retrievedOn: researchedOn,
        note: "Title and publication timestamp verified on Pep's official profile; direct destination not yet curated.",
      },
    ],
    catalogOrder: 100 + index,
  })),
];

function validateCatalog(items: CatalogItem[]) {
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const item of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) errors.push(`${item.title}: invalid slug`);
    if (slugs.has(item.slug)) errors.push(`${item.title}: duplicate slug`);
    slugs.add(item.slug);

    if (item.visibility === "public" && (!item.artwork || !item.artworkAlt)) {
      errors.push(`${item.title}: public releases require artwork and alternative text`);
    }
    if (item.releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(item.releaseDate)) {
      errors.push(`${item.title}: releaseDate must be a confirmed YYYY-MM-DD date`);
    }
    if (item.publishedAt && Number.isNaN(Date.parse(item.publishedAt))) {
      errors.push(`${item.title}: publishedAt must be a valid source timestamp`);
    }
    for (const destination of item.platforms) {
      if (destination.status === "live" && !destination.url) {
        errors.push(`${item.title}: live ${destination.platform} destination requires a URL`);
      }
      if (destination.status !== "live" && destination.url) {
        errors.push(`${item.title}: non-live ${destination.platform} destination cannot have a URL`);
      }
      if (destination.url) {
        try {
          const parsed = new URL(destination.url);
          if (parsed.protocol !== "https:") errors.push(`${item.title}: platform URLs must use HTTPS`);
        } catch {
          errors.push(`${item.title}: malformed ${destination.platform} URL`);
        }
      }
    }
  }

  if (errors.length) throw new Error(`Invalid PepMusic catalog:\n${errors.join("\n")}`);
}

validateCatalog(catalog);

export const publicCatalog = catalog
  .filter((item) => item.visibility === "public")
  .sort((a, b) => a.catalogOrder - b.catalogOrder);

export const publicProjects = publicCatalog.filter((item) => item.kind === "album" || item.kind === "ep");
export const publicSingles = publicCatalog.filter((item) => item.kind === "single");

export function getPublicRelease(slug: string) {
  return publicCatalog.find((item) => item.slug === slug);
}

export function getReleaseNeighbors(slug: string) {
  const index = publicCatalog.findIndex((item) => item.slug === slug);
  return {
    previous: index > 0 ? publicCatalog[index - 1] : undefined,
    next: index >= 0 && index < publicCatalog.length - 1 ? publicCatalog[index + 1] : undefined,
  };
}

export function formatKind(kind: ReleaseKind) {
  if (kind === "ep") return "EP";
  return kind.charAt(0).toUpperCase() + kind.slice(1);
}
