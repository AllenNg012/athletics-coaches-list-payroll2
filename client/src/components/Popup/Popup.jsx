import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1 1 45%; /* Adjusts to 45% of the container width */

  &:hover {
    background-color: darkblue;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Popup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleOptionClick = (age) => {
    navigate(`/survey?initialAge=${age}`);
    onClose();
  };

  return (
    <PopupContainer>
      <PopupContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Welcome to Junior Athletics!</h2>
        <p>Get started by selecting your child’s age range below</p>
        <ButtonContainer>
          <Button onClick={() => handleOptionClick('3-4')}>3-4 YEARS OLD</Button>
          <Button onClick={() => handleOptionClick('5-6')}>5-6 YEARS OLD</Button>
          <Button onClick={() => handleOptionClick('7-8')}>7-8 YEARS OLD</Button>
          <Button onClick={() => handleOptionClick('9-10')}>9-10 YEARS OLD</Button>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Popup;
