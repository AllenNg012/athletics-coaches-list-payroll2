import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from "./Footer";
import Review from "./Review/Review";
import About from "./About/About";
import About2 from "./About/About2";
import FAQ from "./FAQ/FAQ";
import Main from "./Main/Main";
import Programs from "./Program/Programs";
import OurProgram from "./Program/OurProgram";
import bgi from "./background.png";
import Popup from "./Popup/Popup";

const Home = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    // Any logic for triggering the popup can be added here, such as a timer or a condition.
  }, []);

  return (
    <Container>
      {showPopup && <Popup onClose={handleClosePopup} />}
      <br/>
      <br/>
      <br/>
      <Main />
      <Review />
      <About />
      <About2 />
      <OurProgram />
      <Programs />
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
