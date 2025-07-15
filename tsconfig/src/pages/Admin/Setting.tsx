import React, { useState } from 'react';
import {
    Lock,
    Shield,
    Camera,
    Save,
    Eye,
    EyeOff,
    Check,
    X,
    Edit3,
    LogOut
} from 'lucide-react';
import type { UserProfile } from '../../components/DataConfig/Interface';
import { editableFields, readOnlyFields } from '../../components/DataConfig/DataLoader';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slice/authSlice';

export const Setting: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Mock user data - in real app this would come from API/context
    const userProfile: UserProfile = JSON.parse(localStorage.getItem('account') || '{}');

    // Editable fields state
    const [editableData, setEditableData] = useState({
        fullName: userProfile.fullName,
        userName: userProfile.userName,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,

        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleInputChange = (field: string, value: string) => {
        setEditableData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);

        // Validate passwords match if changing password
        if (editableData.newPassword && editableData.newPassword !== editableData.confirmPassword) {
            alert('New passwords do not match');
            setIsSaving(false);
            return;
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSaving(false);
        setIsEditing(false);

        // Clear password fields after successful update
        setEditableData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }));

        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setEditableData({
            userName: userProfile.userName,
            email: userProfile.email,
            phone: userProfile.phone,
            fullName: userProfile.fullName,
            address: userProfile.address,

            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Cài đặt</h1>
                    <p className="text-gray-600 mt-2">Quản lý cài đặt tài khoản và thông tin cá nhân.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Image Section */}
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Ảnh đại diện</h2>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                                    {userProfile.image ? (
                                        <img
                                            src={userProfile.image}
                                            alt="Profile"
                                            className="h-32 w-32 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-3xl">
                                            {userProfile.fullName}
                                        </span>
                                    )}
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-gray-800 font-medium">{userProfile.fullName}</p>
                                <p className="text-gray-600 text-sm">#{userProfile.userName}</p>
                                <p className="text-gray-500 text-xs mt-1">{userProfile.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Cài đặt mật khẩu</h2>
                        <div className="space-y-6">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <Lock className="h-4 w-4" />
                                    <span>Mật khẩu hiện tại</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={editableData.currentPassword}
                                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Nhập mật khẩu hiện tại"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 ${isEditing
                                            ? 'bg-gray-50 border-orange-200 text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                                            : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <Lock className="h-4 w-4" />
                                    <span>Mật khẩu mới</span>
                                </label>
                                <input
                                    type="password"
                                    value={editableData.newPassword}
                                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Nhập mật khẩu mới"
                                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isEditing
                                        ? 'bg-gray-50 border-orange-200 text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                                        : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <Lock className="h-4 w-4" />
                                    <span>Xác nhận mật khẩu mới</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={editableData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Nhập lại mật khẩu mới"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 ${isEditing
                                            ? 'bg-gray-50 border-orange-200 text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                                            : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors duration-200"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    )}
                                </div>
                                {isEditing && editableData.newPassword && editableData.confirmPassword && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        {editableData.newPassword === editableData.confirmPassword ? (
                                            <>
                                                <Check className="h-4 w-4 text-green-500" />
                                                <span className="text-green-500 text-sm">Passwords match</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-red-500 text-sm">Passwords do not match</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Edit button */}
                    <div className="">
                        {!isEditing ? (
                            <div className="flex justify-between space-x-3">
                                <button
                                    onClick={() => handleLogout()}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 
                                    rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-end space-x-3">
                                <button
                                    onClick={handleCancel}
                                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <X className="h-4 w-4" />
                                    <span>Cancel</span>
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                                >
                                    {isSaving ? (
                                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Read-only Information */}
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Thông tin tài khoản</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {readOnlyFields(userProfile).map((field) => (
                                <div key={field.label} className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <field.icon className="h-4 w-4 text-orange-600" />
                                        <span>{field.label}</span>
                                    </label>
                                    <div className="bg-gray-50 border border-orange-200 rounded-lg px-4 py-3">
                                        <p className="text-gray-800">{field.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editable Information */}
                    <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Thông tin có thể chỉnh sửa</h2>
                        <div className="space-y-6">
                            {editableFields(editableData).map((field) => (
                                <div key={field.field} className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <field.icon className="h-4 w-4 text-orange-600" />
                                        <span>{field.label}</span>
                                    </label>
                                    <input
                                        type={field.type}
                                        value={field.value}
                                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                                        disabled={!isEditing}
                                        placeholder={field.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${isEditing
                                            ? 'bg-gray-50 border-orange-200 text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                                            : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {/* Security Notice */}
            <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin bảo mật</h2>
                <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                            <p className="text-orange-600 text-sm font-medium">Bảo mật tài khoản</p>
                            <p className="text-gray-700 text-sm">Tài khoản của bạn được bảo vệ bằng xác thực hai yếu tố và giám sát bảo mật thường xuyên.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <Check className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                            <p className="text-green-600 text-sm font-medium">Bảo vệ dữ liệu</p>
                            <p className="text-gray-700 text-sm">Tất cả thông tin cá nhân được mã hóa và lưu trữ an toàn theo tiêu chuẩn ngành.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};