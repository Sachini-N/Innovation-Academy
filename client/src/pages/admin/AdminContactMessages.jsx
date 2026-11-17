import React, { useState, useEffect } from 'react';
import { contactService } from '../../services/api';
import { Mail, CheckCircle2, Clock, MessageSquare, Save, X, Reply, Trash2 } from 'lucide-react';

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [statusVal, setStatusVal] = useState('Replied');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAllMessages();
      if (res.success) setMessages(res.data);
    } catch (err) {
      console.warn('Failed to load contact messages:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const res = await contactService.deleteMessage(id);
      if (res.success) {
        setActionMsg('Contact message deleted successfully');
        setMessages((prev) => prev.filter((m) => m._id !== id && m.id !== id));
        setDeleteConfirmId(null);
        setTimeout(() => setActionMsg(''), 3000);
      } else {
        alert(res.message || 'Failed to delete message');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete message');
    }
  };

  const handleOpenTriage = (msg) => {
    setSelectedMsg(msg);
    setReplyText(msg.replyNotes || '');
    setStatusVal(msg.status === 'Unread' ? 'Replied' : msg.status);
  };

  const handleSaveTriage = async (e) => {
    e.preventDefault();
    try {
      const res = await contactService.updateMessageStatus(selectedMsg._id, {
        status: statusVal,
        replyNotes: replyText,
      });
      if (res.success) {
        setSelectedMsg(null);
        fetchMessages();
      }
    } catch (err) {
      alert('Failed to update message');
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
      <div>
        <h2 className="text-2xl font-bold text-[#0B192C]">Contact Inquiries &amp; Expressions</h2>
        <p className="text-xs sm:text-sm text-[#44474c] mt-1">
          Messages and cohort interest submitted from the TRACE Sri Lanka homepage.
        </p>
      </div>

      {actionMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionMsg}</span>
          </div>
          <button onClick={() => setActionMsg('')} className="text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div
              key={m._id || m.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 ${
                m.status === 'Unread'
                  ? 'bg-white border-[#006398]/30 shadow-xs ring-1 ring-[#006398]/10'
                  : 'bg-white border-[#e2e8f0]'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      m.status === 'Unread'
                        ? 'bg-red-100 text-red-800'
                        : m.status === 'Replied'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {m.status}
                  </span>
                  <span className="text-xs font-semibold text-[#75777d]">
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-bold text-[#0B192C]">{m.name}</h3>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs text-[#006398] hover:underline"
                  >
                    ({m.email})
                  </a>
                </div>

                {m.programOfInterest && (
                  <div className="text-xs font-semibold text-[#006398] bg-[#eaedff] px-2.5 py-1 rounded-md w-fit">
                    Interest: {m.programOfInterest}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#44474c] leading-relaxed pt-1">
                  "{m.message}"
                </p>

                {m.replyNotes && (
                  <div className="mt-3 p-3 rounded-lg bg-[#faf8ff] border border-[#e2e8f0] text-xs text-[#131b2e]">
                    <strong>Staff Notes:</strong> {m.replyNotes}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => handleOpenTriage(m)}
                  className="px-4 py-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006398] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Triage / Reply</span>
                </button>

                {deleteConfirmId === (m._id || m.id) ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDeleteMessage(m._id || m.id)}
                      className="px-2.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2.5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(m._id || m.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#e2e8f0] text-xs text-[#75777d]">
            No contact messages in inbox.
          </div>
        )}
      </div>

      {/* Triage / Reply Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
              <h3 className="text-base font-bold text-[#0B192C]">
                Inquiry Triage: {selectedMsg.name}
              </h3>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-[#75777d] hover:bg-[#f2f3ff]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl text-xs space-y-1 text-[#131b2e]">
              <div>
                <strong>Email:</strong> {selectedMsg.email}
              </div>
              <div>
                <strong>Inquiry:</strong> {selectedMsg.message}
              </div>
            </div>

            <form onSubmit={handleSaveTriage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">Status</label>
                <select
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#cbd5e1] text-xs outline-none bg-white font-bold"
                >
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Response / Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Record email response dispatched from projects@trace.lk or telephone notes..."
                  className="w-full p-2.5 rounded-lg border border-[#cbd5e1] text-xs outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setSelectedMsg(null)}
                  className="px-4 py-2 rounded-lg bg-[#f1f5f9] text-xs font-bold text-[#131b2e]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

