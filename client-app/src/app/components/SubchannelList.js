import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchSubchannelDetails,
  joinSubchannelGroup,
  leaveSubchannelGroup,
  resetChannelErrors,
  selectChannelState,
} from "../stores/channelSlice";
import { openModal } from "../stores/modalSlice";
import UserInfo from "./UserInfo";
import NewSubchannelForm from "./NewSubchannelForm";
import ChannelMenu from "./ChannelMenu";
import { selectUserState } from "../stores/userSlice";

const Containter = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: rgb(47, 49, 54);
`;

const ChannelNameWrapper = styled.div`
  display: flex;
  height: 50px;
  position: relative;
  flex-direction: row;
  cursor: pointer;
  padding: 0px 15px;
  border-bottom: 1px solid rgb(35, 37, 39);
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #34373c;
  }
  > img {
    height: 15px;
    object-fit: contain;
  }
  > h3 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const SubchannelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  position: relative;
  margin: 10px 0;
  margin-right: 4px;

  padding: 0 7px;
`;

const SubheaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
  cursor: pointer;
  > h1 {
    margin-left: 5px;
    text-transform: uppercase;
    font-size: 0.7rem;
    color: rgb(114, 118, 125);
  }
`;

const SubchannelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.selected && "#34373c"};
  padding: 5px 15px;
  margin-top: 4px;
  cursor: pointer;
  &:hover {
    background-color: #34373c;
  }
  > img {
    height: 12px;
  }
  > h1 {
    margin-left: 7px;
    font-size: 0.85rem;
    color: ${(props) => (props.selected ? "#ccd0d9" : "#72767d")};
  }
`;

const ArrowButton = styled.img`
  height: 8px;
  object-fit: contain;
  margin-left: -2px;
`;

const NewSubchannelButton = styled.img`
  height: 18px;
  object-fit: contain;
  margin-left: auto;
`;

const SubchannelList = () => {
  const { selectedChannel, selectedSubchannel } = useSelector(
    selectChannelState
  );
  const { user } = useSelector(selectUserState);
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  const handleNewSubchannel = () => {
    if (user?.id === selectedChannel?.creatorId) {
      dispatch(resetChannelErrors());
      dispatch(openModal(<NewSubchannelForm />));
    }
  };

  const handleSubchannelClick = (id) => {
    dispatch(fetchSubchannelDetails(id));
  };

  useEffect(() => {
    dispatch(joinSubchannelGroup());
    return () => dispatch(leaveSubchannelGroup());
  }, [selectedSubchannel?.id]);

  return (
    <Containter>
      {selectedChannel && (
        <ChannelNameWrapper
          onClick={() => setMenuOpened(!menuOpened)}
          ref={ref}
        >
          <h3>{selectedChannel.name}</h3>
          <img
            src={`./assets/icons/${menuOpened ? "close" : "down-arrow"}.svg`}
            alt="menu"
          />
          {menuOpened && (
            <ChannelMenu
              closeCallback={() => setMenuOpened(false)}
              trigger={ref}
            />
          )}
        </ChannelNameWrapper>
      )}

      <SubchannelsWrapper>
        {selectedChannel && (
          <SubheaderWrapper>
            <ArrowButton alt="arrow" src="./assets/icons/down-arrow-gray.svg" />
            <h1>Text subchannels</h1>
            <NewSubchannelButton
              alt="subchannelButton"
              src="./assets/icons/gray-plus.svg"
              onClick={handleNewSubchannel}
            />
          </SubheaderWrapper>
        )}
        {selectedChannel?.subchannels?.map((sc) => (
          <SubchannelWrapper
            key={sc.id}
            selected={selectedSubchannel?.id === sc.id}
            onClick={() => handleSubchannelClick(sc.id)}
          >
            <img alt="hash" src="./assets/icons/hash-tag.svg" />
            <h1>{sc.name}</h1>
          </SubchannelWrapper>
        ))}
      </SubchannelsWrapper>
      <UserInfo />
    </Containter>
  );
};

export default SubchannelList;
