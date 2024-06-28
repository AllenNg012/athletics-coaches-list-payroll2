/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import p1 from './p2.jpg';  // Ensure this path is correct according to your project structure
import { useNavigate } from 'react-router-dom';
import registernow from './registernow.png';

const HouseLeagues = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    // Navigate to the survey page with a predefined sport
    navigate('/survey?class=House Leagues');
  };
  return (
    <Container>
      <Title>HOUSE LEAGUES</Title>
      <Content>
        <ColumnLeft>
          <Image src={p1} alt="HOUSE LEAGUES" />
        </ColumnLeft>
        <ColumnRight>
          <Box>
            <LittleTitle>Great way to apply Skills in-game</LittleTitle>
          </Box>
          <Box>
            <ContentTextSmallMargin>
              Elevate your child's basketball experience with our seasonal house league programs. Designed for young players, this league offers a unique blend of skill development and gameplay, making it the perfect platform to hone their developing skills.
            </ContentTextSmallMargin>
          </Box>
          <Box>
            <ContentText>
              <Strong>What to Expect:</Strong>
              <br /><br />
              <ul>
                <li>Regular skill development sessions focusing on dribbling, shooting, passing, and defensive techniques</li>
                <li>Frequent house league gameplay to apply skills in real-game scenarios, emphasizing teamwork and strategic play</li>
                <li>Great coaching staff that provide personalized feedback, track progress and make adjustments</li>
                <li>A fun and engaging environment with opportunities for social interaction, competitive play, and recognition through awards</li>
              </ul>
              <br />
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

export default HouseLeagues;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 10rem 2rem;
`;

const Title = styled.h1`
  color: #95071A;
  font-size: 4.5rem;
  margin-bottom: 2rem;
  font-weight: 800;
  padding-left: 7.5vw;
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
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const Box = styled.div`
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const LittleTitle = styled.h2`
  font-size: 2rem;  // Adjusted font size
  color: #333;
  margin: 0;
  font-weight: 800;
`;

const ContentText = styled.p`
  font-size: 1.2rem;  // Adjusted font size
  line-height: 1.5;
  color: #333;
  margin-top: 1rem;  /* Adjust this value to ensure equal spacing */
`;

const ContentTextSmallMargin = styled(ContentText)`
  margin-top: 1rem;  /* Ensure equal spacing */
`;

const RegisterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;  /* Ensure equal spacing */
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
  font-size: 1.2rem;  // Adjusted font size
  font-weight: 800;
`;

const Strong = styled.div`
  font-size: 1.4rem;  // Adjusted font size
  font-weight: 800;
`;
