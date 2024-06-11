/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { Slide, Zoom } from "react-awesome-reveal";
import bgi from "./background.png";

const Footer = () => {
  return (
    <Container id="footer">
      <Profile>
        <div className="portfolio">
          <Slide direction="left" delay={1}>
            <h1>Connect With Us</h1>
          </Slide>
        </div>

        <div className="address">
          <Slide direction="left">
            <p className="st">Call or email us for inquiries regarding programs, pricing, FAQs, and more.</p>
          </Slide>
          <Slide direction="left">
            <p>
              123 Anywhere St., Any City, ST 12345
              <br />123-456-7890
              <br />juniorathletics.inquiry@gmail.com
              <br />juniorathletics.com
            </p>
          </Slide>
        </div>
        <div className="profiles">
          <Slide direction="left">
            <h1>Available from Monday - Friday, 9 am - 5 pm</h1>
          </Slide>

          <p>
            <div className="icons">
              <Zoom>
                <span>
                  <a href="/">
                    <BsFacebook />
                  </a>
                </span>
              </Zoom>
              <Zoom>
                <span>
                  <a href="/">
                    <BsTwitter />
                  </a>
                </span>
              </Zoom>
              <Zoom>
                <span>
                  <a href="/">
                    <AiOutlineInstagram />
                  </a>
                </span>
              </Zoom>
              <Zoom>
                <span>
                  <a href="/">
                    <AiFillLinkedin />
                  </a>
                </span>
              </Zoom>
            </div>
            Keep up with our programs and events on social media
            <br />@juniorathletics
          </p>
        </div>
      </Profile>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: rgba(46, 130, 190, 0.8); /* Apply 80% opacity here */
  
  margin-top: 2rem;
  position: relative;
  padding: 2rem 0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  text-align: center;
  justify-content: center;
  align-items: center;  

  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Profile = styled.div`
  flex: 1;
  background-color: #f5f5ef; /* No opacity here */
  border: 2px solid black;
  border-radius: 1vw;
  padding: 0.5rem;  // Reduced padding
  margin: 0.5rem;  // Reduced margin
  max-width: 900px; 

  .portfolio {}
  h1{
    color: #2E82BE;;
  }
  p {
    color: #000000;
  }
  .st{    
    font-weight: bold;
}
  .profiles {
    h1 {
      font-size: 1.1rem;
      color: #2E82BE;
    }

    .icons {
      display: flex;
      justify-content: center; /* Center icons horizontally */
      align-items: center; /* Center icons vertically */
      gap: 0.5rem; /* Add space between icons */

      span {
        display: flex;
        justify-content: center;
        width: 3rem;
        margin-right: 0.5rem;
        margin-top: 1rem;
        a {
          margin-top: 0.2rem;
          color: #010202;
        }
      }
    }
  }
`;
