import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectChannelState } from "../stores/channelSlice";
import MemberInfo from "./MemberInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(47, 49, 54);
  padding: 15px;
  color: rgb(142, 146, 151);
  width: 250px;
  > h1 {
    margin-left: 5px;
    text-transform: uppercase;
    font-size: 0.6rem;
    margin-bottom: 5px;
  }
`;

const MemberList = () => {
  const { selectedChannelUsers, selectedChannel } = useSelector(
    selectChannelState
    );
    
    return (
    <Container>
      {selectedChannelUsers?.length > 0 && <h1>members</h1>}
      {selectedChannelUsers?.map((m) => (
        <MemberInfo
          id={m.id}
          key={m.id}
          image="./assets/icons/discord-icon.png"
          name={m.username}
          isHost={selectedChannel?.creatorId === m.id}
        />
      ))}
    </Container>
  );
};

export default MemberList;
