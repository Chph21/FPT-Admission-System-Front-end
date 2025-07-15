import React, { useState, useEffect } from 'react';
import { X, Save, Building2 } from 'lucide-react';
import type { Campus, CampusFormData } from '../model/Model';

interface CampusFormProps {
  campus?: Campus;
  onSave: (data: CampusFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const CampusForm: React.FC<CampusFormProps> = ({
  campus,
  onSave,
  onCancel,
  isOpen
}) => {
  const [formData, setFormData] = useState<CampusFormData>({
    name: '',
    address: '',
    phone: '',
    email: '',

  });

  const [errors, setErrors] = useState<Partial<Record<keyof CampusFormData, string>>>({});

  useEffect(() => {
    if (campus) {
      setFormData({
        name: campus.name,
        address: campus.address,
        phone: campus.phone,
        email: campus.email,

      });
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',

      });
    }
    setErrors({});
  }, [campus, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CampusFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              {campus ? 'Edit Campus' : 'Add New Campus'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Information Campus</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campus Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter campus name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter street address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="campus@university.edu"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{campus ? 'Update Campus' : 'Create Campus'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};