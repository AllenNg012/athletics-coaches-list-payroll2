/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PNSST2KpyYZmvZEQWr6oqPxWFqTeH6KbyUOQEYblEKHM3U7XhTCYl4GU6YJ2lYJgmIHB2n0od0V28dGPfw0sXSP00BKh7CEYT");

const RegistrationForm2 = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const gender = queryParams.get("gender");
  const age = queryParams.get("age");
  const sport = queryParams.get("sport");
  const day = queryParams.get("day");
  const programLocation = queryParams.get("location");
  const numberOfChildren = 2;

  const [programs, setPrograms] = useState([]);
  const [childDOBs, setChildDOBs] = useState(["", ""]);
  const [childSelectedTimes, setChildSelectedTimes] = useState([[], []]);
  const [childSelectedClasses, setChildSelectedClasses] = useState([[], []]);
  const [selectedProgramFees, setSelectedProgramFees] = useState([null, null]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [childClasses, setChildClasses] = useState(["", ""]);
  const [childDays, setChildDays] = useState(["", ""]);
  const [additionalComments, setAdditionalComments] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentAddress, setParentAddress] = useState("");

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);
  const [ageFilter, setAgeFilter] = useState(age || '');
  const [sportFilter, setSportFilter] = useState(sport || '');
  const [locationFilter, setLocationFilter] = useState(programLocation || '');
  const [genderFilter, setGenderFilter] = useState(gender || '');
  const [dayFilter, setDayFilter] = useState(day || '');

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

  const handleClassChange = (index, event) => {
    const selectedClassName = event.target.value;
    const selectedProgram = programs.find(program => program.name === selectedClassName);

    const newSelectedProgramFees = [...selectedProgramFees];
    newSelectedProgramFees[index] = selectedProgram ? selectedProgram.fees : null;
    setSelectedProgramFees(newSelectedProgramFees);

    const newSelectedPrograms = [...selectedPrograms];
    newSelectedPrograms[index] = { programID: selectedProgram._id, programFees: selectedProgram.fees, programName: selectedProgram.name, programPlace: selectedProgram.place, programSport: selectedProgram.sport };
    setSelectedPrograms(newSelectedPrograms);

    const newChildClasses = [...childClasses];
    newChildClasses[index] = selectedProgram.name;
    setChildClasses(newChildClasses);

    const newChildDays = [...childDays];
    newChildDays[index] = new Date(selectedProgram.time).toLocaleString();
    setChildDays(newChildDays);
  };

  const handleButtonClick = (index, program) => {
    if (selectedPrograms.some(p => p.programID === program._id)) {
      alert("This program has already been selected. Please choose a different program.");
      return;
    }

    if (window.confirm(`Do you want to add program for child ${index + 1}?`)) {
      const newSelectedPrograms = [...selectedPrograms];
      newSelectedPrograms[index] = { ...program };
      setSelectedPrograms(newSelectedPrograms);

      const newChildClasses = [...childClasses];
      newChildClasses[index] = program.name;
      setChildClasses(newChildClasses);

      const newChildDays = [...childDays];
      newChildDays[index] = new Date(program.time).toLocaleString();
      setChildDays(newChildDays);
    }
  };

  const handleBuy = async () => {
    if (
      !parentEmail ||
      !parentName ||
      !parentPhone ||
      !parentAddress ||
      !childDOBs[0] ||
      !childClasses[0] ||
      !childDays[0] ||
      !childDOBs[1] ||
      !childClasses[1] ||
      !childDays[1]
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const stripe = await stripePromise;

    let totalAmount = selectedPrograms.reduce((total, program) => total + program.fees, 0);
    let discount = 0;

    if (selectedPrograms.length >= 2) {
      discount = totalAmount * 0.10; // 10% discount
    }

    const discountedTotal = totalAmount - discount;
    const discountRate = discountedTotal / totalAmount;

    const lineItems = selectedPrograms.map((program) => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: program.name,
          description: `${program.sport} at ${program.place}`,
        },
        unit_amount: Math.round(program.fees * discountRate * 100),
      },
      quantity: 1,
    }));

    try {
      const response = await axios.post('http://localhost:3001/create-checkout-session', { lineItems });

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

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(-sortOrder);
    } else {
      setSortKey(key);
      setSortOrder(1);
    }
  };

  const getDayFromDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  };

  let filteredPrograms = programs.slice();

  if (ageFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.age === ageFilter);
  }
  if (sportFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.sport === sportFilter);
  }
  if (locationFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.location === locationFilter);
  }
  if (genderFilter) {
    filteredPrograms = filteredPrograms.filter(program => program.gender === genderFilter);
  }
  if (dayFilter) {
    filteredPrograms = filteredPrograms.filter(program => getDayFromDate(program.time) === dayFilter);
  }

  filteredPrograms.sort((a, b) => {
    if (sortKey) {
      if (typeof a[sortKey] === 'string') {
        return a[sortKey].localeCompare(b[sortKey]) * sortOrder;
      } else {
        return (a[sortKey] - b[sortKey]) * sortOrder;
      }
    }
    return 0;
  });

  return (
    <>
      <Header>
        <Title>REGISTRATION FORM({numberOfChildren} Children)</Title>
        <Description>
          <span>You have selected:</span> {gender}, age: {age}, Sport of Choice: {sport}, Location: {programLocation}
        </Description>
        <BackButton href="/survey">Back</BackButton>
      </Header>
      <Container>
        <FormSection>
          <Column>
            <Step>
              <StepTitle>STEP 1 - Parent/Guardian Information</StepTitle>
              <FormRow>
                <InputLabel>Email:</InputLabel>
                <input type="email" name="parentEmail" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required />
                <InputLabel>Full Name:</InputLabel>
                <input type="text" name="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} required />
              </FormRow>
              <FormRow>
                <InputLabel>Phone Number:</InputLabel>
                <input type="tel" name="parentPhone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required />
                <InputLabel>Address:</InputLabel>
                <input type="text" name="parentAddress" value={parentAddress} onChange={(e) => setParentAddress(e.target.value)} required />
              </FormRow>
            </Step>
          </Column>
          <Column>
            <Step>
              <StepTitle>STEP 2 - Child Details</StepTitle>
              <FormRow>
                <InputLabel>Full Name (Child 1):</InputLabel>
                <input type="text" name="childName1" required />
                <InputLabel>Date of Birth (Child 1):</InputLabel>
                <input type="date" name="childDOB1" required onChange={(e) => handleDOBChange(0, e)} />
                <InputLabel>Class (Child 1):</InputLabel>
                <input type="text" name="childClass1" value={childClasses[0]} readOnly required />
                <InputLabel>Day (Child 1):</InputLabel>
                <input type="text" name="childDayOfClass1" value={childDays[0]} readOnly required />
              </FormRow>
              <FormRow>
                <InputLabel>Full Name (Child 2):</InputLabel>
                <input type="text" name="childName2" required />
                <InputLabel>Date of Birth (Child 2):</InputLabel>
                <input type="date" name="childDOB2" required onChange={(e) => handleDOBChange(1, e)} />
                <InputLabel>Class (Child 2):</InputLabel>
                <input type="text" name="childClass2" value={childClasses[1]} readOnly required />
                <InputLabel>Day (Child 2):</InputLabel>
                <input type="text" name="childDayOfClass2" value={childDays[1]} readOnly required />
              </FormRow>
            </Step>
          </Column>
        </FormSection>
        <TableContainer>
          <SmallText>*Red button to add a program for Child 1, Yellow button for Child 2</SmallText>
          {filteredPrograms.length > 0 ? (
            <StyledTable className="table">
              <thead>
                <tr>
                  <StyledTh width="20%" onClick={() => handleSort("name")}>Name {sortKey === "name" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="15%" onClick={() => handleSort("time")}>Time {sortKey === "time" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="30%" onClick={() => handleSort("place")}>Place {sortKey === "place" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="15%" onClick={() => handleSort("fees")}>Program Fees {sortKey === "fees" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="15%">Register</StyledTh>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program, index) => (
                  <tr key={index}>
                    <StyledTd width="20%">{program.name}</StyledTd>
                    <StyledTd width="15%">{new Date(program.time).toLocaleString()}</StyledTd>
                    <StyledTd width="30%">{`${program.place} (${program.location})`}</StyledTd>
                    <StyledTd width="15%">${program.fees} per week</StyledTd>
                    <StyledTd width="15%">
                      <RedLink to="#" onClick={() => handleButtonClick(0, program)} className="btn btn-danger">Register</RedLink>
                      <YellowLink to="#" onClick={() => handleButtonClick(1, program)} className="btn btn-warning">Register</YellowLink>
                    </StyledTd>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          ) : (
            <NoProgramsMessage>No programs are available for the selected criteria.</NoProgramsMessage>
          )}
        </TableContainer>
        <FormSection>
          <Column>
            <Step>
              <StepTitle>Additional Comments/Request</StepTitle>
              <FormRow>
                <TextArea
                  name="additionalComments"
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                  rows="5"
                  cols="50"
                  placeholder="Enter any additional comments or requests here..."
                />
              </FormRow>
            </Step>
          </Column>
        </FormSection>
        <ButtonRow>
          <ConfirmButton onClick={handleBuy}>Confirm & Pay</ConfirmButton>
        </ButtonRow>
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
  max-width: 850px;
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

const TextArea = styled.textarea`
  flex: 1 1 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonRow = styled.div`
  text-align: center;
  margin-top: 20px; /* Ensure it has some spacing from other content */
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

const TableContainer = styled.div`
  width: 100%; /* Adjust to fit the container */
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 3vw;
`;

const SmallText = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-bottom: 10px;
`;

const NoProgramsMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  tr { text-align: center; }
`;

const StyledTh = styled.th`
  width: ${({ width }) => width};
  overflow: hidden;
  cursor: pointer;
`;

const StyledTd = styled.td`
  width: ${({ width }) => width};
  overflow: hidden;
`;

const RedLink = styled.a`
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: darkred;
  }
`;

const YellowLink = styled.a`
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: yellow;
  color: black;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: orange;
  }
`;

export default RegistrationForm2;
