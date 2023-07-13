import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Form, FormInstance } from 'antd';
import Product from '@/src/components/Product';
import ProductType from '@/src/constants/product';
import useAxiosAuth from '@api/auth';
import { useRouter } from 'next/router';
import snackbarUtils from '@/src/utils/snackbarUtils';

const CreateOrder: React.FC = () => {
  const [form] = Form.useForm<ProductType[]>();
  const router = useRouter();

  const usePostOrder = () => {
    const axiosAuth = useAxiosAuth();

    const postOrder = async (value: any) => {
      try {
        await axiosAuth
          .post(`/api/order/create`, JSON.stringify(value), {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            console.log(res);
            snackbarUtils.success('order created successfully');
            router.push('/order/view');
          });
      } catch (error) {
        console.error(error);
      }
    };

    return postOrder;
  };

  const postOrder = usePostOrder();

  const onSave = (value: any) => {
    const order = value.products.map((e: ProductType) => {
      return {
        productId: e.id,
        qty: e.qty,
        price: Number((e.price * 35.14).toFixed(0))
      }
    })
    console.log(order);
    postOrder(order);
  };


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