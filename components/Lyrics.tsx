import { lyricStanzas } from "@/data/lyrics";

type LyricsProps = {
  lyrics: string;
  title: string;
  headingLevel?: "h2" | "h1";
};

export function Lyrics({ lyrics, title, headingLevel = "h2" }: LyricsProps) {
  const Heading = headingLevel;
  return (
    <section className="lyrics-section section-shell" aria-labelledby="lyrics-title">
      <header className="lyrics-heading">
        <p className="eyebrow">OFFICIAL LYRICS</p>
        <Heading id="lyrics-title">{title}</Heading>
      </header>
      <div className="lyrics-copy">
        {lyricStanzas(lyrics).map((lines, stanzaIndex) => (
          <p key={`${stanzaIndex}-${lines[0] ?? "blank"}`}>
            {lines.map((line, lineIndex) => (
              <span key={`${lineIndex}-${line}`}>
                {line}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
