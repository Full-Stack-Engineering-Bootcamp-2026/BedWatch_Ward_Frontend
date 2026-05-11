# BedWatch Frontend – Hospital Bed & Resource Management System

## Overview

BedWatch Frontend is a React + TypeScript based hospital management interface developed for managing hospital beds, patient admissions, discharges, transfers, and ward operations.

The frontend provides role-based dashboards and workflows for:

- Admin
- Senior Staff
- Staff

The application uses protected routing, reusable UI components, Redux state management, and responsive layouts.

---

# Tech Stack

- React
- TypeScript
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Axios
- React Toastify
- Vite

---

# Features

## Authentication

- JWT-based authentication
- Protected routes
- Role-based access control
- Secure navigation

---

## Admin Module

- Dashboard analytics
- Staff management
- Ward management
- Occupancy reports
- Admin profile management

---

## Senior Staff Module

- Inter-ward transfer management
- Transfer approval workflow
- All wards overview
- Senior staff dashboard
- Profile management

---

## Staff Module

- Patient admission
- Patient discharge
- Bed allocation
- Bed status management
- Transfer patient workflow
- Staff profile management

---

# Folder Structure

```bash
src/
│
├── assets/
│
├── components/
│   │
│   ├── Admin/
│   │   ├── components/
│   │   ├── layout/
│   │   └── pages/
│   │
│   ├── protected/
│   │   ├── AdminProtectedRoute.tsx
│   │   ├── SrStaffProtectedRoute.tsx
│   │   └── StaffProtectedRoute.tsx
│   │
│   ├── SrStaff/
│   │   ├── component/
│   │   ├── Layout/
│   │   ├── AllWards.tsx
│   │   ├── DashBoard.tsx
│   │   ├── InterWardTransfer.tsx
│   │   ├── SrStaff.profile.tsx
│   │   └── ViewPending.tsx
│   │
│   └── Staff/
│       ├── components/
│       │   ├── BedCard.tsx
│       │   ├── BedGrid.tsx
│       │   ├── DischargePatientDialog.tsx
│       │   ├── DischargePatientTable.tsx
│       │   ├── DischargeStats.tsx
│       │   ├── Filterbar.tsx
│       │   ├── PatientDetailDialog.tsx
│       │   ├── PatientSearchBar.tsx
│       │   ├── SummaryCards.tsx
│       │   └── TransferPatientDialog.tsx
│       │
│       ├── layout/
│       │
│       ├── Pages/
│       │   ├── DischargePatient.tsx
│       │   ├── NewAdmission.tsx
│       │   ├── StaffDashboard.tsx
│       │   └── staffProfilePage.tsx
│       │
│       └── types/
│
├── hooks/
├── lib/
├── pages/
├── services/
├── store/
├── ui/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Route Structure

## Admin Routes

```bash
/admin-dashboard
/Wardview
/Systemadmin
/admin-profile
/admin-occupancyChart
```

---

## Senior Staff Routes

```bash
/sr-staff/dashboard
/sr-staff/transfers
/sr-staff/profile
/sr-staff/AllWards
/sr-staff/ViewPending
```

---

## Staff Routes

```bash
/staff-dashboard
/staff/admit
/staff/discharge
/staff/profile
```

---

# Protected Routes

The application uses role-based protected routes:

- AdminProtectedRoute
- SrStaffProtectedRoute
- StaffProtectedRoute

These routes:

- Validate JWT token
- Check user roles
- Restrict unauthorized access
- Redirect invalid users

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5173
```

---

# Project Highlights

- Enterprise-level frontend structure
- Reusable component architecture
- Clean folder organization
- Responsive UI
- Modular layouts
- Real-world hospital workflow implementation
- Role-based dashboards
- Protected navigation system

---

# Author

Developed as part of the BedWatch Hospital Bed & Resource Management System project.
