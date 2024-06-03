import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #e0ffe0;
`;

const Message = styled.h1`
  color: #4caf50;
`;

const HomeButton = styled(Link)`
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
`;

const Success = () => {
  return (
    <Container>
      <Message>Payment Successful!</Message>
      <HomeButton to="/">Go to Home</HomeButton>
    </Container>
  );
};

export default Success;
