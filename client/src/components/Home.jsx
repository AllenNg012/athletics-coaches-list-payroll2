import styled from "styled-components";
import Footer from "./Footer";
import Review from"./Review/Review"
import About from "./About/About"
import About2 from "./About/About2"
import FAQ from "./FAQ/FAQ"
import Main from "./Main/Main";
import Program from "./Program/Program";
import Programs from "./Program/Programs";

const Home = () => {
    return (
    <Container> 
      <br/>
      <br/>
      <br/>
      <br/>
      <Main />
      <Program />
      <Programs />
      <About />
      <About2 />     
      <FAQ />
      <Review />
      <Footer />
    </Container>
  );
}

export default Home;

const Container = styled.div`    background-color: #f5f5ef;
`;





