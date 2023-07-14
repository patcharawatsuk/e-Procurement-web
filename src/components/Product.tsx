import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { selectIsLoading } from '@store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/src/styles/Product.module.css';
import { Image, Select, Space, Input, Checkbox, Button, Form, FormInstance, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ProductModal from '@/src/components/ProductModal';
import Product from '@/src/constants/product';
import CartModal from '@/src/components/CartModal';
import axios from '@axios';

interface Props {
    form: FormInstance;
}

const Product : React.FC<Props> = ({form}) => {
  const isLoading = useSelector(selectIsLoading);
  const [data, setData] = useState<Product[]>([]);
  const [modalProductId, setModalProductId] = useState<number>(1);
  const [modalProductDetailVisible, setModalProductDetailVisible] = useState<boolean>(false);
  const [modalCartVisible, setModalCartVisible] = useState<boolean>(false);

  async function fetchData() {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=12');
      const responseData = response.data;
      const products: Product[] = responseData.products;
      const setupProduct = products.map((e) => {
        return {
          ...e,
          qty: 0,
          checked: false
        }
      })
      setData(setupProduct);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
    //fetchData2();
  }, []);

  const addCart = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.getAttribute('item-id') ?? '';
    addCartBu(id);
  };

  const addCartBu = (id: string) => {
    const updateCart = data.map((e) => {
      if (e.id == id) {
        return {
          ...e,
          qty: (e.qty ?? 0) + 1,
          checked: true
        }
      } else {
        return {
          ...e
        }
      }
    })
    setData(updateCart);
  }

  const removeCartBu = (id: string) => {
    const updateCart = data.map((e) => {
      if (e.id == id) {
        let qty = e.qty ?? 0
        return {
          ...e,
          qty: qty === 0 ? 0 : (e.qty ?? 1) - 1,
          checked: true
        }
      } else {
        return {
          ...e
        }
      }
    })
    setData(updateCart);
  }

  const handleViewDetail = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const id = event.currentTarget.getAttribute('item-id');
    if (id) {
      setModalProductId(parseInt(id, 10));
      setModalProductDetailVisible(true);
    }
  };

  const handleAddItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const id = event.currentTarget.getAttribute('item-id') ?? '';
    addCartBu(id);
  };

  const handleRemoveItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const id = event.currentTarget.getAttribute('item-id') ?? '';
    removeCartBu(id);
  };

  const submit = () => {
    const dataSubmit = data.filter((e) => e.checked && e.qty && e.qty > 0);
    form.setFieldsValue({...form.getFieldsValue(), 'products': dataSubmit});
  }

  const [loadPic, setLoadPic] = useState<boolean>(true);

    return (
        <div style={{display: !loadPic ? 'block' : 'none'}}>
          <div className={styles.container} style={{ margin: '0.2em' }}>
            {data.map((e) => (
              <div key={e.id} onClick={addCart} item-id={e.id} style={{borderRadius: '1em'}}>
                <Badge count={e.qty} className={styles.productContainer}>
                <h2 className={styles.title}>{e.title}</h2>
                <h2 className={styles.title}>{(e.price * 35.14).toLocaleString(undefined, { maximumFractionDigits: 0 })}</h2>
                <Image onLoad={() => setLoadPic(false)} preview={false} src={e.thumbnail} alt={e.title} width={250} height={250} />
                <div className={styles.buttonContainer}>
                  <Button item-id={e.id} style={{ marginRight: '10px'}} danger onClick={(e) => handleRemoveItem(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>-</Button>
                  <Button item-id={e.id} style={{ marginRight: '10px', borderColor: '#1c5cbd', color: '#1c5cbd' }} onClick={(e) => handleViewDetail(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>Detail</Button>
                  <Button item-id={e.id} style={{ borderColor: '#00bd01', color: '#00bd01' }} onClick={(e) => handleAddItem(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)}>+</Button>
                </div>
                </Badge>
              </div>
            ))}
          </div>
          <br></br>
          <div className="ml-auto" style={{padding: '0.8em 0.5em 0em 0.5em', background: '#f4f5f8', position: 'sticky', bottom: 0, width: '100%', display: 'flex' }}>
            <Badge count={data.reduce((totalQty, item) => {
              return totalQty + (item.qty ?? 0);
            }, 0)}>
              <ShoppingCartOutlined className='myhover' onClick={() => setModalCartVisible(true)} style={{ fontSize: '30px', color: '#08c' }} />
            </Badge>
            <div style={{width: '1em'}}></div>
            <Form.Item style={{ marginBottom: 0, paddingRight: '0.5em', paddingBottom: '0.5em' }}>
              <Link href='/order'>
                <Button className="btn-op-default mr-10">Cancel</Button>
              </Link>
              <Button
                className="btn-op-primary"
                type="primary"
                htmlType="submit"
                onClick={() => submit()}
              //loading={loadings[1]}
              // onClick={() => save(1)}
              //disabled={role === '' ? true : false}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
          <ProductModal modalProductDetailVisible={modalProductDetailVisible} setModalProductDetailVisible={setModalProductDetailVisible} productId={modalProductId}/>
          <CartModal modalCartVisible={modalCartVisible} setModalCartVisible={setModalCartVisible} data={data.filter((e) => e.checked && e.qty && e.qty > 0)}/>
        </div>
      );
}


export default Product