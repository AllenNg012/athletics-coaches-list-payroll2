/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import p1 from './p1.jpg';
import registernow from './registernow.png';

const BTraining = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Navigate to the survey page with a predefined sport
    navigate('/survey?class=Basketball Group Academy Training');
  };

  return (
    <Container>
      <Title>BASKETBALL GROUP TRAINING ACADEMY</Title>
      <Content>
        <ColumnLeft>
          <Image src={p1} alt="Basketball Training" />
        </ColumnLeft>
        <ColumnRight>
          <Box>
            <LittleTitle>Perfect Starting Point for your child</LittleTitle>
            <ContentText>
              Welcome to our dynamic Beginner’s Basketball Program, designed to support the beginning of your child's basketball journey! We focus on building fundamental skills, fostering fun, and connecting young players with new friends. This program is perfect for, introducing physical literacy and skill development.
              <br /><br />
              <ul>
                <li>Master essential skills: dribbling, shooting, finishing and defense.</li>
                <br />
                <li>Refine agility and coordination for improved on-court performance.</li>
                <br />
                <li>Achieve greater confidence and competitive edge.</li>
              </ul>
              <br /><br />
              <strong>ABOUT OUR PROGRAM</strong>
              <br />
              This is an on-going program, that runs through all seasons. Participants can progress to our house leagues, when they're ready to take their skills to the next level.
              <br /><br />
              <Red>Builds confidence on and off the court, and understands intricate game strategies.</Red>
            </ContentText>
          </Box>
          <Box>
            <RegisterButtonContainer>
              <RegisterImageButton onClick={handleRegisterClick} />
            </RegisterButtonContainer>
          </Box>
        </ColumnRight>
      </Content>
    </Container>
  );
};

export default BTraining;

const Container = styled.div`
  margin: 0 auto;
  padding: 10rem 2rem;
`;

const Title = styled.h1`
  color: #95071A;
  padding-left: 9.5vw;
  margin-bottom: 2rem;
  font-weight: 800;
  font-size: 3.5rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColumnLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.img`
  max-width: 60%;
  height: auto;
  border-radius: 10px;
`;

const Box = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
`;

const LittleTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const ContentText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
`;

const RegisterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RegisterImageButton = styled.button`
  background-image: url(${registernow});
  background-color: transparent;
  background-size: cover; // Ensures the image covers the entire button area
  background-repeat: no-repeat;
  background-position: center;
  width: 250px; // Set the width according to your image dimensions
  height: 50px; // Set the height according to your image dimensions
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8; // Optional: adds a hover effect to the button
  }
`;


const Red = styled.div`
  color: #95071A;
  font-weight: 800;
`;
