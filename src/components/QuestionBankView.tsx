import React, { useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, FileText, FolderOpen, Search } from 'lucide-react';
import { QUESTION_BANK } from '../data/quizzes';
import { COURSE_RESOURCES } from '../data/syllabus';
import { QuestionBankItem, UnitId } from '../types';

export const QuestionBankView: React.FC = () => {
  const [unitFilter, setUnitFilter] = useState<'all' | UnitId>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | QuestionBankItem['type']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [resourceCategory, setResourceCategory] = useState<string>('All');

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return QUESTION_BANK.filter((item) => {
      if (unitFilter !== 'all' && item.unitId !== unitFilter) return false;
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    });
  }, [unitFilter, typeFilter, searchQuery]);

  const categories = ['All', ...Array.from(new Set(COURSE_RESOURCES.map((r) => r.category)))];
  const filteredResources = COURSE_RESOURCES.filter(
    (r) => resourceCategory === 'All' || r.category === resourceCategory,
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* Solved Question Bank Section */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs font-medium text-sky-700 dark:text-sky-400">
            SAQs (2M) · LAQs (12M) · Assignment 1 & 2 · Surprise Tests · CIE-2 Solved Answers
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            Exam Question Bank & Worked Solutions
          </h1>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SAQ, LAQ, DMA, Booth, Cache, De Morgan..."
              aria-label="Search question bank"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value as 'all' | UnitId)}
              aria-label="Filter by unit"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">All Units</option>
              <option value="unit-1">Unit I</option>
              <option value="unit-2">Unit II</option>
              <option value="unit-3">Unit III</option>
              <option value="unit-4">Unit IV</option>
              <option value="unit-5">Unit V</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'all' | QuestionBankItem['type'])}
              aria-label="Filter by question type"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">All Formats</option>
              <option value="SAQ">Short Answer (2M)</option>
              <option value="LAQ">Long Answer (12M)</option>
              <option value="Assignment">Assignments</option>
              <option value="Surprise Test">Surprise Tests</option>
            </select>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-3">
          {filteredQuestions.map((item) => {
            const open = Boolean(expandedIds[item.id]);
            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                >
                  <div className="space-y-1">
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-sky-700 dark:text-sky-400">{item.type}</span> ·{' '}
                      {item.marks} Marks · {item.co} · {item.btl} · {item.source}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.question}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-700 dark:text-sky-400">
                    <span>{open ? 'Hide' : 'Solution'}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>

                {open && (
                  <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200">
                    <p>{item.answer}</p>
                    {item.keyPoints && (
                      <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs text-emerald-700 dark:text-emerald-400">
                        {item.keyPoints.map((kp) => (
                          <li key={kp}>{kp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <p className="rounded-xl border border-slate-200 bg-white py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No question bank items matched your filter criteria.
            </p>
          )}
        </div>
      </section>

      {/* Official Course PDFs & Source Materials Library */}
      <section className="space-y-5 border-t border-slate-200 pt-8 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-medium text-sky-700 dark:text-sky-400">
              <FolderOpen className="h-4 w-4" />
              <span>Course Library · {COURSE_RESOURCES.length} Uploaded Source Files</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
              Original Lecture Notes, Solved Handouts & Past Question Papers
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setResourceCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  resourceCategory === cat
                    ? 'bg-sky-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((res) => (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-sky-700 dark:text-sky-400">{res.unitLabel}</span>
                  <span>{res.fileType}</span>
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-400">
                  {res.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {res.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-sky-700 dark:border-slate-800 dark:text-sky-400">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Open {res.fileType} Document</span>
                </span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
