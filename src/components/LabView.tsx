import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Pause,
  Play,
  RotateCcw,
  StepForward,
} from 'lucide-react';

type LabModule = 'data-rep' | 'logic-kmap' | 'cache-sim' | 'pipeline-sim';

// Gray code ordering for 3-variable K-Map columns (BC: 00, 01, 11, 10)
const KMAP_COLS = [
  { label: '00', bc: [0, 0] },
  { label: '01', bc: [0, 1] },
  { label: '11', bc: [1, 1] },
  { label: '10', bc: [1, 0] },
];

type PipelineScenarioId = 'ideal' | 'raw-stall' | 'raw-forward' | 'load-use' | 'branch-flush';

interface PipelineRow {
  instruction: string;
  stages: (string | null)[];
}

const PIPELINE_SCENARIOS: Record<
  PipelineScenarioId,
  {
    title: string;
    subtitle: string;
    formulaNote: string;
    rows: PipelineRow[];
    maxCycles: number;
  }
> = {
  ideal: {
    title: 'Ideal 5-Stage Overlap (No Hazards)',
    subtitle: 'One instruction finishes every clock cycle once the pipe fills (Throughput = 1 IPC).',
    formulaNote: 'k = 5 stages, n = 4 instructions → Cycles = k + n − 1 = 8',
    maxCycles: 8,
    rows: [
      { instruction: 'ADD R1, R2, R3', stages: ['IF', 'ID', 'EX', 'MEM', 'WB', null, null, null] },
      { instruction: 'SUB R4, R5, R6', stages: [null, 'IF', 'ID', 'EX', 'MEM', 'WB', null, null] },
      { instruction: 'AND R7, R8, R9', stages: [null, null, 'IF', 'ID', 'EX', 'MEM', 'WB', null] },
      { instruction: 'OR  R10,R11,R12', stages: [null, null, null, 'IF', 'ID', 'EX', 'MEM', 'WB'] },
    ],
  },
  'raw-stall': {
    title: 'RAW Data Hazard Resolved by Stalls',
    subtitle: 'SUB needs R1 at ID (T3), but ADD writes R1 in WB (T5): 2 stall bubbles inserted.',
    formulaNote: '2 stall bubbles delay pipeline completion from T6 to T8.',
    maxCycles: 8,
    rows: [
      { instruction: 'ADD R1, R2, R3', stages: ['IF', 'ID', 'EX', 'MEM', 'WB', null, null, null] },
      { instruction: 'SUB R4, R1, R5', stages: [null, 'IF', 'STALL', 'STALL', 'ID', 'EX', 'MEM', 'WB'] },
    ],
  },
  'raw-forward': {
    title: 'RAW Data Hazard Eliminated via Forwarding',
    subtitle: 'EX/MEM and MEM/WB forward R1 directly to ALU inputs in EX — zero stalls needed.',
    formulaNote: 'Data Forwarding removes ALU→ALU RAW bubbles; OR reads R1 cleanly in T5.',
    maxCycles: 8,
    rows: [
      { instruction: 'ADD R1, R2, R3', stages: ['IF', 'ID', 'EX', 'MEM', 'WB', null, null, null] },
      { instruction: 'SUB R4, R1, R5', stages: [null, 'IF', 'ID', 'EX', 'MEM', 'WB', null, null] },
      { instruction: 'AND R6, R1, R7', stages: [null, null, 'IF', 'ID', 'EX', 'MEM', 'WB', null] },
      { instruction: 'OR  R8, R1, R9', stages: [null, null, null, 'IF', 'ID', 'EX', 'MEM', 'WB'] },
    ],
  },
  'load-use': {
    title: 'Load-Use Hazard (Forwarding + 1 Stall)',
    subtitle: 'LW data is read from memory only after MEM (T4), so 1 stall is required even with forwarding.',
    formulaNote: 'Hazard Detection Unit holds PC and IF/ID for 1 cycle before MEM/WB → EX bypass.',
    maxCycles: 7,
    rows: [
      { instruction: 'LW  R1, 0(R2)', stages: ['IF', 'ID', 'EX', 'MEM', 'WB', null, null] },
      { instruction: 'ADD R4, R1, R5', stages: [null, 'IF', 'ID', 'STALL', 'EX', 'MEM', 'WB'] },
    ],
  },
  'branch-flush': {
    title: 'Control (Branch) Hazard & Pipeline Flush',
    subtitle: 'Branch outcome known in EX/MEM; speculatively fetched instructions are flushed on Taken branch.',
    formulaNote: 'Branch prediction reduces flush penalties on tight loops.',
    maxCycles: 8,
    rows: [
      { instruction: 'BEQ R1, R2, +24', stages: ['IF', 'ID', 'EX', 'MEM', 'WB', null, null, null] },
      { instruction: 'ADD (Wrong Path)', stages: [null, 'IF', 'ID', 'FLUSH', null, null, null, null] },
      { instruction: 'Target: SUB R3,R4', stages: [null, null, null, 'IF', 'ID', 'EX', 'MEM', 'WB'] },
    ],
  },
};

export const LabView: React.FC = () => {
  const [activeLab, setActiveLab] = useState<LabModule>('data-rep');

  // --- Lab 1: Data Representation & IEEE-754 ---
  const [decimalInput, setDecimalInput] = useState<number>(-15);
  const [floatInput, setFloatInput] = useState<number>(12.5);
  const [bitWidth, setBitWidth] = useState<8 | 16>(8);

  const dataRepResult = useMemo(() => {
    const mask = (1 << bitWidth) - 1;
    const minSigned = -(1 << (bitWidth - 1));
    const maxSigned = (1 << (bitWidth - 1)) - 1;
    const clamped = Math.max(minSigned, Math.min(maxSigned, Math.trunc(decimalInput || 0)));
    const twosBits = (clamped & mask).toString(2).padStart(bitWidth, '0');
    const absVal = Math.abs(clamped);
    const magBits = absVal.toString(2).padStart(bitWidth - 1, '0').slice(-(bitWidth - 1));
    const signMagBits = (clamped < 0 ? '1' : '0') + magBits;
    const onesVal = clamped < 0 ? (~absVal) & mask : absVal & mask;
    const onesBits = onesVal.toString(2).padStart(bitWidth, '0');

    // Unsigned Binary -> Gray for |clamped|
    const binMag = absVal.toString(2).padStart(6, '0');
    let grayStr = binMag[0];
    for (let i = 1; i < binMag.length; i++) {
      grayStr += binMag[i - 1] === binMag[i] ? '0' : '1';
    }

    // IEEE 754 single precision via DataView
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setFloat32(0, Number.isFinite(floatInput) ? floatInput : 0, false);
    const raw32 = view.getUint32(0, false).toString(2).padStart(32, '0');
    const hex32 = view.getUint32(0, false).toString(16).toUpperCase().padStart(8, '0');

    return {
      clamped,
      minSigned,
      maxSigned,
      twosBits,
      onesBits,
      signMagBits,
      hexTwos: (clamped & mask).toString(16).toUpperCase().padStart(bitWidth / 4, '0'),
      octTwos: (clamped & mask).toString(8),
      binMag,
      grayStr,
      ieeeSign: raw32.slice(0, 1),
      ieeeExp: raw32.slice(1, 9),
      ieeeMant: raw32.slice(9),
      ieeeHex: hex32,
      expVal: parseInt(raw32.slice(1, 9), 2),
    };
  }, [decimalInput, bitWidth, floatInput]);

  // --- Lab 2: Logic Gates & 3-Var K-Map ---
  const [gateA, setGateA] = useState<0 | 1>(1);
  const [gateB, setGateB] = useState<0 | 1>(0);
  const [gateCin, setGateCin] = useState<0 | 1>(1);
  // Default to Majority Function: Σm(3,5,6,7) from Surprise Test 1 Q3
  const [minterms, setMinterms] = useState<boolean[]>([
    false, false, false, true, false, true, true, true,
  ]);

  const toggleMinterm = (idx: number) => {
    setMinterms((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const kmapSummary = useMemo(() => {
    const ones: number[] = [];
    const zeros: number[] = [];
    const sopTerms: string[] = [];
    minterms.forEach((val, m) => {
      if (val) {
        ones.push(m);
        const a = m & 4 ? 'A' : "A'";
        const b = m & 2 ? 'B' : "B'";
        const c = m & 1 ? 'C' : "C'";
        sopTerms.push(`${a}${b}${c}`);
      } else {
        zeros.push(m);
      }
    });
    return {
      ones,
      zeros,
      canonicalSop: ones.length > 0 ? sopTerms.join(' + ') : '0',
      mintermList: ones.length > 0 ? `Σm(${ones.join(', ')})` : '0',
      maxtermList: zeros.length > 0 ? `ΠM(${zeros.join(', ')})` : '1',
    };
  }, [minterms]);

  // --- Lab 3: Cache Mapping & Effective Access Time ---
  const [memSizeKb, setMemSizeKb] = useState<number>(64);
  const [blockWords, setBlockWords] = useState<number>(16);
  const [cacheLines, setCacheLines] = useState<number>(128);
  const [ways, setWays] = useState<number>(2);
  const [hitRatio, setHitRatio] = useState<number>(0.95);
  const [cacheNs, setCacheNs] = useState<number>(10);
  const [ramNs, setRamNs] = useState<number>(100);

  const cacheStats = useMemo(() => {
    const addrBits = Math.round(Math.log2(memSizeKb * 1024));
    const wordBits = Math.round(Math.log2(blockWords));
    const effectiveWays = ways === 0 ? cacheLines : Math.min(ways, cacheLines);
    const numSets = Math.max(1, Math.round(cacheLines / effectiveWays));
    const setBits = effectiveWays === cacheLines ? 0 : Math.round(Math.log2(numSets));
    const tagBits = Math.max(1, addrBits - setBits - wordBits);
    const tEff = hitRatio * cacheNs + (1 - hitRatio) * ramNs;
    const speedup = ramNs / tEff;

    return {
      addrBits,
      wordBits,
      setBits,
      tagBits,
      numSets,
      effectiveWays,
      tEff: tEff.toFixed(1),
      speedup: speedup.toFixed(2),
    };
  }, [memSizeKb, blockWords, cacheLines, ways, hitRatio, cacheNs, ramNs]);

  // --- Lab 4: 5-Stage Pipeline Stepper ---
  const [scenarioId, setScenarioId] = useState<PipelineScenarioId>('raw-forward');
  const [currentCycle, setCurrentCycle] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const scenario = PIPELINE_SCENARIOS[scenarioId];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setCurrentCycle((c) => {
        if (c >= scenario.maxCycles) {
          setIsPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, 850);
    return () => window.clearInterval(timer);
  }, [isPlaying, scenario.maxCycles]);

  const handleSelectScenario = (nextId: PipelineScenarioId) => {
    setIsPlaying(false);
    setScenarioId(nextId);
    setCurrentCycle(PIPELINE_SCENARIOS[nextId].maxCycles);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Lab Switcher Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-medium text-sky-700 dark:text-sky-400">
            Interactive Hardware Workbench · Units I, II, IV & V
          </p>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            DECO Concept Sandboxes
          </h1>
        </div>

        <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {[
            { id: 'data-rep', label: '1. Number & IEEE-754' },
            { id: 'logic-kmap', label: '2. Gates & K-Map' },
            { id: 'cache-sim', label: '3. Cache Mapping' },
            { id: 'pipeline-sim', label: '4. Pipeline Stepper' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLab(tab.id as LabModule)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeLab === tab.id
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SANDBOX 1: DATA REPRESENTATION & IEEE-754 */}
      {activeLab === 'data-rep' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Stage (65% -> 8 cols) */}
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-8 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Integer Complement & Code Matrix ({bitWidth}-bit Signed Range: {dataRepResult.minSigned} to +{dataRepResult.maxSigned})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspect how signed integers and single-precision reals map to hardware bits.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  2’s Complement ({bitWidth}-bit)
                </p>
                <p className="mt-1 font-mono text-lg font-bold tracking-wider text-sky-700 tabular-nums dark:text-sky-400">
                  {dataRepResult.twosBits}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  Hex: {dataRepResult.hexTwos}₁₆ · Oct: {dataRepResult.octTwos}₈
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  1’s Complement & Sign-Magnitude
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-900 tabular-nums dark:text-slate-100">
                  1’s: {dataRepResult.onesBits}
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-700 tabular-nums dark:text-slate-300">
                  S-M: {dataRepResult.signMagBits}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                6-Bit Magnitude Binary → Gray Code Conversion (|n| = {Math.abs(dataRepResult.clamped)})
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-6 font-mono text-sm tabular-nums">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Binary: </span>
                  <span className="font-bold text-slate-900 dark:text-white">{dataRepResult.binMag}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Gray: </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{dataRepResult.grayStr}</span>
                </div>
              </div>
            </div>

            {/* IEEE 754 Bit Visualizer */}
            <div className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  IEEE 754 Single-Precision (32-Bit) Bit Field
                </h3>
                <span className="font-mono text-xs font-semibold text-slate-600 tabular-nums dark:text-slate-300">
                  Hex: 0x{dataRepResult.ieeeHex}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                <div className="rounded-lg border border-rose-300 bg-rose-50 p-3 sm:col-span-2 dark:border-rose-800 dark:bg-rose-950/40">
                  <p className="text-[11px] font-semibold text-rose-700 dark:text-rose-300">Sign (1b)</p>
                  <p className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white">
                    {dataRepResult.ieeeSign}
                  </p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400">
                    {dataRepResult.ieeeSign === '0' ? 'Positive' : 'Negative'}
                  </p>
                </div>

                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 sm:col-span-4 dark:border-amber-800 dark:bg-amber-950/40">
                  <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                    Exponent (8b, Bias 127)
                  </p>
                  <p className="mt-1 font-mono text-base font-bold text-slate-900 tabular-nums dark:text-white">
                    {dataRepResult.ieeeExp}
                  </p>
                  <p className="font-mono text-[10px] text-slate-600 tabular-nums dark:text-slate-400">
                    E = {dataRepResult.expVal} (e = {dataRepResult.expVal - 127})
                  </p>
                </div>

                <div className="rounded-lg border border-sky-300 bg-sky-50 p-3 sm:col-span-6 dark:border-sky-800 dark:bg-sky-950/40">
                  <p className="text-[11px] font-semibold text-sky-800 dark:text-sky-300">
                    Mantissa / Fraction (23b)
                  </p>
                  <p className="mt-1 break-all font-mono text-sm font-bold text-slate-900 tabular-nums dark:text-white">
                    {dataRepResult.ieeeMant}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Control Deck (35% -> 4 cols) */}
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Input Parameters
            </h3>

            <div className="space-y-2">
              <label htmlFor="dec-int-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Signed Integer Value: <span className="font-mono text-sky-700 dark:text-sky-400">{dataRepResult.clamped}</span>
              </label>
              <input
                id="dec-int-input"
                type="number"
                value={decimalInput}
                onChange={(e) => setDecimalInput(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[-18, -15, 25, 45].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDecimalInput(preset)}
                    className="rounded border border-slate-200 px-2 py-1 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Register Width (bits)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {([8, 16] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setBitWidth(w)}
                    className={`rounded-lg border py-2 font-mono text-xs font-semibold ${
                      bitWidth === w
                        ? 'border-sky-600 bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300'
                        : 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {w}-bit
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <label htmlFor="float-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                IEEE 754 Real Number: <span className="font-mono text-sky-700 dark:text-sky-400">{floatInput}</span>
              </label>
              <input
                id="float-input"
                type="number"
                step="0.25"
                value={floatInput}
                onChange={(e) => setFloatInput(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[12.5, -6.75, 0.5, 163.875].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setFloatInput(preset)}
                    className="rounded border border-slate-200 px-2 py-1 font-mono text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SANDBOX 2: LOGIC GATES & 3-VARIABLE K-MAP */}
      {activeLab === 'logic-kmap' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-8 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Interactive 3-Variable Karnaugh Map F(A, B, C)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any K-map cell to toggle 0 / 1. Adjacent Gray-code cells differ by 1 variable.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-lg border-collapse text-center font-mono text-sm tabular-nums">
                <thead>
                  <tr>
                    <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                      A \ BC
                    </th>
                    {KMAP_COLS.map((col) => (
                      <th
                        key={col.label}
                        className="border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1].map((a) => (
                    <tr key={a}>
                      <th className="border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                        A = {a}
                      </th>
                      {KMAP_COLS.map((col) => {
                        const mIdx = (a << 2) | (col.bc[0] << 1) | col.bc[1];
                        const isOne = minterms[mIdx];
                        return (
                          <td
                            key={col.label}
                            className="border border-slate-200 p-1.5 dark:border-slate-800"
                          >
                            <button
                              type="button"
                              onClick={() => toggleMinterm(mIdx)}
                              className={`flex w-full flex-col items-center justify-center rounded-lg py-2.5 transition ${
                                isOne
                                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-800'
                              }`}
                            >
                              <span className="text-lg font-bold">{isOne ? '1' : '0'}</span>
                              <span className="text-[10px] opacity-80">m{mIdx}</span>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-950">
              <p className="text-slate-700 dark:text-slate-200">
                <span className="font-semibold text-sky-700 dark:text-sky-400">Canonical SOP: </span>
                F(A, B, C) = {kmapSummary.mintermList}
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Canonical POS: </span>
                F(A, B, C) = {kmapSummary.maxtermList}
              </p>
              <p className="break-words text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Expanded Minterms: </span>
                {kmapSummary.canonicalSop}
              </p>
            </div>

            {/* Live Logic Gate & Full Adder Output Matrix */}
            <div className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                Live Gate & Full-Adder Output Probe (A={gateA}, B={gateB}, Cin={gateCin})
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { name: 'AND (A·B)', val: gateA & gateB },
                  { name: 'OR (A+B)', val: gateA | gateB },
                  { name: 'NAND', val: Number(!(gateA & gateB)) },
                  { name: 'NOR', val: Number(!(gateA | gateB)) },
                  { name: 'XOR (A⊕B)', val: gateA ^ gateB },
                  { name: 'XNOR', val: Number((gateA ^ gateB) === 0) },
                  { name: 'FA Sum', val: gateA ^ gateB ^ gateCin },
                  { name: 'FA Cout', val: (gateA & gateB) | (gateCin & (gateA ^ gateB)) },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`rounded-lg border p-3 ${
                      item.val === 1
                        ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/30'
                        : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950'
                    }`}
                  >
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{item.name}</p>
                    <p className="mt-0.5 font-mono text-base font-bold text-slate-900 dark:text-white">
                      {item.val} ({item.val === 1 ? 'HIGH' : 'LOW'})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Gate Input Toggles & Presets
            </h3>

            <div className="space-y-2.5">
              {[
                { label: 'Input A', val: gateA, setter: setGateA },
                { label: 'Input B', val: gateB, setter: setGateB },
                { label: 'Carry-In (Cin)', val: gateCin, setter: setGateCin },
              ].map((ctrl) => (
                <div key={ctrl.label} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {ctrl.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => ctrl.setter(ctrl.val === 1 ? 0 : 1)}
                    className={`rounded-md px-3 py-1 font-mono text-xs font-bold ${
                      ctrl.val === 1
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {ctrl.val} ({ctrl.val === 1 ? 'HIGH' : 'LOW'})
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Load Exam K-Map Presets
              </p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setMinterms([false, false, false, true, false, true, true, true])}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Majority / FA Carry: Σm(3, 5, 6, 7)
                </button>
                <button
                  type="button"
                  onClick={() => setMinterms([false, true, false, true, false, true, false, true])}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Course File Quiz Q14: Σm(1, 3, 5, 7) → F = C
                </button>
                <button
                  type="button"
                  onClick={() => setMinterms([false, true, true, false, false, false, false, true])}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Surprise Test 1 Q2: Σm(1, 2, 7)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SANDBOX 3: CACHE MAPPING & EFFECTIVE ACCESS TIME */}
      {activeLab === 'cache-sim' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-8 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Address Field Split ({cacheStats.addrBits}-bit CPU Address)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualizes Tag, Set/Line Index, and Word Offset widths across Direct, Set-Associative, and Fully Associative caching.
              </p>
            </div>

            {/* Proportional Address Bar */}
            <div className="flex h-16 w-full overflow-hidden rounded-xl border border-slate-300 font-mono text-xs font-bold dark:border-slate-700">
              <div
                style={{ flexGrow: cacheStats.tagBits }}
                className="flex flex-col items-center justify-center bg-amber-100 text-amber-950 dark:bg-amber-950/60 dark:text-amber-200"
              >
                <span>TAG</span>
                <span className="tabular-nums">{cacheStats.tagBits} bits</span>
              </div>
              {cacheStats.setBits > 0 && (
                <div
                  style={{ flexGrow: cacheStats.setBits }}
                  className="flex flex-col items-center justify-center border-l border-slate-300 bg-sky-100 text-sky-950 dark:border-slate-700 dark:bg-sky-950/60 dark:text-sky-200"
                >
                  <span>{ways === 1 ? 'LINE' : 'SET'}</span>
                  <span className="tabular-nums">{cacheStats.setBits} bits</span>
                </div>
              )}
              <div
                style={{ flexGrow: cacheStats.wordBits }}
                className="flex flex-col items-center justify-center border-l border-slate-300 bg-emerald-100 text-emerald-950 dark:border-slate-700 dark:bg-emerald-950/60 dark:text-emerald-200"
              >
                <span>WORD</span>
                <span className="tabular-nums">{cacheStats.wordBits} bits</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs text-slate-500 dark:text-slate-400">Effective Access Time (T_eff)</p>
                <p className="mt-1 font-display text-2xl font-bold text-sky-700 tabular-nums dark:text-sky-400">
                  {cacheStats.tEff} ns
                </p>
                <p className="mt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {hitRatio.toFixed(2)}×{cacheNs} + {(1 - hitRatio).toFixed(2)}×{ramNs}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs text-slate-500 dark:text-slate-400">Memory Speedup vs Direct RAM</p>
                <p className="mt-1 font-display text-2xl font-bold text-emerald-700 tabular-nums dark:text-emerald-400">
                  {cacheStats.speedup}×
                </p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  vs {ramNs} ns uncached DRAM
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs text-slate-500 dark:text-slate-400">Hardware Tag Comparators</p>
                <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                  {cacheStats.effectiveWays}
                </p>
                <p className="mt-1 font-mono text-[11px] text-slate-500 tabular-nums dark:text-slate-400">
                  {cacheStats.numSets} set{cacheStats.numSets === 1 ? '' : 's'} active
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Cache & Timing Parameters
            </h3>

            <div className="space-y-1.5">
              <label htmlFor="hit-ratio-slider" className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Cache Hit Ratio (h)</span>
                <span className="font-mono text-sky-700 tabular-nums dark:text-sky-400">{(hitRatio * 100).toFixed(0)}% ({hitRatio.toFixed(2)})</span>
              </label>
              <input
                id="hit-ratio-slider"
                type="range"
                min="0.50"
                max="0.99"
                step="0.01"
                value={hitRatio}
                onChange={(e) => setHitRatio(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tc-slider" className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Cache Access Time (t_c)</span>
                <span className="font-mono tabular-nums">{cacheNs} ns</span>
              </label>
              <input
                id="tc-slider"
                type="range"
                min="1"
                max="25"
                step="1"
                value={cacheNs}
                onChange={(e) => setCacheNs(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tm-slider" className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Main RAM Access Time (t_m)</span>
                <span className="font-mono tabular-nums">{ramNs} ns</span>
              </label>
              <input
                id="tm-slider"
                type="range"
                min="40"
                max="200"
                step="10"
                value={ramNs}
                onChange={(e) => setRamNs(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
              <div>
                <label htmlFor="ram-select" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Main Memory (Words)
                </label>
                <select
                  id="ram-select"
                  value={memSizeKb}
                  onChange={(e) => setMemSizeKb(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value={16}>16K (14-bit)</option>
                  <option value={64}>64K (16-bit)</option>
                  <option value={256}>256K (18-bit)</option>
                </select>
              </div>
              <div>
                <label htmlFor="block-select" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Block Size (Words)
                </label>
                <select
                  id="block-select"
                  value={blockWords}
                  onChange={(e) => setBlockWords(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value={4}>4 Words</option>
                  <option value={8}>8 Words</option>
                  <option value={16}>16 Words</option>
                  <option value={32}>32 Words</option>
                </select>
              </div>
              <div>
                <label htmlFor="lines-select" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Cache Lines
                </label>
                <select
                  id="lines-select"
                  value={cacheLines}
                  onChange={(e) => setCacheLines(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value={64}>64 Lines</option>
                  <option value={128}>128 Lines</option>
                  <option value={256}>256 Lines</option>
                </select>
              </div>
              <div>
                <label htmlFor="mapping-select" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Mapping Mode
                </label>
                <select
                  id="mapping-select"
                  value={ways}
                  onChange={(e) => setWays(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value={1}>Direct (1-way)</option>
                  <option value={2}>2-Way Set-Assoc</option>
                  <option value={4}>4-Way Set-Assoc</option>
                  <option value={0}>Fully Associative</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SANDBOX 4: 5-STAGE PIPELINE & HAZARD STEPPER */}
      {activeLab === 'pipeline-sim' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {scenario.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">{scenario.subtitle}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-sky-700 tabular-nums dark:text-sky-400">
                <Cpu className="h-4 w-4" />
                <span>Clock Cycle: T{currentCycle} / T{scenario.maxCycles}</span>
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-center font-mono text-xs tabular-nums">
                <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-2 text-left">Instruction</th>
                    {Array.from({ length: scenario.maxCycles }, (_, i) => (
                      <th
                        key={i}
                        className={`px-2 py-2 ${
                          i + 1 === currentCycle ? 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300' : ''
                        }`}
                      >
                        T{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {scenario.rows.map((row) => (
                    <tr key={row.instruction}>
                      <td className="px-3 py-2.5 text-left font-semibold whitespace-nowrap text-slate-900 dark:text-white">
                        {row.instruction}
                      </td>
                      {row.stages.slice(0, scenario.maxCycles).map((st, idx) => {
                        const visible = idx + 1 <= currentCycle;
                        if (!st || !visible) {
                          return <td key={idx} className="px-2 py-2.5 text-slate-300 dark:text-slate-700">·</td>;
                        }
                        const isHazard = st === 'STALL' || st === 'FLUSH';
                        return (
                          <td key={idx} className="p-1.5">
                            <span
                              className={`inline-flex items-center justify-center gap-1 rounded px-2 py-1 text-[11px] font-bold ${
                                isHazard
                                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                                  : 'bg-sky-100 text-sky-900 dark:bg-sky-950/70 dark:text-sky-200'
                              }`}
                            >
                              {isHazard && <AlertTriangle className="h-3 w-3" />}
                              <span>{st}</span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{scenario.formulaNote}</span>
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              Clock & Scenario Controls
            </h3>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  if (currentCycle >= scenario.maxCycles) setCurrentCycle(1);
                  setIsPlaying((p) => !p);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentCycle((c) => Math.min(scenario.maxCycles, c + 1));
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <StepForward className="h-3.5 w-3.5" />
                <span>Step +1</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentCycle(1);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cycle-slider" className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Inspect Clock Cycle</span>
                <span className="font-mono tabular-nums">T{currentCycle}</span>
              </label>
              <input
                id="cycle-slider"
                type="range"
                min={1}
                max={scenario.maxCycles}
                value={currentCycle}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentCycle(Number(e.target.value));
                }}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1.5 border-t border-slate-200 pt-4 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Select Pipeline Scenario
              </p>
              {(Object.keys(PIPELINE_SCENARIOS) as PipelineScenarioId[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectScenario(key)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                    scenarioId === key
                      ? 'border-sky-500 bg-sky-50 text-sky-900 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-200'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {PIPELINE_SCENARIOS[key].title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
