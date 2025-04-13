import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../assets/styles/AdminEditProduct.css';

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productname: '',
    description: '',
    price: '',
    weight: '',
    category: 'KHAC'
  });
  const [originalProduct, setOriginalProduct] = useState(null);
  const [img, setImg] = useState(null);
  const [originalImg, setOriginalImg] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/product/${id}`).then(res => {
      const data = res.data;
      const loadedProduct = {
        productname: data.productName,
        description: data.description,
        price: data.price,
        weight: data.weight,
        category: data.category
      };
      setProduct(loadedProduct);
      setOriginalProduct(loadedProduct);

      if (data.imgUrl) {
        setOriginalImg(data.imgUrl);
      } else {
        setOriginalImg(null);
      }
    });
  }, [id]);

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = () => {
    setImg(null);
  };

  const isProductChanged = () => {
    if (!originalProduct) return true;
    return (
      product.productname !== originalProduct.productname ||
      product.description !== originalProduct.description ||
      product.price !== originalProduct.price ||
      product.weight !== originalProduct.weight ||
      product.category !== originalProduct.category ||
      img !== null
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isProductChanged()) {
      setMessage('Bạn chưa thay đổi dữ liệu gì - cập nhật thất bại');
      return;
    }

    const formData = new FormData();
    formData.append('productname', product.productname);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('weight', product.weight);
    formData.append('category', product.category);

    if (img !== null) {
      formData.append('img', img);
    }

    try {
      await api.put(`/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Cập nhật thành công!');
      setTimeout(() => navigate('/admin/products'), 1000);
    } catch (err) {
      console.error(err);
      setMessage('Cập nhật thất bại!');
    }
  };

  return (
    <div className="admin-container">
      <h2>Sửa sản phẩm</h2>
      {message && <p className="admin-message">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="productname"
            value={product.productname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mô tả:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cân nặng:</label>
          <input
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Danh mục:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="RAU_CU_TRAI_CAY">Rau củ, trái cây</option>
            <option value="NUOC_GIAI_KHAT">Nước giải khát</option>
            <option value="BANH_KEO">Bánh kẹo</option>
            <option value="VAN_PHONG_PHAM">Văn phòng phẩm</option>
            <option value="DO_DONG_LANH">Đồ đông lạnh</option>
            <option value="PHAN_BON">Phân bón</option>
            <option value="MI_TOM">Mì tôm</option>
            <option value="DO_DUNG_GIA_DINH">Đồ dùng gia đình</option>
            <option value="KEM"></option>
            <option value="SUA">Sữa tươi</option>
            <option value="KHAC">Khác</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ảnh hiện tại:</label>
          {originalImg ? (
            <img
              src={originalImg}
              alt="Ảnh hiện tại"
              style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
            />
          ) : (
            <p>Không có ảnh</p>
          )}
        </div>
        <div className="form-group">
          <label>Ảnh mới (nếu muốn thay):</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImg(e.target.files[0])}
          />
          {img && (
            <button
              type="button"
              onClick={handleRemoveImage}
              style={{ marginTop: '10px' }}
            >
              Xóa ảnh đã chọn
            </button>
          )}
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
