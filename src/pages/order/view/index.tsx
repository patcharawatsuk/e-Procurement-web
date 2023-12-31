import React, { useState, useEffect } from 'react';
import { setLoading, selectIsLoading } from '@store/loadingSlice';
import { useDispatch } from 'react-redux';
import Product from '@/src/constants/product';
import useAxiosAuth from '@api/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Modal, Image, Select, Space, Input, Checkbox, Button, Form, FormInstance, Badge } from 'antd';
import snackbarUtils from '@/src/utils/snackbarUtils';

interface Order {
    id: number;
    requester: string;
    comment: string;
    cancel: number
}

const View = () => {
    const dispatch = useDispatch();
    const axiosAuth = useAxiosAuth();
    const router = useRouter();
    const [order, setOrder] = useState<Order[]>([]);
    async function fetchData() {
        try {
            await axiosAuth.get('/api/order/')
                .then(res => {
                    debugger
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

    const viewOrderDetail = (orderId: number) => {
        router.push(`/order/view/${orderId}`)
    }

    async function handleCancelOrderBu(orderId: number) {
        try {
            await axiosAuth.put(`/api/order/cancel?id=${orderId}`, msgCancel)
                .then(res => {
                    snackbarUtils.success('cancelled order');
                    fetchData();
                }).catch(err => {
                    throw new Error(err)
                })
        } catch (error) {
            console.error(error);
        }
    }
    const [modalCancelMsg, setModalCancelMsg] = useState<boolean>(false);
    const [currentOrder, setCurrentOrder] = useState<number>(0);
    function handleCancelOrder(orderId: number) {
        setModalCancelMsg(true);
        setCurrentOrder(orderId);
    }
    const [msgCancel, setMsgCancel] = useState<string>('');
    const handleCancel = () => {
        setModalCancelMsg(false);
      };
    const handleOk = () => {
        handleCancelOrderBu(currentOrder)
    };
    return (
        <>
            <div className='cart'>
                <div className='cart-body'>
                    <h4>Order</h4>
                    <h4>Cancel</h4>
                    <h4>Comment</h4>
                </div>
                {order?.map((e, index) => (
                    <div key={index} className='cart-body'>
                        <a onClick={() => viewOrderDetail(e.id)}>id # {e.id}</a>
                        {(e.cancel === 1 || e.cancel === -9 )? <h4>-</h4> : <a onClick={() => handleCancelOrderBu(e.id)}>X</a>} 
                        <h4>{e.comment}</h4>
                    </div>
                ))}
            </div>

            <div
                className="ml-auto"
                style={{
                    padding: '0.8em 0.5em 0em 0.5em',
                    background: '#f4f5f8',
                    position: 'static',
                    bottom: 3,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <div style={{ width: '1em' }}></div>
                <Link href="/order">
                    <Button className="btn-op-default mr-20" style={{ marginRight: '10px' }}>Back</Button>
                </Link>
                
            </div>
            
        <Modal
        open={modalCancelMsg}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button style={{ marginRight: '10px'}} danger key="submit">
            Cancel
          </Button>,
        ]}
      >
        <Input value={msgCancel} onChange={(e) => setMsgCancel(e.target.value)}></Input>
      </Modal>
    </>
    )
}

export default View