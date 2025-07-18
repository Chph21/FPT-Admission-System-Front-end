import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import type { MajorFormData } from '../service/MajorApi';
import { campusApi, type CampusApiResponse } from '../service/CampusApi';

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
    idCampus: '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    duration: initialData?.duration || 0,
    fee: initialData?.fee || 0,
  });

  const [campus, setCampus] = useState<CampusApiResponse[]>([]);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const campusData = await campusApi.getAllCampuses();
        setCampus(campusData);
      } catch (error) {
        console.error('Failed to fetch campuses:', error);
      }
    };

    fetchCampuses();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-b from-orange-600 to-orange-700 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Major' : 'Add New Major'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='text-gray-800'>
            <label className='text-gray-800'>
              Campus
            </label>
            <select value={formData.idCampus} onChange={(e) => setFormData(prev => ({ ...prev, idCampus: e.target.value }))}>
              <option value="">Select Campus</option>
                {campus.map(
                (c) => (
                  <option key={c.id} value={c.id}>
                  {c.name}
                  </option>
                )
                )}
            </select>
          </div>
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
            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-6 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 font-semibold"
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