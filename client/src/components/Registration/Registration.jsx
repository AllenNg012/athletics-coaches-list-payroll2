/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  const programDate = queryParams.get("programDate");

  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [childDOBs, setChildDOBs] = useState(["", "", "", "", ""]);
  const [childSelectedTimes, setChildSelectedTimes] = useState([[], [], [], [], []]);
  const [childSelectedClasses, setChildSelectedClasses] = useState([[], [], [], [], []]);

  useEffect(() => {
    axios.get('http://localhost:3001/programs')
      .then(result => setPrograms(result.data || []))
      .catch(err => console.log(err));
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const filterProgramsByAge = (age) => {
    return programs.filter(program => {
      const [minAge, maxAge] = program.age.split('-').map(Number);
      return age >= minAge && age <= maxAge;
    });
  };

  const handleDOBChange = (index, event) => {
    const newDOBs = [...childDOBs];
    newDOBs[index] = event.target.value;
    setChildDOBs(newDOBs);

    const age = calculateAge(event.target.value);
    const filtered = filterProgramsByAge(age);
    const newChildSelectedTimes = [...childSelectedTimes];
    newChildSelectedTimes[index] = filtered;
    setChildSelectedTimes(newChildSelectedTimes);
    const newChildSelectedClasses = [...childSelectedClasses];
    newChildSelectedClasses[index] = [];
    setChildSelectedClasses(newChildSelectedClasses);
  };

  const handleTimeChange = (index, event) => {
    const selectedDay = event.target.value;
    const filtered = childSelectedTimes[index].filter(program => {
      const programDate = new Date(program.time).toLocaleDateString();
      return programDate === selectedDay;
    });

    const newChildSelectedClasses = [...childSelectedClasses];
    newChildSelectedClasses[index] = filtered;
    setChildSelectedClasses(newChildSelectedClasses);
  };

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

  const [addMoreChildren, setAddMoreChildren] = useState(null);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const handleAddMoreChildrenChange = (event) => {
    setAddMoreChildren(event.target.value === "yes");
  };

  const handleNumberOfChildrenChange = (event) => {
    setNumberOfChildren(parseInt(event.target.value));
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
              <StepTitle>STEP 1 - Parent/Guardian Information</StepTitle>
              <FormRow>
                <InputLabel>Email:</InputLabel>
                <input type="email" name="parentEmail" required />
                <InputLabel>Full Name:</InputLabel>
                <input type="text" name="parentName" required />
              </FormRow>
              <FormRow>
                <InputLabel>Phone Number:</InputLabel>
                <input type="tel" name="parentPhone" required />
                <InputLabel>Address:</InputLabel>
                <input type="text" name="parentAddress" required />
              </FormRow>
            </Step>
          </Column>
          <Column>
            <Step>
              <StepTitle>STEP 2 - Child Details</StepTitle>
              <FormRow>
                <InputLabel>Full Name:</InputLabel>
                <input type="text" name="childName" required />
                <InputLabel>Date of Birth:</InputLabel>
                <input type="date" name="childDOB" required onChange={(e) => handleDOBChange(0, e)} />
                <InputLabel>Day:</InputLabel>
                <input type="text" name="childDayOfClass" value={new Date(programDate).toLocaleDateString()} readOnly required />
                <InputLabel>Class:</InputLabel>
                <input type="text" name="childClass" value={programName} readOnly required />
              </FormRow>
            </Step>
          </Column>
          <FormRow>
            <InputLabel>Do you want to add more child(ren)?</InputLabel>
            <label>
              <input
                type="radio"
                name="addMoreChildren"
                value="yes"
                checked={addMoreChildren === true}
                onChange={handleAddMoreChildrenChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="addMoreChildren"
                value="no"
                checked={addMoreChildren === false}
                onChange={handleAddMoreChildrenChange}
              />
              No
            </label>
          </FormRow>
          {addMoreChildren && (
            <FormRow>
              <InputLabel>How many?</InputLabel>
              <select value={numberOfChildren} onChange={handleNumberOfChildrenChange}>
                <option value="0">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </FormRow>
          )}
          {addMoreChildren && numberOfChildren >= 1 && (
            <Column>
              <Step>
                <StepTitle>2nd Child Details</StepTitle>
                <FormRow>
                  <InputLabel>Full Name:</InputLabel>
                  <input type="text" name="childName" required />
                  <InputLabel>Date of Birth:</InputLabel>
                  <input type="date" name="childDOB" required onChange={(e) => handleDOBChange(1, e)} />
                  <InputLabel>Day:</InputLabel>
                  <select name="childDayOfClass" required onChange={(e) => handleTimeChange(1, e)}>
                    <option value="">Select a day</option>
                    {childSelectedTimes[1].map(program => (
                      <option key={program._id} value={new Date(program.time).toLocaleDateString()}>
                        {new Date(program.time).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  <InputLabel>Class:</InputLabel>
                  <select name="childClass" required>
                    <option value="">Select a class</option>
                    {childSelectedClasses[1].map(program => (
                      <option key={program._id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </FormRow>
              </Step>
            </Column>
          )}
          {addMoreChildren && numberOfChildren >= 2 && (
            <Column>
              <Step>
                <StepTitle>3rd Child Details</StepTitle>
                <FormRow>
                  <InputLabel>Full Name:</InputLabel>
                  <input type="text" name="childName" required />
                  <InputLabel>Date of Birth:</InputLabel>
                  <input type="date" name="childDOB" required onChange={(e) => handleDOBChange(2, e)} />
                  <InputLabel>Day:</InputLabel>
                  <select name="childDayOfClass" required onChange={(e) => handleTimeChange(2, e)}>
                    <option value="">Select a day</option>
                    {childSelectedTimes[2].map(program => (
                      <option key={program._id} value={new Date(program.time).toLocaleDateString()}>
                        {new Date(program.time).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  <InputLabel>Class:</InputLabel>
                  <select name="childClass" required>
                    <option value="">Select a class</option>
                    {childSelectedClasses[2].map(program => (
                      <option key={program._id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </FormRow>
              </Step>
            </Column>
          )}
          {addMoreChildren && numberOfChildren >= 3 && (
            <Column>
              <Step>
                <StepTitle>4th Child Details</StepTitle>
                <FormRow>
                  <InputLabel>Full Name:</InputLabel>
                  <input type="text" name="childName" required />
                  <InputLabel>Date of Birth:</InputLabel>
                  <input type="date" name="childDOB" required onChange={(e) => handleDOBChange(3, e)} />
                  <InputLabel>Day:</InputLabel>
                  <select name="childDayOfClass" required onChange={(e) => handleTimeChange(3, e)}>
                    <option value="">Select a day</option>
                    {childSelectedTimes[3].map(program => (
                      <option key={program._id} value={new Date(program.time).toLocaleDateString()}>
                        {new Date(program.time).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  <InputLabel>Class:</InputLabel>
                  <select name="childClass" required>
                    <option value="">Select a class</option>
                    {childSelectedClasses[3].map(program => (
                      <option key={program._id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </FormRow>
              </Step>
            </Column>
          )}
          {addMoreChildren && numberOfChildren >= 4 && (
            <Column>
              <Step>
                <StepTitle>5th Child Details</StepTitle>
                <FormRow>
                  <InputLabel>Full Name:</InputLabel>
                  <input type="text" name="childName" required />
                  <InputLabel>Date of Birth:</InputLabel>
                  <input type="date" name="childDOB" required onChange={(e) => handleDOBChange(4, e)} />
                  <InputLabel>Day:</InputLabel>
                  <select name="childDayOfClass" required onChange={(e) => handleTimeChange(4, e)}>
                    <option value="">Select a day</option>
                    {childSelectedTimes[4].map(program => (
                      <option key={program._id} value={new Date(program.time).toLocaleDateString()}>
                        {new Date(program.time).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  <InputLabel>Class:</InputLabel>
                  <select name="childClass" required>
                    <option value="">Select a class</option>
                    {childSelectedClasses[4].map(program => (
                      <option key={program._id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </FormRow>
              </Step>
            </Column>
          )}
        </FormSection>
        <NextButton onClick={() => handleBuy(programID)}>Next</NextButton>
      </Container>
    </>
  );
};

export default RegistrationForm;

const Header = styled.div`
  text-align: left;
  background-color: #f5f5ef;
  padding: 2rem;
  padding-top: 5rem;
`;

const Title = styled.h1`
  color: #2E82BE;
  font-size: 2rem;
  font-family: "Secular One", sans-serif;
  letter-spacing: 2px;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #2E82BE;
  margin-bottom: 1rem;
  span {
    font-weight: bold;
  }
`;

const BackButton = styled.a`
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  color: black;

  &:hover {
    color: #2E82BE;
  }
`;

const Container = styled.div`
  background-color: #f5f5ef;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
  @media (max-width: 767px) {
    padding-left: 1rem;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const Column = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const StepTitle = styled.h2`
  color: #2E82BE;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  flex-grow: 1;
`;

const InputLabel = styled.label`
  margin-bottom: 0.5rem;
  flex: 0 0 10%;
`;

const NextButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  color: black;
  text-align: left;

  &:hover {
    color: #144f07;
  }
`;
