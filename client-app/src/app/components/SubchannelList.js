import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchSubchannelDetails,
  selectChannelState,
} from "../stores/channelSlice";
import UserInfo from "./UserInfo";

const Containter = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background: rgb(47, 49, 54);
`;

const ChannelNameWrapper = styled.div`
  display: flex;
  height: 50px;
  flex-direction: row;
  cursor: pointer;
  padding: 0px 15px;
  border-bottom: 1px solid rgb(35, 37, 39);
  align-items: center;
  justify-content: space-between;
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
  margin-top: 15px;
  padding: 0 7px;
`;

const SubheaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  > img {
    height: 8px;
    object-fit: contain;
    margin-left: -2px;
  }
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
  padding: 3px 15px;
  margin-top: 4px;
  cursor: pointer;
  > img {
    height: 12px;
  }
  > h1 {
    margin-left: 7px;
    font-size: 0.85rem;
    color: ${props => props.selected ? "#ccd0d9"  : "#72767d"} 
    
  }
`;

const SubchannelList = () => {
  const { selectedChannel, selectedSubchannel } = useSelector(selectChannelState);
  const dispatch = useDispatch();
  return (
    <Containter>
      <ChannelNameWrapper>
        <h3>{selectedChannel?.name}</h3>
        <img src="./assets/icons/down-arrow.svg" alt="dropdown" />
      </ChannelNameWrapper>
      <SubchannelsWrapper>
        {selectedChannel && (
          <SubheaderWrapper>
            <img alt="arrow" src="./assets/icons/down-arrow-gray.svg" />
            <h1>kanały tekstowe</h1>
          </SubheaderWrapper>
        )}
        {selectedChannel?.subchannels?.map((sc) => (
          <SubchannelWrapper
            key={sc.id}
            selected={selectedSubchannel?.id === sc.id}
            onClick={() => dispatch(fetchSubchannelDetails(sc.id))}
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
