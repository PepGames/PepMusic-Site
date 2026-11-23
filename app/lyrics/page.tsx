import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ListeningLinks } from "@/components/ListeningLinks";
import { getPublicRelease, getPublicTrack } from "@/data/catalog";

export const metadata: Metadata = {
  title: "In the Margins · Lyrics | PepMusic",
  description: "Read lyrics by Pep and listen to the recordings.",
  alternates: { canonical: "/lyrics" },
};

const selections = [
  { releaseSlug: "lift-off", trackSlug: "dreams", excerpt: "I been dreamin’ for a long time" },
  { releaseSlug: "achievement", excerpt: "I’m deep like ocean" },
  { releaseSlug: "the-descent", trackSlug: "diamonds", excerpt: "Diamonds all I see" },
];

export default function SongbookPage() {
  const songs = selections.flatMap(({ releaseSlug, trackSlug, excerpt }) => {
    const release = getPublicRelease(releaseSlug);
    const song = trackSlug ? getPublicTrack(releaseSlug, trackSlug)?.track : release;
    if (!release || !song?.lyricsFile) return [];
    return [{ release, song, excerpt, href: trackSlug ? `/${releaseSlug}/${trackSlug}` : `/${releaseSlug}` }];
  });

  return (
    <main className="tl-songbook">
      <h1 className="tl-lyric-running">In the Margins</h1>
      <fieldset className="tl-songbook-choices">
        <legend className="sr-only">Choose a song</legend>
        <span className="tl-choices-title" aria-hidden="true">Songbook</span>
        {songs.map(({ release, song, excerpt, href }, index) => (
          <Fragment key={href}>
            <input className="tl-song-choice" type="radio" name="featured-song" id={`select-${song.slug}`} defaultChecked={index === 0} />
            <label htmlFor={`select-${song.slug}`}>{song.title}</label>
            <section className="tl-lyric-excerpt" data-release={release.slug} aria-label={song.title}>
              <figure>
                <blockquote cite={href}>{excerpt}</blockquote>
                <figcaption>
                  <strong>{song.title}</strong>
                  <span>{release.kind === "single" ? "Single" : release.title}, {release.year}</span>
                </figcaption>
                <ListeningLinks destinations={song.platforms ?? []} title={song.title} className="tl-listen" />
                <Link className="tl-full-link" href={href}>Full lyrics</Link>
              </figure>
              {release.artwork && <div className="tl-excerpt-art"><img src={release.artwork} alt={release.artworkAlt ?? `${release.title} cover`} /></div>}
            </section>
          </Fragment>
        ))}
      </fieldset>
    </main>
  );
}
