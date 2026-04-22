import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pause, play } from "../state/musicPlayer";

const usePlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(new Audio());
  const { currentPlayingSong, isPlaying } = useSelector(
    (store) => store.player,
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const syncProgress = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    const handleSongEnd = () => {
      dispatch(pause());
      setCurrentTime(0);
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
  }, [dispatch]);

  useEffect(() => {
    if (!currentPlayingSong) return;

    audioRef.current.src = currentPlayingSong.url;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch(() => dispatch(pause()));
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

  const progress = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  return {
    currentPlayingSong,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlayAndPause,
  };
};

// This file used to export `usePlayer` as a named export, while Player.jsx
// imported it as a default export. That mismatch caused the "does not provide
// an export named 'default'" error.
export default usePlayer;
