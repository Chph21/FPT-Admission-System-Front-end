import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Tuyển sinh ĐẠI HỌC năm học 2025</h1>
          <h2>chính thức bắt đầu!</h2>
          <Link to="/dang-ky" className="cta-button">ĐĂNG KÝ NGAY</Link>
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
              <p>Chương trình đào tạo chuẩn quốc tế. Giảng viên Trường Đại học FPT là các chuyên gia trong và ngoài nước, dày dặn chuyên môn sư phạm và kinh nghiệm thực chiến</p>
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>ĐĂNG KÝ XÉT TUYỂN NGAY HÔM NAY</h2>
            <p>VỮNG CHẮC TƯƠNG LAI NGÀY MAI</p>
            <Link to="/dang-ky" className="cta-button">ĐĂNG KÝ NGAY</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 