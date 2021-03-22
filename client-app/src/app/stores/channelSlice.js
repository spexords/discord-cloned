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

export const fetchSubchannelDetails = (id) => async (
  dispatch,
  getState,
  invoke
) => {
  try {
    const newSubchannel = await agent.Subchannels.fetchDetails(id);
    dispatch(subchannelDetails(newSubchannel));
  } catch (e) {
    console.log(e);
  }
};

export const joinSubchannelGroup = () => async (dispatch, getState, invoke) => {
  try {
    const state = getState();
    const { selectedSubchannel } = state.channel;
    if (selectedSubchannel?.id) {
      await invoke("AddToGroup", selectedSubchannel?.id);
    }
  } catch (e) {
    console.log(e);
  }
};

export const leaveSubchannelGroup = () => async (
  dispatch,
  getState,
  invoke
) => {
  try {
    const state = getState();
    const { prevSelectedSubchannel } = state.channel;
    if (prevSelectedSubchannel?.id) {
      await invoke("RemoveFromGroup", prevSelectedSubchannel?.id);
    }
  } catch (e) {
    console.log(e);
  }
};

export const sendMsgToSubchannel = ({ id, content }) => async (
  dispatch,
  getState,
  invoke
) => {
  try {
    const message = {
      content,
    };
   await invoke("SendMessage", id, message);
  } catch (e) {
    console.log(e);
  }
};

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

export const deleteMsgFromSubchannel = (id) => async (
  dispatch,
  getState,
  invoke
) => {
  try {
    const state = getState();
    const { selectedSubchannel } = state.channel;
    await invoke("RemoveMessage", selectedSubchannel?.id, id);
  } catch (e) {
    console.log(e);
  }
};

export const leaveChannel = createAsyncThunk(
  "channel/leaveChannel",
  async (id, { rejectWithValue }) => {
    try {
      await agent.Channels.leaveChannel(id);
      return id;
    } catch (e) {
      console.log(e);
      const errorMsg = e?.data?.errors?.details;
      return rejectWithValue(errorMsg);
    }
  }
);

export const deleteChannel = createAsyncThunk(
  "channel/deleteChannel",
  async (id, { rejectWithValue }) => {
    try {
      await agent.Channels.deleteChannel(id);
      return id;
    } catch (e) {
      console.log(e);
      const errorMsg = e?.data?.errors?.details;
      return rejectWithValue(errorMsg);
    }
  }
);

export const changePasswordChannel = createAsyncThunk(
  "channel/changePasswordChannel",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      await agent.Channels.changePasswordChannel(id, values);
      return id;
    } catch (e) {
      console.log(e);
      const errorMsg = e?.data?.errors?.details;
      return rejectWithValue(errorMsg);
    }
  }
);

export const kickUserChannel = createAsyncThunk(
  "channel/kickUserChannel",
  async ({ cid, uid }, { rejectWithValue }) => {
    try {
      await agent.Channels.kickUser(cid, uid);
      return uid;
    } catch (e) {
      console.log(e);
      const errorMsg = e?.data?.errors?.details;
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
    prevSelectedSubchannel: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetChannelSlice: (state) => {
      state.channels = null;
      state.selectedChannel = null;
      state.selectedChannelUsers = null;
      state.selectedSubchannel = null;
      state.prevSelectedSubchannel = null;
      state.loading = false;
      state.error = null;
    },
    resetChannelErrors: (state) => {
      state.error = null;
    },
    subchannelDetails: (state, action) => {
      state.prevSelectedSubchannel = state.selectedSubchannel;
      state.selectedSubchannel = action.payload;
      state.error = null;
      state.loading = false;
    },
    addMessage: (state, action) => {
      if (state.selectedSubchannel) {
        state.selectedSubchannel.messages = [
          ...state.selectedSubchannel.messages,
          action.payload,
        ];
      }
    },
    deleteMessage: (state, action) => {
      state.selectedSubchannel.messages = state.selectedSubchannel?.messages.filter(
        (m) => m.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createHubConnection.pending, (state, action) => {
      //   state.hub = null;
      // })
      // .addCase(createHubConnection.fulfilled, (state, action) => {
      //   state.hub = action.payload;
      // })
      .addCase(fetchChannels.pending, (state, action) => {
        state.loading = true;
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
        state.selectedChannel = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelDetails.fulfilled, (state, action) => {
        state.selectedChannel = action.payload;
        state.prevSelectedSubchannel = state.selectedSubchannel;
        state.selectedSubchannel = null;
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
      })
      .addCase(leaveChannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter((c) => c.id !== action.payload);
        state.selectedSubchannel = null;
        state.selectedChannelUsers = null;
        state.selectedChannel = null;
      })
      .addCase(leaveChannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteChannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter((c) => c.id !== action.payload);
        state.selectedSubchannel = null;
        state.selectedChannelUsers = null;
        state.selectedChannel = null;
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(changePasswordChannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordChannel.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changePasswordChannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(kickUserChannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(kickUserChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChannelUsers = state.selectedChannelUsers.filter(
          (uc) => uc.id !== action.payload
        );
      })
      .addCase(kickUserChannel.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  resetChannelErrors,
  subchannelDetails,
  resetChannelSlice,
  addMessage,
  deleteMessage,
} = channelSlice.actions;

export const selectChannelState = (state) => state.channel;

export default channelSlice.reducer;
