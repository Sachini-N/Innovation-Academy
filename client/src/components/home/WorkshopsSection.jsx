import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Video, MapPin } from 'lucide-react';

export default function WorkshopsSection({ workshops = [] }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Strictly enforce: ONLY display if workshops exist in database. If empty, do not display in frontend.
  if (!workshops || !Array.isArray(workshops) || workshops.length === 0) {
    return null;
  }

  // Dynamically extract program filter tabs from the database workshops
  const programTabs = [];
  const seenSlugs = new Set();

  workshops.forEach((w) => {
    const slug =
      w.programSlug ||
      w.programId?.slug ||
      (w.programTitle
        ? w.programTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : null);
    const title =
      w.programTitle ||
      w.programId?.title ||
      w.programId?.badge ||
      'Program Track';

    if (slug && !seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      programTabs.push({ slug, title });
    }
  });

  const filteredWorkshops = workshops.filter((w) => {
    if (selectedFilter === 'all') return true;
    const pSlug = w.programSlug || w.programId?.slug;
    return pSlug === selectedFilter;
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
              <span>Explore All {workshops.length} Workshops Catalog</span>
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
            All Workshops ({workshops.length})
          </button>

          {programTabs.map((tab) => {
            const count = workshops.filter((w) => {
              const pSlug = w.programSlug || w.programId?.slug;
              return pSlug === tab.slug;
            }).length;

            return (
              <button
                key={tab.slug}
                onClick={() => setSelectedFilter(tab.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === tab.slug
                    ? 'bg-[#006398] text-white shadow-sm'
                    : 'bg-[#faf8ff] text-slate-600 border border-slate-200 hover:border-[#006398]'
                }`}
              >
                {tab.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((w, idx) => {
            const pSlug = w.programSlug || w.programId?.slug || 'program-01';
            const pTitle =
              w.programTitle ||
              w.programId?.badge ||
              w.programId?.title ||
              'PROGRAM SESSION';

            return (
              <div
                key={w._id || idx}
                className="rounded-2xl bg-[#faf8ff] border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#cbd5e1] transition-all duration-200 group"
              >
                <div>
                  {/* Header: Parent Program Badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#dbeafe] text-[#00476e]">
                      {pTitle}
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
                          {w.venue ? w.venue.split(',')[0] : 'Bay 05'}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-600">
                        {w.badgeExtra || w.status || 'Upcoming'}
                      </span>
                    </div>
                  </div>

                  {/* Workshop Title */}
                  <Link
                    to={`/programs/${pSlug}/workshops/${w.slug || w._id}`}
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
                    <span className="truncate">
                      {w.date}
                      {w.startTime ? ` • ${w.startTime}` : ''}
                    </span>
                  </div>

                  <Link
                    to={`/programs/${pSlug}/workshops/${w.slug || w._id}`}
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
