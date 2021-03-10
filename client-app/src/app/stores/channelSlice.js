import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
    const selectedSubchannel = await agent.Subchannels.fetchDetails(id);
    invoke("AddToGroup", id);
    dispatch(subchannelDetails(selectedSubchannel));
  } catch (e) {
    console.log(e);
  }
};

// export const fetchSubchannelDetails = createAsyncThunk(
//   "channel/fetchSubchannelDetails",
//   async (id, middle) => {
//     try {
//       const selectedSubchannel = await agent.Subchannels.fetchDetails(id);
//       // console.log(rejectWithValue)
//        console.log(middle);
//       // console.log(invoke);

//       middle.extra.invoke("AddToGroup", selectedSubchannel?.id)
//       return selectedSubchannel;
//     } catch (e) {
//       console.log(e)
//       console.log(e?.data?.errors);
//       //rejectWithValue(e?.data?.errors);
//     }
//   }
// );

// export let hubConnnection

// export const createHubConnection = createAsyncThunk(
//   "channel/createHubConnection",
//   (subchannelId) => {
//     console.log("eeeeee")
//     const hubConnection = new HubConnectionBuilder()
//       .withUrl(process.env.REACT_APP_API_CHAT_URL, {
//         accessTokenFactory: () => window.localStorage.getItem("jwt"),
//       })
//       .configureLogging(LogLevel.Information)
//       .build();

//     hubConnection
//       .start()
//       .then(() => console.log(hubConnection?.state))
//       .then(() => {
//         if (hubConnection?.state === "Connected") {
//           hubConnection.invoke("AddToGroup", subchannelId);
//         }
//       })
//       .catch((e) => console.error("Hub error", e));

//     hubConnection.on("ReceiveMessage", (message) => {
//       console.log(message);
//       // dispatch()
//     });

//     hubConnection.on("Send", (info) => {
//       toast.info(info);
//     });

//     return hubConnection;
//   }
// );

export const sendMsgToSubchannel = ({ id, content }) => async (
  dispatch,
  getState,
  invoke
) => {
  try {
    const message = {
      content,
    };
    invoke("SendMessage", id, message);
  } catch (e) {
    console.log(e);
  }
};

// export const sendMsgToSubchannel = createAsyncThunk(
//   "channel/sendMsgToSubchannel",
//   async ({ id, content }) => {
//     try {
//       const message = {
//         content,
//       };
//       const messageEntity = await agent.Subchannels.sendMessage(id, message);
//       return messageEntity;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

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

export const deleteMessageFromSubchannel = createAsyncThunk(
  "channel/deleteMessageFromSubchannel",
  async (id, { rejectWithValue }) => {
    try {
      await agent.Messages.remove(id);
      return id;
    } catch (e) {
      console.log(e);
      const errorMsg = e?.data?.errors?.details;
      return rejectWithValue(errorMsg);
    }
  }
);

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
    hub: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetChannelErrors: (state) => {
      state.error = null;
    },
    subchannelDetails: (state, action) => {
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
      // .addCase(sendMsgToSubchannel.pending, (state, action) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(sendMsgToSubchannel.fulfilled, (state, action) => {
      //   if (state.selectedSubchannel) {
      //     state.selectedSubchannel.messages = [
      //       ...state.selectedSubchannel.messages,
      //       action.payload,
      //     ];
      //   }
      //   state.loading = false;
      // })
      // .addCase(sendMsgToSubchannel.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.loading = false;
      // })
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
      .addCase(deleteMessageFromSubchannel.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMessageFromSubchannel.fulfilled, (state, action) => {
        state.selectedSubchannel.messages = state.selectedSubchannel?.messages.filter(
          (m) => m.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMessageFromSubchannel.rejected, (state, action) => {
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
  addMessage,
} = channelSlice.actions;

export const selectChannelState = (state) => state.channel;

export default channelSlice.reducer;
