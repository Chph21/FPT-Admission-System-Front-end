import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number | React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: typeof LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-500 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-medium text-gray-600">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  );
};