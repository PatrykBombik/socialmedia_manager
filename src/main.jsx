import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Landingpage from "./routes/landingpage.jsx";
import Registration from "./routes/registration.jsx";
import Login from "./routes/login.jsx";
import Dashboard from "./routes/dashboard.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landingpage />,
    },
    {
        path: "/registration",
        element: <Registration />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
