import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import Head from 'next/head';
import { selectAuthState, setUserDetail, selectUserDetail } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Order(): JSX.Element {
  const {role} = useSelector(selectUserDetail);
  type PaginationPosition = 'top' | 'bottom' | 'both';

  type PaginationAlign = 'start' | 'center' | 'end';

  const menuCreate = [
    {
      role: 'REQUESTER',
      title: 'Create Order',
      href: '/order/create',
    },
    {
      role: 'REQUESTER',
      title: 'View Order',
      href: '/order/view',
    }
  ];

  const menuApprove = [
    {
      role: 'APPROVER',
      title: 'Approve Order',
      href: '/order/approver',
    },
    // {
    //   role: 'PURCHASER',
    //   title: 'Purchaser Approve',
    //   href: '/order/approve',
    // }
  ];

  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');

  const MenuList = (): JSX.Element => {
    
    return (
      <>
        <List
          pagination={{ position, align }}
          dataSource={role === 'REQUESTER' ? menuCreate : menuApprove}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
              />
            </List.Item>
          )}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>order</title>
      </Head>
      <div style={{padding: '0.5em 0.5em 0.25em 3em'}}>
        <MenuList />
      </div>
    </>
  );
}
