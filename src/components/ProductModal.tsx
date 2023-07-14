import React, { useState, useEffect } from 'react';
import { Modal, Image } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, selectIsLoading } from '@store/loadingSlice';
import Product from '../constants/product';

interface Props {
  modalProductDetailVisible: boolean;
  productId: number;
  setModalProductDetailVisible: Function;
}

const ProductModal: React.FC<Props> = ({ modalProductDetailVisible, productId, setModalProductDetailVisible }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [product, setProduct] = useState<Product | null>();

  async function fetchData() {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      const responseData = response.data;
      const product: Product = responseData;
      await setProduct(product);          
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [productId]);
  
  const handleOk = () => {
    setModalProductDetailVisible(false);
  };

  const handleCancel = () => {
    setModalProductDetailVisible(false);
  };

  return (
    <Modal
        title={product?.title}
        centered
        open={modalProductDetailVisible && !isLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'50%'}
        style={{ top: '25%', bottom: 10, height: '100vh', maxHeight: '100vh' }}
        footer={null}
      >
        <div style={{textAlign: 'center'}}>
          <Image preview={false} src={product?.thumbnail} alt={product?.title} width={250} height={250} />
        </div>
        <ul>
            <li><b>Price:</b> {((product?.price ?? 0) * 35.14) === 0 ? '' : ((product?.price ?? 0) * 35.14).toLocaleString(undefined, { maximumFractionDigits: 0 })} Bath</li>
            <li><b>Description:</b> {product?.description}</li>
            <li><b>Brand:</b> {product?.brand}</li>
          </ul>
      </Modal>
  )
}

export default ProductModal