import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import App from "../App.jsx";
import Registration from "../components/registration.jsx";
import Login from "../components/login.jsx";
import Daily from "../components/daily/daily.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/registration",
                element: <Registration/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/daily",
                element: <Daily/>,
            },
        ]
    },
]);