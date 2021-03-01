import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";


export const login = createAsyncThunk("user/login", async (values, {rejectWithValue}) => {
    try {
        const user = await agent.User.login(values)
        return user;
    } catch (e) {
        return rejectWithValue(e?.data?.errors?.details);
    }
})


export const userSlice = createSlice({
    name: "user",
    initialState:  {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            window.localStorage.removeItem("jwt");
            state.user = null;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(login.pending, (state, action) => {
            state.loading = true
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            window.localStorage.setItem("jwt", state.user?.token)
            state.loading = false
        })
        .addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
})

export const {
    logout
} = userSlice.actions

export const selectUserState = (state) => state.user;
export const selectLoggedIn = (state) => state.user.user !== null;


export default userSlice.reducer;