import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../out/", import.meta.url);
const publicSlugs = ["growth", "lift-off", "the-descent", "two-halves-and-two-paths", "achievement", "mistakes", "gho5t", "fumble"];
const hiddenSlugs = ["done", "jaded", "gh05t", "fumble-remix", "work", "my-crew", "how-u-feel-snippet"];
const lyricRoutes = {
  "lift-off": {
    interstellar: "liftoff/interstellar.txt", "keep-your-head-up": "liftoff/keepyourheadup.txt", unapproachable: "liftoff/unapproachable.txt",
    "the-best": "liftoff/thebest.txt", "soothe-my-soul": "liftoff/soothemysoul.txt", dreams: "liftoff/dreams.txt", "no-pressure": "liftoff/nopressure.txt",
    "take-me-away": "liftoff/takemeaway.txt", "the-fool": "liftoff/thefool.txt", alone: "liftoff/alone.txt", phenomenon: "liftoff/phenomenon.txt",
    me: "liftoff/me.txt", circles: "liftoff/circles.txt",
  },
  "the-descent": {
    "i-will-rejoice": "descent/iwillrejoice.txt", "i-know": "descent/iknow.txt", "product-of-everything": "descent/productofeverything.txt",
    diamonds: "descent/diamonds.txt", bandsonit: "descent/bandsonit.txt", "fuck-everybody": "descent/fuckeverybody.txt", "my-turn": "descent/myturn.txt",
    "missed-opportunities": "descent/missedopportunities.txt", "the-struggle": "descent/thestruggle.txt", gone: "descent/gone.txt",
  },
  "two-halves-and-two-paths": {
    work: "twohalves/work.txt", "my-crew": "twohalves/mycrew.txt", "until-i-die": "twohalves/untilidie.txt", prayers: "twohalves/prayers.txt",
    "devils-love-song": "twohalves/devilslovesong.txt", "rock-bottom": "twohalves/rockbottom.txt",
  },
};
const singleLyrics = { achievement: "singles/achievement.txt", mistakes: "singles/mistakes.txt", gho5t: "singles/gho5t.txt", fumble: "singles/fumble.txt" };
const trackRecords = {
  "lift-off/interstellar": ["2017-05-04", "interstellar"],
  "lift-off/keep-your-head-up": ["2017-05-03", "keep-your-head-up"],
  "lift-off/unapproachable": ["2017-05-04", "unapproachable"],
  "lift-off/the-best": ["2017-05-04", "the-best-feat-suicide-kent"],
  "lift-off/soothe-my-soul": ["2017-05-03", "soothe-my-soul"],
  "lift-off/dreams": ["2017-05-03", "dreams-1"],
  "lift-off/no-pressure": ["2017-05-03", "no-pressure-1"],
  "lift-off/take-me-away": ["2017-05-03", "take-me-away"],
  "lift-off/the-fool": ["2017-05-03", "the-fool"],
  "lift-off/alone": ["2017-05-04", "alone-prod-airavata"],
  "lift-off/phenomenon": ["2017-05-03", "phenomenon-1"],
  "lift-off/me": ["2017-05-03", "me-prod-airavata"],
  "lift-off/circles": ["2017-05-03", "circles-feat-suicide-kent"],
  "the-descent/i-will-rejoice": ["2017-12-24", "i-will-rejoice"],
  "the-descent/i-know": ["2017-12-25", "i-know"],
  "the-descent/product-of-everything": ["2017-12-25", "product-of-everything"],
  "the-descent/diamonds": ["2017-11-28", "diamonds"],
  "the-descent/bandsonit": ["2017-12-24", "bandsonit"],
  "the-descent/fuck-everybody": ["2017-12-24", "fuck-everybody"],
  "the-descent/my-turn": ["2017-12-24", "my-turn"],
  "the-descent/missed-opportunities": ["2017-12-24", "missed-opportunities"],
  "the-descent/the-struggle": ["2017-12-24", "the-struggle"],
  "the-descent/gone": ["2017-12-25", "gone"],
  "two-halves-and-two-paths/work": ["2018-06-27", "work"],
  "two-halves-and-two-paths/my-crew": ["2018-06-27", "my-crew"],
  "two-halves-and-two-paths/until-i-die": ["2018-06-27", "until-i-die"],
  "two-halves-and-two-paths/prayers": ["2018-06-27", "prayers"],
  "two-halves-and-two-paths/devils-love-song": ["2018-06-27", "devils-love-song"],
  "two-halves-and-two-paths/rock-bottom": ["2018-06-28", "rock-bottom"],
};

async function html(path) {
  return readFile(new URL(path, root), "utf8");
}

test("exports every approved release and legal route", async () => {
  await Promise.all(publicSlugs.map((slug) => access(new URL(`${slug}/index.html`, root))));
  await access(new URL("privacy/index.html", root));
  await access(new URL("terms/index.html", root));
  await access(new URL("archive/index.html", root));
  await access(new URL("404.html", root));
});

test("exports all 29 approved album-track lyric routes", async () => {
  const routes = Object.entries(lyricRoutes).flatMap(([release, tracks]) => Object.keys(tracks).map((track) => `${release}/${track}/index.html`));
  assert.equal(routes.length, 29);
  await Promise.all(routes.map((route) => access(new URL(route, root))));
});

test("does not export hidden-review tracks", async () => {
  for (const slug of hiddenSlugs) {
    await assert.rejects(access(new URL(`${slug}/index.html`, root)));
  }
});

test("homepage is catalog-driven and links every public release", async () => {
  const page = await html("index.html");
  for (const slug of publicSlugs) assert.match(page, new RegExp(`href=["']/${slug}`));
  assert.match(page, /PepUniverse/);
  assert.match(page, /PepMedia/);
  assert.match(page, /href=["']\/archive/);
  assert.match(page, /href=["']\/#find-pep/);
  assert.match(page, /id="find-pep"/);
  for (const removed of ["From lift off", "Selected releases from the archive", "Every project is a marker", "Visit the album page"]) assert.doesNotMatch(page, new RegExp(removed));
  assert.doesNotMatch(page, /Hear the archive/);
});

test("archive lists every released public entry and its live destinations", async () => {
  const page = await html("archive/index.html");
  for (const slug of publicSlugs.filter((slug) => slug !== "growth")) assert.match(page, new RegExp(`href=["']/${slug}`));
  assert.doesNotMatch(page, /href=["']\/growth/);
  for (const platform of ["Spotify", "Apple Music", "YouTube Music", "SoundCloud"]) assert.match(page, new RegExp(platform));
});

test("Growth destinations are non-interactive and clearly pending", async () => {
  const page = await html("growth/index.html");
  for (const platform of ["Spotify", "Apple Music", "YouTube Music", "SoundCloud"]) {
    assert.match(page, new RegExp(platform));
  }
  assert.match(page, /aria-disabled="true"/);
  assert.match(page, /Coming soon/);
  assert.doesNotMatch(page, /href="[^"]*spotify/i);
});

test("publishes complete artist and release destinations without tracking parameters", async () => {
  const home = await html("index.html");
  for (const destination of ["open.spotify.com/artist/", "music.apple.com/us/artist/", "music.youtube.com/channel/", "soundcloud.com/pepmusicuniverse"]) {
    assert.match(home, new RegExp(destination.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const slug of ["the-descent", "two-halves-and-two-paths", ...Object.keys(singleLyrics)]) {
    const page = await html(`${slug}/index.html`);
    for (const platform of ["Spotify", "Apple Music", "YouTube Music", "SoundCloud"]) assert.match(page, new RegExp(platform));
    assert.doesNotMatch(page, /[?&]si=/);
  }
});

function visibleText(markup) {
  return markup
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
}

test("renders every approved lyric file without dropping or reordering lines", async () => {
  const pairs = [
    ...Object.entries(lyricRoutes).flatMap(([release, tracks]) => Object.entries(tracks).map(([track, file]) => [`${release}/${track}/index.html`, file])),
    ...Object.entries(singleLyrics).map(([slug, file]) => [`${slug}/index.html`, file]),
  ];
  assert.equal(pairs.length, 33);
  for (const [route, file] of pairs) {
    const source = (await readFile(new URL(`../data/lyrics/${file}`, import.meta.url), "utf8")).replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trimEnd();
    const rendered = visibleText(await html(route));
    let cursor = 0;
    for (const line of source.split("\n").filter(Boolean)) {
      const position = rendered.indexOf(line, cursor);
      assert.notEqual(position, -1, `${route} is missing or reorders lyric line: ${line}`);
      cursor = position + line.length;
    }
  }
});

test("public lyric data contains only the 33 approved files", async () => {
  const lyricRoot = new URL("../data/lyrics/", import.meta.url);
  const groups = await readdir(lyricRoot);
  assert.deepEqual(groups.sort(), ["descent", "liftoff", "singles", "twohalves"]);
  const files = await Promise.all(groups.map(async (group) => (await readdir(new URL(`${group}/`, lyricRoot))).map((file) => `${group}/${file}`)));
  assert.deepEqual(files.flat().sort(), [...Object.values(singleLyrics), ...Object.values(lyricRoutes).flatMap(Object.values)].sort());
});

test("publishes exact track dates and canonical song destinations", async () => {
  assert.equal(Object.keys(trackRecords).length, 29);
  for (const [route, [releaseDate, soundCloudSlug]] of Object.entries(trackRecords)) {
    const page = await html(`${route}/index.html`);
    const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${releaseDate}T00:00:00Z`));
    assert.match(page, new RegExp(formattedDate), `${route} is missing its exact release date`);
    assert.match(page, new RegExp(`https://soundcloud.com/pepmusicuniverse/${soundCloudSlug}`), `${route} is missing its canonical SoundCloud destination`);
    if (route.startsWith("lift-off/")) {
      assert.doesNotMatch(page, /Open on YouTube/);
      assert.doesNotMatch(page, /Spotify/);
    } else {
      for (const platform of ["Spotify", "Apple Music", "YouTube Music", "SoundCloud"]) assert.match(page, new RegExp(platform));
      assert.match(page, /Open on YouTube/);
      assert.match(page, /Play .* by Pep/);
      assert.doesNotMatch(page, /youtube-nocookie\.com\/embed/);
    }
  }
});

test("uses exact public single descriptions without archive filler", async () => {
  assert.match(await html("achievement/index.html"), /Thank you G\./);
  assert.match(await html("mistakes/index.html"), /I(?:&#x27;|')ve made a lot of mistakes\. But it(?:&#x27;|')s all part of the journey\./);
  assert.match(await html("gho5t/index.html"), /Spooky SZN/);
  const fumble = await html("fumble/index.html");
  assert.doesNotMatch(fumble, /ABOUT THE RELEASE|ARCHIVE STATUS|Details in progress|Tilekid\/Sace remix/);
  for (const slug of publicSlugs) {
    const page = await html(`${slug}/index.html`);
    assert.doesNotMatch(page, /A marker on the path|Track list|Details in progress/);
  }
});

test("contains no legacy SoundCloud profile URLs", async () => {
  const pages = ["index.html", "archive/index.html", ...publicSlugs.map((slug) => `${slug}/index.html`), ...Object.keys(trackRecords).map((route) => `${route}/index.html`)];
  for (const pagePath of pages) assert.doesNotMatch(await html(pagePath), /soundcloud\.com\/joshuapepoli/);
  assert.doesNotMatch(await readFile(new URL("../data/catalog.ts", import.meta.url), "utf8"), /soundcloud\.com\/joshuapepoli/);
});

test("publishes page-specific canonicals and keeps 404s out of search", async () => {
  assert.match(await html("index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/"/);
  assert.match(await html("privacy/index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/privacy\/"/);
  assert.match(await html("terms/index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/terms\/"/);
  assert.match(await html("archive/index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/archive\/"/);
  assert.match(await html("the-descent/diamonds/index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/the-descent\/diamonds\/"/);
  const missing = await html("404.html");
  assert.doesNotMatch(missing, /rel="canonical"/);
  assert.match(missing, /name="robots" content="noindex, nofollow"/);
});

test("ships static security headers", async () => {
  const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  assert.match(headers, /Content-Security-Policy/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Permissions-Policy/);
  assert.match(headers, /frame-src https:\/\/www\.youtube-nocookie\.com/);
  assert.match(headers, /https:\/\/:preview\.pepmusic-site\.pages\.dev\/\*/);
});
