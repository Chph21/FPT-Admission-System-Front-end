import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building, 
  Globe, 
  MessageSquare,
  Facebook,
  Youtube,
  Instagram,
  Linkedin
} from 'lucide-react';


interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const campuses = [
    {
      name: 'Cơ sở Hà Nội',
      address: 'Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Q.9, TP.HCM',
      phone: '028 7300 1866',
      email: 'daihoc.hcm@fpt.edu.vn'
    },
    {
      name: 'Cơ sở TP.HCM',
      address: 'Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Q.9, TP.HCM',
      phone: '028 7300 1866',
      email: 'daihoc.hcm@fpt.edu.vn'
    },
    {
      name: 'Cơ sở Đà Nẵng',
      address: '137 Nguyễn Thị Thập, Quận Liên Chiểu, TP. Đà Nẵng',
      phone: '0236 730 1866',
      email: 'daihoc.danang@fpt.edu.vn'
    },
    {
      name: 'Cơ sở Cần Thơ',
      address: '160 30/4, P.An Phú, Q.Ninh Kiều, TP.Cần Thơ',
      phone: '0292 730 1866',
      email: 'daihoc.cantho@fpt.edu.vn'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="relative w-full h-[400px] bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: "url('/backgr.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-wide drop-shadow-2xl mb-4">
              Liên hệ
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl mx-auto drop-shadow-2xl font-medium">
              Kết nối với chúng tôi để được tư vấn và hỗ trợ
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Thông tin liên hệ
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Liên hệ với chúng tôi qua các kênh sau để được tư vấn và hỗ trợ tốt nhất
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Điện thoại</h3>
              <p className="text-blue-100">028 7300 1866</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-green-100">daihoc.hcm@fpt.edu.vn</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Địa chỉ</h3>
              <p className="text-purple-100">Lô E2a-7, Đường D1, Khu Công nghệ cao</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Giờ làm việc</h3>
              <p className="text-orange-100">8:00 - 17:00 (T2-T6)</p>
            </div>
          </div>

          {/* Campus Locations */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Các cơ sở</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campuses.map((campus, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg text-white">
                      <Building className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2">{campus.name}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {campus.address}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {campus.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {campus.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-orange-500" />
                Gửi tin nhắn
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0123456789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chủ đề *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="tư-vấn-tuyển-sinh">Tư vấn tuyển sinh</option>
                      <option value="thông-tin-ngành-học">Thông tin ngành học</option>
                      <option value="học-phí">Học phí</option>
                      <option value="kí-túc-xá">Kí túc xá</option>
                      <option value="khác">Khác</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Globe className="w-8 h-8 text-orange-500" />
                  Bản đồ
                </h3>
                <div className="bg-gray-200 rounded-lg h-80 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.484123456789!2d106.8064!3d10.8416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xf752c24b43b042bd!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgLSBDxqEgc-G7nyBI4buHcCBCw6_AgdG9pbmc!5e0!3m2!1svi!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Đại học FPT TP.HCM"
                  ></iframe>
                </div>
                <div className="mt-4 text-center text-gray-600">
                  <p className="font-medium">Đại học FPT TP.HCM</p>
                  <p className="text-sm">Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Q.9, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">
            Kết nối với chúng tôi
          </h3>
          <p className="text-white text-lg mb-8 opacity-90">
            Theo dõi các kênh truyền thông để cập nhật thông tin mới nhất
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="bg-white p-4 rounded-full hover:bg-gray-100 transition-colors duration-300">
              <Facebook className="w-6 h-6 text-blue-600" />
            </a>
            <a href="#" className="bg-white p-4 rounded-full hover:bg-gray-100 transition-colors duration-300">
              <Youtube className="w-6 h-6 text-red-600" />
            </a>
            <a href="#" className="bg-white p-4 rounded-full hover:bg-gray-100 transition-colors duration-300">
              <Instagram className="w-6 h-6 text-pink-600" />
            </a>
            <a href="#" className="bg-white p-4 rounded-full hover:bg-gray-100 transition-colors duration-300">
              <Linkedin className="w-6 h-6 text-blue-700" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 