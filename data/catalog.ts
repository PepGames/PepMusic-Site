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
  releaseDate?: string;
  publishedAt?: string;
  description?: string;
  platforms?: PlatformDestination[];
  video?: YouTubeVideo;
  sources?: CatalogSource[];
  credits?: Credit[];
};

export type YouTubeVideo = {
  id: string;
  title: string;
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
  description?: string;
  story?: string[];
  tracks?: Track[];
  credits?: Credit[];
  notes?: string[];
  lyricsFile?: string;
  video?: YouTubeVideo;
  platforms: PlatformDestination[];
  sources: CatalogSource[];
  featured?: boolean;
  catalogOrder: number;
};

export const artistProfiles: PlatformDestination[] = [
  { platform: "Spotify", status: "live", url: "https://open.spotify.com/artist/73gupmK33Bhqtq1JSH1dGA", label: "Pep on Spotify" },
  { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/artist/pep/1522338985", label: "Pep on Apple Music" },
  { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/channel/UCWyPuEkBxEXbzWQ4H_iTh5Q", label: "Pep on YouTube Music" },
  { platform: "SoundCloud", status: "live", url: "https://soundcloud.com/pepmusicuniverse", label: "Pep on SoundCloud" },
];

const soundCloudProfile = "https://soundcloud.com/pepmusicuniverse";
const researchedOn = "2026-08-11";

type VerifiedTrackInput = Omit<Track, "platforms" | "video" | "sources"> & {
  soundCloudSlug: string;
  spotify?: string;
  appleMusic?: string;
  youtubeId?: string;
};

function verifiedTrack({ soundCloudSlug, spotify, appleMusic, youtubeId, ...track }: VerifiedTrackInput): Track {
  const soundCloudUrl = `${soundCloudProfile}/${soundCloudSlug}`;
  const platforms: PlatformDestination[] = [
    ...(spotify ? [{ platform: "Spotify" as const, status: "live" as const, url: spotify }] : []),
    ...(appleMusic ? [{ platform: "Apple Music" as const, status: "live" as const, url: appleMusic }] : []),
    ...(youtubeId ? [{ platform: "YouTube Music" as const, status: "live" as const, url: `https://music.youtube.com/watch?v=${youtubeId}` }] : []),
    { platform: "SoundCloud", status: "live", url: soundCloudUrl },
  ];
  const sources: CatalogSource[] = [
    {
      provider: "SoundCloud",
      url: soundCloudUrl,
      retrievedOn: researchedOn,
      note: "Canonical track destination, release date, and publication timestamp verified on Pep's official profile.",
    },
    ...(youtubeId ? [{
      provider: "official-channel" as const,
      url: `https://www.youtube.com/watch?v=${youtubeId}`,
      retrievedOn: researchedOn,
      note: "Song title and Pep - Topic attribution verified on the official YouTube destination.",
    }] : []),
  ];

  return {
    ...track,
    platforms,
    video: youtubeId ? { id: youtubeId, title: `${track.title} by Pep` } : undefined,
    sources,
  };
}

function songCredits(beatProducer: string, mixingAndMastering: string, additionalLyrics?: string): Credit[] {
  return [
    { role: "Lyrics", name: "Pep" },
    ...(additionalLyrics ? [{ role: "Additional lyrics", name: additionalLyrics }] : []),
    { role: "Beat production", name: beatProducer },
    { role: "Mixing & mastering", name: mixingAndMastering },
  ];
}

const pepLyricsCredit: Credit[] = [{ role: "Lyrics", name: "Pep" }];

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
      { slug: "light", title: "Light", credits: songCredits("Ioannis", "Full Tilt Studios") },
      { slug: "wambam", title: "WamBam", credits: songCredits("Ioannis", "Full Tilt Studios") },
      { slug: "timepiece", title: "Timepiece", credits: songCredits("Ioannis", "Full Tilt Studios") },
      { slug: "tale-or-maid", title: "Tale or Maid", credits: songCredits("CJTheSmoke", "Full Tilt Studios") },
      { slug: "hml", title: "HML", credits: songCredits("Ioannis", "Full Tilt Studios") },
      { slug: "shoot-me-down", title: "Shoot Me Down", credits: songCredits("Ioannis", "Full Tilt Studios") },
      { slug: "had-enough", title: "Had Enough", credits: songCredits("Pep", "Full Tilt Studios") },
      { slug: "luck", title: "Luck", featuredArtists: ["Matty Schreff"], credits: songCredits("Ioannis", "Full Tilt Studios", "Matty Schreff") },
      { slug: "much-to-lose", title: "Much to Lose", credits: songCredits("Ioannis", "Full Tilt Studios") },
      { slug: "goat", title: "G.O.A.T.", credits: songCredits("Ioannis", "Full Tilt Studios") },
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
      verifiedTrack({ slug: "work", title: "Work", lyricsFile: "twohalves/work.txt", credits: songCredits("Airavata", "Pep"), releaseDate: "2018-06-27", publishedAt: "2018-06-28T16:54:07Z", soundCloudSlug: "work", spotify: "https://open.spotify.com/track/7KxIAoobcxybEvzcAlPoZo", appleMusic: "https://music.apple.com/us/album/work/1522353508?i=1522353510", youtubeId: "H7JiFQ98PMw" }),
      verifiedTrack({ slug: "my-crew", title: "My Crew", lyricsFile: "twohalves/mycrew.txt", credits: songCredits("Airavata", "Pep"), releaseDate: "2018-06-27", publishedAt: "2018-06-28T16:54:05Z", soundCloudSlug: "my-crew", spotify: "https://open.spotify.com/track/4BtUsxEMTuJV5oXIQzw6Y8", appleMusic: "https://music.apple.com/us/album/my-crew/1522353508?i=1522353511", youtubeId: "Jhd1UbgVFi0" }),
      verifiedTrack({ slug: "until-i-die", title: "Until I Die", lyricsFile: "twohalves/untilidie.txt", credits: songCredits("Airavata", "Pep"), releaseDate: "2018-06-27", publishedAt: "2018-06-28T16:54:02Z", soundCloudSlug: "until-i-die", spotify: "https://open.spotify.com/track/3UeQcBG44yWIk9L8zc1hCW", appleMusic: "https://music.apple.com/us/album/until-i-die/1522353508?i=1522353512", youtubeId: "vPLa9YaxJ4c" }),
      verifiedTrack({ slug: "prayers", title: "Prayers", lyricsFile: "twohalves/prayers.txt", credits: songCredits("Airavata", "Pep"), releaseDate: "2018-06-27", publishedAt: "2018-06-28T16:54:00Z", soundCloudSlug: "prayers", spotify: "https://open.spotify.com/track/0GsOu13HuNdi1wXAsuwFnv", appleMusic: "https://music.apple.com/us/album/prayers/1522353508?i=1522353514", youtubeId: "Ufb-v6CcTdA" }),
      verifiedTrack({ slug: "devils-love-song", title: "Devil's Love Song", lyricsFile: "twohalves/devilslovesong.txt", credits: songCredits("Airavata", "Pep"), releaseDate: "2018-06-27", publishedAt: "2018-06-28T16:53:57Z", soundCloudSlug: "devils-love-song", spotify: "https://open.spotify.com/track/6L6gaJFQRmMRctv1XzO8v8", appleMusic: "https://music.apple.com/us/album/devils-love-song/1522353508?i=1522353515", youtubeId: "i9qsdiUeGnA" }),
      verifiedTrack({ slug: "rock-bottom", title: "Rock Bottom", lyricsFile: "twohalves/rockbottom.txt", credits: songCredits("Airavata", "Pep"), releaseDate: "2018-06-28", publishedAt: "2018-06-28T16:53:55Z", soundCloudSlug: "rock-bottom", spotify: "https://open.spotify.com/track/063DeslQCbnH6A6wNPJrPY", appleMusic: "https://music.apple.com/us/album/rock-bottom/1522353508?i=1522353636", youtubeId: "uBgpLewJILU" }),
    ],
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/2GLetlbMZy8SnlER2n5kmI" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/two-halves-and-two-paths-ep/1522353508" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_nMCYfYofCbr38erk5mYlkaN0yEgnDbPxQ" },
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/pepmusicuniverse/sets/two-halves-and-two-paths",
        label: "Play on SoundCloud",
      },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and 2018 release year." },
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/pepmusicuniverse/sets/two-halves-and-two-paths",
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
      verifiedTrack({ slug: "i-will-rejoice", title: "I Will Rejoice", lyricsFile: "descent/iwillrejoice.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-24", publishedAt: "2017-12-25T16:25:34Z", soundCloudSlug: "i-will-rejoice", spotify: "https://open.spotify.com/track/6bzxxVihsodNHpoLoD812r", appleMusic: "https://music.apple.com/us/album/i-will-rejoice/1523728261?i=1523728262", youtubeId: "ETB27ciRgIM" }),
      verifiedTrack({ slug: "i-know", title: "I Know", lyricsFile: "descent/iknow.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-25", publishedAt: "2017-12-25T16:25:30Z", soundCloudSlug: "i-know", spotify: "https://open.spotify.com/track/6ao176qn6pDFyvDKFW4l2E", appleMusic: "https://music.apple.com/us/album/i-know/1523728261?i=1523728263", youtubeId: "AgeM3AAS54E" }),
      verifiedTrack({ slug: "product-of-everything", title: "Product of Everything", lyricsFile: "descent/productofeverything.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-25", publishedAt: "2017-12-25T16:25:27Z", soundCloudSlug: "product-of-everything", spotify: "https://open.spotify.com/track/6JXpL3seE3jPbZvZ9tYFFn", appleMusic: "https://music.apple.com/us/album/product-of-everything/1523728261?i=1523728264", youtubeId: "ZfhaCE7sGZ4" }),
      verifiedTrack({ slug: "diamonds", title: "Diamonds", lyricsFile: "descent/diamonds.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-11-28", publishedAt: "2017-11-28T23:16:31Z", description: "\"Diamonds\" off the upcoming mixtape \"The Descent\" dropping this Christmas.", soundCloudSlug: "diamonds", spotify: "https://open.spotify.com/track/26Echoivp6ByV07vC3VR2w", appleMusic: "https://music.apple.com/us/album/diamonds/1523728261?i=1523728265", youtubeId: "jlLt8rYBElk" }),
      verifiedTrack({ slug: "bandsonit", title: "bandsonit", lyricsFile: "descent/bandsonit.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-24", publishedAt: "2017-12-25T16:25:20Z", soundCloudSlug: "bandsonit", spotify: "https://open.spotify.com/track/3nX3ziXmOG0zDjmM6mUgGz", appleMusic: "https://music.apple.com/us/album/bandsonit/1523728261?i=1523728356", youtubeId: "Nj9cIb9Kdgo" }),
      verifiedTrack({ slug: "fuck-everybody", title: "Fuck Everybody", lyricsFile: "descent/fuckeverybody.txt", credits: songCredits("BriggityBrax", "Full Tilt Studios"), releaseDate: "2017-12-24", publishedAt: "2017-12-25T16:25:16Z", soundCloudSlug: "fuck-everybody", spotify: "https://open.spotify.com/track/1lnNuHNIjkQMAPj0Mc6wRn", appleMusic: "https://music.apple.com/us/album/f-k-everybody/1523728261?i=1523728357", youtubeId: "zaQDggmaL6o" }),
      verifiedTrack({ slug: "my-turn", title: "My Turn", lyricsFile: "descent/myturn.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-24", publishedAt: "2017-12-25T16:25:13Z", soundCloudSlug: "my-turn", spotify: "https://open.spotify.com/track/3jeVCyWp9Zx2zd6rw4eOuN", appleMusic: "https://music.apple.com/us/album/my-turn/1523728261?i=1523728358", youtubeId: "KDtUaYLz2kc" }),
      verifiedTrack({ slug: "missed-opportunities", title: "Missed Opportunities", lyricsFile: "descent/missedopportunities.txt", credits: songCredits("BriggityBrax", "Full Tilt Studios"), releaseDate: "2017-12-24", publishedAt: "2017-12-25T16:25:08Z", soundCloudSlug: "missed-opportunities", spotify: "https://open.spotify.com/track/036UAJ9ke5zW2UBFdWsLF9", appleMusic: "https://music.apple.com/us/album/missed-opportunities/1523728261?i=1523728359", youtubeId: "U-EDsSAO0s4" }),
      verifiedTrack({ slug: "the-struggle", title: "The Struggle", lyricsFile: "descent/thestruggle.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-24", publishedAt: "2017-12-25T16:25:04Z", soundCloudSlug: "the-struggle", spotify: "https://open.spotify.com/track/0Zeon1VGVJ37UWFoaHgCMp", appleMusic: "https://music.apple.com/us/album/the-struggle/1523728261?i=1523728360", youtubeId: "mWCdML4SoLY" }),
      verifiedTrack({ slug: "gone", title: "Gone", lyricsFile: "descent/gone.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-12-25", publishedAt: "2017-12-25T16:25:00Z", soundCloudSlug: "gone", spotify: "https://open.spotify.com/track/1bPSfOQuXY4WWAjwk5h6Hs", appleMusic: "https://music.apple.com/us/album/gone/1523728261?i=1523728361", youtubeId: "8cxmWHhap50" }),
    ],
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/album/7wWQmQHlwLOUbVQrr8Lrli" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/the-descent/1523728261" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/playlist?list=OLAK5uy_n29ZS5cIizUjZw5LTx45AJU8WOFtpLbNE" },
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/pepmusicuniverse/sets/the-descent",
        label: "Play on SoundCloud",
      },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and 2017 release year." },
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/pepmusicuniverse/sets/the-descent",
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
    year: 2017,
    releaseDate: "2017-05-04",
    artwork: "/assets/releases/lift-off/cover.webp",
    artworkAlt: "Lift Off album cover artwork",
    theme: "lift",
    summary: "Pep's 2017 debut mixtape.",
    story: [
      "Lift Off is Pep’s first mixtape. Its 14 songs center on Pep’s life up to that point and his dreams for the future.",
    ],
    tracks: [
      verifiedTrack({ slug: "interstellar", title: "Interstellar", lyricsFile: "liftoff/interstellar.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-04", publishedAt: "2017-05-04T15:41:40Z", soundCloudSlug: "interstellar" }),
      verifiedTrack({ slug: "keep-your-head-up", title: "Keep Your Head Up", lyricsFile: "liftoff/keepyourheadup.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:38Z", soundCloudSlug: "keep-your-head-up" }),
      verifiedTrack({ slug: "unapproachable", title: "Unapproachable", lyricsFile: "liftoff/unapproachable.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-04", publishedAt: "2017-05-04T15:41:35Z", soundCloudSlug: "unapproachable" }),
      verifiedTrack({ slug: "the-best", title: "The Best", featuredArtists: ["$uicide Kent"], lyricsFile: "liftoff/thebest.txt", credits: songCredits("Syndrome", "Full Tilt Studios", "$uicide Kent"), releaseDate: "2017-05-04", publishedAt: "2017-05-04T15:41:34Z", soundCloudSlug: "the-best-feat-suicide-kent" }),
      verifiedTrack({ slug: "soothe-my-soul", title: "Soothe My Soul", lyricsFile: "liftoff/soothemysoul.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:33Z", soundCloudSlug: "soothe-my-soul" }),
      verifiedTrack({ slug: "dreams", title: "Dreams", lyricsFile: "liftoff/dreams.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:31Z", soundCloudSlug: "dreams-1" }),
      verifiedTrack({ slug: "no-pressure", title: "No Pressure", lyricsFile: "liftoff/nopressure.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:29Z", soundCloudSlug: "no-pressure-1" }),
      verifiedTrack({ slug: "take-me-away", title: "Take Me Away", lyricsFile: "liftoff/takemeaway.txt", credits: songCredits("BriggityBrax", "Full Tilt Studios", "$uicide Kent"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:28Z", soundCloudSlug: "take-me-away" }),
      verifiedTrack({ slug: "the-fool", title: "The Fool", lyricsFile: "liftoff/thefool.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:27Z", soundCloudSlug: "the-fool" }),
      verifiedTrack({ slug: "alone", title: "Alone", lyricsFile: "liftoff/alone.txt", credits: songCredits("Airavata", "Full Tilt Studios"), releaseDate: "2017-05-04", publishedAt: "2017-05-04T15:41:26Z", soundCloudSlug: "alone-prod-airavata" }),
      verifiedTrack({ slug: "phenomenon", title: "Phenomenon", lyricsFile: "liftoff/phenomenon.txt", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:24Z", soundCloudSlug: "phenomenon-1" }),
      verifiedTrack({ slug: "me", title: "Me", lyricsFile: "liftoff/me.txt", credits: songCredits("Airavata", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:24Z", soundCloudSlug: "me-prod-airavata" }),
      verifiedTrack({ slug: "circles", title: "Circles", featuredArtists: ["$uicide Kent"], lyricsFile: "liftoff/circles.txt", credits: songCredits("Pep", "Full Tilt Studios", "$uicide Kent"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:22Z", soundCloudSlug: "circles-feat-suicide-kent" }),
      verifiedTrack({ slug: "may", title: "May (Bonus Track)", credits: songCredits("Pep", "Full Tilt Studios"), releaseDate: "2017-05-03", publishedAt: "2017-05-04T15:41:21Z", soundCloudSlug: "may-bonus-track" }),
    ],
    platforms: [
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/pepmusicuniverse/sets/lift-off",
        label: "Play on SoundCloud",
      },
    ],
    sources: [
      { provider: "owner", note: "Pep confirmed the title, format, and SoundCloud availability, and authorized SoundCloud dates as the official catalog dates." },
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/pepmusicuniverse/sets/lift-off",
        retrievedOn: researchedOn,
        note: "Direct official playlist verifies the description, fourteen-track sequence, and May 4, 2017 release date. Owner-confirmed album classification remains authoritative.",
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
    releaseDate: "2022-07-06",
    publishedAt: "2022-07-06T21:17:11Z",
    artwork: "/assets/releases/achievement/cover.webp",
    artworkAlt: "Achievement single cover artwork",
    theme: "achievement",
    summary: "Thank you G.",
    description: "Thank you G.",
    lyricsFile: "singles/achievement.txt",
    credits: pepLyricsCredit,
    video: { id: "KxR5OsiWIpk", title: "Achievement by Pep" },
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/track/0QQTenZr3WcBV5tOfuJJrw" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/achievement/1633337349?i=1633337350" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/watch?v=KxR5OsiWIpk" },
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/pepmusicuniverse/achievement",
      },
    ],
    sources: [
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/pepmusicuniverse/achievement",
        retrievedOn: researchedOn,
        note: "Track, exact description, release date, and SoundCloud publication timestamp verified through Pep's official profile.",
      },
      { provider: "official-channel", url: "https://www.youtube.com/watch?v=KxR5OsiWIpk", retrievedOn: researchedOn, note: "Song title and Pep - Topic attribution verified on the official YouTube destination." },
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
    releaseDate: "2022-05-09",
    publishedAt: "2022-05-09T21:14:36Z",
    artwork: "/assets/releases/mistakes/cover.webp",
    artworkAlt: "Mistakes single cover artwork",
    theme: "mistakes",
    summary: "I've made a lot of mistakes. But it's all part of the journey.",
    description: "I've made a lot of mistakes. But it's all part of the journey.",
    lyricsFile: "singles/mistakes.txt",
    credits: pepLyricsCredit,
    video: { id: "xCjGH1qGb2s", title: "Mistakes! by Pep" },
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/track/3hqHwZG4W90dZW4hX9p5th" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/mistakes/1623253802?i=1623253803" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/watch?v=xCjGH1qGb2s" },
      {
        platform: "SoundCloud",
        status: "live",
        url: "https://soundcloud.com/pepmusicuniverse/mistakes",
      },
    ],
    sources: [
      {
        provider: "SoundCloud",
        url: "https://soundcloud.com/pepmusicuniverse/mistakes",
        retrievedOn: researchedOn,
        note: "Track, exact description, release date, and SoundCloud publication timestamp verified through Pep's official profile.",
      },
      { provider: "official-channel", url: "https://www.youtube.com/watch?v=xCjGH1qGb2s", retrievedOn: researchedOn, note: "Song title and Pep - Topic attribution verified on the official YouTube destination." },
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
    summary: "Spooky SZN",
    description: "Spooky SZN",
    lyricsFile: "singles/gho5t.txt",
    credits: pepLyricsCredit,
    video: { id: "YN9UdZub3Tk", title: "GHO5T by Pep" },
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/track/0UFIfQ6kSPcBXbNyHAIbRu" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/gh05t/1649841869?i=1649841871" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/watch?v=YN9UdZub3Tk" },
      { platform: "SoundCloud", status: "live", url: "https://soundcloud.com/pepmusicuniverse/gh05t" },
    ],
    sources: [
      { provider: "official-channel", url: "https://music.apple.com/us/album/gh05t-single/1649841869", retrievedOn: researchedOn, note: "Apple Music verifies the official release date and supplies the release artwork." },
      { provider: "SoundCloud", url: "https://soundcloud.com/pepmusicuniverse/gh05t", retrievedOn: researchedOn, note: "Direct destination, exact description, release date, and SoundCloud publication timestamp verified on Pep's official profile." },
      { provider: "official-channel", url: "https://www.youtube.com/watch?v=YN9UdZub3Tk", retrievedOn: researchedOn, note: "Song title and Pep - Topic attribution verified on the official YouTube destination." },
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
    lyricsFile: "singles/fumble.txt",
    credits: pepLyricsCredit,
    video: { id: "hT4Jw4LspBE", title: "Fumble by Pep" },
    platforms: [
      { platform: "Spotify", status: "live", url: "https://open.spotify.com/track/7yGFlgmQ8vf4BPCHRVArzq" },
      { platform: "Apple Music", status: "live", url: "https://music.apple.com/us/album/fumble/1644017107?i=1644017108" },
      { platform: "YouTube Music", status: "live", url: "https://music.youtube.com/watch?v=hT4Jw4LspBE" },
      { platform: "SoundCloud", status: "live", url: "https://soundcloud.com/pepmusicuniverse/fumble-tilekidsace-remix" },
    ],
    sources: [
      { provider: "official-channel", url: "https://music.apple.com/us/album/fumble-single/1644017107", retrievedOn: researchedOn, note: "Apple Music verifies the official release date and supplies the release artwork." },
      { provider: "SoundCloud", url: "https://soundcloud.com/pepmusicuniverse/fumble-tilekidsace-remix", retrievedOn: researchedOn, note: "Direct remix destination, release date, and SoundCloud publication timestamp verified on Pep's official profile; no public description is present." },
      { provider: "official-channel", url: "https://www.youtube.com/watch?v=hT4Jw4LspBE", retrievedOn: researchedOn, note: "Song title and Pep - Topic attribution verified on the official YouTube destination." },
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

  const validateCredits = (owner: string, credits?: Credit[]) => {
    if (!credits?.length) {
      errors.push(`${owner}: published lyrics require song-level credits`);
      return;
    }
    if (!credits.some((credit) => credit.role === "Lyrics" && credit.name === "Pep")) {
      errors.push(`${owner}: lyrics credit must identify Pep`);
    }
    for (const credit of credits) {
      if (!credit.role.trim() || !credit.name.trim()) errors.push(`${owner}: credits require a role and name`);
    }
  };

  const validateDestination = (owner: string, destination: PlatformDestination) => {
    if (destination.status === "live" && !destination.url) {
      errors.push(`${owner}: live ${destination.platform} destination requires a URL`);
    }
    if (destination.status !== "live" && destination.url) {
      errors.push(`${owner}: non-live ${destination.platform} destination cannot have a URL`);
    }
    if (destination.url) {
      try {
        const parsed = new URL(destination.url);
        if (parsed.protocol !== "https:") errors.push(`${owner}: platform URLs must use HTTPS`);
      } catch {
        errors.push(`${owner}: malformed ${destination.platform} URL`);
      }
    }
  };

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
    if (item.lyricsFile) validateCredits(item.title, item.credits);
    if ((item.kind === "album" || item.kind === "ep") && item.credits?.length) {
      errors.push(`${item.title}: project credits must be assigned to individual tracks`);
    }
    for (const destination of item.platforms) validateDestination(item.title, destination);
    if (item.video && !/^[A-Za-z0-9_-]{11}$/.test(item.video.id)) errors.push(`${item.title}: invalid YouTube video ID`);
    const trackSlugs = new Set<string>();
    for (const track of item.tracks ?? []) {
      const trackOwner = `${item.title} / ${track.title}`;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(track.slug)) errors.push(`${item.title} / ${track.title}: invalid track slug`);
      if (trackSlugs.has(track.slug)) errors.push(`${item.title}: duplicate track slug ${track.slug}`);
      trackSlugs.add(track.slug);
      if (item.visibility !== "public" && track.lyricsFile) errors.push(`${item.title}: non-public release cannot publish lyric files`);
      if (track.lyricsFile) validateCredits(trackOwner, track.credits);
      if (track.releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(track.releaseDate)) errors.push(`${trackOwner}: invalid release date`);
      if (track.publishedAt && Number.isNaN(Date.parse(track.publishedAt))) errors.push(`${trackOwner}: invalid publication timestamp`);
      if (item.visibility === "public" && item.status === "archive" && !track.releaseDate) errors.push(`${trackOwner}: archived public tracks require an exact release date`);
      if (item.visibility === "public" && item.status === "archive" && !track.platforms?.some((destination) => destination.platform === "SoundCloud" && destination.status === "live")) {
        errors.push(`${trackOwner}: archived public tracks require a canonical SoundCloud destination`);
      }
      const trackPlatforms = new Set<PlatformName>();
      for (const destination of track.platforms ?? []) {
        if (trackPlatforms.has(destination.platform)) errors.push(`${trackOwner}: duplicate ${destination.platform} destination`);
        trackPlatforms.add(destination.platform);
        validateDestination(trackOwner, destination);
      }
      if (track.video && !/^[A-Za-z0-9_-]{11}$/.test(track.video.id)) errors.push(`${trackOwner}: invalid YouTube video ID`);
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
export const archiveCatalog = publicCatalog.filter((item) => item.status === "archive");
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
