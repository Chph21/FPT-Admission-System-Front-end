import React, { useEffect, useState } from 'react';
import {
  Calendar,
  BookOpen,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
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
import type { Account, Response } from '../../components/DataConfig/Interface';
import { api } from '../../components/DataConfig/Api';
import { applicationTrendData, coursePopularityData, getSimpleRoleColor, recentApplications } from '../../components/DataConfig/DataLoader';

const Dashboard: React.FC = () => {
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAccountLoading, setIsAccountLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAccounts();
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

  // Đếm số lượng từng role
  const roleCounts = accounts.reduce<Record<string, number>>((acc, account) => {
    acc[account.role] = (acc[account.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(roleCounts).map(([role, count]) => ({
    role: role,
    count: count,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
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
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">Welcome back! Here's an overview of your admission system.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trends */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Application Trends</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-green-500 text-sm font-medium">+12% this month</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTrendData}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorApplications)"
                  name="Total Applications"
                />
                <Area
                  type="monotone"
                  dataKey="approved"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorApproved)"
                  name="Approved"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Accounts Role Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {isAccountLoading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-white">Loading...</span>
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
                    dataKey='count'
                    nameKey='role'
                  >
                    {chartData.map((data) => (
                      <Cell key={`cell-${data.role}`} fill={getSimpleRoleColor(data.role as keyof Account['role'])} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>)}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Popularity */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-6">Most Popular Courses</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePopularityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="course" type="category" stroke="#9ca3af" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="applications" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {application.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${getPriorityColor(application.priority)}`}></div>
                    </div>
                    <div>
                      <p className="font-medium text-white">{application.name}</p>
                      <p className="text-sm text-slate-400">{application.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                      {application.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-slate-400">{application.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 text-left">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-white">Review Applications</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 text-left">
                <Users className="h-5 w-5 text-green-400" />
                <span className="text-white">Manage Users</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 text-left">
                <BookOpen className="h-5 w-5 text-purple-400" />
                <span className="text-white">Add New Course</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 text-left">
                <DollarSign className="h-5 w-5 text-yellow-400" />
                <span className="text-white">Financial Reports</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Application Processing</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Email Notifications</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-400 text-sm">Maintenance</span>
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