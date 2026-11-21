import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Cpu,
  FileSpreadsheet,
  FlaskConical,
  LayoutGrid,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { LabView } from './components/LabView';
import { OverviewView } from './components/OverviewView';
import { QuestionBankView } from './components/QuestionBankView';
import { QuizView } from './components/QuizView';
import { SyllabusView } from './components/SyllabusView';
import { CHAPTERS } from './data/syllabus';
import { useStudyProgress } from './hooks/useStudyProgress';

type ActiveTab = 'overview' | 'chapters' | 'lab' | 'quizzes' | 'bank';

const NAV_ITEMS: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'chapters', label: 'Chapters', icon: BookOpen },
  { id: 'lab', label: 'Interactive Lab', icon: FlaskConical },
  { id: 'quizzes', label: 'Quizzes', icon: ClipboardCheck },
  { id: 'bank', label: 'Question Bank', icon: FileSpreadsheet },
];

const THEME_STORAGE_KEY = 'deco_u24ec304_theme_v1';

export default function App() {
  const {
    progress,
    toggleChapterComplete,
    toggleChapterBookmark,
    updateChapterNote,
    setLastVisitedChapter,
    recordQuizAttempt,
    resetAllProgress,
  } = useStudyProgress();

  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    () => progress.lastVisitedChapterId || CHAPTERS[0].id,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [isDark]);

  const handleSelectChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setLastVisitedChapter(chapterId);
    setActiveTab('chapters');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completedCount = progress.completedChapterIds.length;
  const totalChapters = CHAPTERS.length;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      {/* 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigateTab('overview')}
            className="flex shrink-0 items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white">
              <Cpu className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-bold tracking-tight text-slate-900 sm:text-base dark:text-white">
                DECO Study Studio
              </div>
              <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                U24EC304 · {completedCount}/{totalChapters} done
              </div>
            </div>
          </button>

          {/* Zone 2: Primary Navigation (Desktop) */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigateTab(item.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle + Primary Action */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => handleSelectChapter(progress.lastVisitedChapterId || CHAPTERS[0].id)}
              className="hidden items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-sky-700 sm:inline-flex"
            >
              <span>Resume</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigateTab(item.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300'
                        : 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <OverviewView
            progress={progress}
            onSelectChapter={handleSelectChapter}
            onNavigateTab={handleNavigateTab}
            onResetProgress={resetAllProgress}
          />
        )}

        {activeTab === 'chapters' && (
          <SyllabusView
            selectedChapterId={selectedChapterId}
            onSelectChapter={(id) => {
              setSelectedChapterId(id);
              setLastVisitedChapter(id);
            }}
            progress={progress}
            onToggleComplete={toggleChapterComplete}
            onToggleBookmark={toggleChapterBookmark}
            onUpdateNote={updateChapterNote}
            onOpenLab={() => handleNavigateTab('lab')}
          />
        )}

        {activeTab === 'lab' && <LabView />}

        {activeTab === 'quizzes' && (
          <QuizView attempts={progress.quizAttempts} onRecordAttempt={recordQuizAttempt} />
        )}

        {activeTab === 'bank' && <QuestionBankView />}
      </main>

      {/* Compact Curriculum Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            U24EC304 · Digital Electronics &amp; Computer Organization · B.E. III Semester (CSM &amp; AIML)
          </p>
          <p className="font-mono">Units I–V · Lectures L1–L64 · Gap Topics 1–5</p>
        </div>
      </footer>
    </div>
  );
}
