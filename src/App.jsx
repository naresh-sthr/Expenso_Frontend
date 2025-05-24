import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router"; // use `react-router-dom`, not `react-router`

import Layout from "./layouts/Layout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import PrivateComp from "./components/PrivateComp";
import AuthRedirect from "./components/AuthRedirect";
import Logout from "./components/Logout";
import Account from "./pages/Account";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout with navbar + footer
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/logout", element: <Logout /> },
      {
        path: "/signup",
        element: (
          <AuthRedirect>
            {" "}
            <Signup />{" "}
          </AuthRedirect>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthRedirect>
            {" "}
            <Login />{" "}
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateComp>
        {" "}
        <DashboardLayout />
      </PrivateComp>
    ), // Dashboard layout with sidebar, NO navbar/footer
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      { path: "income", element: <Income /> }, // /dashboard/income
      { path: "expenses", element: <Expenses /> }, // /dashboard/expenses
      { path: "account", element: <Account /> }, // /dashboard/expenses
      { path: "analytics", element: <Analytics /> }, // /dashboard/expenses
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
