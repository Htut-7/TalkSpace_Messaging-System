import App from "../App";
import {
  createBrowserRouter,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'',
        element: <Navigate to='/login'/>
      },{
        path:"/register",
        element: <Register/>
      },{
        path:'/login',
        element: <Login/>
      },{
        path: '/dashboard',
        element: <Dashboard/>
      },{
        path: '/profile',
        element: <Profile/>
      }
    ]
  },
]);

export default router;