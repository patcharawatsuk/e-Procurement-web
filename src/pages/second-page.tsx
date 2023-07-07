import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/authSlice';

import DefaultLayout from '../layouts/DefaultLayout';

export default function SecondPage() {
  const authState = useSelector(selectAuthState);

  return (
    <DefaultLayout>
      <div>
        {' '}
        <div>{authState ? 'Logged in' : 'Not Logged In'}</div>
      </div>
    </DefaultLayout>
  );
}
