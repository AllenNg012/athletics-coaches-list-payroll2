import styled from 'styled-components';
import { AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import logo from './headerlogo.png';
import contactBg from './contactBg.png';
import send from './send.png';

const Containerr = styled.div`
    padding-top: 5rem;
    padding-bottom: 2rem;
    background-image: url(${contactBg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`;

const Container = styled.div`
    position: relative;
    width: 95%;
    margin: 0 auto;
    background-color: #ffffff76;
    border-radius: 25px;
    padding: 25px;
    h1 {
        font-size: 120px;
        color: #95071A;
    }
    p {
        font-size: 25px;
    }
`;

const LogoSection = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    padding: 10px;
`;

const Logo = styled.img`
    width: 200px;
    height: auto;
`;

const Logo2 = styled.img`
    width: 150px;
    height: auto;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Section = styled.div`
    flex: 1;
    padding: 10px;
    text-align: left;
    margin-right: ${props => props.marginRight ? '80px' : '0'}; /* Adjusted for closer spacing */

`;

const Address = styled.p`
    color: #95071A;
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 25px;
`;

const SocialIcons = styled.div`
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: start;
    gap: 15px;
`;

const UserName = styled.p`
    font-weight: 800;
`;

const FormGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
    margin-bottom: 20px;
    font-size: 18px;

`;

const Label = styled.label`
    grid-column: span 1;
`;


const Label2 = styled.label`
    grid-column: span 2;
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    border-radius: 25px;
`;

const Input2 = styled.input`
    grid-column: span 2;
    padding: 8px;
    width: 100%;
    border-radius: 25px;
`;

const TextArea = styled.textarea`
    grid-column: 1 / -1;
    width: 100%;
    padding: 8px;
    border-radius: 25px;
`;

const Button = styled.button`
    background-color: #95071A;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    grid-column: 1 / -1;
`;

function ContactPage() {
  return (
      <Containerr>
          <Container>
              <h1>Contact us!</h1>
              <Content>
                  <Section marginRight>
                      <p>Questions about our programs? Feel free to get in touch using any of the information below, we look forward to hearing from you!</p>
                      <Address>
                          123 Anywhere Street, TO<br />
                          L4D 3W3<br />
                          +1 (416) 453-8814<br />
                          JuniorAthletics.ca
                      </Address>
                      <SocialIcons>
                          <BsFacebook />
                          <BsTwitter />
                          <AiOutlineInstagram />
                          <AiFillLinkedin />
                      </SocialIcons>
                      <UserName>@JuniorAthletics</UserName>
                  </Section>
                  <Section>
                      <form>
                          <FormGroup>
                              <Label htmlFor="firstName">First Name</Label>
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input type="text" id="firstName" />
                              <Input type="text" id="lastName" />
                              <Label htmlFor="email">Email</Label><br />
                              <Input2 type="email" id="email" />
                              <Label2 htmlFor="message">Message</Label2>
                              <TextArea id="message" rows="4"></TextArea>
                          </FormGroup>
                          <Button type="submit"><Logo2 src={send} alt="send" /></Button>
                      </form>
                  </Section>
                  <LogoSection>
                      <Logo src={logo} alt="Junior Athletics Logo" />
                  </LogoSection>
              </Content>
          </Container>
      </Containerr>
  );
}

export default ContactPage;
