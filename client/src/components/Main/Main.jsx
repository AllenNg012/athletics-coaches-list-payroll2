import styled from 'styled-components';
import p13 from './13.png';
import signup from './signup.png';
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const TopSection = styled.div`
  flex: 6;
  background-color: blue;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
`;

const BottomSection = styled.div`
  flex: 4;
  background-color: white; /* Change this to any color you prefer */
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TextContainer = styled.div`
  text-align: left;
  color: white;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Subtitle = styled.div`
  font-size: 57px;
`;

const Image = styled.img`
  height: 100px;
  width: auto;
`;
const Image1 = styled.img`
  height: 200px;
  width: auto;
`;

const ParagraphContainer = styled.div`
  max-width: 600px;
  text-align: left;
`;

const ParagraphTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ParagraphText = styled.p`
  font-size: 16px;
`;

const Main = () => {
  return (
    <Container>
      <TopSection>
        <TextContainer>
          <Title>Ready to Win, Ready to Play.</Title>
          <Subtitle>JUNIOR ATHLETICS</Subtitle>
        </TextContainer>
      </TopSection>
      <BottomSection>
        <Image1 src={p13} alt="p13" />
        <ParagraphContainer>
          <ParagraphTitle>Welcome to Junior Athletics!</ParagraphTitle>
          <ParagraphText>
            At Junior Athletics, we unlock every childs potential through sports. Our mission is to create a fun, safe, and supportive environment where young athletes can thrive, build confidence, and form lasting friendships. We emphasize teamwork, sportsmanship, and personal growth, offering Basketball, Soccer, and Baseball programs in the GTA. Join us and watch your child shine!
          </ParagraphText>
        </ParagraphContainer>
        <Link to={`/survey`}><Image src={signup} alt="signup" /></Link>
      </BottomSection>
    </Container>
  );
};

export default Main;
