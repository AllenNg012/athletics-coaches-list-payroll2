/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom


const Login = () => {
  return (
    <Container>
      <LoginForm>
        <h1>Login</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <Link to="/coach" className="bt">Login</Link>
          
           {/* Add Link component <button type="submit">Login</button>*/}
        </form>
      </LoginForm>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background-color: #1f62121d;
  .bt{ background-color: #1B590B;
      color: #ffffff;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background-color: #144f07;
      }}
`;

const LoginForm = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;

  h1 {
    margin-bottom: 1.5rem;
    color: #1B590B;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 1rem;
      color: #1B590B;

      input {
        width: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }

    button {
      background-color: #1B590B;
      color: #ffffff;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background-color: #144f07;
      }
    }
  }
`;
