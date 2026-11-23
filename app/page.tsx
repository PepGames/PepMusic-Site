import type { Metadata } from "next";
import Link from "next/link";
import { AlbumNotes } from "@/components/AlbumNotes";
import { ListeningLinks } from "@/components/ListeningLinks";
import { artistProfiles, publicCatalog, publicProjects } from "@/data/catalog";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const growth = publicProjects.find(release => release.slug === "growth")!;
  const featured = publicProjects.find(release => release.slug === "two-halves-and-two-paths")!;
  const growthHref = "/" + growth.slug;
  const status = growth.status === "upcoming" ? "Upcoming album" : "Album";
  return (
    <main className="treeline-home" id="top">
      <section className="landscape" aria-labelledby="artist-title">
        <div className="forest" aria-hidden="true"><img src={growth.artwork} alt="" fetchPriority="high" /></div>
        <div className="artist"><h1 id="artist-title"><span className="by">Music by</span><span className="signature">Pep</span></h1></div>
        <AlbumNotes title={growth.title} href={growthHref} status={status}>
          <div className="jacket"><img src={growth.artwork} alt={growth.artworkAlt} /></div>
          <div className="notes">
            <p>{status} by {growth.artist}</p>
            <h2 id="album-name">{growth.title}</h2>
            <h3>Track list</h3>
            <ol>{growth.tracks?.map(track => (
              <li key={track.slug}>{track.title}{track.featuredArtists?.length ? <small>feat. {track.featuredArtists.join(", ")}</small> : null}</li>
            ))}</ol>
            <Link href={growthHref}>Full album notes <span aria-hidden="true">↗</span></Link>
          </div>
        </AlbumNotes>
      </section>
      <section className="listening" aria-labelledby="listen-title">
        <Link className="record" href={"/" + featured.slug} aria-label={"Explore " + featured.title + " in the archive"}>
          <img src={featured.artwork} alt="" width={66} height={66} />
          <div><p>Featured EP</p><h2 id="listen-title">{featured.title}</h2></div>
        </Link>
        <ListeningLinks destinations={featured.platforms} title={featured.title} />
      </section>
      <section className="home-library" id="music" aria-labelledby="library-title">
        <h2 id="library-title"><Link href="/archive">Release archive</Link></h2>
        <nav aria-labelledby="library-title">{publicCatalog.map(release => (
          <Link href={"/" + release.slug} key={release.slug}>{release.title}</Link>
        ))}</nav>
      </section>
      <section className="home-profiles" id="find-pep" aria-labelledby="find-pep-title">
        <h2 id="find-pep-title">Find Pep</h2>
        <nav aria-label="Artist profiles">{artistProfiles.filter(link => link.status === "live" && link.url).map(link => (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer">{link.platform}</a>
        ))}</nav>
      </section>
    </main>
  );
}
