import React, { useState, useEffect } from 'react';
import { userService } from '../../services/api';
import { Users, Search, Mail, Phone, Building, CheckCircle2, Award } from 'lucide-react';

export default function AdminParticipants() {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const res = await userService.getParticipants();
        if (res.success) {
          setParticipants(res.data);
        }
      } catch (err) {
        console.warn('Failed to load participants:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  const filtered = participants.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.organization?.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B192C]">Participants &amp; Innovators Roster</h2>
          <p className="text-xs sm:text-sm text-[#44474c] mt-1">
            Registered students, founders, and engineers inside the TRACE Sri Lanka network.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search participant by name, email, university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none"
          />
        </div>
        <span className="text-xs font-bold text-[#75777d]">
          Total Candidates: {participants.length}
        </span>
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006398] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {p.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B192C]">{p.name}</h3>
                  <span className="text-[11px] text-[#75777d]">{p.email}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#44474c] pt-2 border-t border-[#e2e8f0]">
                {p.organization && (
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    <span className="truncate">{p.organization}</span>
                  </div>
                )}
                {p.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                    <span>{p.phone}</span>
                  </div>
                )}
              </div>

              {/* Enrolled programs list */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#75777d] block mb-1">
                  Enrolled Tracks ({p.enrolledCount || 0}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {p.registrations?.map((r, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#eaedff] text-[#006398]"
                    >
                      {r.programTitle?.includes('Masterclass')
                        ? 'Masterclass'
                        : 'Pre-Incubation'}
                    </span>
                  ))}
                  {(!p.registrations || p.registrations.length === 0) && (
                    <span className="text-[11px] text-[#75777d] italic">None enrolled yet</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#75777d]">
              <span>Joined: {new Date(p.createdAt).toLocaleDateString()}</span>
              <span className="font-semibold text-emerald-700">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

