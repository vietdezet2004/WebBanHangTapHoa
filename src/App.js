// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Các trang chung
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
// Trang sản phẩm
import ProductPage from './pages/ProductPage';
import ProductDetail from './components/product/ProductDetail';

// Trang giỏ hàng & thanh toán
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

// Trang Admin (sử dụng nested routes)
import AdminDashboard from './pages/AdminDashboard'; // Component quản lý sidebar admin và Outlet cho các trang admin con
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminProductList from './pages/AdminProductList';
import AdminOrderList from './pages/AdminOrderList';

// Layout và PrivateRoute
import MainLayout from './layout/MainLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        {/* Public routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/orders/my"
          element={
            <MainLayout>
              <MyOrders />
            </MainLayout>
          }
        />

        {/* Admin routes: Đặt trong MainLayout */}
        <Route
          path="/admin/*"
          element={
            <MainLayout>
              <PrivateRoute requiredRole="ADMIN">
                <AdminDashboard />
              </PrivateRoute>
            </MainLayout>
          }
        >
          <Route index element={<AdminProductList />} />
          <Route path="products" element={<AdminProductList />} />
          <Route path="add-product" element={<AdminAddProduct />} />
          <Route path="edit-product/:id" element={<AdminEditProduct />} />
          <Route path="orders" element={<AdminOrderList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
