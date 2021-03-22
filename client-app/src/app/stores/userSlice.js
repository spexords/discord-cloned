import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";

export const login = createAsyncThunk(
  "user/login",
  async (values, { rejectWithValue }) => {
    try {
      const user = await agent.User.login(values);
      return user;
    } catch (e) {
      return rejectWithValue(e?.data?.errors?.details);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_ ,{ rejectWithValue }) => {
    try {
      const user = await agent.User.current();
      return user;
    } catch (e) {
      return rejectWithValue(e?.data?.errors?.details);
    }
  }
);

export const register = createAsyncThunk(
    "user/register",
    async (values ,{ rejectWithValue }) => {
      try {
        await agent.User.register(values);
      } catch (e) {
        console.log(e);
        return rejectWithValue(e?.data?.errors?.details);
      }
    }
  );
  

export const updateAccount = createAsyncThunk(
  "user/updateAccount",
  async (values ,{ rejectWithValue }) => {
    try {
      await agent.User.updateAccount(values);
      return values;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e?.data?.errors?.details);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (values ,{ rejectWithValue }) => {
    try {
      await agent.User.updatePassword(values);
    } catch (e) {
      console.log(e);
      return rejectWithValue(e?.data?.errors?.details);
    }
  }
);



export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("jwt");
      state.user = null;
    },
    resetErrors: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        window.localStorage.setItem("jwt", state.user?.token);
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        window.localStorage.setItem("jwt", state.user?.token);
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateAccount.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {...state.user, ...action.payload};
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, resetErrors } = userSlice.actions;

export const selectUserState = (state) => state.user;
export const selectLoggedIn = (state) => state.user.user !== null;

export default userSlice.reducer;
