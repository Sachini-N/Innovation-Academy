import React from 'react';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Hero Visual Container */}
      <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center bg-white border-b border-slate-100">
        {/* Right Side: Clean AI-Generated High-Tech Lab Photo */}
        <div className="absolute top-0 right-0 w-full lg:w-[68%] h-full overflow-hidden z-0">
          <img
            src="/hero-innovation.jpg"
            alt="TRACE Sri Lanka Innovation Academy"
            className="w-full h-full object-cover object-center select-none"
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

            {/* CTA Button */}
            <div className="pt-3">
              <a
                href="#programs"
                className="inline-block px-7 py-3 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                EXPLORE INNOVATION
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
