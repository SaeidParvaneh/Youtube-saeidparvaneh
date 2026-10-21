import React, { useState } from 'react';
import {
  Menu,
  Bell,
  RefreshCw,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Radio,
} from 'lucide-react';
import { NavSection, NAV_ITEMS } from './Sidebar';
import { AppNotification } from '../../types';

interface HeaderProps {
  currentSection: NavSection;
  onOpenMobileSidebar: () => void;
  onOpenAIAssistant: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  isAccountConnected: boolean;
  onRefreshData: () => Promise<void>;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  lastSyncTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onOpenMobileSidebar,
  onOpenAIAssistant,
  isDemoMode,
  onToggleDemoMode,
  isAccountConnected,
  onRefreshData,
  notifications,
  onMarkNotificationRead,
  lastSyncTime,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const activeItem = NAV_ITEMS.find((item) => item.id === currentSection);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0E17]/80 backdrop-blur-md border-b border-white/6 px-4 lg:px-6 flex items-center justify-between">
      {/* Right side: Mobile Menu Button & Section Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 lg:hidden"
          aria-label="باز کردن منو"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-sm md:text-base font-bold text-white tracking-tight">
              {activeItem?.labelFa || 'داشبورد اصلی'}
            </h1>
            <span className="hidden md:inline-block font-en text-xs text-slate-500 font-medium">
              / {activeItem?.labelEn}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            کانال رسمی سعید پروانه (@saeidparvaneh)
          </span>
        </div>
      </div>

      {/* Left side: Quick Controls & Notification */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Demo Mode Switcher Banner */}
        <button
          onClick={onToggleDemoMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors ${
            isDemoMode
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              : 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20'
          }`}
          title="تغییر بین حالت داده‌های واقعی و حالت نمایشی"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isDemoMode ? 'bg-amber-400' : 'bg-blue-400'
            }`}
          />
          <span className="hidden sm:inline">
            {isDemoMode ? 'حالت نمایشی فعال' : 'حالت زنده کانال'}
          </span>
          <span className="sm:hidden">{isDemoMode ? 'دمو' : 'زنده'}</span>
        </button>

        {/* Sync Button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative"
          title={`همگام‌سازی دستی داده‌ها (آخرین بروزرسانی: ${lastSyncTime})`}
        >
          <RefreshCw
            size={16}
            className={`transition-transform duration-700 ${
              isRefreshing ? 'animate-spin text-blue-400' : ''
            }`}
          />
        </button>

        {/* Quick Launch SPM AI Assistant */}
        <button
          onClick={onOpenAIAssistant}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all transform active:scale-95"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span className="hidden sm:inline">دستیار هوش مصنوعی</span>
          <span className="sm:hidden">SPM AI</span>
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative"
            aria-label="اعلان‌ها"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0B0E17]" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute left-0 mt-2 w-80 sm:w-88 rounded-2xl bg-[#0F1422] border border-white/10 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/6 text-xs">
                <span className="font-bold text-slate-200">اعلان‌های کانال و سیستم</span>
                <span className="text-slate-400 text-[10px]">
                  {unreadCount} خوانده نشده
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    هیچ اعلان جدیدی وجود ندارد.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl text-right cursor-pointer transition-colors ${
                        n.read
                          ? 'bg-white/[0.02] text-slate-400'
                          : 'bg-blue-500/10 text-slate-200 border border-blue-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span>{n.title}</span>
                        <span className="text-[9px] text-slate-400">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
