import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";


const ProfComponent = () => {
  return (
    <BGC>
      <TopContainer>
      <h1>Frequently Asked Questions</h1>
      </TopContainer>
    <Container id="home">
      
    </Container>
    </BGC>
  );
};

export default ProfComponent;

const TopContainer = styled.div`
width:85%;
margin: auto;
`

const BGC = styled.div`
    background-color: #C7D8A7;
    padding-top: 1rem;
  padding-bottom: 10rem;
  @media (max-width: 640px) {
    padding-top: 3rem;
  padding-bottom: 3rem;  }
  h1 {
    color: #12721f;
    font-size: 3rem;
    text-transform: capitalize;
    letter-spacing: 2px;
    @media (max-width: 640px) {
      font-size: 2rem;
  }}
  @media (max-width: 790px) {
    width: 20rem;
  }
  @media (max-width: 660px) {
    width: 18rem;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 840px) {
    width: 90%;
  }

  
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Texts = styled.div`
  flex: 2;
  color: #88954c;
  h4 {
    padding: 1rem 0;
    font-weight: 500;
  }
  h1 {
    color: #12721f;
    font-size: 2rem;
    font-family: "Secular One", sans-serif;
    letter-spacing: 2px;
  }
  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    padding-bottom: 1.2rem;
    text-transform: capitalize;
  }
  p {
    font-weight: 300;
  }
  span{  font-weight: bold;
}
`;

const Social = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  p {
    font-size: 0.9rem;
    @media (max-width: 690px) {
      font-size: 0.8rem;
    }
  }
  .social-icons {
    display: inline-flex;
    align-items: center;
    margin-left: 0.5rem; /* Add some spacing between the text and icons */
    span {
      width: 2rem;
      height: 1rem;
      position: relative;
      margin-left: 0.5rem; /* Add spacing between icons */
      @media (max-width: 690px) {     
        height: 1.5rem; 
        margin-left: 0.5rem;
        padding: 1rem;
      }
    }
    a {
      color: #1b590b;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    @media (max-width: 690px) {     
         font-size: 1.5rem; /* Increase icon size for smaller screens */
  }
  }
`;

const Profile = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 790px) {
    width: 20rem;
  }
  @media (max-width: 660px) {
    width: 18rem;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
  .contact1 {
    width: 100%;
    padding-top: 3vw;
    height: 9cm;
    max-width: 100%;
    @media (max-width: 640px) {
      height: auto;
  }
  }
`;
