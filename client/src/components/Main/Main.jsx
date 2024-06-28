import styled from 'styled-components';
import p13 from './headerlogo.png';
import registernow from './registernow.png';
import main1 from './main1.png';
import main2 from './main2.jpeg';
import main3 from './main3.png';
import mainTop from './mainTop.png';
import { Link } from "react-router-dom";
import { AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const TopSection = styled.div`
  flex: 6;
  background-color: #95071A;  // Fallback color in case the image doesn't load
  background-image: url(${mainTop});  // Using the imported image as background
  background-size: 100%;  // Smaller size, adjust percentage as needed
  background-repeat: no-repeat;  // Prevents repeating the image
  background-position: center center;  // Centers the background image
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 20px;
  padding-top: 560px; // adjust this if it's too large or too small based on your needs

`;


const BottomSection = styled.div`
  flex: 4;
  background-color: white;
  display: flex;
  padding: 40px 40px 0px 40px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 80px;
  width: 400px;
`;

const Image1 = styled.img`
  max-height: 350px;
  max-width: 350px;
`;

const TextContainer = styled.div`
  text-align: left;
  color: white;
`;

const Title = styled.div`
  font-size: 2vw;
`;

const Subtitle = styled.div`
  font-size: 6vw;
  letter-spacing: 0.49em;
  text-align: center;
  white-space: nowrap;
`;
const ParagraphContainer = styled.div`
  max-width: 100%;
  text-align: left;
`;

const ParagraphTitle = styled.h2`
  font-size: 2vw;
  margin-bottom: 10px;
  font-weight: 800;
`;

const ParagraphText = styled.p`
  font-size: 1.5vw;
`;

const LinkContainer = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  padding-left: 40px;
`;

const ImageGallery = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1cm;
`;

const GalleryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const GalleryImage = styled.img`
  height: 305px;
  width: 475px;
  margin-bottom: 10px;
`;

const ImageDescription = styled.div`
  text-align: left;
  width: 475px;
  margin-bottom: 5px;
  font-size: 1.5rem;
  font-weight: 800;
  padding: 20px 0px;
`;

const ReadMoreLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: black;
  text-align: left;
  width: 250px;
  font-size: 1.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding-left: 40px;
`;

const NewTitle = styled.h2`
  font-size: 2vw;
  text-align: left;
  margin: 0;
  padding-right: 20px;
`;

const StyledHorizontalLine = styled.hr`
  border: none;
  height: 5px;
  background-color: black;
  flex-grow: 1;
  margin: 0 20px;
`;

const StyledHorizontalLine2 = styled.hr`
  border: none;
  height: 5px;
  background-color: black;
  flex-grow: 1;
  margin: 15px 10px 100px 15px;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center; // Centers the icons horizontally
  align-items: center; // Centers the icons vertically if needed
  margin: 20px; // Adds space above the icons
  font-size: 32px; // Increase the size of the icons
  gap: 20px; // Adds space between each icon
`;

const Main = () => {
  return (
    <Container>
      <TopSection>{/*   <TextContainer>
          <Title>They’re Ready to Compete.</Title>
          <Subtitle>JUNIOR ATHLETICS</Subtitle>
        </TextContainer> */}
      
      </TopSection>
      <BottomSection>
        <LeftColumn>
          <ParagraphContainer>
            <ParagraphTitle>Welcome to Junior Athletics!</ParagraphTitle>
            <ParagraphText>
            At Junior Athletics, we give your child the opportunity to make achievements outside of the classroom. Our mission is to create a fun, safe, and supportive environment where young athletes can thrive; building confidence, and forming lasting friendships. We emphasize teamwork, sportsmanship, and personal growth. We offer Basketball Training, House Leagues, and Camps, within the GTA! Join us and watch your child shine!            </ParagraphText>
          </ParagraphContainer>
        </LeftColumn>
        <RightColumn>
          <Image1 src={p13} alt="p13" />
        </RightColumn>
      </BottomSection>
      <LinkContainer>
        <Link to={`/survey`}><Image src={registernow} alt="registernow" /></Link>
      </LinkContainer>
      <TitleContainer>
        <NewTitle>Is Your Child New to Sports?</NewTitle>
        <StyledHorizontalLine />
      </TitleContainer>
        <ImageGallery>

        
          <GalleryItem>
            <GalleryImage src={main1} alt="Youth Basketball" />
            <ImageDescription>Bounce into Success: Youth Basketball Development Programs</ImageDescription>
            <Link to="/Content1"><ReadMoreLink>Read more</ReadMoreLink></Link>
          </GalleryItem>
          <GalleryItem>
            <GalleryImage src={main2} alt="Future Rep Players" />
            <ImageDescription>Youth Basketball Development: Preparing Future Rep Players</ImageDescription>
            <Link to="/Content2"><ReadMoreLink>Read more</ReadMoreLink></Link>
          </GalleryItem>
          <GalleryItem>
            <GalleryImage src={main3} alt="Hello" />
            <ImageDescription>Hello</ImageDescription>
            <ReadMoreLink>Read more</ReadMoreLink>
          </GalleryItem>
        </ImageGallery>
        <SocialMediaIcons>

        <BsFacebook /><BsTwitter /><AiOutlineInstagram /><AiFillLinkedin />
        </SocialMediaIcons>

        <StyledHorizontalLine2 />

    </Container>
  );
};

export default Main;
