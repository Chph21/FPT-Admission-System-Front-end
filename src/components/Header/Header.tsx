import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo_Trường_Đại_học_FPT.svg.png';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="FPT University" />
              </Link>
            </div>
            <div className="header-right">
              <div className="language-switch">
                <button className="lang-btn active">VI</button>
                <button className="lang-btn">EN</button>
              </div>
              <div className="search-box">
                <input type="text" placeholder="Tìm kiếm..." />
                <button type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-nav">
        <div className="container">
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/gioi-thieu">Giới thiệu</Link></li>
            <li><Link to="/tin-tuc">Tin tức & Sự kiện</Link></li>
            <li><Link to="/nganh-hoc">Ngành học</Link></li>
            <li><Link to="/tuyen-sinh">Tuyển sinh</Link></li>
            <li><Link to="/trai-nghiem">Trải nghiệm toàn cầu</Link></li>
            <li><Link to="/sinh-vien">Sinh viên</Link></li>
            <li><Link to="/cuu-sinh-vien">Cựu Sinh viên</Link></li>
            <li><Link to="/lien-he">Liên hệ</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header; 