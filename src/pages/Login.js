import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import github from "../images/github-login.jpg"; 
import Typewriter from 'react-simple-typewriter'
import 'react-simple-typewriter/dist/index.css'


const Login = () => { 

  const { loginWithRedirect } = useAuth0(); 

  return <Wrapper> 
      <img src={github} alt="login cover" className="login__left" /> 
      <div className="container">
      <h1>
      Welcome to 
      <Typewriter 
          className="github"
          loop
          cursor
          cursorStyle='_'
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
          words={[' Github User']}
      />
      
      </h1>
        <button className="btn" onClick={loginWithRedirect}>login / Sign up</button>
      </div>
  </Wrapper>;
};
const Wrapper = styled.section`
  display: flex; 

  .github {
    font-weight: 700; 
    font-size: 1.2rem;
  }

  
  .login__left {
    width: 50%; 
    object-fit: cover;
    height: 100vh;
  }
  
  .container { 
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    margin: 0 auto; 
    
    h1 {
      text-align: center; 
      font-size: 1.7rem !important;
      margin-bottom: 6rem;
    }
  }
  @media screen and (max-width: 800px) {
    .login__left {
      display: none; 
    }

    .container {
        margin: 12rem auto; 

        h1 {
          font-size: 2rem;
        }
    }
  }

`;
export default Login;
