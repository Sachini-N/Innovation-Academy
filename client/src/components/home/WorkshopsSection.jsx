import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, ArrowRight, Video } from 'lucide-react';

export default function WorkshopsSection({ workshops = [] }) {
  // If no workshops passed yet, provide fallback cards matching Stitch design
  const displayWorkshops = workshops.length > 0 ? workshops.slice(0, 3) : [
    {
      title: 'Design Thinking & Grand Challenges',
      slug: 'design-thinking-and-grand-challenges',
      programSlug: 'program-01',
      programTitle: 'Innovation & Design Thinking Masterclass',
      description:
        'Learn the full user interview framework to identify underserved engagement trends in emerging market and deep-tech sectors.',
      date: 'Sat, May 24, 2025',
      startTime: '09:30 AM',
      venue: 'TRACE Auditorium A, Maradana',
      speakerName: 'Eng. Dimuthu Perera',
      status: 'Upcoming',
      isOnline: false,
    },
    {
      title: 'Rapid Prototyping & Proof of Concept (PoC)',
      slug: 'rapid-prototyping-and-proof-of-concept',
      programSlug: 'program-02',
      programTitle: 'Pre-Incubation Program on Startup Innovation',
      description:
        'Move from wireframe/PCB to physical functional prototype with early debugging tools and operational testing.',
      date: 'Wed, May 28, 2025',
      startTime: '10:00 AM',
      venue: 'Robotics & Sensor Lab, Bay 05',
      speakerName: 'Dr. Anura Fernando',
      status: 'Ongoing',
      isOnline: false,
    },
    {
      title: 'Go-To-Market (GTM) Strategy & Unit Economics',
      slug: 'go-to-market-gtm-strategy-unit-economics',
      programSlug: 'program-02',
      programTitle: 'Pre-Incubation Program on Startup Innovation',
      description:
        'Solve the customer profitability equation for early-stage B2B ventures and formulate initial sales manipulation strategies.',
      date: 'Mon, June 02, 2025',
      startTime: '05:30 PM',
      venue: 'Executive Boardroom, TRACE City',
      speakerName: 'Kasthula Jayasuriya',
      status: 'Upcoming',
      isOnline: false,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-[#eaedff] text-[#006398] border-[#dae2fd]';
    }
  };

  return (
    <section id="workshops" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold uppercase tracking-wider text-[#006398] mb-3">
              WEEKLY ACTIVITY HUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight">
              Upcoming Innovation Workshops
            </h2>
            <p className="text-sm text-[#44474c] mt-2 max-w-xl">
              Interactive hands-on sessions designed to complement academic knowledge with industrial technology skills.
            </p>
          </div>

          <Link
            to="/programs"
            className="text-xs sm:text-sm font-bold text-[#006398] hover:text-[#0284c7] flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All Program Workshops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Selected Workshops Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayWorkshops.map((w, idx) => (
            <div
              key={w._id || idx}
              className="rounded-xl bg-[#faf8ff] border border-[#e2e8f0] p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-200 group"
            >
              <div>
                {/* Header: Parent Program Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#dae2fd] text-[#00476e] truncate max-w-[190px]">
                    {w.programTitle || (w.programSlug === 'program-01' ? 'Program 01 Workshop' : 'Program 02 Workshop')}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadge(
                      w.status
                    )}`}
                  >
                    {w.status || 'Upcoming'}
                  </span>
                </div>

                {/* Workshop Title */}
                <h3 className="text-lg font-bold text-[#0B192C] group-hover:text-[#006398] transition-colors leading-snug line-clamp-2">
                  {w.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#44474c] leading-relaxed mt-2.5 line-clamp-3">
                  {w.description}
                </p>

                {/* Metadata List */}
                <div className="mt-5 space-y-2 pt-4 border-t border-[#e2e8f0] text-xs text-[#44474c]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    <span className="font-medium text-[#131b2e]">{w.date}</span>
                    {w.startTime && <span className="text-[#75777d]">({w.startTime})</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    {w.isOnline ? (
                      <Video className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    )}
                    <span className="truncate">{w.venue || 'TRACE Expert City, Bay 05'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    <span className="truncate font-medium text-[#131b2e]">{w.speakerName}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3">
                <Link
                  to={`/programs/${w.programSlug || 'program-01'}/workshops/${w.slug}`}
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#006398] text-[#006398] hover:text-white border border-[#cbd5e1] hover:border-[#006398] text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

