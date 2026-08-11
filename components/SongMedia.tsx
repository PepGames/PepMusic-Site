"use client";

import { useState } from "react";
import type { YouTubeVideo } from "@/data/catalog";

type SongMediaProps = {
  video?: YouTubeVideo;
};

export function SongMedia({ video }: SongMediaProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  if (!video) return null;

  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <section className="song-video" aria-label={`${video.title} video`}>
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="song-video-facade" onClick={() => setIsPlaying(true)} aria-label={`Play ${video.title}`}>
          <span className="song-video-orbit" aria-hidden="true" />
          <span className="song-video-play" aria-hidden="true">▶</span>
          <span className="song-video-copy"><small>OFFICIAL AUDIO</small><strong>{video.title}</strong><span>Play video</span></span>
        </button>
      )}
      <a className="song-video-external" href={watchUrl} target="_blank" rel="noopener noreferrer">
        Open on YouTube <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
