import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #ffe0e0;
`;

const Message = styled.h1`
  color: #f44336;
`;

const HomeButton = styled(Link)`
  padding: 10px 20px;
  background: #f44336;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
`;

const Cancel = () => {
  return (
    <Container>
      <Message>Payment Failed or Cancelled</Message>
      <HomeButton to="/">Go to Home</HomeButton>
    </Container>
  );
};

export default Cancel;
