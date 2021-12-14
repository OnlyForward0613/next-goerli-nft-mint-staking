import { Container } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

const WrapperContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;
`;
const MainBox = styled.div`
    padding-top: 40px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default function Wrapper({ children }) {
    return (
        <WrapperContent>
            <Container>
                <MainBox>
                    {children}
                </MainBox>
            </Container>
        </WrapperContent>
    )
}


export function CenteredDiv({ children }) {
    return (
        <Centered>
            {children}
        </Centered>
    )
}