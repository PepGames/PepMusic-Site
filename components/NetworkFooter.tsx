import Link from "next/link";

export function NetworkFooter() {
  return (
    <footer>
      <Link className="brand footer-brand" href="/" aria-label="PepMusic home">
        <span className="brand-mark">P</span><span>PEPMUSIC</span>
      </Link>
      <nav className="network-links" aria-label="PepUniverse network">
        <a href="https://pepuniverse.com" target="_blank" rel="noopener noreferrer">PepUniverse ↗</a>
        <a href="https://music.pepuniverse.com" aria-current="page">PepMusic</a>
        <a href="https://games.pepuniverse.com" target="_blank" rel="noopener noreferrer">PepGames ↗</a>
        <span aria-label="PepMedia, coming later">PepMedia · Coming later</span>
      </nav>
      <nav className="legal-links" aria-label="Legal">
        <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link>
      </nav>
      <p>© 2026 Pep. All rights reserved.</p>
    </footer>
  );
}
