import React, { useState, useEffect } from 'react';
import { CampusList } from './CampusList';
import { CampusForm } from './CampusForm';
import { campusApi } from '../service/CampusApi';
import type { CampusApiResponse } from '../service/CampusApi';
import type { Campus, CampusFormData } from '../model/Model';
import { Search, X, Plus } from 'lucide-react';

const CampusManagement: React.FC = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampus, setEditingCampus] = useState<Campus | undefined>();
    const [filteredCampuses, setFilteredCampuses] = useState<Campus[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Convert API response to Campus model
  const mapApiResponseToCampus = (apiCampus: CampusApiResponse): Campus => ({
    id: apiCampus.id,
    name: apiCampus.name,
    address: apiCampus.address,
    phone: apiCampus.phone,
    email: apiCampus.email,
    createdAt: apiCampus.createdAt ? new Date(apiCampus.createdAt) : new Date(),
    updatedAt: apiCampus.updatedAt ? new Date(apiCampus.updatedAt) : new Date(),
  });

  // Fetch campuses from API
  const fetchCampuses = async () => {
    try {
      setLoading(true);
      const apiCampuses = await campusApi.getAllCampuses();
      const mappedCampuses = apiCampuses.map(mapApiResponseToCampus);
      setCampuses(mappedCampuses);
            setFilteredCampuses(mappedCampuses);
      setError(null);
    } catch (err) {
      setError('Failed to fetch campuses');
      console.error('Error fetching campuses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search campuses using API
  const searchCampuses = async (keyword: string) => {
    try {
      setSearching(true);
      
      if (keyword.trim() === '') {
        // If no keyword, show all campuses
        setFilteredCampuses(campuses);
      } else {
        // Call search API
        console.log('Calling search API with keyword:', keyword);
        const apiCampuses = await campusApi.searchCampuses(keyword);
        const mappedCampuses = apiCampuses.map(mapApiResponseToCampus);
        setFilteredCampuses(mappedCampuses);
        console.log('Search results:', mappedCampuses);
      }
      setError(null);
    } catch (err) {
      setError('Failed to search campuses');
      console.error('Error searching campuses:', err);
    } finally {
      setSearching(false);
    }
  };

  // Handle search input with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCampuses(searchKeyword);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchKeyword, campuses]); // Add campuses dependency


  // Load campuses on component mount
  useEffect(() => {
    fetchCampuses();
  }, []);

  const handleAddCampus = async () => {
  console.log('Add campus clicked!'); // Debug log
  setEditingCampus(undefined);
  setIsFormOpen(true);
  console.log('Form should be open now, isFormOpen:', true); // Debug log
};

const handleEditCampus = async (campus: Campus) => {
  console.log('Edit campus clicked!', campus); // Debug log
  setEditingCampus(campus);
  setIsFormOpen(true);
  console.log('Form should be open now, isFormOpen:', true); // Debug log
};

const handleSaveCampus = async (data: CampusFormData) => {
  console.log('Save campus called with data:', data); // Debug log
  try {
    if (editingCampus) {
      console.log('Updating campus...'); // Debug log
      await campusApi.updateCampus(editingCampus.id, data);
    } else {
      console.log('Creating new campus...'); // Debug log
      await campusApi.createCampus(data);
    }
    
    // Refresh the list after successful save
    await fetchCampuses();
     // Re-apply search if there was a search term
      if (searchKeyword.trim()) {
        await searchCampuses(searchKeyword);
      }

    setIsFormOpen(false);
    setEditingCampus(undefined);
    console.log('Campus saved successfully!'); // Debug log
  } catch (err) {
    console.error('Error saving campus:', err); // Debug log
    setError(editingCampus ? 'Failed to update campus' : 'Failed to create campus');
  }
};

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingCampus(undefined);
  };

  const handleDeleteCampus = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this campus?')) {
      try {
        await campusApi.deleteCampus(id);
        // Refresh the list after successful deletion
        await fetchCampuses();
         // Re-apply search if there was a search term
        if (searchKeyword.trim()) {
          await searchCampuses(searchKeyword);
        }
      } catch (err) {
        setError('Failed to delete campus');
        console.error('Error deleting campus:', err);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
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
          onClick={fetchCampuses}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Header with Search and Add Button */}
         <div>
          <h1 className="text-3xl font-bold text-gray-900">Campus Management</h1>
        </div>
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <p className="text-gray-600 mt-1">
                {searchKeyword.trim() ? `Search results for "${searchKeyword}"` : 'Manage your campus locations'}
                {filteredCampuses.length > 0 && (
                  <span className="ml-2 text-sm">
                    ({filteredCampuses.length} campus{filteredCampuses.length !== 1 ? 'es' : ''} found)
                  </span>
                )}
              </p>
            </div>
            
            <button
              onClick={handleAddCampus}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-colors bold"
            >
              <Plus className="w-8 h-8 text-white font-bold" />
              <span className='text-white text-xl font-bold'>Add  New Campus</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchKeyword}
                onChange={handleSearchChange}
                placeholder="Search campuses by name"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900"
              />
              {searchKeyword && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>

        {/* Loading indicator for search */}
        {searching && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-gray-600">Searching...</span>
          </div>
        )}
        <CampusList
          campuses={filteredCampuses}
          onAddCampus={handleAddCampus}
          onEditCampus={handleEditCampus}
          onDeleteCampus={handleDeleteCampus}
          searchKeyword='{searchKeyword}'
        />
      </main>

      {/* Campus Form Modal */}
      <CampusForm
        campus={editingCampus}
        onSave={handleSaveCampus}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default CampusManagement;