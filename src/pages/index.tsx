import type { NextPage } from 'next';

import DefaultLayout from '../layouts/DefaultLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@store/authSlice';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const [openCreateRole, setOpenCreateRole] = useState(false);

  const router = useRouter();
  const goToCreateRole = () => {
    try {
      //router.push('/role/create');
      setOpenCreateRole(true);
    } catch (error) {
      console.error(error);
    }
  };
  const [menu, setMenu] = useState('Approved');
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const dataValue = event.currentTarget.getAttribute('data-value') ?? '';
    setMenu(dataValue);
  };

  const [countdownAfterPressCancel, setCountdownAfterPressCancel] = useState<number>(0);
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdownAfterPressCancel > 0) {
      timer = setTimeout(() => {
        setCountdownAfterPressCancel((num) => num - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countdownAfterPressCancel]);

  const App = () => {
    return (
      <>
          <>
            <div className="box-bar-level">
              <div className="box-bar-column">
                <strong className="font-heading color-title">Patcharawat Sukrak</strong>
              </div>
              <div className="box-bar-column">
                <div className="mb-10">
                  {' '}
                  <span className="color-sub">Level</span>
                </div>
                <p className="clear-p">
                  <span>Creator</span>
                </p>
              </div>
            </div>
          </>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>หน้าแรก</title>
      </Head>
      <App />
    </>
  );
};

export default Home;
