import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { workshopService } from '../services/api';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  Lock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowLeft,
  BookOpen,
  Info,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function WorkshopDetailPage() {
  const { programSlug, workshopSlug } = useParams();
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [workshop, setWorkshop] = useState(null);
  const [access, setAccess] = useState({ hasAccess: false, status: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkshop = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await workshopService.getWorkshopBySlug(workshopSlug);
        if (res.success && res.data) {
          setWorkshop(res.data);
          setAccess(res.access || { hasAccess: false });
        } else {
          setError('Workshop not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load workshop details');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [workshopSlug, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf8ff]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-semibold text-[#44474c]">Loading Workshop Agenda...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !workshop) {
    return (
      <div className="min-h-screen flex flex-col bg-[#faf8ff]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-md">
            <AlertCircle className="w-12 h-12 text-[#ba1a1a] mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-[#0B192C]">Workshop Not Found</h2>
            <p className="text-sm text-[#44474c] mt-2 mb-6">
              The requested workshop could not be located in this program.
            </p>
            <Link
              to={`/programs/${programSlug || 'program-01'}`}
              className="px-6 py-2.5 rounded-lg bg-[#006398] text-white font-bold text-sm"
            >
              Back to Program
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasAccess = access?.hasAccess || isAdmin;
  const isOnline = workshop.isOnline;
  const isCompleted = workshop.status === 'Completed';

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff]">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-xs text-[#75777d]">
            <Link to="/" className="hover:text-[#006398]">Home</Link>
            <span>/</span>
            <Link to={`/programs/${programSlug}`} className="hover:text-[#006398]">
              {workshop.programTitle || 'Parent Program'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#131b2e] truncate">{workshop.title}</span>
          </div>

          {/* Top Banner Card */}
          <div className="rounded-2xl bg-white border border-[#e2e8f0] p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#eaedff] text-[#006398]">
                {workshop.programTitle || 'TRACE PROGRAM WORKSHOP'}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  workshop.status === 'Ongoing'
                    ? 'bg-amber-100 text-amber-800'
                    : workshop.status === 'Completed'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                Status: {workshop.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B192C] leading-tight">
              {workshop.title}
            </h1>
            <p className="text-sm sm:text-base text-[#44474c] mt-3 leading-relaxed">
              {workshop.description}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#e2e8f0] text-xs sm:text-sm text-[#131b2e]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006398] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#75777d] block">
                    Session Date
                  </span>
                  <span className="font-bold">{workshop.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006398] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#75777d] block">
                    Timing
                  </span>
                  <span className="font-bold">
                    {workshop.startTime} – {workshop.endTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006398] flex items-center justify-center shrink-0">
                  {isOnline ? <Video className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#75777d] block">
                    Format &amp; Venue
                  </span>
                  <span className="font-bold truncate max-w-[180px] block">
                    {isOnline ? 'Online Google Meet' : workshop.venue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* IMPORTANT ACCESS SECTION */}
          <div className="mb-8">
            {hasAccess ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-900 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-emerald-950">
                        Program Access Granted: Unlocked
                      </h3>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        You are enrolled in <strong>{workshop.programTitle}</strong>. You have automatic
                        admission to this session. No separate registration is required.
                      </p>
                    </div>
                  </div>

                  {/* Actions for online vs physical */}
                  {isCompleted ? (
                    <span className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs uppercase self-start sm:self-auto">
                      Session Completed
                    </span>
                  ) : isOnline ? (
                    workshop.meetingLink ? (
                      <a
                        href={workshop.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md self-start sm:self-auto transition-all"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Workshop</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <div className="px-4 py-2 rounded-lg bg-emerald-200/60 text-emerald-900 text-xs font-semibold self-start sm:self-auto">
                        Meeting link will open 15m before start
                      </div>
                    )
                  ) : (
                    <div className="px-4 py-2 rounded-lg bg-emerald-200/60 text-emerald-900 text-xs font-semibold self-start sm:self-auto">
                      Physical Attendance Confirmed • Bay 05 Desk
                    </div>
                  )}
                </div>

                {/* Additional instructions if present */}
                {workshop.additionalInstructions && (
                  <div className="mt-4 pt-4 border-t border-emerald-200 text-xs text-emerald-900">
                    <strong>Joining Instructions:</strong> {workshop.additionalInstructions}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-amber-950 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-amber-950">
                        Enrollment in Parent Program Required
                      </h3>
                      <p className="text-xs text-amber-800 mt-1 max-w-xl">
                        Workshops at TRACE Sri Lanka are accessible exclusively to participants
                        enrolled in their parent program (<strong>{workshop.programTitle}</strong>).
                        There is no separate workshop fee or registration.
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/programs/${programSlug || 'program-01'}#register`}
                    className="px-5 py-2.5 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto shadow-sm transition-all"
                  >
                    Join {workshop.programTitle || 'Program'}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Topics & Learning Outcomes (8 cols) */}
            <div className="md:col-span-8 space-y-6">
              {/* Speaker Profile */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#006398] text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {workshop.speakerAvatar ? (
                    <img
                      src={workshop.speakerAvatar}
                      alt={workshop.speakerName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#006398] block">
                    Session Lead &amp; Mentor
                  </span>
                  <h3 className="text-lg font-bold text-[#0B192C]">{workshop.speakerName}</h3>
                  <p className="text-xs text-[#44474c] mt-1 leading-relaxed">
                    {workshop.speakerDescription || 'Senior Architect at TRACE Studio & Industry Lead'}
                  </p>
                </div>
              </div>

              {/* Topics Covered */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <h3 className="text-base font-bold text-[#0B192C] mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#006398]" />
                  <span>Topics Covered in this Workshop</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {workshop.topicsCovered?.map((topic, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-[#faf8ff] border border-[#e2e8f0] text-xs font-medium text-[#131b2e] flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <h3 className="text-base font-bold text-[#0B192C] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006398]" />
                  <span>Expected Learning Outcomes</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#44474c]">
                  {workshop.learningOutcomes?.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#006398] mt-2 shrink-0"></div>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Venue & Guidelines (4 cols) */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <h3 className="text-sm uppercase font-extrabold tracking-wider text-[#006398] mb-3">
                  Venue &amp; Logistics
                </h3>
                <div className="space-y-3 text-xs text-[#44474c]">
                  <div>
                    <span className="font-bold text-[#131b2e] block">Location:</span>
                    <span>{workshop.venue}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e] block">Session Capacity:</span>
                    <span>{workshop.capacity || 50} Cohort Members</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#131b2e] block">Equipment / Tools:</span>
                    <span>Hardware benches &amp; prototype kits provided at Bay 05.</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]">
                <h4 className="text-xs font-bold text-[#00476e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#006398]" />
                  <span>Important Access Policy</span>
                </h4>
                <p className="text-xs text-[#44474c] leading-relaxed">
                  Participants enrolled in Program 01 access all Program 01 workshops. Participants
                  enrolled in Program 02 access all Program 02 workshops. No individual tickets are sold.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

