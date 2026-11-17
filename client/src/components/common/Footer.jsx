import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Lightbulb } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B192C] text-white pt-16 pb-8 border-t border-[#1f2d42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#00476e] flex items-center justify-center text-sky-400 shadow-sm border border-white/10">
                <Lightbulb className="w-5 h-5 text-sky-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-tight">
                  TRACE
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  INNOVATION ACADEMY <span className="text-slate-500">| POWERED BY T2T</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#bac7e1] leading-relaxed max-w-md mt-1">
              Inspiring innovation across Sri Lanka. Empowering next-generation innovators to build
              sustainable ventures through deep-tech, venture kitchens, and hands-on industrial entrepreneurship.
            </p>

            {/* Social Icons matching Stitch design */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <span className="text-xs font-bold">𝕏</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
              <a
                href="https://tracesrilanka.lk"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#006398] flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links & Programs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5bb8fe]">
              ACADEMY PROGRAMS
            </h4>
            <ul className="space-y-2 text-xs text-[#bac7e1] mt-1">
              <li>
                <Link to="/programs/program-01" className="hover:text-white transition-colors">
                  Innovation &amp; Design Thinking Masterclass
                </Link>
              </li>
              <li>
                <Link to="/programs/program-02" className="hover:text-white transition-colors">
                  Pre-Incubation Program on Startup Innovation
                </Link>
              </li>
              <li>
                <Link to="/programs/program-01" className="hover:text-white transition-colors">
                  Rapid Prototyping &amp; Maker Space
                </Link>
              </li>
              <li>
                <Link to="/programs/program-02" className="hover:text-white transition-colors">
                  Pitch Readiness &amp; Seed Access
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-white transition-colors">
                  Workshops &amp; Masterclasses
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">
                  Industry Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Location (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5bb8fe]">
              CAMPUS LOCATION
            </h4>
            <div className="space-y-2.5 text-xs text-[#bac7e1] mt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5bb8fe] shrink-0 mt-0.5" />
                <span>
                  <strong>TRACE Expert City</strong>
                  <br />
                  Bay 05, FoodMarket Complex,
                  <br />
                  Maradana, Colombo 10,
                  <br />
                  Sri Lanka.
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#5bb8fe] shrink-0" />
                <a href="tel:+94701510444" className="hover:text-white transition-colors">
                  070 151 0444
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
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 TRACE Sri Lanka (TRACE Innovation Academy). Powered by T2T. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/industry-visits" className="hover:text-white transition-colors">
              Host Industry Visits
            </Link>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
