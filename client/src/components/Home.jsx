import styled from "styled-components";
import Footer from "./Footer";
import Review from"./Review/Review"
import About from "./About/About"
import About2 from "./About/About2"
import FAQ from "./FAQ/FAQ"

const Home = () => {
    return (
    <Container> 
            <Banner>
      </Banner>      
      <About />
      <About2 />     
      <FAQ />
      <Review />
      <Footer />
    </Container>
  );
}

export default Home;

const Container = styled.div``;
const Banner = styled.div`
  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 2rem;
  }
`;




