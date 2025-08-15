import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import UserContextProvider, { UserContext } from './context/UserContext'
import FormInput from './components/formInput/FormInput'
import { AdminDashBoard } from './pages/Admin/AdminDashBoard'
import AdminLayout from './components/AdminLayout/AdminLayout'
import { ProviderDashBoard } from './pages/Provider/ProviderDashBoard'
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
import Orders from './pages/Orders';
import AdminChat from './pages/AdminChat';
import ProviderOrders from './pages/Provider/ProviderOrders'
import Clients from './pages/Admin/Clients'
import Categories from './pages/Admin/Categories'
import { useContext } from 'react'
import AboutUs from './pages/AboutUs'
import JoinedProviderDetails from './pages/Admin/JoinedProviderDetails'
import ProviderRequestDetails from './pages/Admin/ProviderRequestDetails'
import AdminServices from "./pages/Admin/AdminServices";
import UserLayout from './components/UserLayout/UserLayout'
import UserHome from './pages/User/UserHome'
import ContactUs from './pages/ContactUs'

import ServicesScreen from './pages/User/ServicesScreen'
import ServiceDetailsScreen from './pages/User/ServiceDetailsScreen'
import { User } from 'lucide-react'
import BookingPopups from './pages/User/BookingPopups'
import ProviderProfileScreen from './pages/user/provider_profile';
import TalabatyScreen from './pages/user/talabaty';


function App() {
  let {userRole,token}=useContext(UserContext)
  console.log(userRole,token);
  // let userRole = "provider";
  const userTypes = {
    admin: "admin",
    provider: "provider",
    user: "user"
  }

  let router = createBrowserRouter([
    {
      path: "/signUp",
      element: <SignUp />,
      children: [
        {
          index: true,
          element: <FormInput />,
        },
        {
          path: "role",
          element: <FormRole />,
        },
        {
          path: "provider",
          element: <SignUpDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/acountStatus",
      element: <AcountStatus />,
      children: [
        {
          path: "pending",
          element: <Pending />,
        },
        {
          path: "rejected",
          element: <Rejected />,
        },
        {
          path: "confirm/:token",
          element: <Confirmed />,
        },
      ],
    },
    {
      path: "/",
      element:

        userRole == userTypes.admin ? (
          <AdminLayout>
            <AdminDashBoard />
          </AdminLayout>
        ) :
          userRole == userTypes.provider ? (
            <ProviderLayout>
              <ProviderDashBoard />
            </ProviderLayout>
          ) : userRole == userTypes.user ? (
            <UserLayout>
              <UserHome />
            </UserLayout>
          ) : (
            <div>Unauthorized</div>
          )
    },
    // {
    //   path: "/adminDashboard",
    //   element: (
    //     <AdminLayout>
    //       <AdminDashBoard />
    //     </AdminLayout>
    //   ),
    // },
    {
      path: "/providers",
      element: userRole == userTypes.admin ? (
        <AdminLayout>
          <Providers />
        </AdminLayout>
      ) : <Navigate to="/" replace />,
    },

    {
      path: "/userservices",
      element: userRole == userTypes.user ? (
        <UserLayout>
          <ServicesScreen />
        </UserLayout>
      ) : <Navigate to="/" replace />,
    },
    {
      path: "/serviceDetails",
      element: userRole == userTypes.user ? (
        <UserLayout>
          <ServiceDetailsScreen />
        </UserLayout>
      ) : <Navigate to="/" replace />,
    },
    {
      path: "/bookingPopups",
      element: userRole == userTypes.user ? (
        <UserLayout>
          <BookingPopups/>
        </UserLayout>
      ) : <Navigate to="/" replace />,
    },
    {
      path: "/about",
      element: userRole == userTypes.user ? (
        <UserLayout>
          <AboutUs />
        </UserLayout>
      ) : <Navigate to="/" replace />,
    },
    // {
    //   path: "/providerDashboard",
    //   element: (
    //      <ProviderLayout>
    //       <ProviderDashBoard/>
    //     </ProviderLayout>
    //   ),
    // },
    {
      path: "/profile",
      element: userRole == userTypes.provider ? (
        <ProviderLayout>
          <Profile />
        </ProviderLayout>
      ) : <Navigate to="/" replace />,
    },
    {
      path: "/services",
      element: userRole == userTypes.provider ? (
        <ProviderLayout>
          <MyServices />
        </ProviderLayout>
      ) : userRole == userTypes.admin ? (
        <AdminLayout>
          <AdminServices />
        </AdminLayout>
      ) : <Navigate to="/" replace />
    },
    {
      path: "/messages",
      element: userRole == userTypes.provider ? (
        <ProviderLayout>
          <Messages />
        </ProviderLayout>
      ) : userRole == userTypes.admin ? (
        <AdminLayout>
          <AdminChat />
        </AdminLayout>
      ) : <h1>user chat</h1>,
    },
    // {
    //   path:"/orders",
    //   element:<MyServices />
    // },
    {
      path: "/orders",
      element: userRole == userTypes.admin ? (
        <AdminLayout>
          <Orders />
        </AdminLayout>
      ) : userRole == userTypes.provider ? (
        <ProviderLayout>
          <ProviderOrders />
        </ProviderLayout>
      ) : <h1> user orders </h1>,
    },
    {
      path: "/categories",
      element: userRole == userTypes.admin ? (
        <AdminLayout>
          <Categories />
        </AdminLayout>
      ) : <Navigate to="/" replace />
    },
    {
      path: "/clients",
      element: userRole == userTypes.admin ? (
        <AdminLayout>
          <Clients />
        </AdminLayout>
      ) : <Navigate to="/" replace />
    },
    // {
    //   path: "/ProviderOrders",
    //   element: (
    //     <ProviderLayout>
    //       <ProviderOrders />
    //     </ProviderLayout>
    //     )
    // },
    // {
    //   path:"/settings",
    //   element:<MyServices />
    // },
    // {
    //   path: "/aboutUs",
    //   element: <AboutUs />
    // },
    {
      path:"/ContactUs",
      element:(
        <UserLayout>
          <ContactUs />
        </UserLayout>
      )
    },
    {
      path:"/ProviderRequestDetails",
      element:userRole==userTypes.admin?(
        <AdminLayout>
          <ProviderRequestDetails />
        </AdminLayout>
      ):<Navigate to="/" replace />
    },
    
    {
      path:"/JoinedProviderDetails",
      element:userRole==userTypes.admin?(
        <AdminLayout>
          <JoinedProviderDetails />
        </AdminLayout>
      ):<Navigate to="/" replace />
    },
    {
      path:"/ProviderProfileScreen",
      element:userRole==userTypes.user?(
        <UserLayout>
          <ProviderProfileScreen />
         </UserLayout>
      ):<Navigate to="/" replace />
      
    },
    {
      path:"/TalabatyScreen",
      element:userRole==userTypes.user?(
        <UserLayout>
          <TalabatyScreen />
        </UserLayout>
      ):<Navigate to="/" replace />
      
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return (
    // <UserContextProvider>
    <RouterProvider router={router} />
    // {/* <Toaster/> */}
    // {/* </UserContextProvider> */}
  );
}

export default App;
