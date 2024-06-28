/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import logo from './logo.jpg'; 

const Content1 = () => {
  return (
    <Background>
      <Container>
        <Content>
          <Texts>
            <h1>Bounce into Success: Youth Basketball Development Programs</h1>
            <p>Hey there, basketball-loving moms! If you've got a budding baller at home, you're in the right place. As a mom, you already know the importance of finding activities that not only keep your kids active but also teach them valuable life lessons. And what better way to do that than through the exciting world of basketball?</p>

            <p>As parents, we want our children to excel in everything they do, and sports offer a unique opportunity for growth and development. Basketball, in particular, has a special magic that captivates both young and old alike. It's a game of skill, teamwork, and strategy, but it's also so much more than that.</p>

            <p>Here are just a few reasons why basketball might be the perfect fit for your child:</p>

            <p><strong>Physical Fitness:</strong> In today's world of screens and sedentary activities, getting kids moving is more important than ever. Basketball is a fantastic way to encourage physical activity and promote a healthy lifestyle. Dribbling, shooting, and running up and down the court provide an excellent cardiovascular workout, helping your child stay fit and active.</p>

            <p><strong>Teamwork:</strong> Basketball is a team sport through and through. From passing to setting screens to playing defense, every aspect of the game requires cooperation and collaboration. By participating in basketball, your child will learn valuable lessons about teamwork, communication, and working towards a common goal.</p>

            <p><strong>Confidence Building:</strong> There's nothing quite like sinking a shot or making a crucial defensive play to boost your child's confidence. Basketball offers countless opportunities for children to set goals, overcome challenges, and experience success, both individually and as part of a team. These successes, no matter how small, can have a profound impact on your child's self-esteem and sense of accomplishment.</p>

            <p><strong>Discipline and Focus:</strong> Success in basketball, as in life, requires discipline and focus. Whether it's practicing free throws, memorizing plays, or staying focused during a game, basketball teaches children the importance of dedication, hard work, and perseverance. These are invaluable skills that will serve them well both on and off the court.</p>

            <p>Now that we've covered why basketball is such a fantastic sport for kids, let's talk about how you can help your child get started on their basketball journey.</p>

            <p>One of the best ways to introduce your child to basketball is through a structured training program or academy specifically designed for beginners. These programs offer expert instruction in fundamental basketball skills in a fun and supportive environment.</p>

            <p>At Youth Development Basketball, we're passionate about introducing young children to the joys of basketball. Our experienced coaches are dedicated to helping your child develop their skills, build confidence, and cultivate a love for the game that will last a lifetime.</p>

            <p>Our beginner programs are tailored to the specific needs and abilities of children ages 5-10, ensuring that every child receives the individual attention and support they need to succeed. Whether your child is brand new to basketball or already has some experience, our programs are designed to meet them where they are and help them take their game to the next level.</p>

            <p>In addition to our regular training programs, we also offer summer camps, clinics, and other special events designed to provide children with additional opportunities to learn and grow in the game and culture of basketball.</p>

            <p>So if you're ready to help your child embark on their basketball journey, why not give Youth Basketball Development a try? With our expert coaching, supportive environment, and passion for the game, we're confident that your child will fall in love with basketball just like we have.</p>

            <p>Let's lace up those sneakers and hit the court together. The next generation of basketball stars is waiting to shine, and we can't wait to help your child reach their full potential.</p>

            <p>Here's to basketball, teamwork, and endless opportunities for growth and success!</p>

            <p>Warm regards,</p>
            <p>Youth Development Basketball Team :)</p>
            <p>Youth Development Basketball Team <Logo src={logo} alt="Youth Development Basketball Logo" /></p>
            <StyledHorizontalLine2 />

          </Texts>

        </Content>
      </Container>
    </Background>
  );
};

export default Content1;

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
  height: 100px;  // Sets the height of the logo
  width: auto;  // Maintains the aspect ratio of the image
  margin-top: 10px;  // Adds some space between the text and the logo
  display: block;  // Makes the logo a block element to properly manage margins
`;


const StyledHorizontalLine2 = styled.hr`
  border: none;
  height: 5px;
  background-color: black;
  flex-grow: 1;
  margin: 15px 10px 80px 15px;
`;