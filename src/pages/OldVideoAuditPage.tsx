import React, { useState, useEffect } from 'react';
import {
  Search,
  History,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Tag,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import { YouTubeVideo, AuditReport } from '../types';
import { runVideoAudit } from '../services/api';

interface OldVideoAuditPageProps {
  videos: YouTubeVideo[];
  initialVideo?: YouTubeVideo | null;
  onSaveAuditReport: (report: AuditReport) => void;
  onNavigateToOptimizer: (trackTitle: string) => void;
}

export const OldVideoAuditPage: React.FC<OldVideoAuditPageProps> = ({
  videos,
  initialVideo,
  onSaveAuditReport,
  onNavigateToOptimizer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(
    initialVideo || videos[0] || null
  );
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (initialVideo) {
      setSelectedVideo(initialVideo);
      handleAudit(initialVideo);
    }
  }, [initialVideo]);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAudit = async (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsLoading(true);
    setIsApproved(false);
    try {
      const report = await runVideoAudit(video);
      setAuditReport(report);
      onSaveAuditReport(report);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleApprove = () => {
    if (auditReport) {
      const updated = { ...auditReport, isApproved: true, appliedAt: new Date().toISOString() };
      setAuditReport(updated);
      setIsApproved(true);
      onSaveAuditReport(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-l from-indigo-950/40 via-[#0E1320] to-[#0A0D14] border border-blue-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <History size={18} />
              </span>
              <h2 className="text-lg font-black text-white">بررسی و احیای ویدیوهای قدیمی کانال</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              موتور هوشمند ممیزی ۱۱ مرحله‌ای ویدیوهای آپلودشده، شناسایی نقایص متادیتا و تامنیل، و ارائه بسته کامل بازنویسی شده جهت ورود مجدد به سیستم توصیه الگوریتم یوتیوب
            </p>
          </div>

          {/* Quick Command Trigger Workflow A */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const bargardi = videos.find((v) => v.title.includes('Bargardi') || v.title.includes('برنگشتی'));
                if (bargardi) handleAudit(bargardi);
              }}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center gap-1.5"
            >
              <Zap size={14} />
              <span>دستور فوری: ویدیوی برنگشتی را بررسی کن</span>
            </button>
          </div>
        </div>

        {/* Video Search & Quick Select Bar */}
        <div className="mt-4 pt-4 border-t border-white/6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute right-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="جستجوی ویدیو با نام فارسی، انگلیسی، یا شناسه ویدیو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {videos.slice(0, 4).map((v) => (
              <button
                key={v.id}
                onClick={() => handleAudit(v)}
                className={`px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors border ${
                  selectedVideo?.id === v.id
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 font-bold'
                    : 'bg-white/[0.02] text-slate-400 border-white/6 hover:text-white'
                }`}
              >
                {v.title.split('-')[1]?.trim() || v.title.slice(0, 25)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Video Selector & Current Stats */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300">انتخاب ویدیو از آرشیو کانال</h3>
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleAudit(video)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedVideo?.id === video.id
                    ? 'bg-blue-950/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'bg-[#0F1422] border-white/6 hover:border-white/15'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 font-mono-code text-[8px] text-white">
                      {video.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 line-clamp-1">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{video.viewCount.toLocaleString('fa-IR')} بازدید</span>
                      <span>·</span>
                      <span>CTR: ٪{video.ctr || '۴.۸'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (2 Cols): 11-Section Audit Report */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <div className="p-12 rounded-2xl bg-[#0F1422] border border-white/8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400 animate-spin">
                <Sparkles size={24} />
              </div>
              <h4 className="text-sm font-bold text-white">در حال تحلیل عمیق ویدیوی انتخابی با Gemini...</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                بررسی سئوی عنوان، ارزیابی ساختار دیسکریپشن، بررسی وضوح بصری تامنیل در موبایل، و استخراج کلمات کلیدی پرتقاضای Persian Deep House
              </p>
            </div>
          ) : auditReport && selectedVideo ? (
            <div className="space-y-5">
              {/* Report Header & Quality Score */}
              <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="text-2xl font-black font-mono-code text-blue-400">
                      {auditReport.overallScore}/۱۰۰
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">امتیاز تشخیصی متادیتا</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-code text-slate-500 uppercase">
                      DIAGNOSTIC AUDIT REPORT
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {auditReport.videoTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="text-amber-400 font-medium">{auditReport.currentStatus}</span>
                      <span>·</span>
                      <span className="text-[11px]">تحلیل شده در {new Date(auditReport.analyzedAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                  </div>
                </div>

                {/* Approve Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApprove}
                    disabled={isApproved}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isApproved
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    }`}
                  >
                    {isApproved ? <Check size={16} /> : <ShieldCheck size={16} />}
                    <span>{isApproved ? 'اصلاحات تایید و ذخیره شد' : 'تایید پیشنهادات و اعمال'}</span>
                  </button>
                </div>
              </div>

              {/* Sections A to G: Analysis Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Section B: Identified Issues */}
                <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>بخش B: مشکلات شناسایی‌شده در متادیتای فعلی</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {auditReport.identifiedIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 mt-0.5">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section C: Title Analysis */}
                <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <FileText size={14} />
                      <span>بخش C: تحلیل عنوان فعلی</span>
                    </h4>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      امتیاز: {auditReport.titleAnalysis.score}/۱۰۰
                    </span>
                  </div>
                  <div className="text-xs bg-black/30 p-2 rounded-lg text-slate-300 font-mono-code text-left">
                    {auditReport.titleAnalysis.current}
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div><strong>نقاط ضعف:</strong> {auditReport.titleAnalysis.weaknesses.join('، ')}</div>
                    <div><strong>نقاط قوت:</strong> {auditReport.titleAnalysis.strengths.join('، ')}</div>
                  </div>
                </div>

                {/* Section D: Description Analysis */}
                <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <FileText size={14} />
                      <span>بخش D: تحلیل توضیحات (Description)</span>
                    </h4>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      امتیاز: {auditReport.descriptionAnalysis.score}/۱۰۰
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1.5">
                    <div><strong>عناصر جا افتاده:</strong> {auditReport.descriptionAnalysis.missingElements?.join('، ') || 'کردیت کامل سازندگان'}</div>
                    <div><strong>نقاط قوت:</strong> {auditReport.descriptionAnalysis.strengths?.join('، ')}</div>
                  </div>
                </div>

                {/* Section F: Thumbnail Analysis */}
                <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <ImageIcon size={14} />
                      <span>بخش F: تحلیل بصری تامنیل</span>
                    </h4>
                    <span className="text-[11px] font-mono-code text-slate-400">
                      خوانایی موبایل: {auditReport.thumbnailAnalysis.readabilityScore}/۱۰۰
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong>ترکیب‌بندی پیشنهادی:</strong> {auditReport.thumbnailAnalysis.recommendedComposition}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-slate-400">پالت رنگی پیشنهادی:</span>
                    <div className="flex items-center gap-1">
                      {auditReport.thumbnailAnalysis.suggestedColorPalette?.map((c, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section I: New Recommended Version (Ready to copy & apply) */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#13192B] to-[#0D111A] border border-blue-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-400" />
                    <span>بخش I: نسخه پیشنهادی جدید آماده انتشار (Approved Replacement)</span>
                  </h4>
                  <span className="text-xs text-emerald-400 font-medium">سئو تایید شده</span>
                </div>

                {/* Recommended Title Alternative */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">عنوان بهینه‌شده پیشنهادی:</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          auditReport.newRecommendedVersion.titleOptions[0]?.title || '',
                          'title'
                        )
                      }
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      {copiedField === 'title' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedField === 'title' ? 'کپی شد!' : 'کپی عنوان'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/8 text-sm font-bold text-white font-mono-code text-left">
                    {auditReport.newRecommendedVersion.titleOptions[0]?.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong>علت انتخاب:</strong> {auditReport.newRecommendedVersion.titleOptions[0]?.rationale}
                  </div>
                </div>

                {/* Recommended Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">دیسکریپشن بهینه‌شده و استاندارد:</span>
                    <button
                      onClick={() =>
                        handleCopy(auditReport.newRecommendedVersion.description, 'description')
                      }
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      {copiedField === 'description' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedField === 'description' ? 'کپی شد!' : 'کپی متن توضیحات'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/8 text-xs text-slate-200 leading-relaxed font-mono-code whitespace-pre-line max-h-48 overflow-y-auto">
                    {auditReport.newRecommendedVersion.description}
                  </div>
                </div>

                {/* Recommended Tags */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">تگ‌های کلیدی و سرچ یوتیوب:</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          auditReport.newRecommendedVersion.tags.join(', '),
                          'tags'
                        )
                      }
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      {copiedField === 'tags' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copiedField === 'tags' ? 'کپی شد!' : 'کپی تگ‌ها به فرمت کاما'}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-black/40 border border-white/8 text-xs text-slate-300">
                    {auditReport.newRecommendedVersion.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono-code text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections J & K: Priorities and Measurement Method */}
              <div className="p-4 rounded-xl bg-[#0F1422] border border-white/8 space-y-2 text-xs">
                <div className="font-bold text-slate-200">بخش K: روش سنجش نتیجه این اصلاحات</div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {auditReport.measurementMethod}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#0F1422] border border-white/8 text-center text-slate-400 text-xs">
              یک ویدیو را از لیست سمت راست انتخاب کنید تا ممیزی جامع آن اجرا شود.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
