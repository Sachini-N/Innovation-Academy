import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export default function WorkshopsSection({ workshops = [] }) {
  const displayWorkshops = workshops.length > 0 ? workshops.slice(0, 3) : [
    {
      title: 'Design Thinking & Grand Challenges',
      slug: 'design-thinking-and-grand-challenges',
      programSlug: 'program-01',
      programTitle: 'PROGRAM 01',
      badgeExtra: '3 WEEKS',
      description:
        'Learn the full user interview framework to identify underserved engagement trends in emerging market and deep-tech sectors.',
      date: 'Sat, May 24, 10:00 AM',
      status: 'Upcoming',
    },
    {
      title: 'Rapid Prototyping & Proof of Concept (PoC)',
      slug: 'rapid-prototyping-and-proof-of-concept',
      programSlug: 'program-02',
      programTitle: 'PROGRAM 02',
      badgeExtra: 'Ongoing',
      description:
        'Move from wireframe/PCB to physical functional prototype with early debugging tools and operational testing.',
      date: 'Wed, May 28, 09:30 AM',
      status: 'Ongoing',
    },
    {
      title: 'Go-To-Market (GTM) & Unit Economics',
      slug: 'go-to-market-gtm-strategy-unit-economics',
      programSlug: 'program-02',
      programTitle: 'PROGRAM 02',
      badgeExtra: 'Online',
      description:
        'Solve the customer profitability equation for early-stage B2B ventures and formulate initial sales manipulation strategies.',
      date: 'Mon, June 02, 05:30 PM',
      status: 'Upcoming',
    },
  ];

  return (
    <section id="workshops" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#e8f1fd] text-xs font-extrabold uppercase tracking-wider text-[#006398] mb-3">
              WEEKLY ACTIVITY HUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Upcoming Innovation Workshops
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right">
            Interactive hands-on sessions designed to complement academic knowledge with industrial technology skills.
          </p>
        </div>

        {/* 3 Workshop Cards Grid matching Stitch Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayWorkshops.map((w, idx) => (
            <div
              key={w._id || idx}
              className="rounded-2xl bg-[#faf8ff] border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-200 group"
            >
              <div>
                {/* Header: Parent Program Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#dbeafe] text-[#00476e]">
                    {w.programSlug === 'program-01' ? 'PROGRAM 01' : 'PROGRAM 02'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600">
                    {w.badgeExtra || w.status}
                  </span>
                </div>

                {/* Workshop Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#0B192C] group-hover:text-[#006398] transition-colors leading-snug line-clamp-2 mt-2">
                  {w.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mt-2.5 line-clamp-3">
                  {w.description}
                </p>
              </div>

              {/* Bottom Footer: Date & Details Button */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#006398]" />
                  <span>{w.date}</span>
                </div>

                <Link
                  to={`/programs/${w.programSlug || 'program-01'}/workshops/${w.slug}`}
                  className="text-xs font-bold text-[#006398] hover:text-[#0284c7] transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
