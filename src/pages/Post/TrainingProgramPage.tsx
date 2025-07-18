import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Car, 
  Shield, 
  Smartphone, 
  Palette, 
  Microchip, 
  Brain, 
  Scale, 
  Globe, 
  TrendingUp, 
  Megaphone, 
  Monitor, 
  Languages, 
  Flag, 
  BookOpen,
  GraduationCap,
  Users,
  Briefcase,
  Building,
  DollarSign,
  Plane,
  Hotel,
  Camera,
  Newspaper,
  Globe2,
  Zap,
  Target,
  Award
} from 'lucide-react';

interface PostLinkItem {
    name: string;
    icon: JSX.Element;
    category: string;
    title: string;
    description: string;
    duration: string;
    degree: string;
}

interface PostResponse {
    id: number;
    title: string;
}

const fetchPostUrl = async (category: string, title: string): Promise<string> => {
    const encodedTitle = encodeURIComponent(title);
    const res = await fetch(`https://fpt-admission-system.onrender.com/api/posts/${category}/${encodedTitle}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const data: PostResponse = await res.json();
    return `/posts/${data.id}`;
};

// Modern icons mapping
const getIcon = (name: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
        'An toàn thông tin': <Shield className="w-6 h-6" />,
        'Công nghệ ô tô số': <Car className="w-6 h-6" />,
        'Kỹ thuật phần mềm': <Code className="w-6 h-6" />,
        'Chuyển đổi số': <Zap className="w-6 h-6" />,
        'Thiết kế mỹ thuật số': <Palette className="w-6 h-6" />,
        'Thiết kế vi mạch bán dẫn': <Microchip className="w-6 h-6" />,
        'Trí tuệ nhân tạo': <Brain className="w-6 h-6" />,
        'Luật kinh tế': <Scale className="w-6 h-6" />,
        'Luật thương mại quốc tế': <Globe className="w-6 h-6" />,
        'Công nghệ tài chính (Fintech)': <TrendingUp className="w-6 h-6" />,
        'Digital Marketing': <Target className="w-6 h-6" />,
        'Kinh doanh quốc tế': <Building className="w-6 h-6" />,
        'Logistics & quản lý chuỗi cung ứng toàn cầu': <Briefcase className="w-6 h-6" />,
        'Quản trị khách sạn': <Hotel className="w-6 h-6" />,
        'Quản trị dịch vụ du lịch & lữ hành': <Plane className="w-6 h-6" />,
        'Tài chính doanh nghiệp': <DollarSign className="w-6 h-6" />,
        'Ngân hàng số - Tài chính': <TrendingUp className="w-6 h-6" />,
        'Tài chính đầu tư': <DollarSign className="w-6 h-6" />,
        'Quan hệ công chúng': <Megaphone className="w-6 h-6" />,
        'Truyền thông đa phương tiện': <Camera className="w-6 h-6" />,
        'Ngôn ngữ Anh': <Languages className="w-6 h-6" />,
        'Song ngữ Trung-Anh': <Flag className="w-6 h-6" />,
        'Song ngữ Nhật-Anh': <Flag className="w-6 h-6" />,
        'Song ngữ Hàn-Anh': <Flag className="w-6 h-6" />,
    };
    return iconMap[name] || <BookOpen className="w-6 h-6" />;
};

const majorsData = [
    {
        group: 'Công nghệ thông tin',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        items: [
            { 
                name: 'An toàn thông tin', 
                icon: getIcon('An toàn thông tin'), 
                category: 'KHOA_HOC', 
                title: 'An toàn thông tin',
                description: 'Bảo vệ hệ thống thông tin và dữ liệu số',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Công nghệ ô tô số', 
                icon: getIcon('Công nghệ ô tô số'), 
                category: 'KHOA_HOC', 
                title: 'Công nghệ ô tô số',
                description: 'Phát triển công nghệ xe tự lái và điện',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Kỹ thuật phần mềm', 
                icon: getIcon('Kỹ thuật phần mềm'), 
                category: 'KHOA_HOC', 
                title: 'Kỹ thuật phần mềm',
                description: 'Phát triển ứng dụng và hệ thống phần mềm',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Chuyển đổi số', 
                icon: getIcon('Chuyển đổi số'), 
                category: 'KHOA_HOC', 
                title: 'Chuyển đổi số',
                description: 'Thúc đẩy chuyển đổi số trong doanh nghiệp',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Thiết kế mỹ thuật số', 
                icon: getIcon('Thiết kế mỹ thuật số'), 
                category: 'KHOA_HOC', 
                title: 'Thiết kế mỹ thuật số',
                description: 'Sáng tạo thiết kế đồ họa và UI/UX',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Thiết kế vi mạch bán dẫn', 
                icon: getIcon('Thiết kế vi mạch bán dẫn'), 
                category: 'KHOA_HOC', 
                title: 'Thiết kế vi mạch bán dẫn',
                description: 'Thiết kế chip và vi mạch điện tử',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Trí tuệ nhân tạo', 
                icon: getIcon('Trí tuệ nhân tạo'), 
                category: 'KHOA_HOC', 
                title: 'Trí tuệ nhân tạo',
                description: 'Phát triển AI và machine learning',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
        ],
    },
    {
        group: 'Luật',
        color: 'from-purple-500 to-indigo-500',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        items: [
            { 
                name: 'Luật kinh tế', 
                icon: getIcon('Luật kinh tế'), 
                category: 'KHOA_HOC', 
                title: 'Luật kinh tế',
                description: 'Tư vấn pháp lý trong lĩnh vực kinh tế',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Luật thương mại quốc tế', 
                icon: getIcon('Luật thương mại quốc tế'), 
                category: 'KHOA_HOC', 
                title: 'Luật thương mại quốc tế',
                description: 'Luật pháp trong thương mại quốc tế',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
        ],
    },
    {
        group: 'Quản trị kinh doanh',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        items: [
            { 
                name: 'Công nghệ tài chính (Fintech)', 
                icon: getIcon('Công nghệ tài chính (Fintech)'), 
                category: 'KHOA_HOC', 
                title: 'Công nghệ tài chính (Fintech)',
                description: 'Công nghệ trong lĩnh vực tài chính',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Digital Marketing', 
                icon: getIcon('Digital Marketing'), 
                category: 'KHOA_HOC', 
                title: 'Digital Marketing',
                description: 'Marketing trong môi trường số',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Kinh doanh quốc tế', 
                icon: getIcon('Kinh doanh quốc tế'), 
                category: 'KHOA_HOC', 
                title: 'Kinh doanh quốc tế',
                description: 'Quản lý kinh doanh toàn cầu',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Logistics & quản lý chuỗi cung ứng toàn cầu', 
                icon: getIcon('Logistics & quản lý chuỗi cung ứng toàn cầu'), 
                category: 'KHOA_HOC', 
                title: 'Logistics & quản lý chuỗi cung ứng toàn cầu',
                description: 'Quản lý vận chuyển và chuỗi cung ứng',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Quản trị khách sạn', 
                icon: getIcon('Quản trị khách sạn'), 
                category: 'KHOA_HOC', 
                title: 'Quản trị khách sạn',
                description: 'Quản lý hoạt động khách sạn',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Quản trị dịch vụ du lịch & lữ hành', 
                icon: getIcon('Quản trị dịch vụ du lịch & lữ hành'), 
                category: 'KHOA_HOC', 
                title: 'Quản trị dịch vụ du lịch & lữ hành',
                description: 'Quản lý dịch vụ du lịch',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Tài chính doanh nghiệp', 
                icon: getIcon('Tài chính doanh nghiệp'), 
                category: 'KHOA_HOC', 
                title: 'Tài chính doanh nghiệp',
                description: 'Quản lý tài chính doanh nghiệp',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Ngân hàng số - Tài chính', 
                icon: getIcon('Ngân hàng số - Tài chính'), 
                category: 'KHOA_HOC', 
                title: 'Ngân hàng số - Tài chính',
                description: 'Tài chính số và ngân hàng điện tử',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Tài chính đầu tư', 
                icon: getIcon('Tài chính đầu tư'), 
                category: 'KHOA_HOC', 
                title: 'Tài chính đầu tư',
                description: 'Quản lý đầu tư và tài chính',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
        ],
    },
    {
        group: 'Ngôn ngữ & truyền thông',
        color: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        items: [
            { 
                name: 'Quan hệ công chúng', 
                icon: getIcon('Quan hệ công chúng'), 
                category: 'KHOA_HOC', 
                title: 'Quan hệ công chúng',
                description: 'Xây dựng hình ảnh và thương hiệu',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Truyền thông đa phương tiện', 
                icon: getIcon('Truyền thông đa phương tiện'), 
                category: 'KHOA_HOC', 
                title: 'Truyền thông đa phương tiện',
                description: 'Sản xuất nội dung đa phương tiện',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
        ],
    },
    {
        group: 'Ngôn ngữ',
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        items: [
            { 
                name: 'Ngôn ngữ Anh', 
                icon: getIcon('Ngôn ngữ Anh'), 
                category: 'KHOA_HOC', 
                title: 'Ngôn ngữ Anh',
                description: 'Chuyên ngành tiếng Anh',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Song ngữ Trung-Anh', 
                icon: getIcon('Song ngữ Trung-Anh'), 
                category: 'KHOA_HOC', 
                title: 'Song ngữ Trung-Anh',
                description: 'Chuyên ngành tiếng Trung và tiếng Anh',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Song ngữ Nhật-Anh', 
                icon: getIcon('Song ngữ Nhật-Anh'), 
                category: 'KHOA_HOC', 
                title: 'Song ngữ Nhật-Anh',
                description: 'Chuyên ngành tiếng Nhật và tiếng Anh',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
            { 
                name: 'Song ngữ Hàn-Anh', 
                icon: getIcon('Song ngữ Hàn-Anh'), 
                category: 'KHOA_HOC', 
                title: 'Song ngữ Hàn-Anh',
                description: 'Chuyên ngành tiếng Hàn và tiếng Anh',
                duration: '4 năm',
                degree: 'Cử nhân'
            },
        ],
    },
];

const TrainingProgramsPage: React.FC = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const handleNavigate = async (category: string, title: string) => {
        try {
            const url = await fetchPostUrl(category, title);
            navigate(url);
        } catch (error) {
            console.error('Không tìm thấy bài viết phù hợp:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div
                    className="relative w-full h-[400px] bg-center bg-cover flex items-center justify-center"
                    style={{
                        backgroundImage:
                            "url('https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif')",
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-wide drop-shadow-lg mb-4">
                            Chương trình đào tạo
                        </h1>
                        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto drop-shadow-lg">
                            Khám phá các ngành học đa dạng với chương trình đào tạo hiện đại
                        </p>
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-500 rounded-full opacity-20 animate-pulse delay-2000"></div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
                            <div className="text-gray-600">Ngành học</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
                            <div className="text-gray-600">Năm đào tạo</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                            <div className="text-gray-600">Tỷ lệ việc làm</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                            <div className="text-gray-600">Đối tác doanh nghiệp</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Majors Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Khám phá các ngành học
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Chọn ngành học phù hợp với đam mê và định hướng nghề nghiệp của bạn
                        </p>
                    </div>

                    <div className="space-y-12">
                        {majorsData.map((group, groupIdx) => (
                            <div key={groupIdx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className={`bg-gradient-to-r ${group.color} p-8`}>
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <GraduationCap className="w-8 h-8" />
                                        {group.group}
                                    </h3>
                                </div>
                                
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {group.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`group relative bg-white border-2 ${group.borderColor} rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                                                    hoveredCard === `${groupIdx}-${index}` ? 'border-orange-400 shadow-lg' : ''
                                                }`}
                                                onMouseEnter={() => setHoveredCard(`${groupIdx}-${index}`)}
                                                onMouseLeave={() => setHoveredCard(null)}
                                                onClick={() => handleNavigate(item.category, item.title)}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-lg bg-gradient-to-r ${group.color} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm mb-3">
                                                            {item.description}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <Award className="w-4 h-4" />
                                                                {item.degree}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Users className="w-4 h-4" />
                                                                {item.duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Hover effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Sẵn sàng bắt đầu hành trình?
                    </h3>
                    <p className="text-white text-lg mb-8 opacity-90">
                        Đăng ký ngay để được tư vấn và hỗ trợ thông tin chi tiết về các ngành học
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                            Đăng ký tư vấn
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-300">
                            Xem thêm thông tin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingProgramsPage;