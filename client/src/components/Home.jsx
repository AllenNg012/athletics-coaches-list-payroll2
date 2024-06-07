import styled from "styled-components";
import Footer from "./Footer";
import Review from"./Review/Review"
import About from "./About/About"
import About2 from "./About/About2"
import FAQ from "./FAQ/FAQ"
import Main from "./Main/Main";
import Program from "./Program/Program";
import Programs from "./Program/Programs";
import bgi from "./background.png";


const Home = () => {
    return (
    <Container> 
      <br/>
      <br/>
      <br/>
      <Main />
      <Program />
      <Programs />
      <About />
      <About2 />         
      <Review />
      <FAQ />
      <Footer />
    </Container>
  );
}

export default Home;

const Container = styled.div`    
background-image: url(${bgi});
  background-repeat: repeat;
  background-color: #f5f5ef;
`;





