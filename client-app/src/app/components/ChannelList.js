import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchChannelDetails,
  fetchChannels,
  fetchChannelUsers,
  fetchSubchannelDetails,
  selectChannelState,
} from "../stores/channelSlice";

import { openModal } from "../stores/modalSlice";
import NewChannelForm from "./NewChannelForm";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 70px;
  background: #202225;
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
  border-radius: 100%;
  background-color: rgb(54, 57, 63);

  &:hover {
    border-radius: 35%;
  }
  > img {
    height: 20px;
    object-fit: contain;
  }

  &::before {
    width: 9px;
    height: 9px;
    position: absolute;
    left: -14.5px;
    top: calc(50% - 4.5px);
    background-color: white;
    border-radius: 50%;
    content: "";
    display: ${(props) => (props.selected ? "inline" : "none")};
  }
`;

const ChannelList = () => {
  const dispatch = useDispatch();
  const { channels, selectedChannel } = useSelector(selectChannelState);
  useEffect(() => {
    console.log("0");
    dispatch(fetchChannels());
  }, []);

  useEffect(() => {
    console.log("1");
    if (channels !== null) {
      dispatch(fetchChannelDetails(channels[0]?.id));
    }
  }, [channels]);

  useEffect(() => {
    console.log("2");
    if (selectedChannel !== null) {
      dispatch(fetchSubchannelDetails(selectedChannel.subchannels[0]?.id));
      dispatch(fetchChannelUsers(selectedChannel?.id));
    }
  }, [selectedChannel]);

  return (
    <Container>
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
      <ChannelCircledButton
        onClick={() => dispatch(openModal(<NewChannelForm />))}
      >
        <img src="./assets/icons/plus.svg" alt="plus" />
      </ChannelCircledButton>
    </Container>
  );
};

export default ChannelList;
