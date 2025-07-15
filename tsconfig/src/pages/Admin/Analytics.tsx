import React, { useState } from 'react';
import {
    Users,
    FileText,
    CheckCircle,
    Clock,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    Filter,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ComposedChart
} from 'recharts';

const Analytics: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('6months');

    const stats = [
        {
            name: 'Tổng ứng dụng',
            value: '2,847',
            change: '+12%',
            changeType: 'increase',
            icon: FileText,
            color: 'blue',
            description: 'Ứng dụng nhận được trong kỳ'
        },
        {
            name: 'Ứng dụng được phê duyệt',
            value: '1,892',
            change: '+8%',
            changeType: 'increase',
            icon: CheckCircle,
            color: 'green',
            description: 'Ứng dụng được phê duyệt thành công'
        },
        {
            name: 'Đang chờ phê duyệt',
            value: '743',
            change: '-5%',
            changeType: 'decrease',
            icon: Clock,
            color: 'yellow',
            description: 'Ứng dụng đang chờ phê duyệt'
        },
        {
            name: 'Người dùng hoạt động',
            value: '12,456',
            change: '+18%',
            changeType: 'increase',
            icon: Users,
            color: 'purple',
            description: 'Người dùng đăng ký hoạt động'
        }
    ];

    const monthlyData = [
        { month: 'Jul', applications: 234, approved: 189, rejected: 32, pending: 13, revenue: 45600 },
        { month: 'Aug', applications: 312, approved: 234, rejected: 45, pending: 33, revenue: 52800 },
        { month: 'Sep', applications: 398, approved: 298, rejected: 67, pending: 33, revenue: 67200 },
        { month: 'Oct', applications: 445, approved: 356, rejected: 54, pending: 35, revenue: 78400 },
        { month: 'Nov', applications: 523, approved: 412, rejected: 78, pending: 33, revenue: 89600 },
        { month: 'Dec', applications: 467, approved: 378, rejected: 62, pending: 27, revenue: 84000 },
    ];

    const departmentData = [
        { department: 'Khoa Học Máy Tính', applications: 456, acceptance_rate: 78 },
        { department: 'Kỹ Thuật', applications: 389, acceptance_rate: 72 },
        { department: 'Quản Lý Kinh Doanh', applications: 334, acceptance_rate: 85 },
        { department: 'Toán Học', applications: 267, acceptance_rate: 68 },
        { department: 'Tâm Lý Học', applications: 234, acceptance_rate: 82 },
        { department: 'Y Dược', applications: 198, acceptance_rate: 45 },
        { department: 'Luật', applications: 156, acceptance_rate: 38 },
        { department: 'Nghệ Thuật', applications: 134, acceptance_rate: 89 },
    ];

    const geographicData = [
        { region: 'Bắc Mỹ', applications: 1245, color: '#3b82f6' },
        { region: 'Châu Âu', applications: 892, color: '#10b981' },
        { region: 'Châu Á', applications: 567, color: '#f59e0b' },
        { region: 'Nam Mỹ', applications: 234, color: '#ef4444' },
        { region: 'Châu Phi', applications: 156, color: '#8b5cf6' },
        { region: 'Châu Đại Dương', applications: 89, color: '#06b6d4' },
    ];

    const conversionFunnelData = [
        { stage: 'Truy cập', count: 15420, percentage: 100 },
        { stage: 'Bắt đầu ứng dụng', count: 8934, percentage: 58 },
        { stage: 'Hoàn thành ứng dụng', count: 4567, percentage: 30 },
        { stage: 'Nộp ứng dụng', count: 3456, percentage: 22 },
        { stage: 'Phê duyệt', count: 1892, percentage: 12 },
    ];

    const getStatColor = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-500';
            case 'green': return 'bg-green-500';
            case 'yellow': return 'bg-yellow-500';
            case 'purple': return 'bg-purple-500';
            default: return 'bg-blue-500';
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-orange-200 rounded-lg p-3 shadow-lg">
                    <p className="text-gray-800 font-medium">{`${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {`${entry.dataKey}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Phân tích dữ liệu</h1>
                    <p className="text-gray-600 mt-2">Thông tin chi tiết về hiệu suất hệ thống tuyển sinh.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-orange-500" />
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                        >
                            <option value="1month">Tháng trước</option>
                            <option value="3months">3 tháng trước</option>
                            <option value="6months">6 tháng trước</option>
                            <option value="1year">Năm trước</option>
                        </select>
                    </div>
                    <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Download className="h-4 w-4" />
                        <span>Xuất báo cáo</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white border border-orange-200 rounded-xl p-6 hover:border-orange-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${getStatColor(stat.color)} shadow-md`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex items-center">
                                {stat.changeType === 'increase' ? (
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                            <p className="text-gray-500 text-xs mt-2">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Trends Over Time */}
                <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Xu hướng ứng dụng & Doanh thu</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis yAxisId="left" stroke="#9ca3af" />
                                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="applications" fill="#3b82f6" name="Ứng dụng" />
                                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Doanh thu ($)" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Phân bố địa lý</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={geographicData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="applications"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {geographicData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Department Performance */}
                <div className="bg-white border border-orange-200 rounded-xl p-6 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Hiệu suất Khoa</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={departmentData} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" stroke="#9ca3af" />
                                <YAxis dataKey="department" type="category" stroke="#9ca3af" width={150} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="applications" fill="#8b5cf6" name="Ứng dụng" />
                                <Line dataKey="acceptance_rate" stroke="#10b981" strokeWidth={2} name="Tỷ lệ chấp nhận %" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Conversion Funnel */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Xu hướng chuyển đổi ứng dụng</h2>
                        <div className="space-y-4">
                            {conversionFunnelData.map((stage, index) => (
                                <div key={stage.stage} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-800 font-medium">{stage.stage}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-600">{stage.count.toLocaleString()}</span>
                                            <span className="text-gray-500 text-sm">({stage.percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${stage.percentage}%` }}
                                        ></div>
                                    </div>
                                    {index < conversionFunnelData.length - 1 && (
                                        <div className="flex justify-center mt-2">
                                            <TrendingDown className="h-4 w-4 text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="space-y-6">
                    {/* Performance Indicators */}
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Chỉ số hiệu suất chính</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Tỷ lệ chuyển đổi</span>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-16 bg-gray-200 rounded-full">
                                        <div className="h-2 w-3/4 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-green-400 text-sm font-medium">12%</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Thời gian xử lý trung bình</span>
                                <span className="text-gray-800 font-medium">3.2 ngày</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Sự hài lòng của người dùng</span>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-16 bg-gray-200 rounded-full">
                                        <div className="h-2 w-5/6 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span className="text-blue-400 text-sm font-medium">4.6/5</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Uptime hệ thống</span>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-400 text-sm font-medium">99.9%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Insights */}
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Các bài học gần đây</h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-100 rounded-lg border-l-4 border-green-500">
                                <p className="text-green-400 text-sm font-medium">Xu hướng tích cực</p>
                                <p className="text-gray-600 text-sm">Tỷ lệ chấp nhận ứng dụng tăng 8% trong tháng này</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg border-l-4 border-yellow-500">
                                <p className="text-yellow-400 text-sm font-medium">Cần chú ý</p>
                                <p className="text-gray-600 text-sm">Thời gian xử lý cho ứng dụng Y Dược cao hơn so với trung bình</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg border-l-4 border-blue-500">
                                <p className="text-blue-400 text-sm font-medium">Cơ hội</p>
                                <p className="text-gray-600 text-sm">Tỷ lệ chuyển đổi cao từ khu vực Châu Á cho thấy tiềm năng mở rộng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;