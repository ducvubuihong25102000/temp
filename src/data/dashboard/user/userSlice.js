import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import requestAPI from "../../../apis/index";

const initialState = {
  profile: JSON.parse(localStorage.getItem("user")) || {},
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const res = await requestAPI("/login", "POST", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const res = await requestAPI("/register", "POST", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const profile = createAsyncThunk("user/profile", async () => {
  const res = await requestAPI("/me", "GET", null);
  return res.data;
});

const handleLogin = (state, action) => {
  const { token } = action.payload;
  localStorage.setItem("accessToken", token);
};

const handleLoginAuth = (state, action) => {
  const { user, token } = action.payload;
  state.profile = user;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("accessToken", JSON.stringify(token));
};

const handleProfile = (state, action) => {
  const user = action.payload.data;
  state.profile = user;
  localStorage.setItem("user", JSON.stringify(user));
};

const handleLogout = (state, action) => {
  state.profile = {};
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: handleLogout,
    loginAuth: handleLoginAuth,
  },
  extraReducers: {
    [login.fulfilled]: handleLogin,
    [profile.fulfilled]: handleProfile,
  },
});

export const { logout, loginAuth } = userSlice.actions;

export default userSlice.reducer;
