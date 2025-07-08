import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, MapPin, Phone, Mail, Users } from 'lucide-react';
import type { Campus } from '../model/Model';

interface CampusListProps {
  campuses: Campus[];
  onAddCampus: () => void;
  onEditCampus: (campus: Campus) => void;
  onDeleteCampus: (id: string) => void;
}

export const CampusList: React.FC<CampusListProps> = ({
  campuses,
  onAddCampus,
  onEditCampus,
  onDeleteCampus
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampuses = campuses.filter(campus =>
    campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campus.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campuses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={onAddCampus}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Campus</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCampuses.map((campus) => (
          <div key={campus.id} className="bg-white rounded-xl shadow-sm border border-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{campus.name}</h3>
                  {/* <p className="text-sm text-gray-500">{campus.code}</p> */}
                </div>
                <span className={`inline-flex px-5 py-3 text-xl font-semibold rounded-full ${
                  campus.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {campus.status}
                </span>
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
                {/* <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Capacity: {campus.capacity.toLocaleString()}</span>
                </div> */}
              </div>

              {/* <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Facilities:</p>
                <div className="flex flex-wrap gap-1">
                  {campus.facilities.slice(0, 3).map((facility, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {facility}
                    </span>
                  ))}
                  {campus.facilities.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      +{campus.facilities.length - 3} more
                    </span>
                  )}
                </div>
              </div> */}

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

      {filteredCampuses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campuses found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first campus.</p>
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