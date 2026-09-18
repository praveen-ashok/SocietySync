import { createBrowserRouter } from "react-router-dom";

import Layout from "../Common/Layout";
import AdminLayout from "../Common/AdminLayout";

import Home from "./Home";
import Login from "./Login";
import Register from "./Registration";
import Unauthorized from "./Unauthorized";

import ProtectedRoute from "../ComponentCommon/ProtectedRoute";

// Member Pages
import MemberDashboard from "./MemberDashboard";
import Complaints from "./Complaints";
import Announcements from "./Announcements";
import FacilityBooking from "./FacilityBooking";
import Payment from "./Payment";

// Admin Pages
import AdminDashboard from "./AdminDashboard";
import ManageMembers from "./ManageMembers";
import ManageComplaints from "./ManageComplaints";
import ManageAnnouncements from "./ManageAnnouncements";
import ManageBookings from "./ManageBookings";

const router = createBrowserRouter([
  // =====================================
  // MEMBER / COMMON LAYOUT
  // =====================================
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "unauthorized",
        element: <Unauthorized />,
      },

      // Member Dashboard
      {
        path: "member-dashboard",
        element: (
          <ProtectedRoute role="member">
            <MemberDashboard />
          </ProtectedRoute>
        ),
      },

      // Complaints
      {
        path: "complaints",
        element: (
          <ProtectedRoute role="member">
            <Complaints />
          </ProtectedRoute>
        ),
      },

      // Announcements
      {
        path: "announcements",
        element: (
          <ProtectedRoute role="member">
            <Announcements />
          </ProtectedRoute>
        ),
      },

      // Facility Booking
      {
        path: "bookings",
        element: (
          <ProtectedRoute role="member">
            <FacilityBooking />
          </ProtectedRoute>
        ),
      },

      // Maintenance Payment
      {
        path: "payment",
        element: (
          <ProtectedRoute role="member">
            <Payment />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // =====================================
  // ADMIN LAYOUT
  // =====================================
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // Admin Dashboard
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      // Manage Members
      {
        path: "manage-members",
        element: (
          <ProtectedRoute role="admin">
            <ManageMembers />
          </ProtectedRoute>
        ),
      },

      // Manage Complaints
      {
        path: "manage-complaints",
        element: (
          <ProtectedRoute role="admin">
            <ManageComplaints />
          </ProtectedRoute>
        ),
      },

      // Manage Announcements
      {
        path: "manage-announcements",
        element: (
          <ProtectedRoute role="admin">
            <ManageAnnouncements />
          </ProtectedRoute>
        ),
      },

      // Manage Facility Bookings
      {
        path: "manage-bookings",
        element: (
          <ProtectedRoute role="admin">
            <ManageBookings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
