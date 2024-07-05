/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import logo from './logo.jpg';
import arrow from './arrow.png';

const stripePromise = loadStripe("pk_test_51PNSST2KpyYZmvZEQWr6oqPxWFqTeH6KbyUOQEYblEKHM3U7XhTCYl4GU6YJ2lYJgmIHB2n0od0V28dGPfw0sXSP00BKh7CEYT");

const RegistrationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const gender = queryParams.get("gender");
  const age = queryParams.get("age");
  const sport = queryParams.get("sport");
  const day = queryParams.get("day");
  const programLocation = queryParams.get("location");
  const addMoreChildren = queryParams.get("addMoreChildren") === "true";
  const numberOfChildren = addMoreChildren ? 2 : 1; // Adjust as needed

  const [programs, setPrograms] = useState([]);
  const [childDOBs, setChildDOBs] = useState(["", "", "", "", ""]);
  const [childSelectedTimes, setChildSelectedTimes] = useState([[], [], [], [], []]);
  const [childSelectedClasses, setChildSelectedClasses] = useState([[], [], [], [], []]);
  const [selectedProgramFees, setSelectedProgramFees] = useState([null, null, null, null, null]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [childClass, setChildClass] = useState("");
  const [childDay, setChildDay] = useState("");
  const [secondClass, setSecondClass] = useState("");
  const [secondDay, setSecondDay] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

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

  const handleRedButtonClick = (program) => {
    if (secondClass === program.name) {
      alert("You cannot select the same program for the 1st program that is already selected as the 2nd program. Please choose a different program.");
      return;
    }

    if (window.confirm("Do you want to add 1st program?")) {
      setChildClass(program.name);
      setChildDay(new Date(program.time).toLocaleString());
      if (!selectedPrograms.some(p => p.programID === program._id)) {
        setSelectedPrograms([{ ...program }]);
      }
    }
  };

  const handleBlueButtonClick = (program) => {
    if (!childClass || !childDay) {
      alert("You should select 1st program first");
      return;
    }

    if (childClass === program.name) {
      alert("You cannot select the same program for the 2nd program. Please choose a different program.");
      return;
    }

    if (window.confirm("Do you want to add 2nd program?")) {
      setSecondClass(program.name);
      setSecondDay(new Date(program.time).toLocaleString());
      if (!selectedPrograms.some(p => p.programID === program._id)) {
        setSelectedPrograms([...selectedPrograms, { ...program }]);
      }
    }
  };

  const handleRemoveSecondProgram = () => {
    if (window.confirm("Are you sure you want to remove the 2nd program?")) {
      // Find the program ID for the second class
      const secondProgram = programs.find(program => program.name === secondClass);

      if (secondProgram) {
        // Unselect the checkbox for the second program
        const newSelectedPrograms = { ...selectedPrograms };
        delete newSelectedPrograms[secondProgram._id];
        setSelectedPrograms(newSelectedPrograms);
      }

      setSecondClass("");
      setSecondDay("");
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

  const handleCheckboxChange = (programId) => {
    setSelectedPrograms(prev => {
      const currentlySelected = Object.keys(prev).filter(key => prev[key]).length; // Count how many are currently true
      const isCurrentlySelected = prev[programId];

      // If trying to select more than allowed and the current one isn't already selected
      if (currentlySelected >= 2 && !isCurrentlySelected) {
        alert("You can only select up to 2 programs.");
        return prev; // Return the current state without changes
      }

      // Otherwise, toggle the selected state
      return {
        ...prev,
        [programId]: !isCurrentlySelected
      };
    });
  };

  const handleRegisterSelected = () => {

    const selectedProgramIds = Object.keys(selectedPrograms).filter(id => selectedPrograms[id]);

    if (selectedProgramIds.length === 0) {
      alert("Please select at least one program to register.");
      return;
    }

    // Fetch details of the selected programs
    const selectedDetails = filteredPrograms.filter(program => selectedProgramIds.includes(program._id));

    // Confirm before proceeding with any registration
    if (window.confirm("Do you want to register the selected program(s)?")) {
      if (selectedDetails.length > 0) {
        // Set the first selected detail
        setChildClass(selectedDetails[0].name);
        setChildDay(new Date(selectedDetails[0].time).toLocaleDateString());

        // Check if there is a second selection and update accordingly
        if (selectedDetails.length > 1) {
          setSecondClass(selectedDetails[1].name);
          setSecondDay(new Date(selectedDetails[1].time).toLocaleDateString());
        } else {
          // Reset the second child details if no second program is selected
          setSecondClass("");
          setSecondDay("");
        }
        // After registering, reset selected programs to allow new selections
      }
    } else {
      // Log or handle the cancellation case
      console.log("Registration cancelled by user.");
      // Optionally, reset selected states here if needed
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    // Validate all required fields before proceeding
    const parentEmail = document.querySelector('input[name="parentEmail"]').value;
    const parentName = document.querySelector('input[name="parentName"]').value;
    const parentPhone = document.querySelector('input[name="parentPhone"]').value;
    const parentAddress = document.querySelector('input[name="parentAddress"]').value;
    const childName = document.querySelector('input[name="childName"]').value;
    const childDOB = document.querySelector('input[name="childDOB"]').value;
    const childClassInput = document.querySelector('input[name="childClass"]').value;
    const childDayOfClass = document.querySelector('input[name="childDayOfClass"]').value;

    if (!parentEmail || !parentName || !parentPhone || !parentAddress || !childName || !childDOB || !childClassInput || !childDayOfClass ||
      (secondClass && (!document.querySelector('input[name="secondClass"]').value || !document.querySelector('input[name="secondDayOfClass"]').value))) {
      alert("Please fill in all required fields.");
      return;
    }

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

    // TODO: Add parentAddress to backend
    // console.log("e.target.parentAddress:", e.target.parentAddress.value);
    // TODO: bookingID, end, makeupClasses and ** amount and program is different if second program is applied **
    const newRegistration = {
      bookingID: 1,
      parentName: e.target.parentName.value,
      childName: e.target.childName.value,
      childBirth: e.target.childDOB.value,
      email: e.target.parentEmail.value,
      phone: e.target.parentPhone.value,
      program: e.target.childClass.value,
      amount: lineItems[0].price_data.unit_amount / 100,
      start: e.target.childDayOfClass.value,
      end: "2029-12-31",
      secondProgram: e.target.secondClass ? e.target.secondClass.value : "",
      secondAmount: lineItems.length > 1 ? lineItems[1].price_data.unit_amount / 100 : 0,
      secondStart: e.target.secondDayOfClass ? e.target.secondDayOfClass.value : "",
      makeupClasses: "None",
      notes: e.target.additionalComments.value,
    };

    // Create a new registration to backend registration form
    // TODO: save the following url in environment variable
    // TODO: Add feature to handle amount when successful registration and unsuccessful registration (determine by stripe payment status)
    const url = 'http://localhost:8000';
    try {
      const response = await axios.post(`${url}/api/createRegistration`, newRegistration);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 error (Capacity reached)
        console.error('Error creating Registration:', error.response.data.message);
        alert(`Registration Error: ${error.response.data.message}`);
      } else {
        // Handle other errors
        console.error('Error creating Registration:', error.message);
        alert('An error occurred while creating the registration. Please try again.');
      }
      // Stop the process if there is an error
      return;
    }

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

  const handleNextClick = async (e) => {
    e.preventDefault();
    
    // Retrieve the form element
    const form = e.target.closest('form');
    
    // Check if the form is valid
    if (!form.checkValidity()) {
      // If the form is invalid, display validation messages
      form.reportValidity();
      return;
    }
  
    // Proceed with existing logic if the form is valid
    const parentEmail = document.querySelector('input[name="parentEmail"]').value;
    const parentName = document.querySelector('input[name="parentName"]').value;
    const parentPhone = document.querySelector('input[name="parentPhone"]').value;
    const parentAddress = document.querySelector('input[name="parentAddress"]').value;
    const childName = document.querySelector('input[name="childName"]').value;
    const childDOB = document.querySelector('input[name="childDOB"]').value;
    const childClassInput = document.querySelector('input[name="childClass"]').value;
    const childDayOfClass = document.querySelector('input[name="childDayOfClass"]').value;
  
    if (!parentEmail || !parentName || !parentPhone || !parentAddress || !childName || !childDOB || !childClassInput || !childDayOfClass ||
      (secondClass && (!document.querySelector('input[name="secondClass"]').value || !document.querySelector('input[name="secondDayOfClass"]').value))) {
      alert("Please fill in all required fields.");
      return;
    }
    const selectedProgramIds = Object.keys(selectedPrograms).filter(id => selectedPrograms[id]);
  
    if (selectedProgramIds.length === 0) {
      alert("Please select at least one program to proceed to payment.");
      return;
    }
  
    // Retrieve the selected programs details
    const selectedDetails = programs.filter(program => selectedProgramIds.includes(program._id));
  
    if (selectedDetails.length > 0) {
      const stripe = await stripePromise;
  
      let totalAmount = selectedDetails.reduce((total, program) => total + program.fees, 0);
      let discount = 0;
  
      // Apply a discount if more than one program is selected
      if (selectedDetails.length >= 2) {
        discount = totalAmount * 0.10; // 10% discount
      }
  
      const discountedTotal = totalAmount - discount;
      const discountRate = discountedTotal / totalAmount;
  
      const lineItems = selectedDetails.map(program => ({
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
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe checkout error:", error);
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    } else {
      console.log("No programs selected or an error occurred.");
    }
  };
  

  return (
    <>
      <BGI>
        <Header>
          <div>
            <Title>REGISTRATION FORM ({numberOfChildren} {numberOfChildren > 1 ? 'Children' : 'Child'})</Title>
            <Description>
              <D_title>SELECTED: <br /></D_title>
              {gender} | Age: {age} | Class: {sport} | Location: {programLocation} | {addMoreChildren ? "child added" : "No child added"}
            </Description>
          </div>
          <BackButton href="/survey">Back</BackButton>
        </Header>

        <Container onSubmit={handleBuy}>
          <FormSection>
            <Column>
              <Step>
                <StepTitle>STEP 1 - Parent/Guardian Information</StepTitle>
                <FormRow>
                  <InputField>
                    <InputLabel>Email:</InputLabel>
                    <InputLabel>Full Name:</InputLabel>
                    <InputLabel>Phone Number:</InputLabel>
                    <InputLabel>Address:</InputLabel>
                  </InputField>
                  <InputField>
                    <InputLabel>
                      <StyledInput type="email" name="parentEmail" required /></InputLabel>
                    <InputLabel>
                      <StyledInput type="text" name="parentName" required /></InputLabel>
                    <InputLabel>
                      <StyledInput type="tel" name="parentPhone" required /></InputLabel>
                    <InputLabel>
                      <StyledInput type="text" name="parentAddress" required /></InputLabel>
                  </InputField>
                </FormRow>
              </Step>
            </Column>
            <Column>
              <Step>
                <StepTitle>STEP 2 - Child Details</StepTitle>
                <Step2FormRow>
                  <InputField>
                    <Step2InputLabel>Full Name:</Step2InputLabel>
                    <Step2InputLabel>Date of Birth:</Step2InputLabel>
                    <Step2InputLabel>Class:</Step2InputLabel>
                    <Step2InputLabel>Start Day:</Step2InputLabel>
                  </InputField>
                  <InputField>
                    <Step2InputField>
                      <StyledInput type="text" name="childName" required />
                    </Step2InputField>
                    <Step2InputField>
                      <StyledInput type="date" name="childDOB" required onChange={(e) => handleDOBChange(0, e)} />
                    </Step2InputField>
                    <Step2InputField>
                      <StyledInput type="text" name="childClass" value={childClass} readOnly required />
                    </Step2InputField>
                    <Step2InputField>
                      <StyledInput type="text" name="childDayOfClass" value={childDay} readOnly required />
                    </Step2InputField>
                  </InputField>
                </Step2FormRow>
                {secondClass && (
                  <Step2FormRow>
                    <InputField>
                    <Step2InputLabel></Step2InputLabel>
                    <Step2InputLabel></Step2InputLabel>
                    <Step2InputLabel>2nd Class:</Step2InputLabel>
                    <Step2InputLabel>2nd Start Day: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <RemoveButton onClick={handleRemoveSecondProgram}>x</RemoveButton>
                    </Step2InputLabel>
                    </InputField>
                    <InputField>
                    <Step2InputField></Step2InputField>
                    <Step2InputField></Step2InputField>
                      <Step2InputField>
                        <StyledInput type="text" name="secondClass" value={secondClass} readOnly required />
                      </Step2InputField>
                      <Step2InputField>
                        <StyledInput type="text" name="secondDayOfClass" value={secondDay} readOnly required />
                      </Step2InputField>
                    </InputField>
                  </Step2FormRow>
                )}
              </Step>
            </Column>
            {addMoreChildren && Array.from({ length: numberOfChildren - 1 }, (_, index) => (
              <Column key={index + 1}>
                <Step>
                  <StepTitle>{index + 2}nd Child Details</StepTitle>
                  <FormRow>
                    <InputLabel>Full Name:</InputLabel>
                    <StyledInput type="text" name="childName" required />
                    <InputLabel>Date of Birth:</InputLabel>
                    <StyledInput type="date" name="childDOB" required onChange={(e) => handleDOBChange(index + 1, e)} />
                    <InputLabel>Class:</InputLabel>
                    <select name="childClass" required onChange={(e) => handleClassChange(index + 1, e)}>
                      <option value="">Select a class</option>
                      {childSelectedClasses[index + 1].map(program => (
                        <option key={program._id} value={program.name}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                    <InputLabel>Day:</InputLabel>
                    <select name="childDayOfClass" required onChange={(e) => handleTimeChange(index + 1, e)}>
                      <option value="">Select a day</option>
                      {childSelectedTimes[index + 1].map(program => (
                        <option key={program._id} value={new Date(program.time).toLocaleDateString()}>
                          {new Date(program.time).toLocaleDateString()}
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
          <StepTitle2>Program select : click for register</StepTitle2>
          <TableContainer>
            <StyledTable className="table">
              <thead>
                <tr>
                  <StyledTh width="20%" onClick={() => handleSort("name")}>Name {sortKey === "name" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="18%" onClick={() => handleSort("time")}>Time {sortKey === "time" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="25%" onClick={() => handleSort("place")}>Place {sortKey === "place" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="15%" onClick={() => handleSort("fees")}>Program Fees {sortKey === "fees" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
                  <StyledTh width="22%">Selection</StyledTh>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.map((program, index) => (
                  <tr key={index}>
                    <StyledTd>{program.name}</StyledTd>
                    <StyledTd>{new Date(program.time).toLocaleString()}</StyledTd>
                    <StyledTd>{`${program.place} (${program.location})`}</StyledTd>
                    <StyledTd>${program.fees} per week</StyledTd>
                    <StyledTd>
                      <input
                        type="checkbox"
                        checked={!!selectedPrograms[program._id]}
                        disabled={Object.keys(selectedPrograms).filter(key => selectedPrograms[key]).length >= 2 && !selectedPrograms[program._id]}
                        onChange={() => handleCheckboxChange(program._id)}
                      />
                    </StyledTd>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
            <RegisterButton onClick={handleRegisterSelected}>Register</RegisterButton>
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

const Header = styled.div`
  padding:  0px 20px 0px 20px ;
  padding-top: 60px;
  display: flex;        // Enable flexbox
  justify-content: space-between; // Space out the back button and the title
  align-items: center;  // Vertically align the items in the middle
  max-width: 90%;
  margin: 20px auto;
`;

const BGI = styled.div`
  position: relative;  // Change to relative to contain the pseudo-element
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;  // Adjust z-index to ensure it stacks as needed
  padding-top: 15px;

  // Using before to create a pseudo-element for the background
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${logo}) no-repeat center center;
    background-size: 45%; // Adjusts the background image to be 90% of the element size
    opacity: 0.4;
    z-index: -1; // Ensures the background is behind the content
  }
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

const SecondClassRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Container = styled.form`
  max-width: 90%;
  margin: 0px auto;
  padding: 0px 20px;  
`;

const FormSection = styled.div`
`;

const Column = styled.div`
`;

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
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const FormRowHorizontal = styled.div`
  display: flex;
  align-items: flex-end ;
  width: 100%;
`;

const InputLabel = styled.label`
  flex: 1 1 25%;
  margin-bottom: 0;
  color: #000000;
  padding: 10px 0;
`;

const InputField = styled.div`
  display: flex;
  width: 100%;
`;

const Step2FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Step2InputLabel = styled.label`
  flex: 1 1 25%;
  margin-bottom: 0;
  color: #000000;
  padding: 10px 0;
`;

const Step2InputField = styled.div`
  flex: 1 1 25%;
  margin-bottom: 0;
  padding: 10px 0;
`;

const TextArea = styled.textarea`
  flex: 1 1 80%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonRow = styled.div`
  margin-top: 20px; /* Ensure it has some spacing from other content */
  flex: 1 1 20%;
  display: flex;
  justify-content: flex-end; /* Align items to the right */
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 25px; // Keeps some space below each row
  font-weight: 800;

  &:hover {
    color: #5e0511;
  }

  img {
    margin-left: 5px;
    width: 20px; // Adjust size as necessary
    height: auto;
  }
`;

const TableContainer = styled.div`
  width: 100%; /* Adjust to fit the container */
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
  border-color:#95071A;
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

const BlueLink = styled.a`
  display: inline-block;
  margin: 5px;
  padding: 5px 10px;
  background-color: blue;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: darkblue;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: darkred;
  }
`;

const RegisterButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;  // Green background for visibility
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin-left: auto;  // Aligns the button to the right
  margin-right: calc(7.2%);  // Adjusts based on your column widths to align under 'Selection'

  &:hover {
    background-color: #45a049;  // Darker green on hover
  }
`;

const StyledInput = styled.input`
  border-radius: 50px;
  border: 1px solid;
  flex: 1 1 25%;
  margin-right: 140px;
`;

const Displaynone = styled.div`
opacity:0%
`;

export default RegistrationForm;
