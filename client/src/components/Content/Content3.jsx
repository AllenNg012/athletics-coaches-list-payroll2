/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";

const BasketballPage = () => {
  return (
    <Background>
      <Container>
        <Content>
          <Texts>
            <h1>Bounce into Success: Youth Basketball Development Programs</h1>
            <p>Hey there, basketball-loving moms! If you've got a budding baller at home, you're in the right place. As a mom, you already know the importance of finding activities that not only keep your kids active but also teach them valuable life lessons. And what better way to do that than through the exciting world of basketball?</p>

            <h3>Why Basketball?</h3>
            <p>Basketball is not just a game, it’s a journey of growth and discovery for your child. Here’s why it’s the perfect fit:</p>

            <ul>
              <li><strong>Physical Fitness:</strong> Basketball provides a great cardiovascular workout that keeps kids fit and active.</li>
              <li><strong>Teamwork:</strong> It teaches valuable lessons in cooperation, communication, and striving for common goals.</li>
              <li><strong>Confidence Building:</strong> Each game is an opportunity to boost self-esteem through personal and team successes.</li>
              <li><strong>Discipline and Focus:</strong> The sport teaches children about dedication, hard work, and perseverance.</li>
            </ul>

            <h3>Getting Started</h3>
            <p>Introduce your child to basketball with our beginner programs, designed specifically for young learners aged 5-10. Tailored to meet each child at their level of skill and confidence, our programs foster a love for the game in a fun, supportive environment.</p>

            <h3>What We Offer</h3>
            <p>Our programs range from summer camps to regular training sessions, all aimed at nurturing your child's basketball skills and passion for the game. Here’s how we can help your child shine:</p>

            <ul>
              <li>Expert coaching in a supportive environment.</li>
              <li>Programs tailored to novice and experienced players alike.</li>
              <li>Opportunities for personal growth and development through basketball.</li>
            </ul>

            <p>Let's lace up those sneakers and hit the court together. The next generation of basketball stars is waiting to shine, and we can’t wait to help your child reach their full potential.</p>
            
            <p>Warm regards,</p>
            <p>Youth Development Basketball Team</p>
          </Texts>
        </Content>
      </Container>
    </Background>
  );
};

export default BasketballPage;

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.8);  // Semi-transparent white background
  padding-top: 5rem;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #D50032;  // Bright red for high visibility
    font-size: 3.5rem;  // Larger font size for the title
    text-transform: uppercase;  // Capitalize the title
    letter-spacing: 1px;
  }
  @media (max-width: 640px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;  // Responsive width, narrower than FAQ example
  max-width: 1200px;
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

  h3 {
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-size: 2rem;
    color: #333;  // Dark grey for subheadings
  }

  ul {
    list-style: inside square;  // Square bullets inside the content
  }

  li {
    margin-bottom: 0.5em;  // Spacing between list items
  }
`;
