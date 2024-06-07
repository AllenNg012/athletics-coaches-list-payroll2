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
  const [childDOBs, setChildDOBs] = useState(["", "", "", "", ""]);
  const [filteredPrograms, setFilteredPrograms] = useState([[], [], [], [], []]);
  const [selectedDays, setSelectedDays] = useState(["", "", "", "", ""]);
  const [filteredClasses, setFilteredClasses] = useState([[], [], [], [], []]);
  const [addMoreChildren, setAddMoreChildren] = useState(null);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

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
    const ageFilteredPrograms = filterProgramsByAge(age);
    const newFilteredPrograms = [...filteredPrograms];
    newFilteredPrograms[index] = ageFilteredPrograms;
    setFilteredPrograms(newFilteredPrograms);
  };

  const handleDayChange = (index, event) => {
    const newSelectedDays = [...selectedDays];
    newSelectedDays[index] = event.target.value;
    setSelectedDays(newSelectedDays);

    const selectedDayPrograms = filteredPrograms[index].filter(program => 
      new Date(program.time).toLocaleDateString() === event.target.value
    );
    const newFilteredClasses = [...filteredClasses];
    newFilteredClasses[index] = selectedDayPrograms;
    setFilteredClasses(newFilteredClasses);
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

  const handleAddMoreChildrenChange = (event) => {
    setAddMoreChildren(event.target.value === "yes");
  };

  const handleNumberOfChildrenChange = (event) => {
    setNumberOfChildren(parseInt(event.target.value));
  };

  const renderChildDetails = (index) => {
    const childPrograms = filteredPrograms[index];
    const dayOptions = [...new Set(childPrograms.map(program => 
      new Date(program.time).toLocaleDateString()
    ))];

    return (
      <Column key={index}>
        <Step>
          <StepTitle>{`${index + 1}st Child Details`}</StepTitle>
          <FormRow>
            <InputLabel>Full Name:</InputLabel>
            <input type="text" name={`childName${index}`} required />
            <InputLabel>Date of Birth:</InputLabel>
            <input type="date" name={`childDOB${index}`} required onChange={(e) => handleDOBChange(index, e)} />
            <InputLabel>Day:</InputLabel>
            <select name={`childDayOfClass${index}`} required onChange={(e) => handleDayChange(index, e)}>
              <option value="">Select a day</option>
              {dayOptions.map((day, i) => (
                <option key={i} value={day}>{day}</option>
              ))}
            </select>
            <InputLabel>Class:</InputLabel>
            <select name={`childClass${index}`} required>
              <option value="">Select a class</option>
              {filteredClasses[index].map((program, i) => (
                <option key={i} value={program.name}>{program.name}</option>
              ))}
            </select>
          </FormRow>
        </Step>
      </Column>
    );
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
                <input type="text" name="childName0" required />
                <InputLabel>Date of Birth:</InputLabel>
                <input type="date" name="childDOB0" required onChange={(e) => handleDOBChange(0, e)} />
                <InputLabel>Day:</InputLabel>
                <select name="childDayOfClass0" required onChange={(e) => handleDayChange(0, e)}>
                  <option value="">Select a day</option>
                  {[...new Set(filteredPrograms[0].map(program => 
                    new Date(program.time).toLocaleDateString()
                  ))].map((day, i) => (
                    <option key={i} value={day}>{day}</option>
                  ))}
                </select>
                <InputLabel>Class:</InputLabel>
                <select name="childClass0" required>
                  <option value="">Select a class</option>
                  {filteredClasses[0].map((program, i) => (
                    <option key={i} value={program.name}>{program.name}</option>
                  ))}
                </select>
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
          {addMoreChildren && Array.from({ length: numberOfChildren }).map((_, i) => renderChildDetails(i + 1))}
        </FormSection>
        <NextButton onClick={() => handleBuy(programID)}>Next</NextButton>
      </Container>

      <ProgramsContainer>
        <ProgramsTitle>All Available Programs</ProgramsTitle>
        <ProgramsList>
          {filteredPrograms[0].map(program => (
            <ProgramItem key={program._id}>
              <ProgramName>{program.name}</ProgramName>
              <ProgramDetails>{program.age} yrs | {program.place} ({program.location})</ProgramDetails>
              <ProgramDetails>Fees: ${program.fees} per week</ProgramDetails>
            </ProgramItem>
          ))}
        </ProgramsList>
      </ProgramsContainer>
    </>
  );
};

export default RegistrationForm;

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

const Header = styled.div`
  padding-left: 2rem;
  padding-top: 1rem;
  @media (max-width: 767px) {
    padding-left: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #d93b48;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: -1rem;
`;

const FormSection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
`;

const Step = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const StepTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 1rem;
  min-width: 120px;
`;

const BackButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #d93b48;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
`;

const NextButton = styled.button`
  display: inline-block;
  margin-top: 1rem;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #d93b48;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProgramsContainer = styled.div`
  padding: 2rem;
`;

const ProgramsTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const ProgramsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProgramItem = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 1rem;
  margin-bottom: 1rem;
  flex: 1;
  min-width: 220px;
`;

const ProgramName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const ProgramDetails = styled.p`
  font-size: 16px;
  color: #666;
`;
