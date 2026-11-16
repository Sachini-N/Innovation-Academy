import React, { useState, useEffect } from 'react';
import { programService } from '../../services/api';
import { School, Edit, CheckCircle2, AlertCircle, Save, X, Eye } from 'lucide-react';

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await programService.getPrograms();
      if (res.success) setPrograms(res.data);
    } catch (err) {
      console.warn('Failed to load programs:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (prog) => {
    setEditingProgram({ ...prog });
    setSaveSuccess('');
    setSaveError('');
  };

  const handleFieldChange = (e) => {
    setEditingProgram({
      ...editingProgram,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();
    setSaveSuccess('');
    setSaveError('');

    try {
      const res = await programService.updateProgram(
        editingProgram._id,
        editingProgram
      );
      if (res.success) {
        setSaveSuccess('Program information updated successfully!');
        setEditingProgram(null);
        fetchPrograms();
      }
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to save program changes');
    }
  };

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
          <h2 className="text-2xl font-bold text-[#0B192C]">Program Management</h2>
          <p className="text-xs sm:text-sm text-[#44474c] mt-1">
            Configure the two flagship TRACE Innovation Academy curricula, cohorts, and capacities.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Programs List (Exactly TWO Flagship Programs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((prog, idx) => (
          <div
            key={prog._id || idx}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#eaedff] text-[#006398]">
                  {prog.badge || `PROGRAM 0${idx + 1}`}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    prog.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {prog.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#0B192C]">{prog.title}</h3>
              <p className="text-xs text-[#44474c] mt-2 leading-relaxed">{prog.description}</p>

              <div className="grid grid-cols-2 gap-3 my-4 p-3.5 rounded-xl bg-[#faf8ff] border border-[#e2e8f0] text-xs">
                <div>
                  <span className="text-[#75777d] block text-[11px]">Duration:</span>
                  <span className="font-bold text-[#131b2e]">{prog.duration}</span>
                </div>
                <div>
                  <span className="text-[#75777d] block text-[11px]">Active Cohort:</span>
                  <span className="font-bold text-[#006398]">{prog.cohort || 'Cohort Active'}</span>
                </div>
                <div>
                  <span className="text-[#75777d] block text-[11px]">Enrolled Participants:</span>
                  <span className="font-bold text-emerald-700">
                    {prog.registrationCount || 0} Registered
                  </span>
                </div>
                <div>
                  <span className="text-[#75777d] block text-[11px]">Linked Workshops:</span>
                  <span className="font-bold text-[#131b2e]">{prog.workshopCount || 3} Sessions</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between gap-3">
              <span className="text-xs text-[#75777d]">Slug: /{prog.slug}</span>
              <button
                onClick={() => handleEditClick(prog)}
                className="px-4 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Program</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Program Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
              <h3 className="text-lg font-bold text-[#0B192C]">
                Edit Program: {editingProgram.title}
              </h3>
              <button
                onClick={() => setEditingProgram(null)}
                className="p-1 rounded-lg text-[#75777d] hover:bg-[#f2f3ff]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{saveError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Program Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingProgram.title}
                  onChange={handleFieldChange}
                  className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Short Summary / Subtitle
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={editingProgram.shortDescription || ''}
                  onChange={handleFieldChange}
                  className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Full Curriculum Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={editingProgram.description}
                  onChange={handleFieldChange}
                  className="w-full p-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={editingProgram.duration || ''}
                    onChange={handleFieldChange}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Cohort Tag</label>
                  <input
                    type="text"
                    name="cohort"
                    value={editingProgram.cohort || ''}
                    onChange={handleFieldChange}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">Status</label>
                  <select
                    name="status"
                    value={editingProgram.status}
                    onChange={handleFieldChange}
                    className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs focus:border-[#006398] outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-xs font-bold text-[#131b2e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

