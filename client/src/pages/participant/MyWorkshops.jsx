import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/api';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Filter,
} from 'lucide-react';

export default function MyWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await userService.getParticipantOverview();
        if (res.success && res.data) {
          setWorkshops(res.data.availableWorkshops || []);
          setEnrolledPrograms(res.data.enrolledPrograms || []);
        }
      } catch (err) {
        console.warn('Failed to load participant workshops:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const filteredWorkshops = workshops.filter((w) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Online') return w.isOnline;
    if (selectedFilter === 'Physical') return !w.isOnline;
    if (selectedFilter === 'Upcoming') return w.status === 'Upcoming';
    if (selectedFilter === 'Completed') return w.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B192C]">My Unlocked Workshops</h2>
          <p className="text-xs sm:text-sm text-[#44474c] mt-1">
            Automatic admission granted via your approved program registrations. No individual
            tickets or separate registration required.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Upcoming', 'Online', 'Physical', 'Completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-[#006398] text-white shadow-xs'
                  : 'bg-white border border-[#cbd5e1] text-[#44474c] hover:bg-[#eaedff]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Info notice about automatic access */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Showing all <strong>{workshops.length}</strong> workshops associated with your enrolled
            programs ({enrolledPrograms.map((p) => p.programSlug?.toUpperCase()).join(', ')}).
            Any new workshop scheduled by TRACE administrators appears here automatically.
          </span>
        </div>
      </div>

      {filteredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((w) => {
            const isOnline = w.isOnline;
            const isCompleted = w.status === 'Completed';
            const isOngoing = w.status === 'Ongoing';

            return (
              <div
                key={w._id}
                className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#dae2fd] text-[#00476e] truncate max-w-[180px]">
                      {w.programTitle}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOngoing
                          ? 'bg-amber-100 text-amber-800'
                          : isCompleted
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#0B192C] group-hover:text-[#006398] transition-colors leading-snug line-clamp-2">
                    {w.title}
                  </h3>

                  <p className="text-xs text-[#44474c] mt-2 line-clamp-3 leading-relaxed">
                    {w.description}
                  </p>

                  {/* Metadata */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-[#e2e8f0] text-xs text-[#44474c]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                      <span className="font-semibold text-[#131b2e]">{w.date}</span>
                      <span className="text-[#75777d]">({w.startTime} – {w.endTime})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isOnline ? (
                        <Video className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                      )}
                      <span className="truncate">{isOnline ? 'Online Google Meet' : w.venue}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                      <span className="truncate font-medium text-[#131b2e]">{w.speakerName}</span>
                    </div>
                  </div>

                  {/* Physical joining notes if available */}
                  {!isOnline && w.additionalInstructions && (
                    <div className="mt-3 p-2.5 rounded-lg bg-[#faf8ff] border border-[#e2e8f0] text-[11px] text-[#44474c]">
                      <strong>Note:</strong> {w.additionalInstructions}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-[#e2e8f0] flex items-center gap-2">
                  <Link
                    to={`/programs/${w.programSlug}/workshops/${w.slug}`}
                    className="flex-1 py-2 rounded-lg border border-[#cbd5e1] hover:border-[#006398] text-[#0B192C] font-bold text-xs uppercase tracking-wider text-center transition-colors"
                  >
                    View Details
                  </Link>

                  {isCompleted ? (
                    <span className="px-3 py-2 rounded-lg bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider text-center cursor-default">
                      Completed
                    </span>
                  ) : isOnline && w.meetingLink ? (
                    <a
                      href={w.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-sm transition-colors shrink-0"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join</span>
                    </a>
                  ) : (
                    <span className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs tracking-wider text-center">
                      Physical
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center max-w-xl mx-auto shadow-sm">
          <AlertCircle className="w-12 h-12 text-[#75777d] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0B192C]">No Workshops Found</h3>
          <p className="text-xs text-[#44474c] mt-1.5 mb-6">
            {enrolledPrograms.length === 0
              ? 'You have not enrolled in any program yet. Once you join Program 01 or Program 02, workshops appear here automatically.'
              : 'No workshops match the selected filter.'}
          </p>
          {enrolledPrograms.length === 0 && (
            <Link
              to="/programs"
              className="px-6 py-2.5 rounded-lg bg-[#006398] text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Browse Programs
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

