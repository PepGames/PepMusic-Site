import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | PepMusic",
  description: "The requested page is not part of the public PepMusic catalog.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <main><section className="not-found section-shell"><p className="eyebrow">404</p><h1>That path has not taken root.</h1><p>The release or page you requested is not part of the public PepMusic catalog.</p><Link className="button button-primary" href="/">Return to PepMusic</Link></section></main>;
}
