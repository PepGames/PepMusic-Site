import Link from "next/link";

type SiteHeaderProps = { compact?: boolean };

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <Link className="brand" href="/" aria-label="PepMusic home">
        <span className="brand-mark">P</span><span>PEPMUSIC</span>
      </Link>
      <nav aria-label="Main navigation">
        <a className="universe-link" href="https://pepuniverse.com" target="_blank" rel="noopener noreferrer">PepUniverse ↗</a>
        <Link href="/#music">Music</Link>
        <Link href="/#about">About</Link>
        <a className="nav-listen" href="https://soundcloud.com/joshuapepoli" target="_blank" rel="noopener noreferrer">
          SoundCloud <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
