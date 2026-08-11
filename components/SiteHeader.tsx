import Link from "next/link";

type SiteHeaderProps = { compact?: boolean };

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${compact ? " site-header-compact" : ""}`}>
      <Link className="brand" href="/" aria-label="PepMusic home">
        <span className="record-mark" aria-hidden="true"><span /></span><span>PEPMUSIC</span>
      </Link>
      <nav aria-label="Main navigation">
        <a className="universe-link" href="https://pepuniverse.com" target="_blank" rel="noopener noreferrer">PepUniverse ↗</a>
        <Link href="/#music">Music</Link>
        <Link className="nav-listen" href="/#find-pep">Find Pep</Link>
      </nav>
    </header>
  );
}
