import React from 'react'; 
import styled from 'styled-components';
import bannerImg from "../images/World Map.svg";

const Banner = () => {
    return (
        <Wrapper>
            <img src={bannerImg} alt="word map" /> 
        </Wrapper>
    )
}

export default Banner


const Wrapper = styled.div`
    width: 100%; 
    position: relative; 
    height: 60vh;

    img {
        width: 100%; 
        height: 100%; 
        position: absolute; 
        top: 0; 
        left: 0; 
        background-position: center; 
        background-repeat: no-repeat; 
        background-size: cover; 
    } 


`