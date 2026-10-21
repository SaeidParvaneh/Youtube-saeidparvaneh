import React, { useState } from 'react';
import {
  FolderArchive,
  Disc3,
  Calendar,
  History,
  FileText,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { MusicReleaseProject, AuditReport } from '../types';

interface ProjectsArchivePageProps {
  projects: MusicReleaseProject[];
  audits: Record<string, AuditReport>;
  onDeleteProject: (id: string) => void;
}

export const ProjectsArchivePage: React.FC<ProjectsArchivePageProps> = ({
  projects,
  audits,
  onDeleteProject,
}) => {
  const [activeTab, setActiveTab] = useState<'releases' | 'audits'>('releases');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const auditList = Object.values(audits);

  const handleCopy = (txt: string, id: string) => {
    navigator.clipboard.writeText(txt);
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
              <FolderArchive size={18} />
            </span>
            <h2 className="text-lg font-black text-white">آرشیو پروژه‌ها و پیشنهادهای تاییدشده (Project Memory)</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            حافظه ماندگار برنامه: سوابق انتشار قطعات موسیقی، عناوین و دیسکریپشن‌های مصوب، ممیزی‌های گذشته و پرامپت‌های آزمایشگاه تامنیل
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/8 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('releases')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'releases' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Disc3 size={14} />
            <span>پروژه‌های انتشار ({projects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('audits')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'audits' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <History size={14} />
            <span>سوابق ممیزی ویدیوها ({auditList.length})</span>
          </button>
        </div>
      </div>

      {/* Releases Tab */}
      {activeTab === 'releases' && (
        <div className="space-y-4">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 hover:border-blue-500/30 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/6 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {proj.titleFa}{' '}
                        <span className="font-en text-slate-400 text-xs font-semibold">
                          ({proj.titleEn})
                        </span>
                      </h4>
                      <span className="text-[11px] text-blue-400 font-medium">
                        {proj.mainGenre} • {proj.subGenre}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {proj.status === 'metadata_ready' ? 'متادیتا آماده' : 'در حال برنامه‌ریزی'}
                    </span>
                  </div>

                  {proj.approvedTitle && (
                    <div className="space-y-1 text-xs">
                      <span className="text-slate-400 text-[11px]">عنوان تایید شده:</span>
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono-code text-white text-[11px] text-left">
                        {proj.approvedTitle}
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div><strong>تاریخ انتشار:</strong> {proj.plannedReleaseDate || 'تعیین نشده'}</div>
                    <div><strong>شورتس ثبت‌شده:</strong> {proj.shortsCampaign?.length || 0} سناریو</div>
                  </div>

                  <div className="pt-3 border-t border-white/6 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleCopy(proj.approvedDescription || '', proj.id)}
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      {copiedId === proj.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedId === proj.id ? 'کپی شد' : 'کپی دیسکریپشن'}</span>
                    </button>

                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded-lg"
                      title="حذف پروژه"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#0F1422] border border-white/8 text-center text-xs text-slate-400">
              هیچ پروژه انتشاری ذخیره نشده است.
            </div>
          )}
        </div>
      )}

      {/* Audits Tab */}
      {activeTab === 'audits' && (
        <div className="space-y-4">
          {auditList.length > 0 ? (
            <div className="space-y-3">
              {auditList.map((audit) => (
                <div
                  key={audit.id}
                  className="p-4 rounded-xl bg-[#0F1422] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{audit.videoTitle}</h4>
                      <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                        امتیاز: {audit.overallScore}/۱۰۰
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{audit.currentStatus}</p>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono-code">
                    {new Date(audit.analyzedAt).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#0F1422] border border-white/8 text-center text-xs text-slate-400">
              هنوز گزارشی در آرشیو ثبت نشده است. از منوی «بررسی ویدیوهای قدیمی» ممیزی را اجرا کنید.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
