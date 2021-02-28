import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 70px;
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
  const channels = [
    {
      id: "fee31c8a-80c3-4ceb-e625-08d8db2639fc",
      name: "bus",
    },
    {
      id: "b908e1a9-40ea-4685-e627-08d8db2639fc",
      name: "bandwidth",
    },
    {
      id: "6a6c2963-695e-4909-e629-08d8db2639fc",
      name: "Protocol",
    },
  ];
  return (
    <Container>
      {channels.map((c) => (
        <ChannelCircledButton hasNotifications={true} key={c.id}>
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
