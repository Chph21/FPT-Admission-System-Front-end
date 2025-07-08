import React from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import type { Major } from '../model/Model';
import type { MajorFormData } from '../model/Model';
import { MajorForm } from './MajorForm';

interface EditMajorPageProps {
  major: Major;
  onSubmit: (data: MajorFormData) => void;
  onBack: () => void;
  majors: Major[];
}

export const EditMajorPage: React.FC<EditMajorPageProps> = ({
  major,
  onSubmit,
  onBack,
}) => {
  const initialData: MajorFormData = {
    name: major.name,
    code: major.code,
    description: major.description,
    childMajors: major.childMajors
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Staff List
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Edit Major</h1>
              {/* <p className="text-gray-600 mt-1">Update {major.name}'s information</p> */}
            </div>
          </div>
        </div>

        <MajorForm
          onSubmit={onSubmit}
          initialData={initialData}
          onCancel={onBack}
          isEditing={true}

        />
      </div>
    </div>
  );
};
