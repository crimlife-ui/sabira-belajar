import React, { useState } from "react";
import { Volume2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { ALPHABET_LIST, AlphabetItem } from "../../data/alphabetData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

export const LetterExplorer: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem>(ALPHABET_LIST[0]);

  const handleSelectLetter = (item: AlphabetItem) => {
    sounds.playPop();
    setSelectedLetter(item);
    speech.speak(`${item.letter}. ${item.word}!`, 0.9, 1.15);
  };

  const handleNext = () => {
    const currentIndex = ALPHABET_LIST.findIndex((a) => a.letter === selectedLetter.letter);
    const nextIndex = (currentIndex + 1) % ALPHABET_LIST.length;
    handleSelectLetter(ALPHABET_LIST[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = ALPHABET_LIST.findIndex((a) => a.letter === selectedLetter.letter);
    const prevIndex = (currentIndex - 1 + ALPHABET_LIST.length) % ALPHABET_LIST.length;
    handleSelectLetter(ALPHABET_LIST[prevIndex]);
  };

  const handleSpeakWord = () => {
    sounds.playPop();
    speech.speak(`Huruf ${selectedLetter.letter}. ${selectedLetter.word}!`, 0.85, 1.15);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Featured Big Letter Card - Sticky / Statis saat discroll */}
      <div className="sticky top-2 z-20 bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-6 shadow-xl border-4 border-pink-200 max-w-xl mx-auto relative overflow-hidden transition-all">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
          aria-label="Huruf Sebelumnya"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
          aria-label="Huruf Selanjutnya"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </button>

        {/* Content Container: Compact row on mobile, spacious column on tablet/desktop */}
        <div className="flex flex-row sm:flex-col items-center justify-around sm:justify-center text-center px-8 sm:px-0 gap-2 sm:gap-3">
          {/* Big Letter Display */}
          <div className="flex items-baseline justify-center gap-1.5 sm:gap-4 shrink-0">
            <span className={`text-5xl sm:text-8xl md:text-9xl font-black ${selectedLetter.color} tracking-tight drop-shadow-sm`}>
              {selectedLetter.letter}
            </span>
            <span className="text-4xl sm:text-7xl md:text-8xl font-extrabold text-slate-400">
              {selectedLetter.letter.toLowerCase()}
            </span>
          </div>

          {/* Object illustration & Word */}
          <div className="flex flex-col items-center gap-0.5 sm:gap-2">
            <div
              onClick={handleSpeakWord}
              className="text-4xl sm:text-7xl md:text-8xl p-1 sm:p-2 cursor-pointer active:scale-90 transition-transform select-none hover:rotate-3"
              title="Klik untuk mendengar suara!"
            >
              {selectedLetter.emoji}
            </div>
            <h3 className="text-lg sm:text-3xl md:text-4xl font-black text-slate-800 tracking-wider">
              {selectedLetter.word.toUpperCase()}
            </h3>
          </div>

          {/* Listen Button */}
          <button
            onClick={handleSpeakWord}
            className="px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-xl sm:rounded-2xl shadow-md border-2 border-pink-300 flex items-center gap-1.5 sm:gap-2.5 active:scale-95 transition-all cursor-pointer text-xs sm:text-base sm:mt-2 shrink-0"
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Dengarkan Suara</span>
            <span className="inline sm:hidden">Suara</span>
            <Sparkles className="w-4 h-4 text-yellow-300 hidden sm:inline" />
          </button>
        </div>
      </div>

      {/* 26 Alphabet Grid (Touch friendly) */}
      <div className="bg-white/80 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-4xl mx-auto">
        <h4 className="text-center font-bold text-slate-600 mb-3 text-sm sm:text-base">
          Pilih huruf untuk dipelajari:
        </h4>
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 sm:gap-3">
          {ALPHABET_LIST.map((item) => {
            const isSelected = item.letter === selectedLetter.letter;
            return (
              <button
                key={item.letter}
                onClick={() => handleSelectLetter(item)}
                className={`aspect-square flex flex-col items-center justify-center rounded-2xl font-black text-xl sm:text-2xl transition-all cursor-pointer border-3 ${
                  isSelected
                    ? `${item.bgColor} ${item.borderColor} ${item.color} scale-110 shadow-lg ring-4 ring-pink-300 -translate-y-1`
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm active:scale-95"
                }`}
              >
                <span>{item.letter}</span>
                <span className="text-xs sm:text-sm -mt-1 opacity-80">{item.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
