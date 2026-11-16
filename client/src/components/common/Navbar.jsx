import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
              className="text-[14px] font-semibold text-[#131b2e] hover:text-[#006398] transition-colors"
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
              className="text-[14px] font-semibold text-[#44474c] hover:text-[#006398] transition-colors"
            >
              Programs
            </Link>
            <button
              onClick={() => handleNavClick('#workshops')}
              className="text-[14px] font-semibold text-[#44474c] hover:text-[#006398] transition-colors"
            >
              Workshops
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="text-[14px] font-semibold text-[#44474c] hover:text-[#006398] transition-colors"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={isAdmin ? '/admin' : '/participant'}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0e1c2f] text-white hover:bg-[#1f2d42] transition-colors text-sm font-semibold shadow-sm"
                >
                  {isAdmin ? <Shield className="w-4 h-4 text-[#5bb8fe]" /> : <LayoutDashboard className="w-4 h-4 text-[#5bb8fe]" />}
                  <span>{isAdmin ? 'Admin Portal' : 'My Dashboard'}</span>
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-[#cbd5e1]">
                  <span className="text-xs font-medium text-[#44474c] max-w-[120px] truncate">
                    {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-[#75777d] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
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
          <button
            onClick={() => handleNavClick('#workshops')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-[#44474c] hover:bg-[#eaedff]"
          >
            Workshops
          </button>
          <button
            onClick={() => handleNavClick('#contact')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-[#44474c] hover:bg-[#eaedff]"
          >
            Contact Us
          </button>

          <div className="pt-4 border-t border-[#e2e8f0] flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/participant'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-bold rounded-lg bg-[#0e1c2f] text-white"
                >
                  {isAdmin ? 'Admin Portal' : 'My Dashboard'} ({user?.name})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded-lg"
                >
                  Sign Out
                </button>
              </>
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

