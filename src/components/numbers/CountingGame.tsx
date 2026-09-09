import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Star, Shuffle } from "lucide-react";
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
  { name: "Apel", emoji: "🍎", question: "Ada berapa buah apel merah di keranjang?" },
  { name: "Bintang", emoji: "⭐", question: "Ada berapa bintang bersinar di langit?" },
  { name: "Donat", emoji: "🍩", question: "Ada berapa donat lezat di meja?" },
  { name: "Balon", emoji: "🎈", question: "Ada berapa balon warna-warni terbang?" },
  { name: "Mobil", emoji: "🚗", question: "Ada berapa mobil parkir di garasi?" },
  { name: "Kucing", emoji: "🐱", question: "Ada berapa anak kucing yang lucu?" },
  { name: "Kelinci", emoji: "🐰", question: "Ada berapa kelinci yang sedang melompat?" },
  { name: "Stroberi", emoji: "🍓", question: "Ada berapa stroberi manis di kebun?" },
  { name: "Ikan", emoji: "🐟", question: "Ada berapa ikan berenang di akuarium?" },
  { name: "Permen", emoji: "🍬", question: "Ada berapa permen manis di toples?" },
  { name: "Es Krim", emoji: "🍦", question: "Ada berapa es krim dingin di meja?" },
  { name: "Kupu-Kupu", emoji: "🦋", question: "Ada berapa kupu-kupu hinggap di taman?" },
  { name: "Kura-Kura", emoji: "🐢", question: "Ada berapa kura-kura berjalan santai?" },
  { name: "Anak Ayam", emoji: "🐥", question: "Ada berapa anak ayam yang mungil?" },
  { name: "Jamur", emoji: "🍄", question: "Ada berapa jamur tumbuh di rumput?" },
  { name: "Kue", emoji: "🧁", question: "Ada berapa kue mangkuk yang lezat?" },
  { name: "Pizza", emoji: "🍕", question: "Ada berapa potong pizza hangat?" },
  { name: "Bebek", emoji: "🦆", question: "Ada berapa bebek berenang di kolam?" },
  { name: "Pisang", emoji: "🍌", question: "Ada berapa pisang kuning di meja?" },
  { name: "Lebah", emoji: "🐝", question: "Ada berapa lebah mengumpulkan madu?" },
  { name: "Roket", emoji: "🚀", question: "Ada berapa roket meluncur ke angkasa?" },
  { name: "Semangka", emoji: "🍉", question: "Ada berapa potong semangka segar?" },
  { name: "Burung", emoji: "🦜", question: "Ada berapa burung bertengger di dahan?" },
  { name: "Bunga", emoji: "🌸", question: "Ada berapa bunga mekar di taman?" },
  { name: "Panda", emoji: "🐼", question: "Ada berapa panda lucu makan bambu?" },
  { name: "Wortel", emoji: "🥕", question: "Ada berapa wortel segar dipanen?" },
  { name: "Singa", emoji: "🦁", question: "Ada berapa anak singa sedang bermain?" },
  { name: "Kuda", emoji: "🐴", question: "Ada berapa kuda gagah di padang rumput?" },
];

export const CountingGame: React.FC<CountingGameProps> = ({ onEarnStar }) => {
  const [targetCount, setTargetCount] = useState(3);
  const [currentSetIndex, setCurrentSetIndex] = useState(() =>
    Math.floor(Math.random() * EMOJI_SETS.length)
  );
  const [questionCount, setQuestionCount] = useState(1);
  const [items, setItems] = useState<CountItem[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tappedCount, setTappedCount] = useState(0);
  const [selectedWrongAnswer, setSelectedWrongAnswer] = useState<number | null>(null);

  const currentTheme = EMOJI_SETS[currentSetIndex] ?? EMOJI_SETS[0];

  useEffect(() => {
    generateRound(currentSetIndex);
  }, [currentSetIndex]);

  const generateRound = (setIdx: number) => {
    setIsCompleted(false);
    setSelectedWrongAnswer(null);
    setTappedCount(0);

    const theme = EMOJI_SETS[setIdx];

    // Random count between 1 and 9
    const count = Math.floor(Math.random() * 8) + 2;
    setTargetCount(count);

    // Items array
    const newItems: CountItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      tapped: false,
      order: null,
    }));
    setItems(newItems);

    // Generate 3 choices (1 correct, 2 distractors)
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
      speech.speak(theme.question, 0.9, 1.15);
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

  // Move to next random question
  const handleNextRandom = () => {
    sounds.playPop();
    setQuestionCount((c) => c + 1);
    // Pick different random index
    let nextIdx = Math.floor(Math.random() * EMOJI_SETS.length);
    if (nextIdx === currentSetIndex) {
      nextIdx = (nextIdx + 1) % EMOJI_SETS.length;
    }
    setCurrentSetIndex(nextIdx);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-200 text-center relative overflow-hidden">
        {/* Top Info */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 bg-emerald-100/70 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
            <Shuffle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Soal Acak #{questionCount} (Bank: {EMOJI_SETS.length} Tema)</span>
          </div>
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
              onClick={handleNextRandom}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>Soal Acak Berikutnya</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        )}
      </div>

      {/* Auxiliary actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleNextRandom}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <Shuffle className="w-4 h-4 text-emerald-500" />
          <span>Ganti Soal Acak</span>
        </button>
        <button
          onClick={() => {
            sounds.playPop();
            generateRound(currentSetIndex);
          }}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Hitung Ulang</span>
        </button>
      </div>
    </div>
  );
};
