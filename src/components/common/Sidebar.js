import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const categories = [
  { value: 'RAU_CU_TRAI_CAY', label: 'Rau củ, trái cây' },
  { value: 'NUOC_GIAI_KHAT', label: 'Nước giải khát' },
  { value: 'BANH_KEO', label: 'Bánh kẹo' },
  { value: 'VAN_PHONG_PHAM', label: 'Văn phòng phẩm' },
  { value: 'DO_DONG_LANH', label: 'Đồ đông lạnh' },
  { value: 'PHAN_BON', label: 'Phân bón' },
  { value: 'MI_TOM', label: 'Mì tôm' },
  { value: 'DO_DUNG_GIA_DINH', label: 'Đồ dùng gia đình' },
  { value: 'KEM', label: 'Kem' },
  { value: 'SUA', label: 'Sữa tươi' },
  { value: 'KHAC', label: 'Khác' }
];

function Sidebar() {
  const navigate = useNavigate();

  const handleClick = category => {
    // Chuyển hướng sang trang product list, truyền giá trị category qua query parameter
    navigate(`/products?category=${category}`);
  };

  return (
    <aside className="sidebar-container">
      <h3>Danh mục sản phẩm</h3>
      <ul>
        {categories.map(cat => (
          <li key={cat.value} onClick={() => handleClick(cat.value)}>
            {cat.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
