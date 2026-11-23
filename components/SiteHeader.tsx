"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({ projectSlugs, singleSlugs }: { projectSlugs: string[]; singleSlugs: string[] }) {
  const path = usePathname();
  const [section, track] = path.split("/").filter(Boolean);
  const lyrics = section === "lyrics" || singleSlugs.includes(section) || (projectSlugs.includes(section) && Boolean(track));
  const archive = section === "archive" || (projectSlugs.includes(section) && !track);
  return (
    <header className="masthead">
      <Link className="brand" href="/" aria-current={!section ? "page" : undefined}>PepMusic</Link>
      <nav aria-label="Music navigation">
        <Link href="/archive" aria-current={archive ? (section === "archive" ? "page" : "location") : undefined}>Archive</Link>
        <Link href="/lyrics" aria-current={lyrics ? (section === "lyrics" ? "page" : "location") : undefined}>Lyrics</Link>
      </nav>
    </header>
  );
}
