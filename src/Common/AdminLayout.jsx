import { Outlet } from "react-router-dom";
import AdminNavbar from "../ComponentCommon/AdminNavbar";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
