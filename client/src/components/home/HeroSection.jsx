import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Building, Rocket, Users, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#faf8ff] via-[#eaedff]/30 to-[#faf8ff]">
      {/* Subtle background glow effects */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-[#5bb8fe]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 -translate-x-24 w-80 h-80 bg-[#006398]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Key Messaging (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaedff] border border-[#dae2fd] text-xs font-bold uppercase tracking-wider text-[#006398]">
              <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
              <span>TRACE INNOVATION ACADEMY | POWERED BY TRACE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B192C] leading-[1.1] tracking-tight">
                Inspiring Innovation <br />
                <span className="text-[#006398]">Across Sri Lanka</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#006398] pt-1">
                At Our Maradana Deep-Tech &amp; Startup Innovation Hub
              </p>
            </div>

            {/* Subtitle / Paragraph */}
            <p className="text-base sm:text-lg text-[#44474c] leading-relaxed max-w-xl">
              Empowering next-generation innovators across Sri Lanka to build sustainable ventures
              through deep-tech, emerging sciences, venture kitchens, and hands-on industrial entrepreneurship.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#programs"
                className="px-6 py-3.5 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2 shadow-lg shadow-[#006398]/20 transition-all hover:-translate-y-0.5"
              >
                <span>EXPLORE INNOVATION</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="px-5 py-3.5 rounded-lg border border-[#cbd5e1] hover:border-[#0B192C] bg-white text-[#0B192C] font-bold text-sm tracking-wide flex items-center gap-2 transition-all hover:bg-[#f8fafc]"
              >
                <div className="w-6 h-6 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006398]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>WATCH INTRO</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Visual Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0B192C] via-[#0e1c2f] to-[#00174b] p-7 text-white shadow-2xl border border-white/10 overflow-hidden">
              {/* Graphic background curves */}
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#5bb8fe]/20 blur-2xl"></div>
              <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-[#006398]/30 blur-2xl"></div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#006398] flex items-center justify-center font-bold text-lg text-white">
                      T
                    </div>
                    <div>
                      <span className="font-extrabold text-base tracking-tight block">TRACE</span>
                      <span className="text-[10px] uppercase font-bold text-[#5bb8fe] tracking-wider block">
                        EXPERT CITY • MARADANA
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#cce5ff]">
                    National Flagship
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#5bb8fe]">
                    Colombo Deep-Tech Campus
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    Bay 05 High-Tech Precinct &amp; Venture Incubation Grounds
                  </h3>
                  <p className="text-xs text-[#bac7e1] leading-relaxed">
                    Sri Lanka’s premier innovation catalyst fostering collaboration between academia,
                    leading technology firms, and venture builders.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="text-[11px] text-[#bac7e1] block">Active Cohorts</span>
                    <span className="text-lg font-extrabold text-[#5bb8fe]">2 Programs</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="text-[11px] text-[#bac7e1] block">Maker Lab Capacity</span>
                    <span className="text-lg font-extrabold text-[#5bb8fe]">Bay 05 Ready</span>
                  </div>
                </div>

                <Link
                  to="/programs/program-01"
                  className="w-full py-2.5 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Apply for Next Cohort</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Impact Statistics Ribbon */}
        <div className="mt-16 pt-10 border-t border-[#e2e8f0] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0B192C]">120+</span>
            <span className="text-xs uppercase tracking-wider font-bold text-[#44474c] mt-1">
              Deep-Tech Startups Incubated
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#006398]">15,000+</span>
            <span className="text-xs uppercase tracking-wider font-bold text-[#44474c] mt-1">
              Innovators Impacted
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0B192C]">50+</span>
            <span className="text-xs uppercase tracking-wider font-bold text-[#44474c] mt-1">
              Global Tech &amp; VC Partners
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#006398]">100%</span>
            <span className="text-xs uppercase tracking-wider font-bold text-[#44474c] mt-1">
              Sri Lankan Innovation Focus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

