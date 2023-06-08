 import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./navbar.jsx";
 import Footer from "./landingpage/footer.jsx";

function Layout() {
    return (
        <>
            <ResponsiveAppBar />
            <div style={{
                maxWidth: "1440px",
                width: "100%",
                margin: "0 auto"
            }}>
            <Outlet />
            </div>
            <Footer/>
        </>
    );
}

export default Layout;
