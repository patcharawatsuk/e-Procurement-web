import React from 'react'
import { Image } from 'antd'
import { createGlobalStyle } from 'styled-components';
import SignIn from '@/src/components/SignIn';

const GlobalStyles = createGlobalStyle`
  body {
    //background-image: url('/images/background/bg.jpg');
    background-color: #92d3e9;
    background-repeat: no-repeat;
    background-size: cover;
  }`;

const UnAuthApp = () => {
  return (
    <>
      <GlobalStyles />
      <h3 style={{
        margin: '50px',
        color: '#ffffff',
        fontSize: '5em',
        fontFamily: '"Times New Roman", Times, serif',
      }}></h3>
      <SignIn />
    </>
  )
}

export default UnAuthApp