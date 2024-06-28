/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import logo from './headerlogo.png';
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .activeLink {
      text-decoration: underline;
  }
`;


const Header = () => {
    const [bar, setBar] = useState(false);

    return (
        <Container bar={bar}>
            <Nav bar={bar}>
                <span><NavLink to="/OurProgram" activeClassName="activeLink">Programs</NavLink></span><span className='disinHeader'> |</span>
                <span><NavLink to="/FAQ" activeClassName="activeLink">FAQ</NavLink></span><span className='disinHeader'> | </span>
                <span><NavLink to="/Contact" activeClassName="activeLink">Contact</NavLink></span>
                {bar && <button style={{ marginLeft:'100px',padding: '10px 20px', backgroundColor: '#95071A', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' }}>Sign Up</button>}
            </Nav>
            <NavLink to="/" > <Logo src={logo} alt="logo" /></NavLink>

            <ContactInfo>
                <span style={{ color: 'white', marginRight: '20px' }}>+1 (416) 453-8814</span>
                <NavLink to="/" activeClassName="activeLink"><SignInButton>SIGN IN</SignInButton></NavLink>
            </ContactInfo>
            <Bars onClick={() => setBar(!bar)} bar={bar}>
                <div className="bar"></div>
            </Bars>
        </Container>
    );
};


export default Header;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 8%;
    z-index: 1000;
    background-color: #0C3469;
    padding: 0rem 10px;
    color: white;
    display: flex;
    justify-content: space-between; // Ensures elements are spaced out evenly
    align-items: center;
    animation: header 500ms ease-in-out;
    border-bottom-style: solid;
    border-bottom-color: #000000;
    @media(max-width: 640px){
        justify-content: space-around; // Centers the logo better on small screens
        padding: 1rem;
    }
`;

const Logo = styled.img`
    height: 130px;
    width: 130px;
    order: 1; // Keeps logo in the center
    position: absolute;
    top: 1px;
    left: 45.5%;
    @media(max-width: 640px){
    position:relative;
    top: auto;
    left: auto;
    height: 60px;
    width: 60px;
    }
`;

const ContactInfo = styled.div`
    display: flex;
    font-size: 1.5rem;
    font-weight: 400;
    align-items: center;
    order: 2; // Moves contact info to the right
    @media(max-width: 640px){
        flex: 1 0 auto; // Ensures elements are evenly spaced
    }
`;

const SignInButton = styled.button`
    padding: 0px 45px;
    background-color: #95071A;
    color: white; 
    border-radius: 20px;
    font-weight: 700;
    border: none;
    borderRadius: 5px;
    cursor: pointer;
    @media(max-width: 640px){
        display: none; // Hides the button on small screens
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
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 100;
        order: 3; // Ensures it stays on the right
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
    gap: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    order: 0; // Ensures navigation stays on the left
    display: flex; // Make sure to declare display flex here for the default view
    align-items: center; // Center items vertically

    @media(max-width: 640px){
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: ${props => props.bar ? "100vh" : "0"};
        display: flex;
        flex-direction: column;
        background-color: #0C3469;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        gap: 2rem;
        font-weight: 700;
        overflow: hidden;
        transition: height 400ms ease-in-out;
        opacity: 0.9;
        .disinHeader { display: none; }

        button { // Additional styling for the button to ensure it matches other links
            padding: 10px 20px; // Padding to ensure button is large enough to be easily clickable
            background-color: #95071A;
            color: white; // White text color
            border: none; // No border
            borderRadius: 5px; // Rounded corners
            font-weight: 700; // Bold font weight
            cursor: pointer; // Pointer cursor on hover
            margin: 0 auto; // Center the button horizontally
            text-align: center; // Center the text inside the button
        }
    }

    span {
        margin-left: 1rem;
        a {
            color: #fff;
            text-decoration: none;
            font-weight: 400;
            position: relative;
            &:before {
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
            &:hover:before {
                transform: scale(1);
                transform-origin: left;
            }
            &:hover {
                opacity: 0.7;
            }
        }
    }
    a {
        text-decoration: none;
        color: #fff;

        &.activeLink {
            text-decoration: underline;  // Underline for active link
        }
    }
`;
