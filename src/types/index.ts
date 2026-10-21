export type VideoType = 'music_video' | 'official_audio' | 'remix' | 'short' | 'teaser' | 'visualizer';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration?: string;
  videoType: VideoType;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  // Private / Analytics metrics if connected
  watchTimeHours?: number;
  avgViewDurationSeconds?: number;
  avgPercentageViewed?: number;
  impressions?: number;
  ctr?: number;
  returningViewers?: number;
  lastAuditDate?: string;
  optimizationStatus?: 'optimal' | 'needs_review' | 'critical_revision' | 'pending';
  qualityScore?: number;
}

export interface ChannelStats {
  channelId: string;
  channelTitle: string;
  handle: string;
  avatarUrl: string;
  customUrl: string;
  subscriberCount: number;
  totalViews: number;
  videoCount: number;
  joinedDate: string;
  country: string;
  lastSync: string;
  period: '7d' | '28d' | '90d' | '365d' | 'custom';
  periodViews: number;
  periodWatchTime: number;
  periodSubscribers: number;
  periodImpressions: number;
  periodCtr: number;
  avgDuration: string;
  trafficSources: { name: string; percentage: number; views: number }[];
  topCountries: { code: string; name: string; percentage: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
}

export interface AuditReport {
  id: string;
  videoId: string;
  videoTitle: string;
  analyzedAt: string;
  overallScore: number; // 0-100 diagnostic estimate
  currentStatus: string;
  identifiedIssues: string[];
  titleAnalysis: {
    current: string;
    strengths: string[];
    weaknesses: string[];
    score: number;
  };
  descriptionAnalysis: {
    current: string;
    strengths: string[];
    weaknesses: string[];
    missingElements: string[];
    score: number;
  };
  keywordsAndTagsAnalysis: {
    currentTags: string[];
    missingSearchTerms: string[];
    persianKeywords: string[];
    englishKeywords: string[];
    score: number;
  };
  thumbnailAnalysis: {
    currentUrl: string;
    strengths: string[];
    weaknesses: string[];
    readabilityScore: number;
    visualClarityScore: number;
    suggestedColorPalette: string[];
    recommendedComposition: string;
    imagePrompt: string;
  };
  performanceAnalysis: {
    summary: string;
    ctrAssessment: string;
    retentionAssessment: string;
    comparisonWithChannelAvg: string;
  };
  actionPriorities: {
    priority: 'high' | 'medium' | 'low';
    action: string;
    expectedImpact: string;
    implementationEffort: string;
  }[];
  newRecommendedVersion: {
    titleOptions: { title: string; style: string; rationale: string; isRecommended?: boolean }[];
    description: string;
    tags: string[];
    hashtags: string[];
  };
  measurementMethod: string;
  isApproved?: boolean;
  appliedAt?: string;
}

export interface TitleAlternative {
  id: string;
  title: string;
  type: 'persian_first' | 'english_first' | 'bilingual' | 'search_oriented' | 'brand_oriented';
  mainKeyword: string;
  intendedAudience: string;
  strategicAdvantage: string;
  potentialWeakness: string;
  mobileReadability: 'excellent' | 'good' | 'average';
  characterCount: number;
  internalScore: number; // 0-100
}

export interface ThumbnailConcept {
  id: string;
  title: string;
  composition: string;
  colorPalette: string[];
  subjectFocus: string;
  textTreatment: string;
  emotionalHook: string;
  imagePrompt: string;
  negativePrompt: string;
  aspectRatio: '16:9';
  referenceImageNotes?: string;
  visualPreviewSvg?: string;
  mobileLegibilityTips?: string;
}

export interface ShortConcept {
  id: string;
  conceptName: string;
  strategicPurpose: string;
  suggestedDuration: string;
  sourceTimestamp: string;
  hookOpeningSeconds: string;
  visualTreatment: string;
  onScreenText: string;
  caption: string;
  hashtags: string[];
  suggestedTitle: string;
  callToAction: string;
  relationshipToFullRelease: string;
  recommendedPublicationTiming: string;
  measurementCriteria: string;
}

export interface MusicReleaseProject {
  id: string;
  titleFa: string;
  titleEn: string;
  mainGenre: string;
  subGenre: string;
  language: string;
  releaseType: 'single' | 'remix' | 'ep' | 'album' | 'music_video';
  plannedReleaseDate: string;
  mood: string;
  targetAudience: string;
  lyricsExcerpt?: string;
  confirmedCredits: {
    artist: string;
    composer?: string;
    arrangement?: string;
    mixAndMaster?: string;
    lyricsBy?: string;
    coverArt?: string;
    label?: string;
  };
  format: 'music_video' | 'official_audio' | 'visualizer' | 'lyric_video';
  status: 'planning' | 'metadata_ready' | 'assets_approved' | 'scheduled' | 'released';
  approvedTitle?: string;
  approvedDescription?: string;
  approvedTags?: string[];
  approvedThumbnailPrompt?: string;
  shortsCampaign?: ShortConcept[];
  calendarTasks?: CalendarEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  projectId?: string;
  title: string;
  type: 'release' | 'music_video' | 'official_audio' | 'short_teaser' | 'release_day_short' | 'community_post' | 'thumbnail_revision' | 'metadata_review' | 'analytics_review';
  date: string;
  time?: string;
  status: 'draft' | 'approved' | 'scheduled' | 'published' | 'completed';
  notes?: string;
  channel: 'youtube_video' | 'youtube_shorts' | 'youtube_community' | 'instagram';
}

export interface YouTubeUpdateItem {
  id: string;
  headline: string;
  summary: string;
  sourceUrl: string;
  publisher: string;
  publicationDate: string;
  checkedDate: string;
  reliability: 'official_google' | 'official_youtube_creator' | 'verified_industry' | 'community_analysis';
  category: 'algorithm_recommendation' | 'shorts' | 'music_artist' | 'analytics' | 'policy_copyright' | 'metadata_seo';
  impactForMusician: string;
  recommendedAction: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  isRead: boolean;
  isSaved?: boolean;
}

export interface MusicTrendItem {
  id: string;
  title: string;
  genre: 'Deep House' | 'Techno House' | 'Persian Electronic' | 'Remix' | 'General EDM';
  type: 'trend' | 'discovery_opportunity' | 'format_experiment' | 'seasonal';
  summary: string;
  applicabilityForSaeidParvaneh: string;
  suggestedAction: string;
  expectedOutcome: string;
  confidenceScore: number;
}

export interface ArtistProfile {
  artistNameFa: string;
  artistNameEn: string;
  primaryChannelUrl: string;
  channelHandle: string;
  bioFa: string;
  bioEn: string;
  genres: string[];
  defaultCredits: {
    artist: string;
    label: string;
    publishing: string;
  };
  socialLinks: {
    youtube: string;
    spotify: string;
    instagram: string;
    appleMusic: string;
    soundcloud: string;
    telegram?: string;
  };
  titleFormatPreference: string;
  brandingGuidelines: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'alert' | 'update' | 'task' | 'audit' | 'success';
  read: boolean;
  link?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  category: 'audit' | 'optimization' | 'release' | 'system' | 'approval';
  status: 'success' | 'failed' | 'pending';
}
