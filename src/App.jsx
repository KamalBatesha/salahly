import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import UserContextProvider from './context/UserContext'
import FormInput from './components/formInput/FormInput'
import { AdminDashBoard } from './pages/Admin/AdminDashBoard'
import AdminLayout from './components/AdminLayout/AdminLayout'
import {ProviderDashBoard} from './pages/Provider/ProviderDashBoard'
import ProviderLayout from './components/ProviderLayout/ProviderLayout'
import Providers from './pages/Admin/Providers'
import './App.css'
import SignUpDetails from './components/signUpDetails/SignUpDetails';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import AcountStatus from './pages/AcountStatus'
import Pending from './components/Pending';
import Rejected from './components/Rejected'
import Confirmed from './components/Confirmed'
import Profile from "./pages/Profile";
import FormRole from './components/formRole/FormRole';
import MyServices from './pages/MyServices';
import Messages from './pages/Messages';
<<<<<<< HEAD
import AdminCategory from './pages/AdminCategory'
=======
import ProviderOrders from './pages/Provider/ProviderOrders'
import Clients from './pages/Admin/Clients'
>>>>>>> origin/ProviderOrders-AdminClients

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
      path:"/signUp",
      element:<SignUp/>,
      children:[
        {
          index:true,
          element: <FormInput/>
        },
        {
          path:"role",
          element:<FormRole/>
        },
        {
          path:"provider",
          element:<SignUpDetails/>
        }
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },{
      path:"/acountStatus",
      element:<AcountStatus/>,
      children:[
        {
          path:"pending",
          element:<Pending/>
        },
        {
          path:"rejected",
          element:<Rejected/>
        },
        {
          path:"confirm/:token",
          element:<Confirmed/>
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
    {
      path: "/profile",
      element: (
        <AdminLayout>
          <Profile />
        </AdminLayout>
      ),
    },
    {
      path:"/my-services",
      element:<MyServices />
    },
    {
      path:"/messages",
      element:<Messages />
    },
    // {
    //   path:"/orders",
    //   element:<MyServices />
    // },
    {
      path:"/settings",
      element:<MyServices />
    },
        {
      path: "/orders",
      element: (
        <ProviderLayout>
          <ProviderOrders />
        </ProviderLayout>
      ),
    },
    {
      path: "/clients",
      element: (
        <AdminLayout>
          <Clients />
        </AdminLayout>
      ),
    },
    {
      path:"/services",
      element:<AdminLayout>
        <AdminCategory/>
      </AdminLayout>
    },
    {
      path:"*",
      element:<Navigate to="/" replace />
    }
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </UserContextProvider>
  );
}

export default App