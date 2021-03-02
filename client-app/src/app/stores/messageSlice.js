import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";


export const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder

  },
});
