import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/Layout';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';
import StaffLayout from '../pages/Staff/layout/StaffLayout';
// import { MajorList } from '../pages/Staff/major/ListMajor'
import { MajorManagement } from '../pages/Staff/major/MajorManagement';
import AdmissionSchedulePage from '../pages/AdmissionSchedule/AdmissionSchedulePage';
import StaffAdmissionSchedulePage from '../pages/StaffAdmissionSchedule/StaffAdmissionSchedulePage';
import Login from '../pages/Authen/Login';
import Register from '../pages/Authen/Register';
import TestPage from '../pages/Authen/TestPage';
import LoginSimple from '../pages/Authen/LoginSimple';
// import { AdminLayout } from '../components/Admin/layout/AdminLayout';
// import Dashboard from '../pages/Admin/Dashboard';
// import Analytics from '../pages/Admin/Analytics';
// import UserManager from '../pages/Admin/UserManager';
// import { Setting } from '../pages/Admin/Setting';
// import Error404 from '../pages/Admin/Error404';
// import PostListPage from '../pages/Post/PostListPage';
// import CreatePostPage from '../pages/Post/CreatePostPage';
// import EditPostPage from '../pages/Post/EditPostPage';
// import AlumniNewsPage from '../pages/Post/AlumiNewPage';
// import NewsPage from '../pages/Post/NewPage';
// import PostDetailPage from '../pages/Post/PostDetailPage';
// import TrainingProgramPage from '../pages/Post/TrainingProgramPage';
// import GlobalExperiencePage from '../pages/Post/GlobalExperiencePage';
import CampusManagement from '../pages/Staff/campus/CampusManagement';
import { DashboardOverview } from '../pages/Staff/Dashboard/Overview';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'admission-schedule',
        element: <AdmissionSchedulePage />
      },
    ]
  },
  {
    path: '/chatbot',
    element: <ChatBotPage />
  },
  {
    path: '/staff',
    element: <StaffLayout />,
    children: [
       {
        index: true,
        element: <DashboardOverview />
      },
      {
        path: 'majors',
        element: <MajorManagement />
      },
      {
        path: 'campuses',
        element: <CampusManagement />
      },
      {
        path: 'admissionschedule',
        element: <StaffAdmissionSchedulePage />
      },
      // Add more routes here as needed
    ]
  },

  {

    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/test',
    element: <TestPage />
  },
  {
    path: '/login-simple',
    element: <LoginSimple />
  }


]);

export default router;