import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import Modal from './Modal';
import type { EditFormData, ModalProps } from '../../DataConfig/Interface';

export const EditModal: React.FC<ModalProps<EditFormData>> = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    title = 'Edit Phone or Name',
    isLoading = false,
}) => {
    const [formData, setFormData] = useState<EditFormData>({
        id: '',
        type: 'Phone',
        content: '',
    });

    const [errors, setErrors] = useState<Partial<EditFormData>>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                id: '',
                type: 'Phone',
                content: '',
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: Partial<EditFormData> = {};

        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = () => {
        if (validateForm()) {
            onSave(formData);
            handleCancel();
        }
    };

    const handleCancel = () => {
        setFormData({
            id: '',
            type: 'Phone',
            content: '',
        });
        setErrors({});
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
            <div className="space-y-6">


                {/* Phone or Name */}
                <div className=''>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                            Field
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Phone' | 'Name' })}
                            className={`
                w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black
                transition-colors duration-200 ${errors.type ? 'border-red-500' : 'border-gray-300'}
              `}
                        >
                            <option value="Phone">Phone</option>
                            <option value="Name">Name</option>
                        </select>
                    </div>
                </div>

                {/* Content Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black 
              transition-colors duration-200 ${errors.content ? 'border-red-500' : 'border-gray-300'}
            `}
                        placeholder="Content here..."
                    />
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <X size={16} />
                        <span>Cancel</span>
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onSubmit} 
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <Save size={16} />
                        <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};
