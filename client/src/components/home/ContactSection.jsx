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
      const res = await contactService.submitContact(formData);
      if (res.success) {
        setSuccessMsg(
          'Thank you for reaching out! Your message has been saved in our system. Our incubation team will contact you shortly.'
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
        err.response?.data?.message || 'Failed to submit message. Please try again or email us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#faf8ff] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Connect with TRACE Innovation Academy
          </h2>
          <p className="text-sm text-[#44474c] mt-2">
            Have innovation aspirations, corporate cohorts, or mentorship? Reach out to our program team.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <a
            href="mailto:projects@trace.lk"
            className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md hover:border-[#006398] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#006398] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#75777d]">
              EMAIL
            </span>
            <span className="font-bold text-sm text-[#0B192C] mt-0.5">projects@trace.lk</span>
          </a>

          <a
            href="https://tracesrilanka.org"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md hover:border-[#006398] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#006398] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#75777d]">
              WEBSITE
            </span>
            <span className="font-bold text-sm text-[#0B192C] mt-0.5">www.tracesrilanka.org</span>
          </a>

          <a
            href="tel:+94701510444"
            className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md hover:border-[#006398] transition-all flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#006398] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#75777d]">
              CONTACT NUMBER
            </span>
            <span className="font-bold text-sm text-[#0B192C] mt-0.5">070 151 0444</span>
          </a>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-[#e2e8f0] p-7 sm:p-9 shadow-md">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-[#0B192C]">
              Express Interest in Upcoming Cohorts
            </h3>
            <p className="text-xs text-[#44474c] mt-1">
              Submit your inquiry and our Secretariat will assist you with enrollment.
            </p>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Kavindu Senanayake"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/10 text-sm outline-none transition-all placeholder:text-[#94a3b8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="kavindu@domain.lk"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/10 text-sm outline-none transition-all placeholder:text-[#94a3b8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-1.5">
                Select Program of Interest
              </label>
              <select
                name="programOfInterest"
                value={formData.programOfInterest}
                onChange={handleChange}
                className="w-full h-11 px-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/10 text-sm outline-none transition-all bg-white"
              >
                <option value="Innovation & Design Thinking Masterclass (Cohort 12)">
                  Program 01: Innovation &amp; Design Thinking Masterclass (Cohort 12)
                </option>
                <option value="Pre-Incubation Program on Startup Innovation (Cohort 08)">
                  Program 02: Pre-Incubation Program on Startup Innovation (Cohort 08)
                </option>
                <option value="General Campus Visit / Partnership Inquiry">
                  General Campus Visit / Industry Partnership
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#131b2e] mb-1.5">
                Message / Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Share your innovation background, university/company, or questions about Bay 05 facilities..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3.5 rounded-lg border border-[#cbd5e1] focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/10 text-sm outline-none transition-all placeholder:text-[#94a3b8]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#006398]/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Submitting to TRACE...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Expression of Interest</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

