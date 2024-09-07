import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getUserId from "../../utils/authUtils";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchProfile = createAsyncThunk(
  "profile/fetchByUser",
  async () => {
    const token = localStorage.getItem("authToken").replace(/"/g, "");
    const userId = getUserId(token);
    const response = await axios.get(`${BASE_URL}/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data[0];
  },
);

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (data) => {
    const token = localStorage.getItem("authToken").replace(/"/g, "");
    const userId = getUserId(token);
    const response = await axios.patch(
      `${BASE_URL}/profile/update`,
      {
        userId,
        name: data.name,
        email: data.email,
        country: data.country,
        stateOfCountry: data.state,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    email: "",
    country: "",
    stateOfCountry: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        if (action.payload) {
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.country = action.payload.country;
          state.stateOfCountry = action.payload.state_of_country;
          state.loading = false;
        }
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.country = action.payload.country;
        state.stateOfCountry = action.payload.state_of_country;
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
