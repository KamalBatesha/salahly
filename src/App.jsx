import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import UserContextProvider from './context/UserContext'
import FormInput from './components/formInput/FormInput'
import FormRole from './components/formRole/FormRole'
import { AdminDashBoard } from './pages/Admin/AdminDashBoard'
import AdminLayout from './components/AdminLayout/AdminLayout'
import {ProviderDashBoard} from './pages/Provider/ProviderDashBoard'
import ProviderLayout from './components/ProviderLayout/ProviderLayout'
import Providers from './pages/Admin/Providers'

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AdminLayout>
          <AdminDashBoard />
        </AdminLayout>
      ),
    },
    {
      path: "/signUp",
      element: <SignUp />,
      children: [
        {
          index: true,
          element: <FormInput />
        },
        {
          path: "role",
          element: <FormRole />
        }
      ]
    },
    {
      path: "/adminDashboard",
      element: (
        <AdminLayout>
          <AdminDashBoard />
        </AdminLayout>
      ),
    },
    {
      path: "/providers",
      element: (
         <AdminLayout>
          <Providers/>
        </AdminLayout>
      ),
    },
    {
      path: "/providerDashboard",
      element: (
         <ProviderLayout>
          <ProviderDashBoard/>
        </ProviderLayout>
      ),
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App