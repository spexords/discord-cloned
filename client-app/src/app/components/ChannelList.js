import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchChannelDetails,
  fetchChannels,
  selectChannelState,
} from "../stores/channelSlice";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 70px;
  background: #202225;
`;

const ChannelCircledButton = styled.div`
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
`;

const ChannelList = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(fetchChannels());
  }, []);
  const { channels } = useSelector(selectChannelState);
  return (
    <Container>
      {channels?.map((c) => (
        <ChannelCircledButton
          hasNotifications={true}
          key={c.id}
          onClick={() => {
            disptach(fetchChannelDetails(c.id));
          }}
        >
          {c.name[0]}
        </ChannelCircledButton>
      ))}
      <ChannelCircledButton>
        <img src="./assets/icons/plus.svg" alt="plus" />
      </ChannelCircledButton>
    </Container>
  );
};

export default ChannelList;
