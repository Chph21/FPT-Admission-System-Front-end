import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, Phone, Mail, Users } from 'lucide-react';
import type { Campus } from '../model/Model';

interface CampusListProps {
  campuses: Campus[];
  onAddCampus: () => void;
  onEditCampus: (campus: Campus) => void;
  onDeleteCampus: (id: string) => void;
  searchKeyword?: string; // Add this for empty state handling

}

export const CampusList: React.FC<CampusListProps> = ({
  campuses,
  onAddCampus,
  onEditCampus,
  onDeleteCampus,
  searchKeyword = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampuses = campuses.filter(campus =>
    campus.name.toLowerCase().includes(searchTerm.toLowerCase())
    // You can add more filter conditions here if needed
  );

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCampuses.map((campus) => (
          <div key={campus.id} className="bg-white rounded-xl shadow-sm border border-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{campus.name}</h3>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-xl text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{campus.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-xl text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{campus.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xl text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{campus.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-2xl text-gray-900 font-bold">Actions</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEditCampus(campus)}
                    className="text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCampus(campus.id)}
                    className="text-gray-600 hover:text-red-600 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {campuses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchKeyword ? 'No campuses found' : 'No campuses available'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchKeyword
              ? 'Try adjusting your search terms or clear the search to see all campuses.'
              : 'Get started by adding your first campus.'
            }
          </p>
          <button
            onClick={onAddCampus}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Campus
          </button>
        </div>
      )}
    </div>
  );
};