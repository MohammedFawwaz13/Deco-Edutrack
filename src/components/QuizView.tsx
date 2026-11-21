import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import { QUIZ_DECKS, QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizAttempt, QuizDeck, QuizQuestion } from '../types';

interface QuizViewProps {
  attempts: QuizAttempt[];
  onRecordAttempt: (attempt: QuizAttempt) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ attempts, onRecordAttempt }) => {
  const [activeDeck, setActiveDeck] = useState<QuizDeck | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answersMap, setAnswersMap] = useState<Record<string, number>>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [finishedAttempt, setFinishedAttempt] = useState<QuizAttempt | null>(null);

  const bestScoreByDeck = useMemo(() => {
    const map: Record<string, number> = {};
    attempts.forEach((a) => {
      if (map[a.deckId] === undefined || a.percentage > map[a.deckId]) {
        map[a.deckId] = a.percentage;
      }
    });
    return map;
  }, [attempts]);

  const startDeck = (deck: QuizDeck, subsetIds?: string[]) => {
    const ids = subsetIds ?? deck.questionIds;
    const qs = ids
      .map((id) => QUIZ_QUESTIONS.find((q) => q.id === id))
      .filter((q): q is QuizQuestion => Boolean(q));
    setActiveDeck(deck);
    setActiveQuestions(qs);
    setQIndex(0);
    setSelectedOption(null);
    setAnswersMap({});
    setFinishedAttempt(null);
    setStartTime(Date.now());
  };

  const currentQuestion = activeQuestions[qIndex] ?? null;

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(idx);
    setAnswersMap((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleNext = () => {
    if (!activeDeck) return;
    if (qIndex + 1 < activeQuestions.length) {
      const nextIdx = qIndex + 1;
      setQIndex(nextIdx);
      const nextQ = activeQuestions[nextIdx];
      setSelectedOption(answersMap[nextQ.id] ?? null);
    } else {
      const wrongIds: string[] = [];
      let correctCount = 0;
      activeQuestions.forEach((q) => {
        if (answersMap[q.id] === q.correctIndex) {
          correctCount += 1;
        } else {
          wrongIds.push(q.id);
        }
      });
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      const percentage = Math.round((correctCount / activeQuestions.length) * 100);
      const attempt: QuizAttempt = {
        id: `${activeDeck.id}-${Date.now()}`,
        deckId: activeDeck.id,
        deckTitle: activeDeck.title,
        timestamp: new Date().toISOString(),
        score: correctCount,
        total: activeQuestions.length,
        percentage,
        durationSeconds,
        wrongQuestionIds: wrongIds,
      };
      onRecordAttempt(attempt);
      setFinishedAttempt(attempt);
    }
  };

  // --- Summary Screen ---
  if (activeDeck && finishedAttempt) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center dark:border-slate-800">
            <div>
              <p className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400">
                Quiz Completed · {activeDeck.co}
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {activeDeck.title}
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-display text-3xl font-bold text-slate-900 tabular-nums dark:text-white">
                {finishedAttempt.score} / {finishedAttempt.total} ({finishedAttempt.percentage}%)
              </p>
              <p className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
                Duration: {finishedAttempt.durationSeconds}s
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {finishedAttempt.wrongQuestionIds.length > 0 && (
              <button
                type="button"
                onClick={() => startDeck(activeDeck, finishedAttempt.wrongQuestionIds)}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retry {finishedAttempt.wrongQuestionIds.length} Missed Question(s)</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => startDeck(activeDeck)}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700"
            >
              <Play className="h-4 w-4" />
              <span>Retake Full Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveDeck(null);
                setFinishedAttempt(null);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span>All Quiz Decks</span>
            </button>
          </div>

          {/* Review Breakdown */}
          <div className="mt-8 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Question-by-Question Review
            </h2>
            {activeQuestions.map((q, idx) => {
              const userChoice = answersMap[q.id];
              const isCorrect = userChoice === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {idx + 1}. {q.question}
                    </p>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 text-xs font-semibold ${
                        isCorrect
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    Correct Answer: <span className="font-semibold text-slate-900 dark:text-white">{q.options[q.correctIndex]}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- Active Quiz Runner ---
  if (activeDeck && currentQuestion) {
    const isAnswered = selectedOption !== null;
    const isCorrect = selectedOption === currentQuestion.correctIndex;

    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setActiveDeck(null)}
            className="font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            ← Back to Quiz Decks
          </button>
          <span className="font-mono text-slate-600 tabular-nums dark:text-slate-400">
            Question {qIndex + 1} of {activeQuestions.length} · {currentQuestion.source}
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-600 transition-all duration-300"
            style={{ width: `${((qIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100}%` }}
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="font-mono text-xs text-sky-700 dark:text-sky-400">
            {currentQuestion.co} · {currentQuestion.btl} · {currentQuestion.source}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
            {currentQuestion.question}
          </h2>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isOptionCorrect = idx === currentQuestion.correctIndex;

              let styleClass =
                'border-slate-200 bg-white text-slate-800 hover:border-sky-400 hover:bg-sky-50/40 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-sky-700';

              if (isAnswered) {
                if (isOptionCorrect) {
                  styleClass =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100';
                } else if (isSelected && !isOptionCorrect) {
                  styleClass =
                    'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-100';
                } else {
                  styleClass =
                    'border-slate-200 bg-slate-50/50 text-slate-400 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${styleClass}`}
                >
                  <span>
                    <span className="mr-2.5 font-mono text-xs font-bold opacity-70">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </span>
                  {isAnswered && isOptionCorrect && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Correct</span>
                    </span>
                  )}
                  {isAnswered && isSelected && !isOptionCorrect && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                      <XCircle className="h-4 w-4" />
                      <span>Incorrect</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 space-y-4 border-t border-slate-200 pt-5 dark:border-slate-800">
              <div
                className={`rounded-xl border p-4 text-xs leading-relaxed ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200'
                    : 'border-amber-200 bg-amber-50/70 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200'
                }`}
              >
                <p className="font-semibold">Explanation</p>
                <p className="mt-1">{currentQuestion.explanation}</p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  <span>{qIndex + 1 < activeQuestions.length ? 'Next Question' : 'Finish Quiz'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Quiz Deck Browser ---
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs font-medium text-sky-700 dark:text-sky-400">
          Active Recall & Assessment Prep · {QUIZ_QUESTIONS.length} Verified Course MCQs
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Unit Quizzes & Mock Assessments
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Questions compiled directly from Quiz 01, Google Form assessments, Surprise Tests, and the 60 Unit-Wise Course File quiz bank.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {QUIZ_DECKS.map((deck) => {
          const best = bestScoreByDeck[deck.id];
          return (
            <div
              key={deck.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-sky-700 dark:text-sky-400">{deck.co}</span>
                  <span className="tabular-nums">{deck.questionIds.length} Qs</span>
                </div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {deck.title}
                </h2>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {deck.subtitle}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{deck.sourceNote}</p>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="h-3.5 w-3.5" />
                    <span>~{deck.recommendedMinutes} min</span>
                  </span>
                  {best !== undefined ? (
                    <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-700 tabular-nums dark:text-emerald-400">
                      <Trophy className="h-3.5 w-3.5" />
                      <span>Best: {best}%</span>
                    </span>
                  ) : (
                    <span>Not attempted</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => startDeck(deck)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
