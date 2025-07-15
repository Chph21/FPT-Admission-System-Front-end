import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Header } from '../layout/Header';
import { DashboardOverview } from '../Dashboard/Overview';
import { MajorManagement } from '../major/MajorManagement';
// import { CampusList } from '../campus/CampusList';
import CampusManagement from '../campus/CampusManagement';
// import { PostsList } from './components/Posts/PostsList';
import { mockStats} from '../data/MockData';
import StaffAdmissionSchedulePage from '../../StaffAdmissionSchedule/StaffAdmissionSchedulePage';
import TicketListPage from '../../Ticket/TicketListPage';
// import type { Major, Campus, Post } from '../model/Model';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  // const [majors, setMajors] = useState<Major[]>(mockMajors);
  // const [campuses, setCampuses] = useState<Campus[]>(mockCampuses);
  // const [posts, setPosts] = useState<Post[]>(mockPosts);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'majors': return 'Majors Management';
      case 'campuses': return 'Campus Management';
      case 'admissionschedule': return 'Manage Schedule';
      case 'tickets': return 'Ticket List';
      case 'posts': return 'Posts Management';
      case 'staff': return 'Staff Management';
      case 'analytics': return 'Analytics & Reports';
      case 'notifications': return 'Notifications';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  // const handleAddMajor = () => {
  //   console.log('Add major clicked');
  //   // Implementation for add major modal/form
  // };

  // const handleEditMajor = (major: Major) => {
  //   console.log('Edit major:', major);
  //   // Implementation for edit major modal/form
  // };

  // const handleDeleteMajor = (id: string) => {
  //   setMajors(majors.filter(major => major.id !== id));
  // };

  // const handleAddCampus = () => {
  //   console.log('Add campus clicked');
  //   // Implementation for add campus modal/form
  // };

  // const handleEditCampus = (campus: Campus) => {
  //   console.log('Edit campus:', campus);
  //   // Implementation for edit campus modal/form
  // };

  // const handleDeleteCampus = (id: string) => {
  //   setCampuses(campuses.filter(campus => campus.id !== id));
  // };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview stats={mockStats} />;
      case 'majors':
        return <MajorManagement />;
      case 'campuses':
        return <CampusManagement />;
      case 'admissionschedule':
        return <StaffAdmissionSchedulePage />;
      case 'tickets':
        return <TicketListPage />;
      default:
        return <DashboardOverview stats={mockStats} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;