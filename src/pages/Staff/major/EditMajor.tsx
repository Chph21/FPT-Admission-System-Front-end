import React from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import type { Major } from '../model/Model';
import { MajorForm } from './MajorForm';

interface EditMajorPageProps {
  major: Major;
  onSubmit: (data: Major) => void;
  onBack: () => void;
  majors: Major[];
}

export const EditMajorPage: React.FC<EditMajorPageProps> = ({
  major,
  onSubmit,
  onBack,
}) => {
  const initialData: Major = {
    name: major.name,
    description: major.description,
    duration: major.duration,
    fee: major.fee,
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
