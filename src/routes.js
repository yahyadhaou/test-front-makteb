import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import PrivateRoute from './privateRoute/PrivateRoute';
import Archive from './pages/Archive';
import Problemes from './pages/Problemes';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Dossiers from './pages/Dossiers';
import DashboardAppPage from './pages/DashboardAppPage';
import Procedures from './pages/Procedures';
import Contact from "./pages/contact";
import Seances from "./pages/Seances";
import AddNewfolderPage from './pages/AddNewfolderPage';
import ProfilPage from './pages/ProfilePage';
import UpdateFolderCase from './pages/UpdateFolderCase';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'Procedures', element: <Procedures /> },
        { path: 'Seances', element: <Seances /> },
        { path: 'Problemes', element: <Problemes /> },
        { path: 'Dossiers', element: <Dossiers /> },
        { path: 'Archive', element: <Archive /> },
        { path: 'contact', element: <Contact /> },
        { path: 'ProfilPage', element: <ProfilPage /> },
        { path: 'AddNewfolderPage', element: <AddNewfolderPage /> },
        { path: 'UpdateFolderCase/:numeroDossier', element: <UpdateFolderCase /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
