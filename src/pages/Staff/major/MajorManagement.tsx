import React, { useState } from 'react';
import type { Major, MajorFormData } from '../model/Model';
import { MajorList } from './ListMajor';
import { CreateMajorPage } from './CreateMajor';
import { EditMajorPage } from './EditMajor';

type PageType = 'major-list' | 'major-create' | 'major-edit';

export const MajorManagement: React.FC = () => {
  const [majors, setMajors] = useState<Major[]>([
    {
      id: '1',
      name: 'Computer Science',
      code: 'CS',
      description: 'Study of computational systems and the design of computer systems and their applications.',
      childMajors: [
        {
          id: '1-1',
          name: 'Software Engineering',
          code: 'SE',
          description: 'Focus on software development methodologies and practices.'
        },
        {
          id: '1-2',
          name: 'Data Science',
          code: 'DS',
          description: 'Analysis and interpretation of complex data sets.'
        },
        {
          id: '1-3',
          name: 'Artificial Intelligence',
          code: 'AI',
          description: 'Study of intelligent systems and machine learning.'
        }
      ],
    },
    {
      id: '2',
      name: 'Business Administration',
      code: 'BA',
      description: 'Comprehensive study of business operations, management, and entrepreneurship.',
      childMajors: [
        {
          id: '2-1',
          name: 'Marketing',
          code: 'MKT',
          description: 'Study of market research, consumer behavior, and promotional strategies.'
        },
        {
          id: '2-2',
          name: 'Finance',
          code: 'FIN',
          description: 'Financial analysis, investment strategies, and corporate finance.'
        }
      ],
    }
  ]);

  const [currentPage, setCurrentPage] = useState<PageType>('major-list');
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateMajor = (formData: MajorFormData) => {
    const newMajor: Major = {
      id: Date.now().toString(),
      ...formData,
      childMajors: formData.childMajors.map((child, index) => ({
        ...child,
        id: `${Date.now()}-${index}`
      })),
    };

    setMajors(prev => [...prev, newMajor]);
    setCurrentPage('major-list');
  };

  const handleEditMajor = (major: Major) => {
    setEditingMajor(major);
    setCurrentPage('major-edit');
  };

  const handleUpdateMajor = (formData: MajorFormData) => {
    if (!editingMajor) return;

    const updatedMajor: Major = {
      ...editingMajor,
      ...formData,
      childMajors: formData.childMajors.map((child, index) => ({
        ...child,
        id: `${editingMajor.id}-${index}`
      })),

    };

    setMajors(prev => prev.map(major =>
      major.id === editingMajor.id ? updatedMajor : major
    ));
    setEditingMajor(null);
    // setShowForm(false);
    setCurrentPage('major-list');
  };

  const handleDeleteMajor = (id: string) => {
    if (window.confirm('Are you sure you want to delete this major?')) {
      setMajors(prev => prev.filter(major => major.id !== id));
    }
  };


  // const totalChildMajors = majors.reduce((sum, major) => sum + major.childMajors.length, 0);
  const handleCreateNew = () => {
    setCurrentPage('major-create');
  };

  const handleBackToMajorList = () => {
    setCurrentPage('major-list');
    setEditingMajor(null);
  };

  // Major pages
  if (currentPage === 'major-create') {
    return (
      <CreateMajorPage
        onSubmit={handleCreateMajor}
        onBack={handleBackToMajorList}
      />
    );
  }

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

  if (currentPage === 'major-list') {
    return (
      <MajorList
        majors={majors}
        onEdit={handleEditMajor}
        onDelete={handleDeleteMajor}
        onCreate={handleCreateNew}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    );
  }
  return (
    <MajorList
      majors={majors}
      onEdit={handleEditMajor}
      onDelete={handleDeleteMajor}
      onCreate={handleCreateNew}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    />
  );
};