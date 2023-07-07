import * as React from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
        <Image
          src="/images/mockup/logo_kbank.png"
          alt="logo_kbank"
          width={200}
          height={200}
        />
    ),
    key: '0',
  },
  {
    label: (
      <li className="user-dd-display">
        <div className="font-heading color-title">jaidee@pantavanij.com</div>
        <div className="color-sub">
          บริษัท ซีพี ออลล์ จำกัด (มหาชน) บริษัท ซีพี ออลล์ จำกัด (มหาชน)
        </div>
      </li>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: <span className="color-sub">Profile</span>,
    key: '2',
  },
  {
    label: <span className="color-sub">Setting</span>,
    key: '3',
  },
  {
    type: 'divider',
  },
  {
    label: <span className="color-sub">Sign Out</span>,
    key: '4',
  },
];

function ResponsiveAppBar() {
  return (
    <div className="fe-op-header">
      <div className="op-inner">
        <div className="has-subline"></div>
        <div className="img-sublogo">
          <Image
            src="/images/header/e-procurement-logo.png"
            alt="ep-logo"
            width={100}
            height={100}
          />
        </div>
        <div className="pull-right">
          <div className="box-dropdown lang-dropdown hide-sm-v">
            <div
              // onclick="ctrlDropdown(this)"
              className="box-dropdown-title nav-format lang-selected-box"
            >
              <span className="lang-flag icon-flag-us"></span>
            </div>
            <div className="box-dropdown-list lang-dropdown-list">
              <ul>
                <li className="selected">
                  <a href="#" title="English (United States)">
                    <span className="space-select icon-check"></span>
                    <span className="lang-flag icon-flag-us"></span>
                    <span className="lang-text">English (United States)</span>
                  </a>
                </li>
                <li>
                  <a href="#" title="ภาษาไทย (Thailand)">
                    <span className="space-select"></span>
                    <span className="lang-flag icon-flag-th"></span>
                    <span className="lang-text">ภาษาไทย (Thailand)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="box-dropdown apps-dropdown hide-sm-v">
            <div
              // onclick="ctrlDropdown(this)"
              className="box-dropdown-title nav-format"
            >
              <i className="icon-apps"></i>
            </div>
            <div className="box-dropdown-list">
              <div className="menu-title">OUR SERVICES</div>
              <ul>
                <li>
                  <a href="#">
                    <span className="icon-apps-list icon-app-procurement"></span>
                    <span>Procurement</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-apps-list icon-app-budget"></span>
                    <span>Budget</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            dropdownRender={(menu) => (
              <ul style={{maxWidth: 275}}>
                {React.cloneElement(menu as React.ReactElement, {
                  // style: menuStyle,
                })}
              </ul>
            )}
          >
            <div className="box-dropdown-title nav-format nav-profile color-sub">
              <span className="icon-user-set icon-profile"></span>
              <div className="profile-name">
                <span>jaidee@pantavanij.com</span>
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
