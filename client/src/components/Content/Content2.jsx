/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import logo from './logo.jpg';

const Content2 = () => {
  return (
    <Background>
      <Container>
        <Content>
          <Texts>
            <h1>Youth Basketball Development: Preparing Future Rep Players</h1>
            <p>If you have a young athlete with dreams of making their first Rep Basketball Team, you're in for an exciting journey. We understand how nerve-racking it can be for young athletes making that transition from House League.</p>

            <p>At Jr. Basketball Development, we offer personalized 1-on-1 training that explores the necessary areas of improvement to help your child prepare for success. Our 1-on-1 training is tailored specifically to help younger players (U14) take their next step.</p>

            <p>Let's break down the importance of 1-on-1 training:</p>

            <p><strong>Personalized Attention:</strong> In a 1-on-1 training setting, your child receives individualized attention from a skilled coach who is dedicated to their development. This personalized approach allows the coach to identify areas for improvement, tailor drills and exercises to your child's specific needs, and provide targeted feedback to help them reach their full potential.</p>

            <p><strong>Skill Enhancement:</strong> Rep Basketball demands a high level of skill and proficiency in all aspects of the game. Through 1-on-1 training, your child can focus on mastering fundamental skills such as shooting, ball-handling, defense, and court awareness, laying a solid foundation for success at the Rep level.</p>

            <p><strong>Confidence Building:</strong> Confidence is key to success in any competitive sport, and 1-on-1 training provides the perfect environment for your child to build confidence in their abilities. As they see their skills improve and their hard work pays off, their self-assurance grows, empowering them to take on new challenges with courage and determination.</p>

            <p><strong>Preparation for Rep Basketball:</strong> Rep Basketball is a highly competitive environment where players must be at the top of their game to succeed. 1-on-1 training gives your child the edge they need to stand out during tryouts and make a lasting impression on coaches and scouts. From refining their technique to enhancing their basketball IQ, our personalized training program equips young athletes with the skills and confidence they need to thrive in Rep Basketball.</p>

            <p>At Jr. Basketball Development, our experienced coaches are committed to helping your child reach their full potential on the basketball court. Providing the tools, guidance, and support they need to succeed in during tryouts, and their first season.</p>

            <p>Contact us today to learn more about our personalized training programs and take the first step towards. Together, let's elevate your child's game and set them on the path to Rep Basketball success!</p>

            <p>Warm regards,</p>
            <p>Youth Development Basketball Team :)</p>
            <Logo src={logo} alt="Youth Development Basketball Logo" />
            <StyledHorizontalLine2 />
          </Texts>
        </Content>
      </Container>
    </Background>
  );
};

export default Content2;

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Texts = styled.div`
  flex: 1;
  padding: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;

  h1 {
    color: #95071A;
    font-size: 3rem;
    letter-spacing: 1px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-weight: 800;
  }
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
  margin-top: 10px;
  display: block;
`;

const StyledHorizontalLine2 = styled.hr`
  border: none;
  height: 5px;
  background-color: black;
  flex-grow: 1;
  margin: 15px 10px 80px 15px;
`;
