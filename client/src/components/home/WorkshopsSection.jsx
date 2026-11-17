import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Video, MapPin, Sparkles } from 'lucide-react';

const ALL_FALLBACK_WORKSHOPS = [
  {
    _id: 'w1',
    title: 'Design Thinking & Grand Challenges',
    slug: 'design-thinking-and-grand-challenges',
    programSlug: 'program-01',
    programTitle: 'PROGRAM 01',
    badgeExtra: '3 WEEKS',
    description:
      'Learn the full user interview framework to identify underserved engagement trends in emerging market and deep-tech sectors.',
    date: 'Sat, May 24, 10:00 AM',
    status: 'Upcoming',
    isOnline: false,
    venue: 'TRACE Auditorium A, Bay 05, Maradana',
  },
  {
    _id: 'w2',
    title: 'User Empathy & Problem Validation Sprint',
    slug: 'user-empathy-and-problem-validation',
    programSlug: 'program-01',
    programTitle: 'PROGRAM 01',
    badgeExtra: 'Sprint 2',
    description:
      'Hands-on field synthesis workshop. Translate live feedback from industry partners into structured customer journey maps.',
    date: 'Sat, May 31, 10:00 AM',
    status: 'Upcoming',
    isOnline: false,
    venue: 'Maker Space Studio 2, Bay 05',
  },
  {
    _id: 'w3',
    title: 'Idea Pitching & Storytelling Masterclass',
    slug: 'idea-pitching-and-storytelling',
    programSlug: 'program-01',
    programTitle: 'PROGRAM 01',
    badgeExtra: 'Online',
    description:
      'Interactive pitching clinic. Master narrative arcs, concise 3-minute executive summaries, and slide composition.',
    date: 'Sat, June 07, 02:00 PM',
    status: 'Upcoming',
    isOnline: true,
    venue: 'Online Virtual Studio',
  },
  {
    _id: 'w4',
    title: 'Rapid Prototyping & Proof of Concept (PoC)',
    slug: 'rapid-prototyping-and-proof-of-concept',
    programSlug: 'program-02',
    programTitle: 'PROGRAM 02',
    badgeExtra: 'Ongoing',
    description:
      'Move from wireframe/PCB to physical functional prototype with early debugging tools and operational testing in TRACE Hardware Labs.',
    date: 'Wed, May 28, 09:30 AM',
    status: 'Ongoing',
    isOnline: false,
    venue: 'Robotics & Sensor Lab, Bay 05',
  },
  {
    _id: 'w5',
    title: 'Go-To-Market (GTM) & Unit Economics',
    slug: 'go-to-market-gtm-strategy-unit-economics',
    programSlug: 'program-02',
    programTitle: 'PROGRAM 02',
    badgeExtra: 'Online/Hybrid',
    description:
      'Solve the customer profitability equation for early-stage B2B ventures and formulate initial sales manipulation strategies.',
    date: 'Mon, June 02, 05:30 PM',
    status: 'Upcoming',
    isOnline: false,
    venue: 'Executive Boardroom, Bay 05',
  },
  {
    _id: 'w6',
    title: 'Pitch Deck Architecture & Investment Readiness',
    slug: 'pitch-deck-architecture-investment-readiness',
    programSlug: 'program-02',
    programTitle: 'PROGRAM 02',
    badgeExtra: 'Cap Track',
    description:
      'Deconstruct institutional seed decks. Formulate defensible valuation caps, cap tables, and executive demo day pitch delivery.',
    date: 'Fri, June 13, 04:00 PM',
    status: 'Upcoming',
    isOnline: false,
    venue: 'TRACE Auditorium B, Bay 05',
  },
];

export default function WorkshopsSection({ workshops = [] }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const sourceWorkshops =
    workshops && workshops.length > 0 ? workshops : ALL_FALLBACK_WORKSHOPS;

  const filteredWorkshops = sourceWorkshops.filter((w) => {
    if (selectedFilter === 'program-01') {
      return (
        w.programSlug === 'program-01' ||
        w.programTitle?.includes('Design Thinking') ||
        w.programTitle === 'PROGRAM 01'
      );
    }
    if (selectedFilter === 'program-02') {
      return (
        w.programSlug === 'program-02' ||
        w.programTitle?.includes('Pre-Incubation') ||
        w.programTitle === 'PROGRAM 02'
      );
    }
    return true;
  });

  return (
    <section id="workshops" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#e8f1fd] text-xs font-extrabold uppercase tracking-wider text-[#006398] mb-3">
              WEEKLY ACTIVITY HUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Upcoming Innovation Workshops
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right">
              Interactive hands-on sessions designed to complement academic knowledge with industrial technology skills.
            </p>
            <Link
              to="/workshops"
              className="text-xs font-bold text-[#006398] hover:text-[#0284c7] inline-flex items-center gap-1 transition-colors group"
            >
              <span>Explore All {sourceWorkshops.length} Workshops Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#006398] text-white shadow-sm'
                : 'bg-[#faf8ff] text-slate-600 border border-slate-200 hover:border-[#006398]'
            }`}
          >
            All Workshops ({sourceWorkshops.length})
          </button>
          <button
            onClick={() => setSelectedFilter('program-01')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'program-01'
                ? 'bg-[#006398] text-white shadow-sm'
                : 'bg-[#faf8ff] text-slate-600 border border-slate-200 hover:border-[#006398]'
            }`}
          >
            Program 01: Design Thinking (
            {
              sourceWorkshops.filter(
                (w) =>
                  w.programSlug === 'program-01' ||
                  w.programTitle?.includes('Design Thinking') ||
                  w.programTitle === 'PROGRAM 01'
              ).length
            }
            )
          </button>
          <button
            onClick={() => setSelectedFilter('program-02')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'program-02'
                ? 'bg-[#006398] text-white shadow-sm'
                : 'bg-[#faf8ff] text-slate-600 border border-slate-200 hover:border-[#006398]'
            }`}
          >
            Program 02: Pre-Incubation (
            {
              sourceWorkshops.filter(
                (w) =>
                  w.programSlug === 'program-02' ||
                  w.programTitle?.includes('Pre-Incubation') ||
                  w.programTitle === 'PROGRAM 02'
              ).length
            }
            )
          </button>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((w, idx) => {
            const isProg1 =
              w.programSlug === 'program-01' ||
              w.programTitle?.includes('Design Thinking') ||
              w.programTitle === 'PROGRAM 01';
            return (
              <div
                key={w._id || idx}
                className="rounded-2xl bg-[#faf8ff] border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-200 group"
              >
                <div>
                  {/* Header: Parent Program Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        isProg1
                          ? 'bg-[#dbeafe] text-[#00476e]'
                          : 'bg-[#e2e8f0] text-[#0B192C]'
                      }`}
                    >
                      {isProg1 ? 'PROGRAM 01' : 'PROGRAM 02'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {w.isOnline ? (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                          <Video className="w-3 h-3" />
                          Online
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <MapPin className="w-3 h-3" />
                          Bay 05
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600">
                        {w.badgeExtra || w.status}
                      </span>
                    </div>
                  </div>

                  {/* Workshop Title */}
                  <Link
                    to={`/programs/${w.programSlug || (isProg1 ? 'program-01' : 'program-02')}/workshops/${w.slug}`}
                    className="block"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-[#0B192C] group-hover:text-[#006398] transition-colors leading-snug line-clamp-2 mt-2">
                      {w.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mt-2.5 line-clamp-3">
                    {w.description}
                  </p>
                </div>

                {/* Bottom Footer: Date & Details Button */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate max-w-[65%]">
                    <Calendar className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    <span className="truncate">{w.date}</span>
                  </div>

                  <Link
                    to={`/programs/${w.programSlug || (isProg1 ? 'program-01' : 'program-02')}/workshops/${w.slug}`}
                    className="text-xs font-bold text-[#006398] hover:text-[#0284c7] transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Showing all {filteredWorkshops.length} workshops across TRACE academic innovation tracks.
          </p>
          <Link
            to="/workshops"
            className="px-5 py-2.5 rounded-xl bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <span>Open Dedicated Workshops Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
