import React, { useState, useEffect } from 'react';
import { Sidebar, NavSection } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { ChannelAnalyticsPage } from './pages/ChannelAnalyticsPage';
import { OldVideoAuditPage } from './pages/OldVideoAuditPage';
import { TitleDescriptionOptimizerPage } from './pages/TitleDescriptionOptimizerPage';
import { ThumbnailLabPage } from './pages/ThumbnailLabPage';
import { NewMusicReleasePage } from './pages/NewMusicReleasePage';
import { ShortsFactoryPage } from './pages/ShortsFactoryPage';
import { ContentCalendarPage } from './pages/ContentCalendarPage';
import { YouTubeChangeMonitorPage } from './pages/YouTubeChangeMonitorPage';
import { MusicTrendsPage } from './pages/MusicTrendsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProjectsArchivePage } from './pages/ProjectsArchivePage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';
import { ReportsHistoryPage } from './pages/ReportsHistoryPage';

import {
  AppStoreState,
  defaultStoreState,
  loadStore,
  saveStore,
} from './services/api';
import {
  AuditReport,
  CalendarEvent,
  MusicReleaseProject,
  YouTubeVideo,
  ArtistProfile,
} from './types';

export default function App() {
  const [store, setStore] = useState<AppStoreState>(defaultStoreState);
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedAuditVideo, setSelectedAuditVideo] = useState<YouTubeVideo | null>(null);
  const [lastSyncText, setLastSyncText] = useState('همین الان');

  // Load persisted store on mount
  useEffect(() => {
    loadStore().then((loaded) => {
      setStore(loaded);
    });
  }, []);

  // Sync to persistence
  const updateStore = (updater: (prev: AppStoreState) => AppStoreState) => {
    setStore((prev) => {
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  };

  const handleToggleDemoMode = () => {
    updateStore((prev) => ({
      ...prev,
      isDemoMode: !prev.isDemoMode,
    }));
  };

  const handleRefreshData = async () => {
    setLastSyncText('چند ثانیه پیش');
    // Simulated live refresh
    updateStore((prev) => ({
      ...prev,
      channelStats: {
        ...prev.channelStats,
        lastSync: new Date().toISOString(),
      },
    }));
  };

  const handleMarkNotificationRead = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  };

  const handleAuditVideoFromDashboard = (video: YouTubeVideo) => {
    setSelectedAuditVideo(video);
    setCurrentSection('audit');
  };

  const handleSaveAuditReport = (report: AuditReport) => {
    updateStore((prev) => ({
      ...prev,
      audits: {
        ...prev.audits,
        [report.videoId]: report,
      },
      activityLogs: [
        {
          id: `log_${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: `ممیزی ویدیوی ${report.videoTitle}`,
          details: `امتیاز کیفیت متادیتا: ${report.overallScore}/۱۰۰. گزارش جدید در آرشیو ثبت شد.`,
          category: 'audit',
          status: 'success',
        },
        ...prev.activityLogs,
      ],
    }));
  };

  const handleSaveProject = (project: MusicReleaseProject) => {
    updateStore((prev) => {
      const existingIdx = prev.projects.findIndex((p) => p.id === project.id);
      const newProjects = [...prev.projects];
      if (existingIdx >= 0) {
        newProjects[existingIdx] = project;
      } else {
        newProjects.unshift(project);
      }
      return {
        ...prev,
        projects: newProjects,
        activityLogs: [
          {
            id: `log_${Date.now()}`,
            timestamp: new Date().toISOString(),
            action: `ثبت پروژه انتشار ${project.titleFa}`,
            details: `بسته استراتژی اثر با موفقیت ایجاد و ذخیره شد.`,
            category: 'release',
            status: 'success',
          },
          ...prev.activityLogs,
        ],
      };
    });
  };

  const handleDeleteProject = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleAddCalendarEvent = (event: CalendarEvent) => {
    updateStore((prev) => ({
      ...prev,
      calendarEvents: [event, ...prev.calendarEvents],
    }));
  };

  const handleUpdateEventStatus = (id: string, status: CalendarEvent['status']) => {
    updateStore((prev) => ({
      ...prev,
      calendarEvents: prev.calendarEvents.map((e) =>
        e.id === id ? { ...e, status } : e
      ),
    }));
  };

  const handleToggleSaveUpdate = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      updates: prev.updates.map((u) =>
        u.id === id ? { ...u, isSaved: !u.isSaved } : u
      ),
    }));
  };

  const handleSaveArtistProfile = (profile: ArtistProfile) => {
    updateStore((prev) => ({
      ...prev,
      artistProfile: profile,
    }));
  };

  const handleConnectAccount = (tokenOrKey: string) => {
    updateStore((prev) => ({
      ...prev,
      isAccountConnected: true,
      activityLogs: [
        {
          id: `log_${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: 'اتصال رسمی حساب یوتیوب @saeidparvaneh',
          details: 'احراز هویت موفق با Google OAuth 2.0 برای کانال سعید پروانه',
          category: 'system',
          status: 'success',
        },
        ...prev.activityLogs,
      ],
    }));
  };

  const handleDisconnectAccount = () => {
    updateStore((prev) => ({
      ...prev,
      isAccountConnected: false,
    }));
  };

  const handleTriggerWorkflow = (workflowCode: 'A' | 'B' | 'C' | 'D' | 'E') => {
    switch (workflowCode) {
      case 'A': {
        const bargardi =
          store.videos.find((v) => v.title.includes('Bargardi') || v.title.includes('برنگشتی')) ||
          store.videos[0];
        setSelectedAuditVideo(bargardi);
        setCurrentSection('audit');
        break;
      }
      case 'B':
        setCurrentSection('title_desc');
        break;
      case 'C':
        setSelectedAuditVideo(store.videos[1] || store.videos[0]);
        setCurrentSection('audit');
        break;
      case 'D':
        setCurrentSection('thumbnail');
        break;
      case 'E':
        setCurrentSection('new_release');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#E2E8F0] flex">
      {/* 1. Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={(sec) => setCurrentSection(sec)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        channelHandle={store.channelStats.handle}
        isAccountConnected={store.isAccountConnected}
        isDemoMode={store.isDemoMode}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Header */}
        <Header
          currentSection={currentSection}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenAIAssistant={() => setCurrentSection('ai_assistant')}
          isDemoMode={store.isDemoMode}
          onToggleDemoMode={handleToggleDemoMode}
          isAccountConnected={store.isAccountConnected}
          onRefreshData={handleRefreshData}
          notifications={store.notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          lastSyncTime={lastSyncText}
        />

        {/* 3. Page Body */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl w-full mx-auto">
          {currentSection === 'dashboard' && (
            <DashboardPage
              stats={store.channelStats}
              videos={store.videos}
              upcomingProjects={store.projects}
              onNavigate={(sec) => setCurrentSection(sec)}
              onAuditVideo={handleAuditVideoFromDashboard}
              isDemoMode={store.isDemoMode}
              onTriggerWorkflow={handleTriggerWorkflow}
            />
          )}

          {currentSection === 'analytics' && (
            <ChannelAnalyticsPage
              stats={store.channelStats}
              videos={store.videos}
              isDemoMode={store.isDemoMode}
            />
          )}

          {currentSection === 'audit' && (
            <OldVideoAuditPage
              videos={store.videos}
              initialVideo={selectedAuditVideo}
              onSaveAuditReport={handleSaveAuditReport}
              onNavigateToOptimizer={(trackTitle) => setCurrentSection('title_desc')}
            />
          )}

          {currentSection === 'title_desc' && <TitleDescriptionOptimizerPage />}

          {currentSection === 'thumbnail' && <ThumbnailLabPage />}

          {currentSection === 'new_release' && (
            <NewMusicReleasePage
              onSaveProject={handleSaveProject}
              existingProjects={store.projects}
            />
          )}

          {currentSection === 'shorts' && <ShortsFactoryPage />}

          {currentSection === 'calendar' && (
            <ContentCalendarPage
              events={store.calendarEvents}
              onAddEvent={handleAddCalendarEvent}
              onUpdateEventStatus={handleUpdateEventStatus}
            />
          )}

          {currentSection === 'youtube_monitor' && (
            <YouTubeChangeMonitorPage
              updates={store.updates}
              onToggleSave={handleToggleSaveUpdate}
              onRefresh={handleRefreshData}
            />
          )}

          {currentSection === 'music_trends' && (
            <MusicTrendsPage
              trends={store.trends}
              onTriggerAction={(action) => setCurrentSection('new_release')}
            />
          )}

          {currentSection === 'ai_assistant' && <AIAssistantPage />}

          {currentSection === 'projects_archive' && (
            <ProjectsArchivePage
              projects={store.projects}
              audits={store.audits}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {currentSection === 'settings' && (
            <AccountSettingsPage
              artistProfile={store.artistProfile}
              onSaveProfile={handleSaveArtistProfile}
              isAccountConnected={store.isAccountConnected}
              onConnectAccount={handleConnectAccount}
              onDisconnectAccount={handleDisconnectAccount}
              isDemoMode={store.isDemoMode}
              onToggleDemoMode={handleToggleDemoMode}
              youtubeApiKey={store.youtubeApiKey}
              onSaveApiKey={(key) => updateStore((p) => ({ ...p, youtubeApiKey: key }))}
            />
          )}

          {currentSection === 'reports' && (
            <ReportsHistoryPage
              logs={store.activityLogs}
              stats={store.channelStats}
              videos={store.videos}
              projects={store.projects}
            />
          )}
        </main>
      </div>
    </div>
  );
}
