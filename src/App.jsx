
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import UserContextProvider from './context/UserContext'
import FormInput from './components/formInput/FormInput'
import FormRole from './components/formRole/FormRole'
import SignUpDetails from './components/signUpDetails/SignUpDetails';
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import AcountStatus from './pages/AcountStatus'
import Pending from './components/Pending';
import Rejected from './components/Rejected'
import Confirmed from './components/Confirmed'


function App() {

  let router =createBrowserRouter([
    {
      path: '/',
      element: <h1>home</h1>
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
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </UserContextProvider>
  )
}

export default App
