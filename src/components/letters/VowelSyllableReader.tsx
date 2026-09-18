import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Volume2, Sparkles, Play, ChevronLeft, ChevronRight } from "lucide-react";
import {
  VOWEL_SYLLABLE_GROUPS,
  ConsonantSyllableGroup,
  ENDING_PRESETS,
  EndingPreset,
} from "../../data/vowelSyllableData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

type ReaderMode = "vowels" | "endings";

export const VowelSyllableReader: React.FC = () => {
  const [readerMode, setReaderMode] = useState<ReaderMode>("vowels");

  // State for Mode 1: Suku Kata Vokal (KV)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0); // Default to D (da-di-du-de-do)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isAutoReading, setIsAutoReading] = useState(false);
  const autoReadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // State for Mode 2: Imbuhan Akhir (KVK)
  const [selectedEndingIndex, setSelectedEndingIndex] = useState(0); // Default to "-k" (tak, tik, tuk...)
  const [selectedEndingConsonantIndex, setSelectedEndingConsonantIndex] = useState(0); // Default to "T"

  const activeVowelGroup: ConsonantSyllableGroup =
    VOWEL_SYLLABLE_GROUPS[selectedGroupIndex] || VOWEL_SYLLABLE_GROUPS[0];

  const activeEndingPreset: EndingPreset =
    ENDING_PRESETS[selectedEndingIndex] || ENDING_PRESETS[0];

  const activeEndingConsonant =
    activeEndingPreset.consonantExamples[selectedEndingConsonantIndex] ||
    activeEndingPreset.consonantExamples[0];

  // Clear timers on unmount or mode switch
  useEffect(() => {
    return () => {
      if (autoReadTimerRef.current) {
        clearTimeout(autoReadTimerRef.current);
      }
    };
  }, [readerMode, selectedGroupIndex, selectedEndingIndex, selectedEndingConsonantIndex]);

  const stopAutoReading = () => {
    if (autoReadTimerRef.current) {
      clearTimeout(autoReadTimerRef.current);
      autoReadTimerRef.current = null;
    }
    setIsAutoReading(false);
    setHighlightedIndex(null);
  };

  // Switch Consonant in Mode 1
  const handleSelectGroup = (idx: number) => {
    stopAutoReading();
    sounds.playPop();
    setSelectedGroupIndex(idx);
    const grp = VOWEL_SYLLABLE_GROUPS[idx];
    speech.speak(
      `Huruf ${grp.consonant}. Ayo baca: ${grp.syllables.map((s) => s.syllable).join(", ")}!`,
      0.9,
      1.15
    );
  };

  const handleNextGroup = () => {
    stopAutoReading();
    const next = (selectedGroupIndex + 1) % VOWEL_SYLLABLE_GROUPS.length;
    handleSelectGroup(next);
  };

  const handlePrevGroup = () => {
    stopAutoReading();
    const prev = (selectedGroupIndex - 1 + VOWEL_SYLLABLE_GROUPS.length) % VOWEL_SYLLABLE_GROUPS.length;
    handleSelectGroup(prev);
  };

  // Tap single syllable in Mode 1
  const handleTapVowelSyllable = (idx: number) => {
    if (isAutoReading) return;
    sounds.playPop();
    setHighlightedIndex(idx);
    const s = activeVowelGroup.syllables[idx];
    speech.speak(`${s.syllable}! Contoh: ${s.exampleWord}!`, 0.9, 1.15);

    setTimeout(() => {
      setHighlightedIndex(null);
    }, 1000);
  };

  // Auto read all 5 syllables in Mode 1
  const handleAutoReadVowels = () => {
    if (isAutoReading) return;
    sounds.playPop();
    setIsAutoReading(true);

    const items = activeVowelGroup.syllables;
    let step = 0;

    const runStep = () => {
      if (step < items.length) {
        setHighlightedIndex(step);
        sounds.playPop();
        speech.speak(items[step].syllable, 0.95, 1.15);
        step++;
        autoReadTimerRef.current = setTimeout(runStep, 950);
      } else {
        setHighlightedIndex(-1); // all highlighted
        sounds.playSuccess();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
        const summary = items.map((i) => i.syllable).join(", ");
        speech.speak(`Hebat! ${summary}! Pintar sekali!`, 0.9, 1.15);
        autoReadTimerRef.current = setTimeout(() => {
          setIsAutoReading(false);
          setHighlightedIndex(null);
        }, 1600);
      }
    };

    runStep();
  };

  // Tap single syllable in Mode 2
  const handleTapEndingSyllable = (idx: number) => {
    if (isAutoReading) return;
    sounds.playPop();
    setHighlightedIndex(idx);
    const s = activeEndingConsonant.items[idx];
    speech.speak(`${s.syllable}! Contoh: ${s.exampleWord}!`, 0.9, 1.15);

    setTimeout(() => {
      setHighlightedIndex(null);
    }, 1000);
  };

  // Auto read all 5 syllables in Mode 2
  const handleAutoReadEndings = () => {
    if (isAutoReading) return;
    sounds.playPop();
    setIsAutoReading(true);

    const items = activeEndingConsonant.items;
    let step = 0;

    const runStep = () => {
      if (step < items.length) {
        setHighlightedIndex(step);
        sounds.playPop();
        speech.speak(items[step].syllable, 0.95, 1.15);
        step++;
        autoReadTimerRef.current = setTimeout(runStep, 950);
      } else {
        setHighlightedIndex(-1);
        sounds.playSuccess();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
        const summary = items.map((i) => i.syllable).join(", ");
        speech.speak(`Luar biasa! ${summary}!`, 0.9, 1.15);
        autoReadTimerRef.current = setTimeout(() => {
          setIsAutoReading(false);
          setHighlightedIndex(null);
        }, 1600);
      }
    };

    runStep();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 2 Main Reader Sub-Tabs */}
      <div className="flex justify-center gap-2 max-w-md mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-pink-200 shadow-sm">
        <button
          onClick={() => {
            stopAutoReading();
            sounds.playPop();
            setReaderMode("vowels");
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            readerMode === "vowels"
              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-102"
              : "text-slate-600 hover:bg-pink-50"
          }`}
        >
          🗣️ Suku Kata (da-di-du)
        </button>
        <button
          onClick={() => {
            stopAutoReading();
            sounds.playPop();
            setReaderMode("endings");
          }}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            readerMode === "endings"
              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-102"
              : "text-slate-600 hover:bg-pink-50"
          }`}
        >
          🧩 Imbuhan Akhir (tak-tik-tuk)
        </button>
      </div>

      {/* ================= MODE 1: SUKU KATA VOKAL (KV) ================= */}
      {readerMode === "vowels" && (
        <div className="space-y-6">
          {/* Featured Big Card */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-pink-200 max-w-2xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
            {/* Nav Arrows */}
            <button
              onClick={handlePrevGroup}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Huruf Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>
            <button
              onClick={handleNextGroup}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
              aria-label="Huruf Selanjutnya"
            >
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Header Badge */}
            <div className="mb-2 space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">
                <span>Pola Konsonan + 5 Vokal (A - I - U - E - O)</span>
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                Membaca Suku Kata: Huruf {activeVowelGroup.consonant}
              </h3>
            </div>

            {/* 5 Syllable Cards Grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full my-4">
              {activeVowelGroup.syllables.map((item, idx) => {
                const isHl = highlightedIndex === idx || highlightedIndex === -1;
                return (
                  <button
                    key={item.syllable}
                    onClick={() => handleTapVowelSyllable(idx)}
                    className={`py-3 sm:py-5 px-1 sm:px-2 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-between transition-all cursor-pointer select-none border-3 sm:border-4 min-h-[7.5rem] sm:min-h-[9rem] ${
                      isHl
                        ? "bg-gradient-to-b from-yellow-300 to-amber-400 text-amber-950 border-white shadow-xl scale-105 ring-4 ring-yellow-300 animate-bounce"
                        : `${item.bgColor} hover:bg-white text-slate-800 ${item.borderColor} hover:shadow-md active:scale-95`
                    }`}
                    title={`Sentuh untuk mendengar bunyi "${item.syllable}"`}
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400">
                      -{item.vowel}-
                    </span>
                    <span
                      className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight my-1 ${
                        isHl ? "text-amber-950" : item.color
                      }`}
                    >
                      {item.syllable}
                    </span>
                    <div className="flex flex-col items-center">
                      <span className="text-xl sm:text-2xl">{item.emoji}</span>
                      <span
                        className={`text-[9px] sm:text-xs font-bold mt-0.5 truncate max-w-full ${
                          isHl ? "text-amber-900" : "text-slate-600"
                        }`}
                      >
                        {item.exampleWord}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
              <button
                onClick={handleAutoReadVowels}
                disabled={isAutoReading}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black shadow-lg border-2 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm sm:text-base ${
                  isAutoReading
                    ? "bg-amber-500 text-white border-amber-300 animate-pulse cursor-wait"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-pink-300"
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>
                  {isAutoReading
                    ? "Mengeja Berurutan..."
                    : `Baca Berurutan (${activeVowelGroup.syllables.map((s) => s.syllable).join(", ")})`}
                </span>
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  const allStr = activeVowelGroup.syllables.map((s) => s.syllable).join(", ");
                  speech.speak(`${allStr}!`, 0.9, 1.15);
                }}
                className="px-4 py-2.5 sm:py-3 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold rounded-2xl border border-pink-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
              >
                <Volume2 className="w-4 h-4 text-pink-600" />
                <span>Dengar Semua</span>
              </button>
            </div>
          </div>

          {/* Consonants Picker Grid */}
          <div className="bg-white/85 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-3xl mx-auto">
            <h4 className="text-center font-bold text-slate-700 mb-3 text-sm sm:text-base flex items-center justify-center gap-2">
              <span>Pilih huruf konsonan:</span>
              <span className="text-xs font-semibold bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">
                {VOWEL_SYLLABLE_GROUPS.length} Huruf
              </span>
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {VOWEL_SYLLABLE_GROUPS.map((grp, idx) => {
                const isSelected = idx === selectedGroupIndex;
                return (
                  <button
                    key={grp.consonant}
                    onClick={() => handleSelectGroup(idx)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex flex-col items-center justify-center font-black text-lg sm:text-xl transition-all cursor-pointer border-3 ${
                      isSelected
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white border-white shadow-lg scale-110 ring-4 ring-pink-300 z-10"
                        : "bg-white hover:bg-pink-50 text-slate-700 border-pink-200 hover:shadow-md active:scale-95"
                    }`}
                  >
                    <span>{grp.consonant}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: IMBUHAN AKHIR (KVK) ================= */}
      {readerMode === "endings" && (
        <div className="space-y-6">
          {/* Top Ending Selector (Tabs for -k, -ng, -t, etc.) */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {ENDING_PRESETS.map((preset, pIdx) => {
              const isSelected = pIdx === selectedEndingIndex;
              return (
                <button
                  key={preset.ending}
                  onClick={() => {
                    stopAutoReading();
                    sounds.playPop();
                    setSelectedEndingIndex(pIdx);
                    setSelectedEndingConsonantIndex(0);
                    speech.speak(`${preset.name}! ${preset.description}`, 0.9, 1.15);
                  }}
                  className={`py-2 px-3 sm:px-4 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-white shadow-lg scale-105"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-purple-50"
                  }`}
                >
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>

          {/* Featured Card for Imbuhan Akhir */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-purple-200 max-w-2xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
            {/* Header info */}
            <div className="mb-2 space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                <span>{activeEndingPreset.description}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Akhiran -{activeEndingPreset.ending.toUpperCase()}: Pola Huruf{" "}
                <span className="text-purple-600">{activeEndingConsonant.consonant}</span>
              </h3>
            </div>

            {/* Consonant Switcher Pills for this Ending */}
            <div className="flex items-center justify-center gap-2 my-2">
              <span className="text-xs font-bold text-slate-500">Pilih huruf awal:</span>
              <div className="flex gap-1.5">
                {activeEndingPreset.consonantExamples.map((ce, cIdx) => (
                  <button
                    key={ce.consonant}
                    onClick={() => {
                      stopAutoReading();
                      sounds.playPop();
                      setSelectedEndingConsonantIndex(cIdx);
                      const sampleStr = ce.items.map((i) => i.syllable).join(", ");
                      speech.speak(`Huruf ${ce.consonant}: ${sampleStr}!`, 0.9, 1.15);
                    }}
                    className={`w-9 h-9 rounded-xl font-black text-sm transition-all cursor-pointer border-2 ${
                      cIdx === selectedEndingConsonantIndex
                        ? "bg-purple-600 text-white border-white shadow-md scale-105"
                        : "bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200"
                    }`}
                  >
                    {ce.consonant}
                  </button>
                ))}
              </div>
            </div>

            {/* 5 Syllable with Endings Cards Grid */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full my-4">
              {activeEndingConsonant.items.map((item, idx) => {
                const isHl = highlightedIndex === idx || highlightedIndex === -1;
                return (
                  <button
                    key={item.syllable}
                    onClick={() => handleTapEndingSyllable(idx)}
                    className={`py-3 sm:py-5 px-1 sm:px-2 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-between transition-all cursor-pointer select-none border-3 sm:border-4 min-h-[7.5rem] sm:min-h-[9rem] ${
                      isHl
                        ? "bg-gradient-to-b from-yellow-300 to-amber-400 text-amber-950 border-white shadow-xl scale-105 ring-4 ring-yellow-300 animate-bounce"
                        : "bg-purple-50 hover:bg-white text-slate-800 border-purple-200 hover:shadow-md active:scale-95"
                    }`}
                    title={`Sentuh untuk mendengar bunyi "${item.syllable}"`}
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400">
                      -{item.vowel}-
                    </span>
                    <span
                      className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight my-1 ${
                        isHl ? "text-amber-950" : "text-purple-800"
                      }`}
                    >
                      {item.syllable}
                    </span>
                    <div className="flex flex-col items-center">
                      <span className="text-xl sm:text-2xl">{item.emoji}</span>
                      <span
                        className={`text-[9px] sm:text-xs font-bold mt-0.5 truncate max-w-full ${
                          isHl ? "text-amber-900" : "text-slate-600"
                        }`}
                      >
                        {item.exampleWord}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
              <button
                onClick={handleAutoReadEndings}
                disabled={isAutoReading}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black shadow-lg border-2 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm sm:text-base ${
                  isAutoReading
                    ? "bg-amber-500 text-white border-amber-300 animate-pulse cursor-wait"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-purple-300"
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>
                  {isAutoReading
                    ? "Mengeja Berurutan..."
                    : `Baca Berurutan (${activeEndingConsonant.items.map((s) => s.syllable).join(", ")})`}
                </span>
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  const allStr = activeEndingConsonant.items.map((s) => s.syllable).join(", ");
                  speech.speak(`${allStr}!`, 0.9, 1.15);
                }}
                className="px-4 py-2.5 sm:py-3 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold rounded-2xl border border-purple-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
              >
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Dengar Semua</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
