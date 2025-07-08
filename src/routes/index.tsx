import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/Layout';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';
import StaffLayout from '../pages/Staff/layout/StaffLayout';
// import { MajorList } from '../pages/Staff/major/ListMajor'
import { MajorManagement } from '../pages/Staff/major/MajorManagement';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      // Add more routes here as needed
    ]
  },
  {
    path: '/chatbot',
    element: <ChatBotPage />
  },
  {
    path:'/staff',
    element: <StaffLayout />,
    children: [
      {
        path: 'majors',
        element: <MajorManagement />
      }
      // Add more routes here as needed
    ]
  }

  
]);

export default router; 