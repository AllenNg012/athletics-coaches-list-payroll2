// Import necessary hooks and styled-components
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.jpg';
import arrow from './arrow.png'

const Survey = () => {
  const [addMoreChildren, setAddMoreChildren] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [sport, setSport] = useState('');
  const [day, setDay] = useState('');
  const [location, setLocation] = useState('');


  const navigate = useNavigate();
  const locationData = useLocation();
  const queryParams = new URLSearchParams(locationData.search);


  useEffect(() => {
    const initialAge = queryParams.get('initialAge');
    const initialSport = queryParams.get('class');

    // Update state only if it has not been initialized yet
    if (initialAge && age === '') {
      setAge(initialAge);
    }
    if (initialSport && sport === '') {
      setSport(initialSport);
    }
}, [queryParams]);

  const handleRadioButtonChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleNext = () => {
    if (!gender || !age || !sport || !day || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    const surveyData = {
      addMoreChildren,
      gender,
      age,
      sport,
      day,
      location
    };

    const surveyQuery = new URLSearchParams(surveyData).toString();
    if (addMoreChildren) {
      navigate(`/Registration2?${surveyQuery}`);
    } else {
      navigate(`/Registration1?${surveyQuery}`);
    }
  };


  return (
    <BackgroundContainer>
    <Container>
      <Title>PICK THE RIGHT PROGRAM</Title>
      <p>Please complete each indicated question*</p>
      <FormSection>
        <FormRow>
          <P>Player Information</P>
          <InputLabel>Gender*</InputLabel>
          <RadioGroup>
            <RadioButton>
              <input type="radio" name="gender" value="Girls" checked={gender === "Girls"} onChange={handleRadioButtonChange(setGender)} />
              Girls
            </RadioButton>
            <RadioButton>
              <input type="radio" name="gender" value="COED" checked={gender === "COED"} onChange={handleRadioButtonChange(setGender)} />
              COED/All Genders
            </RadioButton>
          </RadioGroup>
        </FormRow>
        <FormRow>
          <InputLabel>Age*</InputLabel>
          <RadioGroup>
            {['5-6', '7-8', '9-10', '11-12'].map(ageOption => (
              <RadioButton key={ageOption}>
                <input type="radio" name="age" value={ageOption} checked={age === ageOption} onChange={handleRadioButtonChange(setAge)} />
                {ageOption}
              </RadioButton>
            ))}
          </RadioGroup>
        </FormRow>
          <P>Program Information</P>
          <FormRow>
          <InputLabel>Program of Choice*</InputLabel>
          <RadioGroup>
            {['Basketball Group Academy Training', 'House Leagues' ,'Leadership Retreats'].map(sportOption => (
              <RadioButton key={sportOption}>
                <input type="radio" name="sport" value={sportOption} checked={sport === sportOption} onChange={handleRadioButtonChange(setSport)} />
                {sportOption}
              </RadioButton>
            ))}
          </RadioGroup>
        </FormRow>
        <FormRow>
          <InputLabel>Preferred day(s) of program*</InputLabel>
          <RadioGroup>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(dayOption => (
              <RadioButton key={dayOption}>
                <input type="radio" name="day" value={dayOption} checked={day === dayOption} onChange={handleRadioButtonChange(setDay)} />
                {dayOption}
              </RadioButton>
            ))}
          </RadioGroup>
        </FormRow>
        <FormRow>
          <InputLabel>Desired Location*</InputLabel>
          <RadioGroup>
            {['Vaughan', 'Markham', 'Aurora', 'Newmarket', 'Mississauga', 'Brampton', 'East York', 'Midtown'].map(locationOption => (
              <RadioButton key={locationOption}>
                <input type="radio" name="location" value={locationOption} checked={location === locationOption} onChange={handleRadioButtonChange(setLocation)} />
                {locationOption}
              </RadioButton>
            ))}
          </RadioGroup>
        </FormRow>
        <FormRow>
          <InputLabel>Do you want to add more child(ren)?*</InputLabel>
          <RadioGroup>
            <RadioButton>
              <input type="radio" name="addMoreChildren" value="yes" checked={addMoreChildren} onChange={() => setAddMoreChildren(true)} />
              Yes
            </RadioButton>
            <RadioButton>
              <input type="radio" name="addMoreChildren" value="no" checked={!addMoreChildren} onChange={() => setAddMoreChildren(false)} />
              No
            </RadioButton>     
               <ButtonRow>

          <NextLink onClick={handleNext}>Next            
             <img src={arrow} alt="Next" />
          </NextLink>
          
        </ButtonRow>
          </RadioGroup>
        </FormRow>

      </FormSection>
    </Container></BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  width: 100%;
  height: auto; // or adjust to your requirement
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

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

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0px 20px;
  padding-top: 75px;
  background-color: transparent; // Ensure the container itself has no background
  z-index: 1; // Make sure content is above the background
  position: relative;
`;



const Title = styled.h2`
  margin-bottom: 20px;
  color: #95071A;

`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px; // Reduced margin
  font-weight: bold;
  
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row; // Changed from column to row
  flex-wrap: wrap; // Allows wrapping if space is insufficient
  align-items: center; // Aligns items vertically at their center
  width: 100%;
`;

const RadioButton = styled.label`
  margin-right: 20px; // Adds spacing between radio buttons
  margin-bottom: 5px; // Keeps some space below each row
  display: flex; // Ensures the label text aligns properly with the radio button
  align-items: center; // Aligns the radio button and label text vertically
  cursor: pointer; // Changes the mouse cursor to pointer when hovering over the label
  text-decoration: underline; // Adds an underline on hover

`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;  // Aligns the button to the right
  margin-top: 20px;           // Adds some space above the button
  width: 90%;                // Ensure it spans the full width of the container

`;



const NextLink = styled.span`
  padding: 10px 20px;
  color: black;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 800;
  margin-bottom: 25px; // Keeps some space below each row

  &:hover {
    color: #660613;
  }
  img {
    margin-left: 5px;
    width: 20px; // Adjust size as necessary
    height: auto;
  }
`;


const P = styled.div` 
 margin-bottom: 5px; // Reduced margin
  font-weight: bold;
  font-size: 20px;
  color: #95071A;

`


export default Survey;
