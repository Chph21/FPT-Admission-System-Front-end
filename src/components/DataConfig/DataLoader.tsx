import {
    Home, Users, Settings, BookOpen, BarChart3, FileText, User,
    Mail, Phone, MapPin, Shield, Key,
} from 'lucide-react';
import type { Account } from './Interface';

export const readOnlyFields = (userProfile: any) => [
    {
        label: 'UUID',
        value: userProfile.uuid,
        icon: Key
    },
    {
        label: 'Role',
        value: userProfile.role,
        icon: Shield
    }
];

export const editableFields = (editableData: any) => [
    {
        label: 'Full Name',
        field: 'fullName',
        value: editableData.fullName,
        icon: User, type: 'text',
        placeholder: 'Enter full name'
    },
    {
        label: 'Address',
        field: 'address',
        value: editableData.address,
        icon: MapPin,
        type: 'text',
        placeholder: 'Enter address'
    },
    {
        label: 'Username',
        field: 'userName',
        value: editableData.userName,
        icon: User,
        type: 'text',
        placeholder: 'Enter username'
    },
    {
        label: 'Email',
        field: 'email',
        value: editableData.email,
        icon: Mail,
        type: 'email',
        placeholder: 'Enter email address'
    },
    {
        label: 'Phone',
        field: 'phone',
        value: editableData.phone,
        icon: Phone,
        type: 'tel',
        placeholder: 'Enter phone number'
    }
];

export const NavigationItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'User Manager', href: '/admin/users', icon: Users },
    { name: 'Applications', href: '/admin/error404', icon: FileText },
    { name: 'Analytics', href: '/admin/error404', icon: BarChart3 },
    { name: 'Courses', href: '/admin/error404', icon: BookOpen },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export const getRoleColor = (role: keyof Account['role']) => {
    switch (role) {
        case 'ADMIN' as keyof Account['role']: return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'STAFF' as keyof Account['role']: return 'bg-green-100 text-green-800 border-green-200';
        case 'USER' as keyof Account['role']: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
};

export const getSimpleRoleColor = (role: keyof Account['role']) => {
    switch (role) {
        case 'ADMIN' as keyof Account['role']: return '#6785dd';
        case 'STAFF' as keyof Account['role']: return '#72c88d';
        case 'USER' as keyof Account['role']: return '#db6c53';
    }
};

export const getEnableColor = (enable: boolean) => {
    return enable ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-gray-800 border-gray-200';
}

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'active': return 'bg-green-100 text-green-800 border-green-200';
        case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const getStatusDot = (status: string) => {
    switch (status) {
        case 'active': return 'bg-green-500';
        case 'inactive': return 'bg-gray-500';
        case 'pending': return 'bg-yellow-500';
        default: return 'bg-gray-500';
    }
};

export const applicationTrendData = [
    { month: 'Jan', applications: 245, approved: 189, rejected: 32 },
    { month: 'Feb', applications: 312, approved: 234, rejected: 45 },
    { month: 'Mar', applications: 398, approved: 298, rejected: 67 },
    { month: 'Apr', applications: 445, approved: 356, rejected: 54 },
    { month: 'May', applications: 523, approved: 412, rejected: 78 },
    { month: 'Jun', applications: 467, approved: 378, rejected: 62 },
  ];
  
export const coursePopularityData = [
    { course: 'Computer Science', applications: 456 },
    { course: 'Engineering', applications: 389 },
    { course: 'Business Admin', applications: 334 },
    { course: 'Mathematics', applications: 267 },
    { course: 'Psychology', applications: 234 },
    { course: 'Medicine', applications: 198 },
  ];

export const recentApplications = [
    { id: 1, name: 'Sarah Johnson', course: 'Computer Science', status: 'pending', date: '2024-01-15', priority: 'high' },
    { id: 2, name: 'Michael Chen', course: 'Engineering', status: 'approved', date: '2024-01-14', priority: 'medium' },
    { id: 3, name: 'Emily Davis', course: 'Business Administration', status: 'under_review', date: '2024-01-14', priority: 'low' },
    { id: 4, name: 'David Wilson', course: 'Mathematics', status: 'approved', date: '2024-01-13', priority: 'medium' },
    { id: 5, name: 'Lisa Anderson', course: 'Psychology', status: 'pending', date: '2024-01-13', priority: 'high' },
  ];

export const currentUser = JSON.parse(localStorage.getItem('user') || '{}');