import React from "react";
import styled from "styled-components";
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
  const members = [
    {
      id: 1,
      name: "Toek",
    },
    {
      id: 2,
      name: "Andrzejek",
    },
    {
      id: 3,
      name: "Papegaua",
    },
    {
      id: 4,
      name: "Filalalo",
    },
  ];
  return (
    <Container>
      <h1>members</h1>
      {members.map((m) => (
        <MemberInfo
          key={m.id}
          image="./assets/icons/discord-icon.png"
          name={m.name}
        />
      ))}
    </Container>
  );
};

export default MemberList;
