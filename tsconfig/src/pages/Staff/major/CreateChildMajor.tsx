import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { ChildMajorFormData } from '../model/Model';
import { ChildMajorForm } from './ChidMajorForm';

interface CreateMajorPageProps {
  onSubmit: (data: ChildMajorFormData) => void;
  onBack: () => void;
}

export const CreateMajorPage: React.FC<CreateMajorPageProps> = ({
  onSubmit,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Major List
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Create New Child Major</h1>
              <p className="text-gray-600 mt-1">Add a new child major to the system</p>
            </div>
          </div>
        </div>

        <ChildMajorForm
          onSubmit={onSubmit}
          onBack={onBack}
          isOpen={false}
        />
      </div>
    </div>
  );
};