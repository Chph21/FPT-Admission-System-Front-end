import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/Layout';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';
import AdmissionSchedulePage from '../pages/AdmissionSchedule/AdmissionSchedulePage';
import StaffAdmissionSchedulePage from '../pages/StaffAdmissionSchedule/StaffAdmissionSchedulePage';

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
  }
]);

export default router;