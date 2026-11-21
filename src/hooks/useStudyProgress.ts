import { useCallback, useEffect, useState } from 'react';
import { CHAPTERS } from '../data/syllabus';
import { QuizAttempt, StudentProgress } from '../types';

const STORAGE_KEY = 'deco_u24ec304_student_progress_v1';

const DEFAULT_PROGRESS: StudentProgress = {
  completedChapterIds: [],
  bookmarkedChapterIds: [],
  chapterNotes: {},
  quizAttempts: [],
  lastVisitedChapterId: CHAPTERS[0].id,
};

function loadProgress(): StudentProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StudentProgress>;
    return {
      completedChapterIds: Array.isArray(parsed.completedChapterIds) ? parsed.completedChapterIds : [],
      bookmarkedChapterIds: Array.isArray(parsed.bookmarkedChapterIds) ? parsed.bookmarkedChapterIds : [],
      chapterNotes: parsed.chapterNotes && typeof parsed.chapterNotes === 'object' ? parsed.chapterNotes : {},
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
      lastVisitedChapterId:
        typeof parsed.lastVisitedChapterId === 'string' &&
        CHAPTERS.some((c) => c.id === parsed.lastVisitedChapterId)
          ? parsed.lastVisitedChapterId
          : CHAPTERS[0].id,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudentProgress>(loadProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota issues in restricted browsers
    }
  }, [progress]);

  const toggleChapterComplete = useCallback((chapterId: string) => {
    setProgress((prev) => {
      const exists = prev.completedChapterIds.includes(chapterId);
      return {
        ...prev,
        completedChapterIds: exists
          ? prev.completedChapterIds.filter((id) => id !== chapterId)
          : [...prev.completedChapterIds, chapterId],
      };
    });
  }, []);

  const toggleChapterBookmark = useCallback((chapterId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedChapterIds.includes(chapterId);
      return {
        ...prev,
        bookmarkedChapterIds: exists
          ? prev.bookmarkedChapterIds.filter((id) => id !== chapterId)
          : [...prev.bookmarkedChapterIds, chapterId],
      };
    });
  }, []);

  const updateChapterNote = useCallback((chapterId: string, note: string) => {
    setProgress((prev) => ({
      ...prev,
      chapterNotes: {
        ...prev.chapterNotes,
        [chapterId]: note,
      },
    }));
  }, []);

  const setLastVisitedChapter = useCallback((chapterId: string) => {
    setProgress((prev) =>
      prev.lastVisitedChapterId === chapterId ? prev : { ...prev, lastVisitedChapterId: chapterId },
    );
  }, []);

  const recordQuizAttempt = useCallback((attempt: QuizAttempt) => {
    setProgress((prev) => ({
      ...prev,
      quizAttempts: [attempt, ...prev.quizAttempts].slice(0, 30),
    }));
  }, []);

  const resetAllProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  return {
    progress,
    toggleChapterComplete,
    toggleChapterBookmark,
    updateChapterNote,
    setLastVisitedChapter,
    recordQuizAttempt,
    resetAllProgress,
  };
}
