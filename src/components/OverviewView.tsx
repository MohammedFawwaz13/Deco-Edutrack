import React from 'react';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers,
  RotateCcw,
} from 'lucide-react';
import {
  ASSESSMENT_MILESTONES,
  CHAPTERS,
  COURSE_META,
  COURSE_OUTCOMES,
  SYLLABUS_UNITS,
  TEXTBOOKS_AND_REFS,
} from '../data/syllabus';
import { StudentProgress, UnitId } from '../types';

interface OverviewViewProps {
  progress: StudentProgress;
  onSelectChapter: (chapterId: string) => void;
  onNavigateTab: (tab: 'overview' | 'chapters' | 'lab' | 'quizzes' | 'bank') => void;
  onResetProgress: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  progress,
  onSelectChapter,
  onNavigateTab,
  onResetProgress,
}) => {
  const totalChapters = CHAPTERS.length;
  const completedCount = progress.completedChapterIds.length;
  const completionPct = Math.round((completedCount / totalChapters) * 100);

  const avgQuizPct =
    progress.quizAttempts.length > 0
      ? Math.round(
          progress.quizAttempts.reduce((acc, a) => acc + a.percentage, 0) /
            progress.quizAttempts.length,
        )
      : null;

  const bookmarkedChapters = CHAPTERS.filter((c) =>
    progress.bookmarkedChapterIds.includes(c.id),
  );

  const nextUnreadChapter =
    CHAPTERS.find((c) => !progress.completedChapterIds.includes(c.id)) ?? CHAPTERS[0];

  const getUnitStats = (unitId: UnitId) => {
    const unitChapters = CHAPTERS.filter((c) => c.unitId === unitId);
    const done = unitChapters.filter((c) =>
      progress.completedChapterIds.includes(c.id),
    ).length;
    const pct = unitChapters.length > 0 ? Math.round((done / unitChapters.length) * 100) : 0;
    return { total: unitChapters.length, done, pct, firstId: unitChapters[0]?.id };
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* Course Hero Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium tracking-wide text-sky-700 uppercase dark:text-sky-400">
              {COURSE_META.code} · {COURSE_META.department} · A.Y. {COURSE_META.academicYear}
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {COURSE_META.title}
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Complete chapter study deck, worked numericals, hardware sandboxes, CIE/SEE question
              bank, and unit quizzes organized directly from the LIET course file ({COURSE_META.faculty}).
            </p>
            <p className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {COURSE_META.credits} Credits · {COURSE_META.totalLectures} Lectures · CIE {COURSE_META.cieMarks} Marks + SEE {COURSE_META.seeMarks} Marks · {COURSE_META.examDuration} Exam
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectChapter(nextUnreadChapter.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <BookOpen className="h-4 w-4" />
              <span>{completedCount === 0 ? 'Start Unit I' : `Continue: ${nextUnreadChapter.code}`}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('quizzes')}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <ClipboardCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              <span>Practice Quizzes</span>
            </button>
          </div>
        </div>

        {/* 4 Single-Level KPI Summary Strip */}
        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Syllabus Mastery</p>
            <p className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {completedCount} / {totalChapters} chapters
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <p className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {completionPct}% completed
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Quiz Accuracy</p>
            <p className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {avgQuizPct !== null ? `${avgQuizPct}%` : 'No attempts yet'}
            </p>
            <p className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {progress.quizAttempts.length} quiz session{progress.quizAttempts.length === 1 ? '' : 's'} logged
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Flagged for Revision</p>
            <p className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {bookmarkedChapters.length} topic{bookmarkedChapters.length === 1 ? '' : 's'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bookmark hard topics inside any chapter
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Personal Notes Saved</p>
            <p className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {Object.values(progress.chapterNotes).filter((n) => n.trim().length > 0).length} chapters
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-saved locally in this browser
            </p>
          </div>
        </div>
      </section>

      {/* Unit-by-Unit Organizer Grid */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Syllabus Units & Progress Breakdown
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              All 5 prescribed units plus faculty-identified beyond-syllabus bridge topics.
            </p>
          </div>
          {completedCount > 0 || progress.quizAttempts.length > 0 ? (
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset local progress</span>
            </button>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SYLLABUS_UNITS.map((unit) => {
            const stats = getUnitStats(unit.id);
            const isDone = stats.done === stats.total && stats.total > 0;
            return (
              <div
                key={unit.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="font-mono text-sky-700 dark:text-sky-400">
                      {unit.numberLabel} · {unit.lecturesRange}
                    </span>
                    <span className="font-mono">{unit.co}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {unit.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {unit.description}
                  </p>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700 tabular-nums dark:text-slate-200">
                      {isDone ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <Layers className="h-3.5 w-3.5 text-slate-400" />
                          <span>
                            {stats.done} of {stats.total} chapters
                          </span>
                        </>
                      )}
                    </span>
                    <span className="font-mono text-slate-500 tabular-nums dark:text-slate-400">
                      {stats.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isDone ? 'bg-emerald-600' : 'bg-sky-600'
                      }`}
                      style={{ width: `${stats.pct}%` }}
                    />
                  </div>
                  {stats.firstId && (
                    <button
                      type="button"
                      onClick={() => onSelectChapter(stats.firstId!)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      <span>Open {unit.numberLabel} Chapters</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bookmarked Chapters & Recent Quiz Activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Revision Queue (Flagged Chapters)
            </h2>
            <Bookmark className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          {bookmarkedChapters.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              No chapters flagged yet. Use the Bookmark button inside any chapter to build your pre-exam revision list.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
              {bookmarkedChapters.map((ch) => (
                <li key={ch.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {ch.code} · {ch.title}
                    </p>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {ch.unitNumber} · {ch.lectures} · {ch.co}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectChapter(ch.id)}
                    className="text-xs font-semibold text-sky-700 hover:underline dark:text-sky-400"
                  >
                    Review
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Recent Quiz Attempts
            </h2>
            <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          </div>
          {progress.quizAttempts.length === 0 ? (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Complete any unit quiz or full mock test to track accuracy across COs.
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('quizzes')}
                className="text-xs font-semibold text-sky-700 hover:underline dark:text-sky-400"
              >
                Go to Quiz Runner →
              </button>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
              {progress.quizAttempts.slice(0, 5).map((attempt) => (
                <li key={attempt.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {attempt.deckTitle}
                    </p>
                    <p className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
                      {new Date(attempt.timestamp).toLocaleDateString()} · {attempt.durationSeconds}s
                    </p>
                  </div>
                  <span
                    className={`font-mono text-sm font-bold tabular-nums ${
                      attempt.percentage >= 70
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {attempt.score}/{attempt.total} ({attempt.percentage}%)
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Course Outcomes & Assessment Schedule */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-3 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Course Outcomes (COs · BTL Mapping)
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="py-2 pr-3 font-semibold">CO</th>
                  <th className="py-2 pr-3 font-semibold">Scope</th>
                  <th className="py-2 pr-3 font-semibold">Outcome Description</th>
                  <th className="py-2 font-semibold">BTL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {COURSE_OUTCOMES.map((co) => (
                  <tr key={co.code} className="align-top">
                    <td className="py-2.5 pr-3 font-mono font-semibold text-sky-700 dark:text-sky-400">
                      {co.code}
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                      {co.unit}
                    </td>
                    <td className="py-2.5 pr-3 leading-relaxed text-slate-700 dark:text-slate-200">
                      {co.description}
                    </td>
                    <td className="py-2.5 whitespace-nowrap font-mono text-slate-500 dark:text-slate-400">
                      {co.btl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              CIE & Assessment Roadmap
            </h2>
            <ul className="mt-3 divide-y divide-slate-100 text-xs dark:divide-slate-800">
              {ASSESSMENT_MILESTONES.map((m) => (
                <li key={m.name} className="py-2.5">
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span>{m.name}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">{m.marks}</span>
                  </div>
                  <p className="mt-0.5 text-slate-600 dark:text-slate-300">{m.scope}</p>
                  <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{m.timing}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Prescribed Textbooks
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {TEXTBOOKS_AND_REFS.map((book) => (
                <li key={book.code}>
                  <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
                    {book.code}
                  </span>{' '}
                  · <span className="font-medium text-slate-900 dark:text-slate-100">{book.title}</span> — {book.author}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
