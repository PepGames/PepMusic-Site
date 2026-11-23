import type { PlatformDestination } from "@/data/catalog";

type Props = {
  destinations: PlatformDestination[];
  title: string;
  className?: string;
};

export function ListeningLinks({ destinations, title, className }: Props) {
  const live = destinations.filter(({ status, url }) => status === "live" && url);
  if (!live.length) return null;
  return (
    <div className={["listening-links", className].filter(Boolean).join(" ")} role="group" aria-label={`Listen to ${title}`}>
      {live.map(({ platform, url }) => (
        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${title} on ${platform}`}>
          {platform}
        </a>
      ))}
    </div>
  );
}
