import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectUserState } from "../stores/userSlice";
import { selectChannelState } from "../stores/channelSlice";
import DefaultAvatar from "./DefaultAvatar";
import MemberMenu from "./MemberMenu";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: 8px;
  > p {
    margin-left: 5px;
    font-size: 0.8rem;
  }
  > img {
    object-fit: contain;
    height: 16px;
    margin-left: 5px;
  }
`;

const MemberInfo = ({ id, image, name, isHost }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { user } = useSelector(selectUserState);
  const { selectedChannel } = useSelector(selectChannelState);
  const ref = useRef();
  const onUserClick = () => {
    if (user?.id === selectedChannel?.creatorId && user?.id !== id) {
      setMenuOpened(!menuOpened);
    }
  };
  return (
    <Wrapper ref={ref} onClick={onUserClick}>
      <DefaultAvatar image={image} />
      <p>{name}</p>
      {isHost && <img alt="host" src="./assets/icons/crown.svg" />}
      {menuOpened && (
        <MemberMenu
          id={id}
          name={name}
          trigger={ref}
          closeCallback={() => setMenuOpened(false)}
        />
      )}
    </Wrapper>
  );
};

export default MemberInfo;
