import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Zap,
  Disc3,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  Music2,
} from 'lucide-react';
import { MusicTrendItem } from '../types';

interface MusicTrendsPageProps {
  trends: MusicTrendItem[];
  onTriggerAction: (actionText: string) => void;
}

export const MusicTrendsPage: React.FC<MusicTrendsPageProps> = ({
  trends,
  onTriggerAction,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp size={18} />
            </span>
            <h2 className="text-lg font-black text-white">ترندهای موسیقی و فرصت‌های رشد (Persian EDM & Trends)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            تحلیل تقاضای شنوندگان موسیقی دیپ هاوس، تکنو هاوس و ریمیکس‌های فارسی در یوتیوب، کشف الگوهای ترند و طراحی آزمایش‌های رشد اختصاصی برای سعید پروانه
          </p>
        </div>
      </div>

      {/* Featured Market Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
            <Flame size={16} />
            <span>ژانر پرتقاضای فصل: Persian Deep House</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            جستجو برای میکس‌های شبانه رانندگی و ریمیکس‌های ملودیک تکنو نسبت به سال گذشته رشد ۳۸٪ داشته و کاربران ترجیح می‌دهند ویدیوهایی با فضای نئونی تاریک را در پس‌زمینه پخش کنند.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
            <Zap size={16} />
            <span>برتری ویژوالایزر لوپ در واچ‌تایم</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ویدیوهایی با ویژوالایزر متحرک لوپ نسبت به کاور ثابت عکاسی، میانگین زمان تماشا (AVD) تا ۴۵٪ بالاتر و نرخ پرش کمتری را ثبت کرده‌اند.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
            <Music2 size={16} />
            <span>پل ارتباطی شورتس و ترک کامل</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ۷۰٪ از شنوندگان جدید قطعات الکترونیک ابتدا دراپ بیس را در قالب شورتس ۱۵ تا ۳۰ ثانیه‌ای می‌شنوند و سپس به جستجوی نام آهنگ می‌پردازند.
          </p>
        </div>
      </div>

      {/* Opportunity Cards List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white">فرصت‌های رشد تدوین‌شده برای استایل سعید پروانه</h3>

        <div className="grid grid-cols-1 gap-4">
          {trends.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 hover:border-blue-500/30 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/6 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">
                    {item.genre}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono-code">
                  <span className="text-slate-400">ضریب اطمینان الگوریتم:</span>
                  <span className="font-bold text-emerald-400 font-mono-code">{item.confidenceScore}٪</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs">
                  <span className="font-bold text-blue-300 block mb-1">
                    چرا برای سعید پروانه مناسب است؟
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item.applicabilityForSaeidParvaneh}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs">
                  <span className="font-bold text-indigo-300 block mb-1">
                    آزمایش عملی و دستاورد مورد انتظار:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item.suggestedAction}
                  </p>
                  <div className="mt-1.5 text-[10px] text-emerald-400 font-semibold">
                    دستاورد تخمینی: {item.expectedOutcome}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
