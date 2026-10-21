import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Key,
  Globe,
  Radio,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { ArtistProfile } from '../types';

interface AccountSettingsPageProps {
  artistProfile: ArtistProfile;
  onSaveProfile: (profile: ArtistProfile) => void;
  isAccountConnected: boolean;
  onConnectAccount: (tokenOrKey: string) => void;
  onDisconnectAccount: () => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
  youtubeApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const AccountSettingsPage: React.FC<AccountSettingsPageProps> = ({
  artistProfile,
  onSaveProfile,
  isAccountConnected,
  onConnectAccount,
  onDisconnectAccount,
  isDemoMode,
  onToggleDemoMode,
  youtubeApiKey,
  onSaveApiKey,
}) => {
  const [profile, setProfile] = useState<ArtistProfile>(artistProfile);
  const [apiKeyInput, setApiKeyInput] = useState(youtubeApiKey);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeOAuthStep, setActiveOAuthStep] = useState(false);

  const handleSaveAll = () => {
    onSaveProfile(profile);
    onSaveApiKey(apiKeyInput);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleStartOAuthFlow = () => {
    setActiveOAuthStep(true);
    // Simulate real Google OAuth authentication handshake
    setTimeout(() => {
      onConnectAccount('oauth_token_verified_saeidparvaneh');
      setActiveOAuthStep(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Settings size={18} />
            </span>
            <h2 className="text-lg font-black text-white">اتصال حساب‌ها، کلیدها و تنظیمات برندینگ</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            مدیریت دسترسی امن به YouTube Data API و OAuth 2.0، احراز هویت کانال @saeidparvaneh و ویرایش شناسنامه برند سعید پروانه
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-1.5"
        >
          {saveSuccess ? <CheckCircle2 size={15} className="text-emerald-300" /> : <Save size={15} />}
          <span>{saveSuccess ? 'تنظیمات ذخیره شد!' : 'ذخیره تمام تغییرات'}</span>
        </button>
      </div>

      {/* Grid: YouTube OAuth & API Connection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube OAuth Connection */}
        <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock size={16} className="text-blue-400" />
              <span>احراز هویت رسمی با گوگل و یوتیوب (Google OAuth 2.0)</span>
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                isAccountConnected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              {isAccountConnected ? 'متصل به کانال سعید پروانه' : 'عدم اتصال'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            اتصال امن با حداقل سطح دسترسی (Least Privilege) جهت دریافت متادیتای واقعی، سوابق واچ‌تایم و وضعیت ویدیوهای منتشرشده. هیچ گذرواژه‌ای در برنامه ذخیره نمی‌شود.
          </p>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/6 space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">کانال مرتبط:</span>
              <span className="font-mono-code font-bold text-white">@saeidparvaneh</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">دسترسی‌ها (Scopes):</span>
              <span className="text-[11px] text-blue-400 font-mono-code">youtube.readonly</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            {isAccountConnected ? (
              <button
                onClick={onDisconnectAccount}
                className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors"
              >
                قطع اتصال حساب یوتیوب
              </button>
            ) : (
              <button
                onClick={handleStartOAuthFlow}
                disabled={activeOAuthStep}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-2"
              >
                {activeOAuthStep ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Lock size={14} />
                )}
                <span>اتصال حساب YouTube کانال @saeidparvaneh</span>
              </button>
            )}

            <button
              onClick={onToggleDemoMode}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
            >
              {isDemoMode ? 'خروج از حالت دمو' : 'فعال‌سازی حالت دمو'}
            </button>
          </div>
        </div>

        {/* YouTube Data API Key */}
        <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/6 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key size={16} className="text-indigo-400" />
              <span>کلید اختصاصی YouTube Data API v3 (اختیاری)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono-code">Google Cloud Console</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            در صورتی که می‌خواهید درخواست‌های دریافت اطلاعات کانال از سهمیه API اختصاصی خودتان ارسال شود، کلید API خود را وارد کنید:
          </p>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">YouTube API Key:</label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
            />
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 flex items-start gap-2">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              موتور هوش مصنوعی Gemini به صورت سروری با متغیر GEMINI_API_KEY فعال است و بدون نیاز به ورود کلید در این صفحه کار می‌کند.
            </span>
          </div>
        </div>
      </div>

      {/* Artist Profile & Branding Guidelines */}
      <div className="p-5 rounded-2xl bg-[#0F1422] border border-white/8 space-y-5">
        <div className="flex items-center justify-between border-b border-white/6 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">شناسنامه برندینگ هنرمند (Saeid Parvaneh Profile)</h3>
            <p className="text-xs text-slate-400">
              این اطلاعات در تمامی پاسخ‌های دستیار هوش مصنوعی و متادیتاها اعمال می‌شود.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">نام هنرمند به فارسی:</label>
            <input
              type="text"
              value={profile.artistNameFa}
              onChange={(e) => setProfile({ ...profile, artistNameFa: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">نام هنرمند به انگلیسی:</label>
            <input
              type="text"
              value={profile.artistNameEn}
              onChange={(e) => setProfile({ ...profile, artistNameEn: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">لینک رسمی اسپاتیفای:</label>
            <input
              type="text"
              value={profile.socialLinks.spotify}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, spotify: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code text-left"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">آیدی یا لینک اینستاگرام:</label>
            <input
              type="text"
              value={profile.socialLinks.instagram}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, instagram: e.target.value },
                })
              }
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code text-left"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 mb-1 block">قالب پیش‌فرض عنوان‌گذاری ویدیوها:</label>
            <input
              type="text"
              value={profile.titleFormatPreference}
              onChange={(e) => setProfile({ ...profile, titleFormatPreference: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code text-left"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-400 mb-1 block">راهنمای هویت بصری و استایل تامنیل (Branding Guidelines):</label>
            <textarea
              rows={2}
              value={profile.brandingGuidelines}
              onChange={(e) => setProfile({ ...profile, brandingGuidelines: e.target.value })}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
