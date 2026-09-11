import React, { useState, useEffect, useRef } from "react";
import { Volume2, Sparkles, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BASIC_READING_LIST, BasicReadingItem } from "../../data/hijaiyahReadingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

type CategoryFilter = "all" | "2-huruf" | "3-berurutan" | "kata-kombinasi";

export const HijaiyahReadingPractice: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const filteredList = BASIC_READING_LIST.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightedLetterIndex, setHighlightedLetterIndex] = useState<number | null>(null);
  const [isAutoReading, setIsAutoReading] = useState(false);
  const autoReadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentItem: BasicReadingItem = filteredList[currentIndex] || filteredList[0];

  // Clear any ongoing timeouts when changing item or unmounting
  useEffect(() => {
    return () => {
      if (autoReadTimeoutRef.current) {
        clearTimeout(autoReadTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectItem = (item: BasicReadingItem) => {
    if (autoReadTimeoutRef.current) clearTimeout(autoReadTimeoutRef.current);
    setIsAutoReading(false);
    setHighlightedLetterIndex(null);
    sounds.playPop();

    const idx = filteredList.findIndex((f) => f.id === item.id);
    if (idx !== -1) setCurrentIndex(idx);
    speech.speak(item.fullLatin, 0.9, 1.15);
  };

  const handleNext = () => {
    if (autoReadTimeoutRef.current) clearTimeout(autoReadTimeoutRef.current);
    setIsAutoReading(false);
    setHighlightedLetterIndex(null);
    const nextIdx = (currentIndex + 1) % filteredList.length;
    setCurrentIndex(nextIdx);
    speech.speak(filteredList[nextIdx].fullLatin, 0.9, 1.15);
  };

  const handlePrev = () => {
    if (autoReadTimeoutRef.current) clearTimeout(autoReadTimeoutRef.current);
    setIsAutoReading(false);
    setHighlightedLetterIndex(null);
    const prevIdx = (currentIndex - 1 + filteredList.length) % filteredList.length;
    setCurrentIndex(prevIdx);
    speech.speak(filteredList[prevIdx].fullLatin, 0.9, 1.15);
  };

  const handleTapLetter = (letterIndex: number, latin: string) => {
    if (isAutoReading) return;
    sounds.playPop();
    setHighlightedLetterIndex(letterIndex);
    speech.speak(latin, 0.95, 1.15);

    setTimeout(() => {
      setHighlightedLetterIndex(null);
    }, 800);
  };

  const handleAutoRead = () => {
    if (isAutoReading) return;
    sounds.playPop();
    setIsAutoReading(true);

    const letters = currentItem.letters;
    let step = 0;

    const playStep = () => {
      if (step < letters.length) {
        setHighlightedLetterIndex(step);
        sounds.playPop();
        speech.speak(letters[step].latin, 0.9, 1.15);
        step++;
        autoReadTimeoutRef.current = setTimeout(playStep, 950);
      } else {
        // Read full text at the end
        setHighlightedLetterIndex(-1); // all highlighted
        sounds.playSuccess();
        speech.speak(
          currentItem.meaning
            ? `${currentItem.fullLatin}! Artinya ${currentItem.meaning}!`
            : currentItem.fullLatin,
          0.9,
          1.15
        );
        autoReadTimeoutRef.current = setTimeout(() => {
          setIsAutoReading(false);
          setHighlightedLetterIndex(null);
        }, 1500);
      }
    };

    playStep();
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-xl mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-emerald-200 shadow-sm">
        <button
          onClick={() => {
            setActiveCategory("all");
            setCurrentIndex(0);
          }}
          className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === "all"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => {
            setActiveCategory("2-huruf");
            setCurrentIndex(0);
          }}
          className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === "2-huruf"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          2 Huruf (A-Ba)
        </button>
        <button
          onClick={() => {
            setActiveCategory("3-berurutan");
            setCurrentIndex(0);
          }}
          className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === "3-berurutan"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          3 Huruf Urut (A-Ba-Ta)
        </button>
        <button
          onClick={() => {
            setActiveCategory("kata-kombinasi");
            setCurrentIndex(0);
          }}
          className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeCategory === "kata-kombinasi"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          Kata 3 Huruf (Ka-Ta-Ba)
        </button>
      </div>

      {/* Featured Big Reading Card */}
      {currentItem && (
        <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
            aria-label="Bacaan Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
            aria-label="Bacaan Selanjutnya"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Badge & Info */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-bold">
              <span>Membaca Fathah</span>
              <span>&bull;</span>
              <span>
                {currentIndex + 1} / {filteredList.length}
              </span>
            </span>
          </div>

          {/* Interactive Letter Boxes (Arranged Right to Left - RTL) */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-4 my-3" dir="rtl">
            {currentItem.letters.map((ltr, ltrIdx) => {
              const isHighlighted =
                highlightedLetterIndex === ltrIdx || highlightedLetterIndex === -1;

              return (
                <button
                  key={ltrIdx}
                  onClick={() => handleTapLetter(ltrIdx, ltr.latin)}
                  className={`flex-1 max-w-[7.5rem] py-4 sm:py-6 px-2 rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer select-none border-4 ${
                    isHighlighted
                      ? "bg-gradient-to-b from-yellow-300 to-amber-400 text-amber-950 border-white shadow-2xl scale-110 ring-4 ring-yellow-300 animate-bounce"
                      : `${ltr.bgColor} hover:bg-white text-slate-800 border-emerald-300 shadow-md active:scale-95`
                  }`}
                  title={`Ketuk untuk mendengar suara "${ltr.latin}"`}
                >
                  <span
                    className={`text-5xl sm:text-6xl font-black leading-none ${
                      isHighlighted ? "text-amber-950" : ltr.color
                    }`}
                    style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                  >
                    {ltr.arabic}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-black mt-2 px-2 py-0.5 rounded-full ${
                      isHighlighted
                        ? "bg-amber-900/20 text-amber-950"
                        : "bg-white/80 text-slate-700 shadow-xs"
                    }`}
                    dir="ltr"
                  >
                    {ltr.latin}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Combined Transliteration & Meaning */}
          <div className="mt-3 space-y-1">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider">
              {currentItem.fullLatin}
            </h3>
            {currentItem.meaning && (
              <p className="text-sm sm:text-base font-bold text-emerald-700">
                Artinya: "{currentItem.meaning}"
              </p>
            )}
            <p className="text-xs font-semibold text-slate-400">
              Sentuh masing-masing kotak huruf di atas atau klik tombol dengarkan di bawah!
            </p>
          </div>

          {/* Action Buttons: Auto Read & Listen */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <button
              onClick={handleAutoRead}
              disabled={isAutoReading}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black shadow-lg border-2 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm sm:text-base ${
                isAutoReading
                  ? "bg-amber-500 text-white border-amber-300 animate-pulse cursor-wait"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-emerald-300"
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isAutoReading ? "Sedang Mengeja..." : "Baca Lengkap (Eja)"}</span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                speech.speak(
                  currentItem.meaning
                    ? `${currentItem.fullLatin}! ${currentItem.meaning}!`
                    : currentItem.fullLatin,
                  0.85,
                  1.15
                );
              }}
              className="px-4 py-2.5 sm:py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-2xl border border-emerald-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Dengarkan Kata</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid of All Reading Combinations */}
      <div className="bg-white/85 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-4xl mx-auto">
        <h4 className="text-center font-bold text-slate-700 mb-3 text-sm sm:text-base flex items-center justify-center gap-2">
          <span>Pilih kombinasi bacaan:</span>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            {filteredList.length} Latihan
          </span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3" dir="rtl">
          {filteredList.map((item) => {
            const isSelected = item.id === currentItem.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-3 ${
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
                  {item.fullArabic}
                </span>
                <span
                  className={`text-xs font-black mt-1 ${
                    isSelected ? "text-emerald-100" : "text-slate-600"
                  }`}
                  dir="ltr"
                >
                  {item.fullLatin}
                </span>
                {item.meaning && (
                  <span
                    className={`text-[10px] font-semibold truncate max-w-full ${
                      isSelected ? "text-emerald-200" : "text-slate-400"
                    }`}
                    dir="ltr"
                  >
                    {item.meaning}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
