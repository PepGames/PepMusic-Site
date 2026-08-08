# PepMusic Site

The static, data-driven official site for PepMusic and the music of Pep.

## Local development

- `npm install`
- `npm run dev`
- `npm test`

The release catalog lives in `data/catalog.ts`. Only entries with `visibility: "public"` generate pages. SoundCloud research timestamps are stored as `publishedAt` and are intentionally separate from confirmed `releaseDate` values.

Production deployment, DNS, and the PepUniverse Cloudflare Worker are intentionally managed separately.
