# SocietySync – Society Management System

A frontend-only Society Management System for **Members** and **Admins**,
built in the same style and file structure as the reference CarRentalSystem
project: `Common/` layouts, `ComponentCommon/` shared components, `Pages/`
with a co-located CSS file per page, a `Pages/Router.jsx` using
`createBrowserRouter`, and Context + `useReducer` for shared state.

## Tech Stack
- React.js + Vite
- JavaScript (no TypeScript)
- Bootstrap 5 (navbar, grid, buttons)
- React Router DOM (`createBrowserRouter` / `RouterProvider`)
- React Hook Form
- Context API + `useReducer` (complaints & announcements)
- localStorage (session, users, complaints, bookings, payments, announcements)

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Demo Accounts

| Role   | Email                     | Password       |
|--------|----------------------------|----------------|
| Admin  | admin@societysync.com      | Admin@123      |
| Member | member@societysync.com     | Member@123     |

New accounts can also be created from the Register page (choose "Member" or
"Admin" as the role).

## Folder Structure

```
src/
  Common/            Layout, AdminLayout
  ComponentCommon/   Navbar, AdminNavbar, Footer, ProtectedRoute
  Pages/             Every page + its own CSS file, plus Router.jsx
  context/           ComplaintContext, AnnouncementContext (useReducer)
  data/              seed users, facilities, announcements
```

## Features

**Member**
- Register / Login with role-based redirect
- Member Dashboard with complaint, booking and payment stats
- Raise & track Complaints (Context + useReducer)
- View Announcements published by the Admin
- Book a Facility (Community Hall, Gym, Garden, Clubhouse)
- **Pay Maintenance** — pay the monthly maintenance amount and view payment
  history

**Admin**
- Admin Dashboard with society-wide stats (members, complaints, bookings,
  maintenance collected, announcements)
- Manage Members (view & remove)
- Manage Complaints (update status, delete)
- **Manage Announcements** — publish and delete notices, instantly visible
  to members
- Admin Navbar keeps the Logout button always visible, even on mobile,
  instead of hiding it inside the collapsible menu

All dashboards use a responsive `auto-fit` card grid so summary cards
reflow cleanly and never overlap or overflow on smaller screens.
