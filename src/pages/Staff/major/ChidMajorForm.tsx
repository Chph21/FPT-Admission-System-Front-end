import React, { useState, useEffect } from 'react';
import { Save, DollarSign, Clock, BookOpen, User } from 'lucide-react';
import { majorApi } from '../service/MajorApi';
import type { Major } from '../model/Model';

interface ChildMajorFormProps {
  onSubmit: (data: any, isEdit?: boolean) => void;
  onBack: () => void;
  isOpen: boolean;
  editingChildMajor?: Major | null; // For edit mode
  mode?: 'create' | 'edit'; // Form mode
}

export const ChildMajorForm: React.FC<ChildMajorFormProps> = ({
  onSubmit,
  onBack,
  isOpen,
  editingChildMajor,
  mode = 'create'
}) => {
  const [formData, setFormData] = useState<any>({
    id: '',
    name: '',
    description: '',
    duration: 0,
    fee: 0,
    parentMajorsId: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loadingMajors, setLoadingMajors] = useState(true);

  // Initialize form data when editing
  useEffect(() => {
    console.log('Form initialization triggered:', { mode, editingChildMajor, majorsLoaded: majors.length > 0 }); // Debug log

    if (editingChildMajor && mode === 'edit') {
      setFormData({
        id: editingChildMajor.id || '',
        name: editingChildMajor.name,
        description: editingChildMajor.description,
        duration: editingChildMajor.duration,
        fee: editingChildMajor.fee,
        parentMajorsId: editingChildMajor.parentMajors?.id || ''
      });
      console.log('Editing child major:', editingChildMajor); // Debug log
    } else {
      // Reset form for create mode
      setFormData({
        id: '',
        name: '',
        description: '',
        duration: 0,
        fee: 0,
        parentMajorsId: ''
      });
    }
  }, [editingChildMajor, mode, isOpen]);

  // Fetch majors for the dropdown
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        setLoadingMajors(true);
        const apiMajors = await majorApi.getAllMajors();
        const mappedMajors = apiMajors.map(apiMajor => ({
          id: apiMajor.id,
          name: apiMajor.name,
          description: apiMajor.description,
          duration: apiMajor.duration ?? 0,
          fee: apiMajor.fee ?? 0,
          parentMajorsId: apiMajor.parentMajors?.id || null
        }));
        setMajors(mappedMajors);
      } catch (error) {
        console.error('Error fetching majors:', error);
      } finally {
        setLoadingMajors(false);
      }
    };

    if (isOpen) {
      fetchMajors();
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (mode === 'create' && !formData.parentMajorsId) {
      newErrors.parentMajorsId = 'Please select a major';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    if (formData.fee < 0) {
      newErrors.fee = 'Fee cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await onSubmit(formData, mode === 'edit');
      } catch (error) {
        console.error('Error submitting child major:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let processedValue: string | number = value;

    // Convert numeric fields
    if (name === 'duration' || name === 'fee') {
      processedValue = value === '' ? 0 : Number(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      id: '',
      name: '',
      description: '',
      duration: 0,
      fee: 0,
      parentMajorsId: ''
    });
    setErrors({});
    onBack();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-gradient-to-b from-orange-600 to-orange-700 ">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {mode === 'edit' ? 'Edit Child Major' : 'Create Child Major'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} method='PUT' className="p-6">
          <div className="space-y-6">
            {/* Child Major Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter child major name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Major Selection */}
            {mode === 'create' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Select Major *
                </label>
                {loadingMajors ? (
                  <div className="flex items-center justify-center py-3 border border-gray-300 rounded-md">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-gray-600">Loading majors...</span>
                  </div>
                ) : (
                  <select
                    name="parentMajorsId"
                    value={formData.parentMajorsId}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${errors.parentMajorsId ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">-- Select a Major --</option>
                    {/* Only show default option in create mode */}

                    {majors.map((major) => (
                      <option key={major.id} value={major.id}>
                        {major.name}
                      </option>
                    ))}
                  </select>
                )}

                {errors.parentMajorsId && (
                  <p className="text-red-500 text-sm mt-1">{errors.parentMajorsId}</p>
                )}
              </div>
            )}
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter child major description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Duration and Fee */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Duration (months) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${errors.duration ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter duration"
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>

              {/* Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Fee (VND) *
                </label>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${errors.fee ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter fee amount"
                />
                {errors.fee && (
                  <p className="text-red-500 text-sm mt-1">{errors.fee}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || majors.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-md hover:from-orange-700 hover:to-orange-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? 'Saving...' : (mode === 'edit' ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};