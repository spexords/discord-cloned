import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";

export const fetchChannels = createAsyncThunk(
  "channel/fetchChannels",
  async () => {
    try {
      const channels = await agent.Channels.fetchAll();
      return channels;
    } catch (e) {
      console.log(e?.data.errors);
    }
  }
);

export const fetchChannelDetails = createAsyncThunk(
  "channel/fetchChannelDetails",
  async (id, { rejectWithValue }) => {
    try {
      const selectedChannel = await agent.Channels.fetchDetails(id);
      return selectedChannel;
    } catch (e) {
      console.log(e?.data?.errors);
      rejectWithValue(e?.data?.errors);
    }
  }
);

export const fetchChannelUsers = createAsyncThunk(
  "channel/fetchChannelUsers",
  async (id, { rejectWithValue }) => {
    try {
      const channelUsers = await agent.Channels.fetchUsers(id);
      return channelUsers;
    } catch (e) {
      console.log(e?.data?.errors);
      rejectWithValue(e?.data?.errors);
    }
  }
);

export const fetchSubchannelDetails = createAsyncThunk(
  "channel/fetchSubchannelDetails",
  async (id, { rejectWithValue }) => {
    try {
      const selectedSubchannel = await agent.Subchannels.fetchDetails(id);
      return selectedSubchannel;
    } catch (e) {
      console.log(e?.data?.errors);
      rejectWithValue(e?.data?.errors);
    }
  }
);

export const sendMsgToSubchannel = createAsyncThunk(
  "channel/sendMsgToSubchannel",
  async ({ id, content }) => {
    try {
      const message = {
        content,
      };
      const messageEntity = await agent.Subchannels.sendMessage(id, message);
      return messageEntity;
    } catch (e) {
      console.log(e);
    }
  }
);

export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (channel, { rejectWithValue }) => {
    try {
      await agent.Channels.createChannel(channel);
      return channel;
    } catch (e) {
      return rejectWithValue(e?.data?.errors?.details);
    }
  }
);

export const joinChannel = createAsyncThunk(
  "channel/joinChannel",
  async (channel, { rejectWithValue }) => {
    try {
      const channelEntity = await agent.Channels.joinChannel(channel);
      return channelEntity;
    } catch (e) {
      return rejectWithValue(e?.data?.errors?.details);
    }
  }
);

export const createSubchannel = createAsyncThunk(
  "channel/createSubchannel",
  async ({ id, subchannel }, { rejectWithValue }) => {
    try {
      console.log(subchannel);
      await agent.Channels.createSubchannel(id, subchannel);
      return subchannel;
    } catch (e) {
      console.log(e);
      const { status } = e;
      let errorMsg = "";
      if (status === 403) {
        errorMsg = "You are not the channel's creator";
      } else {
        errorMsg = e?.data?.errors?.details;
      }
      return rejectWithValue(errorMsg);
    }
  }
);

export const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channels: null,
    selectedChannel: null,
    selectedChannelUsers: null,
    selectedSubchannel: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state, action) => {
        state.loading = true;
        state.selectedChannel = null;
        state.selectedSubchannel = null;
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.channels = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelDetails.pending, (state, action) => {
        state.loading = true;
        state.selectedChannel = null;
        state.selectedSubchannel = null;
        state.error = null;
      })
      .addCase(fetchChannelDetails.fulfilled, (state, action) => {
        state.selectedChannel = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelUsers.pending, (state, action) => {
        state.loading = true;
        state.selectedChannelUsers = null;
        state.error = null;
      })
      .addCase(fetchChannelUsers.fulfilled, (state, action) => {
        state.selectedChannelUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubchannelDetails.pending, (state, action) => {
        state.loading = true;
        state.selectedSubchannel = null;
        state.error = null;
      })
      .addCase(fetchSubchannelDetails.fulfilled, (state, action) => {
        state.selectedSubchannel = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubchannelDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(sendMsgToSubchannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMsgToSubchannel.fulfilled, (state, action) => {
        if (state.selectedSubchannel) {
          state.selectedSubchannel.messages = [
            ...state.selectedSubchannel.messages,
            action.payload,
          ];
        }
        state.loading = false;
      })
      .addCase(sendMsgToSubchannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createChannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.channels = [...state.channels, action.payload];
        state.loading = false;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(joinChannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinChannel.fulfilled, (state, action) => {
        state.channels = [...state.channels, action.payload];
        state.loading = false;
      })
      .addCase(joinChannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createSubchannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubchannel.fulfilled, (state, action) => {
        state.selectedChannel.subchannels = [
          ...state.selectedChannel.subchannels,
          action.payload,
        ];
        state.loading = false;
      })
      .addCase(createSubchannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const selectChannelState = (state) => state.channel;

export default channelSlice.reducer;
