// App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import UserContextProvider from './context/UserContext';
import FormInput from './components/formInput/FormInput';
import FormRole from './components/formRole/FormRole';
import MyServices from './pages/MyServices';
import Messages from './pages/Messages';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/signUp" replace />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
      children: [
        {
          index: true,
          element: <FormInput />,
        },
        {
          path: 'role',
          element: <FormRole />,
        },
      ],
    },
    {
      path: '/services',
      element: <MyServices />,
    },
    {
      path: '/messages',
      element: <Messages />,
    },
    {
      path: '*',
      element: <Navigate to="/signUp" replace />,
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
