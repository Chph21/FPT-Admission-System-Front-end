import React from 'react';
import { Edit, Trash2, Clock, DollarSign, Calendar, Plus } from 'lucide-react';
import type { Major } from '../model/Model';

interface ChildMajorListProps {
    childMajors: Major[];
    onEdit: (childMajor: Major) => void;
    onDelete: (id: string) => void;
    onCreate: () => void;
    majorName: string;
}

export const ChildMajorList: React.FC<ChildMajorListProps> = ({
    childMajors,
    onEdit,
    onDelete,
    onCreate,
    majorName
}) => {
    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    if (childMajors.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="w-12 h-12 text-gray-400 mx-auto mb-4">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Child Majors</h3>
                <p className="text-gray-500">
                    No child majors found for <span className="font-medium">{majorName}</span>
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childMajors.map((childMajor) => (
                    <div
                        key={childMajor.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-medium text-gray-900 flex-1">
                                {childMajor.name}
                            </h4>
                            <div className="flex items-center space-x-2 ml-3">
                                <button
                                    onClick={() => onEdit(childMajor)}
                                    className="text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
                                    title="Edit child major"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(childMajor?.id || '')}
                                    className="text-gray-600 hover:text-red-600 p-1 rounded transition-colors"
                                    title="Delete child major"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {childMajor.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="font-medium">Duration:</span>
                                <span className="ml-1">{childMajor.duration} months</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <DollarSign className="w-4 h-4 mr-2" />
                                <span className="font-medium">Fee:</span>
                                <span className="ml-1">{formatCurrency(childMajor.fee)}</span>
                            </div>

                             {/* <div className="flex items-center text-gray-600">
                                <DollarSign className="w-4 h-4 mr-2" />
                                <span className="font-medium">Major:</span>
                                <span className="ml-1">{childMajor.parentMajorId}</span>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};