import React, { useState } from 'react';
import {
  FileCheck2,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  FileJson,
  FileSpreadsheet,
  FileText,
  Shield,
  Activity,
} from 'lucide-react';
import { ActivityLogItem, ChannelStats, YouTubeVideo, MusicReleaseProject } from '../types';

interface ReportsHistoryPageProps {
  logs: ActivityLogItem[];
  stats: ChannelStats;
  videos: YouTubeVideo[];
  projects: MusicReleaseProject[];
}

export const ReportsHistoryPage: React.FC<ReportsHistoryPageProps> = ({
  logs,
  stats,
  videos,
  projects,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const exportAsJSON = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      channel: {
        title: stats.channelTitle,
        handle: stats.handle,
        subscribers: stats.subscriberCount,
        views: stats.totalViews,
      },
      videos: videos.map((v) => ({
        id: v.id,
        title: v.title,
        views: v.viewCount,
        ctr: v.ctr,
        optimizationStatus: v.optimizationStatus,
      })),
      projects: projects,
      activityLogs: logs,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SPM_YouTube_AI_Report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('JSON');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const exportAsCSV = () => {
    let csvContent = 'Video ID,Title,Views,Likes,Comments,CTR,Optimization Status\n';
    videos.forEach((v) => {
      const cleanTitle = `"${v.title.replace(/"/g, '""')}"`;
      csvContent += `${v.id},${cleanTitle},${v.viewCount},${v.likeCount},${v.commentCount},${v.ctr || 0}%,${v.optimizationStatus}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SPM_Channel_Videos_Audit_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('CSV');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const exportAsTextSummary = () => {
    let txt = `==================================================\n`;
    txt += `گزارش جامع استراتژیک SPM YOUTUBE AI — سعید پروانه\n`;
    txt += `تاریخ تولید گزارش: ${new Date().toLocaleDateString('fa-IR')}\n`;
    txt += `کانال یوتیوب: ${stats.handle} (${stats.channelTitle})\n`;
    txt += `تعداد مشترکین: ${stats.subscriberCount.toLocaleString('fa-IR')}\n`;
    txt += `کل بازدیدها: ${stats.totalViews.toLocaleString('fa-IR')}\n`;
    txt += `==================================================\n\n`;
    txt += `۱. وضعیت بهینه‌سازی ویدیوها:\n`;
    videos.forEach((v, i) => {
      txt += `${i + 1}. ${v.title}\n   بازدید: ${v.viewCount.toLocaleString('fa-IR')} | وضعیت: ${v.optimizationStatus}\n`;
    });
    txt += `\n۲. پروژه‌های در حال انتشار:\n`;
    projects.forEach((p, i) => {
      txt += `${i + 1}. ${p.titleFa} (${p.titleEn}) - تاریخ برنامه‌ریزی: ${p.plannedReleaseDate}\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SPM_Summary_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('TXT');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileCheck2 size={18} />
            </span>
            <h2 className="text-lg font-black text-white">گزارش‌های عملکرد و لاگ امنیتی تاییدات (Reports & History)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            خروجی استاندارد از وضعیت رشد کانال و ویدیوها با فرمت‌های JSON، CSV و گزارش متنی، همراه با ثبت رویدادها و تغییرات تاییدشده
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportAsJSON}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileJson size={14} className="text-blue-400" />
            <span>خروجی JSON</span>
          </button>
          <button
            onClick={exportAsCSV}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>خروجی اکسل (CSV)</span>
          </button>
          <button
            onClick={exportAsTextSummary}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <Download size={14} />
            <span>دانلود خلاصه استراتژیک</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>فایل گزارش {downloadSuccess} با موفقیت در دستگاه شما ذخیره شد.</span>
        </div>
      )}

      {/* Audit Log / History Table */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
        <div className="flex items-center justify-between border-b border-white/6 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity size={16} className="text-blue-400" />
            <span>لاگ فعالیت‌ها و تغییرات ثبت‌شده در سیستم</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono-code">{logs.length} رویداد ثبت‌شده</span>
        </div>

        <div className="space-y-2.5">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-black/40 border border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-200">{log.action}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      log.status === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {log.status === 'success' ? 'انجام شد' : 'در انتظار'}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{log.details}</p>
              </div>

              <div className="font-mono-code text-[10px] text-slate-500 self-end sm:self-center">
                {new Date(log.timestamp).toLocaleTimeString('fa-IR')} -{' '}
                {new Date(log.timestamp).toLocaleDateString('fa-IR')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
