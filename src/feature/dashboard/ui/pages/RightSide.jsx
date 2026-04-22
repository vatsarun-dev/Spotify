import React from "react";
import { useSelector } from "react-redux";

const fallbackSong = {
  title: "Choose a song",
  artist: "Your music will appear here",
  album: "Now Playing",
  thumbnail: "",
};

const RightSide = () => {
  const currentPlayingSong = useSelector(
    (store) => store.player.currentPlayingSong,
  );
  const { title, artist, album, thumbnail } = currentPlayingSong ?? fallbackSong;

  return (
    <div className="text-white">
      <h2 className="mb-4 text-lg font-bold">{album}</h2>
      <div className="overflow-hidden rounded-xl bg-[#181818]">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-[#232323] text-white/40">
            No song selected
          </div>
        )}

        <div className="p-4">
          <p className="truncate text-xl font-bold">{title}</p>
          <p className="truncate text-sm text-[#b3b3b3]">{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
