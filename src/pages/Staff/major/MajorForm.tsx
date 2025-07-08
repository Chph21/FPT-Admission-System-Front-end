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
    code: initialData?.code || '',
    description: initialData?.description || '',
    childMajors: initialData?.childMajors || []
  });

  const [newChildMajor, setNewChildMajor] = useState({
    name: '',
    code: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addChildMajor = () => {
    if (newChildMajor.name && newChildMajor.code) {
      setFormData(prev => ({
        ...prev,
        childMajors: [...prev.childMajors, { ...newChildMajor }]
      }));
      setNewChildMajor({ name: '', code: '', description: '' });
    }
  };

  const removeChildMajor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      childMajors: prev.childMajors.filter((_, i) => i !== index)
    }));
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Computer Science"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Major Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., CS"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-24 resize-none"
            placeholder="Brief description of the major..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Child Majors
          </label>
          
          <div className="space-y-4">
            {formData.childMajors.map((child, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800">{child.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Code:</span>
                    <p className="text-gray-800">{child.code}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <p className="text-gray-800">{child.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeChildMajor(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
              <input
                type="text"
                placeholder="Child major name"
                value={newChildMajor.name}
                onChange={(e) => setNewChildMajor(prev => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Code"
                value={newChildMajor.code}
                onChange={(e) => setNewChildMajor(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Description"
                value={newChildMajor.description}
                onChange={(e) => setNewChildMajor(prev => ({ ...prev, description: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addChildMajor}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
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