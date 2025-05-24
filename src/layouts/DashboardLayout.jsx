import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
  { name: "Expenses", path: "/dashboard/expenses", icon: <DollarSign /> },
  { name: "Income", path: "/dashboard/income", icon: <DollarSign className="rotate-180" /> },
  { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart3 /> },
];

const DashboardLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-slate-950 text-white relative">
      {/* Top Navbar (Mobile only) */}
      <header className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <h2 className="text-xl font-bold text-sky-400">Expenso</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded bg-slate-800 hover:bg-slate-700"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 sm:top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          sm:translate-x-0 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:flex
        `}
      >
        {/* Sidebar content */}
        <div className="mt-12 sm:mt-0">
          {/* App name (for larger screens only) */}
          <h2 className="hidden sm:block text-2xl font-bold text-sky-400 mb-8">
            Expenso
          </h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 text-sm font-medium ${
                    isActive ? "bg-slate-800 text-sky-400" : "text-slate-300"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom links */}
        <nav className="pt-4 border-t border-slate-700 flex flex-col gap-2">
          <NavLink
            to="/dashboard/account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 text-sm font-medium ${
                isActive ? "bg-slate-800 text-sky-400" : "text-slate-300"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <User />
            My Account
          </NavLink>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-sm font-medium w-full text-left"
          >
            <LogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Background overlay for sidebar (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-6 mt-14 sm:mt-0 sm:ml-64">

        {/* mt-14 ensures space below mobile navbar */}
        <Outlet />
      </main>

      {/* Logout modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCancelLogout}
        >
          <div
            className="bg-slate-900 rounded-md p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-xl mb-4">Confirm Logout</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
