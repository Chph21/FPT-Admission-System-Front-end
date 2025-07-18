import React from 'react';
import { 
  Award, 
  Users, 
  Globe, 
  BookOpen, 
  GraduationCap, 
  Building, 
  Target, 
  Heart,
  Star,
  Trophy,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Shield,
  Zap,
  Users2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';


const AboutPage: React.FC = () => {
  const achievements = [
    { number: '25+', label: 'Năm thành lập', icon: <Calendar className="w-8 h-8" /> },
    { number: '50,000+', label: 'Sinh viên', icon: <Users className="w-8 h-8" /> },
    { number: '98%', label: 'Tỷ lệ việc làm', icon: <CheckCircle className="w-8 h-8" /> },
    { number: '500+', label: 'Đối tác doanh nghiệp', icon: <Building className="w-8 h-8" /> },
    { number: '25+', label: 'Ngành học', icon: <BookOpen className="w-8 h-8" /> },
    { number: '4', label: 'Cơ sở đào tạo', icon: <MapPin className="w-8 h-8" /> }
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Sứ mệnh',
      description: 'Đào tạo nguồn nhân lực chất lượng cao, đáp ứng nhu cầu phát triển của xã hội và hội nhập quốc tế.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'Tầm nhìn',
      description: 'Trở thành trường đại học hàng đầu Việt Nam và khu vực về đào tạo công nghệ thông tin và truyền thông.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Giá trị cốt lõi',
      description: 'Chất lượng, sáng tạo, trách nhiệm, hợp tác và phát triển bền vững.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const strengths = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Công nghệ tiên tiến',
      description: 'Được trang bị cơ sở vật chất hiện đại, phòng lab tiên tiến'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Hợp tác quốc tế',
      description: 'Liên kết với hơn 200 trường đại học và doanh nghiệp quốc tế'
    },
    {
      icon: <Users2 className="w-8 h-8" />,
      title: 'Đội ngũ giảng viên',
      description: '100% giảng viên có trình độ thạc sĩ trở lên, nhiều kinh nghiệm'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Chất lượng đào tạo',
      description: 'Chương trình đào tạo được kiểm định chất lượng quốc tế'
    }
  ];

  const timeline = [
    {
      year: '2006',
      title: 'Thành lập',
      description: 'Trường Đại học FPT được thành lập với sứ mệnh đào tạo nguồn nhân lực CNTT chất lượng cao'
    },
    {
      year: '2010',
      title: 'Mở rộng',
      description: 'Mở thêm cơ sở tại TP.HCM và các ngành học mới'
    },
    {
      year: '2015',
      title: 'Phát triển',
      description: 'Trở thành một trong những trường đại học hàng đầu về CNTT tại Việt Nam'
    },
    {
      year: '2020',
      title: 'Đổi mới',
      description: 'Áp dụng công nghệ 4.0 vào đào tạo, mở rộng hợp tác quốc tế'
    },
    {
      year: '2024',
      title: 'Tương lai',
      description: 'Tiếp tục phát triển, đào tạo nhân lực cho cuộc cách mạng công nghiệp 4.0'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="relative w-full h-[500px] bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: "url('/backgr.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-wide drop-shadow-2xl mb-4">
              Giới thiệu
            </h1>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto drop-shadow-2xl font-medium">
              Trường Đại học FPT - Nơi ươm mầm tài năng công nghệ tương lai
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Về Trường Đại học FPT
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Trường Đại học FPT được thành lập năm 2006, là một trong những trường đại học 
                đầu tiên tại Việt Nam đào tạo chuyên sâu về Công nghệ thông tin và Truyền thông.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Với hơn 25 năm kinh nghiệm trong lĩnh vực giáo dục, chúng tôi tự hào là nơi 
                đào tạo ra những thế hệ sinh viên xuất sắc, đáp ứng nhu cầu phát triển của xã hội.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <Award className="w-6 h-6" />
                  <span className="font-semibold">Top 10 trường đại học Việt Nam</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Thống kê nổi bật</h3>
                <div className="grid grid-cols-2 gap-6">
                  {achievements.slice(0, 4).map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold mb-1">{item.number}</div>
                      <div className="text-sm opacity-90">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Sứ mệnh - Tầm nhìn - Giá trị
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Những định hướng chiến lược của chúng tôi trong sự nghiệp giáo dục
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Điểm mạnh của chúng tôi
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Những yếu tố tạo nên sự khác biệt và chất lượng đào tạo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((strength, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {strength.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{strength.title}</h3>
                <p className="text-gray-600 text-sm">{strength.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Lịch sử phát triển
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Hành trình 25 năm xây dựng và phát triển
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-500 h-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-2">{item.year}</div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="py-16 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-8">
            Liên hệ với chúng tôi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 text-white">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Điện thoại</h4>
              <p>028 7300 1866</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6 text-white">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Email</h4>
              <p>daihoc.hcm@fpt.edu.vn</p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl p-6 text-white">
              <Clock className="w-8 h-8 mx-auto mb-4" />
              <h4 className="font-bold mb-2">Giờ làm việc</h4>
              <p>8:00 - 17:00 (T2-T6)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 