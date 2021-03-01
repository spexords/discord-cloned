import React from 'react'
import styled from 'styled-components'

const Message = styled.h5`
    margin-top: 4px;
    color: rgb(200, 20, 20);
    font-size: 0.7rem;
`;

const Error = (props) => {
    return (
        <Message>
            {props.children}
        </Message>
    )
}

export default Error
