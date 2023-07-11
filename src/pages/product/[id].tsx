import React from 'react'
import { useRouter } from 'next/router';

const ProductDetail = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <div>Product: {id}</div>
  )
}

export default ProductDetail;
