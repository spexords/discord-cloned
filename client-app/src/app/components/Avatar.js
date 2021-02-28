import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  place-items: center;
  border-radius: 100%;
  padding: 5px;
  height: 40px;
  width: 40px;
  background: ${props => props.background ? props.background : "#747f8d"};
  > img {
    height: 20px;
    object-fit: contain;
  }
`;

const Avatar = ({image, background}) => {
    return (
        <Container background={background}>
            <img alt={image} src={image}/>
        </Container>
    )
}

export default Avatar
