import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/layout/Layout';
import ChatBotPage from '../pages/ChatBot/ChatBotPage';

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
  }
]);

export default router; 