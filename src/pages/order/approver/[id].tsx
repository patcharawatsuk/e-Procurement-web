import React, { useState, useEffect } from 'react';
import { setLoading, selectIsLoading } from '@store/loadingSlice';
import { useDispatch } from 'react-redux';
import Product from '@/src/constants/product';
import useAxiosAuth from '@api/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Image, Select, Space, Input, Checkbox, Button, Form, FormInstance, Badge } from 'antd';
import ProductModal from '@/src/components/ProductModal';
import axios from 'axios';

interface Order {
    id: {
      orderId: number;
      productId: number;
    }
    price: number;
    qty: number;
    productName?: string;
    thumbnail?: string;
}

const OrderDetail = () => {
    const dispatch = useDispatch();
    const axiosAuth = useAxiosAuth();
    const [order, setOrder] = useState<Order[]>([]);
    const router = useRouter();
    const {id} = router.query;
    const [modalProductDetailVisible, setModalProductDetailVisible] = useState<boolean>(false);
    const [modalProductId, setModalProductId] = useState<number>(1);

    async function fetchData() {
        try {
            await axiosAuth.get(`/api/order?id=${id}`)
            .then(res => {
                setOrder(res.data.data)
            }).catch(err => {
                throw new Error(err)
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
      fetchData();
    }, [])

    const handleViewDetail = (productId: number) => {
      if (productId) {
        setModalProductId(productId);
        setModalProductDetailVisible(true);
      }
    };

    const totalPrice = order.reduce((total, currOrder) => {
      const { price, qty } = currOrder;
      const indexTotal = price * qty * 35;
      return total + indexTotal;
    }, 0);
  
    
    return (
        <>
        <h4 style={{paddingLeft: '20em'}}>Order id: {order.length > 0 ? order[0].id.orderId : 'Unknown'}</h4>
        <div className='cart'>
          <div className='cart-body'>
                    <h4>Product</h4>
                    <h4>Quantity</h4>
                    <h4>Price</h4>
                    <h4>Total (Bath)</h4>
            </div>
          
          {order?.map((e, index) => (
          <div key={index} className='cart-body'>
            <a onClick={() => handleViewDetail(e.id.productId)} style={{paddingRight: '5em'}}>{e.productName}</a>
            <p>{e.qty}</p>
            <p>{e.price}</p>
            <p>{
              e.qty ? Number((e.qty * (e.price * 35)).toFixed(0)).toLocaleString(undefined, { maximumFractionDigits: 0 })
              : ''
            }
            </p>
          </div>
        ))}
        <div className='cart-body'>
            <p></p>
            <p></p>
            <p></p>
            <p>Summary : {totalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        </div>
        <div
                className="ml-auto"
                style={{
                    padding: '0.8em 0.5em 0em 0.5em',
                    background: '#f4f5f8',
                    position: 'static',
                    bottom: 4,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <div style={{ width: '1em' }}></div>
                <Link href="/order/approver">
                    <Button className="btn-op-default mr-20" style={{ marginRight: '10px' }}>Back</Button>
                </Link>
                
            </div>
            <ProductModal modalProductDetailVisible={modalProductDetailVisible} setModalProductDetailVisible={setModalProductDetailVisible} productId={modalProductId}/>
        </>
    )
}

export default OrderDetail