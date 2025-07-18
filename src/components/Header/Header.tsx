import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slice/authSlice';
import { User, LogOut, Search, Globe, Menu, X, ChevronDown } from 'lucide-react';
import logo from '../../assets/Logo_Trường_Đại_học_FPT.svg.png';
import './Header.css';

// Language context
interface LanguageContextType {
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  vi: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    news: 'Tin tức & Sự kiện',
    majors: 'Ngành học',
    admission: 'Tuyển sinh',
    experience: 'Trải nghiệm toàn cầu',
    alumni: 'Cựu sinh viên',
    chatbot: 'Trợ lý ảo',
    contact: 'Liên hệ',
    login: 'Đăng nhập',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    search: 'Tìm kiếm...',
    welcome: 'Chào mừng',
  },
  en: {
    home: 'Home',
    about: 'About',
    news: 'News & Events',
    majors: 'Majors',
    admission: 'Admission',
    experience: 'Global Experience',
    alumni: 'Alumni',
    chatbot: 'AI Assistant',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    search: 'Search...',
    welcome: 'Welcome',
  }
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLanguageChange = (lang: 'vi' | 'en') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const t = (key: string) => translations[language][key as keyof typeof translations.vi] || key;

  const navItems = [
    { to: '/', label: t('home') },
    { to: '/gioi-thieu', label: t('about') },
    { to: '/tin-tuc', label: t('news') },
    { to: '/nganh-hoc', label: t('majors') },
    { to: '/trai-nghiem', label: t('experience') },
    { to: '/cuu-sinh-vien', label: t('alumni') },
    { to: '/chatbot', label: t('chatbot') },
    { to: '/lien-he', label: t('contact') },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-top">
          <div className="container">
            <div className="header-top-content">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="FPT University" />
                </Link>
              </div>
              
              <div className="header-right">
                {/* Search */}
                <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                  <button className="search-toggle" onClick={toggleSearch}>
                    <Search size={20} />
                  </button>
                  <div className="search-box">
                    <input 
                      type="text" 
                      placeholder={t('search')}
                      className="search-input"
                    />
                    <button className="search-btn">
                      <Search size={16} />
                    </button>
                  </div>
                </div>

                {/* Language Switcher */}
                <div className="language-container">
                  <button className="language-toggle" onClick={toggleLanguage}>
                    <Globe size={20} />
                    <span className="current-lang">{language.toUpperCase()}</span>
                    <ChevronDown size={16} className={`chevron ${isLanguageOpen ? 'rotated' : ''}`} />
                  </button>
                  <div className={`language-dropdown ${isLanguageOpen ? 'open' : ''}`}>
                    <button 
                      className={`lang-option ${language === 'vi' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('vi')}
                    >
                      🇻🇳 Tiếng Việt
                    </button>
                    <button 
                      className={`lang-option ${language === 'en' ? 'active' : ''}`}
                      onClick={() => handleLanguageChange('en')}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                </div>

                {/* User Section */}
                {isAuthenticated && user ? (
                  <div className="user-section">
                    <div className="user-info">
                      <div className="user-avatar">
                        <User size={16} />
                      </div>
                      <span className="user-name">{user.name}</span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="auth-btn logout-btn"
                    >
                      <LogOut size={16} />
                      {t('logout')}
                    </button>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <Link to="/login" className="auth-btn login-btn">
                      {t('login')}
                    </Link>
                    <Link to="/register" className="auth-btn register-btn">
                      {t('register')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="main-nav">
          <div className="container">
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {navItems.map((item, index) => {
                const isActive = item.to === '/' 
                  ? location.pathname === '/' 
                  : location.pathname === item.to || location.pathname.startsWith(item.to);
                return (
                  <li key={index}>
                    <Link 
                      to={item.to} 
                      onClick={() => setIsMenuOpen(false)}
                      className={isActive ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>
    </LanguageContext.Provider>
  );
};

export default Header; 