import React from 'react';
import { GraduationCap, Edit, Trash2, Users } from 'lucide-react';
import type { Major } from '../model/Model';

interface MajorCardProps {
  major: Major;
  onEdit: (major: Major) => void;
  onDelete: (id: string) => void;
}

export const MajorCard: React.FC<MajorCardProps> = ({ major, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{major.name}</h3>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
              {major.code}
            </span>
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
            onClick={() => onDelete(major.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete Major"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{major.description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{major.childMajors.length} Child Majors</span>
        </div>
      </div>

      {major.childMajors.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Child Majors:</h4>
          <div className="flex flex-wrap gap-2">
            {major.childMajors.slice(0, 3).map((child, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border"
              >
                {child.name} ({child.code})
              </span>
            ))}
            {major.childMajors.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full border">
                +{major.childMajors.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};