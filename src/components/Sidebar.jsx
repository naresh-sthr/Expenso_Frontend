import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart3, DollarSign, LogOut, User } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard /> },
  { name: 'Expenses', path: '/dashboard/expenses', icon: <DollarSign /> },
  { name: 'Income', path: '/dashboard/income', icon: <DollarSign className="rotate-180" /> },
  { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 /> },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`flex h-screen bg-slate-950 text-white ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 h-screen">
        <button onClick={toggleSidebar} className="sm:hidden text-white">
          ☰
        </button>
        <h2 className="text-2xl font-bold text-sky-400 mb-8">Expenso</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 text-sm font-medium ${
                  isActive ? 'bg-slate-800 text-sky-400' : 'text-slate-300'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        <nav className="pt-4 border-t border-slate-700 flex flex-col gap-2">
          <NavLink
            to="/dashboard/account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-slate-800 text-sm font-medium ${
                isActive ? 'bg-slate-800 text-sky-400' : 'text-slate-300'
              }`
            }
          >
            <User />
            My Account
          </NavLink>
          <NavLink
            to="/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 text-sm font-medium"
          >
            <LogOut /> Logout
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
