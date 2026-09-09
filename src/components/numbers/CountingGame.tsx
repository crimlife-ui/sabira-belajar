import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Star } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface CountingGameProps {
  onEarnStar: () => void;
}

interface CountItem {
  id: number;
  tapped: boolean;
  order: number | null;
}

const EMOJI_SETS = [
  { name: "Apel", emoji: "🍎", question: "Ada berapa buah apel di kebun?" },
  { name: "Bintang", emoji: "⭐", question: "Ada berapa bintang yang bersinar?" },
  { name: "Donat", emoji: "🍩", question: "Ada berapa donat lezat di meja?" },
  { name: "Balon", emoji: "🎈", question: "Ada berapa balon warna-warni?" },
  { name: "Mobil", emoji: "🚗", question: "Ada berapa mobil yang sedang parkir?" },
  { name: "Kucing", emoji: "🐱", question: "Ada berapa kucing lucu di sini?" },
  { name: "Kelinci", emoji: "🐰", question: "Ada berapa kelinci yang melompat?" },
  { name: "Stroberi", emoji: "🍓", question: "Ada berapa stroberi manis ini?" },
];

export const CountingGame: React.FC<CountingGameProps> = ({ onEarnStar }) => {
  const [targetCount, setTargetCount] = useState(3);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [items, setItems] = useState<CountItem[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tappedCount, setTappedCount] = useState(0);
  const [selectedWrongAnswer, setSelectedWrongAnswer] = useState<number | null>(null);

  const currentTheme = EMOJI_SETS[currentSetIndex];

  // Start new round
  useEffect(() => {
    generateRound();
  }, [currentSetIndex]);

  const generateRound = () => {
    setIsCompleted(false);
    setSelectedWrongAnswer(null);
    setTappedCount(0);

    // Random count between 2 and 9
    const count = Math.floor(Math.random() * 7) + 2;
    setTargetCount(count);

    // Items array
    const newItems: CountItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      tapped: false,
      order: null,
    }));
    setItems(newItems);

    // Options (including correct count and 2 distractors)
    const opts = new Set<number>([count]);
    while (opts.size < 3) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const val = count + delta;
      if (val > 0 && val <= 10) {
        opts.add(val);
      }
    }
    setOptions(Array.from(opts).sort((a, b) => a - b));

    // Voice prompt
    setTimeout(() => {
      speech.speak(currentTheme.question, 0.9, 1.15);
    }, 300);
  };

  // Tapping individual item on screen
  const handleTapItem = (id: number) => {
    const targetItem = items.find((i) => i.id === id);
    if (!targetItem || targetItem.tapped || isCompleted) return;

    const nextOrder = tappedCount + 1;
    setTappedCount(nextOrder);

    sounds.playCountBeep(nextOrder);
    speech.speak(`${nextOrder}`, 1.05, 1.25);

    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, tapped: true, order: nextOrder } : it))
    );
  };

  // Answering the question
  const handleSelectOption = (num: number) => {
    sounds.playPop();

    if (num === targetCount) {
      // Correct!
      setIsCompleted(true);
      setSelectedWrongAnswer(null);
      sounds.playCorrectChime();
      onEarnStar();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        speech.speak(`Benar sekali! Ada ${targetCount} ${currentTheme.name}!`, 0.9, 1.15);
      }, 350);
    } else {
      // Wrong
      setSelectedWrongAnswer(num);
      sounds.playGentleBoing();
      speech.speak("Bukan itu, yuk coba hitung lagi!", 0.9, 1.1);
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setCurrentSetIndex((prev) => (prev + 1) % EMOJI_SETS.length);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-200 text-center relative overflow-hidden">
        {/* Top Info */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 mb-2">
          <span>Sentuh setiap gambar untuk berhitung!</span>
          <span className="text-amber-500 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> +1 Bintang
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">
          {currentTheme.question}
        </h3>

        {/* Objects Stage */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-emerald-50 to-teal-50 rounded-3xl border-3 border-emerald-100 min-h-[16rem] flex flex-wrap justify-center items-center gap-4 sm:gap-6 relative shadow-inner">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTapItem(item.id)}
              className={`relative p-2 rounded-2xl transition-all cursor-pointer select-none active:scale-90 ${
                item.tapped ? "scale-105" : "hover:scale-110 animate-bounce-slow"
              }`}
            >
              <span className="text-6xl sm:text-7xl block filter drop-shadow">
                {currentTheme.emoji}
              </span>
              {item.tapped && item.order && (
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 text-amber-950 font-black rounded-full flex items-center justify-center text-sm shadow-md border-2 border-white ring-2 ring-amber-200 animate-pop">
                  {item.order}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Answer Options */}
        <div className="mt-6 space-y-3">
          <p className="font-bold text-slate-600 text-sm sm:text-base">
            Berapa jumlah semuanya?
          </p>

          <div className="flex justify-center gap-3 sm:gap-4">
            {options.map((opt) => {
              const isWrong = selectedWrongAnswer === opt;
              const isCorrectAnswer = isCompleted && opt === targetCount;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isCompleted}
                  className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl font-black text-3xl sm:text-4xl border-3 transition-all cursor-pointer shadow-md ${
                    isCorrectAnswer
                      ? "bg-emerald-500 text-white border-emerald-300 scale-110 shadow-lg ring-4 ring-emerald-200"
                      : isWrong
                      ? "bg-rose-100 text-rose-600 border-rose-300"
                      : "bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200 active:scale-95"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Completed celebration banner */}
        {isCompleted && (
          <div className="mt-6 space-y-4 animate-bounce-slow">
            <div className="p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>Hebat! Ada {targetCount} {currentTheme.name}!</span>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>Soal Berikutnya</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        )}
      </div>

      {/* Auxiliary actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            generateRound();
          }}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4 text-emerald-500" />
          <span>Ganti Soal</span>
        </button>
      </div>
    </div>
  );
};
