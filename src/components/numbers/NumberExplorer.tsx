import React, { useState } from "react";
import { Volume2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { NUMBERS_LIST, NumberItem } from "../../data/numberData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

export const NumberExplorer: React.FC = () => {
  const [selectedNum, setSelectedNum] = useState<NumberItem>(NUMBERS_LIST[1]); // default to 1

  const handleSelectNumber = (item: NumberItem) => {
    sounds.playPop();
    setSelectedNum(item);
    speech.speak(`${item.number}. ${item.word}!`, 0.9, 1.15);
  };

  const handleNext = () => {
    const currentIndex = NUMBERS_LIST.findIndex((n) => n.number === selectedNum.number);
    const nextIndex = (currentIndex + 1) % NUMBERS_LIST.length;
    handleSelectNumber(NUMBERS_LIST[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = NUMBERS_LIST.findIndex((n) => n.number === selectedNum.number);
    const prevIndex = (currentIndex - 1 + NUMBERS_LIST.length) % NUMBERS_LIST.length;
    handleSelectNumber(NUMBERS_LIST[prevIndex]);
  };

  const handleSpeak = () => {
    sounds.playPop();
    speech.speak(`Angka ${selectedNum.number}. ${selectedNum.word}!`, 0.85, 1.15);
  };

  return (
    <div className="space-y-6">
      {/* Featured Big Number Card */}
      <div className="bg-white/90 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer"
          aria-label="Angka Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer"
          aria-label="Angka Selanjutnya"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Big Number */}
        <span className={`text-8xl sm:text-9xl font-black ${selectedNum.color} drop-shadow-sm`}>
          {selectedNum.number}
        </span>

        <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider mt-2">
          {selectedNum.word}
        </h3>

        {/* Visual Item Multiples Display */}
        <div className="mt-4 p-4 bg-sky-50/80 rounded-2xl border-2 border-sky-100 w-full max-h-48 overflow-y-auto">
          {selectedNum.number === 0 ? (
            <p className="text-slate-400 font-bold italic py-4">Kosong (Tidak ada benda)</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 items-center">
              {Array.from({ length: selectedNum.number }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => {
                    sounds.playCountBeep(i + 1);
                    speech.speak(`${i + 1}`, 1.0, 1.2);
                  }}
                  className="text-3xl sm:text-4xl hover:scale-125 active:scale-95 transition-transform cursor-pointer select-none"
                  title={`Benda ke-${i + 1}`}
                >
                  {selectedNum.emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Listen Button */}
        <button
          onClick={handleSpeak}
          className="mt-5 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-lg border-2 border-sky-300 flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer text-base sm:text-lg"
        >
          <Volume2 className="w-6 h-6" />
          <span>Dengarkan Angka</span>
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </button>
      </div>

      {/* Numbers 0-20 Grid */}
      <div className="bg-white/80 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-4xl mx-auto">
        <h4 className="text-center font-bold text-slate-600 mb-3 text-sm sm:text-base">
          Pilih angka untuk dipelajari:
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
          {NUMBERS_LIST.map((item) => {
            const isSelected = item.number === selectedNum.number;
            return (
              <button
                key={item.number}
                onClick={() => handleSelectNumber(item)}
                className={`aspect-square flex flex-col items-center justify-center rounded-2xl font-black text-2xl sm:text-3xl transition-all cursor-pointer border-3 ${
                  isSelected
                    ? `${item.bgColor} ${item.borderColor} ${item.color} scale-110 shadow-lg ring-4 ring-sky-300 -translate-y-1`
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm active:scale-95"
                }`}
              >
                <span>{item.number}</span>
                <span className="text-xs sm:text-xs font-semibold text-slate-500 -mt-1">{item.word.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
