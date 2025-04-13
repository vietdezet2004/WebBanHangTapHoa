import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/styles/AdminProductList.css';

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/product/').then(res => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await api.delete(`/product/del/${id}`);
        setProducts(prev => prev.filter(p => p.productid !== id));
        alert('Xóa thành công!');
      } catch (err) {
        console.error(err);
        alert('Xóa thất bại!');
      }
    }
  };

  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Quản lý sản phẩm</h2>
      <div className="admin-actions">
        <button onClick={() => navigate('/admin/add-product')}>
          + Thêm sản phẩm
        </button>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.productid}>
              <td>{product.productid}</td>
              <td>{product.productName}</td>
              <td>{product.price}₫</td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/admin/edit-product/${product.productid}`)
                  }
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.productid)}
                  className="delete-btn"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductList;
