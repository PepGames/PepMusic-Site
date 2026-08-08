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

async function html(path) {
  return readFile(new URL(path, root), "utf8");
}

test("exports every approved release and legal route", async () => {
  await Promise.all(publicSlugs.map((slug) => access(new URL(`${slug}/index.html`, root))));
  await access(new URL("privacy/index.html", root));
  await access(new URL("terms/index.html", root));
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
  for (const destination of ["open.spotify.com/artist/", "music.apple.com/us/artist/", "music.youtube.com/channel/", "soundcloud.com/joshuapepoli"]) {
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

test("publishing timestamps are labeled separately from release dates", async () => {
  const page = await html("achievement/index.html");
  assert.match(page, /Published to SoundCloud/);
  assert.match(page, /not a separately confirmed commercial release date/);
});

test("publishes page-specific canonicals and keeps 404s out of search", async () => {
  assert.match(await html("index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/"/);
  assert.match(await html("privacy/index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/privacy\/"/);
  assert.match(await html("terms/index.html"), /rel="canonical" href="https:\/\/music\.pepuniverse\.com\/terms\/"/);
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
  assert.match(headers, /https:\/\/:preview\.pepmusic-site\.pages\.dev\/\*/);
});
