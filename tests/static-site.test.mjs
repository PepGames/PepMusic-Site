import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../out/", import.meta.url);
const publicSlugs = ["growth", "lift-off", "the-descent", "two-halves-and-two-paths", "achievement", "mistakes"];
const hiddenSlugs = ["gh05t", "work", "my-crew", "fumble-remix"];

async function html(path) {
  return readFile(new URL(path, root), "utf8");
}

test("exports every approved release and legal route", async () => {
  await Promise.all(publicSlugs.map((slug) => access(new URL(`${slug}/index.html`, root))));
  await access(new URL("privacy/index.html", root));
  await access(new URL("terms/index.html", root));
  await access(new URL("404.html", root));
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
  for (const platform of ["Spotify", "Apple Music", "YouTube Music", "SoundCloud", "Bandcamp"]) {
    assert.match(page, new RegExp(platform));
  }
  assert.match(page, /aria-disabled="true"/);
  assert.match(page, /Coming soon/);
  assert.doesNotMatch(page, /href="[^"]*spotify/i);
});

test("publishing timestamps are labeled separately from release dates", async () => {
  const page = await html("achievement/index.html");
  assert.match(page, /Published to SoundCloud/);
  assert.match(page, /not a separately confirmed commercial release date/);
});

test("ships static security headers", async () => {
  const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
  assert.match(headers, /Content-Security-Policy/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Permissions-Policy/);
});
