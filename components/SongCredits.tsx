import type { Credit } from "@/data/catalog";

type SongCreditsProps = {
  credits?: Credit[];
  title: string;
};

export function SongCredits({ credits, title }: SongCreditsProps) {
  if (!credits?.length) return null;

  return (
    <section className="song-credits section-shell" aria-labelledby="song-credits-title">
      <div>
        <p className="eyebrow">CREDITS</p>
        <h2 className="sr-only" id="song-credits-title">Credits for {title}</h2>
      </div>
      <dl className="credit-list" aria-label={`${title} credits`}>
        {credits.map((credit) => (
          <div key={`${credit.role}-${credit.name}`}>
            <dt>{credit.role}</dt>
            <dd>{credit.name}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
