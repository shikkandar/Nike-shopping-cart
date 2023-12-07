import React, { useContext } from 'react'
import { ShoeContext } from './component/back/data/Data'
import Image from 'react-bootstrap/Image';
const Product = () => {
    const {products}=useContext(ShoeContext);
    console.log(products);
  return (
    <div>Product
\
    </div>
  )
}

export default Product