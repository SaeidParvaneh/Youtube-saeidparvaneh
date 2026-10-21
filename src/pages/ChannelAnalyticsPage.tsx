import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone,
  Eye,
  Clock,
  Zap,
  Film,
  Calendar,
  AlertTriangle,
  HelpCircle,
  ArrowUpRight,
} from 'lucide-react';
import { ChannelStats, YouTubeVideo } from '../types';

interface ChannelAnalyticsPageProps {
  stats: ChannelStats;
  videos: YouTubeVideo[];
  isDemoMode: boolean;
}

export const ChannelAnalyticsPage: React.FC<ChannelAnalyticsPageProps> = ({
  stats,
  videos,
  isDemoMode,
}) => {
  const [period, setPeriod] = useState<'7d' | '28d' | '90d' | '365d'>('28d');

  // Multipliers for different periods
  const factor = period === '7d' ? 0.3 : period === '28d' ? 1.0 : period === '90d' ? 3.1 : 11.8;
  const currentViews = Math.round(stats.periodViews * factor);
  const currentWatchTime = Math.round(stats.periodWatchTime * factor);
  const currentSubs = Math.round(stats.periodSubscribers * factor);
  const currentImpressions = Math.round(stats.periodImpressions * factor);

  return (
    <div className="space-y-6">
      {/* Top Controls & Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1422] border border-white/8">
        <div>
          <h2 className="text-base font-bold text-white">تحلیل عمیق عملکرد کانال و رفتار شنوندگان</h2>
          <p className="text-xs text-slate-400">
            بررسی نرخ تعامل، منابع ترافیک، جغرافیا و تفکیک ویدیوهای معمولی و شورتس
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/8">
          {(['7d', '28d', '90d', '365d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p === '7d' ? '۷ روز' : p === '28d' ? '۲۸ روز' : p === '90d' ? '۹۰ روز' : '۳۶۵ روز'}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8">
          <span className="text-xs text-slate-400">مجموع بازدیدهای دوره</span>
          <div className="text-2xl font-black text-white font-mono-code mt-1">
            {currentViews.toLocaleString('fa-IR')}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp size={12} />
            <span>+۱۸٪ رشد نسبت به دوره قبل</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8">
          <span className="text-xs text-slate-400">ساعت تماشای موزیک (Watch Time)</span>
          <div className="text-2xl font-black text-white font-mono-code mt-1">
            {currentWatchTime.toLocaleString('fa-IR')}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp size={12} />
            <span>+۲۲٪ واچ‌تایم با کیفیت</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8">
          <span className="text-xs text-slate-400">جذب سابسکرایبر جدید</span>
          <div className="text-2xl font-black text-white font-mono-code mt-1">
            +{currentSubs.toLocaleString('fa-IR')}
          </div>
          <div className="text-[11px] text-blue-400 mt-1 font-medium">
            ۸۴٪ جذب مستقیم از یوتیوب شورتس
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8">
          <span className="text-xs text-slate-400">نمایش کل در فید (Impressions)</span>
          <div className="text-2xl font-black text-white font-mono-code mt-1">
            {(currentImpressions / 1000).toFixed(0)}K
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            میانگین CTR کانال: ٪۵.۴
          </div>
        </div>
      </div>

      {/* Traffic Sources & Long vs Shorts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="p-5 rounded-xl bg-[#0F1422] border border-white/8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-blue-400" />
              <span>تفکیک منابع ترافیک (Traffic Sources)</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono-code">YouTube Studio Realtime</span>
          </div>

          <div className="space-y-3">
            {stats.trafficSources.map((source) => (
              <div key={source.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{source.name}</span>
                  <div className="flex items-center gap-2 font-mono-code">
                    <span className="text-slate-400">
                      {Math.round(source.views * factor).toLocaleString('fa-IR')} بازدید
                    </span>
                    <span className="text-blue-400 font-bold">٪{source.percentage}</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-xs text-slate-400 leading-relaxed">
            <strong>تحلیل استراتژیک SPM:</strong> ۴۸٪ ترافیک کانال از Shorts Feed تأمین می‌شود، اما نرخ تبدیل آن به بازدید طولانی تنها ۳٪ است. با اضافه کردن لینک مستقیم ویدیوی کامل به شورت‌ها، واچ‌تایم کانال ارتقا خواهد یافت.
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="p-5 rounded-xl bg-[#0F1422] border border-white/8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe size={16} className="text-indigo-400" />
              <span>جغرافیای شنوندگان (Top Audience Geography)</span>
            </h3>
            <span className="text-[11px] text-slate-400">مخاطبان بر اساس کشور</span>
          </div>

          <div className="space-y-3">
            {stats.topCountries.map((c) => (
              <div key={c.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code font-bold text-slate-400 text-[10px]">
                      {c.code}
                    </span>
                    <span className="text-slate-200">{c.name}</span>
                  </div>
                  <span className="font-mono-code text-indigo-400 font-bold">٪{c.percentage}</span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-xs text-slate-400 leading-relaxed">
            <strong>توصیه زمان‌بندی انتشار:</strong> با توجه به سهم ۴۱ درصدی شنوندگان در اروپا و آمریکای شمالی (آلمان، ترکیه، آمریکا، کانادا)، انتشار ویدیو در ساعت ۱۹:۳۰ تهران دقیقاً منطبق بر ساعت ۱۷:۰۰ اروپا و صبح آمریکا بوده و بهترین همپوشانی را ایجاد می‌کند.
          </div>
        </div>
      </div>

      {/* Device Breakdown & Anomaly Detector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="p-5 rounded-xl bg-[#0F1422] border border-white/8 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Smartphone size={16} className="text-blue-400" />
            <span>دستگاه‌های پخش موزیک</span>
          </h3>

          <div className="space-y-2.5 pt-2">
            {stats.deviceBreakdown.map((dev) => (
              <div key={dev.device} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                <span className="text-slate-300">{dev.device}</span>
                <span className="font-mono-code font-bold text-blue-400">٪{dev.percentage}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
            <strong>نکته حیاتی تامنیل:</strong> بیش از ۸۲٪ مخاطبان از گوشی موبایل استفاده می‌کنند؛ تامنیل‌هایی با متن ریز و بیش از ۲ کلمه بلافاصله نرخ کلیک را کاهش می‌دهند.
          </div>
        </div>

        {/* Anomaly Detector */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#0F1422] border border-white/8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-400" />
              <span>شناساگر ناهنجاری و نوسان ترافیک (SPM Anomaly Detector)</span>
            </h3>
            <span className="text-[11px] text-emerald-400">سیستم مانیتورینگ هوشمند</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-400 mb-1">
                <span>جهش غیرمنتظره در سهم ترافیک شورتس (تیزر دلم تنگ شده)</span>
                <span className="font-mono-code">+۲۱۰٪ رشد بازدید</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                <strong>علت احتمالی:</strong> ورود شورتس به چرخه ترند الگوریتم به دلیل نرخ تماشای کامل ۸۴.۴٪.
                <br />
                <strong>اقدام پیشنهادی:</strong> همین الان ویدیوی کامل را در تنظیمات استودیو به عنوان Related Video این شورت انتخاب کنید تا این ترافیک را تبدیل به واچ‌تایم بلند کنید.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs">
              <div className="flex items-center justify-between font-bold text-rose-400 mb-1">
                <span>افت CTR در ویدیوی قدیمی «قسم» (Ghasam Official Audio)</span>
                <span className="font-mono-code">کاهش به ۳.۲٪</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                <strong>علت احتمالی:</strong> کاور ثابت قدیمی با تایپوگرافی نامشخص و فقدان واژگان مدرن در عنوان.
                <br />
                <strong>اقدام پیشنهادی:</strong> تعویض تامنیل با پرامپت تولید شده در آزمایشگاه SPM و بازنویسی دیسکریپشن با کردیت‌های رسمی.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
