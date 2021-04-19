import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react'; 
import logo from "../images/github-logo.png"; 
import Typewriter from 'react-simple-typewriter'; 
import 'react-simple-typewriter/dist/index.css' ;

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0(); 

  console.log({isAuthenticated, user, isLoading}); 
  const isUser = isAuthenticated && user;

  return <Wrapper>
    <div className="navbar__left">
        <img src={logo} alt="Github logo"/> 
    </div>

    { isUser && user.name && <h4>Welcome, <strong>
          <Typewriter 
            loop
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={80}
            delaySpeed={1010}
            words={[user.name.toUpperCase()]}      
        /> 
      </strong>
     </h4> }

    <div className="navbar__right">
    { isUser && user.picture && <img src={user.picture} alt={user.name} />}

    {isUser ? 
      <button onClick={() => {logout({ returnTo: window.location.origin})}}>logout / Sign out</button>
      : 
    
      <button onClick={loginWithRedirect}>Login</button>
    }
    </div>


  </Wrapper>;
};

const Wrapper = styled.nav`
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: var(--clr-white);
  .navbar__left {
    display: flex;

    img {
      width: 10rem !important;  
      height: 4rem !important; 
      object-fit: contain !important;
      border-radius: 0 !important;
    }
  }

  .navbar__right {
    display: flex; 
    align-items: center;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  h4 {
    margin-bottom: 0;
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;

    @media (max-width: 768) {
      font-size: 1.2rem;
    }
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
