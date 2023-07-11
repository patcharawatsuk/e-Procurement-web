import React, { useState, useEffect } from 'react';
import { Modal, Image } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@store/loadingSlice';
import Product from '../constants/product';

interface Props {
  modalCartVisible: boolean;
  data: Product[];
  setModalCartVisible: Function;
}

const CartModal: React.FC<Props> = ({ modalCartVisible, data, setModalCartVisible }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    setProducts(data)
  }, [data]);
  
  const handleOk = () => {
    setModalCartVisible(false);
  };

  const handleCancel = () => {
    setModalCartVisible(false);
  };

  return (
    <>
    <Modal
        title='Summary'
        centered
        open={modalCartVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'50%'}
        style={{ top: '25%', bottom: 10, height: '100vh', maxHeight: '100vh' }}
        footer={null}
      >
        {products?.map((e) => (
          <div key={e.title} className='cart-body'>
            <p>{e.title}</p>
            <p>Quantity: {e.qty}</p>
            <p>Total: {
              e.qty ? Number((e.qty * (e.price * 35.14)).toFixed(0)).toLocaleString(undefined, { maximumFractionDigits: 0 })
              : ''
            }
            </p>
          </div>
        ))}
      </Modal>
    </>
  )
}

export default CartModal