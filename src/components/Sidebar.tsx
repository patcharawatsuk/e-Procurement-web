import React, { useState } from 'react';
import Link from 'next/link';
import { MenuItems } from '../constants/menus';

const Sidebar = () => {

  return (
    <div id="navSlide" className="op-nav-left-icon">
      <div id="ul-left-list" className="nav-left-inner">
        <ul className="fe-nav-list">
          {MenuItems.map((menu, index) => (
            <li key={index}>
              <Link href={menu.href} className="head">
                <span className={menu.icon}></span>
                <span className="title">{menu.title}</span>
                <div className="tooltip-left">
                  {' '}
                  <span>{menu.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
