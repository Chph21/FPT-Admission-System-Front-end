import React from 'react';
import { GraduationCap, Edit, Trash2, MapPin } from 'lucide-react';
import type { Major, Campus } from '../model/Model';

interface MajorCardProps {
  major: Major;
  onEdit: (major: Major) => void;
  onDelete: (id: string) => void;


}

export const MajorCard: React.FC<MajorCardProps> = ({ major, onEdit, onDelete, }) => {// Find campus name by ID

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{major.name}</h3>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(major)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit Major"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(major?.id || '')}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete Major"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-900 text-lg mb-4 line-clamp-3">
        <span className="font-bold text-gray-800">Description:</span> {major.description}
      </p>
      <p className="text-gray-900 text-lg mb-4 line-clamp-3">
        <span className="font-bold text-gray-800">Duration:</span> {major.duration} months
      </p>
      <p className="text-gray-900 text-lg mb-4 line-clamp-3">
        <span className="font-bold text-gray-800">Fee:</span> {major.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </p>
    </div>
  );
};
