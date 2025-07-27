
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './pages/SignUp'
import UserContextProvider from './context/UserContext'
import FormInput from './components/formInput/FormInput'
import FormRole from './components/formRole/FormRole'

function App() {

  let router =createBrowserRouter([
    {
      path:"/signUp",
      element:<SignUp/>,
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
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App
