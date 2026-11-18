import React, { useState, useEffect } from 'react';
import { visitService } from '../../services/api';
import { toast } from '../../context/ToastContext';
import {
  Download,
  Building2,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Edit,
  X,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function AdminVisitRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingRequest, setEditingRequest] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await visitService.getAllVisitRequests(params);
      if (res.success) setRequests(res.data);
    } catch (err) {
      console.warn('Failed to load visit requests:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (req) => {
    setEditingRequest({ ...req });
  };

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await visitService.updateVisitStatus(editingRequest._id, {
        status: editingRequest.status,
        adminNotes: editingRequest.adminNotes,
        allocatedHost: editingRequest.allocatedHost,
        preferredVisitDate: editingRequest.preferredVisitDate,
        preferredTime: editingRequest.preferredTime,
      });

      if (res.success) {
        toast.success(`Visit request #${editingRequest.referenceNumber} updated to ${editingRequest.status}`);
        setEditingRequest(null);
        fetchRequests();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update visit request');
    }
  };

  const handleExportCSV = () => {
    const rows = [
      [
        'Reference No',
        'Organization',
        'Type',
        'Contact Person',
        'Email',
        'Phone',
        'Participants',
        'Age Group',
        'Visit Date',
        'Time Slot',
        'Status',
        'Notes',
      ],
      ...requests.map((r) => [
        r.referenceNumber,
        r.organizationName,
        r.organizationType,
        r.contactPerson,
        r.email,
        r.phone,
        r.numberOfParticipants,
        r.participantAgeGroup,
        r.preferredVisitDate,
        r.preferredTime,
        r.status,
        r.adminNotes || '',
      ]),
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'trace_sri_lanka_industry_visits.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <h2 className="text-2xl font-bold text-[#0B192C]">Industry Visit Applications</h2>
          <p className="text-xs sm:text-sm text-[#44474c] mt-1">
            Review delegation requests from universities, schools, and enterprise partners for TRACE
            Bay 05 tours.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Visits (CSV)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'Pending', 'Approved', 'Confirmed', 'Completed', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors whitespace-nowrap ${
              statusFilter === status
                ? 'bg-[#006398] text-white shadow-xs'
                : 'bg-white border border-[#cbd5e1] text-[#44474c] hover:bg-[#eaedff]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#f2f3ff] text-[#44474c] font-bold uppercase tracking-wider border-b border-[#e2e8f0]">
                <th className="py-3.5 px-4">Ref &amp; Organization</th>
                <th className="py-3.5 px-3">Contact Person</th>
                <th className="py-3.5 px-3">Visit Schedule</th>
                <th className="py-3.5 px-3">Delegation Size</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f2f3ff] text-[#131b2e]">
              {requests.length > 0 ? (
                requests.map((r) => (
                  <tr key={r._id} className="hover:bg-[#faf8ff] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[11px] font-bold text-[#006398] block">
                        #{r.referenceNumber}
                      </span>
                      <span className="font-bold text-[#0B192C]">{r.organizationName}</span>
                      <span className="text-[11px] text-[#75777d] block">{r.organizationType}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-[#131b2e] block">{r.contactPerson}</span>
                      <span className="text-[11px] text-[#75777d]">{r.email}</span>
                      <span className="text-[10px] text-[#75777d] block">{r.phone}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 font-bold text-[#131b2e]">
                        <Calendar className="w-3.5 h-3.5 text-[#006398]" />
                        <span>{r.preferredVisitDate}</span>
                      </div>
                      <span className="text-[11px] text-[#75777d] block">{r.preferredTime}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#0B192C]">
                        {r.numberOfParticipants} Pax
                      </span>
                      <span className="text-[11px] text-[#75777d] block">
                        {r.participantAgeGroup}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#006398] hover:bg-[#dae2fd] font-bold text-xs transition-colors"
                      >
                        Triage &amp; Confirm
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-xs text-[#75777d]">
                    No visit requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Confirm Schedule Modal */}
      {editingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
              <h3 className="text-base font-bold text-[#0B192C]">
                Triage Visit #{editingRequest.referenceNumber}
              </h3>
              <button
                onClick={() => setEditingRequest(null)}
                className="p-1 rounded-lg text-[#75777d] hover:bg-[#f2f3ff]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-[#faf8ff] rounded-xl space-y-1 text-xs text-[#131b2e]">
              <div>
                <strong>Organization:</strong> {editingRequest.organizationName} (
                {editingRequest.organizationType})
              </div>
              <div>
                <strong>Contact:</strong> {editingRequest.contactPerson} ({editingRequest.email},{' '}
                {editingRequest.phone})
              </div>
              <div>
                <strong>Delegation:</strong> {editingRequest.numberOfParticipants} Pax (
                {editingRequest.participantAgeGroup})
              </div>
              <div>
                <strong>Purpose:</strong> {editingRequest.visitPurpose}
              </div>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Status Decision
                </label>
                <select
                  value={editingRequest.status}
                  onChange={(e) =>
                    setEditingRequest({ ...editingRequest, status: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none bg-white font-bold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Confirmed Visit Date
                  </label>
                  <input
                    type="date"
                    value={editingRequest.preferredVisitDate}
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        preferredVisitDate: e.target.value,
                      })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Confirmed Time Slot
                  </label>
                  <input
                    type="text"
                    value={editingRequest.preferredTime}
                    onChange={(e) =>
                      setEditingRequest({
                        ...editingRequest,
                        preferredTime: e.target.value,
                      })
                    }
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Allocated Host / Secretariat Team
                </label>
                <input
                  type="text"
                  value={editingRequest.allocatedHost || ''}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      allocatedHost: e.target.value,
                    })
                  }
                  placeholder="e.g. Dilshan Perera & Bay 05 Secretariat"
                  className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Administrative / Schedule Notes
                </label>
                <textarea
                  rows={2}
                  value={editingRequest.adminNotes || ''}
                  onChange={(e) =>
                    setEditingRequest({
                      ...editingRequest,
                      adminNotes: e.target.value,
                    })
                  }
                  placeholder="Auditorium A reserved, bus parking instructions..."
                  className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-xs outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-xs font-bold text-[#131b2e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Decision</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

