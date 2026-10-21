import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Copy,
  Check,
  Eye,
  Sliders,
  Smartphone,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  TestTube2,
  RefreshCw,
} from 'lucide-react';
import { ThumbnailConcept } from '../types';
import { getThumbnailPrompts } from '../services/api';

export const ThumbnailLabPage: React.FC = () => {
  const [trackNameFa, setTrackNameFa] = useState('برنگشتی');
  const [trackNameEn, setTrackNameEn] = useState('Bargardi');
  const [mood, setMood] = useState('تاریک، احساسی، عمیق و پرانرژی');
  const [visualStyle, setVisualStyle] = useState('استودیوی نئونی سایبرپانک با نور پس‌زمینه آبی و بنفش');
  const [includeArtistFace, setIncludeArtistFace] = useState(true);

  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // A/B test mock items
  const [abTests, setAbTests] = useState([
    {
      id: 'ab-1',
      videoTitle: 'Saeid Parvaneh - Bargardi',
      variantA: 'پرتره بسته با عینک دودی + نور آبی برقی',
      variantB: 'نمای سینمایی رانندگی شبانه با لوگوی پروانه',
      hypothesis: 'پرتره چهره با کنتراست شدید در فید موبایل CTR را از ۵.۸٪ به بالای ۷٪ ارتقا می‌دهد.',
      status: 'در حال بررسی (Running)',
      ctrA: '٪۶.۲',
      ctrB: '٪۵.۴',
    },
  ]);

  const handleGeneratePrompts = async () => {
    setIsLoading(true);
    try {
      const generated = await getThumbnailPrompts({
        trackNameFa,
        trackNameEn,
        mood,
        visualStyle,
        includeArtistFace,
      });
      setConcepts(generated);
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
              <ImageIcon size={18} />
            </span>
            <h2 className="text-lg font-black text-white">آزمایشگاه تامنیل SPM (Thumbnail Lab & Prompts)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            مهندسی بصری تامنیل با نسبت ۱۶:۹، شبیه‌سازی خوانایی موبایل، حفظ هویت اختصاصی هنرمند (عینک تیره و پروانه نئونی)، و تدوین پرامپت‌های استاندارد هوش مصنوعی
          </p>
        </div>

        <button
          onClick={handleGeneratePrompts}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-1.5"
        >
          <Sparkles size={15} />
          <span>تولید مفاهیم و پرامپت تامنیل</span>
        </button>
      </div>

      {/* Configuration Controls */}
      <div className="p-5 rounded-2xl bg-[#0B0E17] border border-white/8 space-y-4">
        <h3 className="text-xs font-bold text-slate-300">تنظیمات استایل بصری قطعه:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
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
            <label className="text-[11px] text-slate-400 mb-1 block">مود احساسی:</label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="artistFace"
              checked={includeArtistFace}
              onChange={(e) => setIncludeArtistFace(e.target.checked)}
              className="rounded bg-black/40 border-white/20 text-blue-600 focus:ring-0"
            />
            <label htmlFor="artistFace" className="text-xs text-slate-300 cursor-pointer">
              حفظ چهره هنرمند با عینک تیره امضا شده
            </label>
          </div>
        </div>
      </div>

      {/* Generated Concepts & Prompts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">مفاهیم و پرامپت‌های تولید تصویر ۱۶:۹</h3>
          <span className="text-xs text-slate-500 font-mono-code">Optimized for Gemini & Midjourney v6</span>
        </div>

        {concepts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {concepts.map((concept) => (
              <div
                key={concept.id}
                className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/30 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <h4 className="text-sm font-bold text-white">{concept.title}</h4>
                    <span className="text-xs text-blue-400 font-mono-code font-bold">16:9</span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <div><strong>ترکیب‌بندی:</strong> {concept.composition}</div>
                    <div><strong>نقطه کانونی سوژه:</strong> {concept.subjectFocus}</div>
                    <div><strong>تاثیر حسی:</strong> {concept.emotionalHook}</div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-400">پالت رنگی:</span>
                      <div className="flex items-center gap-1.5">
                        {concept.colorPalette.map((color, i) => (
                          <span
                            key={i}
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Complete Image Prompt */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">پرامپت اصلی هوش مصنوعی (Image Prompt):</span>
                      <button
                        onClick={() => handleCopy(concept.imagePrompt, `${concept.id}-prompt`)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                      >
                        {copiedId === `${concept.id}-prompt` ? (
                          <Check size={14} className="text-emerald-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                        <span>{copiedId === `${concept.id}-prompt` ? 'کپی شد!' : 'کپی پرامپت'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-black/50 border border-white/8 text-xs text-slate-200 font-mono-code leading-relaxed text-left max-h-32 overflow-y-auto">
                      {concept.imagePrompt}
                    </div>
                  </div>

                  {/* Negative Prompt */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[11px] text-rose-400 font-bold block">پرامپت منفی (Negative Prompt):</span>
                    <div className="p-2 rounded-lg bg-black/30 border border-white/5 text-[11px] text-slate-400 font-mono-code text-left">
                      {concept.negativePrompt}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/6 text-[11px] text-emerald-400 bg-emerald-500/5 p-2 rounded-lg">
                  💡 <strong>توصیه موبایل:</strong> {concept.mobileLegibilityTips || 'کنتراست بالای لبه‌ها مانع از گم شدن تصویر در اسکرول سریع فید موبایل می‌شود.'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-[#0F1422] border border-white/8 text-center space-y-3">
            <ImageIcon size={32} className="mx-auto text-blue-400/50" />
            <h4 className="text-sm font-bold text-white">هنوز پرامپتی برای این قطعه تولید نشده است</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              روی دکمه «تولید مفاهیم و پرامپت تامنیل» کلیک کنید تا دستورات دقیق هوش مصنوعی متناسب با استایل سعید پروانه ساخته شود.
            </p>
          </div>
        )}
      </div>

      {/* A/B Testing Planner Section */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube2 size={16} className="text-indigo-400" />
            <h3 className="text-sm font-bold text-white">برنامه‌ریزی و سنجش آزمایش A/B تامنیل</h3>
          </div>
          <span className="text-xs text-slate-400">YouTube Studio A/B Test Ready</span>
        </div>

        <div className="space-y-3">
          {abTests.map((test) => (
            <div key={test.id} className="p-4 rounded-xl bg-black/40 border border-white/6 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>{test.videoTitle}</span>
                <span className="text-blue-400">{test.status}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-slate-300">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 block mb-1">نسخه A (کنترل):</span>
                  <div>{test.variantA}</div>
                  <div className="mt-1 font-mono-code font-bold text-emerald-400">CTR: {test.ctrA}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 block mb-1">نسخه B (آزمایشی):</span>
                  <div>{test.variantB}</div>
                  <div className="mt-1 font-mono-code font-bold text-slate-400">CTR: {test.ctrB}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                <strong>فرضیه آزمایش:</strong> {test.hypothesis}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
