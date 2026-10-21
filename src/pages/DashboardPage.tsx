import React, { useState } from 'react';
import {
  Users,
  Eye,
  Clock,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Play,
  Film,
  Zap,
  ChevronRight,
  Disc3,
  ExternalLink,
} from 'lucide-react';
import { ChannelStats, YouTubeVideo, MusicReleaseProject } from '../types';
import { NavSection } from '../components/layout/Sidebar';

interface DashboardPageProps {
  stats: ChannelStats;
  videos: YouTubeVideo[];
  upcomingProjects: MusicReleaseProject[];
  onNavigate: (section: NavSection) => void;
  onAuditVideo: (video: YouTubeVideo) => void;
  isDemoMode: boolean;
  onTriggerWorkflow: (workflowCode: 'A' | 'B' | 'C' | 'D' | 'E') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stats,
  videos,
  upcomingProjects,
  onNavigate,
  onAuditVideo,
  isDemoMode,
  onTriggerWorkflow,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '28d' | '90d' | '365d'>('28d');

  // Filter videos needing attention vs top performers
  const needsAuditVideos = videos.filter(
    (v) => v.optimizationStatus === 'needs_review' || v.optimizationStatus === 'critical_revision'
  );
  const topVideos = [...videos].sort((a, b) => b.viewCount - a.viewCount);
  const topShorts = videos.filter((v) => v.videoType === 'short');

  return (
    <div className="space-y-6">
      {/* Welcome & Top Channel Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-l from-blue-900/20 via-indigo-900/10 to-transparent border border-blue-500/20 glass-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={stats.avatarUrl}
                alt="Saeid Parvaneh Avatar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              />
              <span className="absolute -bottom-1 -left-1 px-1.5 py-0.5 rounded-md bg-blue-600 text-[10px] font-bold text-white uppercase font-en">
                Artist
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">سعید پروانه</h2>
                <span className="font-en text-sm text-slate-400 font-semibold">
                  ({stats.handle})
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  کانال رسمی هنرمند
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                مرکز فرماندهی، رشد ارگانیک، بهینه‌سازی الگوریتم یوتیوب و انتشار قطعات اختصاصی دیپ هاوس و الکترونیک
              </p>
            </div>
          </div>

          {/* Quick Workflow Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onTriggerWorkflow('A')}
              className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Zap size={14} className="text-blue-400" />
              <span>ممیزی ویدیوی برنگشتی</span>
            </button>
            <button
              onClick={() => onTriggerWorkflow('B')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span>عنوان و دیسکریپشن آهنگ جدید</span>
            </button>
            <button
              onClick={() => onTriggerWorkflow('E')}
              className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Disc3 size={14} className="text-purple-400" />
              <span>برنامه انتشار قطعه جدید</span>
            </button>
          </div>
        </div>

        {/* Diagnostic / Period Filters */}
        <div className="mt-4 pt-3 border-t border-white/6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>دوره تحلیل آمار:</span>
            <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/8">
              {(['7d', '28d', '90d', '365d'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {period === '7d'
                    ? '۷ روز اخیر'
                    : period === '28d'
                    ? '۲۸ روز اخیر'
                    : period === '90d'
                    ? '۹۰ روز اخیر'
                    : '۱ سال گذشته'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>تاریخ بروزرسانی داده‌ها:</span>
            <span className="font-mono-code text-slate-300">
              {new Date(stats.lastSync).toLocaleDateString('fa-IR')} - ۱۰:۰۰
            </span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> زنده
            </span>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Cards (Zero-pill discipline with typographic separators) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">مشترکین کانال</span>
            <Users size={16} className="text-blue-400" />
          </div>
          <div className="text-xl font-black text-white font-mono-code">
            {stats.subscriberCount.toLocaleString('fa-IR')}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+۱,۲۴۰ در ۲۸ روز</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">بازدید کل دوره</span>
            <Eye size={16} className="text-indigo-400" />
          </div>
          <div className="text-xl font-black text-white font-mono-code">
            {stats.periodViews.toLocaleString('fa-IR')}
          </div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+۱۸٪ رشد ماهانه</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">زمان تماشا (ساعت)</span>
            <Clock size={16} className="text-purple-400" />
          </div>
          <div className="text-xl font-black text-white font-mono-code">
            {stats.periodWatchTime.toLocaleString('fa-IR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            میانگین: <span className="font-mono-code">{stats.avgDuration}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">نمایش در فید (Impressions)</span>
            <Zap size={16} className="text-amber-400" />
          </div>
          <div className="text-xl font-black text-white font-mono-code">
            {(stats.periodImpressions / 1000).toFixed(0)}K
          </div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+۲۴٪ نمایش شورتس</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">نرخ کلیک (CTR)</span>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white font-mono-code">
            ٪{stats.periodCtr.toFixed(1)}
          </div>
          <div className="mt-1 text-[11px] text-amber-400">
            پتانسیل ارتقا به ۷.۵٪
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">مجموع ویدیوها</span>
            <Film size={16} className="text-sky-400" />
          </div>
          <div className="text-xl font-black text-white font-mono-code">
            {stats.videoCount}
          </div>
          <div className="mt-1 text-[11px] text-blue-400">
            ۵ ترک نیازمند بازبینی
          </div>
        </div>
      </div>

      {/* PRIORITY ACTION LIST: مهمترین اقدامات پیشنهادی امروز */}
      <div className="p-5 rounded-2xl bg-[#0E1320] border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                مهم‌ترین اقدامات پیشنهادی امروز (SPM AI Priority Engine)
              </h3>
              <p className="text-xs text-slate-400">
                اقدامات اولویت‌بندی شده بر مبنای داده‌های تحلیلی واقعی و الگوریتم‌های جاری یوتیوب
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('audit')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 group"
          >
            <span>بررسی همه فرصت‌های رشد</span>
            <ChevronRight size={14} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Action 1 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:border-blue-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <AlertCircle size={14} /> اولویت فوری • متادیتا
                </span>
                <span className="text-slate-400 text-[11px]">مربوط به قطعه: برنگشتی (Bargardi)</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                ۱. به‌روزرسانی عنوان و دیسکریپشن ویدیوی «برنگشتی» به فرمت استاندارد دو زبانه
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                <strong>چرا:</strong> این ویدیو بالاترین سهم بازدید ارگانیک را دارد ولی به دلیل نبود کلمات کلیدی "Persian Deep House" و "Official Music Video" در عنوان، سهم ساجستد آن متوقف شده است.
              </p>
              <div className="mt-2 text-[11px] text-slate-400 bg-black/30 p-2 rounded-lg border border-white/5 space-y-1">
                <div><strong>شواهد:</strong> نرخ CTR این قطعه ۵.۸٪ است که با تایتل بهینه پتانسیل جهش به بالای ۷.۲٪ را دارد.</div>
                <div><strong>روش سنجش:</strong> پایش رشد Impressions در استودیو به مدت ۱۴ روز پس از انتشار عنوان جدید.</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
              <button
                onClick={() => {
                  const v = videos.find((item) => item.id === 'spm_vid_01') || videos[0];
                  onAuditVideo(v);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>شروع بهینه‌سازی این ویدیو</span>
                <ArrowUpRight size={13} />
              </button>
              <span className="text-[11px] text-slate-400">زمان تخمینی: ۳ دقیقه</span>
            </div>
          </div>

          {/* Action 2 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Film size={14} /> اولویت بالا • شورتس
                </span>
                <span className="text-slate-400 text-[11px]">ارتباط مستقیم شورتس و ویدیو</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">
                ۲. اتصال شورت تیزر ترک جدید به موزیک ویدیوی کامل با قابلیت Related Video
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                <strong>چرا:</strong> شورتس قطعه دلم تنگ شده بیش از ۹۲,۰۰۰ بازدید جذب کرده اما کمتر از ۳٪ این مخاطبان به موزیک ویدیوی کامل هدایت شده‌اند چون لینک دهی داخلی یوتیوب فعال نشده است.
              </p>
              <div className="mt-2 text-[11px] text-slate-400 bg-black/30 p-2 rounded-lg border border-white/5 space-y-1">
                <div><strong>شواهد:</strong> بروزرسانی آگوست ۲۰۲۶ یوتیوب امکان کلیک مستقیم در شورتس را به صفحه اصلی قطعه باز کرده است.</div>
                <div><strong>روش سنجش:</strong> بررسی متریک "Related Video Traffic" در گزارش ترافیک ورودی یوتیوب آنالیتیکس.</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
              <button
                onClick={() => onNavigate('shorts')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>تنظیم کمپین شورتس</span>
                <ArrowUpRight size={13} />
              </button>
              <span className="text-[11px] text-slate-400">افزایش واچ‌تایم ارگانیک</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Video Inventory Status & Upcoming Music Release */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Videos Requiring Attention */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">
                ویدیوهای دارای فرصت بهبود (نیاز به بازبینی و احیا)
              </h3>
              <p className="text-xs text-slate-400">
                ترک‌هایی که با تغییر متادیتا یا تامنیل قابلیت بازگشت به فید یوتیوب را دارند
              </p>
            </div>
            <button
              onClick={() => onNavigate('audit')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              مشاهده آرشیو کامل
            </button>
          </div>

          <div className="space-y-2.5">
            {needsAuditVideos.map((video) => (
              <div
                key={video.id}
                className="p-3 rounded-xl bg-[#0F1422] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-24 h-14 rounded-lg overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 font-mono-code text-[9px] text-white">
                      {video.duration}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>{video.viewCount.toLocaleString('fa-IR')} بازدید</span>
                      <span aria-hidden="true">·</span>
                      <span>CTR: ٪{video.ctr || '۴.۲'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-code text-slate-400">
                        {new Date(video.publishedAt).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      video.optimizationStatus === 'critical_revision'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    امتیاز: {video.qualityScore || 50}/۱۰۰
                  </span>

                  <button
                    onClick={() => onAuditVideo(video)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>آنالیز و اصلاح</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Upcoming Release & Studio Workspace */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">پروژه انتشار بعدی موزیک</h3>
            <button
              onClick={() => onNavigate('new_release')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              ایجاد پروژه جدید
            </button>
          </div>

          {upcomingProjects.length > 0 ? (
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#131929] to-[#0D111A] border border-blue-500/30 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-blue-400 font-bold uppercase font-en tracking-wider">
                    UPCOMING RELEASE
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    متادیتا آماده
                  </span>
                </div>

                <h4 className="text-lg font-black text-white">
                  {upcomingProjects[0].titleFa}
                  <span className="font-en text-sm text-slate-400 font-semibold mr-2">
                    ({upcomingProjects[0].titleEn})
                  </span>
                </h4>

                <div className="mt-2 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">ژانر:</span>
                    <span className="font-semibold text-slate-200">
                      {upcomingProjects[0].mainGenre} ({upcomingProjects[0].subGenre})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">تاریخ برنامه‌ریزی:</span>
                    <span className="font-mono-code text-blue-300 font-medium">
                      {upcomingProjects[0].plannedReleaseDate} (پنج‌شنبه ۱۹:۳۰)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">فرمت ویدیو:</span>
                    <span className="text-slate-200">موزیک ویدیو رسمی + ۴ شورتس</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('new_release')}
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>مدیریت کارزار انتشار آهنگ</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-[#0F1422] border border-white/8 text-center text-xs text-slate-400">
              پروژه فعالی ثبت نشده است.
            </div>
          )}

          {/* Quick Best Release Timing Tip */}
          <div className="p-3.5 rounded-xl bg-[#0F1422] border border-white/8 text-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-bold mb-1">
              <Calendar size={14} />
              <span>زمان پیشنهادی انتشار هفته:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              بر اساس سوابق گوش دادن مخاطبان ایرانی و اروپایی، <strong>پنج‌شنبه شب ساعت ۱۹:۳۰</strong> بالاترین شانس ورود به پیشنهادات آخر هفته را رقم می‌زند.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
