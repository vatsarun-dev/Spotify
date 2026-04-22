import { createSlice } from "@reduxjs/toolkit";

const musicPlayer = createSlice({
  name: "musicPlayer",
  initialState: {
    songList: [],
    currentIndex: -1,
    playedHistory: [],
    currentPlayingSong: null,
    isPlaying: false,
  },
  reducers: {
    playNewSong: (state, action) => {
      const { songs, index } = action.payload;

      if (!songs?.length || index < 0 || index >= songs.length) return;

      // Save the current position so the previous button can step back through
      // songs the user has already played.
      if (
        state.currentIndex !== -1 &&
        state.currentIndex !== index &&
        state.songList === songs
      ) {
        state.playedHistory.push(state.currentIndex);
      }

      state.songList = songs;
      state.currentIndex = index;
      state.currentPlayingSong = songs[index];
      state.isPlaying = true;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    nextSong: (state) => {
      // Next moves forward inside the current song list.
      if (state.currentIndex === -1) return;
      if (state.currentIndex >= state.songList.length - 1) return;

      state.playedHistory.push(state.currentIndex);
      state.currentIndex += 1;
      state.currentPlayingSong = state.songList[state.currentIndex];
      state.isPlaying = true;
    },
    prevSong: (state) => {
      // Previous uses the history stack so it can go back to what was played.
      if (!state.playedHistory.length) return;

      const lastPlayedIndex = state.playedHistory.pop();
      state.currentIndex = lastPlayedIndex;
      state.currentPlayingSong = state.songList[lastPlayedIndex];
      state.isPlaying = true;
    },
  },
});

export const { playNewSong, play, pause, nextSong, prevSong } =
  musicPlayer.actions;
export default musicPlayer.reducer;
