import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import Logout from './features/auth/component/Logout';

const router=createBrowserRouter([
  {
    path:"/",
    element:<HomePage />
  },

  {
    path:"/signup",
    element:<SignupPage />
  },
  {
    path:"/login",
    element:<LoginPage />
  },
{
  path:"/logout",
  element:<Logout />
},
  {
    path:"/forget-password",
    element:<ForgetPasswordPage />
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
