import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  History,
  FileText,
  Image,
  Disc3,
  Film,
  Calendar,
  Radio,
  TrendingUp,
  Bot,
  FolderArchive,
  Settings,
  FileCheck2,
  ChevronLeft,
  X,
  ExternalLink,
} from 'lucide-react';
import { ButterflyLogo } from '../brand/ButterflyLogo';

export type NavSection =
  | 'dashboard'
  | 'analytics'
  | 'audit'
  | 'title_desc'
  | 'thumbnail'
  | 'new_release'
  | 'shorts'
  | 'calendar'
  | 'youtube_monitor'
  | 'music_trends'
  | 'ai_assistant'
  | 'projects_archive'
  | 'settings'
  | 'reports';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  channelHandle: string;
  isAccountConnected: boolean;
  isDemoMode: boolean;
}

interface NavItemConfig {
  id: NavSection;
  labelFa: string;
  labelEn: string;
  icon: React.ElementType;
  badge?: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', labelFa: 'داشبورد اصلی', labelEn: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', labelFa: 'تحلیل کانال', labelEn: 'Analytics', icon: BarChart3 },
  { id: 'audit', labelFa: 'بررسی ویدیوهای قدیمی', labelEn: 'Video Audit', icon: History, badge: 'مهم' },
  { id: 'title_desc', labelFa: 'بهینه‌سازی عنوان و دیسکریپشن', labelEn: 'Title & Desc', icon: FileText },
  { id: 'thumbnail', labelFa: 'تحلیل و طراحی تامنیل', labelEn: 'Thumbnail Lab', icon: Image },
  { id: 'new_release', labelFa: 'انتشار موزیک جدید', labelEn: 'New Release', icon: Disc3, badge: 'پروژه' },
  { id: 'shorts', labelFa: 'برنامه‌ریزی YouTube Shorts', labelEn: 'Shorts Factory', icon: Film },
  { id: 'calendar', labelFa: 'تقویم محتوایی', labelEn: 'Calendar', icon: Calendar },
  { id: 'youtube_monitor', labelFa: 'رصد تغییرات یوتیوب', labelEn: 'YouTube Monitor', icon: Radio },
  { id: 'music_trends', labelFa: 'اخبار و ترندهای موسیقی', labelEn: 'Music Trends', icon: TrendingUp },
  { id: 'ai_assistant', labelFa: 'دستیار هوش مصنوعی SPM', labelEn: 'SPM AI Assistant', icon: Bot, badge: 'AI' },
  { id: 'projects_archive', labelFa: 'آرشیو پروژه‌ها و پیشنهادها', labelEn: 'Projects Archive', icon: FolderArchive },
  { id: 'settings', labelFa: 'اتصال حساب‌ها و تنظیمات', labelEn: 'Settings & OAuth', icon: Settings },
  { id: 'reports', labelFa: 'گزارش‌ها و تاریخچه عملکرد', labelEn: 'Reports & Logs', icon: FileCheck2 },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
  channelHandle,
  isAccountConnected,
  isDemoMode,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 bg-[#0B0E17]/95 border-l border-white/8 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpenMobile ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header / Brand */}
        <div className="flex items-center justify-between p-4 border-b border-white/6">
          <ButterflyLogo size="md" />
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
            aria-label="بستن منو"
          >
            <X size={20} />
          </button>
        </div>

        {/* Channel Status Pill */}
        <div className="px-4 py-3 border-b border-white/6 bg-white/[0.02]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">کانال هدف:</span>
            <a
              href="https://www.youtube.com/@saeidparvaneh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-code text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 group"
            >
              <span>{channelHandle}</span>
              <ExternalLink size={11} className="opacity-70 group-hover:opacity-100" />
            </a>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">وضعیت اتصال:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isAccountConnected
                    ? 'bg-emerald-400 shadow-[0_0_8px_#10B981]'
                    : isDemoMode
                    ? 'bg-amber-400 shadow-[0_0_8px_#F59E0B]'
                    : 'bg-rose-500 shadow-[0_0_8px_#F43F5E]'
                }`}
              />
              <span className="text-slate-300 font-medium">
                {isAccountConnected
                  ? 'یوتیوب متصل'
                  : isDemoMode
                  ? 'حالت نمایشی (سعید پروانه)'
                  : 'قطع ارتباط'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-l from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={17}
                    className={`transition-colors ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="text-right">{item.labelFa}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.badge === 'AI'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : item.badge === 'مهم'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronLeft size={14} className="text-blue-400" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Footer Info */}
        <div className="p-3 border-t border-white/6 text-center text-[10px] text-slate-500">
          <span>SPM YouTube AI • نسخه ۱.۰</span>
          <span className="mx-1">·</span>
          <span>سعید پروانه</span>
        </div>
      </aside>
    </>
  );
};
