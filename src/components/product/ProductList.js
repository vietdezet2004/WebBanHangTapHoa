import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../services/productService';
import '../../assets/styles/ProductList.css';

function ProductList({ products: passedProducts }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Nếu passedProducts được truyền (có thể là mảng rỗng), dùng luôn nó
    if (passedProducts !== undefined) {
      setProducts(passedProducts);
    } else {
      // Nếu không có passedProducts, mới gọi API lấy tất cả sản phẩm
      getAllProducts()
        .then(res => setProducts(res.data))
        .catch(err => console.error('Lỗi khi gọi API:', err));
    }
  }, [passedProducts]);

  return (
    <div className="product-list-container">
      <div className="product-list">
        {products.map(item => (
          <ProductCard key={item.productid} product={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
