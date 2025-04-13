import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Quản lý sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-product"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Thêm sản phẩm
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Đơn hàng
            </NavLink>
          </li>
        </ul>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
