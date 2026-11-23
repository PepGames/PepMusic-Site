import Link from "next/link";
import { ListeningLinks } from "@/components/ListeningLinks";
import { SongMedia } from "@/components/SongMedia";
import { formatKind, getReleaseNeighbors, type CatalogItem } from "@/data/catalog";

const fullDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default function TreelineRelease({ release }: { release: CatalogItem }) {
  const { previous, next } = getReleaseNeighbors(release.slug);
  const pending = release.platforms.filter((item) => item.status === "coming-soon");
  const format = formatKind(release.kind);
  const date = release.releaseDate ? fullDate.format(new Date(release.releaseDate + "T00:00:00Z")) : release.year;
  const archiveUrl = `/archive/#${release.year}`;
  return (
    <main className="tl-release" data-release={release.slug}>
      <Link className="tl-year-return" href={archiveUrl}>← {release.year} releases</Link>
      <div className="tl-release-spread">
        <header className="tl-record">
          <p className="tl-record-meta">{release.status === "upcoming" ? `Upcoming ${format.toLowerCase()}` : format} · {date}</p>
          <h1>{release.title}</h1>
          <img className="tl-record-cover" src={release.artwork} alt={release.artworkAlt} width="520" height="520" />
          <ListeningLinks destinations={release.platforms} title={release.title} className="tl-platforms" />
          {pending.length > 0 && <div className="tl-pending">
            <p>Listening links coming soon</p>
            {pending.map((item) => <span key={item.platform} aria-disabled="true">{item.platform} <small>Coming soon</small></span>)}
          </div>}
        </header>

        <section className="tl-tracks" aria-labelledby="tracks-title">
          <h2 id="tracks-title">Track list</h2>
          <ol>{release.tracks?.map((track) => (
            <li key={track.slug}>
              {track.lyricsFile ? (
                <Link className="tl-song" href={`/${release.slug}/${track.slug}`}>
                  <span>{track.title}{track.featuredArtists?.length ? <small>Featuring {track.featuredArtists.join(", ")}</small> : null}</span>
                  <span className="tl-track-action">Lyrics</span>
                </Link>
              ) : (
                <div className="tl-song">
                  <span>{track.title}{track.featuredArtists?.length ? <small>Featuring {track.featuredArtists.join(", ")}</small> : null}</span>
                  {track.platforms?.length ? <ListeningLinks destinations={track.platforms} title={track.title} className="tl-platforms" /> : track.duration ? <small>{track.duration}</small> : null}
                </div>
              )}
            </li>
          ))}</ol>
        </section>
      </div>

      <section className="tl-release-notes" aria-labelledby="notes-title">
        <h2 id="notes-title">About {release.title}</h2>
        <p>{release.description ?? release.summary}</p>
        {release.story?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <p>{release.artist} · {date} · {format}</p>
        <SongMedia video={release.video} />
      </section>
      <nav className="tl-catalog-nav" aria-label="Catalog navigation">
        {previous && <Link href={`/${previous.slug}`}>← {previous.title}</Link>}
        {next ? <Link href={`/${next.slug}`}>{next.title} →</Link> : <Link href="/archive/">All releases →</Link>}
      </nav>
    </main>
  );
}
