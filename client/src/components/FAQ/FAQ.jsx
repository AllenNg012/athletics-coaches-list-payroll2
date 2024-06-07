import styled from "styled-components";

const Faq = () => {
  return (
    <BGC>
      <Container id="FAQ">
        <Content>
          <Texts>
            <h1>Frequently Asked Questions</h1>
            <h3>What age groups do you serve?</h3>
            <p>Our programs are designed for children aged 3 to 10. We have different age brackets to ensure that each child receives age-appropriate coaching and attention.</p>

            <h3>What age groups do you serve?</h3>
            <p>Our programs are designed for children aged 3 to 10. We have different age brackets to ensure that each child receives age-appropriate coaching and attention.</p>

            <h3>How do I register my child for a program?</h3>
            <p>You can register your child through our website by filling out the online registration form. If you have any questions during the registration process, feel free to contact our support team.</p>

            <h3>What is the cost of the programs?</h3>
            <p>The cost varies by program and session length. Please refer to the Programs page for detailed information on fees for basketball, soccer, and baseball programs.</p>

            <h3>Who are the coaches?</h3>
            <p>Our coaches are experienced professionals with backgrounds in youth sports coaching and education. They are passionate about teaching and dedicated to creating a positive and supportive environment for all children.</p>

            <h3>What if my child has never played a sport before?</h3>
            <p>Our programs are designed for children of all skill levels, from beginners to advanced players. Coaches tailor their instruction to meet each childs individual needs and abilities.</p>

            <h3>What safety measures are in place to ensure child safety?</h3>
            <p>We prioritize the safety and well-being of all participants. Our safety protocols include certified coaches, CPR, first aid-trained staff, and equipment sanitization practices. We also follow strict safety protocols and guidelines to create a secure environment for all participants.</p>

            <h3>What is the coach-to-player ratio during sessions?</h3>
            <p>We maintain a low coach-to-player ratio to ensure individualized attention and quality instruction. Typically, the ratio is 1 coach to every 8–10 players.</p>

            <h3>What is your policy on cancellations and refunds?</h3>
            <p>We offer a full refund if you cancel your registration at least two weeks before the program start date. For cancellations made within two weeks of the start date, we provide a 50% refund. No refunds are available after the program has started.</p>

            <h3>How do you handle inclement weather?</h3>
            <p>In the case of bad weather, we will notify parents via email and our website about any cancellations or rescheduled sessions. Safety is our priority, and we are always on the side of caution.</p>

            <h3>Can parents stay and watch the practices and games?</h3>
            <p>Yes, parents are welcome to stay and watch their children during practices and games. We encourage family involvement and support!</p>

            <h3>What equipment does my child need to bring?</h3>
            <p>Participants are typically required to bring their own sports attire, including appropriate footwear, water bottles, and any specific equipment specified for the program.</p>

            <h3>What are the accepted payment methods?</h3>
            <p>We accept various payment methods, including credit/debit cards, payment plans, bank transfers, and cash payments. Please ensure to check the accepted payment methods at the time of registration.</p>

            <h3>What is the cancellation policy?</h3>
            <p>Our cancellation policy allows for a full refund if cancellation is made within a specified period before the start of the program. Please refer to our terms and conditions for details.</p>

            <h3>How can I contact Junior Athletics?</h3>
            <p>You can reach us via email at juniorathletics.support@gmail.com or call us at 1-800-123-4567. Our office hours are Monday to Friday, 9 AM to 5 PM.</p>
                   </Texts>
        </Content>
      </Container>
    </BGC>
  );
};

export default Faq;

const BGC = styled.div`
  background-color: #f5f5ef;
  padding-top: 1rem;
  padding-bottom: 10rem;
  min-height: 100vh; /* Ensures the background covers the full height of the viewport */
  display: flex; /* Added to center content vertically */
  justify-content: center; /* Added to center content horizontally */
  align-items: center; /* Added to center content vertically */
  @media (max-width: 640px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  h1 {
    color: #2E82BE;
    font-size: 3rem;
    text-transform: capitalize;
    letter-spacing: 2px;
    @media (max-width: 640px) {
      font-size: 2rem;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 840px) {
    width: 90%;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; /* Center the content */
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Texts = styled.div`
  flex: 1;
  background-color: #f5f5ef;
  border: 2px solid black;
  border-radius: 1vw;
  padding: 1rem;
  width: 90%; /* Set the width to 90% */
  margin: 0 auto; /* Center the box */

  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    padding-bottom: 1.2rem;
    text-transform: capitalize;
  }
  p {
    font-weight: 300;
    padding-bottom: 1rem;
  }
  span {
    font-weight: bold;
  }
`;
