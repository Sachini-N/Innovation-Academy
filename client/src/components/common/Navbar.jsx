import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  ChevronDown,
  BookOpen,
  Calendar,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#e2e8f0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Lockup */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#006398] flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:bg-[#0284c7] transition-colors">
              T
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-[#0B192C]">TRACE</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#e2e7ff] text-[#006398]">
                  Sri Lanka
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#44474c]">
                INNOVATION ACADEMY | POWERED BY TRACE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-[14px] font-semibold transition-colors ${
                location.pathname === '/' ? 'text-[#006398]' : 'text-[#131b2e] hover:text-[#006398]'
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => handleNavClick('#about')}
              className="text-[14px] font-semibold text-[#44474c] hover:text-[#006398] transition-colors"
            >
              About TRACE
            </button>
            <Link
              to="/programs"
              className={`text-[14px] font-semibold transition-colors ${
                location.pathname.startsWith('/programs') ? 'text-[#006398]' : 'text-[#44474c] hover:text-[#006398]'
              }`}
            >
              Programs
            </Link>
            <Link
              to="/workshops"
              className={`text-[14px] font-semibold transition-colors ${
                location.pathname === '/workshops' ? 'text-[#006398]' : 'text-[#44474c] hover:text-[#006398]'
              }`}
            >
              Workshops
            </Link>
            <button
              onClick={() => handleNavClick('#contact')}
              className="text-[14px] font-semibold text-[#44474c] hover:text-[#006398] transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Buttons / User Profile */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                {/* Profile Pill Trigger Button */}
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-full border border-slate-200 hover:border-[#006398] bg-white hover:bg-slate-50 transition-all shadow-sm group cursor-pointer"
                  aria-expanded={profileMenuOpen}
                >
                  {/* Avatar Circle */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#006398] to-[#0284c7] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span>
                        {user?.name
                          ? user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()
                          : 'U'}
                      </span>
                    )}
                  </div>

                  {/* Name & Role Text */}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#0B192C] group-hover:text-[#006398] transition-colors max-w-[140px] truncate leading-tight">
                      {user?.name || 'My Profile'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-none">
                      {isAdmin ? 'Administrator' : 'Participant'}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#006398] transition-transform duration-200 ${
                      profileMenuOpen ? 'rotate-180 text-[#006398]' : ''
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#e2e8f0] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-[#faf8ff] rounded-t-2xl">
                      <p className="text-xs font-bold text-[#0B192C] truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.email}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#dbeafe] text-[#00476e]">
                        {isAdmin ? 'TRACE Admin' : 'TRACE Participant'}
                      </span>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eaedff] hover:text-[#006398] transition-colors"
                        >
                          <Shield className="w-4 h-4 text-[#006398]" />
                          <span>Admin Operations Portal</span>
                        </Link>
                      )}

                      <Link
                        to={isAdmin ? '/admin/settings' : '/participant/profile'}
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eaedff] hover:text-[#006398] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#006398]" />
                        <span>My Profile &amp; Account</span>
                      </Link>

                      {!isAdmin && (
                        <>
                          <Link
                            to="/participant/programs"
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eaedff] hover:text-[#006398] transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-[#006398]" />
                            <span>My Enrolled Programs</span>
                          </Link>
                          <Link
                            to="/participant/workshops"
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eaedff] hover:text-[#006398] transition-colors"
                          >
                            <Calendar className="w-4 h-4 text-[#006398]" />
                            <span>My Workshops</span>
                          </Link>
                        </>
                      )}
                    </div>

                    {/* Sign Out Action */}
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#ba1a1a]" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#0B192C] hover:text-[#006398] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white text-sm font-bold tracking-wide transition-all shadow-sm shadow-[#ba1a1a]/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#131b2e] hover:bg-[#eaedff] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#cbd5e1] bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-[#131b2e] hover:bg-[#eaedff]"
          >
            Home
          </Link>
          <button
            onClick={() => handleNavClick('#about')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-[#44474c] hover:bg-[#eaedff]"
          >
            About TRACE
          </button>
          <Link
            to="/programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-[#44474c] hover:bg-[#eaedff]"
          >
            Programs
          </Link>
          <Link
            to="/workshops"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-[#44474c] hover:bg-[#eaedff]"
          >
            Workshops
          </Link>
          <button
            onClick={() => handleNavClick('#contact')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-[#44474c] hover:bg-[#eaedff]"
          >
            Contact Us
          </button>

          <div className="pt-4 border-t border-[#e2e8f0] flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* Profile Identity Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf8ff] border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#006398] to-[#0284c7] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {user?.name
                      ? user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()
                      : 'U'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#0B192C] truncate">{user?.name}</span>
                    <span className="text-xs text-slate-500 truncate">{user?.email}</span>
                    <span className="text-[10px] font-bold text-[#006398] uppercase tracking-wider">
                      {isAdmin ? 'Admin' : 'Participant'}
                    </span>
                  </div>
                </div>

                {/* Profile Links */}
                <div className="space-y-1">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-[#eaedff] rounded-lg"
                    >
                      <Shield className="w-4 h-4 text-[#006398]" />
                      <span>Admin Operations Portal</span>
                    </Link>
                  )}

                  <Link
                    to={isAdmin ? '/admin/settings' : '/participant/profile'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-[#eaedff] rounded-lg"
                  >
                    <User className="w-4 h-4 text-[#006398]" />
                    <span>My Profile &amp; Settings</span>
                  </Link>

                  {!isAdmin && (
                    <>
                      <Link
                        to="/participant/programs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-[#eaedff] rounded-lg"
                      >
                        <BookOpen className="w-4 h-4 text-[#006398]" />
                        <span>My Enrolled Programs</span>
                      </Link>
                      <Link
                        to="/participant/workshops"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-[#eaedff] rounded-lg"
                      >
                        <Calendar className="w-4 h-4 text-[#006398]" />
                        <span>My Workshops</span>
                      </Link>
                    </>
                  )}
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#ba1a1a] hover:bg-red-50 rounded-lg text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center font-semibold text-[#0B192C] bg-[#eaedff] rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center font-bold text-white bg-[#ba1a1a] rounded-lg shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

