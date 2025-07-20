import React, { useState, useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slice/authSlice';

interface UserAccount {
    timeCreated: string;
    timeUpdatedLast: string | null;
    deleted: boolean;
    id: string;
    username: string;
    firebaseUid: string | null;
    phoneNumber: string | null;
    email: string;
    role: string;
    enable: boolean;
    verificationCode: string | null;
}

export const Setting: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

    // Editable fields state
    const [editableData, setEditableData] = useState({
        fullName: '',
        userName: '',
        email: '',
        phone: '',
        address: '',

        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Fetch user account data
    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/accounts/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUserAccount(data);
            } catch (err) {
                console.error('Error fetching user account:', err);
                setError('Không thể tải thông tin tài khoản');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUserAccount();
        }
    }, [token]);

    // Update editable data when userAccount is loaded
    useEffect(() => {
        if (userAccount) {
            setEditableData({
                fullName: userAccount.username,
                userName: userAccount.username,
                email: userAccount.email,
                phone: userAccount.phoneNumber || '',
                address: '', // API doesn't provide address field

                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
    }, [userAccount]);

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
        if (userAccount) {
            setEditableData({
                userName: userAccount.username,
                email: userAccount.email,
                phone: userAccount.phoneNumber || '',
                fullName: userAccount.username,
                address: '',

                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-600 text-lg font-semibold">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    if (!userAccount) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-600 text-lg">Không thể tải thông tin tài khoản</div>
            </div>
        );
    }

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
                                    <span className="text-white font-bold text-3xl">
                                        {userAccount.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-gray-800 font-medium">{userAccount.username}</p>
                                <p className="text-gray-600 text-sm">#{userAccount.username}</p>
                                <p className="text-gray-500 text-xs mt-1">{userAccount.email}</p>
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
                            {/* Custom read-only fields for userAccount */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <span className="h-4 w-4 text-orange-600">🔑</span>
                                    <span>ID</span>
                                </label>
                                <div className="bg-gray-50 border border-orange-200 rounded-lg px-4 py-3">
                                    <p className="text-gray-800 font-mono text-sm">{userAccount.id}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <span className="h-4 w-4 text-orange-600">👤</span>
                                    <span>Vai trò</span>
                                </label>
                                <div className="bg-gray-50 border border-orange-200 rounded-lg px-4 py-3">
                                    <p className="text-gray-800">{userAccount.role}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <span className="h-4 w-4 text-orange-600">📅</span>
                                    <span>Ngày tạo</span>
                                </label>
                                <div className="bg-gray-50 border border-orange-200 rounded-lg px-4 py-3">
                                    <p className="text-gray-800">{new Date(userAccount.timeCreated).toLocaleDateString('vi-VN')}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <span className="h-4 w-4 text-orange-600">✅</span>
                                    <span>Trạng thái</span>
                                </label>
                                <div className="bg-gray-50 border border-orange-200 rounded-lg px-4 py-3">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        userAccount.enable 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-red-100 text-red-800'
                                    }`}>
                                        {userAccount.enable ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </div>
                            </div>
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