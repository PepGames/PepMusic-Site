# PepMusic Site

The static, data-driven official site for PepMusic and the music of Pep.

## Local development

- `npm install`
- `npm run dev`
- `npm test`

The release catalog lives in `data/catalog.ts`. Only entries with `visibility: "public"` generate pages. Approved public lyric files live in `data/lyrics`; album-track lyric pages are generated only when a public track has a `lyricsFile`. Unreleased lyrics must remain in the private infrastructure repository.

SoundCloud research timestamps are stored as `publishedAt` and are intentionally separate from confirmed `releaseDate` values. Artist and release destinations use stable platform URLs without optional sharing parameters.

Production deployment, DNS, and the PepUniverse Cloudflare Worker are intentionally managed separately.
