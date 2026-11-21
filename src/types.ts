export type UnitId = 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4' | 'unit-5' | 'gaps';

export interface CourseOutcome {
  code: string;
  unit: string;
  description: string;
  btl: string;
  competency: string;
  strongPOs: string;
}

export interface StudyTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: string[];
  answer: string;
}

export interface ChapterImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ChapterQuickCheck {
  question: string;
  answer: string;
}

export interface Chapter {
  id: string;
  unitId: UnitId;
  unitNumber: string;
  code: string;
  title: string;
  lectures: string;
  co: string;
  btl: string;
  estimatedMinutes: number;
  summary: string;
  concepts: {
    heading: string;
    points: string[];
    formulaOrRtl?: string;
  }[];
  tables?: StudyTable[];
  examples?: WorkedExample[];
  images?: ChapterImage[];
  schematicId?: 'von-neumann' | 'adder-subtractor' | 'microprogrammed-cu' | 'dma-io' | 'cache-mapping' | 'pipeline-5stage';
  quickChecks: ChapterQuickCheck[];
  resourceIds: string[];
}

export interface SyllabusUnit {
  id: UnitId;
  numberLabel: string;
  title: string;
  subtitle: string;
  co: string;
  lecturesRange: string;
  totalLectures: number;
  examWeight: string;
  description: string;
}

export interface CourseResource {
  id: string;
  title: string;
  category: 'Syllabus & Course File' | 'Lecture Notes' | 'Solved Solutions' | 'Assignments & Tests' | 'Past Papers & Reference';
  unitLabel: string;
  url: string;
  fileType: 'PDF' | 'TXT' | 'CSV' | 'JPG';
  description: string;
}

export interface QuizQuestion {
  id: string;
  unitId: UnitId;
  co: string;
  btl: string;
  source: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizDeck {
  id: string;
  title: string;
  subtitle: string;
  unitId: UnitId | 'all';
  co: string;
  recommendedMinutes: number;
  sourceNote: string;
  questionIds: string[];
}

export interface QuestionBankItem {
  id: string;
  unitId: UnitId;
  type: 'SAQ' | 'LAQ' | 'Assignment' | 'Surprise Test' | 'University Paper';
  marks: number;
  co: string;
  btl: string;
  source: string;
  question: string;
  answer: string;
  keyPoints?: string[];
}

export interface QuizAttempt {
  id: string;
  deckId: string;
  deckTitle: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  durationSeconds: number;
  wrongQuestionIds: string[];
}

export interface StudentProgress {
  completedChapterIds: string[];
  bookmarkedChapterIds: string[];
  chapterNotes: Record<string, string>;
  quizAttempts: QuizAttempt[];
  lastVisitedChapterId: string;
}
