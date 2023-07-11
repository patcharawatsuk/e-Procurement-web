import type { NextPage } from 'next';

import DefaultLayout from '../layouts/DefaultLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CreateRole from '../components/role/createroles/index';
import { User, getUser } from '@api/user';
import Approved from '../components/role/Approved';
import Waiting from '../components/role/Waiting';
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

  const [user, setUser] = useState('');
  const fetchData = () => {
    // getUser().then((res) => {

    // })
  }

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

  const AuthApp = () => {
    return (
      <>
        {openCreateRole && (
          <div style={{ display: 'flex' }}>
            <CreateRole setOpenCreateRole={setOpenCreateRole} />
          </div>
        )}
        {!openCreateRole && (
          <>
            {countdownAfterPressCancel > 0 && (
              <>
                <div className="box-alert-wrap">
                  <div className="box-alert box-alert-success box-fixed-content"><strong>Success:</strong> The request role has been cancelled.</div>
                </div>
              </>
            )}
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
        )}
      </>
    )
  }

  const UnAuthApp = () => {
    const myStyle={
      backgroundImage:
      "url('/images/background/bg.jpg')",
      height:'100vh',
      width: '100vh',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
  };
  return (
    <center>
    <h1>หน้าแรก</h1>
    <Image  width={1000} height={1000} alt='bg' src={'/images/background/bg.jpg'}></Image>
    </center>
  );
  }

  return (
    <>
      <Head>
        <title>หน้าแรก</title>
      </Head>
      {authState ? <AuthApp/> : <UnAuthApp/>}
    </>
  );
};

export default Home;
