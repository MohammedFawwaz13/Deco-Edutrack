import React from 'react';
import { Chapter } from '../types';

interface SchematicProps {
  id: NonNullable<Chapter['schematicId']>;
}

export const HardwareSchematic: React.FC<SchematicProps> = ({ id }) => {
  switch (id) {
    case 'von-neumann':
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 720 220" className="h-auto w-full" role="img" aria-label="Von Neumann Functional Units and System Bus">
            <rect x="20" y="70" width="110" height="72" rx="8" className="fill-sky-50 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400" strokeWidth="1.5" />
            <text x="75" y="102" textAnchor="middle" className="fill-slate-900 text-xs font-semibold dark:fill-slate-100">Input Unit</text>
            <text x="75" y="120" textAnchor="middle" className="fill-slate-500 text-[10px] dark:fill-slate-400">Keyboard / I/O</text>

            <rect x="175" y="20" width="210" height="175" rx="10" className="fill-slate-50 stroke-slate-400 dark:fill-slate-800/70 dark:stroke-slate-600" strokeWidth="1.5" />
            <text x="280" y="42" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-white">Central Processing Unit (CPU)</text>
            <rect x="192" y="56" width="84" height="58" rx="6" className="fill-amber-50 stroke-amber-600 dark:fill-amber-950/40 dark:stroke-amber-400" strokeWidth="1.5" />
            <text x="234" y="82" textAnchor="middle" className="fill-slate-900 text-[11px] font-semibold dark:fill-slate-100">Control Unit</text>
            <text x="234" y="98" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">PC · IR · Timing</text>

            <rect x="286" y="56" width="84" height="58" rx="6" className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" strokeWidth="1.5" />
            <text x="328" y="82" textAnchor="middle" className="fill-slate-900 text-[11px] font-semibold dark:fill-slate-100">ALU</text>
            <text x="328" y="98" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">Arithmetic / Logic</text>

            <rect x="192" y="126" width="178" height="54" rx="6" className="fill-white stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-700" strokeWidth="1.5" />
            <text x="281" y="150" textAnchor="middle" className="fill-slate-900 text-[11px] font-semibold dark:fill-slate-100">Registers (R0..Rn, MAR, MDR)</text>
            <text x="281" y="166" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">High-Speed Internal Storage</text>

            <rect x="440" y="50" width="140" height="112" rx="8" className="fill-indigo-50 stroke-indigo-600 dark:fill-indigo-950/40 dark:stroke-indigo-400" strokeWidth="1.5" />
            <text x="510" y="88" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">Main Memory</text>
            <text x="510" y="106" textAnchor="middle" className="fill-slate-600 text-[10px] dark:fill-slate-300">Single Space for</text>
            <text x="510" y="120" textAnchor="middle" className="fill-slate-600 text-[10px] dark:fill-slate-300">Instructions & Data</text>
            <text x="510" y="142" textAnchor="middle" className="fill-indigo-700 text-[9px] font-mono dark:fill-indigo-300">Fetch ↔ Execute</text>

            <rect x="610" y="70" width="90" height="72" rx="8" className="fill-sky-50 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400" strokeWidth="1.5" />
            <text x="655" y="102" textAnchor="middle" className="fill-slate-900 text-xs font-semibold dark:fill-slate-100">Output Unit</text>
            <text x="655" y="120" textAnchor="middle" className="fill-slate-500 text-[10px] dark:fill-slate-400">Display / Printer</text>

            <line x1="130" y1="106" x2="175" y2="106" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2" />
            <line x1="385" y1="90" x2="440" y2="90" className="stroke-rose-500" strokeWidth="2.5" />
            <line x1="385" y1="120" x2="440" y2="120" className="stroke-slate-500" strokeWidth="2" />
            <text x="412" y="80" textAnchor="middle" className="fill-rose-600 text-[9px] font-semibold dark:fill-rose-400">Bus</text>
            <line x1="580" y1="106" x2="610" y2="106" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="2" />
          </svg>
          <figcaption className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Schematic 1.1 — Five functional computer units connected over Address, Data, and Control bus lines.
          </figcaption>
        </figure>
      );

    case 'adder-subtractor':
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 720 210" className="h-auto w-full" role="img" aria-label="4-bit Binary Adder Subtractor Schematic">
            <text x="360" y="22" textAnchor="middle" className="fill-slate-700 text-xs font-semibold dark:fill-slate-200">
              Mode M = 0: Add (B⊕0 = B, C0 = 0)  |  Mode M = 1: Subtract (B⊕1 = B&apos;, C0 = 1)
            </text>
            {[3, 2, 1, 0].map((bit, idx) => {
              const x = 85 + idx * 155;
              return (
                <g key={bit}>
                  <rect x={x + 28} y="42" width="54" height="28" rx="5" className="fill-amber-50 stroke-amber-600 dark:fill-amber-950/40 dark:stroke-amber-400" strokeWidth="1.5" />
                  <text x={x + 55} y="60" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold dark:fill-slate-100">XOR</text>
                  <text x={x + 42} y="34" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono dark:fill-slate-300">B{bit}</text>
                  <text x={x + 12} y="88" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono dark:fill-slate-300">A{bit}</text>
                  <rect x={x} y="96" width="90" height="58" rx="6" className="fill-sky-50 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400" strokeWidth="1.5" />
                  <text x={x + 45} y="124" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">FA{bit}</text>
                  <text x={x + 45} y="140" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono dark:fill-slate-400">Full Adder</text>
                  <line x1={x + 55} y1="70" x2={x + 55} y2="96" className="stroke-slate-500" strokeWidth="1.5" />
                  <line x1={x + 45} y1="154" x2={x + 45} y2="178" className="stroke-emerald-600" strokeWidth="1.5" />
                  <text x={x + 45} y="194" textAnchor="middle" className="fill-emerald-700 text-xs font-mono font-bold dark:fill-emerald-400">S{bit}</text>
                </g>
              );
            })}
            <line x1="650" y1="56" x2="650" y2="125" className="stroke-amber-600" strokeWidth="1.5" />
            <line x1="650" y1="56" x2="167" y2="56" className="stroke-amber-600" strokeDasharray="4 2" strokeWidth="1.2" />
            <line x1="650" y1="125" x2="640" y2="125" className="stroke-amber-600" strokeWidth="1.5" />
            <text x="678" y="92" textAnchor="middle" className="fill-amber-700 text-xs font-mono font-bold dark:fill-amber-400">M (C0)</text>
            <text x="45" y="128" textAnchor="middle" className="fill-rose-600 text-[10px] font-mono font-bold dark:fill-rose-400">C4</text>
            <text x="360" y="206" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono dark:fill-slate-400">Signed Overflow Flag: V = C4 ⊕ C3</text>
          </svg>
        </figure>
      );

    case 'microprogrammed-cu':
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 720 190" className="h-auto w-full" role="img" aria-label="Microprogrammed Control Unit Block Diagram">
            <rect x="20" y="34" width="110" height="44" rx="6" className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" strokeWidth="1.5" />
            <text x="75" y="60" textAnchor="middle" className="fill-slate-900 text-xs font-semibold dark:fill-slate-100">IR Opcode Map</text>

            <rect x="170" y="24" width="120" height="58" rx="6" className="fill-amber-50 stroke-amber-600 dark:fill-amber-950/40 dark:stroke-amber-400" strokeWidth="1.5" />
            <text x="230" y="48" textAnchor="middle" className="fill-slate-900 text-xs font-semibold dark:fill-slate-100">Next-Addr MUX</text>
            <text x="230" y="66" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono dark:fill-slate-400">CAR+1 / AD / SBR</text>

            <rect x="330" y="30" width="84" height="46" rx="6" className="fill-sky-50 stroke-sky-600 dark:fill-sky-950/40 dark:stroke-sky-400" strokeWidth="1.5" />
            <text x="372" y="58" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">CAR</text>

            <rect x="450" y="22" width="130" height="62" rx="6" className="fill-indigo-50 stroke-indigo-600 dark:fill-indigo-950/40 dark:stroke-indigo-400" strokeWidth="1.5" />
            <text x="515" y="48" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">Control Memory</text>
            <text x="515" y="66" textAnchor="middle" className="fill-slate-500 text-[10px] dark:fill-slate-400">(ROM Microprograms)</text>

            <rect x="330" y="116" width="250" height="48" rx="6" className="fill-slate-50 stroke-slate-500 dark:fill-slate-800 dark:stroke-slate-600" strokeWidth="1.5" />
            <text x="455" y="138" textAnchor="middle" className="fill-slate-900 text-xs font-mono font-semibold dark:fill-slate-100">CDR: F1 | F2 | F3 | CD | BR | AD</text>
            <text x="455" y="154" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">20-bit Microinstruction Register → Control Signals</text>

            <line x1="130" y1="56" x2="170" y2="56" className="stroke-slate-500" strokeWidth="1.5" />
            <line x1="290" y1="53" x2="330" y2="53" className="stroke-slate-500" strokeWidth="1.5" />
            <line x1="414" y1="53" x2="450" y2="53" className="stroke-slate-500" strokeWidth="1.5" />
            <line x1="515" y1="84" x2="515" y2="116" className="stroke-indigo-600" strokeWidth="1.5" />
            <polyline points="330,140 230,140 230,82" fill="none" className="stroke-amber-600" strokeWidth="1.5" />
          </svg>
        </figure>
      );

    case 'dma-io':
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 720 190" className="h-auto w-full" role="img" aria-label="Direct Memory Access Controller Block Diagram">
            <rect x="30" y="24" width="140" height="72" rx="8" className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" strokeWidth="1.5" />
            <text x="100" y="54" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">CPU</text>
            <text x="100" y="72" textAnchor="middle" className="fill-slate-500 text-[10px] dark:fill-slate-400">Floats bus on BG</text>

            <rect x="260" y="18" width="200" height="86" rx="8" className="fill-sky-50 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400" strokeWidth="1.5" />
            <text x="360" y="38" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">DMA Controller (DMAC)</text>
            <text x="360" y="56" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono dark:fill-slate-300">Address Reg | Word Count</text>
            <text x="360" y="74" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono dark:fill-slate-300">Control Reg (R/W, Mode)</text>

            <rect x="545" y="24" width="145" height="72" rx="8" className="fill-rose-50 stroke-rose-600 dark:fill-rose-950/40 dark:stroke-rose-400" strokeWidth="1.5" />
            <text x="617" y="54" textAnchor="middle" className="fill-slate-900 text-xs font-bold dark:fill-slate-100">I/O Peripheral</text>
            <text x="617" y="72" textAnchor="middle" className="fill-slate-500 text-[10px] dark:fill-slate-400">Disk / NIC</text>

            <rect x="30" y="130" width="660" height="22" rx="4" className="fill-slate-100 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-600" strokeWidth="1.5" />
            <text x="360" y="145" textAnchor="middle" className="fill-slate-800 text-[10px] font-mono font-semibold dark:fill-slate-200">
              System Bus: Address | Data | Control (Direct I/O ↔ Main Memory when DMAC owns bus)
            </text>

            <line x1="170" y1="45" x2="260" y2="45" className="stroke-amber-600" strokeWidth="1.5" />
            <text x="215" y="39" textAnchor="middle" className="fill-amber-700 text-[9px] font-mono dark:fill-amber-400">BR / HOLD</text>
            <line x1="170" y1="70" x2="260" y2="70" className="stroke-emerald-600" strokeWidth="1.5" />
            <text x="215" y="84" textAnchor="middle" className="fill-emerald-700 text-[9px] font-mono dark:fill-emerald-400">BG / HLDA</text>

            <line x1="460" y1="56" x2="545" y2="56" className="stroke-rose-600" strokeWidth="1.5" />
            <text x="502" y="48" textAnchor="middle" className="fill-rose-700 text-[9px] font-mono dark:fill-rose-400">Req / Ack</text>
            <line x1="100" y1="96" x2="100" y2="130" className="stroke-slate-400" strokeWidth="1.5" />
            <line x1="360" y1="104" x2="360" y2="130" className="stroke-sky-600" strokeWidth="2" />
            <line x1="617" y1="96" x2="617" y2="130" className="stroke-slate-400" strokeWidth="1.5" />
          </svg>
        </figure>
      );

    case 'cache-mapping':
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 720 175" className="h-auto w-full" role="img" aria-label="2-Way Set Associative Cache Address Breakdown">
            <text x="360" y="22" textAnchor="middle" className="fill-slate-700 text-xs font-semibold dark:fill-slate-200">
              16-Bit Address Split (64K RAM, 16-Word Block, 128-Line 2-Way Set-Associative Cache)
            </text>
            <rect x="130" y="40" width="160" height="40" rx="5" className="fill-amber-50 stroke-amber-600 dark:fill-amber-950/40 dark:stroke-amber-400" strokeWidth="1.5" />
            <text x="210" y="64" textAnchor="middle" className="fill-slate-900 text-xs font-mono font-bold dark:fill-slate-100">TAG (6 bits)</text>
            <rect x="296" y="40" width="160" height="40" rx="5" className="fill-rose-50 stroke-rose-600 dark:fill-rose-950/40 dark:stroke-rose-400" strokeWidth="1.5" />
            <text x="376" y="64" textAnchor="middle" className="fill-slate-900 text-xs font-mono font-bold dark:fill-slate-100">SET (6 bits)</text>
            <rect x="462" y="40" width="128" height="40" rx="5" className="fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" strokeWidth="1.5" />
            <text x="526" y="64" textAnchor="middle" className="fill-slate-900 text-xs font-mono font-bold dark:fill-slate-100">WORD (4 bits)</text>

            <rect x="200" y="106" width="140" height="46" rx="6" className="fill-slate-50 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-600" strokeWidth="1.5" />
            <text x="270" y="128" textAnchor="middle" className="fill-slate-900 text-xs font-semibold dark:fill-slate-100">Way 0 (Tag + Block)</text>
            <text x="270" y="143" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">64 Sets Indexed</text>

            <rect x="375" y="106" width="140" height="46" rx="6" className="fill-slate-50 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-600" strokeWidth="1.5" />
            <text x="445" y="128" textAnchor="middle" className="fill-slate-900 text-xs font-semibold dark:fill-slate-100">Way 1 (Tag + Block)</text>
            <text x="445" y="143" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">2 Parallel Comparators</text>
          </svg>
        </figure>
      );

    case 'pipeline-5stage':
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 720 150" className="h-auto w-full" role="img" aria-label="5-Stage RISC Pipelined Datapath">
            {[
              { label: 'IF', sub: 'Fetch', cls: 'fill-sky-50 stroke-sky-600 dark:fill-sky-950/50 dark:stroke-sky-400' },
              { label: 'ID', sub: 'Decode/Reg', cls: 'fill-emerald-50 stroke-emerald-600 dark:fill-emerald-950/50 dark:stroke-emerald-400' },
              { label: 'EX', sub: 'ALU/Addr', cls: 'fill-amber-50 stroke-amber-600 dark:fill-amber-950/50 dark:stroke-amber-400' },
              { label: 'MEM', sub: 'Data Mem', cls: 'fill-indigo-50 stroke-indigo-600 dark:fill-indigo-950/50 dark:stroke-indigo-400' },
              { label: 'WB', sub: 'Write Back', cls: 'fill-rose-50 stroke-rose-600 dark:fill-rose-950/50 dark:stroke-rose-400' },
            ].map((stage, i) => {
              const x = 22 + i * 142;
              return (
                <g key={stage.label}>
                  <rect x={x} y="34" width="102" height="64" rx="8" className={stage.cls} strokeWidth="1.5" />
                  <text x={x + 51} y="62" textAnchor="middle" className="fill-slate-900 text-sm font-bold dark:fill-slate-100">{stage.label}</text>
                  <text x={x + 51} y="80" textAnchor="middle" className="fill-slate-600 text-[10px] dark:fill-slate-300">{stage.sub}</text>
                  {i < 4 && (
                    <>
                      <rect x={x + 112} y="24" width="18" height="84" rx="3" className="fill-slate-200 stroke-slate-500 dark:fill-slate-700 dark:stroke-slate-400" strokeWidth="1" />
                      <line x1={x + 102} y1="66" x2={x + 112} y2="66" className="stroke-slate-500" strokeWidth="1.5" />
                      <line x1={x + 130} y1="66" x2={x + 142} y2="66" className="stroke-slate-500" strokeWidth="1.5" />
                    </>
                  )}
                </g>
              );
            })}
            <text x="360" y="132" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono dark:fill-slate-400">
              Pipeline Registers: IF/ID · ID/EX · EX/MEM · MEM/WB — Ideal Speedup S = (n·k)/(k+n−1) → 5×
            </text>
          </svg>
        </figure>
      );
  }
};
