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
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-slate-400 mt-2">Manage your account settings and profile information.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Image Section */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Avatar</h2>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
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
                                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-white font-medium">{userProfile.fullName}</p>
                                <p className="text-slate-400 text-sm">#{userProfile.userName}</p>
                                <p className="text-slate-500 text-xs mt-1">{userProfile.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Password Settings</h2>
                        <div className="space-y-6">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                                    <Lock className="h-4 w-4" />
                                    <span>Current Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={editableData.currentPassword}
                                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Enter current password"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-200 ${isEditing
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            : 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                                            }`}
                                    />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                                    <Lock className="h-4 w-4" />
                                    <span>New Password</span>
                                </label>
                                <input
                                    type="password"
                                    value={editableData.newPassword}
                                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="Enter new password"
                                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${isEditing
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                                    <Lock className="h-4 w-4" />
                                    <span>Confirm New Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={editableData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Confirm new password"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-200 ${isEditing
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            : 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                                            }`}
                                    />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
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
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {readOnlyFields(userProfile).map((field) => (
                                <div key={field.label} className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                                        <field.icon className="h-4 w-4" />
                                        <span>{field.label}</span>
                                    </label>
                                    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                                        <p className="text-white">{field.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editable Information */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">Editable Information</h2>
                        <div className="space-y-6">
                            {editableFields(editableData).map((field) => (
                                <div key={field.field} className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
                                        <field.icon className="h-4 w-4" />
                                        <span>{field.label}</span>
                                    </label>
                                    <input
                                        type={field.type}
                                        value={field.value}
                                        onChange={(e) => handleInputChange(field.field, e.target.value)}
                                        disabled={!isEditing}
                                        placeholder={field.placeholder}
                                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${isEditing
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            : 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed'
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {/* Security Notice */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Security Information</h2>
                <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-slate-800 rounded-lg border-l-4 border-blue-500">
                        <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                        <div>
                            <p className="text-blue-400 text-sm font-medium">Account Security</p>
                            <p className="text-slate-300 text-sm">Your account is protected with two-factor authentication and regular security monitoring.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-800 rounded-lg border-l-4 border-green-500">
                        <Check className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                            <p className="text-green-400 text-sm font-medium">Data Protection</p>
                            <p className="text-slate-300 text-sm">All personal information is encrypted and stored securely according to industry standards.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};