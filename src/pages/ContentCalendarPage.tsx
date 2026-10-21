import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Film,
  Disc3,
  MessageSquare,
  Sparkles,
  Download,
  Filter,
} from 'lucide-react';
import { CalendarEvent } from '../types';

interface ContentCalendarPageProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onUpdateEventStatus: (id: string, status: CalendarEvent['status']) => void;
}

export const ContentCalendarPage: React.FC<ContentCalendarPageProps> = ({
  events,
  onAddEvent,
  onUpdateEventStatus,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    type: 'short_teaser',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    status: 'draft',
    channel: 'youtube_shorts',
    notes: '',
  });

  const handleCreate = () => {
    if (!newEvent.title) return;
    const created: CalendarEvent = {
      id: `cal_${Date.now()}`,
      title: newEvent.title,
      type: newEvent.type as any,
      date: newEvent.date || '',
      time: newEvent.time,
      status: (newEvent.status as any) || 'draft',
      channel: (newEvent.channel as any) || 'youtube_video',
      notes: newEvent.notes,
    };
    onAddEvent(created);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      type: 'short_teaser',
      date: new Date().toISOString().split('T')[0],
      time: '19:30',
      status: 'draft',
      channel: 'youtube_shorts',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <CalendarIcon size={18} />
            </span>
            <h2 className="text-lg font-black text-white">تقویم محتوایی و کارزار انتشار (Content Calendar)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            برنامه‌ریزی دقیق مراحل پیش از انتشار، تیزرهای هفتگی، روز اصلی انتشار، پست‌های کامیونیتی و بازبینی آماری ۴۸ ساعته
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/8 text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              نمای فهرستی
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'timeline' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              تایم‌لاین انتشار
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Plus size={15} />
            <span>ثبت رویداد جدید</span>
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((event) => {
          const isRelease = event.type === 'music_video' || event.type === 'release';
          const isShort = event.type === 'short_teaser' || event.type === 'release_day_short';

          return (
            <div
              key={event.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isRelease
                  ? 'bg-blue-950/20 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'bg-[#0F1422] border-white/6 hover:border-white/15'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl flex-shrink-0 ${
                    isRelease
                      ? 'bg-blue-600 text-white'
                      : isShort
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {isRelease ? <Disc3 size={20} /> : isShort ? <Film size={18} /> : <CalendarIcon size={18} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{event.title}</h4>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        event.status === 'scheduled'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : event.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {event.status === 'scheduled'
                        ? 'برنامه‌ریزی شده'
                        : event.status === 'approved'
                        ? 'تایید شده'
                        : event.status === 'published'
                        ? 'منتشر شده'
                        : 'پیش‌نویس'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {event.notes}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-left font-mono-code text-xs text-slate-300">
                  <div className="font-bold text-blue-400">{event.date}</div>
                  <div className="text-[10px] text-slate-400">{event.time} IRST</div>
                </div>

                <select
                  value={event.status}
                  onChange={(e) => onUpdateEventStatus(event.id, e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="draft">پیش‌نویس</option>
                  <option value="approved">تایید شده</option>
                  <option value="scheduled">زمان‌بندی شده</option>
                  <option value="published">منتشر شده</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1422] border border-white/10 rounded-2xl w-full max-w-md p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">ثبت برنامه محتوایی جدید</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">عنوان رویداد:</label>
                <input
                  type="text"
                  placeholder="مثال: انتشار تیزر شورتس قطعه جدید"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">نوع فعالیت:</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="short_teaser">تیزر شورتس</option>
                    <option value="music_video">موزیک ویدیو رسمی</option>
                    <option value="community_post">پست کامیونیتی</option>
                    <option value="analytics_review">تحلیل آمار</option>
                    <option value="thumbnail_revision">بازبینی تامنیل</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">کانال انتشار:</label>
                  <select
                    value={newEvent.channel}
                    onChange={(e) => setNewEvent({ ...newEvent, channel: e.target.value as any })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="youtube_shorts">YouTube Shorts</option>
                    <option value="youtube_video">YouTube Video</option>
                    <option value="youtube_community">YouTube Community</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">تاریخ:</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">ساعت (IRST):</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">توضیحات و یادداشت:</label>
                <textarea
                  rows={2}
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                انصراف
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              >
                ذخیره رویداد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
