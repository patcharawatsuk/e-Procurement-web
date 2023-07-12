import React from 'react'
import { Image } from 'antd'
import { createGlobalStyle } from 'styled-components';
import SignIn from '@/src/components/SignIn';
import { selectIsOpenSignIn } from '../store/signinSlice';
import { useSelector } from 'react-redux';

const GlobalStyles = createGlobalStyle`
  body {
    background-image: url('/images/background/bg.webp');
    //background-color: #92d3e9;
    background-repeat: no-repeat;
    background-size: cover;
  }`;

const UnAuthApp = () => {
  const isOpenSignIn = useSelector(selectIsOpenSignIn);
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
      {isOpenSignIn && <SignIn /> }
    </>
  )
}

export default UnAuthApp