/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PNSST2KpyYZmvZEQWr6oqPxWFqTeH6KbyUOQEYblEKHM3U7XhTCYl4GU6YJ2lYJgmIHB2n0od0V28dGPfw0sXSP00BKh7CEYT");


const RegistrationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const programName = queryParams.get("programName");
  const programAge = queryParams.get("programAge");
  const programPlace = queryParams.get("programPlace");
  const programLocation = queryParams.get("programLocation");
  const programFees = queryParams.get("programFees");
  const programID = queryParams.get("programID");


  const handleBuy = async (programId) => {
    const stripe = await stripePromise;

    const response = await axios.post('http://localhost:3001/create-checkout-session', { programId });

    const sessionId = response.data.id;

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <>
      <Header>
        <Title>REGISTRATION FORM</Title>
        <Description>
          <span>You have selected:</span> {programName} ({programAge} yrs) at {programPlace} ({programLocation})
        </Description>
        <BackButton href="/">Back</BackButton>
      </Header>
      <Container>
        <FormSection>
          <Column>
            <Step>
              <h2>STEP 1 - Parent/Guardian Information</h2>
              <Horizontal>
                <FormRow>
                <label>Email:</label>
                <input type="email" name="parentEmail" required />
              </FormRow>
              <FormRow>
                <label>Full Name:</label>
                <input type="text" name="parentName" required />
              </FormRow>
              </Horizontal>
              <Horizontal>
              <FormRow>
                <label>Phone Number:</label>
                <input type="tel" name="parentPhone" required />
              </FormRow>
              <FormRow>
                <label>Address:</label>
                <input type="text" name="parentAddress" required />
              </FormRow></Horizontal>
            </Step>
            <Step>
              <h2>STEP 2 - Child Details</h2>
              <Horizontal>
              <FormRow>
                <label>Full Name:</label>
                <input type="text" name="childName" required />
              </FormRow>
              <FormRow>
                <label>Date of Birth (YYYY/MM/DD):</label>
                <input type="date" name="childDOB" required />
              </FormRow>
              </Horizontal>
            </Step>
          </Column>
          <Column>
            <Step>
              <h4>Optional Parent #2</h4>
              <Horizontal>         
              <FormRow>
                <label>Email:</label>
                <input type="email" name="parent2Email" />
              </FormRow>
              <FormRow>
                <label>Full Name:</label>
                <input type="text" name="parent2Name" />
              </FormRow>
              </Horizontal>   
              <Horizontal>         

              <FormRow>
                <label>Phone Number:</label>
                <input type="tel" name="parent2Phone" />
              </FormRow>
              <FormRow>
                <label>Address:</label>
                <input type="text" name="parent2Address" />
              </FormRow>
              </Horizontal>   
            </Step>
            <Step2>
            <Step>
              <h4>Optional Child #2</h4>
              <Horizontal >              

              <FormRow>
                <label>Full Name:</label>
                <input type="text" name="child2Name" />
              </FormRow>
              <FormRow>
                <label>Date of Birth (YYYY/MM/DD):</label>
                <input type="date" name="child2DOB" />
              </FormRow>
              </Horizontal >
            </Step></Step2>
          </Column>
        </FormSection>
       {/* <NextButton type="submit">Next</NextButton>*/}
        <NextButton onClick={() => handleBuy(programID)} >Next</NextButton>
      </Container>
    </>
  );
};

export default RegistrationForm;

const Horizontal =styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column; /* For screens smaller than 768px, stack items vertically */
  }
`
const Step2 = styled.div`
margin-top: 0.5rem;
`

const Container = styled.div`
  background-color: #f5f5ef;
  max-height:100%;
  height : 500px ;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding-left: 2rem;
  margin: 0; 
  @media (max-width: 767px) {
    padding-left: 1rem;
  }
`;


const Header = styled.div`
  text-align: left;
  background-color: #f5f5ef;
  padding: 2rem ;
  padding-top:5rem ;
`;

const Title = styled.h1`
  color: #12721f;
  font-size: 2rem;
  font-family: "Secular One", sans-serif;
  letter-spacing: 2px;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #88954c;
  margin-bottom: 1rem;
  span{font-weight:bold}
`;

const BackButton = styled.a`
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  color: black;

  &:hover {
    color: #144f07; /* Change color on hover */
  }
`;


const FormSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  h2 {
    color: #12721f;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%; /* Set width to 100% to occupy full space */

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: calc(80% - 0.5rem); /* Set input width to occupy half the space */
    margin-right: 0.5rem; /* Add margin between inputs */
  }
`;

const NextButton = styled.a`
 padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  color: black;

  &:hover {
    color: #144f07; /* Change color on hover */
  }
`;
