import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchChannelDetails,
  fetchChannels,
  fetchChannelUsers,
  fetchSubchannelDetails,
  resetChannelErrors,
  selectChannelState,
} from "../stores/channelSlice";

import { openModal } from "../stores/modalSlice";
import NewChannelForm from "./NewChannelForm";

const ChannelsWrapper = styled.div`
padding: 15px 0px;
  width: 70px;
  display: flex;
  background-color: #202225;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ChannelCircledButton = styled.div`
  position: relative;
  font-size: 1rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
  border-radius: ${(props) => (props.selected ? "35%" : "100%")};
  background-color: ${(props) => (props.selected ? "#7187dd" : " #36393f")};
  &:hover {
    border-radius: 35%;
  }
  > img {
    height: 20px;
    object-fit: contain;
  }
  &::before {
    width: 10px;
    height: 30px;
    position: absolute;
    left: -15px;
    top: calc(50% - 15px);
    background-color: #ffffff;
    border-radius: 35%;
    content: "";
    display: ${(props) => (props.selected ? "inline" : "none")};
  }
`;

const ChannelList = () => {
  const dispatch = useDispatch();
  const { channels, selectedChannel } = useSelector(selectChannelState);
  useEffect(() => {
    dispatch(fetchChannels()).then((r) =>
      dispatch(fetchChannelDetails(r.payload[0]?.id))
    );
  }, []);

  useEffect(() => {
    if (selectedChannel !== null) {
      if (selectedChannel?.subchannels?.length > 0) {
        dispatch(fetchSubchannelDetails(selectedChannel?.subchannels[0]?.id));
      }
      dispatch(fetchChannelUsers(selectedChannel?.id));
    }
  }, [selectedChannel]);

  const handleNewChannel = () => {
    dispatch(resetChannelErrors());
    dispatch(openModal(<NewChannelForm />));
  };

  return (
    <ChannelsWrapper>
      {channels?.map((c) => (
        <ChannelCircledButton
          hasNotifications={true}
          selected={selectedChannel?.id === c.id}
          key={c.id}
          onClick={() => {
            dispatch(fetchChannelDetails(c.id));
          }}
        >
          {c.name[0]}
        </ChannelCircledButton>
      ))}
      <ChannelCircledButton onClick={handleNewChannel}>
        <img src="./assets/icons/plus.svg" alt="plus" />
      </ChannelCircledButton>
    </ChannelsWrapper>
  );
};

export default ChannelList;
