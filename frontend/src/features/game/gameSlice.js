import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getUserId from "../../utils/authUtils";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchGame = createAsyncThunk("game/fetchGame", async (gameId) => {
  const token = localStorage.getItem("authToken").replace(/"/g, "");
  const response = await axios.get(`${BASE_URL}/game/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data[0];
});

export const fetchAllGames = createAsyncThunk(
  "game/fetchAllGames",
  async () => {
    const token = localStorage.getItem("authToken").replace(/"/g, "");
    const response = await axios.get(`${BASE_URL}/game/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const fetchUserGames = createAsyncThunk(
  "games/fetchUserGames",
  async () => {
    const token = localStorage.getItem("authToken").replace(/"/g, "");
    const userId = getUserId(token);
    const response = await axios.get(`${BASE_URL}/game/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const createGame = createAsyncThunk("game/createGame", async (data) => {
  const token = localStorage.getItem("authToken").replace(/"/g, "");
  const userId = getUserId(token);
  const response = await axios.post(
    `${BASE_URL}/game/create`,
    {
      userId,
      title: data.eventTitle,
      description: data.eventDescription,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      numberOfPlayers: data.numberOfPlayers,
      sport: data.sport,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
});

export const joinGame = createAsyncThunk("game/joinGame", async (gameId) => {
  const token = localStorage.getItem("authToken").replace(/"/g, "");
  const userId = getUserId(token);
  await axios.post(
    `${BASE_URL}/game/join`,
    { userId, gameId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return { userId, gameId };
});

export const withdrawFromGame = createAsyncThunk(
  "game/withdrawFromGame",
  async (gameId) => {
    const token = localStorage.getItem("authToken").replace(/"/g, "");
    const userId = getUserId(token);
    await axios.post(
      `${BASE_URL}/game/withdraw`,
      { userId, gameId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { userId, gameId };
  },
);

export const deleteGame = createAsyncThunk(
  "game/deleteGame",
  async (gameId) => {
    const token = localStorage.getItem("authToken").replace(/"/g, "");
    await axios.delete(`${BASE_URL}/game/delete/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { gameId };
  },
);

const gameSlice = createSlice({
  name: "game",
  initialState: {
    game: {},
    gameList: [],
    userGames: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.game = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllGames.fulfilled, (state, action) => {
        state.gameList = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserGames.fulfilled, (state, action) => {
        state.userGames = action.payload;
        state.loading = false;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.gameList.push(action.payload);
        state.loading = false;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        const { gameId, userId } = action.payload;
        const gameList = state.gameList.find((game) => game.id === gameId);
        if (gameList) {
          gameList.participants.push(userId);
        }
        if (state.game.id === gameId) {
          state.game.participants.push(userId);
        }
        state.loading = false;
      })
      .addCase(withdrawFromGame.fulfilled, (state, action) => {
        const { gameId, userId } = action.payload;
        const game = state.gameList.find((game) => game.id === gameId);

        if (game) {
          game.participants = game.participants.filter((id) => id !== userId);
        }
        if (state.game.id === gameId) {
          state.game.participants = state.game.participants.filter(
            (id) => id !== userId,
          );
        }
        state.loading = false;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        const { gameId } = action.payload;
        state.gameList = state.gameList.filter((game) => game.id !== gameId);
      });
  },
});

export default gameSlice.reducer;
