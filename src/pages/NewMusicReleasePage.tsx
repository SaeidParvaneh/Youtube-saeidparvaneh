import React, { useState } from 'react';
import {
  Disc3,
  Sparkles,
  Calendar,
  FileText,
  Image,
  Film,
  CheckCircle2,
  Save,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { MusicReleaseProject } from '../types';
import { getTitleAlternatives, getDescriptionOptimization, getShortsCampaign, getThumbnailPrompts } from '../services/api';

interface NewMusicReleasePageProps {
  onSaveProject: (project: MusicReleaseProject) => void;
  existingProjects: MusicReleaseProject[];
}

export const NewMusicReleasePage: React.FC<NewMusicReleasePageProps> = ({
  onSaveProject,
  existingProjects,
}) => {
  const [formData, setFormData] = useState<Partial<MusicReleaseProject>>({
    titleFa: 'شب تاریک',
    titleEn: 'Shabe Tarik',
    mainGenre: 'Deep House',
    subGenre: 'Melodic Techno',
    language: 'فارسی (Persian)',
    releaseType: 'single',
    plannedReleaseDate: '2026-11-12',
    mood: 'شبانه، تاریک، حسی و عمیق',
    targetAudience: 'علاقه‌مندان به ریمیکس‌های شبانه، دیپ هاوس مدرن، موسیقی جاده و اتوبان',
    lyricsExcerpt: 'تو رفتی و این شب تاریک تموم نمیشه / دل من بی تو آروم نمیشه...',
    confirmedCredits: {
      artist: 'Saeid Parvaneh (سعید پروانه)',
      composer: 'سعید پروانه',
      arrangement: 'Saeid Parvaneh',
      mixAndMaster: 'SPM Audio Lab',
      coverArt: 'SPM Visual Studio',
      label: 'SPM Records',
    },
    format: 'music_video',
    status: 'planning',
  });

  const [activeTab, setActiveTab] = useState<'details' | 'strategy' | 'calendar' | 'checklist'>('details');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerateFullStrategy = async () => {
    setIsGenerating(true);
    try {
      const [titles, desc, shorts, thumbnails] = await Promise.all([
        getTitleAlternatives(formData.titleFa || '', formData.titleEn || '', formData.mainGenre, 'Official Music Video'),
        getDescriptionOptimization({
          trackNameFa: formData.titleFa || '',
          trackNameEn: formData.titleEn || '',
          genre: formData.mainGenre,
          releaseType: 'Official Music Video',
          lyrics: formData.lyricsExcerpt,
          credits: formData.confirmedCredits,
        }),
        getShortsCampaign({
          trackNameFa: formData.titleFa || '',
          trackNameEn: formData.titleEn || '',
          highlightsDescription: 'دراپ سنگین بیس در ثانیه ۵۰ و شعر احساسی در اوج',
        }),
        getThumbnailPrompts({
          trackNameFa: formData.titleFa || '',
          trackNameEn: formData.titleEn || '',
          mood: formData.mood,
          includeArtistFace: true,
        }),
      ]);

      const strategyPackage = {
        titles,
        description: desc.description,
        hashtags: desc.hashtags,
        searchKeywords: desc.searchKeywords,
        shorts,
        thumbnails,
        communityPosts: [
          `سلام دوستان عزیز. ترک جدید «${formData.titleFa}» پنج‌شنبه این هفته ساعت ۱۹:۳۰ منتشر میشه. تیزر این قطعه رو شنیدید؟ نظرتون رو برام بنویسید 🔥`,
          `موزیک ویدیوی رسمی «${formData.titleFa}» منتشر شد! لینک شنیدن در یوتیوب موزیک و اسپاتیفای در کامنت پین شده قرار گرفت.`,
        ],
        checklist: [
          { task: 'تایید نهایی عنوان دو زبانه و جایگذاری در استودیو', done: false },
          { task: 'دانلود کاور ۱۶:۹ با عینک تیره از آزمایشگاه تامنیل', done: false },
          { task: 'انتشار تیزر اول شورتس با لینک Related Video ۳ روز قبل', done: false },
          { task: 'بررسی تنظیمات کپی‌رایت و Content ID در SPM Records', done: false },
          { task: 'پایش CTR در ۴۸ ساعت اول پس از انتشار', done: false },
        ],
      };

      setGeneratedStrategy(strategyPackage);
      setActiveTab('strategy');

      // Update project
      const updatedProject: MusicReleaseProject = {
        id: `proj_${Date.now()}`,
        titleFa: formData.titleFa || '',
        titleEn: formData.titleEn || '',
        mainGenre: formData.mainGenre || 'Deep House',
        subGenre: formData.subGenre || '',
        language: formData.language || 'Persian',
        releaseType: formData.releaseType as any,
        plannedReleaseDate: formData.plannedReleaseDate || '',
        mood: formData.mood || '',
        targetAudience: formData.targetAudience || '',
        lyricsExcerpt: formData.lyricsExcerpt,
        confirmedCredits: formData.confirmedCredits as any,
        format: formData.format as any,
        status: 'metadata_ready',
        approvedTitle: titles[0]?.title,
        approvedDescription: desc.description,
        approvedTags: desc.searchKeywords,
        approvedThumbnailPrompt: thumbnails[0]?.imagePrompt,
        shortsCampaign: shorts,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onSaveProject(updatedProject);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
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
              <Disc3 size={18} />
            </span>
            <h2 className="text-lg font-black text-white">میزکار انتشار موزیک جدید (Release Workspace)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            مدیریت گام‌به‌گام کارزار انتشار قطعه: از تدوین هویت اثر و متادیتا تا تولید خودکار کمپین شورتس، تامنیل و چک‌لیست سئو در یوتیوب
          </p>
        </div>

        <button
          onClick={handleGenerateFullStrategy}
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center gap-1.5"
        >
          <Sparkles size={16} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'در حال تدوین بسته استراتژی ۱۲ گانه...' : 'تولید استراتژی جامع انتشار اثر'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/8 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('details')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'details'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ۱. مشخصات و کردیت‌های قطعه
        </button>
        <button
          onClick={() => setActiveTab('strategy')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
            activeTab === 'strategy'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>۲. بسته استراتژی ۱۲ گانه</span>
          {generatedStrategy && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'checklist'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ۳. چک‌لیست اقدامات انتشار
        </button>
      </div>

      {/* Tab 1: Track Details & Credits */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
            <h3 className="text-sm font-bold text-white">مشخصات اصلی قطعه موسیقی</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">نام قطعه به فارسی:</label>
                <input
                  type="text"
                  value={formData.titleFa}
                  onChange={(e) => setFormData({ ...formData, titleFa: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">نام قطعه به انگلیسی (Official English Spelling):</label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">سبک / ژانر:</label>
                  <select
                    value={formData.mainGenre}
                    onChange={(e) => setFormData({ ...formData, mainGenre: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Deep House">Deep House</option>
                    <option value="Techno House">Techno House</option>
                    <option value="Persian EDM">Persian EDM</option>
                    <option value="Club Remix">Club Remix</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">تاریخ برنامه‌ریزی انتشار:</label>
                  <input
                    type="date"
                    value={formData.plannedReleaseDate}
                    onChange={(e) => setFormData({ ...formData, plannedReleaseDate: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">بخشی از شعر یا هوک اصلی (اختیاری):</label>
                <textarea
                  rows={3}
                  value={formData.lyricsExcerpt}
                  onChange={(e) => setFormData({ ...formData, lyricsExcerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
            <h3 className="text-sm font-bold text-white">کردیت‌های تایید شده شناسنامه اثر</h3>
            <p className="text-xs text-slate-400">
              این اطلاعات دقیقاً در دیسکریپشن رسمی ثبت می‌شود تا از ادعاهای حقوقی و نامشخص بودن مالکیت جلوگیری شود.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">خواننده و هنرمند اصلی:</label>
                <input
                  type="text"
                  value={formData.confirmedCredits?.artist}
                  readOnly
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-xl text-xs text-slate-300 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">تنظیم‌کننده (Arranger):</label>
                  <input
                    type="text"
                    value={formData.confirmedCredits?.arrangement}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmedCredits: {
                          ...formData.confirmedCredits!,
                          arrangement: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 mb-1 block">میکس و مسترینگ:</label>
                  <input
                    type="text"
                    value={formData.confirmedCredits?.mixAndMaster}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmedCredits: {
                          ...formData.confirmedCredits!,
                          mixAndMaster: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">ناشر و لیبل:</label>
                <input
                  type="text"
                  value={formData.confirmedCredits?.label}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmedCredits: {
                        ...formData.confirmedCredits!,
                        label: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Strategy Package View */}
      {activeTab === 'strategy' && (
        <div className="space-y-6">
          {generatedStrategy ? (
            <div className="space-y-6">
              {/* Titles Section */}
              <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText size={16} className="text-blue-400" />
                    <span>عنوان‌های پیشنهادی برای این اثر:</span>
                  </h4>
                  <span className="text-xs text-slate-400">توصیه شده بر اساس الگوریتم</span>
                </div>

                <div className="space-y-2">
                  {generatedStrategy.titles.slice(0, 3).map((t: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-black/40 border border-white/8 flex items-center justify-between text-xs"
                    >
                      <span className="font-mono-code font-bold text-white text-left">{t.title}</span>
                      <button
                        onClick={() => copyText(t.title, `t-${i}`)}
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                      >
                        {copiedKey === `t-${i}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedKey === `t-${i}` ? 'کپی شد' : 'کپی'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Section */}
              <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">دیسکریپشن رسمی آماده:</h4>
                  <button
                    onClick={() => copyText(generatedStrategy.description, 'strat_desc')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    {copiedKey === 'strat_desc' ? <Check size={12} /> : <Copy size={12} />}
                    <span>کپی توضیحات</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/6 text-xs text-slate-200 font-mono-code leading-relaxed max-h-40 overflow-y-auto whitespace-pre-line text-left">
                  {generatedStrategy.description}
                </div>
              </div>

              {/* Shorts Teasers Roadmap */}
              <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Film size={16} className="text-indigo-400" />
                  <span>برنامه شورت‌های ویدیویی برای قطعه «{formData.titleFa}»</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {generatedStrategy.shorts.map((s: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/6 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-200">
                        <span>{s.conceptName}</span>
                        <span className="font-mono-code text-blue-400">{s.suggestedDuration}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong>هوک ثانیه‌های اول:</strong> {s.hookOpeningSeconds}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong>زمان‌بندی انتشار:</strong> {s.recommendedPublicationTiming}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#0F1422] border border-white/8 text-center text-xs text-slate-400 space-y-3">
              <Disc3 size={32} className="mx-auto text-blue-400/40" />
              <p>هنوز استراتژی برای این قطعه تولید نشده است. روی دکمه «تولید استراتژی جامع انتشار اثر» کلیک کنید.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Action Checklist */}
      {activeTab === 'checklist' && (
        <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
          <h3 className="text-sm font-bold text-white">چک‌لیست عملیاتی انتشار آهنگ در یوتیوب</h3>
          <div className="space-y-2">
            {[
              'ثبت متادیتای بهینه‌شده دوزبانه در استودیوی یوتیوب',
              'بارگذاری تامنیل ۱۶:۹ با نورپردازی نئونی و عینک مشکی',
              'تنظیم پرایمیر یا برنامه‌ریزی انتشار برای پنج‌شنبه ساعت ۱۹:۳۰',
              'آماده‌سازی ۴ عدد شورتس با لینک Related Video مستقیم به ویدیوی کامل',
              'انتشار پست کامیونیتی همراه با کاور رسمی',
              'ارسال لینک در استوری اینستاگرام و کانال تلگرام',
              'پایش نرخ CTR و میانگین واچ‌تایم در ۷۲ ساعت اولیه',
            ].map((task, i) => (
              <label
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/6 text-xs text-slate-300 cursor-pointer hover:border-blue-500/30 transition-colors"
              >
                <input type="checkbox" className="rounded bg-black border-white/20 text-blue-600 focus:ring-0" />
                <span>{task}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
