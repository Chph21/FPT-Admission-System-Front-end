import React, { useState } from 'react';
import { GraduationCap, Edit, Trash2, MapPin, ChevronDown } from 'lucide-react';
import type { Major, Campus } from '../model/Model';
import { majorApi } from '../service/MajorApi';

interface ChildMajorResponse {
  id: string;
  name: string;
  description?: string;
}

interface MajorCardProps {
  major: Major;
  onEdit: (major: Major) => void;
  onDelete: (id: string) => void;


}

export const MajorCard: React.FC<MajorCardProps> = ({ major, onEdit, onDelete, }) => {// Find campus name by ID

  const [childMajors, setChildMajors] = useState<ChildMajorResponse[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  // Load child majors when expanded
  const loadChildMajors = async () => {
    if (childMajors.length > 0) return; // Already loaded
    if (!major.id) return; // Guard against undefined id

    try {
      setLoadingChildren(true);
      const children = await majorApi.getChildrenByMajorId(major.id);
      setChildMajors(children);
    } catch (error) {
      console.error('Error loading child majors:', error);
    } finally {
      setLoadingChildren(false);
    }
  };

  const toggleChildren = () => {
    setShowChildren(!showChildren);
    if (!showChildren && childMajors.length === 0) {
      loadChildMajors();
    }
  };
  return (
    <div
      onClick={toggleChildren}
      className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-orange-600" />
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
      <p className="text-gray-900 text-lg mb-4 line-clamp-3">
        <span className="font-bold text-gray-800">Show Child Major</span>
        <ChevronDown size={20} />
      </p>

      {showChildren && (
        <div className="mt-3">
          {loadingChildren ? (
            <div className="flex items-center space-x-2 py-4">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-800"></div>
              <span className="text-gray-600 text-sm">Loading...</span>
            </div>
          ) : childMajors.length > 0 ? (
            <div className="space-y-2">
              {childMajors.map((child) => (
                <div key={child.id} className="bg-orange-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-800">Name: </span>
                    <h4 className="font-semibold text-xl text-gray-900">{child.name}</h4>
                  </div>

                   <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-800">Description: </span>
                     {child.description && (
                    <p className="text-md text-gray-600 mt-1">{child.description}</p>
                  )}
                  </div>
                 
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm py-2">No specializations found</p>
          )}
        </div>
      )}

    </div>
  );
};
