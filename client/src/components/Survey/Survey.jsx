/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Survey = () => {
  const [addMoreChildren, setAddMoreChildren] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const programData = {
    programName: queryParams.get("programName"),
    programAge: queryParams.get("programAge"),
    programPlace: queryParams.get("programPlace"),
    programLocation: queryParams.get("programLocation"),
    programFees: queryParams.get("programFees"),
    programID: queryParams.get("programID"),
    programDate: queryParams.get("programDate")
  };

  const handleAddMoreChildrenChange = (event) => {
    setAddMoreChildren(event.target.value === "yes");
  };

  const handleNumberOfChildrenChange = (event) => {
    setNumberOfChildren(parseInt(event.target.value));
  };

  const handleNext = () => {
    const surveyData = {
      addMoreChildren,
      numberOfChildren
    };

    const surveyQuery = new URLSearchParams(surveyData).toString();
    const programQuery = new URLSearchParams(programData).toString();
    navigate(`/Registration2?${programQuery}&${surveyQuery}`);
  };

  return (
    <Container>
      <FormSection>
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
        <ButtonRow>
          <NextButton onClick={handleNext}>Next</NextButton>
        </ButtonRow>
      </FormSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
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
