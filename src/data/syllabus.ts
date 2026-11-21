import { Chapter, CourseOutcome, CourseResource, SyllabusUnit } from '../types';

export const COURSE_META = {
  code: 'U24EC304',
  title: 'Digital Electronics & Computer Organization',
  shortTitle: 'DECO',
  institution: 'Lords Institute of Engineering & Technology (UGC Autonomous)',
  department: 'CSE (AIML & CSM) · B.E. III Semester',
  academicYear: '2026–2027',
  faculty: 'Dr. Abdul Mateen Ahmed, Professor (ECE)',
  ltpd: '3-0-0 (5 Contact Hrs/Wk)',
  credits: 3,
  cieMarks: 40,
  seeMarks: 60,
  totalMarks: 100,
  totalLectures: 64,
  examDuration: '3 Hours',
};

export const COURSE_OUTCOMES: CourseOutcome[] = [
  {
    code: 'C31.1',
    unit: 'Unit I',
    description:
      'Illustrate the functional organization and operational concepts of a digital computer, and perform number system conversions and binary arithmetic operations.',
    btl: 'BTL 3 · Apply',
    competency: '10.1 · Comprehension of computer functional units and execution of number base conversions & binary arithmetic.',
    strongPOs: 'PO1 (3), PO2 (3), PO3 (3), PSO1 (3), PSO2 (3)',
  },
  {
    code: 'C31.2',
    unit: 'Unit II + Gaps',
    description:
      'Simplify Boolean expressions using algebraic techniques and Karnaugh maps, and design combinational and sequential logic circuits.',
    btl: 'BTL 6 · Create',
    competency: '11.1 · Minimization of switching functions and design of combinational and sequential logic circuits.',
    strongPOs: 'PO1 (3), PO2 (3), PO11 (3), PSO1 (3), PSO2 (3)',
  },
  {
    code: 'C31.3',
    unit: 'Unit III (Part A–B)',
    description:
      'Apply binary arithmetic algorithms for multiplication and division, and analyze instruction sets, instruction formats, and addressing modes.',
    btl: 'BTL 4 · Analyze',
    competency: '4.2 · Execution of multiplication/division algorithms and analysis of instruction formats and addressing modes.',
    strongPOs: 'PO1 (3), PO2 (3), PO4 (3), PSO1 (3), PSO2 (3)',
  },
  {
    code: 'C31.4',
    unit: 'Unit III (Part C)',
    description:
      'Formulate register transfer and micro-operations, and analyze the design and address sequencing of a microprogrammed control unit.',
    btl: 'BTL 4 · Analyze',
    competency: '4.2 · Formulation of register transfer micro-operations and analysis of microprogrammed control and sequencing.',
    strongPOs: 'PO1 (3), PO4 (2), PO5 (2), PSO1 (3), PSO2 (3)',
  },
  {
    code: 'C31.5',
    unit: 'Unit IV',
    description:
      'Analyze input-output data transfer mechanisms and evaluate memory hierarchy, cache mapping techniques, and storage systems.',
    btl: 'BTL 5 · Evaluate',
    competency: '7.1 · Analysis of I/O data transfer modes and evaluation of memory hierarchy, cache mapping, and storage.',
    strongPOs: 'PO1 (3), PO4 (2), PO5 (2), PSO1 (3), PSO2 (3)',
  },
  {
    code: 'C31.6',
    unit: 'Unit V',
    description:
      'Differentiate between RISC and CISC architectures and analyze pipelining concepts, pipeline hazards, and superscalar execution.',
    btl: 'BTL 4 · Analyze',
    competency: '7.1 · Architectural comparison of RISC/CISC processors and analysis of pipelining, hazards, and superscalar execution.',
    strongPOs: 'PO1 (3), PO2 (3), PO5 (2), PSO1 (3), PSO2 (3)',
  },
];

export const TEXTBOOKS_AND_REFS = [
  {
    code: 'SR1',
    title: 'Computer Systems Architecture',
    author: 'M. Morris Mano, 3rd Edition, Pearson',
  },
  {
    code: 'SR2',
    title: 'Computer Organization',
    author: 'Carl Hamacher, Zvonko Vranesic, Safwat Zaky, 5th Edition, McGraw Hill',
  },
  {
    code: 'SR3',
    title: 'Switching Theory and Logic Design',
    author: 'A. Anand Kumar, PHI Learning',
  },
  {
    code: 'SR4',
    title: 'Computer Architecture and Organization: An Integrated Approach',
    author: 'Miles Murdocca, Vincent Heuring, 2nd Edition, Wiley India',
  },
  {
    code: 'W1',
    title: 'Computer Organization and Architecture',
    author: 'William Stallings, 6th Edition, Pearson',
  },
  {
    code: 'W2',
    title: 'Digital Logic Design & Computer Organization with Computer Architecture for Security',
    author: 'Nikrouz Faroughi, McGraw Hill Education',
  },
];

export const ASSESSMENT_MILESTONES = [
  {
    name: 'Surprise Test 1',
    timing: 'After 1.5 Units (Week 5)',
    scope: 'Unit I & Unit II (Gates, SOP/POS, Adders)',
    marks: '10 Marks',
  },
  {
    name: 'Assignment 1',
    timing: 'Before CIE-1 (Due 18/09/2026)',
    scope: 'Unit I & Early Unit II (CO1, CO2)',
    marks: '10 Marks',
  },
  {
    name: 'CIE-1 (Mid-1)',
    timing: 'Weeks 1–8',
    scope: 'Units I, II & III (Part A)',
    marks: 'CIE Component',
  },
  {
    name: 'Surprise Test 2',
    timing: 'After Unit III (Week 8)',
    scope: 'Unit II & Unit III (K-Maps, Arithmetic, RTL)',
    marks: '10 Marks',
  },
  {
    name: 'Assignment 2',
    timing: 'Before CIE-2 (Unit III & IV)',
    scope: 'Division, I/O, Memory Hierarchy, RTL, DMA',
    marks: '10 Marks',
  },
  {
    name: 'Surprise Test 3 & CIE-2',
    timing: 'Weeks 9–16 (After Unit V)',
    scope: 'Units III, IV & V (Pipelining, RISC/CISC, Case Studies)',
    marks: '10 Marks / CIE-2',
  },
];

export const COURSE_RESOURCES: CourseResource[] = [
  {
    id: 'res-syllabus',
    title: 'DECO Official Syllabus (U24EC304)',
    category: 'Syllabus & Course File',
    unitLabel: 'All Units',
    url: '/assets/aistudio/Syllabus_DECO_ee3286af.pdf',
    fileType: 'PDF',
    description: 'Official B.E. III Semester curriculum syllabus, objectives, outcomes, and prescribed books.',
  },
  {
    id: 'res-course-file',
    title: 'DECO Course File & Lesson Plan (CSM-A 2026)',
    category: 'Syllabus & Course File',
    unitLabel: 'L1–L64',
    url: '/assets/aistudio/Course_File_DECO_CSM_A_2026_36e5f354',
    fileType: 'TXT',
    description: 'Complete 64-lecture lesson plan, CO-PO articulation matrix, gaps, 42 SAQs, 30 LAQs, and 60 quiz questions.',
  },
  {
    id: 'res-vision',
    title: 'Institute & Department Vision, Mission, PEOs, POs & PSOs',
    category: 'Syllabus & Course File',
    unitLabel: 'Program Matrix',
    url: '/assets/aistudio/V__M__PEOs__POs__PSOs_IT_2025-2026_ecf3b499.pdf',
    fileType: 'PDF',
    description: 'Program Educational Objectives, Program Outcomes, and Program Specific Outcomes.',
  },
  {
    id: 'res-u1-sw',
    title: 'Unit I: Software, Performance & Multiprocessors',
    category: 'Lecture Notes',
    unitLabel: 'Unit I',
    url: '/assets/aistudio/U1_Software_and_Performance_9a1d6c6d.pdf',
    fileType: 'PDF',
    description: 'System vs Application software, performance metrics, throughput/latency, and multiprocessor notes.',
  },
  {
    id: 'res-u1-datarep',
    title: 'Unit I: Data Representation & Binary Codes',
    category: 'Lecture Notes',
    unitLabel: 'Unit I',
    url: '/assets/aistudio/DECO_U1_Datarep_54befef6.pdf',
    fileType: 'PDF',
    description: 'Number base conversions, signed arithmetic, 1s/2s complements, IEEE 754, BCD, Gray, and Hamming codes.',
  },
  {
    id: 'res-u2-notes',
    title: 'Unit II: Boolean Algebra, SOP/POS & K-Maps',
    category: 'Lecture Notes',
    unitLabel: 'Unit II',
    url: '/assets/aistudio/Chap_02_P1_Boolean_Algebra_SOP_POS_d23c84de.pdf',
    fileType: 'PDF',
    description: 'Boolean theorems, duality, canonical SOP/POS, Quine-McCluskey, and 2/3/4-variable Karnaugh maps.',
  },
  {
    id: 'res-u2-stld',
    title: 'Unit II: Switching Theory & Combinational/Sequential Logic',
    category: 'Lecture Notes',
    unitLabel: 'Unit II + Gaps',
    url: '/assets/aistudio/Switching_Theory_and_Logic_Design_5da88130.pdf',
    fileType: 'PDF',
    description: 'Adders, subtractors, MUX/DEMUX, encoders, comparators, flip-flops, shift registers, counters, and FSMs.',
  },
  {
    id: 'res-u2-slides',
    title: 'Unit II: DSD Logic Gates & IC Families Handout',
    category: 'Lecture Notes',
    unitLabel: 'Unit II',
    url: '/assets/aistudio/unit2_4617b391.pdf',
    fileType: 'PDF',
    description: '12 Boolean algebra rules, De Morgan gate equivalences, universal NAND/NOR realizations, TTL/CMOS fan-out.',
  },
  {
    id: 'res-u2-aug',
    title: 'Unit II: August Lecture Deck',
    category: 'Lecture Notes',
    unitLabel: 'Unit II',
    url: '/assets/aistudio/DECO_U2_01Aug25_68c3a4f5.pdf',
    fileType: 'PDF',
    description: 'Unit II classroom slide deck on switching functions and minimization.',
  },
  {
    id: 'res-u3-slides',
    title: 'Unit III: Addressing Modes, Instruction Formats & Cycle',
    category: 'Lecture Notes',
    unitLabel: 'Unit III',
    url: '/assets/aistudio/Deco_Unit3_6b7fc3f1.pdf',
    fileType: 'PDF',
    description: 'Dr. Abdul Mateen Ahmed slides covering addressing modes, instruction classes, execution cycle, and multiplication.',
  },
  {
    id: 'res-u3-div',
    title: 'Unit III: Restoring & Non-Restoring Division Algorithms',
    category: 'Lecture Notes',
    unitLabel: 'Unit III',
    url: '/assets/aistudio/Division_Algorithm_a4cc1f32.pdf',
    fileType: 'PDF',
    description: 'Step-by-step division hardware architecture, flowcharts, and worked examples.',
  },
  {
    id: 'res-u5-risc',
    title: 'Unit V: RISC vs CISC Architecture Notes',
    category: 'Lecture Notes',
    unitLabel: 'Unit V',
    url: '/assets/aistudio/RISC_ffa13362.pdf',
    fileType: 'PDF',
    description: 'Detailed comparison of RISC and CISC philosophies, instruction pipelines, and processor examples.',
  },
  {
    id: 'res-cie2-ans',
    title: 'CIE-2 Question Bank: Complete Solved Answers',
    category: 'Solved Solutions',
    unitLabel: 'Units III–V',
    url: '/assets/aistudio/DECO_CIE2_QB_Answers_17549ffc.pdf',
    fileType: 'PDF',
    description: 'Model diagrams and full answers for SAQs 1–9 and LAQs 1–9 covering RTL, Microprogramming, DMA, Cache, and Pipelining.',
  },
  {
    id: 'res-cie2-stu',
    title: 'CIE-2 Student Question Bank Solutions',
    category: 'Solved Solutions',
    unitLabel: 'Units III–V',
    url: '/assets/aistudio/DECO_CIE-2_QB_for_students_Solutions_57c90199.pdf',
    fileType: 'PDF',
    description: 'Companion solved question bank for CIE-2 exam preparation.',
  },
  {
    id: 'res-ast2-ans',
    title: 'Assignment 2 Complete Worked Answers',
    category: 'Solved Solutions',
    unitLabel: 'Units III–IV',
    url: '/assets/aistudio/DECO_Assignment2_Answers_fc616205.pdf',
    fileType: 'PDF',
    description: 'Solved Assignment 2 covering Division Algorithm, I/O Peripheral Organization, Memory Hierarchy, Micro-ops, and DMA.',
  },
  {
    id: 'res-ast1',
    title: 'Unit I Assignment Sheets',
    category: 'Assignments & Tests',
    unitLabel: 'Unit I',
    url: '/assets/aistudio/DECO_Ast_Unit1_6057c128.pdf',
    fileType: 'PDF',
    description: 'Unit I assignment problem set on functional units, buses, and conversions.',
  },
  {
    id: 'res-quiz01',
    title: 'QUIZ 01: Unit I Assessment Paper',
    category: 'Assignments & Tests',
    unitLabel: 'Unit I',
    url: '/assets/aistudio/QUIZ_01_4ed421c8.pdf',
    fileType: 'PDF',
    description: '20-mark Quiz 01 paper (MCQs, SAQs, True/False, LAQ, and Binary-to-Gray bonus).',
  },
  {
    id: 'res-st2',
    title: 'Assignment 1 & Surprise Test 2 Paper',
    category: 'Assignments & Tests',
    unitLabel: 'Units I–II',
    url: '/assets/aistudio/Surprise_Test_2_2c0fd452.pdf',
    fileType: 'PDF',
    description: 'Official Surprise Test question paper on gates, SOP/POS, majority detector, and full adder.',
  },
  {
    id: 'res-st4',
    title: 'Surprise Test 4 Question Paper',
    category: 'Assignments & Tests',
    unitLabel: 'Units IV–V',
    url: '/assets/aistudio/Surprise_Test_4__e0adcd71.pdf',
    fileType: 'PDF',
    description: 'Late-semester surprise test covering memory and pipelining concepts.',
  },
  {
    id: 'res-qp-prev',
    title: 'Previous University Question Papers (Malla Reddy / OU Pattern)',
    category: 'Past Papers & Reference',
    unitLabel: 'All Units',
    url: '/assets/aistudio/COMPUTER_ORGANIZATION_Question_papers_bb45a08d.pdf',
    fileType: 'PDF',
    description: 'Archive of R15, R17, R18, and R20 previous semester exam question papers for practice.',
  },
];

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  {
    id: 'unit-1',
    numberLabel: 'Unit I',
    title: 'Basic Structure of Computers & Data Representation',
    subtitle: 'Functional Units, System Buses, Performance & Number Systems',
    co: 'CO1 (C31.1)',
    lecturesRange: 'L1 – L15',
    totalLectures: 15,
    examWeight: 'CIE-1 + SEE',
    description:
      'Establishes hardware organization (Input, Output, Memory, ALU, CU), Von Neumann architecture, bus structures, software layers, performance equations, multiprocessors vs multicomputers, radix conversions, signed arithmetic, IEEE 754 floating-point, and binary/error codes.',
  },
  {
    id: 'unit-2',
    numberLabel: 'Unit II',
    title: 'Switching Theory & Digital Logic Circuits',
    subtitle: 'Boolean Algebra, K-Maps, Combinational & Sequential Circuits',
    co: 'CO2 (C31.2)',
    lecturesRange: 'L16 – L28',
    totalLectures: 13,
    examWeight: 'CIE-1 + SEE',
    description:
      'Covers Boolean postulates, De Morgan laws, universal NAND/NOR synthesis, canonical SOP/POS, 2/3/4-variable Karnaugh maps, Quine-McCluskey minimization, adders (HA, FA, Ripple, CLA, BCD), latches, flip-flops, shift registers, counters, decoders, and FSMs.',
  },
  {
    id: 'gaps',
    numberLabel: 'Gap Topics',
    title: 'Beyond-Syllabus Combinational Modules',
    subtitle: 'Faculty-Identified Industry & Curriculum Bridges',
    co: 'CO2 (C31.2)',
    lecturesRange: 'Gap 1 – Gap 5',
    totalLectures: 5,
    examWeight: 'Viva + Bridge',
    description:
      'Five essential digital logic building blocks identified by Dr. Abdul Mateen Ahmed to bridge syllabus gaps: Subtractors (Half/Full), Magnitude Comparators, Encoders (Priority), Multiplexers (MUX), and Demultiplexers (DEMUX).',
  },
  {
    id: 'unit-3',
    numberLabel: 'Unit III',
    title: 'Computer Arithmetic & Basic Processing Unit',
    subtitle: 'Multiplication/Division, ISA, RTL & Microprogrammed Control',
    co: 'CO3 & CO4 (C31.3, C31.4)',
    lecturesRange: 'L29 – L41',
    totalLectures: 13,
    examWeight: 'CIE-1/2 + SEE',
    description:
      'Covers unsigned & Booth signed multiplication, Restoring & Non-Restoring division, instruction formats (0/1/2/3-address), addressing modes, machine instruction classes, 6-step execution cycle, RTL micro-operations, and Microprogrammed vs Hardwired control.',
  },
  {
    id: 'unit-4',
    numberLabel: 'Unit IV',
    title: 'Input/Output & Memory Organization',
    subtitle: 'Interfaces, Asynchronous Transfer, Interrupts, DMA, Hierarchy & Cache',
    co: 'CO5 (C31.5)',
    lecturesRange: 'L42 – L55',
    totalLectures: 14,
    examWeight: 'CIE-2 + SEE',
    description:
      'Explores peripheral interfacing, Isolated vs Memory-Mapped I/O, Strobe & Handshaking asynchronous transfer, Programmed/Interrupt/DMA modes, SRAM/DRAM/ROM, memory hierarchy, Direct/Associative/Set-Associative cache mapping, hit ratio, and virtual memory.',
  },
  {
    id: 'unit-5',
    numberLabel: 'Unit V',
    title: 'Pipelining & RISC / CISC Architectures',
    subtitle: 'RISC vs CISC, 5-Stage Pipeline, Data & Control Hazards, Superscalar',
    co: 'CO6 (C31.6)',
    lecturesRange: 'L56 – L64',
    totalLectures: 9,
    examWeight: 'CIE-2 + SEE',
    description:
      'Contrasts CISC and RISC philosophies, derives pipeline speedup S = n·k/(k+n-1), details IF/ID/EX/MEM/WB datapath & control registers, resolves structural, RAW/WAR/WAW data hazards (stalls, forwarding), control hazards (branch prediction), and superscalar ILP.',
  },
];

export const CHAPTERS: Chapter[] = [
  // ==================== UNIT I ====================
  {
    id: 'u1-ch1-functional-units',
    unitId: 'unit-1',
    unitNumber: 'Unit I',
    code: '1.1',
    title: 'Basic Structure, Functional Units & Von Neumann Architecture',
    lectures: 'L1 – L3',
    co: 'CO1 (C31.1)',
    btl: 'BTL 2 · Understand',
    estimatedMinutes: 25,
    summary:
      'How the five classic functional units collaborate under the stored-program Von Neumann model to fetch, decode, and execute instructions sequentially.',
    concepts: [
      {
        heading: 'Five Functional Units of a Digital Computer',
        points: [
          'Input Unit: Accepts coded information from human operators or other devices (keyboard, mouse, scanner) and encodes it into binary for memory storage.',
          'Memory Unit: Stores both program instructions and operands. Primary memory (RAM) is fast, word-addressable, and volatile; Secondary storage (SSD/HDD) retains bulk data.',
          'Arithmetic & Logic Unit (ALU): Executes arithmetic (+, −, ×, ÷) and logical (AND, OR, NOT, compare) operations on operands placed in processor registers.',
          'Control Unit (CU): The nerve center that issues timing and control signals to coordinate instruction fetch, memory reads/writes, ALU actions, and I/O.',
          'Output Unit: Counterpart of the Input Unit; sends processed binary results to external displays, printers, or actuators.',
        ],
      },
      {
        heading: 'Von Neumann Architecture & Key Characteristics',
        points: [
          'Single Memory Space: Instructions and data share one unified main memory addressable over a common system bus.',
          'Sequential Fetch–Decode–Execute Cycle: Program Counter (PC) points to the next instruction; Instruction Register (IR) holds the active instruction; MAR and MDR interface with memory.',
          'Von Neumann Bottleneck: Shared single bus limits bandwidth because instruction fetches and data transfers cannot occur simultaneously without caching.',
        ],
      },
      {
        heading: 'Basic Operational Steps (ADD LOCA, R0)',
        points: [
          'Step 1 (Fetch): PC → MAR; Memory Read brings instruction into MDR → IR; PC increments to point to the next instruction.',
          'Step 2 (Decode): Control Unit decodes opcode and operand address LOCA.',
          'Step 3 (Operand Fetch): LOCA → MAR; Memory Read places operand M[LOCA] into MDR.',
          'Step 4 (Execute): ALU adds R0 and MDR, storing the sum back into R0.',
        ],
        formulaOrRtl: 'PC → MAR → MDR → IR ;  MAR ← LOCA ;  R0 ← R0 + MDR',
      },
    ],
    images: [
      {
        src: '/assets/aistudio/DECO1_1cb5244a.JPG',
        alt: 'Von Neumann Architecture showing CPU, Control Unit, ALU, Cache, Bus Bottleneck, and Main Memory',
        caption: 'Fig 1.1 Course Slide — Von Neumann Architecture & CPU–Memory Bus Bottleneck.',
      },
    ],
    schematicId: 'von-neumann',
    quickChecks: [
      {
        question: 'Which register holds the memory address of the next instruction to be fetched?',
        answer: 'Program Counter (PC). (IR holds the current instruction; MAR holds the address for the active memory transfer.)',
      },
      {
        question: 'What causes the Von Neumann bottleneck?',
        answer: 'Sharing a single memory space and single bus for both instructions and data restricts simultaneous instruction fetch and data access.',
      },
    ],
    resourceIds: ['res-u1-sw', 'res-course-file'],
  },
  {
    id: 'u1-ch2-bus-sw-perf',
    unitId: 'unit-1',
    unitNumber: 'Unit I',
    code: '1.2',
    title: 'Bus Structures, Software, Performance & Multiprocessors',
    lectures: 'L4 – L5',
    co: 'CO1 (C31.1)',
    btl: 'BTL 3 · Apply',
    estimatedMinutes: 25,
    summary:
      'Single vs multi-bus interconnections, System vs Application software hierarchy, processor performance metrics, and shared-memory vs distributed-memory systems.',
    concepts: [
      {
        heading: 'Bus Structures & Signal Groups',
        points: [
          'A Bus is a shared group of parallel wires connecting CPU, memory, and I/O peripherals.',
          'Data Bus (Bidirectional): Carries instruction words and data; width (e.g., 32-bit, 64-bit) defines word transfer capacity.',
          'Address Bus (Unidirectional from CPU): Carries memory/I/O addresses; n address lines address up to 2^n locations.',
          'Control Bus (Mixed): Carries Read/Write, Clock, Interrupt Request/Ack, and Bus Request/Grant signals.',
          'Single-Bus (low cost, sequential sharing) vs Multi-Bus (dedicated memory/I/O buses for higher concurrency and throughput).',
        ],
      },
      {
        heading: 'System Software vs Application Software',
        points: [
          'System Software manages hardware resources and translates programs: Operating System (scheduling, memory/I/O management), Compiler, Assembler, Linker, Loader, Device Drivers.',
          'Application Software solves user-facing tasks (browsers, CAD tools, spreadsheets, ML pipelines) by invoking OS system calls.',
        ],
      },
      {
        heading: 'Performance Metrics & Optimization',
        points: [
          'Basic Performance Equation: T = (N × S) / R, where N = dynamic instruction count, S = average cycles per instruction (CPI), and R = clock rate (Hz).',
          'Execution Time (Latency): Time to finish one task. Throughput: Tasks completed per unit time. Increasing clock rate R or reducing N and CPI (via pipelining and cache) improves performance.',
        ],
        formulaOrRtl: 'Execution Time  T = (N × CPI) / f_clock    |    Speedup = T_old / T_new',
      },
    ],
    tables: [
      {
        title: 'Multiprocessors vs Multicomputers',
        headers: ['Feature', 'Multiprocessor (Shared Memory)', 'Multicomputer (Distributed Memory)'],
        rows: [
          ['Memory Architecture', 'Single global physical address space shared by all CPUs', 'Each processor node has private local memory'],
          ['Communication', 'Via shared variables in common memory (UMA/NUMA)', 'Via explicit message passing over interconnection network'],
          ['Programming Complexity', 'Easier programming; requires locks/synchronization', 'Requires explicit send/receive messaging (MPI)'],
          ['Scalability & Examples', 'Moderate scalability; multi-core servers, symmetric MP', 'High scalability; compute clusters, supercomputers'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'If a program executes N = 2×10⁹ instructions with CPI = 1.5 on a 3 GHz CPU, what is the CPU execution time?',
        answer: 'T = (2×10⁹ × 1.5) / (3×10⁹) = 1.0 second.',
      },
      {
        question: 'What is the core architectural difference between a multiprocessor and a multicomputer?',
        answer: 'Multiprocessors share a single global memory space; multicomputers use distributed private memories communicating via message passing.',
      },
    ],
    resourceIds: ['res-u1-sw', 'res-ast1'],
  },
  {
    id: 'u1-ch3-number-systems',
    unitId: 'unit-1',
    unitNumber: 'Unit I',
    code: '1.3',
    title: 'Number Systems, Base Conversions & Fixed/Floating Point',
    lectures: 'L6 – L10',
    co: 'CO1 (C31.1)',
    btl: 'BTL 3 · Apply',
    estimatedMinutes: 30,
    summary:
      'Positional number representations (Binary, Octal, Decimal, Hexadecimal), fractional conversions, and IEEE 754 single-precision floating-point encoding.',
    concepts: [
      {
        heading: 'Positional Number Systems & Direct Grouping',
        points: [
          'Any number in radix r has positional weights r^k. Decimal (r=10), Binary (r=2), Octal (r=8), Hexadecimal (r=16, digits 0–9, A–F).',
          'Decimal to Base-r: Repeatedly divide the integer part by r (read remainders bottom-to-top) and repeatedly multiply the fractional part by r (read carries top-to-bottom).',
          'Binary ↔ Octal: Group bits in 3s from the binary point. Binary ↔ Hex: Group bits in 4s from the binary point.',
        ],
      },
      {
        heading: 'Fixed-Point vs IEEE 754 Floating-Point',
        points: [
          'Fixed-Point fixes the binary point position (simple hardware, narrow dynamic range).',
          'IEEE 754 Single-Precision (32-bit): Sign S (1 bit: 0=+, 1=−) | Biased Exponent E (8 bits, bias = 127) | Normalized Mantissa M (23 bits, implicit leading 1).',
          'Value = (−1)^S × (1.M)_2 × 2^(E − 127).',
        ],
        formulaOrRtl: 'IEEE 754 (32-bit):  [ S (1b) | E = e + 127 (8b) | Fraction M (23b) ]',
      },
    ],
    examples: [
      {
        title: 'Convert (7562.45)₁₀ to Octal (Course File LAQ 7)',
        problem: 'Convert decimal 7562.45 into base 8.',
        steps: [
          'Integer part: 7562 ÷ 8 = 945 rem 2; 945 ÷ 8 = 118 rem 1; 118 ÷ 8 = 14 rem 6; 14 ÷ 8 = 1 rem 6; 1 ÷ 8 = 0 rem 1 → (16612)₈.',
          'Fractional part: 0.45 × 8 = 3.60 (3); 0.60 × 8 = 4.80 (4); 0.80 × 8 = 6.40 (6); 0.40 × 8 = 3.20 (3) → (0.3463...)₈.',
        ],
        answer: '(16612.3463)₈',
      },
      {
        title: 'IEEE 754 Single-Precision for +12.5 (Quiz Q10)',
        problem: 'Encode +12.5 in 32-bit IEEE 754 format.',
        steps: [
          'Sign S = 0 (positive).',
          '12.5₁₀ = 1100.1₂ = 1.1001₂ × 2³ (normalized exponent e = 3).',
          'Biased exponent E = 3 + 127 = 130 = 10000010₂.',
          'Mantissa M (fractional bits after 1.) = 1001 followed by 19 zeros.',
        ],
        answer: '0 | 10000010 | 10010000000000000000000  (Hex: 41480000₁₆)',
      },
    ],
    quickChecks: [
      {
        question: 'Convert (520)₁₀ to Hexadecimal and (480)₁₀ to Octal.',
        answer: '520 ÷ 16 = 32 R8, 32 ÷ 16 = 2 R0 → (208)₁₆. 480 ÷ 8 = 60 R0, 60 ÷ 8 = 7 R4 → (740)₈.',
      },
      {
        question: 'How many unique values can be represented with 8 bits?',
        answer: '2⁸ = 256 unique values (0 to 255 unsigned, or −128 to +127 in 2s complement).',
      },
    ],
    resourceIds: ['res-u1-datarep', 'res-quiz01', 'res-st2'],
  },
  {
    id: 'u1-ch4-signed-codes',
    unitId: 'unit-1',
    unitNumber: 'Unit I',
    code: '1.4',
    title: 'Complements, Signed Arithmetic & Binary/Error Codes',
    lectures: 'L11 – L15',
    co: 'CO1 (C31.1)',
    btl: 'BTL 3 · Apply',
    estimatedMinutes: 30,
    summary:
      '1s and 2s complement arithmetic, overflow detection, BCD (8421), Excess-3, Gray code conversion, ASCII/Unicode, and Hamming error-correcting codes.',
    concepts: [
      {
        heading: 'Signed Binary Representations',
        points: [
          'Sign-Magnitude: MSB is sign (0/1), remaining n−1 bits hold magnitude; has two zeros (+0, −0).',
          '1s Complement: Invert every bit of positive number for negative; subtraction uses end-around carry if carry-out is 1; still has +0 and −0.',
          '2s Complement: Invert bits + 1. Unique zero, range [−2^(n−1), +2^(n−1)−1]. Subtraction A − B = A + (2s comp of B).',
          'Signed Overflow Rule: Overflow occurs when adding two numbers of the same sign gives the opposite sign, equivalently V = C_in(MSB) ⊕ C_out(MSB).',
        ],
      },
      {
        heading: 'Weighted, Non-Weighted & Error Codes',
        points: [
          'BCD (8421): Weighted 4-bit code per decimal digit (0000–1001). During BCD addition, if 4-bit sum > 9 or Carry = 1, add 0110 (6) to correct.',
          'Excess-3 (XS-3): Unweighted, self-complementing code obtained by adding 0011 (3) to each BCD digit.',
          'Gray Code: Unweighted unit-distance code where successive values differ by exactly 1 bit (reduces switching errors in encoders/K-maps).',
          'Binary → Gray: G_msb = B_msb; G_i = B_(i+1) ⊕ B_i. Gray → Binary: B_msb = G_msb; B_i = B_(i+1) ⊕ G_i.',
          'Error Detection & Correction: Parity bit detects single-bit errors; Hamming Code places redundant parity bits at powers of 2 (1, 2, 4, 8...) to detect 2-bit and correct 1-bit errors.',
        ],
        formulaOrRtl: 'Gray→Bin: B_n = G_n, B_i = B_(i+1) ⊕ G_i   |   BCD Fix: Sum > 9 ⇒ Sum + 0110',
      },
    ],
    examples: [
      {
        title: 'Represent −15 and −18 in 8-bit 2s Complement',
        problem: 'Find 8-bit 2s complement of −15 and −18.',
        steps: [
          '+15 = 00001111₂ → 1s comp = 11110000₂ → +1 = 11110001₂.',
          '+18 = 00010010₂ → 1s comp = 11101101₂ → +1 = 11101110₂.',
        ],
        answer: '−15 = 11110001₂  |  −18 = 11101110₂',
      },
      {
        title: 'Convert Gray Code 1011 and 0011 to Binary (SAQ 9)',
        problem: 'Decode Gray codes 1011 and 0011 into Binary.',
        steps: [
          'For 1011: B3=1; B2=1⊕0=1; B1=1⊕1=0; B0=0⊕1=1 → 1101₂.',
          'For 0011: B3=0; B2=0⊕0=0; B1=0⊕1=1; B0=1⊕1=0 → 0010₂.',
        ],
        answer: '1011_Gray = 1101₂ (13)  |  0011_Gray = 0010₂ (2)',
      },
    ],
    quickChecks: [
      {
        question: 'Perform (+19) − (+43) using 8-bit 2s complement arithmetic.',
        answer: '+19 = 00010011; +43 = 00101011 → −43 = 11010101. Sum = 11101000₂ (negative, 2s comp magnitude = 00011000 = 24) → −24.',
      },
      {
        question: 'Convert binary 110101 to Gray code (Quiz 01 Bonus).',
        answer: 'G5=1, G4=1⊕1=0, G3=1⊕0=1, G2=0⊕1=1, G1=1⊕0=1, G0=0⊕1=1 → 101111.',
      },
    ],
    resourceIds: ['res-u1-datarep', 'res-quiz01', 'res-st2'],
  },

  // ==================== UNIT II ====================
  {
    id: 'u2-ch1-boolean-gates',
    unitId: 'unit-2',
    unitNumber: 'Unit II',
    code: '2.1',
    title: 'Boolean Algebra, Logic Gates & Universal Gate Synthesis',
    lectures: 'L16 – L19',
    co: 'CO2 (C31.2)',
    btl: 'BTL 3 · Apply',
    estimatedMinutes: 30,
    summary:
      'The 12 Boolean laws, Principle of Duality, De Morgan theorems, basic/derived logic gates, and realizing any Boolean function using only NAND or NOR gates.',
    concepts: [
      {
        heading: 'Core Boolean Laws & Theorems',
        points: [
          'Identity: A + 0 = A, A · 1 = A  |  Null/Dominance: A + 1 = 1, A · 0 = 0.',
          'Idempotent: A + A = A, A · A = A  |  Complement: A + A\' = 1, A · A\' = 0.',
          'Absorption: A + AB = A  |  Redundant Literal Rule: A + A\'B = A + B.',
          'Distributive: A(B + C) = AB + AC and (A + B)(A + C) = A + BC.',
          'De Morgan\'s Laws: (A · B)\' = A\' + B\' (NAND ≡ Bubbled-OR) and (A + B)\' = A\' · B\' (NOR ≡ Bubbled-AND).',
          'Consensus Theorem: AB + A\'C + BC = AB + A\'C (BC is redundant).',
        ],
      },
      {
        heading: 'Universal Gates (NAND & NOR)',
        points: [
          'Why Universal? Both NAND and NOR alone can synthesize NOT, AND, and OR—hence any combinational or sequential circuit.',
          'NAND Realizations: NOT(A) = NAND(A,A) (1 gate); AND(A,B) = NAND(NAND(A,B)) (2 gates); OR(A,B) = NAND(A\',B\') (3 gates). SOP circuits map directly to 2-level NAND–NAND.',
          'NOR Realizations: NOT(A) = NOR(A,A) (1 gate); OR(A,B) = NOR(NOR(A,B)) (2 gates); AND(A,B) = NOR(A\',B\') (3 gates). POS circuits map directly to 2-level NOR–NOR.',
        ],
        formulaOrRtl: '(A·B)\' = A\' + B\'   |   (A + B)\' = A\'·B\'   |   A ⊕ B = A\'B + AB\'',
      },
    ],
    images: [
      {
        src: '/assets/aistudio/andornot_8662986d.JPG',
        alt: 'Logic Gate symbols for AND, OR, NOT, and NAND',
        caption: 'Fig 2.1 Course Reference — Standard Logic Gate Symbols (AND, OR, NOT, NAND).',
      },
      {
        src: '/assets/aistudio/Nandand_Nor_54c707f9.JPG',
        alt: 'Truth behavior and gate rules for AND, NAND, OR, and NOR',
        caption: 'Fig 2.2 Course Reference — AND, NAND, OR, and NOR Truth Conditions.',
      },
      {
        src: '/assets/aistudio/Xor_b0f26fef.JPG',
        alt: 'XOR and XNOR gate symbols and rules',
        caption: 'Fig 2.3 Course Reference — Exclusive-OR (XOR) and Exclusive-NOR (XNOR).',
      },
    ],
    examples: [
      {
        title: 'Simplify AB + A(B + C) + B(B + C)',
        problem: 'Reduce the expression to minimum gates using Boolean rules.',
        steps: [
          'Distribute: AB + AB + AC + BB + BC.',
          'Apply BB = B and AB + AB = AB: AB + AC + B + BC.',
          'Apply B + BC = B: AB + AC + B.',
          'Apply B + AB = B (Absorption): B + AC.',
        ],
        answer: 'B + AC',
      },
    ],
    quickChecks: [
      {
        question: 'How many 2-input NAND gates are needed to build a 2-input OR gate?',
        answer: '3 NAND gates: two to invert A and B (A\', B\'), and one to NAND them → (A\'·B\')\' = A + B.',
      },
      {
        question: 'Simplify F = A + A\'B.',
        answer: 'A + B (Redundant Literal Rule).',
      },
    ],
    resourceIds: ['res-u2-slides', 'res-u2-notes', 'res-st2'],
  },
  {
    id: 'u2-ch2-sop-kmaps',
    unitId: 'unit-2',
    unitNumber: 'Unit II',
    code: '2.2',
    title: 'Canonical SOP/POS Forms, Karnaugh Maps & Quine-McCluskey',
    lectures: 'L20 – L22',
    co: 'CO2 (C31.2)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 35,
    summary:
      'Minterms vs Maxterms, converting arbitrary expressions into canonical forms, and minimizing switching functions using 2/3/4-variable K-Maps with Don\'t Cares.',
    concepts: [
      {
        heading: 'Canonical & Standard Forms',
        points: [
          'Minterm (m_i): Product term containing all n variables (1 → uncomplemented, 0 → complemented). Canonical SOP sums minterms: F = Σm(...).',
          'Maxterm (M_i): Sum term containing all n variables (0 → uncomplemented, 1 → complemented). Canonical POS multiplies maxterms: F = ΠM(...).',
          'Duality & Complement: m_i\' = M_i. If F(A,B,C) = Σm(1,4,7), then F(A,B,C) = ΠM(0,2,3,5,6).',
        ],
      },
      {
        heading: 'Karnaugh Map (K-Map) Rules & Quine-McCluskey',
        points: [
          'Cells are ordered in Gray Code (00, 01, 11, 10) so adjacent cells differ by only 1 variable, including wrap-around edges and corners.',
          'Group sizes must be powers of 2 (1, 2, 4, 8, 16). Larger groups eliminate more variables (in 4-var: 2-cell eliminates 1 var, 4-cell eliminates 2, 8-cell eliminates 3).',
          'Don\'t Care (X): Invalid/unused states (like BCD 10–15) may be treated as 1 (in SOP) or 0 (in POS) only if they enlarge a group.',
          'Quine-McCluskey (Tabular Method): Exact algorithmic minimization for ≥5 variables by grouping minterms by 1-count and finding Prime Implicants.',
        ],
        formulaOrRtl: 'SOP Groups 1s → Product Terms   |   POS Groups 0s → Sum Terms',
      },
    ],
    examples: [
      {
        title: 'Surprise Test Problem: Minimize F(A,B,C) = Σm(1, 2, 7) and F = ΠM(0, 1, 4, 6)',
        problem: 'Simplify both functions using 3-variable K-maps.',
        steps: [
          'For Σm(1,2,7): m1 = A\'B\'C, m2 = A\'BC\', m7 = ABC. None of these three minterms are adjacent in Gray order! Minimum SOP = A\'B\'C + A\'BC\' + ABC.',
          'For ΠM(0,1,4,6): Place 0s at 000, 001, 100, 110. Group (M0, M1) → (A + B); Group (M0, M4) → (B + C); Group (M4, M6) → (A\' + C). Minimum POS = (A+B)(B+C)(A\'+C), or (A+B)(A\'+C) since (B+C) is covered by consensus.',
        ],
        answer: 'F₁ = A\'B\'C + A\'BC\' + ABC   |   F₂ = (A + B)(A\' + C)',
      },
      {
        title: 'Course File Quiz Q14: Minimize F(A,B,C) = Σm(1,3,5,7)',
        problem: 'Find the minimal expression for odd minterms 1, 3, 5, 7.',
        steps: [
          'Binary values: 001, 011, 101, 111. All four cells lie in the C = 1 column of the 3-variable K-map.',
          'A 4-cell group eliminates 2 variables (A and B), leaving only C.',
        ],
        answer: 'F = C',
      },
    ],
    quickChecks: [
      {
        question: 'How many cells are in a 4-variable K-map, and how many literals remain in an 8-cell group?',
        answer: '2⁴ = 16 cells. An 8-cell group eliminates 3 variables, yielding a 1-literal term.',
      },
      {
        question: 'If F(x,y,z) = ΠM(0,2,4,5), what is its canonical SOP form?',
        answer: 'List missing indices: F(x,y,z) = Σm(1,3,6,7).',
      },
    ],
    resourceIds: ['res-u2-notes', 'res-u2-aug', 'res-st2'],
  },
  {
    id: 'u2-ch3-combinational',
    unitId: 'unit-2',
    unitNumber: 'Unit II',
    code: '2.3',
    title: 'Combinational Circuits: Adders, Subtractor & Decoders',
    lectures: 'L23 – L25, L28',
    co: 'CO2 (C31.2)',
    btl: 'BTL 6 · Create',
    estimatedMinutes: 35,
    summary:
      'Design procedure for combinational circuits: Half Adder, Full Adder, 4-bit Ripple-Carry Adder/Subtractor, Carry Look-Ahead Adder, BCD Adder, and Decoders.',
    concepts: [
      {
        heading: 'Half Adder & Full Adder',
        points: [
          'Half Adder (2 inputs A, B): Sum S = A ⊕ B; Carry C = A · B. Cannot accept a carry-in from a previous bit.',
          'Full Adder (3 inputs A, B, Cin): S = A ⊕ B ⊕ Cin; Cout = AB + Cin(A ⊕ B) = AB + BCin + ACin. Built from 2 Half Adders + 1 OR gate.',
          '4-Bit Ripple-Carry Adder/Subtractor: Four Full Adders chained carry-to-carry. Feeding B_i through XOR gates with Mode M gives A + B when M=0 (C0=0) and A + B\' + 1 = A − B when M=1 (C0=1). Signed overflow V = C4 ⊕ C3.',
        ],
        formulaOrRtl: 'S = A ⊕ B ⊕ Cin   |   Cout = AB + Cin(A ⊕ B)   |   V = C4 ⊕ C3',
      },
      {
        heading: 'Carry Look-Ahead, BCD Adder & Decoders',
        points: [
          'Carry Look-Ahead (CLA): Eliminates ripple delay using Generate G_i = A_i·B_i and Propagate P_i = A_i ⊕ B_i; C_(i+1) = G_i + P_i·C_i.',
          'BCD Adder: Adds two 4-bit BCD digits; if binary sum > 9 (K=1 or Z3Z2=1 or Z3Z1=1), adds 0110 (6) using a second 4-bit adder.',
          'n-to-2^n Decoder: Converts an n-bit binary code to at most one active output line (e.g., 2-to-4, 3-to-8). A decoder + OR gates can implement any Boolean function Σm(...).',
        ],
      },
    ],
    tables: [
      {
        title: 'Full Adder Truth Table',
        headers: ['A', 'B', 'Cin', 'Sum (S)', 'Carry (Cout)'],
        rows: [
          ['0', '0', '0', '0', '0'],
          ['0', '0', '1', '1', '0'],
          ['0', '1', '0', '1', '0'],
          ['0', '1', '1', '0', '1'],
          ['1', '0', '0', '1', '0'],
          ['1', '0', '1', '0', '1'],
          ['1', '1', '0', '0', '1'],
          ['1', '1', '1', '1', '1'],
        ],
      },
    ],
    examples: [
      {
        title: '4-Bit Adder/Subtractor Worked Cases (CIE-2 LAQ 3)',
        problem: 'Compute A = 0101 (5) and B = 0011 (3) for M = 0 and M = 1.',
        steps: [
          'M = 0 (ADD): B ⊕ 0 = 0011, C0 = 0. Sum = 0101 + 0011 = 1000 (8 unsigned; V = C4⊕C3 = 0⊕1 = 1 signed overflow because +8 exceeds 4-bit signed max +7).',
          'M = 1 (SUBTRACT): B ⊕ 1 = 1100, C0 = 1. Sum = 0101 + 1100 + 1 = 1 0010. Discard C4 → 0010 (+2), V = 1⊕1 = 0 (no overflow).',
        ],
        answer: 'M=0 → 1000 (V=1)   |   M=1 → 0010 (+2, V=0)',
      },
    ],
    schematicId: 'adder-subtractor',
    quickChecks: [
      {
        question: 'Design a 3-input majority circuit (Surprise Test 1 Q3) that outputs 1 when there are more 1s than 0s.',
        answer: 'Output X = 1 for minterms with two or three 1s: Σm(3,5,6,7), which simplifies to X = AB + BC + AC (same as Full Adder Cout!).',
      },
      {
        question: 'What is the role of the mode bit M in a 4-bit binary adder/subtractor?',
        answer: 'M = 0 passes B unchanged with C0 = 0 for addition (A+B); M = 1 inverts each B bit via XOR and sets C0 = 1 for 2s complement subtraction (A−B).',
      },
    ],
    resourceIds: ['res-u2-stld', 'res-cie2-ans', 'res-st2'],
  },
  {
    id: 'u2-ch4-sequential',
    unitId: 'unit-2',
    unitNumber: 'Unit II',
    code: '2.4',
    title: 'Sequential Circuits: Flip-Flops, Registers, Counters & FSMs',
    lectures: 'L26 – L27',
    co: 'CO2 (C31.2)',
    btl: 'BTL 5 · Evaluate',
    estimatedMinutes: 35,
    summary:
      'Latches vs clock-edge Flip-Flops (SR, D, JK, T), Master-Slave elimination of race-around, SISO/SIPO/PISO/PIPO shift registers, synchronous/asynchronous counters, and Mealy/Moore FSMs.',
    concepts: [
      {
        heading: 'Latches vs Flip-Flops & Characteristic Equations',
        points: [
          'Latch: Level-triggered bistable memory (transparent while Enable=1). Flip-Flop: Clock edge-triggered (rising or falling edge).',
          'SR FF: S=1, R=0 sets Q=1; S=0, R=1 resets Q=0; S=R=1 is invalid. Q(t+1) = S + R\'Q.',
          'D FF (Data/Delay): Eliminates invalid state; Q(t+1) = D.',
          'JK FF: J=K=1 toggles Q(t+1) = Q\'(t). Q(t+1) = JQ\' + K\'Q. Race-around condition occurs in level-triggered JK when J=K=1 and pulse width > propagation delay; solved by Master-Slave or edge triggering.',
          'T FF (Toggle): Formed by tying J=K=T; Q(t+1) = T ⊕ Q.',
        ],
        formulaOrRtl: 'D: Q+ = D   |   JK: Q+ = JQ\' + K\'Q   |   T: Q+ = T ⊕ Q',
      },
      {
        heading: 'Shift Registers & Binary Counters',
        points: [
          'Shift Registers (chained D-FFs): SISO (Serial-In Serial-Out), SIPO (serial→parallel), PISO (parallel→serial), PIPO (parallel buffer), Bidirectional & Universal Shift Register.',
          'Asynchronous (Ripple) Counter: Clock feeds only LSB flip-flop; each Q drives the next clock (ripple propagation delay). Mod-N counter resets at binary N via NAND feedback (e.g., Mod-10 BCD resets at 1010).',
          'Synchronous Counter: All FFs share a common clock (high speed, zero ripple skew). Ring Counter (N states with N FFs) vs Johnson Twisted-Ring Counter (2N states with N FFs).',
          'FSMs: Moore output depends only on Present State; Mealy output depends on Present State AND Inputs.',
        ],
      },
    ],
    tables: [
      {
        title: 'Flip-Flop Excitation Table (For Counter Design)',
        headers: ['Q(t) → Q(t+1)', 'S R', 'J K', 'D', 'T'],
        rows: [
          ['0 → 0', '0 X', '0 X', '0', '0'],
          ['0 → 1', '1 0', '1 X', '1', '1'],
          ['1 → 0', '0 1', 'X 1', '0', '1'],
          ['1 → 1', 'X 0', 'X 0', '1', '0'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'What is the race-around condition in a JK flip-flop and how is it prevented?',
        answer: 'When J=K=1 in a level-triggered JK latch for longer than propagation delay, Q toggles repeatedly during one clock pulse. Prevented using edge-triggered or Master-Slave JK flip-flops.',
      },
      {
        question: 'How many states does a 4-bit Johnson counter have versus a 4-bit Ring counter?',
        answer: '4-bit Ring counter has 4 states (N); 4-bit Johnson counter has 8 states (2N).',
      },
    ],
    resourceIds: ['res-u2-stld', 'res-course-file'],
  },

  // ==================== BEYOND SYLLABUS GAPS ====================
  {
    id: 'gap-ch1-subtractor-comparator',
    unitId: 'gaps',
    unitNumber: 'Gap Topics',
    code: 'G1 – G2',
    title: 'Gap 1 & 2: Subtractors & Magnitude Comparators',
    lectures: 'Bridge L1 – L2',
    co: 'CO2 (C31.2)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 20,
    summary:
      'Corrective-action bridge topics covering Half/Full Subtractors and 1-bit / 2-bit / 4-bit Magnitude Comparators (A > B, A = B, A < B).',
    concepts: [
      {
        heading: 'Gap 1: Half Subtractor & Full Subtractor',
        points: [
          'Half Subtractor (A − B): Difference D = A ⊕ B; Borrow Bout = A\'·B.',
          'Full Subtractor (A − B − Bin): Difference D = A ⊕ B ⊕ Bin; Borrow Bout = A\'B + Bin(A ⊕ B)\' = A\'B + A\'Bin + B·Bin.',
        ],
        formulaOrRtl: 'HS: D = A ⊕ B, Bout = A\'B   |   FS: Bout = A\'B + Bin(A ⊕ B)\'',
      },
      {
        heading: 'Gap 2: Digital Magnitude Comparator',
        points: [
          'Compares two binary numbers A and B, asserting exactly one of three mutually exclusive outputs: A > B, A = B, or A < B.',
          '1-Bit Comparator: (A = B) = A ⊙ B = A\'B\' + AB (XNOR); (A > B) = A·B\'; (A < B) = A\'·B.',
          'n-Bit Cascade (e.g., 4-bit 7485 IC): Equal requires XNOR match across all bit pairs (x_i = A_i ⊙ B_i); Greater checks MSB first, descending only when higher bits match.',
        ],
        formulaOrRtl: '4-bit (A=B) = x3·x2·x1·x0  |  (A>B) = A3B3\' + x3A2B2\' + x3x2A1B1\' + x3x2x1A0B0\'',
      },
    ],
    quickChecks: [
      {
        question: 'Which logic gate directly detects equality (A = B) between two single bits?',
        answer: 'XNOR gate: (A ⊙ B) = A\'B\' + AB outputs 1 iff A and B are equal.',
      },
    ],
    resourceIds: ['res-u2-stld', 'res-course-file'],
  },
  {
    id: 'gap-ch2-encoder-mux-demux',
    unitId: 'gaps',
    unitNumber: 'Gap Topics',
    code: 'G3 – G5',
    title: 'Gap 3–5: Encoders, Multiplexers (MUX) & Demultiplexers (DEMUX)',
    lectures: 'Bridge L3 – L5',
    co: 'CO2 (C31.2)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 25,
    summary:
      'Priority Encoders for keyboard/interrupt encoding, Multiplexers as universal data selectors & Boolean function generators, and Demultiplexers.',
    concepts: [
      {
        heading: 'Gap 3: Encoders & Priority Encoders',
        points: [
          'Encoder performs the inverse of a Decoder: 2^n input lines → n output lines (e.g., 8-to-3 Octal-to-Binary, 10-to-4 Decimal-to-BCD).',
          'Limitation of simple encoders: Ambiguous output if two inputs are active simultaneously.',
          'Priority Encoder (e.g., 4-to-2 with Valid bit V): Assigns priority so the highest-indexed active input wins, enabling keyboard scanning and interrupt priority resolution.',
        ],
      },
      {
        heading: 'Gap 4: Multiplexer (MUX — Data Selector)',
        points: [
          '2^n data inputs, n select lines, 1 output: Y = Σ (m_i · I_i). Common sizes: 2:1, 4:1, 8:1, 16:1.',
          'Universal Boolean Implementation: Any (n+1)-variable function can be implemented with a 2^n:1 MUX by connecting n variables to Select lines and feeding 0, 1, V, or V\' to data inputs.',
          'Applications: Data routing, parallel-to-serial conversion, ALU input selection, and compact combinational logic synthesis.',
        ],
        formulaOrRtl: '4:1 MUX:  Y = S1\'S0\'I0 + S1\'S0 I1 + S1S0\'I2 + S1S0 I3',
      },
      {
        heading: 'Gap 5: Demultiplexer (DEMUX — Data Distributor)',
        points: [
          '1 data input, n select lines, 2^n output lines. Routes the single input to the selected output line.',
          'MUX vs DEMUX: MUX is many-to-1 (combines multiple streams onto a shared channel); DEMUX is 1-to-many (distributes a shared channel to a target destination).',
          'A Decoder with an Enable pin functions directly as a DEMUX when data is applied to Enable.',
        ],
      },
    ],
    quickChecks: [
      {
        question: 'How many select lines does a 16:1 Multiplexer require?',
        answer: '4 select lines, since 2⁴ = 16.',
      },
      {
        question: 'How does a Priority Encoder resolve simultaneous active inputs?',
        answer: 'It assigns a fixed rank to inputs and outputs the binary code of the highest-priority active input line.',
      },
    ],
    resourceIds: ['res-u2-stld', 'res-course-file'],
  },

  // ==================== UNIT III ====================
  {
    id: 'u3-ch1-arithmetic-algos',
    unitId: 'unit-3',
    unitNumber: 'Unit III',
    code: '3.1',
    title: 'Computer Arithmetic: Multiplication, Booth\'s & Division Algorithms',
    lectures: 'L29 – L30',
    co: 'CO3 (C31.3)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 35,
    summary:
      'Unsigned shift-and-add multiplication, Booth\'s 2s complement signed multiplication, and Restoring vs Non-Restoring binary division algorithms.',
    concepts: [
      {
        heading: 'Unsigned Multiplication & Booth\'s Signed Multiplication',
        points: [
          'Unsigned Shift-and-Add: Initialize Product A = 0, Multiplier Q, Multiplicand M. Inspect LSB Q0: if Q0 = 1, A ← A + M; then arithmetic/logical shift right (A, Q) and decrement counter n.',
          'Booth\'s Algorithm (Signed 2s Complement): Appends an extra bit Q_(−1) = 0 to the right of Q0 and inspects the bit pair (Q0, Q_(−1)) each cycle.',
          '00 or 11: No arithmetic op, only Arithmetic Shift Right (ASR) of (A, Q, Q_(−1)).',
          '10 (start of 1-string): Subtract M (A ← A − M), then ASR.',
          '01 (end of 1-string): Add M (A ← A + M), then ASR.',
        ],
        formulaOrRtl: 'Booth Pair (Q0, Q_-1): 10 ⇒ A←A−M | 01 ⇒ A←A+M | 00,11 ⇒ ASR only',
      },
      {
        heading: 'Restoring vs Non-Restoring Binary Division',
        points: [
          'Hardware: (n+1)-bit Remainder register A = 0, n-bit Dividend/Quotient register Q, Divisor M, ALU adder/subtractor, counter n.',
          'Restoring Division: Shift (A, Q) left 1 bit → Subtract A ← A − M. If A < 0, set Q0 = 0 and RESTORE A ← A + M; else set Q0 = 1.',
          'Non-Restoring Division: Avoids restoring step! If A ≥ 0: shift left (A,Q), A ← A − M; else if A < 0: shift left (A,Q), A ← A + M. Then set Q0 = 1 if new A ≥ 0, else Q0 = 0. Final correction: if A < 0 after n steps, do one final A ← A + M.',
        ],
      },
    ],
    examples: [
      {
        title: 'Restoring Division Trace: 7 ÷ 3 (Assignment 2 Q1)',
        problem: 'Divide Dividend Q = 0111₂ (7) by Divisor M = 0011₂ (3), n = 4.',
        steps: [
          'Init: A = 00000, Q = 0111, M = 00011.',
          'Step 1 (n=4): Shift L → A=00000, Q=111_; A−M = −3 (<0) → Q0=0, Restore A=00000.',
          'Step 2 (n=3): Shift L → A=00001, Q=110_; A−M = 1−3 = −2 (<0) → Q0=0, Restore A=00001.',
          'Step 3 (n=2): Shift L → A=00011, Q=100_; A−M = 3−3 = 0 (≥0) → Q0=1 (no restore).',
          'Step 4 (n=1): Shift L → A=00001, Q=001_; A−M = 1−3 = −2 (<0) → Q0=0, Restore A=00001.',
        ],
        answer: 'Quotient Q = 0010₂ (2)  |  Remainder A = 00001₂ (1)',
      },
    ],
    quickChecks: [
      {
        question: 'In Booth\'s algorithm, what operation is performed when (Q0, Q_(−1)) = 10?',
        answer: 'Subtract Multiplicand from Accumulator (A ← A − M), followed by an arithmetic right shift of (A, Q, Q_(−1)).',
      },
      {
        question: 'How does Non-Restoring division save time compared to Restoring division?',
        answer: 'It eliminates the immediate A ← A + M restoration step after a negative remainder, handling the recovery during the next iteration\'s shift-and-add.',
      },
    ],
    resourceIds: ['res-u3-div', 'res-ast2-ans', 'res-u3-slides'],
  },
  {
    id: 'u3-ch2-isa-addressing',
    unitId: 'unit-3',
    unitNumber: 'Unit III',
    code: '3.2',
    title: 'Instruction Formats, Addressing Modes & Execution Cycle',
    lectures: 'L31 – L35',
    co: 'CO3 (C31.3)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 35,
    summary:
      'Zero/One/Two/Three-address instruction formats, opcode/operand/mnemonic, all 9 addressing modes with Effective Address formulas, instruction classes, and the 6-step execution cycle.',
    concepts: [
      {
        heading: 'Instruction Formats & Definitions',
        points: [
          'Opcode: Binary bits specifying the operation (e.g., ADD). Operand: Data or address acted upon. Mnemonic: Human-readable symbolic name (MOV, ADD, JMP).',
          'Three-Address (ADD R1, R2, R3 → R1 ← R2+R3): Shortest programs, largest instructions.',
          'Two-Address (ADD R1, R2 → R1 ← R1+R2): Standard in CISC/general-register machines.',
          'One-Address (ADD X → AC ← AC + M[X]): Implicit Accumulator register.',
          'Zero-Address (ADD → TOS ← A + B): Stack-organized machines (PUSH/POP).',
        ],
      },
      {
        heading: 'Major Instruction Classes & 6-Step Execution Cycle',
        points: [
          'Classes: Data Transfer (LOAD, STORE, MOV), Arithmetic (ADD, SUB, MUL, INC), Logical (AND, OR, XOR, CMP), Shift/Rotate (SHL, SHR, ROL), Branch/Control (JMP, JZ, CALL, RET), I/O (IN, OUT), Machine Control (NOP, HLT, WAIT).',
          '6-Step Instruction Cycle: (1) Fetch (PC → MAR/MDR), (2) Decode opcode & mode, (3) Fetch Operands, (4) Execute in ALU/Branch/I/O, (5) Write Back to Reg/Mem, (6) Update PC.',
        ],
      },
    ],
    tables: [
      {
        title: 'Common Addressing Modes (Dr. Abdul Mateen Ahmed Slides)',
        headers: ['Addressing Mode', 'Effective Address / Location', 'Example & Best Use'],
        rows: [
          ['Immediate', 'Operand is inside the instruction field', 'MOV R1, #5 (fastest for constants)'],
          ['Direct (Absolute)', 'EA = Address field A', 'LOAD R1, [5000H] (global variables)'],
          ['Indirect', 'EA = M[A] (pointer in memory)', 'LOAD R1, [A] (2 memory accesses)'],
          ['Register', 'Operand resides in CPU register', 'ADD R1, R2 (fastest variable access)'],
          ['Register Indirect', 'EA = [Ri] (pointer in register)', 'LOAD R1, [R2] (pointers/traversal)'],
          ['Indexed', 'EA = Base/Addr + Index Register', 'LOAD R1, 1000H(R3) (array indexing)'],
          ['Base + Displacement', 'EA = Base Register + Offset', 'LOAD R1, [RB + 8] (struct fields)'],
          ['Relative (PC-Rel)', 'EA = PC + signed displacement', 'JZ +24 (position-independent branch)'],
          ['Auto-Inc / Auto-Dec', 'Use [R2] then R2 ← R2 ± step', 'LOAD R1, [R2+] (loops & stacks)'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'Compute the Effective Address for an Indexed instruction LOAD R1, 1000H(R3) when R3 = 0024H.',
        answer: 'EA = 1000H + 0024H = 1024H.',
      },
      {
        question: 'Compare NOP, HLT, and WAIT machine control instructions.',
        answer: 'NOP advances one idle cycle; HLT stops CPU execution until reset; WAIT suspends execution until an external interrupt/signal.',
      },
    ],
    resourceIds: ['res-u3-slides', 'res-cie2-ans'],
  },
  {
    id: 'u3-ch3-rtl-microops',
    unitId: 'unit-3',
    unitNumber: 'Unit III',
    code: '3.3',
    title: 'Register Transfer Language (RTL) & Micro-Operations',
    lectures: 'L36 – L38',
    co: 'CO4 (C31.4)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 30,
    summary:
      'Symbolic RTL notation, common bus transfers, and the four hardware micro-operation classes: Register Transfer, Arithmetic, Logic, and Shift.',
    concepts: [
      {
        heading: 'RTL Notation & Common Bus Transfers',
        points: [
          'Registers are denoted in uppercase (R1, PC, AR, DR); ← denotes data transfer; M[AR] denotes memory word at address AR.',
          'Conditional Control: T1: R2 ← R1 executes only during clock pulse T1 = 1.',
          'Common Bus System: Multiplexers select one source register onto shared bus lines while the Load control signal of the destination register latches it on the rising clock edge.',
        ],
        formulaOrRtl: 'T1: AR ← PC ;   T2: DR ← M[AR], PC ← PC + 1',
      },
      {
        heading: 'Arithmetic, Logic & Shift Micro-Operations',
        points: [
          'Arithmetic: Add (R3 ← R1+R2), Subtract via 2s complement (R3 ← R1 + R2\' + 1), Increment (R1 ← R1+1), Decrement (R1 ← R1−1).',
          'Logic (Bitwise): AND (mask/clear bits, R1∧R2), OR (set bits, R1∨R2), XOR (toggle/complement bits, R1⊕R2), Complement (R1 ← R1\').',
          'Shift: Logical (shl/shr inserts 0), Arithmetic (ashr preserves MSB sign bit to divide signed by 2), Circular/Rotate (cil/cir preserves all bits without loss).',
        ],
      },
    ],
    tables: [
      {
        title: 'Shift Micro-Operations Worked on 4-Bit R = 1011',
        headers: ['Micro-Operation', 'Before', 'After', 'Rule'],
        rows: [
          ['shl R (Logical Left)', '1011', '0110', '0 enters LSB; MSB lost'],
          ['shr R (Logical Right)', '1011', '0101', '0 enters MSB; LSB lost'],
          ['ashr R (Arithmetic Right)', '1011 (-5)', '1101 (-3)', 'Sign bit preserved in MSB'],
          ['cil R (Circular Left)', '1011', '0111', 'MSB wraps into LSB'],
          ['cir R (Circular Right)', '1011', '1101', 'LSB wraps into MSB'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'If R1 = 1100 and R2 = 1010, compute R1 ∧ R2, R1 ∨ R2, and R1 ⊕ R2.',
        answer: 'AND = 1000; OR = 1110; XOR = 0110.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-ast2-ans'],
  },
  {
    id: 'u3-ch4-microprogrammed-cu',
    unitId: 'unit-3',
    unitNumber: 'Unit III',
    code: '3.4',
    title: 'Microprogrammed Control Unit & Hardwired Control',
    lectures: 'L39 – L41',
    co: 'CO4 (C31.4)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 35,
    summary:
      'Control Memory (ROM), 20-bit microinstruction format, CAR/CDR/SBR hardware, address sequencing with opcode mapping, and Hardwired vs Microprogrammed trade-offs.',
    concepts: [
      {
        heading: 'Structure of a Microprogrammed Control Unit',
        points: [
          'Control Memory (ROM): Permanently stores microprograms (one routine per machine instruction).',
          'Control Address Register (CAR): Holds the address of the next microinstruction to be fetched from Control Memory.',
          'Control Data Register (CDR / Microinstruction Register): Pipeline register holding the active microinstruction bits (e.g., 20-bit: F1[3] | F2[3] | F3[3] | CD[2] | BR[2] | AD[7]).',
          'Next-Address Generator (Sequencer) & Subroutine Register (SBR): Computes next CAR address via (1) Increment CAR+1, (2) Unconditional branch AD, (3) Conditional branch on status/CD, (4) Opcode Mapping 0|opcode|00, or (5) SBR Call/Return.',
        ],
        formulaOrRtl: 'Fetch Routine (Addr 64):  AR←PC ;  DR←M[AR], PC←PC+1 ;  IR←DR ;  CAR ← Map(Opcode)',
      },
    ],
    tables: [
      {
        title: 'Hardwired Control vs Microprogrammed Control',
        headers: ['Feature', 'Hardwired Control', 'Microprogrammed Control'],
        rows: [
          ['Signal Generation', 'Fixed combinational logic gates & flip-flops', 'Microinstructions read from Control Memory (ROM)'],
          ['Speed', 'Very fast (single-cycle gate delay)', 'Slower (requires Control Memory ROM read)'],
          ['Flexibility / ISA Updates', 'Rigid; requires hardware redesign to change', 'Flexible; update ROM firmware microcode'],
          ['Design Complexity', 'Complex for large instruction sets', 'Systematic & structured for complex instructions'],
          ['Primary Usage', 'RISC processors (ARM, MIPS, RISC-V)', 'CISC processors (Intel x86, VAX)'],
        ],
      },
    ],
    schematicId: 'microprogrammed-cu',
    quickChecks: [
      {
        question: 'If an IR opcode is 0010, what starting address in Control Memory does the standard mapping 0 | opcode | 00 produce?',
        answer: '0 0010 00 = 0001000₂ = decimal address 8.',
      },
      {
        question: 'What is stored in the Subroutine Register (SBR)?',
        answer: 'The return address (CAR + 1) when a micro-subroutine is called.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-ast2-ans'],
  },

  // ==================== UNIT IV ====================
  {
    id: 'u4-ch1-io-interface',
    unitId: 'unit-4',
    unitNumber: 'Unit IV',
    code: '4.1',
    title: 'Peripheral Devices, I/O Interface & Asynchronous Transfer',
    lectures: 'L42 – L44',
    co: 'CO5 (C31.5)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 30,
    summary:
      'Bridging CPU and slow electromechanical peripherals via I/O interfaces, Isolated vs Memory-Mapped I/O, and Synchronous vs Asynchronous (Strobe/Handshaking) transfer.',
    concepts: [
      {
        heading: 'Need & Functions of an I/O Interface',
        points: [
          'Peripherals (keyboard, monitor, printer, magnetic disk) are far slower than the CPU, often electromechanical, and use different signal levels and word lengths.',
          'An I/O Interface Module provides: (1) Address Decoding, (2) Data Buffering (speed matching), (3) Status/Control Registers (ready, busy, error), (4) Serial ↔ Parallel format conversion, and (5) Interrupt request logic.',
        ],
      },
      {
        heading: 'Isolated I/O vs Memory-Mapped I/O',
        points: [
          'Isolated (I/O-Mapped) I/O: Dedicated I/O address space separated from RAM; uses special IN / OUT instructions and an IO/M# control pin.',
          'Memory-Mapped I/O: Device registers share the same address space as main memory; standard LOAD / STORE instructions manipulate peripherals directly.',
        ],
      },
      {
        heading: 'Synchronous vs Asynchronous Data Transfer',
        points: [
          'Synchronous Transfer: Both CPU and I/O share a common clock pulse; fixed timing.',
          'Asynchronous Transfer (independent clocks): Uses timing control signals instead of a shared clock—either Strobe Control (single-line Data Valid pulse, no confirmation) or Two-Wire Handshaking (Request + Acknowledge signals confirming receipt).',
        ],
      },
    ],
    quickChecks: [
      {
        question: 'Which I/O addressing scheme uses standard LOAD/STORE instructions instead of special IN/OUT opcodes?',
        answer: 'Memory-Mapped I/O.',
      },
      {
        question: 'Why is two-wire handshaking more reliable than single-line strobe control?',
        answer: 'Handshaking adds an Acknowledge signal from the receiver confirming data receipt before the sender clears the bus.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-ast2-ans'],
  },
  {
    id: 'u4-ch2-modes-dma',
    unitId: 'unit-4',
    unitNumber: 'Unit IV',
    code: '4.2',
    title: 'Modes of Data Transfer, Priority Interrupt & DMA',
    lectures: 'L45 – L47',
    co: 'CO5 (C31.5)',
    btl: 'BTL 5 · Evaluate',
    estimatedMinutes: 35,
    summary:
      'Comparing Programmed I/O polling, Interrupt-Driven I/O (Vectored & Daisy-Chain Priority), and Direct Memory Access (DMAC) bulk block transfers.',
    concepts: [
      {
        heading: 'Three Modes of Data Transfer',
        points: [
          'Programmed I/O: CPU continuously polls the status register in a busy-wait loop until READY=1, then executes the transfer—wastes CPU cycles.',
          'Interrupt-Driven I/O: CPU runs other programs; peripheral asserts Interrupt Request (INTR) when ready, CPU saves context and runs an Interrupt Service Routine (ISR).',
          'Direct Memory Access (DMA): A hardware DMA Controller (DMAC) takes over the system bus and transfers entire data blocks directly between I/O and RAM without CPU intervention per word.',
        ],
      },
      {
        heading: 'Priority Interrupt & DMA Controller Architecture',
        points: [
          'Priority Interrupt resolves simultaneous interrupts (higher priority preempts lower): Daisy-Chaining (serial hardware PI→PO line, lowest cost) or Parallel Priority Encoder + Mask Register.',
          'DMAC Registers: Address Register (memory pointer, auto-increments), Word Count Register (decrements to 0), Control/Status Register (R/W, mode).',
          'DMA Handshake: Device asserts DMA Req → DMAC sends Bus Request (BR/HOLD) to CPU → CPU finishes current cycle, floats buses, returns Bus Grant (BG/HLDA) → DMAC transfers block → interrupts CPU when count = 0.',
          'DMA Modes: Burst Mode (whole block at once, CPU paused), Cycle Stealing (1 word/cycle), Transparent Mode (transfers only during CPU bus-idle cycles).',
        ],
      },
    ],
    schematicId: 'dma-io',
    quickChecks: [
      {
        question: 'What happens when the DMAC Word Count register decrements to zero?',
        answer: 'The DMAC deasserts Bus Request, releases control of the system bus back to the CPU, and raises an End-of-Transfer interrupt.',
      },
      {
        question: 'How does Daisy-Chain priority determine which interrupting device is serviced first?',
        answer: 'The Interrupt Acknowledge (INTA) signal passes serially through devices; the device electrically closest to the CPU wins priority and blocks the signal from passing downstream.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-ast2-ans'],
  },
  {
    id: 'u4-ch3-memory-hierarchy',
    unitId: 'unit-4',
    unitNumber: 'Unit IV',
    code: '4.3',
    title: 'Memory Organization, RAM/ROM Types & Memory Hierarchy',
    lectures: 'L48 – L49, L51',
    co: 'CO5 (C31.5)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 30,
    summary:
      'Main memory block organization (MAR/Decoder/MDR), SRAM vs DRAM cells, ROM classifications, Locality of Reference, and secondary/virtual storage.',
    concepts: [
      {
        heading: 'Main Memory Organization & RAM/ROM Technologies',
        points: [
          'Main Memory Block: n-bit Address in MAR feeds an n-to-2^n Decoder selecting one word of m bits in the Memory Array; Read/Write & Chip Select move data via MDR and the m-bit Data Bus.',
          'SRAM (Static RAM): 6-transistor bistable latch per bit; very fast (~1–5 ns), no refresh needed, expensive, used in CPU Cache.',
          'DRAM (Dynamic RAM): 1 transistor + 1 capacitor per bit; high density & cheaper, leaks charge requiring periodic refresh, used in Main Memory (DDR4/DDR5).',
          'ROM Classification (Non-Volatile): Masked ROM (factory fixed), PROM (one-time fuse programmable), EPROM (UV-erasable), EEPROM / Flash (electrically erasable for BIOS/SSD).',
        ],
      },
      {
        heading: 'Memory Hierarchy & Locality of Reference',
        points: [
          'Hierarchy (Fastest/Smallest/Costliest → Slowest/Largest/Cheapest): CPU Registers (<1 ns) → Cache SRAM (1–10 ns) → Main DRAM (50–100 ns) → Secondary SSD/HDD (0.1–10 ms) → Tape/Optical Archive.',
          'Locality of Reference makes the hierarchy effective: Temporal Locality (recently accessed items are likely reused soon, e.g., loops) and Spatial Locality (nearby addresses are accessed sequentially, e.g., arrays).',
          'Secondary Storage & Virtual Memory: Magnetic disks (tracks, sectors, seek + rotational latency), SSDs (NAND flash), and Paging with a TLB (Translation Lookaside Buffer) to map virtual to physical pages.',
        ],
      },
    ],
    tables: [
      {
        title: 'SRAM vs DRAM Comparison',
        headers: ['Parameter', 'SRAM (Static RAM)', 'DRAM (Dynamic RAM)'],
        rows: [
          ['Storage Element', '6-Transistor Flip-Flop latch', '1 Transistor + 1 Capacitor'],
          ['Refresh Required?', 'No (holds data while powered)', 'Yes (periodic refresh every few ms)'],
          ['Speed & Density', 'Very fast (1–10 ns), lower density', 'Slower (50–100 ns), very high density'],
          ['Primary Application', 'L1 / L2 / L3 Cache Memory', 'Main System Memory (RAM)'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'How many address lines and data lines are required for a 4K × 16 memory chip?',
        answer: '4K = 2¹² words → 12 address lines; 16 bits/word → 16 data lines.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-ast2-ans'],
  },
  {
    id: 'u4-ch4-cache-mapping',
    unitId: 'unit-4',
    unitNumber: 'Unit IV',
    code: '4.4',
    title: 'Cache Memory, Mapping Techniques & Effective Access Time',
    lectures: 'L50, L52 – L55',
    co: 'CO5 (C31.5)',
    btl: 'BTL 5 · Evaluate',
    estimatedMinutes: 35,
    summary:
      'Direct, Fully Associative, and k-Way Set-Associative cache mapping bit-field splits, replacement policies (LRU/FIFO), write policies, and hit-ratio access time calculations.',
    concepts: [
      {
        heading: 'Three Cache Mapping Functions',
        points: [
          'Direct Mapping: Block j maps strictly to cache line (j mod C). Address = [ Tag | Line | Word ]. Needs only 1 comparator (cheapest), but suffers from high conflict misses.',
          'Associative Mapping: Any main memory block can reside in ANY cache line. Address = [ Tag | Word ]. Requires parallel tag comparators across all lines (highest hit ratio, highest hardware cost).',
          'k-Way Set-Associative Mapping: Cache is divided into S = C / k sets; Block j maps to set (j mod S) and fits in any of its k ways. Address = [ Tag | Set | Word ]. Needs only k comparators (best cost/hit balance).',
        ],
        formulaOrRtl: 'T_eff = h · t_cache + (1 − h) · t_main   (or h·t_c + (1−h)·(t_c + t_m) non-overlap)',
      },
      {
        heading: 'Write & Replacement Policies',
        points: [
          'Replacement (when set/cache full): LRU (Least Recently Used — best hit rate), FIFO (oldest loaded), Random.',
          'Write-Through (updates cache & main memory together — simple consistency, more bus traffic) vs Write-Back (updates cache only and sets dirty bit; writes to RAM on eviction).',
        ],
      },
    ],
    examples: [
      {
        title: '64K-Word Memory, 16-Word Block, 128-Line Cache Split (CIE-2 LAQ 6)',
        problem: 'Find address field bit splits for Direct, Associative, and 2-Way Set-Associative mapping.',
        steps: [
          '64K words = 2¹⁶ words → 16-bit CPU address. Block = 16 words = 2⁴ → Word offset = 4 bits.',
          'Direct Mapping: 128 lines = 2⁷ → Line = 7 bits, Tag = 16 − 7 − 4 = 5 bits.',
          'Associative Mapping: No line/set index → Tag = 16 − 4 = 12 bits, Word = 4 bits.',
          '2-Way Set-Associative: 128 / 2 = 64 sets = 2⁶ → Set = 6 bits, Tag = 16 − 6 − 4 = 6 bits.',
        ],
        answer: 'Direct: 5|7|4  |  Associative: 12|4  |  2-Way Set-Assoc: 6|6|4',
      },
      {
        title: 'Effective Access Time Calculation',
        problem: 'Given hit ratio h = 0.95, t_c = 10 ns, t_m = 100 ns, compute T_eff.',
        steps: [
          'T_eff = h × t_c + (1 − h) × t_m = 0.95 × 10 + 0.05 × 100 = 9.5 + 5.0 = 14.5 ns.',
        ],
        answer: 'T_eff = 14.5 ns (near cache speed despite 100 ns DRAM)',
      },
    ],
    schematicId: 'cache-mapping',
    quickChecks: [
      {
        question: 'Which special cases of k-way Set-Associative mapping yield Direct Mapping and Fully Associative Mapping?',
        answer: 'k = 1 gives Direct Mapping; k = total number of cache lines (1 set) gives Fully Associative Mapping.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-st4'],
  },

  // ==================== UNIT V ====================
  {
    id: 'u5-ch1-risc-cisc',
    unitId: 'unit-5',
    unitNumber: 'Unit V',
    code: '5.1',
    title: 'RISC vs CISC Processor Architectures',
    lectures: 'L56 – L58',
    co: 'CO6 (C31.6)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 25,
    summary:
      'Architectural philosophy, hardware/compiler trade-offs, and systematic comparison between Reduced and Complex Instruction Set Computers.',
    concepts: [
      {
        heading: 'Core RISC & CISC Design Philosophies',
        points: [
          'CISC (Complex Instruction Set Computer): Minimizes program instruction count and memory footprint using rich, multi-cycle, variable-length instructions decoded via microprogrammed control (e.g., Intel x86, VAX).',
          'RISC (Reduced Instruction Set Computer): Uses a small set of uniform, fixed-length instructions executed in 1 clock cycle via hardwired control and deep pipelining (e.g., ARM, MIPS, RISC-V).',
          'Load/Store Architecture: In RISC, ALU operations operate strictly on CPU registers; only dedicated LOAD and STORE instructions access memory.',
          'Influence on Instruction Sets: Fixed instruction length, fixed opcode/register bit positions, and absence of condition codes simplify pipelined decoding and out-of-order execution.',
        ],
      },
    ],
    tables: [
      {
        title: 'RISC vs CISC Side-by-Side Comparison',
        headers: ['Characteristic', 'RISC (Reduced)', 'CISC (Complex)'],
        rows: [
          ['Instruction Format', 'Simple, fixed-length (e.g., 32-bit)', 'Complex, variable-length'],
          ['Execution Speed', 'Single-cycle (~1 CPI with pipelining)', 'Multi-cycle per instruction'],
          ['Control Unit', 'Hardwired (fast, fewer transistors)', 'Microprogrammed ROM'],
          ['Memory Access', 'Strict LOAD / STORE architecture', 'Memory-to-memory ALU operands allowed'],
          ['Registers & Modes', 'Large register file (32+); few modes', 'Fewer general registers; many addressing modes'],
          ['Code Density', 'Larger code size (compiler schedules)', 'Compact code size'],
          ['Examples', 'ARM, MIPS, RISC-V, SPARC', 'Intel x86 / x86-64, VAX, Motorola 68k'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'Why does RISC favor hardwired control over microprogrammed control?',
        answer: 'Fixed-length, simple RISC instructions decode rapidly using combinational logic gates in a single clock cycle, enabling efficient pipelining.',
      },
    ],
    resourceIds: ['res-u5-risc', 'res-cie2-ans'],
  },
  {
    id: 'u5-ch2-pipelining-datapath',
    unitId: 'unit-5',
    unitNumber: 'Unit V',
    code: '5.2',
    title: 'Pipelining Basics, Speedup, Datapath & Control Signals',
    lectures: 'L59, L61',
    co: 'CO6 (C31.6)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 30,
    summary:
      'Overlapped instruction execution, 5-stage RISC pipeline (IF, ID, EX, MEM, WB), pipeline inter-stage registers, control signal propagation, and speedup derivation.',
    concepts: [
      {
        heading: 'Pipelining Principles & Speedup Formula',
        points: [
          'Pipelining divides instruction execution into k independent stages so up to k instructions overlap concurrently like an assembly line.',
          'Latency of one single instruction does NOT decrease (in fact, register overhead slightly raises it), but Throughput approaches 1 instruction completed per clock cycle.',
          'Non-pipelined time for n instructions = n × k cycles. Pipelined time = (k + n − 1) cycles.',
          'Speedup S = (n × k) / (k + n − 1). As n → ∞, ideal speedup S → k.',
        ],
        formulaOrRtl: 'T_pipe = k + n − 1   |   Speedup  S = (n · k) / (k + n − 1)  →  k',
      },
      {
        heading: '5-Stage Datapath & Pipeline Control Registers',
        points: [
          'Pipeline Registers: IF/ID, ID/EX, EX/MEM, MEM/WB isolate stage computations on each clock edge.',
          'Separate Instruction and Data caches prevent structural memory collisions between IF and MEM.',
          'Control Unit decodes the opcode once in ID and forwards stage control signals down the pipeline: EX (RegDst, ALUOp, ALUSrc), MEM (Branch, MemRead, MemWrite), WB (RegWrite, MemtoReg).',
        ],
      },
    ],
    examples: [
      {
        title: '4-Stage Pipeline Speedup (CIE-2 LAQ 7)',
        problem: 'k = 4 stages, n = 100 instructions, clock = 10 ns. Find non-pipelined vs pipelined time and speedup.',
        steps: [
          'Non-pipelined = 100 × 4 = 400 cycles = 4000 ns.',
          'Pipelined = 4 + 100 − 1 = 103 cycles = 1030 ns.',
          'Speedup S = 400 / 103 ≈ 3.88× (very close to ideal 4×).',
        ],
        answer: '4000 ns → 1030 ns  |  Speedup ≈ 3.88×',
      },
    ],
    schematicId: 'pipeline-5stage',
    quickChecks: [
      {
        question: 'Does pipelining reduce the latency of an individual instruction or increase throughput?',
        answer: 'It increases instruction throughput (instructions per second); individual instruction latency remains ~k cycles (plus register overhead).',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-cie2-stu'],
  },
  {
    id: 'u5-ch3-hazards-superscalar',
    unitId: 'unit-5',
    unitNumber: 'Unit V',
    code: '5.3',
    title: 'Pipeline Hazards (Structural, Data, Control) & Superscalar ILP',
    lectures: 'L60, L62 – L64',
    co: 'CO6 (C31.6)',
    btl: 'BTL 4 · Analyze',
    estimatedMinutes: 35,
    summary:
      'Diagnosing and eliminating Structural, Data (RAW, WAR, WAW, Load-Use), and Control (Branch) hazards via forwarding, stalls, branch prediction, and Superscalar ILP.',
    concepts: [
      {
        heading: 'Three Classes of Pipeline Hazards',
        points: [
          'Structural Hazard: Two instructions compete for the same hardware resource in the same cycle (e.g., unified memory for IF and MEM). Solved by separate I-Cache / D-Cache and register write-first/read-second half-cycle.',
          'Data Hazard: An instruction depends on a result still in the pipeline. RAW (Read After Write — true dependency, occurs in in-order pipes); WAR (anti-dependency) and WAW (output dependency) occur in out-of-order/multicycle pipelines.',
          'Control (Instruction) Hazard: Branch instructions alter PC, invalidating prefetched instructions until the branch target/outcome is known in EX/MEM.',
        ],
      },
      {
        heading: 'Mitigation Techniques & Superscalar Execution',
        points: [
          'Data Forwarding (Bypassing): Routes ALU results directly from EX/MEM or MEM/WB to ALU inputs in EX—eliminates ALU→ALU RAW stalls. Load-Use hazard still requires 1 stall cycle because memory data is ready only after MEM.',
          'Pipeline Stalling (Bubbles/NOPs), Compiler Instruction Scheduling (reordering independent instructions into delay slots), and Register Renaming (removes WAR/WAW).',
          'Control Hazard Fixes: Early branch resolution in ID, Delayed Branch slots, Static/Dynamic Branch Prediction (1-bit/2-bit predictors, Branch Target Buffer).',
          'Superscalar Operation: Multiple parallel pipelines fetch, decode, and issue multiple independent instructions per clock cycle to exploit Instruction-Level Parallelism (ILP > 1 IPC).',
        ],
      },
    ],
    tables: [
      {
        title: 'Data Hazard Types & Resolution Summary',
        headers: ['Type', 'Meaning', 'Example', 'Solution'],
        rows: [
          ['RAW (True)', 'Read before prior write completes', 'ADD R1,R2,R3 ; SUB R4,R1,R5', 'Data Forwarding / 1-cycle Load-Use Stall'],
          ['WAR (Anti)', 'Write before prior read completes', 'SUB R4,R1,R5 ; ADD R1,R2,R3', 'Register Renaming (Out-of-Order CPUs)'],
          ['WAW (Output)', 'Writes finish out of program order', 'ADD R1,R2,R3 ; SUB R1,R4,R5', 'Register Renaming / In-order Commit'],
        ],
      },
    ],
    quickChecks: [
      {
        question: 'Why does a LW R1, 0(R2) followed immediately by ADD R4, R1, R5 still incur 1 stall cycle even with forwarding?',
        answer: 'The loaded data from D-Memory is only available at the end of the MEM stage (T4), whereas ADD needs it at the start of its EX stage—forcing 1 bubble before forwarding from MEM/WB.',
      },
      {
        question: 'How does Superscalar execution differ from standard scalar pipelining?',
        answer: 'Scalar pipelining overlaps stages to finish at most 1 instruction per clock; Superscalar replicates functional units and pipelines to issue multiple instructions per clock.',
      },
    ],
    resourceIds: ['res-cie2-ans', 'res-u5-risc', 'res-qp-prev'],
  },
];
