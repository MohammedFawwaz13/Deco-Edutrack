import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  ExternalLink,
  Eye,
  FileText,
  FlaskConical,
  Search,
} from 'lucide-react';
import { CHAPTERS, COURSE_RESOURCES, SYLLABUS_UNITS } from '../data/syllabus';
import { StudentProgress } from '../types';
import { HardwareSchematic } from './Schematics';

interface SyllabusViewProps {
  selectedChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  progress: StudentProgress;
  onToggleComplete: (chapterId: string) => void;
  onToggleBookmark: (chapterId: string) => void;
  onUpdateNote: (chapterId: string, note: string) => void;
  onOpenLab: () => void;
}

type ChapterFilter = 'all' | 'remaining' | 'completed' | 'flagged';

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  selectedChapterId,
  onSelectChapter,
  progress,
  onToggleComplete,
  onToggleBookmark,
  onUpdateNote,
  onOpenLab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ChapterFilter>('all');
  const [revealedChecks, setRevealedChecks] = useState<Record<string, boolean>>({});

  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CHAPTERS.filter((ch) => {
      const isDone = progress.completedChapterIds.includes(ch.id);
      const isFlagged = progress.bookmarkedChapterIds.includes(ch.id);
      if (filter === 'remaining' && isDone) return false;
      if (filter === 'completed' && !isDone) return false;
      if (filter === 'flagged' && !isFlagged) return false;

      if (!q) return true;
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.summary.toLowerCase().includes(q) ||
        ch.unitNumber.toLowerCase().includes(q) ||
        ch.lectures.toLowerCase().includes(q) ||
        ch.concepts.some(
          (c) =>
            c.heading.toLowerCase().includes(q) ||
            c.points.some((p) => p.toLowerCase().includes(q)),
        )
      );
    });
  }, [searchQuery, filter, progress.completedChapterIds, progress.bookmarkedChapterIds]);

  const currentIndex = CHAPTERS.findIndex((c) => c.id === selectedChapterId);
  const activeChapter = CHAPTERS[currentIndex >= 0 ? currentIndex : 0];
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  const isCompleted = progress.completedChapterIds.includes(activeChapter.id);
  const isBookmarked = progress.bookmarkedChapterIds.includes(activeChapter.id);
  const noteValue = progress.chapterNotes[activeChapter.id] ?? '';

  const linkedResources = COURSE_RESOURCES.filter((r) =>
    activeChapter.resourceIds.includes(r.id),
  );

  const toggleCheckReveal = (key: string) => {
    setRevealedChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Rail: Unit & Chapter Organizer */}
        <aside className="lg:col-span-4">
          <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics, RTL, K-map, DMA..."
                  aria-label="Search syllabus topics"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 text-xs font-medium dark:bg-slate-800">
                {(['all', 'remaining', 'completed', 'flagged'] as ChapterFilter[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`rounded-md py-1.5 capitalize transition ${
                      filter === key
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 max-h-[68vh] space-y-5 overflow-y-auto pr-1">
              {SYLLABUS_UNITS.map((unit) => {
                const unitChapters = filteredChapters.filter((c) => c.unitId === unit.id);
                if (unitChapters.length === 0) return null;

                return (
                  <div key={unit.id} className="space-y-1.5">
                    <div className="flex items-center justify-between px-1 text-[11px] font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                      <span>
                        {unit.numberLabel} · {unit.lecturesRange}
                      </span>
                      <span className="font-mono">{unit.co.split(' ')[0]}</span>
                    </div>

                    <div className="space-y-1">
                      {unitChapters.map((ch) => {
                        const active = ch.id === activeChapter.id;
                        const done = progress.completedChapterIds.includes(ch.id);
                        const flagged = progress.bookmarkedChapterIds.includes(ch.id);

                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => onSelectChapter(ch.id)}
                            className={`flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition ${
                              active
                                ? 'bg-sky-50 text-sky-950 ring-1 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:ring-sky-800'
                                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/70'
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              {done ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold leading-snug">
                                <span className="font-mono text-slate-500 dark:text-slate-400">
                                  {ch.code}
                                </span>{' '}
                                {ch.title}
                              </p>
                              <p className="mt-0.5 font-mono text-[11px] text-slate-500 tabular-nums dark:text-slate-400">
                                {ch.lectures} · {ch.estimatedMinutes}m
                              </p>
                            </div>
                            {flagged && (
                              <Bookmark className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-amber-500 text-amber-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredChapters.length === 0 && (
                <p className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  No chapters match your current search/filter.
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Right Detail Pane: Active Chapter Study Deck */}
        <article className="space-y-6 lg:col-span-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            {/* Chapter Header & Controls */}
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start dark:border-slate-800">
              <div className="space-y-2">
                <p className="font-mono text-xs font-medium text-sky-700 dark:text-sky-400">
                  {activeChapter.unitNumber} · Chapter {activeChapter.code} · {activeChapter.lectures} · {activeChapter.co} · {activeChapter.btl}
                </p>
                <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  {activeChapter.title}
                </h1>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {activeChapter.summary}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleComplete(activeChapter.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                    isCompleted
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(activeChapter.id)}
                  aria-label="Flag chapter for revision"
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    isBookmarked
                      ? 'border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'Flagged' : 'Flag'}</span>
                </button>
              </div>
            </div>

            {/* Structured Study Notes */}
            <div className="mt-6 space-y-6">
              {activeChapter.concepts.map((section) => (
                <section key={section.heading} className="space-y-2.5">
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {section.heading}
                  </h2>
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {section.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600 dark:bg-sky-400" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {section.formulaOrRtl && (
                    <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-sky-300">
                      {section.formulaOrRtl}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Schematic Diagram */}
            {activeChapter.schematicId && (
              <div className="mt-8 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Architecture Schematic
                  </h2>
                  <button
                    type="button"
                    onClick={onOpenLab}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:underline dark:text-sky-400"
                  >
                    <FlaskConical className="h-3.5 w-3.5" />
                    <span>Open Interactive Sandbox</span>
                  </button>
                </div>
                <HardwareSchematic id={activeChapter.schematicId} />
              </div>
            )}

            {/* Embedded Course Images */}
            {activeChapter.images && activeChapter.images.length > 0 && (
              <div className="mt-8 space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Course Reference Diagrams
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {activeChapter.images.map((img) => (
                    <figure
                      key={img.src}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        referrerPolicy="no-referrer"
                        className="h-auto w-full rounded-lg object-contain bg-white"
                      />
                      <figcaption className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                        {img.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Tables */}
            {activeChapter.tables && activeChapter.tables.length > 0 && (
              <div className="mt-8 space-y-6">
                {activeChapter.tables.map((tbl) => (
                  <div key={tbl.title} className="space-y-2">
                    <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {tbl.title}
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          <tr>
                            {tbl.headers.map((h) => (
                              <th key={h} className="px-4 py-2.5 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
                          {tbl.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-2.5 text-slate-700 tabular-nums dark:text-slate-200 ${
                                    cIdx === 0 ? 'font-semibold text-slate-900 dark:text-white' : ''
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Worked Examples */}
            {activeChapter.examples && activeChapter.examples.length > 0 && (
              <div className="mt-8 space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Worked Exam Numericals & Proofs
                </h2>
                <div className="space-y-4">
                  {activeChapter.examples.map((ex) => (
                    <div
                      key={ex.title}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {ex.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{ex.problem}</p>
                      <ol className="mt-3 list-decimal space-y-1 pl-4 font-mono text-xs text-slate-700 tabular-nums dark:text-slate-200">
                        {ex.steps.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ol>
                      <p className="mt-3 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        Result: {ex.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Checks (Self-Test Flashcards) */}
            {activeChapter.quickChecks.length > 0 && (
              <div className="mt-8 space-y-3">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Concept Quick Checks
                </h2>
                <div className="space-y-3">
                  {activeChapter.quickChecks.map((qc, idx) => {
                    const key = `${activeChapter.id}-${idx}`;
                    const open = Boolean(revealedChecks[key]);
                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                      >
                        <button
                          type="button"
                          onClick={() => toggleCheckReveal(key)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                        >
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {qc.question}
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-700 dark:text-sky-400">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{open ? 'Hide' : 'Reveal'}</span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
                            />
                          </span>
                        </button>
                        {open && (
                          <div className="border-t border-slate-100 px-4 py-3 text-xs leading-relaxed text-emerald-800 bg-emerald-50/50 dark:border-slate-800 dark:bg-emerald-950/20 dark:text-emerald-300">
                            {qc.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Personal Study Notes */}
            <div className="mt-8 space-y-2 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="chapter-personal-notes"
                  className="font-display text-base font-bold text-slate-900 dark:text-white"
                >
                  Personal Study Notes
                </label>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Auto-saved locally
                </span>
              </div>
              <textarea
                id="chapter-personal-notes"
                rows={3}
                value={noteValue}
                onChange={(e) => onUpdateNote(activeChapter.id, e.target.value)}
                placeholder="Write formulas to memorize, tricky CIE questions, or viva points for this chapter..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            {/* Linked Source Materials */}
            {linkedResources.length > 0 && (
              <div className="mt-6 space-y-2.5">
                <h3 className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Attached Course Files for This Chapter
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {linkedResources.map((res) => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 transition hover:border-sky-400 hover:text-sky-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-300"
                    >
                      <span className="flex items-center gap-2 truncate font-medium">
                        <FileText className="h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
                        <span className="truncate">{res.title}</span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next Chapter Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
              {prevChapter ? (
                <button
                  type="button"
                  onClick={() => onSelectChapter(prevChapter.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>
                    {prevChapter.code} {prevChapter.title}
                  </span>
                </button>
              ) : (
                <span />
              )}

              {nextChapter && (
                <button
                  type="button"
                  onClick={() => onSelectChapter(nextChapter.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  <span>
                    Next: {nextChapter.code} {nextChapter.title}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
