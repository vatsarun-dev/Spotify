import React from "react";
import { allSongs } from "../../api/songsApi";
import SongCard from "../components/SongCard";

const HomePage = () => {
  const songs = allSongs();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {songs.map((song, index) => {
        return <SongCard song={song} key={`${song.title}-${index}`} />;
      })}
    </div>
  );
};

export default HomePage;
