import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import aboutus2 from "./aboutus2.jpg";


const ProfComponent = () => {
  return (
    <BGC><Container id="home">
      <Content>
        <Slide direction="left">
          <Texts>
            <h1 className="green">Why Choose Us </h1>
            <p>
            Through our diverse programs in <span>basketball,<br/>
            soccer, and baseball</span>, we aim to instill the values<br/>
             of teamwork, sportsmanship, and perseverance<br/>
              while fostering a lifelong love for physical<br/>
               activity. <br/><br/>

Our dedicated coaches are committed to <br/>
providing <span>personalized instruction</span>, fostering a<br/>
 sense of belonging, and nurturing the unique <br/>
 talents of each child. Together, we strive to<br/>
  create a community where every child can <br/>
  thrive, both on and off the field, as they embark<br/>
   on their athletic journey with us.
            </p>
          </Texts>
        </Slide>
        <Slide direction="right">
          <Profile>
            <img src={aboutus2} alt="aboutus2" className="aboutus2" />
          </Profile>
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
  h1 {
    color: #12721f;
    font-size: 3.5rem;
    text-transform: capitalize;
    letter-spacing: 2px;
    @media (max-width: 640px) {
      font-size: 2rem;
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
  .aboutus2 {
    width: 100%;
    padding-top: 5vw;
    height: 13cm;
    max-width: 100%;
    @media (max-width: 640px) {
      height: auto;
      padding-top: 0vw;
  }
  }
`;
