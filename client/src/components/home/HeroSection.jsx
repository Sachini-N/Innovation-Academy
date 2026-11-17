import React, { useState } from 'react';
import { Play, Sparkles, X } from 'lucide-react';

export default function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Hero Visual Container */}
      <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center bg-white">
        {/* Right Side: High-Tech Lab Photo with Engineers & Robotic Arm */}
        <div className="absolute top-0 right-0 w-full lg:w-[68%] h-full overflow-hidden z-0">
          <img
            src="/hero-stitch.jpg"
            alt="TRACE Sri Lanka Engineering & Robotics Hub"
            className="w-full h-full object-cover object-right select-none"
          />
          {/* Subtle bottom gradient on the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none lg:block hidden"></div>
        </div>

        {/* Organic S-Curve Wave SVG Mask (Desktop) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 0 L 375 0 C 320 130 380 230 450 310 C 530 400 600 490 680 600 L 0 600 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Floating TRACE Partner Card (Bottom-Right of Image) */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-xl shadow-2xl border border-slate-100 flex flex-col items-center text-center">
          <div className="bg-[#0B192C] text-white px-3.5 py-1 rounded-md text-[11px] font-black tracking-wider flex items-center gap-1.5 shadow-xs">
            <span>TRACE</span>
            <span className="text-[10px] text-sky-400 font-bold">PARTNER</span>
          </div>
          <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 mt-2">
            PREMIER TECH HUB FROM
          </span>
          <span className="text-xs font-black tracking-widest text-[#e11d48]">
            SRI LANKA
          </span>
        </div>

        {/* Mobile Overlay so text remains crisp and readable */}
        <div className="absolute inset-0 bg-white/92 lg:hidden z-10 pointer-events-none"></div>

        {/* Main Content Area (Left Side) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 py-12 lg:py-20">
          <div className="max-w-xl flex flex-col items-start gap-5">
            {/* Pill Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f1fd] border border-[#d0e2fc] text-[11px] font-extrabold uppercase tracking-wider text-[#006398] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#006398]" />
              <span>TRACE INNOVATION ACADEMY • POWERED BY T2T</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B192C] leading-[1.12] tracking-tight">
                Inspiring Innovation <br />
                <span className="text-[#006398]">Across Sri Lanka</span>
              </h1>
              <p className="text-base sm:text-lg font-bold text-[#006398] pt-1">
                All Certified in Deep-Tech &amp; Startup Innovation
              </p>
            </div>

            {/* Paragraph Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Empowering Creative Minds to Transform Innovative Ideas into Sustainable Business Models
              through hands-on prototyping, human-centered design, and high-growth incubation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-3">
              <a
                href="#programs"
                className="px-6 py-3 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                EXPLORE INNOVATION
              </a>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-[#0B192C] hover:text-[#006398] transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border-2 border-[#e11d48] flex items-center justify-center text-[#e11d48] group-hover:scale-110 transition-transform shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>HOW WE WORK?</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Impact Statistics Ribbon Cards (Directly matching Stitch Design) */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat Card 1 */}
            <div className="bg-[#faf8ff] rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col items-center justify-center text-center hover:border-[#006398]/30 transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#006398] tracking-tight">
                120+
              </span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-1.5">
                TECH VENTURES INCUBATED
              </span>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-[#faf8ff] rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col items-center justify-center text-center hover:border-[#006398]/30 transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#006398] tracking-tight">
                15,000+
              </span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-1.5">
                MINDS EMPOWERED
              </span>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-[#faf8ff] rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col items-center justify-center text-center hover:border-[#006398]/30 transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#006398] tracking-tight">
                50+
              </span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-1.5">
                GLOBAL INDUSTRY MENTORS
              </span>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-[#faf8ff] rounded-xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col items-center justify-center text-center hover:border-[#006398]/30 transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#006398] tracking-tight">
                100%
              </span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-1.5">
                HANDS-ON PROTOTYPING
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Video / Intro Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006398]">
                TRACE EXPERT CITY • MARADANA
              </span>
              <h3 className="text-xl font-bold text-[#0B192C] mt-1">
                How TRACE Innovation Academy Works
              </h3>
            </div>

            <div className="aspect-video rounded-xl bg-slate-900 overflow-hidden relative flex items-center justify-center text-white">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                title="TRACE Sri Lanka Academy Intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Experience the maker spaces, venture studios, and prototype test benches at Bay 05, TRACE Expert City, Maradana.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
