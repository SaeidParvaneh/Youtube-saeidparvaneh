import React, { useState } from 'react';
import {
  Radio,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertCircle,
  Filter,
  Sparkles,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import { YouTubeUpdateItem } from '../types';

interface YouTubeChangeMonitorPageProps {
  updates: YouTubeUpdateItem[];
  onToggleSave: (id: string) => void;
  onRefresh: () => void;
}

export const YouTubeChangeMonitorPage: React.FC<YouTubeChangeMonitorPageProps> = ({
  updates,
  onToggleSave,
  onRefresh,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = updates.filter((item) => {
    if (filterSavedOnly && !item.isSaved) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Radio size={18} />
            </span>
            <h2 className="text-lg font-black text-white">رصد زنده تغییرات یوتیوب (Official YouTube Changes)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            پایش مستمر اسناد رسمی راهنمای یوتیوب، کرییتور اینسایدر و تغییرات الگوریتم توصیه‌ها، ویژه کانال‌های رسمی موسیقی و هنرمندان مستقل
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          <span>استعلام آخرین تغییرات رسمی</span>
        </button>
      </div>

      {/* Filter and Category Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'همه موضوعات' },
            { id: 'shorts', label: 'شورتس و ویدیوهای مرتبط' },
            { id: 'metadata_seo', label: 'تامنیل و متادیتا' },
            { id: 'policy_copyright', label: 'حقوق اثر و هوش مصنوعی' },
            { id: 'algorithm_recommendation', label: 'الگوریتم و واچ‌تایم' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-[#0F1422] text-slate-400 hover:text-white border border-white/6'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={filterSavedOnly}
            onChange={(e) => setFilterSavedOnly(e.target.checked)}
            className="rounded bg-black border-white/20 text-blue-600 focus:ring-0"
          />
          <span>فقط موارد ذخیره‌شده</span>
        </label>
      </div>

      {/* Updates Stream */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 hover:border-blue-500/30 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/6 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                    item.reliability === 'official_google'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  <ShieldCheck size={12} />
                  <span>
                    {item.reliability === 'official_google'
                      ? 'مستندات رسمی گوگل/یوتیوب'
                      : 'گزارش معتبر کرییتورز'}
                  </span>
                </span>

                <span className="text-[11px] text-slate-400 font-mono-code">
                  تاریخ انتشار: {item.publicationDate}
                </span>
                <span className="text-[11px] text-slate-500">· ناشر: {item.publisher}</span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onToggleSave(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                  title="ذخیره جهت مطالعه بعدی"
                >
                  {item.isSaved ? (
                    <BookmarkCheck size={16} className="text-blue-400" />
                  ) : (
                    <Bookmark size={16} />
                  )}
                </button>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="مشاهده صفحه منبع اصلی در یوتیوب"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">{item.headline}</h3>

            <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs">
                <span className="font-bold text-blue-400 block mb-1">
                  تاثیر مستقیم روی کانال سعید پروانه:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{item.impactForMusician}</p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs">
                <span className="font-bold text-indigo-400 block mb-1">
                  اقدام عملی پیشنهادی هوش مصنوعی:
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{item.recommendedAction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
