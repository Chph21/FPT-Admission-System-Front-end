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
            name: 'Total Applications',
            value: '2,847',
            change: '+12%',
            changeType: 'increase',
            icon: FileText,
            color: 'blue',
            description: 'Applications received this period'
        },
        {
            name: 'Approved Applications',
            value: '1,892',
            change: '+8%',
            changeType: 'increase',
            icon: CheckCircle,
            color: 'green',
            description: 'Successfully approved applications'
        },
        {
            name: 'Pending Review',
            value: '743',
            change: '-5%',
            changeType: 'decrease',
            icon: Clock,
            color: 'yellow',
            description: 'Applications awaiting review'
        },
        {
            name: 'Active Users',
            value: '12,456',
            change: '+18%',
            changeType: 'increase',
            icon: Users,
            color: 'purple',
            description: 'Registered active users'
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
        { department: 'Computer Science', applications: 456, acceptance_rate: 78 },
        { department: 'Engineering', applications: 389, acceptance_rate: 72 },
        { department: 'Business Administration', applications: 334, acceptance_rate: 85 },
        { department: 'Mathematics', applications: 267, acceptance_rate: 68 },
        { department: 'Psychology', applications: 234, acceptance_rate: 82 },
        { department: 'Medicine', applications: 198, acceptance_rate: 45 },
        { department: 'Law', applications: 156, acceptance_rate: 38 },
        { department: 'Arts', applications: 134, acceptance_rate: 89 },
    ];

    const geographicData = [
        { region: 'North America', applications: 1245, color: '#3b82f6' },
        { region: 'Europe', applications: 892, color: '#10b981' },
        { region: 'Asia', applications: 567, color: '#f59e0b' },
        { region: 'South America', applications: 234, color: '#ef4444' },
        { region: 'Africa', applications: 156, color: '#8b5cf6' },
        { region: 'Oceania', applications: 89, color: '#06b6d4' },
    ];

    const conversionFunnelData = [
        { stage: 'Visitors', count: 15420, percentage: 100 },
        { stage: 'Started Application', count: 8934, percentage: 58 },
        { stage: 'Completed Application', count: 4567, percentage: 30 },
        { stage: 'Submitted Application', count: 3456, percentage: 22 },
        { stage: 'Approved', count: 1892, percentage: 12 },
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Analytics</h1>
                    <p className="text-slate-400 mt-2">Comprehensive insights into your admission system performance.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-slate-400" />
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1month">Last Month</option>
                            <option value="3months">Last 3 Months</option>
                            <option value="6months">Last 6 Months</option>
                            <option value="1year">Last Year</option>
                        </select>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex items-center">
                                {stat.changeType === 'increase' ? (
                                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium">{stat.name}</p>
                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                            <p className="text-slate-500 text-xs mt-2">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Application Trends Over Time */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Application Trends & Revenue</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis yAxisId="left" stroke="#9ca3af" />
                                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="applications" fill="#3b82f6" name="Applications" />
                                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Geographic Distribution</h2>
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
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-white mb-6">Department Performance</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={departmentData} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" stroke="#9ca3af" />
                                <YAxis dataKey="department" type="category" stroke="#9ca3af" width={150} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="applications" fill="#8b5cf6" name="Applications" />
                                <Line dataKey="acceptance_rate" stroke="#10b981" strokeWidth={2} name="Acceptance Rate %" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Conversion Funnel */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Application Conversion Funnel</h2>
                        <div className="space-y-4">
                            {conversionFunnelData.map((stage, index) => (
                                <div key={stage.stage} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-medium">{stage.stage}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-slate-300">{stage.count.toLocaleString()}</span>
                                            <span className="text-slate-400 text-sm">({stage.percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${stage.percentage}%` }}
                                        ></div>
                                    </div>
                                    {index < conversionFunnelData.length - 1 && (
                                        <div className="flex justify-center mt-2">
                                            <TrendingDown className="h-4 w-4 text-slate-500" />
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
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Key Performance Indicators</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Conversion Rate</span>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-16 bg-slate-700 rounded-full">
                                        <div className="h-2 w-3/4 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-green-400 text-sm font-medium">12%</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Avg. Processing Time</span>
                                <span className="text-white font-medium">3.2 days</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">User Satisfaction</span>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-16 bg-slate-700 rounded-full">
                                        <div className="h-2 w-5/6 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span className="text-blue-400 text-sm font-medium">4.6/5</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">System Uptime</span>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <span className="text-green-400 text-sm font-medium">99.9%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Insights */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Recent Insights</h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-green-500">
                                <p className="text-green-400 text-sm font-medium">Positive Trend</p>
                                <p className="text-slate-300 text-sm">Application approval rate increased by 8% this month</p>
                            </div>
                            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-yellow-500">
                                <p className="text-yellow-400 text-sm font-medium">Attention Needed</p>
                                <p className="text-slate-300 text-sm">Processing time for Medicine applications is above average</p>
                            </div>
                            <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-blue-500">
                                <p className="text-blue-400 text-sm font-medium">Opportunity</p>
                                <p className="text-slate-300 text-sm">High conversion rate from Asia region suggests expansion potential</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;