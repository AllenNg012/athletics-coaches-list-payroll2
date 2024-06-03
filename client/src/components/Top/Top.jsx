import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import contact1 from "./contact.jpg";
import { AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";


const ProfComponent = () => {
  return (
    <BGC><Container id="home">
      <Content>
        <Slide direction="left">
          <Texts>
            <h1 className="green">Contact With Us &nbsp;<FaPhoneAlt /></h1>
            <h3>Available from Monday - Friday, 9 am - 5 pm</h3>
            <p><span>Call or email us for inquiries regarding programs, pricing, FAQs, and more.</span></p>
            <p>
              123 Anywhere St., Any City, ST 12345
              <br />
              123-456-7890
              <br />
              juniorathletics.inquiry@gmail.com
              <br />
              juniorathletics.com
            </p>
            <Social>
              <p>
                Keep up with our programs and events on social media
                <div className="social-icons">
                  <span>
                    <a href="https://github.com/ChungHinNg">
                      <BsFacebook />
                    </a>
                  </span>
                  <span>
                    <a href="/">
                      <BsTwitter />
                    </a>
                  </span>
                  <span>
                    <a href="https://linkedin.com/in/chung-hin-ng-5955a1268">
                      <AiOutlineInstagram />
                    </a>
                  </span>
                  <span>
                    <a href="https://linkedin.com/in/chung-hin-ng-5955a1268">
                      <AiFillLinkedin />
                    </a>
                  </span>
                </div><br/>
                @juniorathletics
              </p>
            </Social>
          </Texts>
        </Slide>
        <Slide direction="right">
          <Profile>
            <img src={contact1} alt="contact1" className="contact1" />
          </Profile>
        </Slide>
      </Content>
    </Container>
    </BGC>
  );
};

export default ProfComponent;

const BGC = styled.div`
    background-color: #F5F5EF;
    padding-top: 10rem;
  padding-bottom: 10rem;
  @media (max-width: 640px) {
    padding-top: 3rem;
  padding-bottom: 3rem;  }
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
      font-size: 0.7rem;
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
    }
    a {
      color: #1b590b;
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
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
