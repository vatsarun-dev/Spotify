import { configureStore } from "@reduxjs/toolkit";
import musicPlayer from "../../feature/player/state/musicPlayer";
export let store = configureStore({
  reducer: {
    player: musicPlayer,
  },
});
