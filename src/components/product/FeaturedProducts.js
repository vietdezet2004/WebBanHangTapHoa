import React, { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import '../../assets/styles/ProductList.css';

function FeaturedProducts() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then(res => {
        setFeatured(res.data);
      })
      .catch(err => console.error('Lỗi khi lấy sản phẩm nổi bật:', err));
  }, []);

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Sản phẩm nổi bật</h2>
      <div className="product-list">
        {featured.map(item => (
          <ProductCard key={item.productid} product={item} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
