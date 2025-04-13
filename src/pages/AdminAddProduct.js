import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/styles/AdminAddProduct.css';

function AdminAddProduct() {
  const [productname, setProductname] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState('KHAC'); // mặc định là KHAC
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Kiểm tra quyền admin
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
    } else {
      const user = JSON.parse(userStr);
      if (user.Role !== 'ADMIN') {
        alert('Bạn không có quyền truy cập trang này!');
        navigate('/');
      }
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productname', productname);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('weight', weight);
    formData.append('category', category); // gửi loại sản phẩm
    if (img) {
      formData.append('img', img);
    }

    try {
      await api.post('/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Thêm sản phẩm thành công!');
      setProductname('');
      setDescription('');
      setPrice('');
      setWeight('');
      setImg(null);
      setCategory('KHAC'); // reset về mặc định
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      setMessage('Có lỗi xảy ra khi thêm sản phẩm.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Trang Admin - Thêm Sản Phẩm</h2>
      {message && <p className="admin-message">{message}</p>}
      <form
        className="admin-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={productname}
            onChange={e => setProductname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mô tả sản phẩm:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Giá:</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cân nặng:</label>
          <input
            type="number"
            step="0.01"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Loại sản phẩm:</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="RAU_CU_TRAI_CAY">Rau củ, trái cây</option>
            <option value="NUOC_GIAI_KHAT">Nước giải khát</option>
            <option value="BANH_KEO">Bánh kẹo</option>
            <option value="VAN_PHONG_PHAM">Văn phòng phẩm</option>
            <option value="DO_DONG_LANH">Đồ đông lạnh</option>
            <option value="PHAN_BON">Phân bón</option>
            <option value="MI_TOM">Mì tôm</option>
            <option value="DO_DUNG_GIA_DINH">Đồ dùng gia đình</option>
            <option value="KEM">Kem</option>
            <option value="SUA">Sữa tươi</option>
            <option value="KHAC">Khác</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ảnh sản phẩm:</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImg(e.target.files[0])}
          />
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
