import React from "react";
import styled from "styled-components";
import SubchannelList from "./SubchannelList";
import UserInfo from "./UserInfo";

const Containter = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background: rgb(47, 49, 54);
`;

const HeaderContainer = styled.div`
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

const SubchannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 7px;
`;

const LeftSidebar = () => {
  const items = [
    {
      id: 1,
      name: "Jazda cs",
    },
    {
      id: 2,
      name: "General",
    },
    {
      id: 3,
      name: "TAI",
    },
    {
      id: 4,
      name: "BINGO BNAGO",
    },
  ];
  return (
    <Containter>
      <HeaderContainer>
        <h3>Testuje</h3>
        <img src="./assets/icons/down-arrow.svg" alt="dropdown" />
      </HeaderContainer>
      <SubchannelContainer>
        <SubchannelList header="kanały tekstowe" items={items} />
      </SubchannelContainer>
      <UserInfo />
    </Containter>
  );
};

export default LeftSidebar;
