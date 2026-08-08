import { readFileSync } from "node:fs";
import { join, normalize, sep } from "node:path";

const lyricsRoot = join(process.cwd(), "data", "lyrics");

export function readLyrics(relativePath: string) {
  const fullPath = normalize(join(lyricsRoot, relativePath));
  if (!fullPath.startsWith(`${lyricsRoot}${sep}`)) {
    throw new Error(`Invalid lyric path: ${relativePath}`);
  }
  return readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trimEnd();
}

export function lyricStanzas(lyrics: string) {
  return lyrics.split(/\n{2,}/).map((stanza) => stanza.split("\n"));
}
