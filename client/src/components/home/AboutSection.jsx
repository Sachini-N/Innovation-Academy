import React from 'react';
import { Target, Compass, CheckCircle2, Building, ShieldCheck, Cpu } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white border-y border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold uppercase tracking-wider text-[#006398] w-fit">
              ABOUT TRACE SRI LANKA
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight leading-tight">
              Building Connections. <br />
              <span className="text-[#006398]">Empowering Innovation.</span>
            </h2>

            <p className="text-base text-[#44474c] leading-relaxed">
              TRACE (<strong>Technologically Re-Awakening Culture of Excellence</strong>) was founded
              to position Sri Lanka on high-value technology and innovative products. Located in
              Maradana's historic TRACE Expert City, we foster deep collaboration between academia,
              research sectors, ambitious technologists, and venture capital.
            </p>

            {/* Key Concept Callout Box */}
            <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#dae2fd] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#006398] text-white flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#006398]">
                  Key Concept: Sri Lanka's Flagship Technology Precinct
                </span>
                <p className="text-xs sm:text-sm text-[#131b2e] font-medium mt-0.5">
                  Cultivating ecosystem for enduring innovation, talent retainment, and high-growth ventures.
                </p>
              </div>
            </div>

            {/* Vision and Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Vision */}
              <div className="p-5 rounded-xl bg-[#faf8ff] border border-[#e2e8f0] flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#006398]/10 text-[#006398] flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-[#0B192C]">Our Vision</h3>
                <p className="text-xs sm:text-sm text-[#44474c] leading-relaxed">
                  To transform Sri Lanka into a globally recognized innovation hub through tech ventures
                  and high-impact invention.
                </p>
              </div>

              {/* Mission */}
              <div className="p-5 rounded-xl bg-[#faf8ff] border border-[#e2e8f0] flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#006398]/10 text-[#006398] flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-[#0B192C]">Our Mission</h3>
                <p className="text-xs sm:text-sm text-[#44474c] leading-relaxed">
                  To empower individuals through hands-on deep-tech education, resources, and sustainable
                  commercial incubation models.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Expert City Overview Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#006398] text-white p-7 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#cce5ff]">
                    Campuses &amp; Infrastructure
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-bold">
                    Bay 05, Maradana
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white">TRACE Expert City</h3>
                  <p className="text-xs sm:text-sm text-[#cce5ff] mt-2 leading-relaxed">
                    Sri Lanka’s premier high-tech business cluster housing 15,000+ engineers,
                    innovators, venture studios, and high-growth ventures.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5bb8fe] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white">
                      <strong>15-Acre Former Warehouse</strong> converted to Colombo’s crown Tech City
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5bb8fe] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white">
                      <strong>30+ Tech/Deep-Tech ventures</strong>, enterprise labs, and venture capital
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5bb8fe] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white">
                      <strong>Co-working spaces, maker spaces</strong>, hardware benches, and auditoriums
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/10 text-xs text-[#cce5ff] leading-relaxed mt-2">
                  📍 Bay 05, FoodMarket Complex, Maradana, Colombo 10, Sri Lanka.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

