import styled from 'styled-components';
import baseball from './Baseball.png';
import baseball2 from './Baseball2.jpg';
import Basketball from './Basketball.png';
import Basketball2 from './Basketball2.jpg';
import Soccer from './Soccer.png';
import Soccer2 from './Soccer2.jpg';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const TopSection = styled.div`
  flex: 2;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #2E82BE;
  border-bottom: 2px solid #2E82BE;
`;

const BottomSection = styled.div`
  flex: 8;
  background-color: rgba(255, 255, 255, 0.8); /* White with 80% opacity */
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 53px;
  margin: 0;
`;

const Subtitle = styled.h2`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0 0;
`;

const ContentContainer = styled.div`
  border: 2px solid #2E82BE;
  border-radius: 10px;
  padding: 10px;
  width: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background-color: white; /* Ensure no opacity here */
`;

const SmallImage = styled.img`
  width: 100%;
  max-width: 120px;
  margin-bottom: 10px;
`;

const LargeImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover .overlay {
    opacity: 0.7;
  }

  &:hover .text {
    display: block;
  }
`;

const LargeImage = styled.img`
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  text-decoration: underline;
  display: none;
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-left: 20px; /* Adjust the padding to align the list properly */
  margin: 10px 0;
  text-align: left;
  width: 100%; /* Ensure text width does not exceed large image width */
  font-size: 18px; /* Increased font size */
`;

const ListItem = styled.li`
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
`;

const FinalText = styled.p`
  font-weight: bold;
  color: #2E82BE;
  font-size: 18px; /* Increased font size */
  text-align: left;
  margin-top: 10px;
  width: 100%; /* Ensure text width does not exceed large image width */
`;

const handleImageClick = () => {
  window.location.href = '/survey';
};

const OurProgram = () => {
  return (
    <Container>
      <TopSection>
        <Title>OUR PROGRAMS</Title>
        <Subtitle>Unlock Your Childs Potential with Just a Few Clicks!</Subtitle>
      </TopSection>
      <BottomSection>
        <ContentContainer>
          <SmallImage src={Basketball} alt="Basketball" />
          <LargeImageContainer onClick={handleImageClick}>
            <LargeImage src={Basketball2} alt="Basketball2" />
            <Overlay className="overlay" />
            <OverlayText className="text">Sign up</OverlayText>
          </LargeImageContainer>
          <UnorderedList>
            <ListItem>Master essential skills: dribbling, shooting, and defense.</ListItem>
            <ListItem>Refine agility and coordination for improved on-court performance.</ListItem>
            <ListItem>Achieve greater confidence and competitive edge.</ListItem>
          </UnorderedList>
          <FinalText>Builds confidence on and off the court, and understands intricate game strategies.</FinalText>
        </ContentContainer>
        <ContentContainer>
          <SmallImage src={Soccer} alt="Soccer" />
          <LargeImageContainer onClick={handleImageClick}>
            <LargeImage src={Soccer2} alt="Soccer2" />
            <Overlay className="overlay" />
            <OverlayText className="text">Sign up</OverlayText>
          </LargeImageContainer>
          <UnorderedList>
            <ListItem>Master dribbling, passing, and shooting.</ListItem>
            <ListItem>Develop techniques for better ball control and accuracy.</ListItem>
            <ListItem>Engage in drills, scrimmages, matches.</ListItem>
            <ListItem>Build teamwork, perseverance, and sportsmanship.</ListItem>
          </UnorderedList>
          <FinalText>Enhance decision-making abilities during game situations.</FinalText>
        </ContentContainer>
        <ContentContainer>
          <SmallImage src={baseball} alt="Baseball" />
          <LargeImageContainer onClick={handleImageClick}>
            <LargeImage src={baseball2} alt="Baseball2" />
            <Overlay className="overlay" />
            <OverlayText className="text">Sign up</OverlayText>
          </LargeImageContainer>
          <UnorderedList>
            <ListItem>Master batting, pitching, fielding, and base running.</ListItem>
            <ListItem>Achieve success through hard work and sportsmanship.</ListItem>
            <ListItem>Improve physical fitness and coordination skills through baseball activities.</ListItem>
          </UnorderedList>
          <FinalText>Develop strategic thinking, game awareness, and decision-making skills.</FinalText>
        </ContentContainer>
      </BottomSection>
    </Container>
  );
};

export default OurProgram;
