import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '../store/authSlice';
import Link from 'next/link';

import DefaultLayout from '../layouts/DefaultLayout';

const Signin: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <>
      <div
        style={{
          display: 'grid',
          justifyItems: 'center',
          margin: '20px',
          gridRowGap: '20px',
        }}
      >
        <Link href="/second-page">Go to second page</Link>
        <div>{authState ? 'Logged in' : 'Not Logged In'}</div>
        <button
          onClick={() =>
            authState
              ? dispatch(setAuthState(false))
              : dispatch(setAuthState(true))
          }
        >
          {authState ? 'Logout' : 'LogIn'}
        </button>
      </div>
    </>
  );
};

export default Signin;
