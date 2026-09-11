import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Volume2, Sparkles, ChevronLeft, ChevronRight, Link as LinkIcon, Info } from "lucide-react";
import {
  CONNECTED_LETTERS_LIST,
  ConnectedLetterItem,
  WORD_JOINING_EXAMPLES,
  WordJoiningExample,
} from "../../data/hijaiyahReadingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

type ViewMode = "forms" | "joining";

export const HijaiyahConnectedLetters: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("forms");

  // State for View 1: 4 Forms Explorer
  const [selectedLetter, setSelectedLetter] = useState<ConnectedLetterItem>(
    CONNECTED_LETTERS_LIST[1] // Default to "Ba" as it connects on all sides
  );

  // State for View 2: Word Joining Practice
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isJoined, setIsJoined] = useState(false);

  const currentWord: WordJoiningExample = WORD_JOINING_EXAMPLES[currentWordIndex];

  const handleSelectLetter = (item: ConnectedLetterItem) => {
    sounds.playPop();
    setSelectedLetter(item);
    speech.speak(
      `Huruf ${item.name}. Lihat bentuknya saat sendiri, di awal, di tengah, dan di akhir kata!`,
      0.9,
      1.15
    );
  };

  const handleNextLetter = () => {
    const idx = CONNECTED_LETTERS_LIST.findIndex((l) => l.name === selectedLetter.name);
    const nextIdx = (idx + 1) % CONNECTED_LETTERS_LIST.length;
    handleSelectLetter(CONNECTED_LETTERS_LIST[nextIdx]);
  };

  const handlePrevLetter = () => {
    const idx = CONNECTED_LETTERS_LIST.findIndex((l) => l.name === selectedLetter.name);
    const prevIdx = (idx - 1 + CONNECTED_LETTERS_LIST.length) % CONNECTED_LETTERS_LIST.length;
    handleSelectLetter(CONNECTED_LETTERS_LIST[prevIdx]);
  };

  const handleJoinWord = () => {
    sounds.playWhoosh();
    setIsJoined(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      sounds.playSuccess();
      speech.speak(
        `${currentWord.transliteration}! Artinya ${currentWord.meaning}!`,
        0.9,
        1.15
      );
    }, 400);
  };

  const handleNextWord = () => {
    sounds.playPop();
    setIsJoined(false);
    const next = (currentWordIndex + 1) % WORD_JOINING_EXAMPLES.length;
    setCurrentWordIndex(next);
  };

  const handlePrevWord = () => {
    sounds.playPop();
    setIsJoined(false);
    const prev = (currentWordIndex - 1 + WORD_JOINING_EXAMPLES.length) % WORD_JOINING_EXAMPLES.length;
    setCurrentWordIndex(prev);
  };

  return (
    <div className="space-y-6">
      {/* Sub Mode Switcher */}
      <div className="flex justify-center gap-2 max-w-md mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-emerald-200 shadow-sm">
        <button
          onClick={() => {
            sounds.playPop();
            setViewMode("forms");
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            viewMode === "forms"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          📋 4 Bentuk Huruf Sambung
        </button>
        <button
          onClick={() => {
            sounds.playPop();
            setViewMode("joining");
            setIsJoined(false);
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            viewMode === "joining"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          🔗 Latihan Sambung Kata
        </button>
      </div>

      {/* ================= VIEW 1: 4 FORMS EXPLORER ================= */}
      {viewMode === "forms" && (
        <div className="space-y-6">
          {/* Big Featured Card */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200 max-w-2xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevLetter}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Huruf Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>
            <button
              onClick={handleNextLetter}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Huruf Selanjutnya"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Title & Badge */}
            <div className="mb-3 space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                <span>Perubahan Bentuk Huruf</span>
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wide">
                Huruf {selectedLetter.name} ({selectedLetter.isolated})
              </h3>
            </div>

            {/* Non-connecting note for 6 letters */}
            {!selectedLetter.canConnectLeft && (
              <div className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold max-w-md">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Huruf ini tidak bisa menyambung ke huruf di sebelah kirinya.</span>
              </div>
            )}

            {/* 4 Form Cards (Arranged in Reading Order: Tunggal, Awal, Tengah, Akhir) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full my-4" dir="rtl">
              {/* 1. Tunggal / Sendiri */}
              <div
                onClick={() => {
                  sounds.playPop();
                  speech.speak(`Bentuk tunggal huruf ${selectedLetter.name}`, 0.9, 1.15);
                }}
                className="bg-emerald-50/80 hover:bg-emerald-100 border-2 border-emerald-300 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm min-h-[8.5rem] sm:min-h-[9.5rem]"
                title="Bentuk Tunggal (Lepas)"
              >
                <span className="text-xs font-bold text-slate-500 mb-1" dir="ltr">
                  1. Sendiri (Lepas)
                </span>
                <span
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-emerald-800 my-2 leading-tight select-none"
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {selectedLetter.isolated}
                </span>
                <span className="text-xs font-bold text-emerald-700 mt-1" dir="ltr">
                  Tunggal
                </span>
              </div>

              {/* 2. Di Awal Kata */}
              <div
                onClick={() => {
                  sounds.playPop();
                  speech.speak(`Bentuk di awal kata huruf ${selectedLetter.name}`, 0.9, 1.15);
                }}
                className="bg-blue-50/80 hover:bg-blue-100 border-2 border-blue-300 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm min-h-[8.5rem] sm:min-h-[9.5rem]"
                title="Bentuk di Awal Kata"
              >
                <span className="text-xs font-bold text-slate-500 mb-1" dir="ltr">
                  2. Di Awal
                </span>
                <span
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-blue-800 my-2 leading-tight select-none"
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {selectedLetter.initial}
                </span>
                <span className="text-xs font-bold text-blue-700 mt-1" dir="ltr">
                  Awal Kata
                </span>
              </div>

              {/* 3. Di Tengah Kata */}
              <div
                onClick={() => {
                  sounds.playPop();
                  speech.speak(`Bentuk di tengah kata huruf ${selectedLetter.name}`, 0.9, 1.15);
                }}
                className="bg-purple-50/80 hover:bg-purple-100 border-2 border-purple-300 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm min-h-[8.5rem] sm:min-h-[9.5rem]"
                title="Bentuk di Tengah Kata"
              >
                <span className="text-xs font-bold text-slate-500 mb-1" dir="ltr">
                  3. Di Tengah
                </span>
                <span
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-purple-800 my-2 leading-tight select-none"
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {selectedLetter.medial}
                </span>
                <span className="text-xs font-bold text-purple-700 mt-1" dir="ltr">
                  Tengah Kata
                </span>
              </div>

              {/* 4. Di Akhir Kata */}
              <div
                onClick={() => {
                  sounds.playPop();
                  speech.speak(`Bentuk di akhir kata huruf ${selectedLetter.name}`, 0.9, 1.15);
                }}
                className="bg-rose-50/80 hover:bg-rose-100 border-2 border-rose-300 rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm min-h-[8.5rem] sm:min-h-[9.5rem]"
                title="Bentuk di Akhir Kata"
              >
                <span className="text-xs font-bold text-slate-500 mb-1" dir="ltr">
                  4. Di Akhir
                </span>
                <span
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-rose-800 my-2 leading-tight select-none"
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {selectedLetter.final}
                </span>
                <span className="text-xs font-bold text-rose-700 mt-1" dir="ltr">
                  Akhir Kata
                </span>
              </div>
            </div>

            {/* Example Word with this letter */}
            <div
              onClick={() => {
                sounds.playPop();
                speech.speak(
                  `Contoh kata: ${selectedLetter.exampleTransliteration}!`,
                  0.9,
                  1.15
                );
              }}
              className="mt-4 p-4 bg-emerald-50 hover:bg-emerald-100/90 rounded-3xl border-3 border-dashed border-emerald-300 flex items-center justify-between gap-4 cursor-pointer transition-all active:scale-98 max-w-md w-full shadow-sm"
            >
              <div className="text-left">
                <span className="text-xs font-bold text-slate-500 block mb-1">Contoh dalam kata:</span>
                <div className="flex items-center gap-3">
                  <span
                    className="text-4xl sm:text-5xl font-black text-emerald-950 leading-relaxed drop-shadow-sm select-none"
                    dir="rtl"
                    style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                  >
                    {selectedLetter.exampleWord}
                  </span>
                  <span className="text-base sm:text-lg font-black text-slate-700">
                    ({selectedLetter.exampleTransliteration})
                  </span>
                </div>
              </div>
              <Volume2 className="w-6 h-6 text-emerald-600 shrink-0" />
            </div>

            {/* Listen Button */}
            <button
              onClick={() => {
                sounds.playPop();
                speech.speak(
                  `Huruf ${selectedLetter.name}. Sendiri: ${selectedLetter.isolated}. Awal: ${selectedLetter.initial}. Tengah: ${selectedLetter.medial}. Akhir: ${selectedLetter.final}.`,
                  0.9,
                  1.15
                );
              }}
              className="mt-5 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm sm:text-base"
            >
              <Volume2 className="w-5 h-5" />
              <span>Dengarkan Semua Bentuk</span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </button>
          </div>

          {/* 28 Letters Picker Grid */}
          <div className="bg-white/85 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-4xl mx-auto">
            <h4 className="text-center font-bold text-slate-700 mb-3 text-sm sm:text-base flex items-center justify-center gap-2">
              <span>Pilih huruf untuk melihat bentuk sambungnya:</span>
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 gap-2 sm:gap-2.5" dir="rtl">
              {CONNECTED_LETTERS_LIST.map((item) => {
                const isSelected = item.name === selectedLetter.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSelectLetter(item)}
                    className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-3 ${
                      isSelected
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-white shadow-lg scale-105 ring-4 ring-emerald-300 z-10"
                        : "bg-emerald-50/70 hover:bg-white text-slate-800 border-emerald-200 hover:shadow-md active:scale-95"
                    }`}
                  >
                    <span
                      className={`text-2xl sm:text-3xl font-black leading-tight ${
                        isSelected ? "text-white" : "text-emerald-900"
                      }`}
                      style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                    >
                      {item.isolated}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-bold mt-0.5 ${
                        isSelected ? "text-emerald-100" : "text-slate-600"
                      }`}
                      dir="ltr"
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: WORD JOINING PRACTICE ================= */}
      {viewMode === "joining" && currentWord && (
        <div className="space-y-6">
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevWord}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Kata Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>
            <button
              onClick={handleNextWord}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Kata Selanjutnya"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Header Badge */}
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                <span>Latihan {currentWordIndex + 1} dari {WORD_JOINING_EXAMPLES.length}</span>
              </span>
            </div>

            <div className="text-4xl sm:text-5xl my-1 select-none animate-bounce">
              {currentWord.emoji}
            </div>

            {/* Interactive Joining Area */}
            {!isJoined ? (
              /* State 1: Separated Letters */
              <div className="w-full my-4 p-4 bg-emerald-50/70 rounded-3xl border-2 border-dashed border-emerald-300">
                <span className="text-xs font-bold text-slate-500 block mb-2">
                  Huruf-huruf sebelum disambung:
                </span>
                <div className="flex items-center justify-center gap-2.5 sm:gap-4" dir="rtl">
                  {currentWord.separateParts.map((part, pIdx) => (
                    <React.Fragment key={pIdx}>
                      <div className="w-20 h-24 sm:w-24 sm:h-28 bg-white rounded-3xl border-3 border-emerald-300 shadow-md flex flex-col items-center justify-center p-1">
                        <span
                          className="text-5xl sm:text-6xl font-black text-emerald-800 leading-tight select-none my-auto"
                          style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                        >
                          {part.letter}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-0.5" dir="ltr">
                          {part.name}
                        </span>
                      </div>
                      {pIdx < currentWord.separateParts.length - 1 && (
                        <span className="text-3xl font-black text-emerald-600 select-none">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Big Button to Join */}
                <button
                  onClick={handleJoinWord}
                  className="mt-5 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-lg border-2 border-white flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer mx-auto text-base"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>Sambungkan Huruf! 🔗</span>
                </button>
              </div>
            ) : (
              /* State 2: Joined Word */
              <div className="w-full my-4 p-5 sm:p-7 bg-gradient-to-b from-emerald-100 to-teal-50 rounded-3xl border-4 border-emerald-400 shadow-inner animate-scaleIn">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                  ✨ Hasil Huruf Setelah Disambung ✨
                </span>
                <div className="py-3 sm:py-4">
                  <span
                    className="text-7xl sm:text-8xl md:text-9xl font-black text-emerald-950 leading-relaxed tracking-wider drop-shadow-md select-none"
                    dir="rtl"
                    style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                  >
                    {currentWord.connectedWord}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-800 mt-2">
                  {currentWord.transliteration}
                </h3>
                <p className="text-base font-bold text-emerald-700">
                  Artinya: "{currentWord.meaning}"
                </p>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      speech.speak(
                        `${currentWord.transliteration}! Artinya ${currentWord.meaning}!`,
                        0.9,
                        1.15
                      );
                    }}
                    className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-300 shadow-sm flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Dengarkan Suara</span>
                  </button>
                  <button
                    onClick={() => setIsJoined(false)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
                  >
                    <span>Pisahkan Lagi ✂️</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Word Selectors */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {WORD_JOINING_EXAMPLES.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => {
                    sounds.playPop();
                    setCurrentWordIndex(idx);
                    setIsJoined(false);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentWordIndex === idx
                      ? "bg-emerald-600 text-white shadow"
                      : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                  }`}
                >
                  {w.transliteration}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
