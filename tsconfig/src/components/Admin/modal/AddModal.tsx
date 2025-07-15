import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import Modal from './Modal';
import type { ModalProps, RegisterRequest } from '../../DataConfig/Interface';

export const AddModal: React.FC<ModalProps<RegisterRequest>> = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    title = 'Add Account',
}) => {
    const [formData, setFormData] = useState<RegisterRequest>({
        name: '',
        password: '',
        email: '',
    });

    const [errors, setErrors] = useState<RegisterRequest>({
        name: '',
        password: '',
        email: '',
    });
    
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: '',
                password: '',
                email: '',
            });
        }
        setErrors({
            name: '',
            password: '',
            email: '',
        });
    }, [initialData, isOpen]);

    const validateForm = (): boolean => {
        const newErrors = {
            name: '',
            password: '',
            email: '',
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Za-z0-9]/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase letters, and numbers';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.password && !newErrors.email;
    };


    const onSubmit = () => {
        if (validateForm()) {
            onSave(formData);
            handleCancel();
        }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            password: '',
            email: '',
        });
        setErrors({
            name: '',
            password: '',
            email: '',
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
            <div className="space-y-6">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-colors duration-200 text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}
            `}
                        placeholder="Enter full name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-colors duration-200 text-black ${errors.password ? 'border-red-500' : 'border-gray-300'}
            `}
                        placeholder="Enter email address"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`
              w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-colors duration-200 text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}
            `}
                        placeholder="Enter email address"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                        onClick={onSubmit}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                        <Save size={16} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};