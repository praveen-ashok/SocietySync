import Navbar from "../ComponentCommon/Navbar";
import Footer from "../ComponentCommon/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default Layout;
