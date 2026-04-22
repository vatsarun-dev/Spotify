import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextSong, pause, play, prevSong } from "../state/musicPlayer";

const usePlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(new Audio());
  const { currentPlayingSong, isPlaying, currentIndex, songList, playedHistory } =
    useSelector((store) => store.player);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const syncProgress = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    const handleSongEnd = () => {
      // When a song finishes, move to the next one if it exists.
      if (currentIndex < songList.length - 1) {
        dispatch(nextSong());
        return;
      }

      dispatch(pause());
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", syncProgress);
    audio.addEventListener("loadedmetadata", syncProgress);
    audio.addEventListener("durationchange", syncProgress);
    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("timeupdate", syncProgress);
      audio.removeEventListener("loadedmetadata", syncProgress);
      audio.removeEventListener("durationchange", syncProgress);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentIndex, dispatch, songList.length]);

  useEffect(() => {
    if (!currentPlayingSong) return;

    audioRef.current.src = currentPlayingSong.url;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => dispatch(pause()));
  }, [currentPlayingSong, dispatch]);

  useEffect(() => {
    if (!currentPlayingSong) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => dispatch(pause()));
      return;
    }

    audioRef.current.pause();
  }, [isPlaying, currentPlayingSong, dispatch]);

  const togglePlayAndPause = () => {
    if (!currentPlayingSong) return;

    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };

  const goToNextSong = () => {
    if (currentIndex < songList.length - 1) {
      dispatch(nextSong());
    }
  };

  const goToPrevSong = () => {
    if (playedHistory.length) {
      dispatch(prevSong());
      return;
    }

    // If there is no older song in history, restart the current track.
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const progress = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  return {
    currentPlayingSong,
    isPlaying,
    currentIndex,
    songList,
    currentTime,
    duration,
    progress,
    togglePlayAndPause,
    goToNextSong,
    goToPrevSong,
  };
};

// This file used to export `usePlayer` as a named export, while Player.jsx
// imported it as a default export. That mismatch caused the "does not provide
// an export named 'default'" error.
export default usePlayer;
