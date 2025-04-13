import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductsByCategory } from '../services/productService';
import ProductList from '../components/product/ProductList';
import { useSearchParams } from 'react-router-dom';
import '../assets/styles/ProductPage.css';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const query = searchParams.get('query');

  useEffect(() => {
    // Nếu có category thì sử dụng API lọc theo danh mục
    if (category) {
      getProductsByCategory(category)
        .then(res => {
          let prods = res.data;
          // Nếu có query, lọc tiếp danh sách dựa trên từ khoá tìm kiếm
          if (query) {
            prods = prods.filter(p =>
              (p.productName || p.productname)
                .toLowerCase()
                .includes(query.toLowerCase())
            );
          }
          setProducts(prods);
        })
        .catch(err => console.error('Lỗi khi gọi API:', err));
    } 
    // Nếu không có category mà có query, tải toàn bộ sản phẩm rồi lọc theo query
    else if (query) {
      getAllProducts()
        .then(res => {
          const prods = res.data.filter(p =>
            (p.productName || p.productname)
              .toLowerCase()
              .includes(query.toLowerCase())
          );
          setProducts(prods);
        })
        .catch(err => console.error('Lỗi khi gọi API:', err));
    } 
    // Nếu không có cả category lẫn query, tải toàn bộ sản phẩm
    else {
      getAllProducts()
        .then(res => setProducts(res.data))
        .catch(err => console.error('Lỗi khi gọi API:', err));
    }
  }, [category, query]);

  return (
    <div className="product-page-container">
      <h1>Danh sách Sản phẩm</h1>
      <ProductList products={products} />
    </div>
  );
}

export default ProductPage;
