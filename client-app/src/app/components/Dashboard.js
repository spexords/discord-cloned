import React from 'react'
import styled from 'styled-components'
import LeftSidebar from './LeftSidebar'
import MessagePanel from './MessagePanel'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    background: transparent;
    border-top-left-radius: 10px;
    overflow: hidden;
`

const Dashboard = () => {
    return (
        <Container>
            <LeftSidebar/>
            <MessagePanel/>
        </Container>
    )
}

export default Dashboard
