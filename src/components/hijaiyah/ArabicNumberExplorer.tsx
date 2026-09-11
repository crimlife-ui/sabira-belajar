import React, { useState } from "react";
import { Volume2, Sparkles, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { ARABIC_NUMBERS_LIST, ArabicNumberItem } from "../../data/hijaiyahData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

export const ArabicNumberExplorer: React.FC = () => {
  const [selectedNum, setSelectedNum] = useState<ArabicNumberItem>(ARABIC_NUMBERS_LIST[1]); // Default to 1 (Waahid)
  const [countedItems, setCountedItems] = useState<number[]>([]);

  const handleSelectNumber = (item: ArabicNumberItem) => {
    sounds.playPop();
    setSelectedNum(item);
    setCountedItems([]);
    speech.speakArabicNumber(item.arabicName, item.latin, item.indonesianName);
  };

  const handleNext = () => {
    const currentIndex = ARABIC_NUMBERS_LIST.findIndex((n) => n.latin === selectedNum.latin);
    const nextIndex = (currentIndex + 1) % ARABIC_NUMBERS_LIST.length;
    handleSelectNumber(ARABIC_NUMBERS_LIST[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = ARABIC_NUMBERS_LIST.findIndex((n) => n.latin === selectedNum.latin);
    const prevIndex = (currentIndex - 1 + ARABIC_NUMBERS_LIST.length) % ARABIC_NUMBERS_LIST.length;
    handleSelectNumber(ARABIC_NUMBERS_LIST[prevIndex]);
  };

  const handleSpeak = () => {
    sounds.playPop();
    speech.speakArabicNumber(selectedNum.arabicName, selectedNum.latin, selectedNum.indonesianName);
  };

  const handleTapObject = (index: number) => {
    sounds.playPop();
    if (!countedItems.includes(index)) {
      const nextCounted = [...countedItems, index];
      setCountedItems(nextCounted);
      speech.speak(String(nextCounted.length), 1.0, 1.2);

      if (nextCounted.length === selectedNum.latin) {
        setTimeout(() => {
          sounds.playSuccess();
          speech.praise();
        }, 300);
      }
    } else {
      speech.speak(String(index + 1), 1.0, 1.2);
    }
  };

  const handleResetCount = () => {
    sounds.playPop();
    setCountedItems([]);
  };

  return (
    <div className="space-y-6">
      {/* Featured Big Arabic Number Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
          aria-label="Angka Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
          aria-label="Angka Selanjutnya"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Big Arabic & Latin Number Display */}
        <div
          onClick={handleSpeak}
          className="cursor-pointer active:scale-95 transition-transform my-2 group select-none flex items-center justify-center gap-4 sm:gap-6"
          title="Klik untuk mendengarkan pelafalan angka!"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white flex items-center justify-center border-4 border-emerald-300 shadow-inner group-hover:border-emerald-400 group-hover:shadow-lg transition-all">
            <span
              className="text-7xl sm:text-8xl font-black text-emerald-700 leading-none select-none"
              style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
            >
              {selectedNum.arabic}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl sm:text-6xl font-black text-slate-700">
              = {selectedNum.latin}
            </span>
            <span className="text-xs font-bold text-slate-400 mt-1">Angka Latin</span>
          </div>
        </div>

        {/* Pronunciation & Meaning */}
        <div className="mt-2 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
            <span>Bahasa Arab</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wide">
            {selectedNum.arabicName}
          </h3>
          <p className="text-base font-bold text-emerald-600">
            Artinya: "{selectedNum.indonesianName}"
          </p>
        </div>

        {/* Interactive Counting Objects Section */}
        <div className="w-full mt-4 p-4 bg-emerald-50/70 rounded-2xl border-2 border-dashed border-emerald-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold text-emerald-900 flex items-center gap-1.5">
              <span>Sentuh benda untuk berhitung:</span>
              <span className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-black">
                {countedItems.length} / {selectedNum.latin}
              </span>
            </span>
            {countedItems.length > 0 && (
              <button
                onClick={handleResetCount}
                className="text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ulang</span>
              </button>
            )}
          </div>

          {selectedNum.latin === 0 ? (
            <div className="py-5 text-center text-slate-500 font-bold text-sm sm:text-base">
              ⚪ Sifr artinya Nol / Kosong (tidak ada benda).
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 py-2">
              {Array.from({ length: selectedNum.latin }).map((_, idx) => {
                const isCounted = countedItems.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleTapObject(idx)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center text-2xl sm:text-3xl transition-all cursor-pointer select-none border-2 ${
                      isCounted
                        ? "bg-emerald-500 text-white border-white scale-110 shadow-md ring-2 ring-emerald-300"
                        : "bg-white hover:bg-emerald-100 border-emerald-200 shadow-sm active:scale-90"
                    }`}
                    title={`Benda ke-${idx + 1}`}
                  >
                    <span>{selectedNum.emoji}</span>
                    <span
                      className={`text-[9px] font-black leading-none ${
                        isCounted ? "text-emerald-100" : "text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Listen Button */}
        <button
          onClick={handleSpeak}
          className="mt-5 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm sm:text-base"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Pelafalan</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </button>
      </div>

      {/* Numbers Grid (٠ to ١٠) */}
      <div className="bg-white/85 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-4xl mx-auto">
        <h4 className="text-center font-bold text-slate-700 mb-3 text-sm sm:text-base flex items-center justify-center gap-2">
          <span>Pilih angka Arab yang ingin dipelajari:</span>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            ٠ sampai ١٠ (0 - 10)
          </span>
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 sm:gap-2.5" dir="rtl">
          {ARABIC_NUMBERS_LIST.map((item) => {
            const isSelected = item.latin === selectedNum.latin;
            return (
              <button
                key={item.latin}
                onClick={() => handleSelectNumber(item)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border-3 ${
                  isSelected
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-white shadow-lg scale-105 ring-4 ring-emerald-300 z-10"
                    : `${item.bgColor} hover:bg-white text-slate-800 ${item.borderColor} hover:shadow-md active:scale-95`
                }`}
                title={`Angka ${item.arabic} (${item.latin})`}
              >
                <span
                  className={`text-2xl sm:text-3xl font-black leading-tight ${
                    isSelected ? "text-white" : item.color
                  }`}
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {item.arabic}
                </span>
                <span
                  className={`text-xs font-black ${
                    isSelected ? "text-emerald-100" : "text-slate-600"
                  }`}
                  dir="ltr"
                >
                  {item.latin}
                </span>
                <span
                  className={`text-[9px] font-semibold truncate max-w-full ${
                    isSelected ? "text-emerald-200" : "text-slate-400"
                  }`}
                  dir="ltr"
                >
                  {item.arabicName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
