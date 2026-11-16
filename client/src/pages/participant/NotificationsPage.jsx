import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/api';
import { Bell, CheckCircle2, Info, AlertTriangle, ArrowRight } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await userService.getNotifications();
        if (res.success) {
          setNotifications(res.data);
        }
      } catch (err) {
        console.warn('Failed to fetch notifications:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await userService.markNotificationRead(id);
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.warn('Failed to mark read:', err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return <Info className="w-5 h-5 text-[#006398]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0B192C]">System Notifications</h2>
        <p className="text-xs sm:text-sm text-[#44474c] mt-1">
          Announcements, cohort milestones, and workshop reminders from TRACE Secretariat.
        </p>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                n.read
                  ? 'bg-white border-[#e2e8f0]'
                  : 'bg-[#faf8ff] border-[#006398]/30 shadow-xs ring-1 ring-[#006398]/10'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5">{getIcon(n.type)}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0B192C]">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#006398]"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#44474c] leading-relaxed max-w-2xl">{n.message}</p>
                  <span className="text-[10px] text-[#75777d] block pt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {n.link && (
                  <Link
                    to={n.link}
                    className="p-2 rounded-lg bg-[#eaedff] text-[#006398] hover:bg-[#dae2fd] text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {!n.read && (
                  <button
                    onClick={() => handleMarkRead(n._id)}
                    className="text-[11px] font-semibold text-[#75777d] hover:text-[#006398] px-2 py-1"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-12 text-center shadow-sm">
          <Bell className="w-12 h-12 text-[#75777d] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0B192C]">No Notifications Yet</h3>
          <p className="text-xs text-[#44474c] mt-1">
            You're all caught up! New reminders will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

