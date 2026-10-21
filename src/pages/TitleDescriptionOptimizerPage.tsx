import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  Info,
  RefreshCw,
  Save,
} from 'lucide-react';
import { TitleAlternative } from '../types';
import { getTitleAlternatives, getDescriptionOptimization } from '../services/api';

export const TitleDescriptionOptimizerPage: React.FC = () => {
  const [trackNameFa, setTrackNameFa] = useState('برنگشتی');
  const [trackNameEn, setTrackNameEn] = useState('Bargardi');
  const [genre, setGenre] = useState('Deep House');
  const [releaseType, setReleaseType] = useState('Official Music Video');
  const [lyrics, setLyrics] = useState('گفتی میری ولی برمی‌گردی / دیدی چه کاری با دلم کردی / رفتی و این شهر بی‌تو تاریکه...');
  
  const [titles, setTitles] = useState<TitleAlternative[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [descriptionResult, setDescriptionResult] = useState<any>(null);
  const [isLoadingTitles, setIsLoadingTitles] = useState(false);
  const [isLoadingDesc, setIsLoadingDesc] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerateTitles = async () => {
    setIsLoadingTitles(true);
    try {
      const generated = await getTitleAlternatives(trackNameFa, trackNameEn, genre, releaseType);
      setTitles(generated);
      if (generated.length > 0) setSelectedTitle(generated[0].title);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingTitles(false);
    }
  };

  const handleGenerateDescription = async () => {
    setIsLoadingDesc(true);
    try {
      const res = await getDescriptionOptimization({
        trackNameFa,
        trackNameEn,
        genre,
        releaseType,
        lyrics,
        credits: {
          arrangement: 'Saeid Parvaneh',
          mixAndMaster: 'SPM Audio Lab',
          label: 'SPM Records',
        },
      });
      setDescriptionResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDesc(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText size={18} />
            </span>
            <h2 className="text-lg font-black text-white">موتور مهندسی عنوان و دیسکریپشن موزیک</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            تولید ۵ سبک عنوان استراتژیک بر اساس قوانین ۲۰۲۶ یوتیوب، پیش‌نمایش خوانایی در موبایل، و معماری دیسکریپشن حرفه‌ای با رعایت دستورالعمل‌های رسمی ضداسپم یوتیوب
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleGenerateTitles();
              handleGenerateDescription();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-1.5"
          >
            <Sparkles size={15} />
            <span>تولید همزمان عنوان و توضیحات</span>
          </button>
        </div>
      </div>

      {/* Input Parameters Box */}
      <div className="p-5 rounded-2xl bg-[#0B0E17] border border-white/8 space-y-4">
        <h3 className="text-xs font-bold text-slate-300">اطلاعات قطعه جهت بهینه‌سازی دقیق:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">نام قطعه (فارسی):</label>
            <input
              type="text"
              value={trackNameFa}
              onChange={(e) => setTrackNameFa(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">نام قطعه (انگلیسی):</label>
            <input
              type="text"
              value={trackNameEn}
              onChange={(e) => setTrackNameEn(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">سبک / ژانر:</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Deep House">Deep House</option>
              <option value="Techno House">Techno House</option>
              <option value="Melodic Techno">Melodic Techno</option>
              <option value="Persian EDM Remix">Persian EDM Remix</option>
              <option value="Club Dance">Club Dance</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">نوع انتشار:</label>
            <select
              value={releaseType}
              onChange={(e) => setReleaseType(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="Official Music Video">Official Music Video (موزیک ویدیو رسمی)</option>
              <option value="Official Audio">Official Audio (نسخه صوتی اصلی)</option>
              <option value="Deep House Remix">Deep House Remix (ریمیکس دیپ هاوس)</option>
              <option value="Visualizer">Official Visualizer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Title Optimization Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white">۵ گزینه استراتژیک عنوان (Title Alternatives)</h3>
            <span className="text-[11px] text-slate-500 font-mono-code">Ranked by Internal Algorithm Score</span>
          </div>

          <button
            onClick={handleGenerateTitles}
            disabled={isLoadingTitles}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <RefreshCw size={13} className={isLoadingTitles ? 'animate-spin' : ''} />
            <span>تولید مجدد عنوان‌ها</span>
          </button>
        </div>

        {titles.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {titles.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTitle(t.title)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedTitle === t.title
                    ? 'bg-blue-950/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'bg-[#0F1422] border-white/6 hover:border-white/15'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">
                      امتیاز: {t.internalScore}/۱۰۰
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">
                      {t.type === 'bilingual'
                        ? 'دوزبانه متوازن (توصیه اول)'
                        : t.type === 'persian_first'
                        ? 'فارسی‌محور'
                        : t.type === 'search_oriented'
                        ? 'سئو و جستجو محور'
                        : t.type === 'brand_oriented'
                        ? 'برند و مینیمال'
                        : 'انگلیسی‌محور'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>طول: {t.characterCount} کاراکتر</span>
                    <span>·</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(t.title, t.id);
                      }}
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      {copiedKey === t.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedKey === t.id ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-sm font-bold text-white font-mono-code text-left">
                  {t.title}
                </div>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <div><strong>مزیت استراتژیک:</strong> {t.strategicAdvantage}</div>
                  <div><strong>نقطه ضعف یا ریسک:</strong> {t.potentialWeakness}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-[#0F1422] border border-white/8 text-center">
            <button
              onClick={handleGenerateTitles}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
            >
              تولید ۵ عنوان استراتژیک برای «{trackNameFa}»
            </button>
          </div>
        )}

        {/* Mobile Viewport Truncation Simulator */}
        {selectedTitle && (
          <div className="p-4 rounded-xl bg-[#080A10] border border-white/8 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Smartphone size={14} className="text-blue-400" />
              <span>شبیه‌ساز نمایش عنوان در صفحه موبایل یوتیوب (محدوده برش در ۶۰ کاراکتر):</span>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-white/5 max-w-sm">
              <div className="w-full h-32 rounded-lg bg-slate-800/80 mb-2 flex items-center justify-center text-slate-500 text-xs">
                کاور تامنیل ۱۶:۹
              </div>
              <div className="text-xs font-bold text-slate-200 font-mono-code line-clamp-2 text-left">
                {selectedTitle}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Saeid Parvaneh • 42K views • 2 weeks ago
              </div>
            </div>
          </div>
        )}
      </div>

      {/* YouTube Description Architect Section */}
      <div className="space-y-4 pt-4 border-t border-white/8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">معماری و تولید دیسکریپشن حرفه‌ای موزیک</h3>
            <p className="text-xs text-slate-400">
              شامل کردیت‌های تایید شده، متن ترانه، لینک‌های رسمی پلتفرم‌ها و تگ‌های ضداسپم
            </p>
          </div>

          <button
            onClick={handleGenerateDescription}
            disabled={isLoadingDesc}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <RefreshCw size={13} className={isLoadingDesc ? 'animate-spin' : ''} />
            <span>تولید یا بازنویسی توضیحات</span>
          </button>
        </div>

        {descriptionResult ? (
          <div className="space-y-4">
            {/* YouTube Policy Compliance Banner */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck size={18} />
                <span>وضعیت انطباق با قوانین یوتیوب: {descriptionResult.policyComplianceStatus}</span>
              </div>
              <span className="text-[11px] text-slate-300">{descriptionResult.policyNotes}</span>
            </div>

            {/* Generated Description Box */}
            <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">متن نهایی آماده انتشار در استودیو:</span>
                <button
                  onClick={() => copyToClipboard(descriptionResult.description, 'full_desc')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'full_desc' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedKey === 'full_desc' ? 'کپی شد!' : 'کپی کامل دیسکریپشن'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={12}
                value={descriptionResult.description}
                className="w-full p-4 rounded-xl bg-black/50 border border-white/8 text-xs text-slate-200 font-mono-code leading-relaxed text-left focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-[#0F1422] border border-white/8 text-center">
            <button
              onClick={handleGenerateDescription}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
            >
              تولید دیسکریپشن استاندارد برای «{trackNameFa}»
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
