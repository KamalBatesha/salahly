import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import UserContextProvider from './context/UserContext'
import FormInput from './components/formInput/FormInput'
import FormRole from './components/formRole/FormRole'

function App() {

  let router =createBrowserRouter([
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
      <Toaster/>
    </UserContextProvider>
  )
}

export default App