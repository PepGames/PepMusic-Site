export const platformNames = [
  "Spotify",
  "Apple Music",
  "YouTube Music",
  "SoundCloud",
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
  slug: string;
  title: string;
  featuredArtists?: string[];
  duration?: string;
  lyricsFile?: string;
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
  lyricsFile?: string;
  platforms: PlatformDestination[];
  sources: CatalogSource[];
  featured?: boolean;
  catalogOrder: number;
};

export const artistProfiles: PlatformDestination[] = [
  { platform: "Spotify", status: "live", url: "https://open.spotify.com/artist/73gupmK33Bhqtq1JSH1dGA", label: "Pep on Spotify" },
  { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/artist/pep/1522338985", label: "Pep on Apple Music" },
  { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/channel/UCWyPuEkBxEXbzWQ4H_iTh5Q", label: "Pep on YouTube Music" },
  { platform: "SoundCloud", status: "live", url: "https://soundcloud.com/joshuapepoli", label: "Pep on SoundCloud" },
];

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
      "INITIALIZING... ~Pep Iteration 001~ “FINAL MESSAGE”...",
      "A single tree grows in a frozen wasteland. The wasteland symbolizes the death of Pep’s ego, mindset, and worldview; the tree sprout symbolizes a chance for new beginnings, hope, and knowledge. The tree grows from the decay left behind by the winter storm, creating new, stronger roots and healthy soil.",
      "Growth was written during a time of metamorphosis, when Pep unlocked his true abilities. Life begins anew, closing out the old cycle and starting a new one.",
      "END “FINAL MESSAGE”...",
    ],
    tracks: [
      { slug: "light", title: "Light" },
      { slug: "wambam", title: "WamBam" },
      { slug: "timepiece", title: "Timepiece" },
      { slug: "tale-or-maid", title: "Tale or Maid" },
      { slug: "hml", title: "HML" },
      { slug: "shoot-me-down", title: "Shoot Me Down" },
      { slug: "had-enough", title: "Had Enough" },
      { slug: "luck", title: "Luck", featuredArtists: ["Matty Schreff"] },
      { slug: "much-to-lose", title: "Much to Lose" },
      { slug: "goat", title: "G.O.A.T." },
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
      "Everything changed in a year. Pep’s third mixtape, Two Halves and Two Paths, symbolizes the multitude of opportunities and choices ahead of him. The duality of the universe is reflected within him as he separates his good and evil sides and comes to grips with their eternal struggle.",
      "This leads Pep to a crossroads, where he must make the ultimate decision. All beats on this tape were produced by @airavata_beats. Check out his music—it’s lit!",
    ],
    releaseDate: "2018-06-27",
    tracks: [
      { slug: "work", title: "Work", lyricsFile: "twohalves/work.txt" },
      { slug: "my-crew", title: "My Crew", lyricsFile: "twohalves/mycrew.txt" },
      { slug: "until-i-die", title: "Until I Die", lyricsFile: "twohalves/untilidie.txt" },
      { slug: "prayers", title: "Prayers", lyricsFile: "twohalves/prayers.txt" },
      { slug: "devils-love-song", title: "Devil's Love Song", lyricsFile: "twohalves/devilslovesong.txt" },
      { slug: "rock-bottom", title: "Rock Bottom", lyricsFile: "twohalves/rockbottom.txt" },
    ],
    credits: [{ role: "Production", name: "Airavata" }],
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/2GLetlbMZy8SnlER2n5kmI" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/two-halves-and-two-paths-ep/1522353508" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_nMCYfYofCbr38erk5mYlkaN0yEgnDbPxQ" },
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
      "The Descent is Pep’s second mixtape and the first half of a two-part project: The Descent / Into Madness. The tape symbolizes the re-entry of Pep’s mindset into the atmosphere.",
      "As he moves forward in life, he decides to let his past burn away into ash, leaving old friends and relationships behind in a quest for success and fortune. As fame and stardom become a larger part of his life, he descends further into Hell.",
    ],
    releaseDate: "2017-12-24",
    tracks: [
      { slug: "i-will-rejoice", title: "I Will Rejoice", lyricsFile: "descent/iwillrejoice.txt" },
      { slug: "i-know", title: "I Know", lyricsFile: "descent/iknow.txt" },
      { slug: "product-of-everything", title: "Product of Everything", lyricsFile: "descent/productofeverything.txt" },
      { slug: "diamonds", title: "Diamonds", lyricsFile: "descent/diamonds.txt" },
      { slug: "bandsonit", title: "bandsonit", lyricsFile: "descent/bandsonit.txt" },
      { slug: "fuck-everybody", title: "Fuck Everybody", lyricsFile: "descent/fuckeverybody.txt" },
      { slug: "my-turn", title: "My Turn", lyricsFile: "descent/myturn.txt" },
      { slug: "missed-opportunities", title: "Missed Opportunities", lyricsFile: "descent/missedopportunities.txt" },
      { slug: "the-struggle", title: "The Struggle", lyricsFile: "descent/thestruggle.txt" },
      { slug: "gone", title: "Gone", lyricsFile: "descent/gone.txt" },
    ],
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/7wWQmQHlwLOUbVQrr8Lrli" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/the-descent/1523728261" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_n29ZS5cIizUjZw5LTx45AJU8WOFtpLbNE" },
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
      "Lift Off is Pep’s first mixtape. Its 14 songs center on Pep’s life up to that point and his dreams for the future.",
    ],
    tracks: [
      { slug: "interstellar", title: "Interstellar", lyricsFile: "liftoff/interstellar.txt" },
      { slug: "keep-your-head-up", title: "Keep Your Head Up", lyricsFile: "liftoff/keepyourheadup.txt" },
      { slug: "unapproachable", title: "Unapproachable", lyricsFile: "liftoff/unapproachable.txt" },
      { slug: "the-best", title: "The Best", featuredArtists: ["$uicide Kent"], lyricsFile: "liftoff/thebest.txt" },
      { slug: "soothe-my-soul", title: "Soothe My Soul", lyricsFile: "liftoff/soothemysoul.txt" },
      { slug: "dreams", title: "Dreams", lyricsFile: "liftoff/dreams.txt" },
      { slug: "no-pressure", title: "No Pressure", lyricsFile: "liftoff/nopressure.txt" },
      { slug: "take-me-away", title: "Take Me Away", lyricsFile: "liftoff/takemeaway.txt" },
      { slug: "the-fool", title: "The Fool", lyricsFile: "liftoff/thefool.txt" },
      { slug: "alone", title: "Alone", lyricsFile: "liftoff/alone.txt" },
      { slug: "phenomenon", title: "Phenomenon", lyricsFile: "liftoff/phenomenon.txt" },
      { slug: "me", title: "Me", lyricsFile: "liftoff/me.txt" },
      { slug: "circles", title: "Circles", featuredArtists: ["$uicide Kent"], lyricsFile: "liftoff/circles.txt" },
      { slug: "may", title: "May (Bonus Track)" },
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
    lyricsFile: "singles/achievement.txt",
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/5uzjpJVTYpuGX8KwSMjTAP" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/achievement-single/1633337349" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_nsgm-XlYQCgP0y0xdl4XNs8eihV6C-fRI" },
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
    lyricsFile: "singles/mistakes.txt",
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/2dWP5CL1MUqqHpE6tiAucP" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/mistakes-single/1623253802" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_lgvD3dnYg8Zzw1Ee4dFvWgtG5MOh3fou8" },
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
  {
    slug: "gho5t",
    title: "GHO5T",
    artist: "Pep",
    kind: "single",
    visibility: "public",
    status: "archive",
    year: 2022,
    releaseDate: "2022-10-13",
    publishedAt: "2022-10-13T19:57:08Z",
    artwork: "/assets/releases/gho5t/cover.webp",
    artworkAlt: "GHO5T single artwork featuring a glowing illustrated ghost on a dark background",
    theme: "archive",
    summary: "A 2022 single from Pep.",
    story: ["GHO5T was released as a single on October 13, 2022."],
    lyricsFile: "singles/gho5t.txt",
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/5D7V1qh9fpOKbixalWMBhX" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/gh05t-single/1649841869" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_kLmL9lphyAHSXfszLSCJCIgo6pV5A45qM" },
      { platform: "SoundCloud", status: "live", url: "https://soundcloud.com/joshuapepoli/gh05t" },
    ],
    sources: [
      { provider: "official-channel", url: "https://music.apple.com/us/album/gh05t-single/1649841869", retrievedOn: researchedOn, note: "Apple Music verifies the official release date and supplies the release artwork." },
      { provider: "SoundCloud", url: "https://soundcloud.com/joshuapepoli/gh05t", retrievedOn: researchedOn, note: "Direct destination and SoundCloud publication timestamp verified on Pep's official profile." },
    ],
    featured: true,
    catalogOrder: 7,
  },
  {
    slug: "fumble",
    title: "Fumble",
    artist: "Pep",
    kind: "single",
    visibility: "public",
    status: "archive",
    year: 2022,
    releaseDate: "2022-09-08",
    publishedAt: "2022-09-07T23:55:09Z",
    artwork: "/assets/releases/fumble/cover.webp",
    artworkAlt: "Fumble single artwork featuring a dark armored fantasy warrior holding a shield",
    theme: "archive",
    summary: "A 2022 single from Pep.",
    story: ["Fumble was released as a single on September 8, 2022. Its SoundCloud archive identifies the uploaded version as the Tilekid/Sace remix."],
    lyricsFile: "singles/fumble.txt",
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/0QB0pbOlVn9DRtyQ5ms3UU" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/fumble-single/1644017107" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_me8YqAvI3F9H1cq0Tj82ui5Rj_-JVPG6E" },
      { platform: "SoundCloud", status: "live", url: "https://soundcloud.com/joshuapepoli/fumble-tilekidsace-remix" },
    ],
    sources: [
      { provider: "official-channel", url: "https://music.apple.com/us/album/fumble-single/1644017107", retrievedOn: researchedOn, note: "Apple Music verifies the official release date and supplies the release artwork." },
      { provider: "SoundCloud", url: "https://soundcloud.com/joshuapepoli/fumble-tilekidsace-remix", retrievedOn: researchedOn, note: "Direct remix destination and SoundCloud publication timestamp verified on Pep's official profile." },
    ],
    featured: true,
    catalogOrder: 8,
  },
  ...[
    ["righteous-hearts-prod-pep", "Trippie Redd x Mo Beats - Righteous Hearts (Prod Pep)", "production", 2023, "2023-02-03T04:25:58Z", "trippie-redd-x-mo-beats-righteous-hearts-prod-pep"],
    ["less-than-zero-cover", "Less Than Zero (The Weeknd Cover)", "cover", 2023, "2023-01-30T20:47:35Z", "less-than-zero-the-weeknd-cover"],
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
    const trackSlugs = new Set<string>();
    for (const track of item.tracks ?? []) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(track.slug)) errors.push(`${item.title} / ${track.title}: invalid track slug`);
      if (trackSlugs.has(track.slug)) errors.push(`${item.title}: duplicate track slug ${track.slug}`);
      trackSlugs.add(track.slug);
      if (item.visibility !== "public" && track.lyricsFile) errors.push(`${item.title}: non-public release cannot publish lyric files`);
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
export const publicLyricTracks = publicCatalog.flatMap((release) =>
  (release.tracks ?? [])
    .filter((track) => Boolean(track.lyricsFile))
    .map((track) => ({ release, track })),
);

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

export function getPublicTrack(releaseSlug: string, trackSlug: string) {
  const release = getPublicRelease(releaseSlug);
  const track = release?.tracks?.find((candidate) => candidate.slug === trackSlug && candidate.lyricsFile);
  return release && track ? { release, track } : undefined;
}

export function getTrackNeighbors(releaseSlug: string, trackSlug: string) {
  const release = getPublicRelease(releaseSlug);
  const tracks = (release?.tracks ?? []).filter((track) => track.lyricsFile);
  const index = tracks.findIndex((track) => track.slug === trackSlug);
  return {
    previous: index > 0 ? tracks[index - 1] : undefined,
    next: index >= 0 && index < tracks.length - 1 ? tracks[index + 1] : undefined,
  };
}

export function formatKind(kind: ReleaseKind) {
  if (kind === "ep") return "EP";
  return kind.charAt(0).toUpperCase() + kind.slice(1);
}
