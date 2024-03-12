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
