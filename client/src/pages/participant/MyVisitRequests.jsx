import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { visitService } from '../../services/api';
import { Building2, Calendar, Clock, Users, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MyVisitRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await visitService.getMyVisitRequests();
        if (res.success) {
          setRequests(res.data);
        }
      } catch (err) {
        console.warn('Failed to load visit requests:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Rejected':
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-[#eaedff] text-[#006398] border-[#dae2fd]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B192C]">My Campus Visit Requests</h2>
          <p className="text-xs sm:text-sm text-[#44474c] mt-1">
            Track industry visit applications and delegation scheduling at TRACE Expert City.
          </p>
        </div>

        <Link
          to="/industry-visits"
          className="px-4 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Visit Request</span>
        </Link>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#f1f5f9] text-[#131b2e]">
                    Ref #{req.referenceNumber}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getStatusBadge(
                      req.status
                    )}`}
                  >
                    {req.status}
                  </span>
                  <span className="text-xs text-[#75777d]">
                    Submitted: {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B192C]">{req.organizationName}</h3>
                <p className="text-xs text-[#44474c] leading-relaxed max-w-3xl">
                  <strong>Purpose:</strong> {req.visitPurpose}
                </p>

                <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-[#44474c]">
                  <div className="flex items-center gap-1.5 font-semibold text-[#131b2e]">
                    <Calendar className="w-4 h-4 text-[#006398]" />
                    <span>Proposed Date: {req.preferredVisitDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#006398]" />
                    <span>Time: {req.preferredTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#006398]" />
                    <span>
                      {req.numberOfParticipants} Participants ({req.participantAgeGroup})
                    </span>
                  </div>
                </div>

                {req.adminNotes && (
                  <div className="p-3 rounded-lg bg-[#faf8ff] border border-[#e2e8f0] text-xs text-[#0B192C] mt-2">
                    <strong>Secretariat Scheduling Notes:</strong> {req.adminNotes}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start lg:items-end justify-center shrink-0">
                <span className="text-[11px] text-[#75777d]">Host Assignment</span>
                <span className="text-xs font-bold text-[#006398] mt-0.5">
                  {req.allocatedHost || 'TRACE Secretariat'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center max-w-xl mx-auto shadow-sm">
          <Building2 className="w-12 h-12 text-[#75777d] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0B192C]">No Visit Requests Submitted</h3>
          <p className="text-xs text-[#44474c] mt-1.5 mb-6">
            If you represent a university faculty, school, or corporate delegation, submit an industry
            visit application to tour TRACE Bay 05 maker spaces.
          </p>
          <Link
            to="/industry-visits"
            className="px-6 py-2.5 rounded-lg bg-[#006398] text-white font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            Submit Visit Request
          </Link>
        </div>
      )}
    </div>
  );
}

