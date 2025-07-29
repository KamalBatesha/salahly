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

  let router =createBrowserRouter([
    {
      path: "/",
      element: <MyServices />
    },
    // {
    //   path: "/",
    //   element: <SignUp />
    // },
    {
      path:"/signup",
      element:<SignUp />,
      children:[
        {
          index:true,
          element:<FormInput/>
        },
        {
          path:"role",
          element:<FormRole/>
        }
      ]
    },
    {
      path:"/my-services",
      element:<MyServices />
    },
    {
      path:"/messages",
      element:<Messages />
    },
    {
      path:"/orders",
      element:<MyServices />
    },
    {
      path:"/settings",
      element:<MyServices />
    },
    {
      path:"*",
      element:<Navigate to="/" replace />
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App
