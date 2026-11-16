import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B192C] text-white pt-16 pb-8 border-t border-[#1f2d42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#006398] flex items-center justify-center text-white font-bold text-xl shadow-md">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-tight">
                  TRACE
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5bb8fe]">
                  INNOVATION ACADEMY | POWERED BY TRACE
                </span>
              </div>
            </div>

            <p className="text-sm text-[#bac7e1] leading-relaxed max-w-md mt-2">
              Catalyzing innovation across Sri Lanka. Empowering next generation tech innovators,
              engineers, and researchers to build sustainable ventures through deep-tech education,
              hands-on maker laboratories, and seed incubation.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">fb</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <span className="text-xs font-bold">𝕏</span>
              </a>
              <a
                href="https://trace.lk"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Web"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links & Programs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5bb8fe]">
              Academy Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-[#bac7e1] mt-1">
              <li>
                <Link
                  to="/programs/program-01"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>Innovation & Design Thinking Masterclass</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/program-02"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>Pre-Incubation Program on Startup Innovation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/industry-visits" className="hover:text-white transition-colors">
                  TRACE Campus Industry Visits & Tours
                </Link>
              </li>
              <li>
                <a href="#workshops" className="hover:text-white transition-colors">
                  Maker Space & Sensor Lab Schedules
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Participant & Founder Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Location (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5bb8fe]">
              Campus Location
            </h4>
            <div className="space-y-3 text-sm text-[#bac7e1] mt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5bb8fe] mt-0.5 shrink-0" />
                <span className="leading-snug">
                  TRACE Expert City, Bay 05, FoodMarket Complex, Maradana, Colombo 10, Sri Lanka.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5bb8fe] shrink-0" />
                <a href="tel:+94701510444" className="hover:text-white transition-colors">
                  +94 70 151 0444
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5bb8fe] shrink-0" />
                <a href="mailto:projects@trace.lk" className="hover:text-white transition-colors">
                  projects@trace.lk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77849c]">
          <p>
            © {new Date().getFullYear()} TRACE Sri Lanka (TRACE Foundation). Academic Programs by
            TRACE Expert City. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#5bb8fe]/80">Org: Innovation | Project: InnovationA</span>
            <Link to="/login" className="hover:text-white transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

