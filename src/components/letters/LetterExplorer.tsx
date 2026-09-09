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
    <div className="space-y-6">
      {/* Featured Big Letter Card */}
      <div className="bg-white/90 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-pink-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer"
          aria-label="Huruf Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full shadow-md active:scale-90 transition-all cursor-pointer"
          aria-label="Huruf Selanjutnya"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Big Letter Display */}
        <div className="flex items-baseline justify-center gap-3">
          <span className={`text-7xl sm:text-9xl font-black ${selectedLetter.color} tracking-tight drop-shadow-sm`}>
            {selectedLetter.letter}
          </span>
          <span className="text-4xl sm:text-6xl font-bold text-slate-400">
            {selectedLetter.letter.toLowerCase()}
          </span>
        </div>

        {/* Object illustration & Word */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div
            onClick={handleSpeakWord}
            className="text-6xl sm:text-8xl p-4 cursor-pointer active:scale-90 transition-transform select-none hover:rotate-3"
            title="Klik untuk mendengar suara!"
          >
            {selectedLetter.emoji}
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider">
            {selectedLetter.word.toUpperCase()}
          </h3>
        </div>

        {/* Listen Button */}
        <button
          onClick={handleSpeakWord}
          className="mt-5 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-2xl shadow-lg border-2 border-pink-300 flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer text-base sm:text-lg"
        >
          <Volume2 className="w-6 h-6" />
          <span>Dengarkan Suara</span>
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </button>
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
