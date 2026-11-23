import type { Metadata } from "next";
import Link from "next/link";
import { ListeningLinks } from "@/components/ListeningLinks";
import { formatKind, publicCatalog } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Music Archive | PepMusic",
  description: "Explore Pep's albums, mixtapes, EPs, and singles across Spotify, Apple Music, YouTube Music, and SoundCloud.",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Music Archive | PepMusic",
    description: "The official archive of music released by Pep.",
    url: "/archive",
  },
};

const captions: Record<number, string> = {
  2017: "Pep released Lift Off in May and The Descent on Christmas Eve.",
  2018: "Six songs on Two Halves and Two Paths, released June 27.",
  2022: "Four singles, from Mistakes! in May to GHO5T in October.",
};
const monthDay = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const years = [...new Set(publicCatalog.map((release) => release.year))].sort((a, b) => a - b);

export default function ArchivePage() {
  return (
    <main className="tl-archive">
      <h1 className="tl-archive-name">Through the years</h1>
      <div className="tl-eras">
        {years.map((year) => {
          const releases = publicCatalog.filter((release) => release.year === year)
            .sort((a, b) => (a.releaseDate ?? "9999").localeCompare(b.releaseDate ?? "9999"));
          const first = releases[0];
          const upcoming = releases.every((release) => release.status === "upcoming");
          const caption = captions[year] ?? (upcoming ? `${first.title}, the upcoming ${formatKind(first.kind).toLowerCase()}.` : first.summary);
          return (
            <section className="tl-era" id={String(year)} key={year} aria-labelledby={`year-${year}`} tabIndex={-1}>
              <nav className="tl-year-nav" aria-label="Browse releases by year">
                {years.map((option) => <a key={option} href={`#${option}`} aria-current={option === year ? "true" : undefined}>{option}</a>)}
              </nav>
              <div className="tl-landscape">
                <div className="tl-year-copy"><h2 id={`year-${year}`}>{year}</h2><p>{caption}</p></div>
                <Link className="tl-art-link" href={`/${first.slug}`} aria-label={`Explore ${first.title}`}>
                  <img src={first.artwork} alt={first.artworkAlt} width="520" height="520" loading={year === years[0] ? "eager" : "lazy"} />
                </Link>
              </div>
              <div className="tl-year-list">
                <h3>{upcoming ? "Upcoming" : "The releases"}</h3>
                <ul>{releases.map((release) => (
                  <li key={release.slug}>
                    <Link className="tl-jacket-title" href={`/${release.slug}`}>
                      <img src={release.artwork} alt="" width="64" height="64" />{release.title}
                    </Link>
                    <span className="tl-record-meta">{formatKind(release.kind)} · {release.releaseDate ? monthDay.format(new Date(release.releaseDate + "T00:00:00Z")) : "Upcoming"}</span>
                    <ListeningLinks destinations={release.platforms} title={release.title} className="tl-platforms" />
                  </li>
                ))}</ul>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
