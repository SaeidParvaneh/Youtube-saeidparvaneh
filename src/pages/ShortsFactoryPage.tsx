import React, { useState } from 'react';
import {
  Film,
  Sparkles,
  Copy,
  Check,
  Clock,
  ExternalLink,
  Zap,
  Play,
  Share2,
  RefreshCw,
  Info,
} from 'lucide-react';
import { ShortConcept } from '../types';
import { getShortsCampaign } from '../services/api';

export const ShortsFactoryPage: React.FC = () => {
  const [trackNameFa, setTrackNameFa] = useState('برنگشتی');
  const [trackNameEn, setTrackNameEn] = useState('Bargardi');
  const [songDuration, setSongDuration] = useState('03:42');
  const [notes, setNotes] = useState('ملودی حسی دیپ هاوس، دراپ بیس در ثانیه ۵۵، اوج احساس شعر در ثانیه ۳۵');

  const [shorts, setShorts] = useState<ShortConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateShorts = async () => {
    setIsLoading(true);
    try {
      const generated = await getShortsCampaign({
        trackNameFa,
        trackNameEn,
        songDuration,
        highlightsDescription: notes,
      });
      setShorts(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Film size={18} />
            </span>
            <h2 className="text-lg font-black text-white">کارخانه شورتهای موسیقی SPM (Shorts Campaign Factory)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            طراحی سناریوهای خلاقانه شورتس با هدف درگیرسازی در ۳ ثانیه نخست و تبدیل میلیونی بینندگان کوتاه به شنوندگان دائمی موزیک ویدیوی کامل از طریق Related Video
          </p>
        </div>

        <button
          onClick={handleGenerateShorts}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-1.5"
        >
          <Sparkles size={15} />
          <span>تولید سناریوهای شورتس</span>
        </button>
      </div>

      {/* Official YouTube Related Video Feature Notice */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs flex items-start gap-3">
        <Info size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <span className="font-bold text-blue-300">
            دستورالعمل رسمی ارتباط شورتس به موزیک ویدیو (YouTube Related Video):
          </span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            قراردادن لینک متنی در توضیحات شورتس به صورت کلیک‌خور کار نمی‌کند! شما باید هنگام آپلود شورتس در YouTube Studio، در فیلد اختصاصی <strong>Related Video</strong> ویدیوی رسمی اصلی «{trackNameEn}» را متصل کنید تا یک دکمه دائمی روی صفحه برای تماشای نسخه کامل به بیننده نشان داده شود.
          </p>
        </div>
      </div>

      {/* Inputs Bar */}
      <div className="p-4 rounded-xl bg-[#0B0E17] border border-white/8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">نام قطعه:</label>
            <input
              type="text"
              value={trackNameFa}
              onChange={(e) => setTrackNameFa(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">نام انگلیسی:</label>
            <input
              type="text"
              value={trackNameEn}
              onChange={(e) => setTrackNameEn(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">تایم‌لاین و نکات صوتی:</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Generated Shorts Grid */}
      <div className="space-y-4">
        {shorts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shorts.map((s, idx) => (
              <div
                key={s.id || idx}
                className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs font-mono-code">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{s.conceptName}</h4>
                    </div>
                    <span className="text-xs font-mono-code text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-500/10">
                      {s.suggestedDuration}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <div>
                      <strong className="text-blue-300">هوک ۳ ثانیه اول (Visual Hook):</strong>
                      <p className="text-slate-300 mt-0.5 leading-relaxed">{s.hookOpeningSeconds}</p>
                    </div>

                    <div>
                      <strong className="text-indigo-300">تصویربرداری و ادیت:</strong>
                      <p className="text-slate-400 mt-0.5">{s.visualTreatment}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[11px] text-amber-300 font-bold">متن روی تصویر (On-Screen Text):</div>
                      <div className="text-xs text-white font-bold">{s.onScreenText}</div>
                    </div>

                    <div>
                      <strong className="text-slate-400">کپشن پیشنهادی:</strong>
                      <p className="text-slate-300 mt-0.5">{s.caption}</p>
                    </div>

                    <div>
                      <strong className="text-slate-400">زمان پیشنهادی انتشار:</strong>
                      <span className="text-emerald-400 font-semibold mr-1">{s.recommendedPublicationTiming}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/6 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">معیار موفقیت: {s.measurementCriteria}</span>
                  <button
                    onClick={() => handleCopy(`${s.suggestedTitle}\n\n${s.caption}\n\n${s.hashtags.join(' ')}`, `sh-${idx}`)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    {copiedId === `sh-${idx}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedId === `sh-${idx}` ? 'کپی شد' : 'کپی متن شورتس'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-[#0F1422] border border-white/8 text-center text-xs text-slate-400 space-y-3">
            <Film size={32} className="mx-auto text-blue-400/40" />
            <p>هنوز کمپین شورتسی ایجاد نشده است. دکمه «تولید سناریوهای شورتس» را بزنید.</p>
          </div>
        )}
      </div>
    </div>
  );
};
