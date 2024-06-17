// Header.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
    const [bar, setBar] = useState(false);

    const handleBackgroundClick = () => {
        setBar(false); // Close the menu when background is clicked
    };

    return (
        <Container bar={bar}>
            <Nav bar={bar} onClick={handleBackgroundClick}>
                <span><a href="/">Admin</a></span>
                <span><a href="/programs">Programs</a></span>
                <span><a href="/Coach">Coach</a></span>
                <span><a href="/Payroll">Payroll</a></span>
                <span><a href="/">Sign out</a></span>
                {/* <span><a href="http://localhost:3000/api/auth/signin?callbackUrl=/">Login</a></span> */}
            </Nav>
            <Bars onClick={() => setBar(!bar)} bar={bar}>
                <div className="bar"></div>
            </Bars>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    justify-content: flex-end;
    background-color: #1B590B;
    padding: 1.5rem 13rem;
    display: flex;
    animation: header 500ms ease-in-out;

    @media(max-width: 640px){
        padding: 1rem;
    }
`;


const Bars = styled.div`
    display: none;

    @media(max-width: 640px){
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 100;

        .bar{
            width: 100%;
            height: 2px;
            background-color: ${props => props.bar ? "transparent" : "#fff"};
            transition: all 400ms ease-in-out;

            &:before, &:after{
                content: "";
                width: 100%;
                height: 2px;
                background-color: #fff;
                position: absolute;
            }

            &:before{
                transform: ${props => props.bar ? "rotate(45deg)" : "translateY(10px)"};
                transition: all 400ms ease-in-out;
            }

            &:after{
                transform: ${props => props.bar ? "rotate(-45deg)" : "translateY(-10px)"};
                transition: all 400ms ease-in-out;
            }
        }
    }
`;

const Nav = styled.div`
    display: flex;
    gap: 2rem;

    @media(max-width: 640px){
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: ${props => props.bar ? "100vh" : "0"};
        display: flex;
        flex-direction: column;
        background-color: #1B590B;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        gap: 2rem;
        font-weight: 700;
        overflow: hidden;
        transition: height 400ms ease-in-out;
        opacity: 0.9;
    }

    span{
        margin-left: 1rem;

        a{
            color: #fff;
            text-decoration: none;
            font-weight: 400;
            position: relative;

            &:before{
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: -5px;
                height: 2px;
                background-color: #fff;
                transform: scale(0);
                transform-origin: right;
                transition: transform 400ms ease-in-out;
            }

            &:hover:before{
                transform: scale(1);
                transform-origin: left;
            }

            &:hover{
                opacity: 0.7;
            }
        }
    }
`;
