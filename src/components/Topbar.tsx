import * as React from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { selectAuthState, setAuthState, setUserDetail, selectUserDetail } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { selectIsSignInOpen, setSignInOpen, setSignUpOpen } from '@/src/store/formOpenSlice';
import { useRouter } from 'next/router';

function ResponsiveAppBar() {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetail);
  const router = useRouter();

  const authItems: MenuProps['items'] = [
    {
      label: (
          <>
          </>
      ),
      key: '0',
    },
    {
      label: (
        <li className="user-dd-display">
          <div className="font-heading color-title">{userDetail?.firstName} {userDetail?.lastName}</div>
          <div className="color-sub">{userDetail?.email}</div>
        </li>
      ),
      key: '1',
      onClick: () => {
        router.push('/');
      }
    },
    {
      type: 'divider',
    },
    {
      label: <span className="color-sub">Sign Out</span>,
      key: '2',
      onClick: () => {
        dispatch(setAuthState(false));
        dispatch(setSignInOpen(false));
        dispatch(setSignUpOpen(false));
      }
    },
  ];

  const unAuthItems: MenuProps['items'] = [
    {
      label: <span className="color-sub">Sign In</span>,
      key: '0',
      onClick: () => {
        //dispatch(setAuthState(true))
        dispatch(setSignInOpen(true));
      }
    },
    {
      label: <span className="color-sub">Sign Up</span>,
      key: '1',
      onClick: () => {
        dispatch(setSignUpOpen(true));
      }
    },
  ];
  
  return (
    <div className="fe-op-header">
      <div className="op-inner">
        <div className="has-subline"></div>
        <div className="img-sublogo">
          <Link href='/'>
            <Image
              src="/images/header/e-procurement-logo.png"
              alt="ep-logo"
              width={100}
              height={100}
              onClick={() => dispatch(setSignInOpen(false))}
            />
          </Link>
        </div>
        <div className="pull-right">
          <Dropdown
            menu={{ items: authState ? authItems : unAuthItems }}
            trigger={['click']}
            dropdownRender={(menu) => (
              <ul style={{maxWidth: 275}}>
                {React.cloneElement(menu as React.ReactElement, {
                  // style: menuStyle,
                })}
              </ul>
            )}
            overlayStyle={{ width: '20em' }}
          >
            <div className="box-dropdown-title nav-format nav-profile color-sub">
              <span className="icon-user-set icon-profile"></span>
              <div className="profile-name">
                {authState && <span>{userDetail?.email}</span>}
                <i className="icon-arrow-menu-active"></i>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveAppBar;
