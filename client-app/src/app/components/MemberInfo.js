import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  > p {
    margin-left: 5px;
    font-size: 0.8rem;
  }
`;

const MemberInfo = ({ image, name }) => {
  return (
    <Container>
      <Avatar image={image} />
      <p>{name}</p>
    </Container>
  );
};

export default MemberInfo;
