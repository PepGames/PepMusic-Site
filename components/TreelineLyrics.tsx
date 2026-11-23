import Link from "next/link";
import { notFound } from "next/navigation";
import { ListeningLinks } from "@/components/ListeningLinks";
import { Lyrics } from "@/components/Lyrics";
import { SongCredits } from "@/components/SongCredits";
import { SongMedia } from "@/components/SongMedia";
import { getReleaseNeighbors, getTrackNeighbors, type CatalogItem, type Track } from "@/data/catalog";
import { readLyrics } from "@/data/lyrics";

type ReaderProps = { release: CatalogItem; track?: Track };

export default function TreelineLyrics({ release, track }: ReaderProps) {
  const song = track ?? release;
  if (release.visibility !== "public" || !song.lyricsFile) notFound();
  const albumHref = track ? `/${release.slug}` : `/archive/#${release.year}`;
  const backLabel = track ? release.title : `${release.year} releases`;
  const neighbors = track ? getTrackNeighbors(release.slug, track.slug) : getReleaseNeighbors(release.slug);
  const neighborRoot = track ? `/${release.slug}/` : "/";
  const date = song.releaseDate && new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" })
    .format(new Date(`${song.releaseDate}T00:00:00Z`));

  return (
    <main className="tl-lyric-reader" data-release={release.slug}>
      <div className="tl-lyric-running"><Link href="/lyrics">In the Margins</Link></div>
      <article className="tl-reading" aria-labelledby="track-title">
        <header className="tl-reading-info">
          {release.artwork && <img className="tl-reader-cover" src={release.artwork} width="240" height="240" alt={release.artworkAlt ?? `${release.title} cover`} />}
          <p className="tl-reader-origin"><Link href={albumHref}>{track ? release.title : "Single"}</Link> <span>{release.year}</span></p>
          <h1 id="track-title">{song.title}</h1>
          {track?.featuredArtists?.length ? <p className="tl-featuring">Featuring {track.featuredArtists.join(", ")}</p> : null}
          <ListeningLinks title={song.title} destinations={song.platforms ?? []} className="tl-listen" />
          <details className="tl-record-info">
            <summary>Recording details</summary>
            <p>{release.artist}{date && <> · <time dateTime={song.releaseDate}>{date}</time></>}</p>
            {song.description && <p>{song.description}</p>}
            {song.credits?.length ? <a href="#song-credits-title">Song credits</a> : null}
          </details>
        </header>
        <div className="tl-reading-text">
          <Lyrics lyrics={readLyrics(song.lyricsFile)} title={`${song.title} lyrics`} />
          <SongCredits credits={song.credits} title={song.title} />
          <SongMedia video={song.video} />
        </div>
      </article>
      <nav className="tl-reader-nav" aria-label={track ? `${release.title} track navigation` : "Catalog navigation"}>
        <Link href={albumHref}>{backLabel}</Link>
        {neighbors.previous && <Link href={neighborRoot + neighbors.previous.slug}>← {neighbors.previous.title}</Link>}
        {neighbors.next && <Link href={neighborRoot + neighbors.next.slug}>{neighbors.next.title} →</Link>}
        <a href="#track-title">Back to top</a>
      </nav>
    </main>
  );
}
