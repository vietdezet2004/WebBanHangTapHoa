import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/product/ProductCard';
import FeaturedProducts from '../components/product/FeaturedProducts';
import '../assets/styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Lỗi khi tải sản phẩm:', err));
  }, []);

  return (
    <div className="home-container">
      {/* Banner */}
      <div className="banner">
        <img src="banner.png" alt="Banner" className="banner-image" />
      </div>
      {/* Sản phẩm nổi bật */}
      <section className="featured-section">
        <FeaturedProducts />
      </section>
      {/* Hiển thị tất cả sản phẩm */}
      <section className="all-products-section">
        <h2>Tất cả sản phẩm</h2>
        <div className="product-list">
          {products.map(product => (
            <ProductCard key={product.productid} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
