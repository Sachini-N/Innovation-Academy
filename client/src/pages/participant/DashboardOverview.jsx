import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api';
import { handleImageError } from '../../utils/imageUrl';
import {
  School,
  FlaskConical,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Bell,
  Sparkles,
  MapPin,
  Video,
  User,
  PlusCircle,
} from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [data, setData] = useState({
    enrolledPrograms: [],
    availableWorkshops: [],
    upcomingWorkshops: [],
    visitRequests: [],
    notifications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await userService.getParticipantOverview();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.warn('Failed to fetch participant overview:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { enrolledPrograms, availableWorkshops, upcomingWorkshops, notifications } = data;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0B192C] via-[#0e1c2f] to-[#00174b] p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#006398]/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#5bb8fe]">
              TRACE Innovation Academy • Bay 05 Maradana
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-xs sm:text-sm text-[#bac7e1] max-w-xl leading-relaxed">
              You are accessing Sri Lanka’s premier deep-tech innovation workspace. Track your
              program cohorts, unlocked workshop agendas, and maker laboratory schedules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/programs"
              className="px-4 py-2.5 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Explore All Programs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-xs text-[#75777d] uppercase font-bold tracking-wider">
            Enrolled Programs
          </span>
          <div className="text-3xl font-extrabold text-[#0B192C] mt-2">
            {enrolledPrograms.length}
          </div>
          <span className="text-xs text-[#006398] font-semibold mt-1 block">
            {enrolledPrograms.length === 2
              ? 'Full Dual-Track Access'
              : `${enrolledPrograms.length} of 2 Flagship Tracks`}
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-xs text-[#75777d] uppercase font-bold tracking-wider">
            Unlocked Workshops
          </span>
          <div className="text-3xl font-extrabold text-[#006398] mt-2">
            {availableWorkshops.length}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">
            Automatic admission granted
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-xs text-[#75777d] uppercase font-bold tracking-wider">
            Upcoming Sessions
          </span>
          <div className="text-3xl font-extrabold text-[#0B192C] mt-2">
            {upcomingWorkshops.length}
          </div>
          <span className="text-xs text-[#75777d] mt-1 block">Scheduled at Bay 05 / Online</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
          <span className="text-xs text-[#75777d] uppercase font-bold tracking-wider">
            Visit Applications
          </span>
          <div className="text-3xl font-extrabold text-[#0B192C] mt-2">
            {data.visitRequests?.length || 0}
          </div>
          <span className="text-xs text-[#006398] font-semibold mt-1 block">
            Campus tours submitted
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Enrolled Programs & Upcoming Workshops */}
        <div className="lg:col-span-8 space-y-8">
          {/* Enrolled Programs */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006398]"></span>
                <h3 className="text-lg font-bold text-[#0B192C]">My Enrolled Programs</h3>
              </div>
              <Link
                to="/participant/programs"
                className="text-xs font-bold text-[#006398] hover:underline"
              >
                View Details
              </Link>
            </div>

            {enrolledPrograms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledPrograms.map((reg) => (
                  <div
                    key={reg._id}
                    className="p-5 rounded-xl bg-[#faf8ff] border border-[#e2e8f0] flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#eaedff] text-[#006398]">
                          {reg.programSlug?.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {reg.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0B192C] leading-snug">
                        {reg.programTitle}
                      </h4>
                      <span className="text-[11px] text-[#75777d] mt-1 block font-mono">
                        Ref: {reg.referenceNumber}
                      </span>
                    </div>

                    <Link
                      to={`/programs/${reg.programSlug}`}
                      className="w-full py-2 text-center rounded-lg bg-white border border-[#cbd5e1] hover:border-[#006398] text-xs font-bold text-[#0B192C] transition-colors"
                    >
                      View Curriculum
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-[#faf8ff] rounded-xl border border-dashed border-[#cbd5e1]">
                <School className="w-10 h-10 text-[#75777d] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#0B192C]">No Enrolled Programs Yet</h4>
                <p className="text-xs text-[#44474c] mt-1 mb-4">
                  Join one of our two flagship programs to unlock all its workshops.
                </p>
                <Link
                  to="/programs"
                  className="px-4 py-2 rounded-lg bg-[#006398] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>Select a Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Upcoming Workshops */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006398]"></span>
                <h3 className="text-lg font-bold text-[#0B192C]">Upcoming Program Workshops</h3>
              </div>
              <Link
                to="/participant/workshops"
                className="text-xs font-bold text-[#006398] hover:underline"
              >
                View All Unlocked ({availableWorkshops.length})
              </Link>
            </div>

            {upcomingWorkshops.length > 0 ? (
              <div className="space-y-3">
                {upcomingWorkshops.slice(0, 3).map((w) => (
                  <div
                    key={w._id}
                    className="p-4 rounded-xl bg-[#faf8ff] border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {w.coverImage && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                          <img
                            src={w.coverImage}
                            alt={w.title}
                            className="w-full h-full object-contain"
                            onError={handleImageError}
                          />
                        </div>
                      )}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#dae2fd] text-[#00476e] truncate max-w-[160px]">
                            {w.programTitle}
                          </span>
                          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            Unlocked
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0B192C] truncate">{w.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#75777d]">
                          <span className="flex items-center gap-1 text-[#131b2e] font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#006398]" />
                            {w.date} {w.startTime ? `(${w.startTime})` : ''}
                          </span>
                          {w.speakerName && (
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              {w.speakerName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/programs/${w.programSlug}/workshops/${w.slug}`}
                      className="py-2 px-3 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider shrink-0 self-start sm:self-auto text-center"
                    >
                      Session Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-[#75777d]">
                {enrolledPrograms.length === 0
                  ? 'Enroll in a program to unlock scheduled workshops.'
                  : 'No upcoming sessions scheduled right now.'}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Recent Notifications & Campus Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Notifications */}
          <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0B192C] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#006398]" />
                <span>Recent Notifications</span>
              </h3>
              <Link
                to="/participant/notifications"
                className="text-xs text-[#006398] hover:underline font-semibold"
              >
                All
              </Link>
            </div>

            <div className="space-y-3">
              {notifications && notifications.length > 0 ? (
                notifications.slice(0, 4).map((n) => (
                  <div
                    key={n._id}
                    className="p-3 rounded-xl bg-[#faf8ff] border border-[#e2e8f0] text-xs space-y-1"
                  >
                    <div className="font-bold text-[#0B192C]">{n.title}</div>
                    <p className="text-[#44474c] leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-[#75777d] block pt-1">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#75777d]">
                  No new notifications.
                </div>
              )}
            </div>
          </div>

          {/* Bay 05 Campus Hours */}
          <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00476e] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#006398]" />
              <span>Bay 05 Maker Space Access</span>
            </h4>
            <p className="text-xs text-[#44474c] leading-relaxed">
              Open <strong>08:30 AM – 09:00 PM</strong> for enrolled cohort participants. Bring your
              digital registration reference number or student ID at entry gate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
