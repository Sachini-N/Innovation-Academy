import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  FlaskConical,
  Compass,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Building,
} from 'lucide-react';

export default function ParticipantLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/participant', label: 'Dashboard', icon: 'space_dashboard', end: true },
    { to: '/participant/programs', label: 'My Programs', icon: 'school' },
    { to: '/participant/workshops', label: 'My Workshops', icon: 'biotech' },
    { to: '/participant/visits', label: 'My Visit Requests', icon: 'domain' },
    { to: '/participant/notifications', label: 'Notifications', icon: 'notifications' },
    { to: '/participant/profile', label: 'My Profile', icon: 'person' },
  ];

  return (
    <div className="min-h-screen flex bg-[#faf8ff]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        ></div>
      )}

      {/* Dark Navy Sidebar Matching Stitch Design */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#0e1c2f] text-white z-50 flex flex-col justify-between transition-transform duration-300 shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Lockup */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#006398] flex items-center justify-center font-bold text-white text-base">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white leading-tight">TRACE</span>
                <span className="text-[10px] uppercase font-bold text-[#5bb8fe] tracking-wider">
                  Expert City Sri Lanka
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#77849c] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Portal Badge */}
          <div className="px-4 py-3">
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-[#cce5ff] uppercase tracking-wider">
                PARTICIPANT HUB
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5bb8fe] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006398]"></span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-3 mt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm border border-white/10'
                      : 'text-[#77849c] hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom User Plaque & Logout */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#006398] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{user?.name}</span>
              <span className="text-[11px] text-[#77849c] truncate">{user?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <Link
              to="/"
              className="flex-1 py-1.5 px-2.5 rounded-md bg-white/5 hover:bg-white/10 text-[11px] text-[#bac7e1] font-semibold text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="py-1.5 px-3 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#131b2e] hover:bg-[#eaedff]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-[#0B192C]">
              TRACE Participant Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/participant/notifications"
              className="relative p-2 rounded-lg text-[#44474c] hover:bg-[#eaedff] transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </Link>
            <Link
              to="/participant/profile"
              className="flex items-center gap-2 pl-3 border-l border-[#cbd5e1]"
            >
              <div className="w-8 h-8 rounded-full bg-[#006398] text-white flex items-center justify-center font-bold text-xs">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-xs font-semibold text-[#131b2e] hidden sm:inline">
                {user?.name}
              </span>
            </Link>
          </div>
        </header>

        {/* Nested Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
