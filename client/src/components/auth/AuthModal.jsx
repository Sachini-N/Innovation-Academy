import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  User,
  Phone,
  Building,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

export default function AuthModal() {
  const {
    authModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    login,
    register,
  } = useAuth();
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    organization: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Prevent background scrolling and support ESC key when modal is open
  useEffect(() => {
    if (!authModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [authModalOpen, closeAuthModal]);

  // Reset errors when mode changes or modal opens
  useEffect(() => {
    setError('');
    setSuccessMsg('');
  }, [authModalMode, authModalOpen]);

  if (!authModalOpen) return null;

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(loginEmail, loginPassword);
      if (res.success) {
        closeAuthModal();
        if (res.user?.role === 'admin') {
          navigate('/admin');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Handle Demo Fill
  const handleDemoFill = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setError('');
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (regData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await register({
        name: regData.name,
        email: regData.email,
        password: regData.password,
        phone: regData.phone,
        organization: regData.organization,
      });

      if (res.success) {
        setSuccessMsg('Account created successfully!');
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop - Blurs the entire homepage/active page */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#cbd5e1] p-6 sm:p-8 shadow-2xl z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          title="Close dialog (Esc)"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {authModalMode === 'login' ? (
          /* ========================================================
             LOGIN MODE
             ======================================================== */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center font-bold text-2xl mx-auto mb-3 shadow-md">
                T
              </div>
              <h2 className="text-2xl font-extrabold text-[#0B192C]">Welcome Back</h2>
              <p className="text-xs text-[#44474c] mt-1">
                Access your TRACE Sri Lanka participant or administrator portal
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@domain.lk"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-1 focus:ring-[#006398] text-sm outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-10 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-1 focus:ring-[#006398] text-sm outline-none bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#006398]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {loading ? <span>Signing In...</span> : <span>Sign In to Account</span>}
              </button>
            </form>

            {/* Quick Demo Credentials Fill */}
            <div className="mt-5 pt-5 border-t border-[#e2e8f0]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#75777d] block text-center mb-2">
                Quick Demo Credentials
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoFill('admin@trace.lk', 'admin123')}
                  className="p-2 rounded-lg bg-[#eaedff] text-[#006398] hover:bg-[#dae2fd] font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('kavindu@eng.mrt.ac.lk', 'user123')}
                  className="p-2 rounded-lg bg-[#f1f5f9] text-[#131b2e] hover:bg-[#e2e8f0] font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Participant</span>
                </button>
              </div>
            </div>

            <div className="mt-5 text-center text-xs text-[#44474c]">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('register')}
                className="font-bold text-[#006398] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
             REGISTER MODE
             ======================================================== */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center font-bold text-2xl mx-auto mb-3 shadow-md">
                T
              </div>
              <h2 className="text-2xl font-extrabold text-[#0B192C]">Create Account</h2>
              <p className="text-xs text-[#44474c] mt-1">
                Join TRACE Sri Lanka innovation programs &amp; masterclasses
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#131b2e] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Fernando"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#cbd5e1] focus:border-[#006398] text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#131b2e] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@domain.lk"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#cbd5e1] focus:border-[#006398] text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#131b2e] mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+94 7X XXX XXXX"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] focus:border-[#006398] text-xs outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#131b2e] mb-1">
                    Organization / Uni
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UoM / Startup"
                    value={regData.organization}
                    onChange={(e) => setRegData({ ...regData, organization: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] focus:border-[#006398] text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#131b2e] mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 chars"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] focus:border-[#006398] text-xs outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#131b2e] mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={regData.confirmPassword}
                    onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] focus:border-[#006398] text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#ba1a1a]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-3 cursor-pointer"
              >
                {loading ? <span>Creating Account...</span> : <span>Create Account</span>}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-[#44474c]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="font-bold text-[#006398] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

