import React, { useState, useEffect } from 'react';
import { Image } from 'antd'
import { createGlobalStyle } from 'styled-components';
import SignIn from '@/src/components/SignIn';
import SignUp from '@/src/components/SignUp';
import { selectIsSignInOpen, selectIsSignUpOpen } from '@/src/store/formOpenSlice';
import { useSelector } from 'react-redux';

const GlobalStyles = createGlobalStyle`
  body {
    background-image: url('/images/background/bg.webp');
    //background-color: #92d3e9;
    background-repeat: no-repeat;
    background-size: cover;
  }`;

const UnAuthApp = () => {
  const isOpenSignIn = useSelector(selectIsSignInOpen);
  const isOpenSignUp = useSelector(selectIsSignUpOpen);

  return (
    <>
      <GlobalStyles />
      <h3 style={{
        margin: '50px',
        color: '#ffffff',
        fontSize: '5em',
        fontFamily: '"Times New Roman", Times, serif',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>Welcome</h3>
      {isOpenSignIn && <SignIn/> }
      {isOpenSignUp && <SignUp/>}
    </>
  )
}

export default UnAuthApp