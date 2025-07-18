import React, { useState, useEffect } from 'react';
import {  Plus } from 'lucide-react';
import { MajorList } from './ListMajor';
import { CreateMajorPage } from './CreateMajor';
import { EditMajorPage } from './EditMajor';
import { ChildMajorList } from './ChildMajorList';
import { majorApi } from '../service/MajorApi';
import { childMajorApi } from '../service/ChildMajorApi';
import type { Major} from '../model/Model';
import { ChildMajorForm } from './ChidMajorForm';

export const MajorManagement: React.FC = () => {
  const [majors, setMajors] = useState<Major[]>([]); 
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<
    'major-list' |
    'major-create' |
    'major-edit' |
    'child-major-create' |
    'child-major-view'
  >('major-list');
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Child Major state
  const [isChildMajorFormOpen, setIsChildMajorFormOpen] = useState(false);
  const [editingChildMajor, setEditingChildMajor] = useState<Major | null>(null);
  const [childMajorFormMode, setChildMajorFormMode] = useState<'create' | 'edit'>('create');
  const [childMajors, setChildMajors] = useState<Major[]>([]);
  const [loadingChildMajors, setLoadingChildMajors] = useState(false);


  // Convert API response to Major model
  const mapApiResponseToMajor = (apiMajor: Major): Major => ({
    id: apiMajor.id,
    name: apiMajor.name,
    description: apiMajor.description,
    duration: apiMajor.duration,
    fee: apiMajor.fee,
  });

  // Fetch all majors and their child majors
  const fetchMajors = async () => {
    try {
      setLoading(true);
      const apiMajors = await majorApi.getAllMajors();
      const mappedMajors = apiMajors.map(mapApiResponseToMajor);
      setMajors(mappedMajors);
      setFilteredMajors(mappedMajors);

      // Auto-load child majors for all majors
      await fetchAllChildMajors();
      setError(null);
    } catch (err) {
      setError('Failed to fetch majors');
      console.error('Error fetching majors:', err);
    } finally {
      setLoading(false);
    }
  };


  // Fetch all child majors
  const fetchAllChildMajors = async () => {
    try {
      const allChildMajors = await childMajorApi.getAllChildMajors(); // This calls your API
      const mappedChildMajors = allChildMajors.map((childMajor: Major) => ({
        id: childMajor.id,
        name: childMajor.name,
        description: childMajor.description,
        duration: childMajor.duration,
        fee: childMajor.fee,
        parentMajors: childMajor.parentMajors
      }));
      setChildMajors(mappedChildMajors);
    } catch (error) {
      console.error('Error fetching all child majors:', error);
    }
  };

  const searchMajors = async (keyword: string) => {
    try {
      setSearching(true);

      if (keyword.trim() === '') {
        setFilteredMajors(majors);
      } else {
        const apiMajors = await majorApi.searchMajors(keyword);
        const mappedMajors = apiMajors.map(mapApiResponseToMajor);
        setFilteredMajors(mappedMajors);
        console.log(`Search completed: ${mappedMajors.length} results found for "${keyword}"`);
      }
      setError(null);
    } catch (err) {
      setError('Failed to search majors. Please try again.');
      console.error('Error searching majors:', err);
    } finally {
      setSearching(false);
    }
  };

  // Handle search input with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMajors(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, majors]);

  // Load majors on component mount
  useEffect(() => {
    fetchMajors();
  }, []);

  const handleCreateNew = () => {
    setCurrentPage('major-create');
  };

  const handleEditMajor = (major: Major) => {
    setEditingMajor(major);
    setCurrentPage('major-edit');
  };

  const handleDeleteMajor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this major?')) {
      try {
        await majorApi.deleteMajor(id);
        await fetchMajors();
        if (searchTerm.trim()) {
          await searchMajors(searchTerm);
        }
      } catch (err) {
        setError('Failed to delete major');
        console.error('Error deleting major:', err);
      }
    }
  };

  const handleCreateMajor = async (formData: Major, idCampus: string) => {
    try {
      await majorApi.createMajor({
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        fee: formData.fee,
      }, idCampus);
      await fetchMajors();
      setCurrentPage('major-list');
    } catch (err) {
      setError('Failed to create major');
      console.error('Error creating major:', err);
    }
  };

  const handleUpdateMajor = async (formData: Major) => {
    if (!editingMajor) return;

    try {
      await majorApi.updateMajor(editingMajor.id || '', {
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        fee: formData.fee
      });
      await fetchMajors();
      setEditingMajor(null);
      setCurrentPage('major-list');
    } catch (err) {
      setError('Failed to update major');
      console.error('Error updating major:', err);
    }
  };

  const handleBackToMajorList = () => {
    setCurrentPage('major-list');
    setEditingMajor(null);
  };

  // Child Major CRUD functions
  const handleCreateChildMajor = () => {
    setEditingChildMajor(null);
    setChildMajorFormMode('create');
    setIsChildMajorFormOpen(true);
  };

  // In MajorManagement.tsx
  const handleEditChildMajor = (childMajor: Major) => {
    // Ensure parentMajorId exists
    if (!childMajor.parentMajors) {
      console.warn('⚠️ Child major missing parentMajorId!');
    }

    setEditingChildMajor(childMajor);
    setChildMajorFormMode('edit');
    setIsChildMajorFormOpen(true);
  };

  const handleSubmitChildMajor = async (formData: Major, isEdit?: boolean) => {
    try {
      if (isEdit && editingChildMajor) {
        await childMajorApi.updateChildMajor(editingChildMajor.id || '', formData);
        console.log('Child major updated successfully!');
      } else {
        await childMajorApi.createChildMajor(formData);
        console.log('Child major created successfully!');
      }

      // Refresh both majors and child majors
      await fetchMajors();
      if (searchTerm.trim()) {
        await searchMajors(searchTerm);
      }

      setIsChildMajorFormOpen(false);
      setEditingChildMajor(null);

    } catch (err) {
      setError(isEdit ? 'Failed to update child major' : 'Failed to create child major');
      console.error('Error with child major:', err);
    }
  };

  const handleDeleteChildMajor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this child major?')) {
      try {
        await childMajorApi.deleteChildMajor(id);
        console.log('Child major deleted successfully!');

        // Refresh both majors and child majors
        await fetchMajors();
        if (searchTerm.trim()) {
          await searchMajors(searchTerm);
        }

      } catch (err) {
        setError('Failed to delete child major');
        console.error('Error deleting child major:', err);
      }
    }
  };

  const handleCloseChildMajorForm = () => {
    setIsChildMajorFormOpen(false);
    setEditingChildMajor(null);
    setChildMajorFormMode('create');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchMajors}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Major create page
  if (currentPage === 'major-create') {
    return (
      <CreateMajorPage
        onSubmit={handleCreateMajor}
        onBack={handleBackToMajorList}
      />
    );
  }

  // Major edit page
  if (currentPage === 'major-edit' && editingMajor) {
    return (
      <EditMajorPage
        major={editingMajor}
        onSubmit={handleUpdateMajor}
        onBack={handleBackToMajorList}
        majors={majors}
      />
    );
  }

  // Main major list page with child majors below
  if (currentPage === 'major-list') {
    return (
      <div className="min-h-screen text-white">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-5xl font-bold text-gray-900">Major Management</h1>
                <p className="text-gray-600 mt-1">
                  Manage majors ({filteredMajors.length} total)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCreateNew}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white text-white px-4 py-2 rounded-lg hover: from-orange-700 hover:to-orange-800 transition-colors"
                >
                  <Plus className="w-8 h-8 text-white" />
                  <span className='text-white text-xl font-bold'>Add New Major</span>
                </button>
              </div>
            </div>
          </div>

          {/* Major List */}
          <MajorList
            majors={filteredMajors}
            onEdit={handleEditMajor}
            onDelete={handleDeleteMajor}
            onCreate={handleCreateNew}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Child Majors Section */}
          <div className="mt-12 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-5xl font-bold text-gray-900">All Child Majors</h2>
                <p className="text-gray-600 mt-1">
                  Manage child majors({childMajors.length} total)
                </p>
              </div>
              <button
                onClick={handleCreateChildMajor}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-colors"
              >
                <Plus className="w-8 h-8" />
                <span className='text-white text-xl font-bold'>Add Child Major</span>

              </button>
            </div>

            {loadingChildMajors ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <ChildMajorList
                childMajors={childMajors}
                onEdit={handleEditChildMajor}
                onDelete={handleDeleteChildMajor}
                onCreate={handleCreateChildMajor}
                majorName="All Majors"
              />
            )}
          </div>
        </main>

        {/* Child Major Form Modal */}
        <ChildMajorForm
          onSubmit={handleSubmitChildMajor}
          onBack={handleCloseChildMajorForm}
          isOpen={isChildMajorFormOpen}
          editingChildMajor={editingChildMajor}
          mode={childMajorFormMode}
        />
      </div>
    );
  }

  return null;
};

export default MajorManagement;