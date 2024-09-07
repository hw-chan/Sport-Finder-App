import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profile/profileSlice";
import gameReducer from "./features/game/gameSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    game: gameReducer
  },
});

export default store;
