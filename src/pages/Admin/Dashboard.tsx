import React, { useEffect, useState } from 'react';
import {
  Calendar,
  TrendingUp,
  Users,
  FileText,
  BookOpen,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import type { Account, Application, Response } from '../../components/DataConfig/Interface';
import { api } from '../../components/DataConfig/Api';
import { applicationTrendData, coursePopularityData, getSimpleRoleColor } from '../../components/DataConfig/DataLoader';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const [isAccountLoading, setIsAccountLoading] = useState<boolean>(false);
  const [isApplicationLoading, setIsApplicationLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
    fetchApplications();
  }, []);

  const fetchAccounts = async () => {
    setIsAccountLoading(true);
    api.get<Response<Account[]>>('/authen/get-all')
      .then(response => {
        if (response.data && response.data.data) {
          setAccounts(response.data.data);
        } else {
          console.error('No data found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      })
      .finally(() => {
        setIsAccountLoading(false);
      });
  }

  const fetchApplications = async () => {
    setIsApplicationLoading(true);
    api.get<Application[]>('/applications')
      .then(response => {
        if (response.data) {
          setApplications(response.data);
        } else {
          console.error('No data found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
      }).finally(() => {
        setIsApplicationLoading(false);
      });
  };

  // Đếm số lượng từng role
  const roleCounts = accounts.reduce<Record<string, number>>((acc, account) => {
    acc[account.role] = (acc[account.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(roleCounts).map(([role, count]) => ({
    role: role,
    Value: count,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const displayLabel = label || payload[0]?.name || payload[0]?.payload?.role;
      return (
        <div className="bg-white border border-orange-200 rounded-lg p-3 shadow-lg text-black">
          {displayLabel && (
            <p className="text-gray-800 font-medium">{displayLabel}</p>
          )}
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Chào mừng trở lại! Đây là tổng quan hệ thống tuyển sinh.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Calendar className="h-4 w-4" />
            <span>Tạo báo cáo</span>
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trends */}
        <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Xu hướng đăng ký</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-500 text-sm font-medium">+12% tháng này</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrendData}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorApplications)"
                  name="Tổng đăng ký"
                />
                <Area
                  type="monotone"
                  dataKey="approved"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorApproved)"
                  name="Đã duyệt"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Phân bố vai trò tài khoản</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {isAccountLoading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-600">Đang tải...</span>
                </div>
              ) : (
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={1}
                    dataKey='Value'
                    nameKey='role'
                  >
                    {chartData.map((data) => (
                      <Cell key={`cell-${data.role}`} fill={getSimpleRoleColor(data.role as keyof Account['role'])} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Popularity */}
        <div className="bg-white border border-orange-200 rounded-xl p-6 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Khóa học phổ biến nhất</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePopularityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="course" type="category" stroke="#6b7280" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="applications" fill="#f97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Đăng ký gần đây</h2>
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors duration-200">Xem tất cả</button>
            </div>
            <div className="space-y-4">
              {!isApplicationLoading ? (
                applications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-200 hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                          <span className="text-white font-medium text-sm">
                            {application.accounts.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{application.accounts.username}</p>
                        <p className="text-gray-600">{application.accounts.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.applicationStatus)}`}>
                        {application.applicationStatus}
                      </span>
                      <span className="text-sm text-gray-500">{application.timeCreated ? new Date(application.timeCreated).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                ))) : (
                <div className="flex items-center justify-center h-20">
                  <span className="text-gray-600">Đang tải...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thao tác nhanh</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all 
              duration-200 text-left border border-orange-200 hover:border-orange-300"
                onClick={() => navigate('/admin/applications')}>
                <FileText className="h-5 w-5 text-orange-600" />
                <span className="text-gray-800 font-medium">Duyệt đăng ký</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all 
              duration-200 text-left border border-orange-200 hover:border-orange-300"
                onClick={() => navigate('/admin/users')}>
                <Users className="h-5 w-5 text-orange-600" />
                <span className="text-gray-800 font-medium">Quản lý người dùng</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all 
              duration-200 text-left border border-orange-200 hover:border-orange-300"
                onClick={() => navigate('/admin/posts')}>
                <BookOpen className="h-5 w-5 text-orange-600" />
                <span className="text-gray-800 font-medium">Quản lý bài đăng</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Trạng thái hệ thống</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Xử lý đăng ký</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Hoạt động</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Thông báo email</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Hoạt động</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cơ sở dữ liệu</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-600 text-sm font-medium">Bảo trì</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;