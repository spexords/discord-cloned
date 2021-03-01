import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";


export const fetchChannels = createAsyncThunk("channel/fetchChannels", async () => {
    try {
        const channels = await agent.Channels.fetchAll();
        return channels;
    } catch (e) {
        console.log(e?.data.errors)
    }
})

export const fetchChannelDetails = createAsyncThunk("channel/fetchChannelDetails", async(id) => {
    try {
        const selectedChannel = await agent.Channels.fetchChannelDetails(id)
        return selectedChannel;
    } catch (e) {
        console.log(e?.data.errors)
    }
})


export const channelSlice = createSlice({
    name: "channel",
    initialState: {
        channels: null,
        selectedChannel: null,
        loading: false,
        error: null
    },
    extraReducers: builder => {
        builder
        .addCase(fetchChannels.pending, (state, action) => {
            state.loading = true
            state.selectedChannel = null;
            state.error = null;
        })
        .addCase(fetchChannels.fulfilled, (state, action) => {
            state.channels = action.payload;
            state.loading = false
        })
        .addCase(fetchChannels.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(fetchChannelDetails.pending, (state, action) => {
            state.loading = true
            state.selectedChannel = null;
            state.error = null;
        })
        .addCase(fetchChannelDetails.fulfilled, (state, action) => {
            state.selectedChannel = action.payload;
            state.loading = false
        })
        .addCase(fetchChannelDetails.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
})

export const selectChannelState = (state) => state.channel;


export default channelSlice.reducer;
