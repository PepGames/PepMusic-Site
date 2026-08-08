const projects = [
  {
    title: "Growth",
    type: "Album",
    year: "2026",
    image: "/assets/releases/growth/cover.webp",
    className: "release-growth",
    status: "Coming soon",
  },
  {
    title: "Two Halves and Two Paths",
    type: "EP",
    year: "2018",
    image: "/assets/releases/two-halves-and-two-paths/cover.webp",
    className: "release-halves",
    status: "Archive",
  },
  {
    title: "The Descent",
    type: "Album",
    year: "2017",
    image: "/assets/releases/the-descent/cover.webp",
    className: "release-descent",
    status: "Archive",
  },
  {
    title: "Lift Off",
    type: "Album",
    year: "2016",
    image: "/assets/releases/lift-off/cover.webp",
    className: "release-lift",
    status: "Archive",
  },
];

const singles = [
  {
    title: "Achievement",
    image: "/assets/releases/achievement/cover.webp",
  },
  {
    title: "Mistakes",
    image: "/assets/releases/mistakes/cover.webp",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PepMusic home">
          <span className="brand-mark">P</span>
          <span>PEPMUSIC</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#music">Music</a>
          <a href="#about">About</a>
          <a
            className="nav-listen"
            href="https://soundcloud.com/joshuapepoli"
            target="_blank"
            rel="noreferrer"
          >
            SoundCloud <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="growth-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">A NEW ALBUM BY PEP</p>
          <h1 id="growth-title">GROWTH</h1>
          <p className="hero-intro">
            A new chapter takes root in 2026. The official release date and
            listening links are coming soon.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#music">
              Explore the music
            </a>
            <a
              className="button button-quiet"
              href="https://soundcloud.com/joshuapepoli"
              target="_blank"
              rel="noreferrer"
            >
              Hear the archive <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl className="release-facts">
            <div>
              <dt>Artist</dt>
              <dd>Pep</dd>
            </div>
            <div>
              <dt>Release</dt>
              <dd>2026</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Album</dd>
            </div>
          </dl>
        </div>

        <div className="hero-art-wrap">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <figure className="hero-art">
            <img
              src="/assets/releases/growth/cover.webp"
              alt="Growth album artwork: a vivid green tree standing in a snowy blue forest"
            />
            <figcaption>
              <span>PEP</span>
              <span>2026</span>
            </figcaption>
          </figure>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span /> Scroll to the roots
        </div>
      </section>

      <section className="manifesto" aria-label="PepMusic introduction">
        <p>INDEPENDENT MUSIC</p>
        <p>PENNSYLVANIA</p>
        <p>EST. 2016</p>
      </section>

      <section className="catalog section-shell" id="music">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE CATALOG</p>
            <h2>From lift off<br />to growth.</h2>
          </div>
          <p>
            Four projects tracing movement, duality, descent, and renewal.
            Official platform links are being rebuilt for the next era of Pep.
          </p>
        </div>

        <div className="release-grid">
          {projects.map((project, index) => (
            <article className={`release-card ${project.className}`} key={project.title}>
              <div className="release-number">0{index + 1}</div>
              <div className="release-image">
                <img src={project.image} alt={`${project.title} cover artwork`} />
              </div>
              <div className="release-meta">
                <div>
                  <p>{project.type} · {project.year}</p>
                  <h3>{project.title}</h3>
                </div>
                <span>{project.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="singles section-shell" aria-labelledby="singles-title">
        <div className="singles-copy">
          <p className="eyebrow">BETWEEN THE CHAPTERS</p>
          <h2 id="singles-title">Selected singles</h2>
          <p>
            More releases, lyrics, and stories from the archive will arrive as
            the official PepMusic catalog comes online.
          </p>
        </div>
        <div className="single-covers">
          {singles.map((single) => (
            <figure key={single.title}>
              <img src={single.image} alt={`${single.title} single cover artwork`} />
              <figcaption>{single.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-symbol" aria-hidden="true">
          <span className="trunk" />
          <span className="branch branch-one" />
          <span className="branch branch-two" />
          <span className="branch branch-three" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT PEP</p>
          <h2>Every project is a marker on the path.</h2>
          <p>
            Pep is an independent artist from Pennsylvania. Since 2016, each
            release has captured a different point in an evolving story—looking
            outward, falling inward, choosing between paths, and finding what
            still grows through the cold.
          </p>
          <p>
            Growth begins the next chapter. This site will become the official
            home for new music, the full archive, lyrics, and the stories behind
            the songs.
          </p>
        </div>
      </section>

      <section className="cta section-shell">
        <p className="eyebrow">THE NEXT CHAPTER</p>
        <h2>Growth is coming in 2026.</h2>
        <p>Official release news and listening destinations will be added here.</p>
        <a
          className="button button-primary"
          href="https://soundcloud.com/joshuapepoli"
          target="_blank"
          rel="noreferrer"
        >
          Follow Pep on SoundCloud <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">P</span>
          <span>PEPMUSIC</span>
        </a>
        <p>Part of the PepUniverse network.</p>
        <p>© 2026 Pep. All rights reserved.</p>
      </footer>
    </main>
  );
}
