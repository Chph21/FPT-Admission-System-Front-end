import React from 'react';
import { StatsCard } from './StatsCard';
import { Users, GraduationCap, Building, FileText, TrendingUp, Clock } from 'lucide-react';
import type { DashboardStats } from '../model/Model';

interface DashboardOverviewProps {
  stats: DashboardStats;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* <StatsCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="blue"
        /> */}
        <StatsCard
          title="Majors"
          value={stats.totalMajors}
          change="+2 new majors"
          changeType="increase"
          icon={GraduationCap}
          color="green"
        />
        <StatsCard
          title="Campuses"
          value={stats.totalCampuses}
          icon={Building}
          color="purple"
        />
        <StatsCard
          title="Published Posts"
          value={stats.totalPosts}
          change="+5 this week"
          changeType="increase"
          icon={FileText}
          color="orange"
        />
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsCard
          title="Active Applications"
          value={stats.activeApplications.toLocaleString()}
          change="+8% from last week"
          changeType="increase"
          icon={TrendingUp}
          color="blue"
        />
        <StatsCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          change="Priority attention needed"
          icon={Clock}
          color="orange"
        />
      </div> */}

      {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New major "Artificial Intelligence" was added</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Campus "FPT Da Nang" information updated</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New admission post published</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};