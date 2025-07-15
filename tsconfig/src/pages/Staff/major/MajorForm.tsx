import React, { useState } from 'react';
import { Plus, X, Save, FileText } from 'lucide-react';
import type { MajorFormData } from '../model/Model';

interface MajorFormProps {
  onSubmit: (data: MajorFormData) => void;
  initialData?: MajorFormData;
  onCancel?: () => void;
  isEditing?: boolean;
}

export const MajorForm: React.FC<MajorFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<MajorFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    duration: initialData?.duration || 0,
    fee: initialData?.fee || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Major' : 'Add New Major'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Major Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
              placeholder="e.g., Computer Science"
              required
            />
          </div>

        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-24 resize-none text-gray-800"
            placeholder="Brief description of the major..."
            required
          />
        </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration (Months)
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
              placeholder="e.g., 24"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fee (VND)
            </label>
            <input
              type="text"
              value={formData.fee}
              onChange={(e) => setFormData(prev => ({ ...prev, fee: Number(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800"
              placeholder="e.g., 50000000"
              required
            />
          </div>
          
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 font-semibold"
          >
            <Save className="w-5 h-5" />
            {isEditing ? 'Update Major' : 'Create Major'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};