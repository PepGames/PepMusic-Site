import type { Metadata } from "next";
import Link from "next/link";
import { NetworkFooter } from "@/components/NetworkFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatKind, publicProjects, publicSingles } from "@/data/catalog";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const growth = publicProjects.find((project) => project.slug === "growth")!;

  return (
    <main>
      <SiteHeader />
      <section className="hero" id="top" aria-labelledby="growth-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">A NEW ALBUM BY PEP</p>
          <h1 id="growth-title">GROWTH</h1>
          <p className="hero-intro">{growth.summary} The official release date and listening links are coming soon.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/growth">Enter the Growth page</Link>
            <a className="button button-quiet" href="https://soundcloud.com/joshuapepoli" target="_blank" rel="noopener noreferrer">
              Hear the archive <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl className="release-facts">
            <div><dt>Artist</dt><dd>{growth.artist}</dd></div>
            <div><dt>Release</dt><dd>{growth.year}</dd></div>
            <div><dt>Format</dt><dd>{formatKind(growth.kind)}</dd></div>
          </dl>
        </div>
        <div className="hero-art-wrap">
          <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
          <Link className="hero-art-link" href="/growth" aria-label="Explore Growth">
            <figure className="hero-art">
              <img src={growth.artwork} alt={growth.artworkAlt} />
              <figcaption><span>PEP</span><span>{growth.year}</span></figcaption>
            </figure>
          </Link>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /> Scroll to the roots</div>
      </section>

      <section className="manifesto" aria-label="PepMusic introduction">
        <p>INDEPENDENT MUSIC</p><p>PENNSYLVANIA</p><p>EST. 2016</p>
      </section>

      <section className="catalog section-shell" id="music">
        <div className="section-heading">
          <div><p className="eyebrow">THE CATALOG</p><h2>From lift off<br />to growth.</h2></div>
          <p>Four projects tracing movement, duality, descent, and renewal. Each project now has a permanent home for its story and listening destinations.</p>
        </div>
        <div className="release-grid">
          {publicProjects.map((project, index) => (
            <Link className={`release-card release-${project.theme}`} href={`/${project.slug}`} key={project.slug}>
              <article>
                <div className="release-number">0{index + 1}</div>
                <div className="release-image"><img src={project.artwork} alt={project.artworkAlt} /></div>
                <div className="release-meta">
                  <div><p>{formatKind(project.kind)} · {project.year}</p><h3>{project.title}</h3></div>
                  <span>{project.status === "upcoming" ? "Coming soon" : "Archive"} →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="singles section-shell" aria-labelledby="singles-title">
        <div className="singles-copy">
          <p className="eyebrow">BETWEEN THE CHAPTERS</p><h2 id="singles-title">Selected singles</h2>
          <p>Selected releases from the archive, with more tracks held for review as the official catalog is rebuilt.</p>
        </div>
        <div className="single-covers">
          {publicSingles.map((single) => (
            <Link href={`/${single.slug}`} key={single.slug}>
              <figure><img src={single.artwork} alt={single.artworkAlt} /><figcaption>{single.title} →</figcaption></figure>
            </Link>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-symbol" aria-hidden="true">
          <span className="trunk" /><span className="branch branch-one" /><span className="branch branch-two" /><span className="branch branch-three" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT PEP</p><h2>Every project is a marker on the path.</h2>
          <p>Pep is an independent artist from Pennsylvania. Since 2016, each release has captured a different point in an evolving story—looking outward, falling inward, choosing between paths, and finding what still grows through the cold.</p>
          <p>Growth begins the next chapter. PepMusic is the official home for new music, the archive, lyrics, and the stories behind the songs.</p>
        </div>
      </section>

      <section className="cta section-shell">
        <p className="eyebrow">THE NEXT CHAPTER</p><h2>Growth is coming in 2026.</h2>
        <p>Visit the album page for its story and future listening destinations.</p>
        <Link className="button button-primary" href="/growth">Explore Growth</Link>
      </section>
      <NetworkFooter />
    </main>
  );
}
