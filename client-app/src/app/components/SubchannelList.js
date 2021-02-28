import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const HeaderContainer = styled.div`
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
    font-size: 0.6rem;
    color: rgb(114, 118, 125);
  }
`;

const SubchannelContainer = styled.div`
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
    font-size: 0.75rem;
    color: rgb(114, 118, 125);
  }
`;

const SubchannelList = ({ header, items }) => {
  return (
    <Container>
      <HeaderContainer>
        <img alt="arrow" src="./assets/icons/down-arrow-gray.svg" />
        <h1>{header}</h1>
      </HeaderContainer>
      {items.map((i) => (
        <SubchannelContainer key={i.id}>
          <img alt="hash" src="./assets/icons/hash-tag.svg" />
          <h1>{i.name}</h1>
        </SubchannelContainer>
      ))}
    </Container>
  );
};

export default SubchannelList;
