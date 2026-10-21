import {
  AuditReport,
  ChannelStats,
  MusicReleaseProject,
  ShortConcept,
  ThumbnailConcept,
  TitleAlternative,
  YouTubeVideo,
  YouTubeUpdateItem,
  MusicTrendItem,
  ArtistProfile,
  CalendarEvent,
  ActivityLogItem,
  AppNotification,
} from '../types';
import {
  sampleChannelStats,
  sampleVideos,
  sampleYouTubeUpdates,
  sampleMusicTrends,
  sampleProjects,
  sampleCalendarEvents,
  sampleActivityLogs,
  initialArtistProfile,
} from '../data/initialData';

export interface AppStoreState {
  isDemoMode: boolean;
  isAccountConnected: boolean;
  connectedChannelId: string;
  youtubeApiKey: string;
  channelStats: ChannelStats;
  videos: YouTubeVideo[];
  projects: MusicReleaseProject[];
  calendarEvents: CalendarEvent[];
  updates: YouTubeUpdateItem[];
  trends: MusicTrendItem[];
  artistProfile: ArtistProfile;
  activityLogs: ActivityLogItem[];
  notifications: AppNotification[];
  audits: Record<string, AuditReport>;
}

export const defaultStoreState: AppStoreState = {
  isDemoMode: true, // Default to demo with Saeid Parvaneh's verified real data so artist has instant working environment
  isAccountConnected: false,
  connectedChannelId: 'UC_saeidparvaneh_official',
  youtubeApiKey: '',
  channelStats: sampleChannelStats,
  videos: sampleVideos,
  projects: sampleProjects,
  calendarEvents: sampleCalendarEvents,
  updates: sampleYouTubeUpdates,
  trends: sampleMusicTrends,
  artistProfile: initialArtistProfile,
  activityLogs: sampleActivityLogs,
  notifications: [
    {
      id: 'notif-1',
      title: 'فرصت بهبود متادیتای آهنگ برنگشتی',
      message: 'بررسی نشان می‌دهد با ارتقای عنوان دوزبانه و تامنیل، تا ۲٪ رشد CTR ممکن است.',
      timestamp: '۱۰ دقیقه پیش',
      type: 'audit',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'دستورالعمل جدید یوتیوب برای موزیسین‌ها',
      message: 'قابلیت Related Video در شورتس اکنون برای کانال‌های آرتیست فعال است.',
      timestamp: '۲ ساعت پیش',
      type: 'update',
      read: false,
    },
  ],
  audits: {},
};

const LOCAL_STORAGE_KEY = 'spm_youtube_ai_store_v1';

export async function loadStore(): Promise<AppStoreState> {
  try {
    // Attempt to load from server first
    const res = await fetch('/api/store');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return { ...defaultStoreState, ...data.data };
      }
    }
  } catch (err) {
    console.warn('Could not fetch server store, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      return { ...defaultStoreState, ...JSON.parse(local) };
    }
  } catch (e) {
    console.error('LocalStorage parse error:', e);
  }

  return defaultStoreState;
}

export async function saveStore(state: AppStoreState): Promise<boolean> {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  try {
    const res = await fetch('/api/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    return res.ok;
  } catch (err) {
    console.error('Server store save error:', err);
    return false;
  }
}

export async function runVideoAudit(video: YouTubeVideo): Promise<AuditReport> {
  const res = await fetch('/api/youtube/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ video }),
  });

  if (!res.ok) {
    throw new Error('خطا در ارتباط با سرور آنالیز ویدیو');
  }

  const data = await res.json();
  return {
    id: `audit_${video.id}_${Date.now()}`,
    videoId: video.id,
    videoTitle: video.title,
    analyzedAt: new Date().toISOString(),
    ...data.audit,
  };
}

export async function getTitleAlternatives(
  trackNameFa: string,
  trackNameEn: string,
  genre?: string,
  releaseType?: string
): Promise<TitleAlternative[]> {
  const res = await fetch('/api/youtube/title-optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trackNameFa, trackNameEn, genre, releaseType }),
  });

  if (!res.ok) throw new Error('خطا در تولید عنوان‌های پیشنهادی');
  const data = await res.json();
  return data.titles || [];
}

export async function getDescriptionOptimization(payload: {
  trackNameFa: string;
  trackNameEn: string;
  genre?: string;
  releaseType?: string;
  credits?: any;
  lyrics?: string;
}): Promise<any> {
  const res = await fetch('/api/youtube/description-optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('خطا در تولید دیسکریپشن');
  const data = await res.json();
  return data.result;
}

export async function getThumbnailPrompts(payload: {
  trackNameFa: string;
  trackNameEn: string;
  mood?: string;
  visualStyle?: string;
  includeArtistFace?: boolean;
}): Promise<ThumbnailConcept[]> {
  const res = await fetch('/api/youtube/thumbnail-prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('خطا در تولید پرامپت تامنیل');
  const data = await res.json();
  return data.concepts || [];
}

export async function getShortsCampaign(payload: {
  trackNameFa: string;
  trackNameEn: string;
  songDuration?: string;
  highlightsDescription?: string;
}): Promise<ShortConcept[]> {
  const res = await fetch('/api/youtube/shorts-campaign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('خطا در تدوین برنامه شورتس');
  const data = await res.json();
  return data.shorts || [];
}

export async function getOptimalReleaseTiming(): Promise<any> {
  const res = await fetch('/api/youtube/release-timing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error('خطا در دریافت زمان بهینه انتشار');
  const data = await res.json();
  return data.recommendations;
}

export async function askAIAssistant(
  message: string,
  history: any[] = [],
  contextData: any = null
): Promise<string> {
  const res = await fetch('/api/gemini/assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, contextData }),
  });

  if (!res.ok) throw new Error('خطا در پردازش پیام توسط دستیار SPM');
  const data = await res.json();
  return data.response || 'پاسخی دریافت نشد.';
}
