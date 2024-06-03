// eslint-disable-next-line no-unused-vars
import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import aboutus1 from "./aboutus1.jpg";
import aboutuslogo from "./aboutuslogo.png";


const ProfComponent = () => {
  return (
    <BGC><Container id="About">
      <Content>
        <Slide direction="left">
        <Profile>
        <h1 className="green">Our Mission</h1>
            <img src={aboutus1} alt="aboutus1" className="aboutus1" />
          </Profile>
        </Slide>
        <Slide direction="right">
         <Texts>
          <div className="right-top">
             
            <img src={aboutuslogo} alt="aboutuslogo" className="aboutuslogo" />
            <h2>Our goal is to support 1200+<br/> young athletes by 2024</h2>
            </div>
            <p>At Junior Athletics, our mission is to 
            <span> inspire and<br/> empower</span> young athletes to reach their full
            <br/> potential through the joy of sports. 
            <br/>            <br/>
            We believe that every child deserves the<br/> opportunity to learn, grow, and succeed in a
            <br/> positive and supportive environment. 

            </p>
          </Texts>
        </Slide>
      </Content>
    </Container>
    </BGC>
  );
};

export default ProfComponent;


const BGC = styled.div`
  background-color: #f5f5ef;
  display: flex;            /* Use flexbox for the container */
  justify-content: center;  /* Center items horizontally */
  align-items: center;      /* Center items vertically */
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (max-width: 840px) {
    width: 100%;
  }
`;


const Container = styled.div`
  display: flex;
  @media (max-width: 840px) {
    width: 90%;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  gap: 5rem;
  justify-content:center;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Texts = styled.div`
  flex: 1;
  color: #88954c;
  margin-top: 7rem;
  @media (max-width: 640px) {
      font-size: 2rem;
      margin-top: 1rem;
  }
  h1 {
    color: #12721f;
    font-size: 3.5rem;
    text-transform: capitalize;
    letter-spacing: 2px;
    @media (max-width: 640px) {
      font-size: 2rem;
  }
  }
  h2{color:black;  font-style: italic;
    @media (max-width: 640px) {
      font-size: 1.5rem;
  }
}
  p {
    font-weight: 300;    font-size: 1.5rem;
    @media (max-width: 640px) {
      font-size: 1.2rem;
  }
  }
  span{  font-weight: bold;
}
.aboutuslogo{
  height: 7rem;
}
.right-top{display:flex;gap:2rem;
padding-bottom:1rem;}

`;


const Profile = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    color: #12721f;
    font-size: 3.5rem;
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
  .green{margin-bottom:1rem;}
  .aboutus1 {
    width: 100%;
    height: 10cm;
    max-width: 100%;
    @media (max-width: 640px) {
      height: auto;
  }
  }
`;

