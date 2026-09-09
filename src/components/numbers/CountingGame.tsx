import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Star, Shuffle } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface CountingGameProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

interface CountItem {
  id: number;
  tapped: boolean;
  order: number | null;
}

const SESSION_SIZE = 10;

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
  { name: "Kado", emoji: "🎁", question: "Ada berapa kado kejutan di pesta ulang tahun?" },
  { name: "Robot", emoji: "🤖", question: "Ada berapa robot canggih di ruangan?" },
  { name: "Kapal", emoji: "🚢", question: "Ada berapa kapal berlayar di laut lepas?" },
  { name: "Kereta", emoji: "🚂", question: "Ada berapa gerbong kereta melaju?" },
  { name: "Sepeda", emoji: "🚲", question: "Ada berapa sepeda terparkir rapi?" },
  { name: "Ceri", emoji: "🍒", question: "Ada berapa buah ceri merah dipetik?" },
  { name: "Jeruk", emoji: "🍊", question: "Ada berapa buah jeruk manis segar?" },
  { name: "Mangga", emoji: "🥭", question: "Ada berapa buah mangga ranum di pohon?" },
  { name: "Anggur", emoji: "🍇", question: "Ada berapa dompol anggur ungu?" },
  { name: "Nanas", emoji: "🍍", question: "Ada berapa nanas bermahkota daun?" },
  { name: "Kue Kering", emoji: "🍪", question: "Ada berapa kue kering cokelat di toples?" },
  { name: "Piala Emas", emoji: "🏆", question: "Ada berapa piala juara di lemari?" },
  { name: "Kacamata", emoji: "👓", question: "Ada berapa kacamata di atas meja?" },
  { name: "Buku Cerita", emoji: "📚", question: "Ada berapa tumpukan buku cerita?" },
  { name: "Gitar", emoji: "🎸", question: "Ada berapa gitar yang siap dimainkan?" },
  { name: "Pelangi", emoji: "🌈", question: "Ada berapa pelangi menghiasi langit?" },
  { name: "Gajah", emoji: "🐘", question: "Ada berapa anak gajah di sungai?" }
];

const getRandomIndices = (total: number, count: number): number[] => {
  const indices = Array.from({ length: total }, (_, i) => i);
  const shuffled = indices.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, total));
};

export const CountingGame: React.FC<CountingGameProps> = ({ onEarnStar, onBackToHome }) => {
  // 10 themes per session
  const [sessionThemeIndices, setSessionThemeIndices] = useState<number[]>(() =>
    getRandomIndices(EMOJI_SETS.length, SESSION_SIZE)
  );
  const [sessionStep, setSessionStep] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const [targetCount, setTargetCount] = useState(3);
  const [items, setItems] = useState<CountItem[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tappedCount, setTappedCount] = useState(0);
  const [selectedWrongAnswer, setSelectedWrongAnswer] = useState<number | null>(null);

  const currentThemeIndex = sessionThemeIndices[sessionStep] ?? 0;
  const currentTheme = EMOJI_SETS[currentThemeIndex] ?? EMOJI_SETS[0];

  const generateRound = useCallback((themeObj: typeof EMOJI_SETS[0]) => {
    setIsCompleted(false);
    setSelectedWrongAnswer(null);
    setTappedCount(0);

    const count = Math.floor(Math.random() * 8) + 2;
    setTargetCount(count);

    const newItems: CountItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      tapped: false,
      order: null,
    }));
    setItems(newItems);

    const opts = new Set<number>([count]);
    while (opts.size < 3) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const val = count + delta;
      if (val > 0 && val <= 10) {
        opts.add(val);
      }
    }
    setOptions(Array.from(opts).sort((a, b) => a - b));

    setTimeout(() => {
      speech.speak(themeObj.question, 0.9, 1.15);
    }, 300);
  }, []);

  useEffect(() => {
    generateRound(currentTheme);
  }, [currentThemeIndex, generateRound]);

  const startNewSession = () => {
    const newIndices = getRandomIndices(EMOJI_SETS.length, SESSION_SIZE);
    setSessionThemeIndices(newIndices);
    setSessionStep(0);
    setIsSessionComplete(false);
  };

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

  const handleSelectOption = (num: number) => {
    sounds.playPop();

    if (num === targetCount) {
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
      setSelectedWrongAnswer(num);
      sounds.playGentleBoing();
      speech.speak("Bukan itu, yuk coba hitung lagi!", 0.9, 1.1);
    }
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    if (sessionStep + 1 >= SESSION_SIZE) {
      setIsSessionComplete(true);
    } else {
      setSessionStep((s) => s + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Session Progress Bar (10 Soal per Sesi) */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-md border-2 border-emerald-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <Shuffle className="w-4 h-4" /> Soal {sessionStep + 1} dari {SESSION_SIZE}
          </span>
          <span className="text-slate-400 font-bold">
            Bank: {EMOJI_SETS.length} Tema Benda
          </span>
          <span className="text-amber-500 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> +1 Bintang
          </span>
        </div>

        {/* Visual Progress Track */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((sessionStep + (isCompleted ? 1 : 0)) / SESSION_SIZE) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-200 text-center relative overflow-hidden">
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

        {/* Completed banner */}
        {isCompleted && (
          <div className="mt-6 space-y-4 animate-bounce-slow">
            <div className="p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>Hebat! Ada {targetCount} {currentTheme.name}!</span>
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>{sessionStep + 1 >= SESSION_SIZE ? "Lihat Hasil Sesi 10 Soal 🎉" : "Soal Berikutnya"}</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        )}
      </div>

      {/* Auxiliary actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={startNewSession}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
          title="Mulai 10 soal baru"
        >
          <Shuffle className="w-4 h-4 text-emerald-500" />
          <span>Mulai 10 Soal Baru</span>
        </button>
        <button
          onClick={() => {
            sounds.playPop();
            generateRound(currentTheme);
          }}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Hitung Ulang</span>
        </button>
      </div>

      {/* Session Complete Modal */}
      <SessionCompleteModal
        isOpen={isSessionComplete}
        moduleName="Hitung Benda Ceria"
        starsEarned={SESSION_SIZE}
        onPlayAgain={startNewSession}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
