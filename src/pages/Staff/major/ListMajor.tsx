import React from 'react';
import { Search, Filter, SortAsc, Plus } from 'lucide-react';
import type { Major } from '../model/Model';
import { MajorCard } from './MajorCard';

interface MajorListProps {
  majors: Major[];
  onCreate: () => void;
  onEdit: (major: Major) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const MajorList: React.FC<MajorListProps> = ({
  majors,
  onCreate,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange
}) => {


  const filteredMajors = majors.filter(major => {
    if (!major) return false;

    const majorName = major.name || ''; // Use majorName
    const description = major.description || '';

    return majorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Major Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredMajors.map((major) => (
          <MajorCard
            key={major.id}
            major={major}
            onEdit={onEdit}
            onDelete={onDelete}

          />
        ))}
      </div>

      {/* Empty state - show only one condition */}
      {majors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 text-gray-400 mx-auto mb-4">
            {searchTerm ? (
              // Search icon for "no results found"
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ) : (
              // Book icon for "no majors"
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )}
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No majors found' : 'No majors available'}
          </h3>

          <p className="text-gray-500 mb-4">
            {searchTerm
              ? `No majors match "${searchTerm}". Try adjusting your search terms or create a new major.`
              : 'Get started by adding your first major to the system.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Clear search to see all majors
              </button>
            )}
            <button
              onClick={onCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {searchTerm ? 'Create New Major' : 'Add Your First Major'}
            </button>
          </div>
        </div>
      )}

      {/* No search results (only show when majors exist but no filtered results) */}
      {majors.length > 0 && filteredMajors.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="w-12 h-12 text-gray-400 mx-auto mb-4">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">No majors found</h3>

          <p className="text-gray-500 mb-4">
            No majors match "{searchTerm}". Try adjusting your search terms.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => onSearchChange('')}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Clear search to see all majors
            </button>
            <button
              onClick={onCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Major
            </button>
          </div>
        </div>
      )}
    </div>
  );
};