import React from "react";
import "remixicon/fonts/remixicon.css";
import useDashboard from "../../hook/useDashboard";
import { playNewSong } from "../../../player/state/musicPlayer";

const SongCard = ({ song, songs, index }) => {
  const { dispatch } = useDashboard();
  if (!song) return null;

  const { title, artist, album, year, thumbnail } = song;

  return (
    <div className="group w-full rounded-xl bg-[#181818] p-4 text-white transition-all duration-300 hover:bg-[#242424]">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          className="aspect-square w-full object-cover"
          src={thumbnail}
          alt={title}
        />

        <button
          // Pass the full list and clicked index so the player can support
          // next/previous navigation from the same queue.
          onClick={() => dispatch(playNewSong({ songs, index }))}
          className="absolute bottom-3 right-3 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          type="button"
          aria-label={`Play ${title}`}
        >
          <i className="ri-play-fill text-2xl"></i>
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="truncate text-base font-bold">{title}</h3>
        <p className="truncate text-sm text-[#b3b3b3]">{artist}</p>
        <p className="line-clamp-2 min-h-10 text-xs leading-5 text-[#8a8a8a]">
          {album}
        </p>
        <p className="text-xs font-medium text-[#1ed760]">
          {year || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
