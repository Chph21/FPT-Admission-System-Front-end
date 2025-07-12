import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/Layout';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';
import AdmissionSchedulePage from '../pages/AdmissionSchedule/AdmissionSchedulePage';
import StaffAdmissionSchedulePage from '../pages/StaffAdmissionSchedule/StaffAdmissionSchedulePage';
import Login from '../pages/Authen/Login';
import Register from '../pages/Authen/Register';
import TestPage from '../pages/Authen/TestPage';
import LoginSimple from '../pages/Authen/LoginSimple';
import { AdminLayout } from '../components/Admin/layout/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import Analytics from '../pages/Admin/Analytics';
import UserManager from '../pages/Admin/UserManager';
import { Setting } from '../pages/Admin/Setting';
import { Error404 } from '../pages/Admin/Error404';

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
    path: '/staff/admissionschedule',
    element: <StaffAdmissionSchedulePage />
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
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'users',
        element: <UserManager />
      },
      {
        path: 'settings',
        element: <Setting />
      },
      {
        path: 'error404',
        element: <Error404 />
      }
    ]
  }
]);

export default router;