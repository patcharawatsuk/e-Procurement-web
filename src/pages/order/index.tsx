import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import Head from 'next/head';


export default function Order(): JSX.Element {
  type PaginationPosition = 'top' | 'bottom' | 'both';

  type PaginationAlign = 'start' | 'center' | 'end';

  const orderSubmenu = [
    {
      role: 'req',
      title: 'Create Order',
      href: '/order/create',
    },
    {
      role: 'req',
      title: 'View Order',
      href: '/order/view',
    },
    {
      role: 'app',
      title: 'Spending Limited Approve',
      href: '/order/create',
    },
    {
      role: 'pur',
      title: 'Purchaser Approve',
      href: '/order/create',
    }
  ];

  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [align, setAlign] = useState<PaginationAlign>('center');

  const MenuList = (): JSX.Element => {
    return (
      <>
        <List
          pagination={{ position, align }}
          dataSource={orderSubmenu}
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
