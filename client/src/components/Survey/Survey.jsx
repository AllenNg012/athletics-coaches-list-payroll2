/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
    const ageFromQuery = queryParams.get('age');
    if (ageFromQuery) {
      setAge(ageFromQuery);
    }
  }, [queryParams]);

  const handleAddMoreChildrenChange = (event) => {
    setAddMoreChildren(event.target.value === "yes");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
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
    <Container>
      <Title>Child Information</Title>
      <FormSection>
        <FormRow>
          <InputLabel>Gender</InputLabel>
          <label>
            <input
              type="radio"
              name="gender"
              value="Girls"
              checked={gender === "Girls"}
              onChange={handleGenderChange}
            />
            Girls
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="COED"
              checked={gender === "COED"}
              onChange={handleGenderChange}
            />
            COED/All Genders
          </label>
        </FormRow>
        <FormRow>
          <InputLabel>Age</InputLabel>
          <select value={age} onChange={handleAgeChange}>
            <option value="">Select</option>
            <option value="3-4">3-4</option>
            <option value="5-6">5-6</option>
            <option value="7-8">7-8</option>
            <option value="9-10">9-10</option>
          </select>
        </FormRow>
        <FormRow>
          <InputLabel>Sport of Choice</InputLabel>
          <select value={sport} onChange={handleSportChange}>
            <option value="">Select</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Soccer">Soccer</option>
          </select>
        </FormRow>
        <FormRow>
          <InputLabel>Preferred day(s) of program</InputLabel>
          <label>
            <input
              type="radio"
              name="day"
              value="Monday"
              checked={day === "Monday"}
              onChange={handleDayChange}
            />
            Monday
          </label>
          <label>
            <input
              type="radio"
              name="day"
              value="Tuesday"
              checked={day === "Tuesday"}
              onChange={handleDayChange}
            />
            Tuesday
          </label>
          <label>
            <input
              type="radio"
              name="day"
              value="Wednesday"
              checked={day === "Wednesday"}
              onChange={handleDayChange}
            />
            Wednesday
          </label>
          <label>
            <input
              type="radio"
              name="day"
              value="Thursday"
              checked={day === "Thursday"}
              onChange={handleDayChange}
            />
            Thursday
          </label>
          <label>
            <input
              type="radio"
              name="day"
              value="Friday"
              checked={day === "Friday"}
              onChange={handleDayChange}
            />
            Friday
          </label>
          <label>
            <input
              type="radio"
              name="day"
              value="Saturday"
              checked={day === "Saturday"}
              onChange={handleDayChange}
            />
            Saturday
          </label>
          <label>
            <input
              type="radio"
              name="day"
              value="Sunday"
              checked={day === "Sunday"}
              onChange={handleDayChange}
            />
            Sunday
          </label>
        </FormRow>
        <FormRow>
          <InputLabel>Desired Location</InputLabel>
          <select value={location} onChange={handleLocationChange}>
            <option value="">Select</option>
            <option value="Vaughan">Vaughan</option>
            <option value="Markham">Markham</option>
            <option value="Aurora">Aurora</option>
            <option value="Newmarket">Newmarket</option>
            <option value="Mississauga">Mississauga</option>
            <option value="Brampton">Brampton</option>
            <option value="East York">East York</option>
            <option value="Midtown">Midtown</option>
          </select>
        </FormRow>
        <FormRow>
          <InputLabel>Do you want to add more child(ren)? (10% off with 2 registration)</InputLabel>
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
        <ButtonRow>
          <NextButton onClick={handleNext}>Next</NextButton>
        </ButtonRow>
      </FormSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  padding: 1rem;

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

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Survey;
