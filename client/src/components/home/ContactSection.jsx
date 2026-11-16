import React, { useState } from 'react';
import { Mail, Globe, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactService } from '../../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    programOfInterest: 'Innovation & Design Thinking Masterclass (Cohort 12)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await contactService.submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Cohort Expression of Interest',
        programOfInterest: formData.programOfInterest,
        message: formData.message || `Expressed interest in ${formData.programOfInterest}`,
      });
      if (res.success) {
        setSuccessMsg(
          'Thank you for reaching out! Your expression of interest has been saved. Our admissions team will contact you shortly.'
        );
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          programOfInterest: 'Innovation & Design Thinking Masterclass (Cohort 12)',
          message: '',
        });
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Failed to submit expression. Please try again or email us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white via-[#faf8ff] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Connect with TRACE Innovation Academy
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Have innovation aspirations, corporate cohorts, or mentorship? Reach out to our program team.
          </p>
        </div>

        {/* 3 Contact Info Cards matching Google Stitch Design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
          {/* Card 1: Email */}
          <a
            href="mailto:projects@trace.lk"
            className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#006398] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#006398] text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              EMAIL
            </span>
            <span className="font-bold text-sm text-[#0B192C] mt-1">projects@trace.lk</span>
          </a>

          {/* Card 2: Website */}
          <a
            href="https://tracesrilanka.lk"
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#006398] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#006398] text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              WEBSITE
            </span>
            <span className="font-bold text-sm text-[#0B192C] mt-1">www.tracesrilanka.lk</span>
          </a>

          {/* Card 3: Phone */}
          <a
            href="tel:+94701510444"
            className="p-6 rounded-2xl bg-[#faf8ff] border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#006398] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#006398] text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              CONTACT NUMBER
            </span>
            <span className="font-bold text-sm text-[#0B192C] mt-1">070 151 0444</span>
          </a>
        </div>

        {/* Contact Form Card matching Google Stitch Design */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-slate-200/80 p-7 sm:p-9 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-base sm:text-lg font-bold text-[#0B192C]">
              Express Interest in Upcoming Cohorts
            </h3>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  FIRST NAME
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#0B192C] placeholder:text-slate-400 focus:border-[#006398] focus:ring-1 focus:ring-[#006398] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="training@yourdomain.lk"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#0B192C] placeholder:text-slate-400 focus:border-[#006398] focus:ring-1 focus:ring-[#006398] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                SELECT PROGRAM OF INTEREST
              </label>
              <select
                name="programOfInterest"
                value={formData.programOfInterest}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#0B192C] focus:border-[#006398] focus:ring-1 focus:ring-[#006398] outline-none transition-all"
              >
                <option value="Innovation & Design Thinking Masterclass (Cohort 12)">
                  Month: Innovation & Design Thinking Masterclass (Cohort 12)
                </option>
                <option value="Pre-Incubation Program on Startup Innovation (Cohort 08)">
                  Pre-Incubation Program on Startup Innovation (Cohort 08)
                </option>
                <option value="Custom Corporate Innovation Sprint / Partner Workshop">
                  Custom Corporate Innovation Sprint / Partner Workshop
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                MESSAGE (OPTIONAL)
              </label>
              <textarea
                name="message"
                rows="3"
                placeholder="Share your goals or organization background..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-[#0B192C] placeholder:text-slate-400 focus:border-[#006398] focus:ring-1 focus:ring-[#006398] outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Submitting Expression...' : 'Submit Expression of Interest'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
