// // import React, { useState } from 'react';
// // import { Search, Plus, Edit, Trash2, Eye, Filter, GraduationCap } from 'lucide-react';
// // import type { Major } from '../model/Model'; // Adjust the import path as necessary

// // interface MajorsListProps {
// //   majors: Major[];
// //   onAddMajor: () => void;
// //   onEditMajor: (major: Major) => void;
// //   onDeleteMajor: (id: string) => void;
// // }

// // export const MajorsList: React.FC<MajorsListProps> = ({
// //   majors,
// //   onAddMajor,
// //   onEditMajor,
// //   onDeleteMajor
// // }) => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

// //   const filteredMajors = majors.filter(major => {
// //     const matchesSearch = major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          major.code.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesStatus = statusFilter === 'all' || major.status === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
// //         <div className="flex-1 flex flex-col sm:flex-row gap-4">
// //           <div className="relative flex-1 max-w-md">
// //             <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //             <input
// //               type="text"
// //               placeholder="Search majors..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             />
// //           </div>
// //           <div className="relative">
// //             <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value as any)}
// //               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
// //             >
// //               <option value="all">All Status</option>
// //               <option value="active">Active</option>
// //               <option value="inactive">Inactive</option>
// //             </select>
// //           </div>
// //         </div>
// //         <button
// //           onClick={onAddMajor}
// //           className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //         >
// //           <Plus className="w-5 h-5" />
// //           <span>Add Major</span>
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50 border-b border-gray-200">
// //               <tr>
// //                 <th className="text-left px-6 py-4 text-xl font-semibold text-gray-900">Major</th>
// //                 <th className="text-left px-6 py-4 text-xl font-semibold text-gray-900">Duration</th>
// //                 {/* <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Capacity</th> */}
// //                 <th className="text-left px-6 py-4 text-xl font-semibold text-gray-900"> Fee</th>
// //                 <th className="text-left px-6 py-4 text-xl font-semibold text-gray-900">Status</th>
// //                 <th className="text-left px-6 py-4 text-xl font-semibold text-gray-900">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {filteredMajors.map((major) => (
// //                 <tr key={major.id} className="hover:bg-gray-50 transition-colors">
// //                   <td className="px-6 py-4">
// //                     <div>
// //                       <div className="text-lg font-medium text-gray-900">{major.name}</div>
// //                       {/* <div className="text-sm text-gray-500">{major.code}</div> */}
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-900">{major.duration} years</td>
// //                   <td className="px-6 py-4">
// //                     <div className="text-sm text-gray-900">{major.enrolled}/{major.capacity}</div>
// //                     <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
// //                       <div
// //                         className="bg-blue-600 h-2 rounded-full"
// //                         style={{ width: `${(major.enrolled / major.capacity) * 100}%` }}
// //                       ></div>
// //                     </div>
// //                   </td>
// //                   <td className="px-6 py-4 text-sm text-gray-900">
// //                     ${major.tuitionFee.toLocaleString()}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
// //                       major.status === 'active'
// //                         ? 'bg-green-100 text-green-800'
// //                         : 'bg-red-100 text-red-800'
// //                     }`}>
// //                       {major.status}
// //                     </span>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <div className="flex items-center space-x-2">
// //                       <button className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors">
// //                         <Eye className="w-4 h-4" />
// //                       </button>
// //                       <button
// //                         onClick={() => onEditMajor(major)}
// //                         className="text-gray-600 hover:text-blue-600 p-1 rounded transition-colors"
// //                       >
// //                         <Edit className="w-4 h-4" />
// //                       </button>
// //                       <button
// //                         onClick={() => onDeleteMajor(major.id)}
// //                         className="text-gray-600 hover:text-red-600 p-1 rounded transition-colors"
// //                       >
// //                         <Trash2 className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {filteredMajors.length === 0 && (
// //         <div className="text-center py-12">
// //           <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">No majors found</h3>
// //           <p className="text-gray-500 mb-4">Get started by creating your first major.</p>
// //           <button
// //             onClick={onAddMajor}
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             Add Major
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   ); 
// // };
// import React from 'react';
// import { Search, Filter, SortAsc } from 'lucide-react';
// import type { Major } from '../model/Model';
// import { MajorCard } from './MajorCard';

// // interface MajorsListProps {
// //   majors: Major[];
// //   onAddMajor: () => void;
// //   onEditMajor: (major: Major) => void;
// //   onDeleteMajor: (id: string) => void;
// // }


// interface MajorListProps {
//   majors: Major[];
//   onAddMajor: () => void;
//   onEditMajor: (major: Major) => void;
//   onDeleteMajor: (id: string) => void;
//   searchTerm: string;
//   onSearchChange: (term: string) => void;
// }

// export const MajorList: React.FC<MajorListProps> = ({
//   majors,
//   onEditMajor,
//   onDeleteMajor,
//   searchTerm,
//   onSearchChange
// }) => {
//   const filteredMajors = majors.filter(major =>
//     major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     major.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     major.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search majors by name, code, or description..."
//               value={searchTerm}
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//           <div className="flex gap-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
//               <Filter className="w-4 h-4" />
//               Filter
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
//               <SortAsc className="w-4 h-4" />
//               Sort
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredMajors.map((major) => (
//           <MajorCard
//             key={major.id}
//             major={major}
//             onEdit={onEditMajor}
//             onDelete={onDeleteMajor}
//           />
//         ))}
//       </div>

//       {filteredMajors.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-lg mb-2">No majors found</div>
//           <p className="text-gray-500">
//             {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first major'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

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
  const filteredMajors = majors.filter(major =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    major.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    major.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* // Search and Create Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 mt-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campuses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={onCreate}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-7 h-5" />
          <span>Add Campus</span>
        </button>
      </div>


      {/* // Major Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMajors.map((major) => (
          <MajorCard
            key={major.id}
            major={major}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {filteredMajors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No majors found</div>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Start by adding your first major'}
          </p>
        </div>
      )}
    </div>
  );
};