/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import logo from './logo.jpg';
import arrow from './arrow.png'

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

  const [selectedForFirstChild, setSelectedForFirstChild] = useState(null);
  const [selectedForSecondChild, setSelectedForSecondChild] = useState(null);

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

  const handleNextClick = async () => {
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
    if (!selectedForFirstChild || !selectedForSecondChild) {
      alert("Please select programs for both children before proceeding.");
      return;
    }

    const selectedPrograms = [
      programs.find(program => program._id === selectedForFirstChild),
      programs.find(program => program._id === selectedForSecondChild)
    ];

    const stripe = await stripePromise;

    let totalAmount = selectedPrograms.reduce((total, program) => total + program.fees, 0);
    let discount = 0;

    // Apply a 10% discount if more than one program is selected
    if (selectedPrograms.length >= 2) {
      discount = totalAmount * 0.10; // 10% discount
    }

    const discountedTotal = totalAmount - discount;
    const discountRate = discount > 0 ? discountedTotal / totalAmount : 1;

    const lineItems = selectedPrograms.map(program => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: `${program.name} (${program.sport})`,
          description: `Program at ${program.place}`
        },
        unit_amount: Math.round(program.fees * discountRate * 100), // Calculate discounted price
      },
      quantity: 1
    }));

    try {
      const response = await axios.post('http://localhost:3001/create-checkout-session', {
        lineItems,
        customerEmail: parentEmail
      });
      const sessionId = response.data.id;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
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

  const handleRegisterSelections = () => {
    // Confirm before proceeding with registration
    if (window.confirm("Do you want to register the selected program(s)?")) {
      if (selectedForFirstChild) {
        const selectedProgramForFirst = programs.find(program => program._id === selectedForFirstChild);
        if (selectedProgramForFirst) {
          setChildClasses(prevClasses => [selectedProgramForFirst.name, prevClasses[1]]);
          setChildDays(prevDays => [new Date(selectedProgramForFirst.time).toLocaleString(), prevDays[1]]);
        }
      }

      if (selectedForSecondChild) {
        const selectedProgramForSecond = programs.find(program => program._id === selectedForSecondChild);
        if (selectedProgramForSecond) {
          setChildClasses(prevClasses => [prevClasses[0], selectedProgramForSecond.name]);
          setChildDays(prevDays => [prevDays[0], new Date(selectedProgramForSecond.time).toLocaleString()]);
        }
      }
    } else {
      console.log("Registration canceled by user.");
    }
  };

  return (
    <>
          <BGI>
        <Header>
          <div>
            <Title>REGISTRATION FORM ({numberOfChildren} Children)</Title>
            <Description>
            <D_title>SELECTED: <br /></D_title>
              {gender} | Age: {age} | Class: {sport} | Location: {programLocation} | {"1 child added"}
            </Description>
          </div>
          <BackButton href="/survey">Back</BackButton>
        </Header>
      <Container>
        <FormSection>
          <Column>
            <Step>
              <StepTitle>STEP 1 - Parent/Guardian Information</StepTitle>
              <FormRow>
                <InputLabel>Email:</InputLabel>
                <InputLabel>Full Name:</InputLabel>
                <InputLabel>Phone Number:</InputLabel>
                <InputLabel>Address:</InputLabel>
              </FormRow>
              <FormRow>
              <InputLabel>
                <StyledInputShort type="email" name="parentEmail" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required />
                </InputLabel>
                <InputLabel><StyledInputShort type="text" name="parentName" value={parentName} onChange={(e) => setParentName(e.target.value)} required /></InputLabel>
                <InputLabel><StyledInputShort type="tel" name="parentPhone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required /></InputLabel>
                <InputLabel><StyledInputShort type="text" name="parentAddress" value={parentAddress} onChange={(e) => setParentAddress(e.target.value)} required /></InputLabel>
              </FormRow>
            </Step>
          </Column>
          <Column>
            <Step>
              <StepTitle>STEP 2 - Child Details</StepTitle>
              <FormRow>
                <InputLabel>Full Name (Child 1):</InputLabel>
                <InputLabel>Date of Birth (Child 1):</InputLabel>
                <InputLabel>Class (Child 1):</InputLabel>
                <InputLabel>Day (Child 1):</InputLabel>
              </FormRow>
              <FormRow>
                <StyledInputShort type="text" name="childName1" required />
                <StyledInputShort type="date" name="childDOB1" required onChange={(e) => handleDOBChange(0, e)} />
                <StyledInputShort type="text" name="childClass1" value={childClasses[0]} readOnly required />
                <StyledInputShort type="text" name="childDayOfClass1" value={childDays[0]} readOnly required />
              </FormRow>
              <FormRow>
                <InputLabel>Full Name (Child 2):</InputLabel>
                <InputLabel>Date of Birth (Child 2):</InputLabel>
                <InputLabel>Class (Child 2):</InputLabel>
                <InputLabel>Day (Child 2):</InputLabel>
              </FormRow>
              <FormRow>
                <StyledInputShort type="text" name="childName2" required />
                <StyledInputShort type="date" name="childDOB2" required onChange={(e) => handleDOBChange(1, e)} />
                <StyledInputShort type="text" name="childClass2" value={childClasses[1]} readOnly required />
                <StyledInputShort type="text" name="childDayOfClass2" value={childDays[1]} readOnly required />
              </FormRow>
            </Step>
          </Column>
        </FormSection>
        <StepTitle2>Program select : click for register</StepTitle2>
        <TableContainer>
          {/* 
          <SmallText>*Red button to add a program for Child 1, Yellow button for Child 2</SmallText>
          */}
          {filteredPrograms.length > 0 ? (
            <StyledTable className="table">
              <thead>
                <tr>
                  <StyledTh>Name</StyledTh>
                  <StyledTh>Time</StyledTh>
                  <StyledTh>Place</StyledTh>
                  <StyledTh>Program Fees</StyledTh>
                  <StyledTh>1st Child Selection</StyledTh>
                  <StyledTh>2nd Child Selection</StyledTh>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program, index) => (
                  <tr key={index}>
                    <StyledTd>{program.name}</StyledTd>
                    <StyledTd>{new Date(program.time).toLocaleString()}</StyledTd>
                    <StyledTd>{program.place}</StyledTd>
                    <StyledTd>${program.fees}</StyledTd>
                    <StyledTd>
                      <input
                        type="checkbox"
                        checked={selectedForFirstChild === program._id}
                        onChange={() => {
                          if (selectedForFirstChild === program._id) {
                            setSelectedForFirstChild(null);
                          } else {
                            setSelectedForFirstChild(program._id);
                          }
                        }}
                        disabled={selectedForFirstChild !== null && selectedForFirstChild !== program._id}
                      />
                    </StyledTd>
                    <StyledTd>
                      <input
                        type="checkbox"
                        checked={selectedForSecondChild === program._id}
                        onChange={() => {
                          if (selectedForSecondChild === program._id) {
                            setSelectedForSecondChild(null);
                          } else {
                            setSelectedForSecondChild(program._id);
                          }
                        }}
                        disabled={selectedForSecondChild !== null && selectedForSecondChild !== program._id}
                      />
                    </StyledTd>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          ) : (
            <NoProgramsMessage>No programs are available for the selected criteria.</NoProgramsMessage>
          )}
          <RegisterButton onClick={handleRegisterSelections}>Register</RegisterButton>
        </TableContainer>
        <FormSection>
          <Column>
            <Step>
              <StepTitle3>Does the participant have any medical conditions or allergies we should be aware of:</StepTitle3>
              <FormRowHorizontal>
                <TextArea
                  name="additionalComments"
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                  rows="5"
                  cols="120"
                  placeholder="Enter any additional comments or requests here..."
                />
                <ButtonRow>
                  <ConfirmButton onClick={handleNextClick}>
                    Next
                    <img src={arrow} alt="Next" />
                  </ConfirmButton>
                </ButtonRow>
              </FormRowHorizontal>
            </Step>
          </Column>
        </FormSection>
      </Container>
      </BGI>
    </>
  );
};

const BGI = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding-top: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${logo}) no-repeat center center;
    background-size: 45%;
    opacity: 0.4;
    z-index: -1;
  }
`;

const Header = styled.div`
  padding: 0px 20px;
  padding-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 90%;
  margin: 20px auto;
`;

const Title = styled.h1`
  font-weight: 800;
  margin: 0;
  color: #95071A;
`;

const D_title = styled.div`
  margin: 0;
  color: #95071A; 
  font-weight: 800;
`;
const Description = styled.p`
  margin: 10px 0;
  color: #000000;
  font-weight: 800;
`;


const BackButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffffff;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 800;

  &:hover {
    color: #5e0511;
  }
`;

const Container = styled.div`
  max-width: 90%;
  margin: 0px auto;
  padding: 0px 20px;
`;

const FormSection = styled.div``;

const Column = styled.div``;

const Step = styled.div`
  margin-bottom: 20px;
`;

const StepTitle = styled.div`
  margin-bottom: 10px;
  color: #95071A;
  font-size: 19.5px;
  font-weight: bold;
`;

const StepTitle2 = styled.h6`
  margin-top: 3vw;
  margin-left: 1vw;
`;

const StepTitle3 = styled.h5`
  margin-bottom: 10px;
  font-weight: 600;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const FormRowHorizontal = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const InputLabel = styled.label`
  flex: 1 1 25%;
  margin-bottom: 0;
  color: #000000;
  padding: 10px 0;
`;

const StyledInputShort = styled.input`
  border-radius: 50px;
  border: 1px solid;
  flex: 1 1 25%;
  margin-right: 140px;
`;

const TextArea = styled.textarea`
  flex: 1 1 80%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonRow = styled.div`
  margin-top: 20px;
  flex: 1 1 20%;
  display: flex;
  justify-content: flex-end;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 25px;
  font-weight: 800;

  &:hover {
    color: #5e0511;
  }

  img {
    margin-left: 5px;
    width: 20px;
    height: auto;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 0px 16px 16px 16px;
`;

const SmallText = styled.p`
  font-size: 20px;
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
`;

const NoProgramsMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;

const StyledTable = styled.table`
  border-color: #95071A;
  width: 100%;
  table-layout: fixed;
  tr {
    text-align: center;
  }
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

const RegisterButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: calc(7.2%);

  &:hover {
    background-color: #45a049;
  }
`;

export default RegistrationForm2;
