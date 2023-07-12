import * as React from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { selectAuthState, setAuthState } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { selectIsOpenSignIn, setOpenSignIn } from '../store/signinSlice';

function ResponsiveAppBar() {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

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
          <div className="font-heading color-title">Patcharawat Sukrak</div>
          <div className="color-sub">patcharawatsuk@gosoft.co.th</div>
        </li>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <span className="color-sub">Sign Out</span>,
      key: '2',
      onClick: () => {
        dispatch(setAuthState(false));
        dispatch(setOpenSignIn(false));
      }
    },
  ];

  const unAuthItems: MenuProps['items'] = [
    {
      label: <span className="color-sub">Sign In</span>,
      key: '0',
      onClick: () => {
        //dispatch(setAuthState(true))
        dispatch(setOpenSignIn(true));
      }
    },
    {
      label: <span className="color-sub">Sign Up</span>,
      key: '1',
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
                {authState && <span>patcharawatsuk@gosoft.co.th</span>}
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
