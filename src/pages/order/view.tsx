import React, { useState, useEffect } from 'react';
import { setLoading, selectIsLoading } from '@store/loadingSlice';
import { useDispatch } from 'react-redux';
import Product from '@/src/constants/product';
import useAxiosAuth from '@api/auth';

interface Order {
    productId: number;
    price: number;
    qty: number;
    productName?: string;
    thumbnail?: string;
}

const View = () => {
    const dispatch = useDispatch();
    const axiosAuth = useAxiosAuth();
    const [order, setOrder] = useState<Order[]>([]);
    async function fetchData() {
        try {
            await axiosAuth.get('/api/order')
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
    

    return (
        <>
            {order?.map((e, index) => (
          <div key={index} className='cart-body'>
            <p>{e.productId}</p>
            <p>Quantity: {e.qty}</p>
            <p>Price:{e.price}</p>
            <p>Total: {
              e.qty ? Number((e.qty * (e.price * 35.14)).toFixed(0)).toLocaleString(undefined, { maximumFractionDigits: 0 })
              : ''
            } Bath
            </p>
          </div>
        ))}
        </>
    )
}

export default View