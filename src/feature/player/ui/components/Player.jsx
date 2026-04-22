import React from "react";
// `usePlayer` is exported as default from usePlayer.jsx, so the import must
// not use curly braces here.
import "remixicon/fonts/remixicon.css";
import usePlayer from "../../hook/usePlayer";

const formatTime = (time) => {
  if (!time || Number.isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Player = () => {
  const {
    currentPlayingSong,
    isPlaying,
    currentTime,
    duration,
    progress,
    currentIndex,
    songList,
    togglePlayAndPause,
    goToNextSong,
    goToPrevSong,
  } = usePlayer();

  const thumbnail = currentPlayingSong?.thumbnail;
  const title = currentPlayingSong?.title || "Choose a song";
  const artist = currentPlayingSong?.artist || "Your music will appear here";

  return (
    <footer className="border-t border-white/10 bg-black px-4 py-3 text-white">
      <div className="flex min-h-[88px] flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#1a1a1a]">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/35">
                <i className="ri-music-2-line text-xl"></i>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium">{title}</p>
            <p className="truncate text-sm text-[#b3b3b3]">{artist}</p>
          </div>

          <button
            type="button"
            aria-label="Add to your library"
            className="ml-2 shrink-0 text-[#b3b3b3] transition hover:text-white"
          >
            <i className="ri-add-circle-line text-[22px]"></i>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-5 text-[#b3b3b3]">
            <button
              type="button"
              aria-label="Enable shuffle"
              className="transition hover:text-white"
            >
              <i className="ri-shuffle-line text-xl"></i>
            </button>
            <button
              type="button"
              aria-label="Previous track"
              onClick={goToPrevSong}
              className="transition hover:text-white"
              disabled={!currentPlayingSong}
            >
              <i className="ri-skip-back-fill text-2xl"></i>
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlayAndPause}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!currentPlayingSong}
            >
              <i
                className={`${isPlaying ? "ri-pause-fill" : "ri-play-fill"} text-2xl`}
              ></i>
            </button>
            <button
              type="button"
              aria-label="Next track"
              onClick={goToNextSong}
              className="transition hover:text-white"
              disabled={!currentPlayingSong || currentIndex >= songList.length - 1}
            >
              <i className="ri-skip-forward-fill text-2xl"></i>
            </button>
            <button
              type="button"
              aria-label="Enable repeat"
              className="transition hover:text-white"
            >
              <i className="ri-repeat-line text-xl"></i>
            </button>
          </div>

          <div className="flex w-full max-w-[620px] items-center gap-2 text-xs text-[#b3b3b3]">
            <span className="w-10 text-right tabular-nums">
              {formatTime(currentTime)}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="w-10 tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 text-[#b3b3b3]">
          <button
            type="button"
            aria-label="Now playing view"
            className="hidden transition hover:text-white md:block"
          >
            <i className="ri-mic-line text-xl"></i>
          </button>
          <button
            type="button"
            aria-label="Queue"
            className="hidden transition hover:text-white md:block"
          >
            <i className="ri-play-list-2-line text-xl"></i>
          </button>
          <button
            type="button"
            aria-label="Devices"
            className="hidden transition hover:text-white sm:block"
          >
            <i className="ri-speaker-line text-xl"></i>
          </button>
          <button
            type="button"
            aria-label="Volume"
            className="transition hover:text-white"
          >
            <i className="ri-volume-up-line text-xl"></i>
          </button>
          <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-white/20 sm:block">
            <div className="h-full w-[72%] rounded-full bg-white" />
          </div>
          <button
            type="button"
            aria-label="Mini player"
            className="hidden transition hover:text-white md:block"
          >
            <i className="ri-picture-in-picture-2-line text-xl"></i>
          </button>
          <button
            type="button"
            aria-label="Full screen"
            className="hidden transition hover:text-white md:block"
          >
            <i className="ri-fullscreen-line text-xl"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Player;
