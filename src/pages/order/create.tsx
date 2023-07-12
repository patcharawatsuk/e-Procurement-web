import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, FormInstance } from 'antd';
import Product from '@/src/components/Product';
import ProductType from '@/src/constants/product';
import axios from 'axios';

const CreateOrder: React.FC = () => {

  const [form] = Form.useForm<ProductType[]>();
  
  const onSave = (value: any) => {
    const order = value.products.map((e: ProductType) => {
      return {
        productId: e.id,
        qty: e.qty,
        price: Number((e.price * 35.14).toFixed(0))
      }
    })
    console.log(order);
    //postOrder(order);
  };

  const postOrder = async (value: any) => {
    try {
      await axios
        .post(`localhost:8089/order/create`, JSON.stringify(value))
        .then((res) => {
          console.log(res)
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <Form form={form} onFinish={onSave} style={{margin: 0}}>
      <Head>
        <title>create order</title>
      </Head>
      <Form.Item name="products" style={{margin: 0}}>
        <Product form={form}/>
      </Form.Item>
      </Form>
    </>
  );
}

export default CreateOrder;