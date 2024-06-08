// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  const addMoreChildren = queryParams.get("addMoreChildren") === "true";
  const numberOfChildren = parseInt(queryParams.get("numberOfChildren"), 10);

  const [programs, setPrograms] = useState([]);
  const [childDOBs, setChildDOBs] = useState(["", "", "", "", ""]);
  const [childSelectedTimes, setChildSelectedTimes] = useState([[], [], [], [], []]);
  const [childSelectedClasses, setChildSelectedClasses] = useState([[], [], [], [], []]);
  const [selectedProgramFees, setSelectedProgramFees] = useState([null, null, null, null, null]);
  const [selectedPrograms, setSelectedPrograms] = useState([{ programID, programFees, programName, programPlace, programSport: queryParams.get("sport") }]);
  const [discountCode, setDiscountCode] = useState("");

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

    // Clear the selected class and fees when the day changes
    const newSelectedProgramFees = [...selectedProgramFees];
    newSelectedProgramFees[index] = null;
    setSelectedProgramFees(newSelectedProgramFees);
  };

  const handleClassChange = (index, event) => {
    const selectedClassName = event.target.value;
    const selectedProgram = programs.find(program => program.name === selectedClassName);

    const newSelectedProgramFees = [...selectedProgramFees];
    newSelectedProgramFees[index] = selectedProgram ? selectedProgram.fees : null;
    setSelectedProgramFees(newSelectedProgramFees);

    const newSelectedPrograms = [...selectedPrograms];
    newSelectedPrograms[index] = { programID: selectedProgram._id, programFees: selectedProgram.fees, programName: selectedProgram.name, programPlace: selectedProgram.place, programSport: selectedProgram.sport };
    setSelectedPrograms(newSelectedPrograms);

    console.log("Selected Programs:", newSelectedPrograms);
  };

  const handleDiscountCodeChange = (event) => {
    setDiscountCode(event.target.value);
  };

  const handleBuy = async () => {
    const stripe = await stripePromise;

    const lineItems = selectedPrograms.map((program) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: program.programName,
          description: `${program.programSport} at ${program.programPlace}`,
        },
        unit_amount: program.programFees * 100,
      },
      quantity: 1,
    }));

    console.log("Line Items:", lineItems);

    try {
      const response = await axios.post('http://localhost:3001/create-checkout-session', { lineItems, discountCode });

      console.log("Stripe Response:", response.data);

      const sessionId = response.data.id;

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Create a function to render program names on the calendar
  const renderProgramsOnDate = (date) => {
    const programsOnDate = programs.filter(program => {
      const programDate = new Date(program.time).toLocaleDateString();
      return programDate === date.toLocaleDateString();
    });

    return (
      <div>
        {programsOnDate.map(program => (
          <div key={program._id} style={{ fontSize: '12px', color: '#000' }}>{program.name}</div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header>
        <Title>REGISTRATION FORM(Case 2)</Title>
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
          {addMoreChildren && Array.from({ length: numberOfChildren }, (_, index) => (
            <Column key={index + 1}>
              <Step>
                <StepTitle>{index + 2}nd Child Details</StepTitle>
                <FormRow>
                  <InputLabel>Full Name:</InputLabel>
                  <input type="text" name="childName" required />
                  <InputLabel>Date of Birth:</InputLabel>
                  <input type="date" name="childDOB" required onChange={(e) => handleDOBChange(index + 1, e)} />
                  <InputLabel>Day:</InputLabel>
                  <select name="childDayOfClass" required onChange={(e) => handleTimeChange(index + 1, e)}>
                    <option value="">Select a day</option>
                    {childSelectedTimes[index + 1].map(program => (
                      <option key={program._id} value={new Date(program.time).toLocaleDateString()}>
                        {new Date(program.time).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                  <InputLabel>Class:</InputLabel>
                  <select name="childClass" required onChange={(e) => handleClassChange(index + 1, e)}>
                    <option value="">Select a class</option>
                    {childSelectedClasses[index + 1].map(program => (
                      <option key={program._id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  {selectedProgramFees[index + 1] !== null && (
                    <p>Fees: ${selectedProgramFees[index + 1]}</p>
                  )}
                </FormRow>
              </Step>
            </Column>
          ))}
        </FormSection>
        <FormRow>
          <InputLabel>Discount Code:</InputLabel>
          <input type="text" value={discountCode} onChange={handleDiscountCodeChange} />
        </FormRow>
        <ButtonRow>
          <ConfirmButton onClick={handleBuy}>Confirm & Pay</ConfirmButton>
        </ButtonRow>

        <CalendarContainer>
          <TableTitle>Available Programs</TableTitle>
          <Calendar
            tileContent={({ date, view }) => view === 'month' && renderProgramsOnDate(date)}
          />
        </CalendarContainer>
      </Container>
    </>
  );
};

const Header = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const Description = styled.p`
  margin: 10px 0;
  color: #666;
`;

const BackButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const Column = styled.div`
  margin-bottom: 20px;
`;

const Step = styled.div`
  margin-bottom: 20px;
`;

const StepTitle = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;

  & > * {
    margin-right: 10px;
  }
`;

const InputLabel = styled.label`
  flex: 1 1 150px;
  margin-bottom: 5px;
  color: #666;
`;

const ButtonRow = styled.div`
  text-align: center;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CalendarContainer = styled.div`
  margin-top: 40px;
`;

const TableTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

export default RegistrationForm;
