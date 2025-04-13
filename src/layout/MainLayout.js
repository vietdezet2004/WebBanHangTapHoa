import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
