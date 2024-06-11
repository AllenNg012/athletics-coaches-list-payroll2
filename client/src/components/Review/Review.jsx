/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import GoogleReviewWidget from "../GoogleReview/GoogleReviewWidget";
import review from "./review.png";
import logo from "./googlelogo.png"
import bgi from "../background.png";


const ProfComponent = () => {
  return (
    <BGC>
      <Container id="home">
        <Content>
          <Slide direction="left">
            <ImageContainer>
              <img src={review} alt="contact1" className="contact1" />
            </ImageContainer>
          </Slide>

          <Slide direction="right">
            <ProfileContainer>
              <Texts>
                <h1 className="ab2Tittle">
                See what other  parents have to say: 
                </h1>
                <h3>Top Rated Child Athletics Program Across the GTA</h3>
              </Texts>
              <Profile>
                <GoogleReviewWidget />
                <BottomText>Junior Athletics on Google Reviews  <img src={logo} alt="logo" className="logo" /></BottomText>

              </Profile>
            </ProfileContainer>
          </Slide>
        </Content>
      </Container>
    </BGC>
  );
};

export default ProfComponent;

const BottomText = styled.p`
  position: absolute;
  bottom: 1.5cm;
  right: 0;
  color: #080808;
  font-size: 1.5rem;
  .logo{height:3vw;}
`;

const BGC = styled.div`
  background-color: #f5f5ef;
  padding-top: 10rem;
  padding-bottom: 10rem;
  @media (max-width: 640px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 840px) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%; 
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    max-width: 750px; 
    object-fit: cover;
  }
`;

const Texts = styled.div`
  color: #000000;
  margin-left:5rem;
  margin-right:5rem;
  .ab2Tittle{    font-size: 2rem;
  }

  h4 {
    padding: 1rem 0;
    font-weight: 500;
  }
  h1 {
    color: #2E82BE;
    font-size: 2rem;
    font-family: "Secular One", sans-serif;
    font-weight: bold;
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
  span {
    font-weight: bold;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
justify-content: center;
height: 85%;
`;

const Profile = styled.div`
  flex: 1;
  width: 100%;
  max-height: 400px;
  margin-right: 5vw;
  overflow-y: auto;
  @media (max-width: 790px) {
    width: 20rem;
  }
  @media (max-width: 660px) {
    width: 18rem;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;
