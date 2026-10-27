import React, { useCallback, useEffect, useState } from "react";
import { Lightbulb, Square, Volume2 } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { animalFor, type MathAnimal } from "../../data/mathAnimals";
import { NumberCritter } from "./NumberCritter";
import {
  buildMathTable,
  getOperationInfo,
  MATH_TABLE_NUMBERS,
  MATH_TABLE_OPERATIONS,
  type MathTableOperation,
  type MathTableRow,
} from "../../data/mathTableData";

interface OperationTheme {
  gradient: string;
  headerBorder: string;
  accentText: string;
  idleRow: string;
  activeRow: string;
  resultBox: string;
  symbolChip: string;
  numberActive: string;
  numberIdle: string;
  tabActive: string;
}

const OPERATION_THEME: Record<MathTableOperation, OperationTheme> = {
  multiply: {
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
    headerBorder: "border-indigo-300",
    accentText: "text-indigo-600",
    idleRow: "bg-white border-indigo-100 hover:bg-indigo-50",
    activeRow: "bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200",
    resultBox: "bg-indigo-100 text-indigo-800 border-indigo-200",
    symbolChip: "bg-indigo-500 text-white border-indigo-600",
    numberActive: "bg-indigo-600 text-white border-indigo-700 shadow-md",
    numberIdle: "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50",
    tabActive: "bg-indigo-600 text-white border-indigo-700 shadow-md",
  },
  divide: {
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    headerBorder: "border-emerald-300",
    accentText: "text-emerald-600",
    idleRow: "bg-white border-emerald-100 hover:bg-emerald-50",
    activeRow: "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200",
    resultBox: "bg-emerald-100 text-emerald-800 border-emerald-200",
    symbolChip: "bg-emerald-500 text-white border-emerald-600",
    numberActive: "bg-emerald-600 text-white border-emerald-700 shadow-md",
    numberIdle: "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    tabActive: "bg-emerald-600 text-white border-emerald-700 shadow-md",
  },
  add: {
    gradient: "from-sky-500 via-blue-500 to-indigo-600",
    headerBorder: "border-sky-300",
    accentText: "text-sky-600",
    idleRow: "bg-white border-sky-100 hover:bg-sky-50",
    activeRow: "bg-sky-50 border-sky-400 ring-2 ring-sky-200",
    resultBox: "bg-sky-100 text-sky-800 border-sky-200",
    symbolChip: "bg-sky-500 text-white border-sky-600",
    numberActive: "bg-sky-600 text-white border-sky-700 shadow-md",
    numberIdle: "bg-white text-sky-700 border-sky-200 hover:bg-sky-50",
    tabActive: "bg-sky-600 text-white border-sky-700 shadow-md",
  },
  subtract: {
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    headerBorder: "border-rose-300",
    accentText: "text-rose-600",
    idleRow: "bg-white border-rose-100 hover:bg-rose-50",
    activeRow: "bg-rose-50 border-rose-400 ring-2 ring-rose-200",
    resultBox: "bg-rose-100 text-rose-800 border-rose-200",
    symbolChip: "bg-rose-500 text-white border-rose-600",
    numberActive: "bg-rose-600 text-white border-rose-700 shadow-md",
    numberIdle: "bg-white text-rose-700 border-rose-200 hover:bg-rose-50",
    tabActive: "bg-rose-600 text-white border-rose-700 shadow-md",
  },
};

const TAB_IDLE = "bg-white text-slate-600 border-slate-200 hover:bg-slate-50";

export const MathTable: React.FC = () => {
  const [operation, setOperation] = useState<MathTableOperation>("multiply");
  const [tableNumber, setTableNumber] = useState<number>(2);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [isReadingAll, setIsReadingAll] = useState(false);
  // Menambah angka ini me-remount hewan di baris aktif agar animasi
  // "melompat" berulang tiap kali anak mengetuk baris yang sama.
  const [tapSeq, setTapSeq] = useState(0);

  const theme = OPERATION_THEME[operation];
  const operationInfo = getOperationInfo(operation);
  const rows = buildMathTable(operation, tableNumber);
  const mascot: MathAnimal = animalFor(tableNumber);

  const stopReadingAll = useCallback(() => {
    // Rantai bacaan dihentikan lewat sesi di speechHelper (bukan timer) agar
    // tidak ada ucapan yang tersisa menyusul setelah tombol Berhenti.
    speech.stopSequence();
    setIsReadingAll(false);
    setActiveRow(null);
  }, []);

  // Hentikan bacaan hanya saat komponen benar-benar meninggalkan layar.
  // JANGAN cancel di cleanup per-ganti operasi/angka: state sudah diubah
  // handler sebelum speak() sapaan, cleanup yang cancel justru memotong
  // kalimat sapaan yang baru mulai dibacakan.
  useEffect(() => {
    return () => {
      speech.stopSequence();
    };
  }, []);

  const handleSelectOperation = (next: MathTableOperation) => {
    if (next === operation) return;
    sounds.playPop();
    stopReadingAll();
    setOperation(next);
    speech.speak(getOperationInfo(next).label, 1, 1.15);
  };

  const handleSelectNumber = (next: number) => {
    if (next === tableNumber) return;
    sounds.playPop();
    stopReadingAll();
    setTableNumber(next);
    const friend = animalFor(next);
    speech.speak(
      `Ayo lihat tabel ${operationInfo.label} ${next} bersama ${friend.name}!`,
      0.95,
      1.18
    );
  };

  const handleMascotTap = () => {
    sounds.playPop();
    // Menyapa mascot di tengah "Dengar Semua": hentikan bacaan dulu supaya
    // status tombol kembali normal dan sapaan tidak tertelan rantai bacaan.
    stopReadingAll();
    speech.speak(
      `Halo! Aku ${mascot.name}, teman angka ${tableNumber}. Ayo dengarkan tabel ${operationInfo.label} ${tableNumber} ya!`,
      0.95,
      1.18
    );
  };

  const handleTapRow = (row: MathTableRow, index: number) => {
    sounds.playPop();
    // speak() baru otomatis membatalkan rantai bacaan yang berjalan.
    setIsReadingAll(false);
    setActiveRow(index);
    setTapSeq((seq) => seq + 1);
    speech.speak(row.spoken, 1, 1.15);
  };

  const handleReadAll = () => {
    if (isReadingAll) {
      stopReadingAll();
      return;
    }

    sounds.playPop();
    setIsReadingAll(true);

    // Baca baris per baris dengan menunggu ucapan SEBELUMNYA benar-benar
    // selesai (event onend di speechHelper), bukan timer tetap — timer tetap
    // memotong kalimat di tengah pada engine TTS yang lambat.
    speech.speakSequence(
      rows.map((row) => row.spoken),
      {
        gapMs: 450,
        rate: 1,
        pitch: 1.15,
        onIndex: (index) => {
          setActiveRow(index);
          setTapSeq((seq) => seq + 1);
        },
        onDone: () => {
          setIsReadingAll(false);
          setActiveRow(null);
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
      {/* Header: judul tabel + mascot hewan yang membawa angka tabel */}
      <div
        className={`rounded-3xl p-4 sm:p-6 bg-gradient-to-r ${theme.gradient} text-white shadow-xl border-4 ${theme.headerBorder}`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-white/80">
              🐾 Kebun Hewan Berhitung
            </p>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Tabel {operationInfo.label} {tableNumber}
            </h2>
            <p className="hidden sm:block text-white/85 text-sm font-medium mt-1 max-w-md">
              {operationInfo.description}
            </p>
            <p className="text-white/85 text-xs sm:text-sm font-bold mt-1.5">
              Temanmu: {mascot.name} {mascot.emoji} — sentuh untuk menyapa!
            </p>
          </div>
          <button
            onClick={handleMascotTap}
            className="shrink-0 w-24 h-28 sm:w-28 sm:h-32 bg-white/25 backdrop-blur rounded-3xl border-2 border-white/50 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
            title={`Sapa ${mascot.name}!`}
            aria-label={`Sapa ${mascot.name}, teman angka ${tableNumber}`}
          >
            <NumberCritter
              value={tableNumber}
              animal={mascot}
              className="w-20 sm:w-24"
            />
          </button>
        </div>
      </div>

      {/* Pilihan operasi: × ÷ + − */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MATH_TABLE_OPERATIONS.map((info) => {
          const isActive = info.id === operation;
          return (
            <button
              key={info.id}
              onClick={() => handleSelectOperation(info.id)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border-2 font-black text-sm transition-all cursor-pointer active:scale-95 ${
                isActive ? OPERATION_THEME[info.id].tabActive : TAB_IDLE
              }`}
              aria-pressed={isActive}
            >
              <span className="text-lg leading-none">{info.symbol}</span>
              <span>{info.label}</span>
            </button>
          );
        })}
      </div>

      {/* Pilih teman hewan (angka tabel 1-10) */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-3 sm:p-4 border-2 border-slate-200 shadow-sm">
        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>🐾</span>
          <span>Pilih teman hewanmu (angka 1-10)</span>
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {MATH_TABLE_NUMBERS.map((number) => {
            const friend = animalFor(number);
            const isActive = number === tableNumber;
            return (
              <button
                key={number}
                onClick={() => handleSelectNumber(number)}
                className={`rounded-2xl border-2 px-0.5 pt-0.5 pb-1 transition-all cursor-pointer active:scale-95 flex flex-col items-center ${
                  isActive
                    ? `${theme.numberActive} ring-2 ring-white scale-105`
                    : theme.numberIdle
                }`}
                aria-pressed={isActive}
                aria-label={`Tabel angka ${number}, teman ${friend.name}`}
              >
                <NumberCritter
                  value={number}
                  animal={friend}
                  className="w-full max-w-14"
                  style={{ animationDelay: `${number * 0.12}s` }}
                />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wide leading-tight">
                  {friend.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Isi tabel: baris berupa parade hewan bernomor */}
      <div className="bg-white/95 rounded-3xl p-3 sm:p-6 shadow-xl border-4 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3">
          <h3 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
            <span className="text-xl leading-none">🐾</span>
            <span>
              Tabel {operationInfo.label} {tableNumber}
            </span>
          </h3>
          <button
            onClick={handleReadAll}
            className={`w-full sm:w-auto justify-center px-3.5 py-2 rounded-xl font-black text-sm border-2 flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
              isReadingAll
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : `${theme.resultBox} hover:brightness-95`
            }`}
            aria-pressed={isReadingAll}
          >
            {isReadingAll ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Berhenti</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Dengar Semua</span>
              </>
            )}
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {rows.map((row, index) => {
            const isActive = activeRow === index;
            const leftFriend = animalFor(row.left);
            const rightFriend = animalFor(row.right);
            const resultFriend = animalFor(row.result);

            return (
              <button
                key={row.equation}
                onClick={() => handleTapRow(row, index)}
                className={`w-full rounded-3xl border-2 px-2 py-2.5 transition-all cursor-pointer active:scale-[0.98] flex flex-col items-center gap-1 ${
                  isActive ? `${theme.activeRow} shadow-lg` : theme.idleRow
                }`}
                aria-label={`${leftFriend.name} ${row.left} ${row.symbol} ${rightFriend.name} ${row.right} sama dengan ${resultFriend.name} ${row.result}. Ketuk untuk mendengar`}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <NumberCritter
                    key={`l-${index}-${tapSeq}`}
                    value={row.left}
                    animal={leftFriend}
                    active={isActive}
                    className="w-11 sm:w-14 shrink-0"
                    style={{ animationDelay: `${(index % 5) * 0.18}s` }}
                  />
                  <span
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center font-black text-base sm:text-xl shrink-0 ${theme.symbolChip}`}
                    aria-hidden="true"
                  >
                    {row.symbol}
                  </span>
                  <NumberCritter
                    key={`r-${index}-${tapSeq}`}
                    value={row.right}
                    animal={rightFriend}
                    active={isActive}
                    className="w-11 sm:w-14 shrink-0"
                    style={{ animationDelay: `${((index + 2) % 5) * 0.18}s` }}
                  />
                  <span className="text-slate-400 font-black text-lg sm:text-2xl shrink-0 px-0.5">
                    =
                  </span>
                  <div className="relative">
                    <NumberCritter
                      key={`s-${index}-${tapSeq}`}
                      value={row.result}
                      animal={resultFriend}
                      active={isActive}
                      className="w-12 sm:w-16 shrink-0"
                      style={{ animationDelay: `${((index + 4) % 5) * 0.18}s` }}
                    />
                    {isActive && (
                      <span className="absolute -top-1 right-0 text-sm sm:text-base drop-shadow-md">
                        ⭐
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] font-black text-slate-400 tabular-nums">
                  {row.left} {row.symbol} {row.right} = {row.result}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-slate-400">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>
            Ketuk baris untuk mendengar — tiap hewan membawa angkanya di perut!
          </span>
        </p>
      </div>
    </div>
  );
};