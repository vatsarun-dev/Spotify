import { createSlice } from "@reduxjs/toolkit";
let musicPlayer = createSlice({
  name: "musicPlayer",
  initialState: {
    currentPlayingSong: null,
    isPlaying: false,
  },
  reducers: {
    playNewSong: (state, action) => {
      ((state.currentPlayingSong = action.payload), (state.isPlaying = true));
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
  },
});
export let { playNewSong, play, pause } = musicPlayer.actions;
export default musicPlayer.reducer;
