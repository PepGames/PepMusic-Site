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
const researchedOn = "2026-08-08";

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
      "Everything changed in the year leading up to Pep's third project. Two Halves and Two Paths looks at the opportunities ahead, the opposing sides within a person, and the choices that appear at a crossroads.",
      "The project follows that tension between good and evil toward an ultimate decision. It was released on June 27, 2018.",
    ],
    releaseDate: "2018-06-27",
    tracks: [
      { title: "Work" },
      { title: "My Crew" },
      { title: "Until I Die" },
      { title: "Prayers" },
      { title: "Devil's Love Song" },
      { title: "Rock Bottom" },
    ],
    credits: [{ role: "Production", name: "Airavata" }],
    platforms: [
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/joshuapepoli/sets/two-halves-and-two-paths",
        label: "Play on SoundCloud",
      },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and 2018 release year." },
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/joshuapepoli/sets/two-halves-and-two-paths",
        retrievedOn: researchedOn,
        note: "Direct official playlist verifies the description, six-track sequence, production credit, and June 27, 2018 release date.",
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
      "The Descent is Pep's second full project and the first half of a planned two-part story. It follows a mindset re-entering the atmosphere while the past burns away.",
      "Old friendships and relationships fall behind as the pursuit of success pulls the story farther into darkness. The project was released on December 24, 2017.",
    ],
    releaseDate: "2017-12-24",
    tracks: [
      { title: "I Will Rejoice" },
      { title: "I Know" },
      { title: "Product of Everything" },
      { title: "Diamonds" },
      { title: "bandsonit" },
      { title: "Fuck Everybody" },
      { title: "My Turn" },
      { title: "Missed Opportunities" },
      { title: "The Struggle" },
      { title: "Gone" },
    ],
    platforms: [
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/joshuapepoli/sets/the-descent",
        label: "Play on SoundCloud",
      },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and 2017 release year." },
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/joshuapepoli/sets/the-descent",
        retrievedOn: researchedOn,
        note: "Direct official playlist verifies the description, ten-track sequence, and December 24, 2017 release date. SoundCloud labels it an EP; owner-confirmed album classification remains authoritative.",
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
      "Lift Off is Pep's first full project. Its fourteen tracks look back at his life up to that point while reaching toward the dreams and direction ahead.",
      "The project began Pep's catalog in 2016 and remains available through the original SoundCloud archive.",
    ],
    tracks: [
      { title: "Interstellar" },
      { title: "Keep Your Head Up" },
      { title: "Unapproachable" },
      { title: "The Best", featuredArtists: ["$uicide Kent"] },
      { title: "Soothe My Soul" },
      { title: "Dreams" },
      { title: "No Pressure" },
      { title: "Take Me Away" },
      { title: "The Fool" },
      { title: "Alone" },
      { title: "Phenomenon" },
      { title: "Me" },
      { title: "Circles", featuredArtists: ["$uicide Kent"] },
      { title: "May (Bonus Track)" },
    ],
    credits: [
      { role: "Production — The Best", name: "Syndrome" },
      { role: "Production — Alone and Me", name: "Airavata" },
    ],
    platforms: [
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/joshuapepoli/sets/lift-off",
        label: "Play on SoundCloud",
      },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, 2016 release year, and SoundCloud availability." },
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/joshuapepoli/sets/lift-off",
        retrievedOn: researchedOn,
        note: "Direct official playlist verifies the description and fourteen-track sequence. SoundCloud labels it an EP and shows May 4, 2017; owner-confirmed album classification and 2016 release year remain authoritative, so the conflicting platform date is not presented as the official release date.",
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
    story: ["A concise note of gratitude accompanies Achievement in Pep's official SoundCloud archive."],
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
    story: ["Mistakes reflects on wrong turns as part of the larger journey rather than as the end of it."],
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
    ["righteous-hearts-prod-pep", "Trippie Redd x Mo Beats - Righteous Hearts (Prod Pep)", "production", 2023, "2023-02-03T04:25:58Z", "trippie-redd-x-mo-beats-righteous-hearts-prod-pep"],
    ["less-than-zero-cover", "Less Than Zero (The Weeknd Cover)", "cover", 2023, "2023-01-30T20:47:35Z", "less-than-zero-the-weeknd-cover"],
    ["gh05t", "GH05T", "single", 2022, "2022-10-13T19:57:08Z", "gh05t"],
    ["fumble-remix", "Fumble (Tilekid/Sace Remix)", "remix", 2022, "2022-09-07T23:55:09Z", "fumble-tilekidsace-remix"],
    ["nonchalant", "Nonchalant (Feat. $uicide Kent)", "feature", 2022, "2022-06-07T19:23:04Z", "nonchalant-feat-uicide-kent"],
    ["how-u-feel-snippet", "how u feel (snippet)", "snippet", 2022, "2022-01-25T07:56:20Z", "how-u-feel-snippet"],
    ["work", "Work", "single", 2018, "2018-06-28T16:54:07Z", "work"],
    ["my-crew", "My Crew", "single", 2018, "2018-06-28T16:54:05Z", "my-crew"],
  ].map(([slug, title, kind, year, publishedAt, soundCloudSlug], index) => ({
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
        url: `${soundCloudProfile}/${soundCloudSlug}`,
        retrievedOn: researchedOn,
        note: "Title, direct destination, and publication timestamp verified on Pep's official profile; held for editorial review.",
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
