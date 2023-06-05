import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./navbar.jsx";

function Layout() {
    return (
        <>
            <ResponsiveAppBar />
            <Outlet />
        </>
    );
}

export default Layout;
