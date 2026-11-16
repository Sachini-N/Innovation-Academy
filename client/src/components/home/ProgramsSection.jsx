import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Rocket, Check, ArrowRight, Award, Zap } from 'lucide-react';

export default function ProgramsSection({ programs = [] }) {
  // Fallback program data matching Stitch design if API is loading
  const prog1 = programs.find((p) => p.slug === 'program-01') || {
    slug: 'program-01',
    badge: 'PROGRAM 01',
    title: 'Innovation & Design Thinking Masterclass',
    description:
      'Design thinking for innovation, 12 steps from ideation to launching real world challenges.',
    highlights: [
      'Design Thinking for Innovation',
      '12 Steps from Ideation to Launching Real World Challenges',
      'Design Sprints and Rapid Prototyping',
      'Idea Pitching and Presentation',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    duration: '1 Month Intensive',
  };

  const prog2 = programs.find((p) => p.slug === 'program-02') || {
    slug: 'program-02',
    badge: 'PROGRAM 02',
    title: 'Pre-Incubation Program on Startup Innovation',
    description:
      'Comprehensive venture formation, seed validation, unit economics, and investment readiness.',
    highlights: [
      'Venture Formation Basics & Pre-Incubation Lifecycle',
      'Innovation Mindset & Founder Journey',
      'Design Thinking & Business Model Canvas',
      'Proof of Concept (PoC) & Rapid Prototyping',
      'Go-To-Market (GTM) Strategy & Unit Economics',
      'Storytelling, Pitch Deck Architecture & Investment Readiness',
      'Final Showcase & Pitch Fest',
      'Pre-Incubation Endorsement & TRACE Affiliation Ceremony',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    duration: '3 Months Cohort Track',
  };

  return (
    <section id="programs" className="py-20 bg-[#faf8ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold uppercase tracking-wider text-[#006398] mb-3">
            STRUCTURED LEARNING PATHS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
            Flagship Innovation Programs
          </h2>
          <p className="text-base text-[#44474c] mt-2">
            Directly aligned with Sri Lanka's growing deep-tech and startup ecosystems.
          </p>
        </div>

        {/* Exactly TWO Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Program 01 Card */}
          <div className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
            {/* Top Navy Gradient Banner with Icon */}
            <div className="relative bg-gradient-to-r from-[#006398] to-[#00476e] p-6 text-white overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-white/20 text-xs font-extrabold uppercase tracking-widest text-[#cce5ff]">
                  PROGRAM 01
                </span>
                <span className="text-xs text-[#cce5ff] font-medium">{prog1.duration}</span>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                  <Brain className="w-7 h-7 text-[#5bb8fe]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {prog1.title}
                  </h3>
                  <span className="text-xs text-[#cce5ff] block mt-1">
                    Design Thinking • Rapid Prototyping • Masterclass
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
              <div>
                <p className="text-sm text-[#44474c] leading-relaxed mb-5">
                  {prog1.shortDescription || prog1.description}
                </p>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#006398] block mb-3">
                    Curriculum Highlights
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#131b2e]">
                    {prog1.highlights?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006398] shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-[#44474c]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#006398]">
                    <Award className="w-4 h-4 text-[#006398]" />
                    TRACE Certificate Awarded
                  </span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Admissions Open
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/programs/${prog1.slug}`}
                    className="py-2.5 px-4 rounded-lg border border-[#cbd5e1] hover:border-[#006398] hover:bg-[#f2f3ff] text-[#0B192C] font-bold text-xs uppercase tracking-wide text-center transition-colors"
                  >
                    Explore Program
                  </Link>
                  <Link
                    to={`/programs/${prog1.slug}#register`}
                    className="py-2.5 px-4 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wide text-center transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <span>Enroll in Masterclass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Program 02 Card */}
          <div className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
            {/* Top Navy Gradient Banner with Icon */}
            <div className="relative bg-gradient-to-r from-[#0B192C] to-[#0e1c2f] p-6 text-white overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 bg-[#5bb8fe]/15 rounded-full blur-xl"></div>
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-[#006398] text-xs font-extrabold uppercase tracking-widest text-white">
                  PROGRAM 02
                </span>
                <span className="text-xs text-[#bac7e1] font-medium">{prog2.duration}</span>
              </div>

              <div className="relative z-10 mt-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                  <Rocket className="w-7 h-7 text-[#5bb8fe]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {prog2.title}
                  </h3>
                  <span className="text-xs text-[#bac7e1] block mt-1">
                    Seed Pipeline • Venture Formation • Bay 05 Labs
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
              <div>
                <p className="text-sm text-[#44474c] leading-relaxed mb-5">
                  {prog2.shortDescription || prog2.description}
                </p>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#006398] block mb-3">
                    Curriculum Highlights
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#131b2e]">
                    {prog2.highlights?.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006398] shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                    <li className="text-xs font-semibold text-[#006398] pl-6 pt-0.5">
                      + 4 more venture readiness modules
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-[#44474c]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#006398]">
                    <Zap className="w-4 h-4 text-[#006398]" />
                    TRACE Pre-Seed Direct Shortlist
                  </span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Bay 05 Incubation
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/programs/${prog2.slug}`}
                    className="py-2.5 px-4 rounded-lg border border-[#cbd5e1] hover:border-[#006398] hover:bg-[#f2f3ff] text-[#0B192C] font-bold text-xs uppercase tracking-wide text-center transition-colors"
                  >
                    Explore Program
                  </Link>
                  <Link
                    to={`/programs/${prog2.slug}#register`}
                    className="py-2.5 px-4 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wide text-center transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <span>Enroll in Pre-Incubation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

