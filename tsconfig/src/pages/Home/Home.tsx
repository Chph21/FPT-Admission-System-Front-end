import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slice/authSlice';
import { User, LogOut, UserPlus, ArrowRight, Phone, Mail, Clock, CheckCircle, Star } from 'lucide-react';
import './Home.css';
import AdmissionTicketForm from '../../components/admission/AdmissionTicket/AdmissionTicketForm';
import '../../components/admission/AdmissionTicket/AdmissionTicket.css';
import AdmissionTicketSticker from '../../components/admission/AdmissionTicket/AdmissionTicketSticker';
import fptLogo from '../../assets/Logo_Trường_Đại_học_FPT.svg.png';

const Home: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleTicketSubmit = (ticket: any) => {
    setTickets([
      ...tickets,
      {
        ...ticket,
        id: tickets.length + 1,
        createDate: new Date().toISOString(),
        response: '',
      },
    ]);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="home">
      {/* User Status Bar */}
      {isAuthenticated && user && (
        <div className="user-status-bar">
          <div className="container">
            <div className="user-info">
              <User className="user-icon" />
              <span className="welcome-text">Xin chào, {user.name}!</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut className="logout-icon" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${fptLogo})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Tuyển sinh ĐẠI HỌC năm học 2025</h1>
          <h2>chính thức bắt đầu!</h2>
          <Link to="/admission-schedule" className="cta-button">ĐĂNG KÝ NGAY</Link>
          {isAuthenticated ? (
            <div className="authenticated-actions">
              <Link to="/dashboard" className="cta-button">VÀO HỆ THỐNG</Link>
              <p className="auth-status">Bạn đã đăng nhập thành công!</p>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/register" className="cta-button">ĐĂNG KÝ NGAY</Link>
              <Link to="/login" className="secondary-button">
                <UserPlus className="login-icon" />
                ĐĂNG NHẬP
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose FPT Section */}
      <section className="why-fpt">
        <div className="container">
          <h2 className="section-title">Vì sao hàng chục nghìn sinh viên chọn FPTU mỗi năm?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Trải nghiệm quốc tế vượt trội</h3>
              <p>Hiện Trường Đại học FPT đã hợp tác với hơn 200 đối tác tại 36 quốc gia. Sinh viên được du học ngắn hạn 3-6 tháng tại các đại học danh tiếng trên thế giới</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>Làm thật trong doanh nghiệp</h3>
              <p>100% sinh viên thực tập tại doanh nghiệp từ năm 3, tích lũy kinh nghiệm thực tế.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Giáo dục thế hệ mới</h3>
              <p>Chương trình đào tạo chuẩn quốc tế. Giảng viên Trường Đại học FPT là các chuyên gia trong và ngoài nước, dày dạn chuyên môn sư phạm và kinh nghiệm thực chiến</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Cơ hội việc làm toàn cầu</h3>
              <p>98% sinh viên FPTU có việc làm sau tốt nghiệp, 19% cựu sinh viên FPTU làm việc tại các nước phát triển như Anh, Mỹ, Đức, Nhật, Canada…</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs">
        <div className="container">
          <h2 className="section-title">Các ngành đào tạo HOT - Chuẩn xu thế AI & Kinh tế số</h2>
          <div className="programs-grid">
            <div className="program-card">
              <h3>Công nghệ thông tin</h3>
              <ul>
                <li>An toàn thông tin</li>
                <li>Công nghệ ô tô số</li>
                <li>Chuyển đổi số</li>
                <li>Kỹ thuật phần mềm</li>
                <li>Thiết kế mỹ thuật số</li>
                <li>Thiết kế vi mạch bán dẫn</li>
                <li>Trí tuệ nhân tạo</li>
              </ul>
            </div>
            <div className="program-card">
              <h3>Quản trị kinh doanh</h3>
              <ul>
                <li>Tài chính đầu tư</li>
                <li>Công nghệ tài chính (Fintech)</li>
                <li>Digital Marketing</li>
                <li>Kinh doanh quốc tế</li>
                <li>Logistics và quản lý chuỗi cung ứng</li>
              </ul>
            </div>
            <div className="program-card">
              <h3>Ngôn ngữ</h3>
              <ul>
                <li>Ngôn ngữ Anh</li>
                <li>Song ngữ Nhật - Anh</li>
                <li>Song ngữ Hàn - Anh</li>
                <li>Song ngữ Trung - Anh</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="enhanced-cta-section">
        <div className="container">
          <div className="cta-background">
            <div className="cta-content">
              <div className="cta-header">
                <div className="cta-badge">
                  <Star className="star-icon" />
                  <span>ƯU ĐÃI ĐẶC BIỆT</span>
                </div>
                <h2>ĐĂNG KÝ XÉT TUYỂN NGAY HÔM NAY</h2>
                <p className="cta-subtitle">VỮNG CHẮC TƯƠNG LAI NGÀY MAI</p>
              </div>
              
              <div className="cta-features">
                <div className="feature-item">
                  <CheckCircle className="check-icon" />
                  <span>Miễn phí đăng ký xét tuyển</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="check-icon" />
                  <span>Hỗ trợ tư vấn 24/7</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="check-icon" />
                  <span>Quy trình đơn giản, nhanh chóng</span>
                </div>
              </div>

              <div className="cta-actions">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="enhanced-cta-button primary">
                    <span>VÀO HỆ THỐNG</span>
                    <ArrowRight className="arrow-icon" />
                  </Link>
                ) : (
                  <Link to="/register" className="enhanced-cta-button primary">
                    <span>ĐĂNG KÝ NGAY</span>
                    <ArrowRight className="arrow-icon" />
                  </Link>
                )}
                <Link to="/admission-schedule" className="enhanced-cta-button secondary">
                  <span>XEM LỊCH TUYỂN SINH</span>
                  <Clock className="clock-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Consultation Section */}
      <section className="consultation-section">
        <div className="container">
          <div className="consultation-content">
            <div className="consultation-header">
              <h2>GỬI YÊU CẦU TƯ VẤN TUYỂN SINH</h2>
              <p>Đội ngũ tư vấn chuyên nghiệp sẵn sàng hỗ trợ bạn 24/7</p>
            </div>
            
            <div className="consultation-features">
              <div className="consultation-feature">
                <div className="feature-icon-wrapper">
                  <Phone className="phone-icon" />
                </div>
                <h3>Tư vấn qua điện thoại</h3>
                <p>Gọi ngay: 1900 636 191</p>
              </div>
              
              <div className="consultation-feature">
                <div className="feature-icon-wrapper">
                  <Mail className="mail-icon" />
                </div>
                <h3>Tư vấn qua email</h3>
                <p>daihocfpt@fpt.edu.vn</p>
              </div>
              
              <div className="consultation-feature">
                <div className="feature-icon-wrapper">
                  <Clock className="clock-icon" />
                </div>
                <h3>Thời gian tư vấn</h3>
                <p>8:00 - 22:00 (Thứ 2 - Chủ nhật)</p>
              </div>
            </div>

            <div className="consultation-form-wrapper">
              <AdmissionTicketForm onSubmit={handleTicketSubmit} />
            </div>
          </div>
        </div>
      </section>

      <AdmissionTicketSticker />
    </div>
  );
};

export default Home;