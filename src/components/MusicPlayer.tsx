import { useState, useRef, useEffect, useCallback } from "react";
import { MdPlayArrow, MdPause, MdSkipPrevious, MdSkipNext } from "react-icons/md";
import "./styles/MusicPlayer.css";

/**
 * Drop your audio file at public/audio/song.mp3 (or change SRC below to
 * match your filename). Also swap COVER_IMAGE for the song's cover art /
 * a photo you want blurred behind the player.
 */
const SRC = "/audio/song.mp3";
const COVER_IMAGE = "/images/hobbies/music-cover.jpg";
const TRACK_TITLE = "Multo";
const TRACK_ARTIST = "Cup of Joe";

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [isPlaying]);

  const seekBy = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(0, audio.currentTime + delta),
      duration || audio.duration || 0
    );
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMeta = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Autoplay when this card scrolls into view, pause when it scrolls out.
  // Note: browsers block autoplay-with-sound until the user has interacted
  // with the page at least once (e.g. clicked a nav link) — if that hasn't
  // happened yet, play() will silently fail here, which is expected.
  useEffect(() => {
    const el = containerRef.current;
    const audio = audioRef.current;
    if (!el || !audio) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audio.play().catch(() => {
            // Autoplay blocked by browser — user can press play manually.
          });
        } else {
          audio.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const progress = duration ? currentTime / duration : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="music-player" ref={containerRef}>
      <div
        className="music-player-bg"
        style={{ backgroundImage: `url(${COVER_IMAGE})` }}
        onError={() => {}}
      />
      <div className="music-player-tint" />

      <div className="music-player-content">
        <div className="music-track-info">
          <span className="music-track-title">{TRACK_TITLE}</span>
          <span className="music-track-artist">{TRACK_ARTIST}</span>
        </div>

        <div className="music-dial">
          <svg viewBox="0 0 200 200" className="music-ring">
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              className="music-ring-track"
              fill="none"
              strokeWidth="4"
            />
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              className="music-ring-progress"
              fill="none"
              strokeWidth="4"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="music-controls">
            <button
              className="music-side-btn"
              onClick={() => seekBy(-10)}
              aria-label="Back 10 seconds"
              data-cursor="disable"
            >
              <MdSkipPrevious />
            </button>

            <button
              className="music-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              data-cursor="disable"
            >
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>

            <button
              className="music-side-btn"
              onClick={() => seekBy(10)}
              aria-label="Forward 10 seconds"
              data-cursor="disable"
            >
              <MdSkipNext />
            </button>
          </div>
        </div>

        <div className="music-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <audio ref={audioRef} src={SRC} preload="metadata" />
    </div>
  );
};

export default MusicPlayer;
