 import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./navbar.jsx";
 import Footer from "./landingpage/footer.jsx";

function Layout() {
    return (
        <>
            <ResponsiveAppBar />
            <Outlet />
            <Footer/>
        </>
    );
}

export default Layout;
