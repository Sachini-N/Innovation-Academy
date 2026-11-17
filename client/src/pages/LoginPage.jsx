import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const returnUrl = location.state?.returnUrl || location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      if (res.success) {
        if (returnUrl) {
          navigate(returnUrl);
        } else if (res.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#cbd5e1] p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#006398] text-white flex items-center justify-center font-bold text-2xl mx-auto mb-3 shadow-md">
                T
              </div>
              <h1 className="text-2xl font-extrabold text-[#0B192C]">Welcome Back</h1>
              <p className="text-xs text-[#44474c] mt-1">
                Access your TRACE Sri Lanka participant or administrator portal
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-1 focus:ring-[#006398] text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-1 focus:ring-[#006398] text-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#006398]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <span>Signing In...</span> : <span>Sign In to Account</span>}
              </button>
            </form>

            {/* Quick Demo Fill Buttons */}
            <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#75777d] block text-center mb-2.5">
                Quick Demo Credentials
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin@trace.lk', 'admin123')}
                  className="p-2 rounded-lg bg-[#eaedff] text-[#006398] hover:bg-[#dae2fd] font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('kavindu@eng.mrt.ac.lk', 'user123')}
                  className="p-2 rounded-lg bg-[#f1f5f9] text-[#131b2e] hover:bg-[#e2e8f0] font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Participant</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-[#44474c]">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-[#006398] hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

