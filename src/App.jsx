import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import UserContextProvider from "./context/UserContext";
import FormInput from "./components/formInput/FormInput";
import FormRole from "./components/formRole/FormRole";
// import { AdminDashBoard } from "./pages/adminDashBoard";
import AdminLayout from "./components/layout/AdminLayout";
import Profile from "./pages/Profile";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout>{/* <AdminDashBoard /> */}</AdminLayout>,
    },
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
      ],
    },
    {
      path: "/adminDashboard",
      element: <AdminLayout>{/* <AdminDashBoard /> */}</AdminLayout>,
    },
    {
      path: "/profile",
      element: (
        <AdminLayout>
          <Profile />
        </AdminLayout>
      ),
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
