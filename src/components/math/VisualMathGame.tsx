import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, Plus, Minus, Star, Shuffle } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface VisualMathGameProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

type MathOperation = "add" | "subtract";
const SESSION_SIZE = 10;

const MATH_ITEMS = [
  { name: "Apel", emoji: "🍎" },
  { name: "Bintang", emoji: "⭐" },
  { name: "Balon", emoji: "🎈" },
  { name: "Donat", emoji: "🍩" },
  { name: "Permen", emoji: "🍬" },
  { name: "Bunga", emoji: "🌸" },
  { name: "Kue Mangkuk", emoji: "🧁" },
  { name: "Stroberi", emoji: "🍓" },
  { name: "Mobil", emoji: "🚗" },
  { name: "Anak Kucing", emoji: "🐱" },
  { name: "Kelinci", emoji: "🐰" },
  { name: "Es Krim", emoji: "🍦" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Kue Kering", emoji: "🍪" },
  { name: "Panda", emoji: "🐼" },
  { name: "Jamur", emoji: "🍄" },
  { name: "Jeruk", emoji: "🍊" },
  { name: "Pisang", emoji: "🍌" },
  { name: "Bebek", emoji: "🦆" },
  { name: "Ikan", emoji: "🐟" },
  { name: "Roket", emoji: "🚀" },
  { name: "Semangka", emoji: "🍉" },
  { name: "Lebah", emoji: "🐝" },
  { name: "Ceri", emoji: "🍒" },
  { name: "Kado", emoji: "🎁" },
  { name: "Kupu-Kupu", emoji: "🦋" },
  { name: "Kapal", emoji: "🚢" },
  { name: "Anak Ayam", emoji: "🐥" },
  { name: "Kura-Kura", emoji: "🐢" },
  { name: "Mangga", emoji: "🥭" },
  { name: "Nanas", emoji: "🍍" },
  { name: "Anggur", emoji: "🍇" },
  { name: "Sepeda", emoji: "🚲" },
  { name: "Robot", emoji: "🤖" },
  { name: "Piala Emas", emoji: "🏆" },
  { name: "Gitar", emoji: "🎸" },
  { name: "Kereta", emoji: "🚂" },
  { name: "Singa", emoji: "🦁" },
  { name: "Kuda", emoji: "🐴" },
  { name: "Gajah", emoji: "🐘" },
];

export const VisualMathGame: React.FC<VisualMathGameProps> = ({ onEarnStar, onBackToHome }) => {
  const [operation, setOperation] = useState<MathOperation>("add");
  const [maxRange, setMaxRange] = useState<number>(5);

  const [sessionStep, setSessionStep] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const [numA, setNumA] = useState(2);
  const [numB, setNumB] = useState(1);
  const [itemTheme, setItemTheme] = useState(MATH_ITEMS[0]);
  const [options, setOptions] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedWrong, setSelectedWrong] = useState<number | null>(null);

  const correctAnswer = operation === "add" ? numA + numB : numA - numB;

  const generateProblem = useCallback(() => {
    setIsCompleted(false);
    setSelectedWrong(null);

    const theme = MATH_ITEMS[Math.floor(Math.random() * MATH_ITEMS.length)];
    setItemTheme(theme);

    let a = 1;
    let b = 1;

    if (operation === "add") {
      if (maxRange === 5) {
        a = Math.floor(Math.random() * 3) + 1;
        b = Math.floor(Math.random() * (5 - a)) + 1;
      } else {
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * (10 - a)) + 1;
      }
    } else {
      if (maxRange === 5) {
        a = Math.floor(Math.random() * 4) + 2;
        b = Math.floor(Math.random() * (a - 1)) + 1;
      } else {
        a = Math.floor(Math.random() * 7) + 3;
        b = Math.floor(Math.random() * (a - 1)) + 1;
      }
    }

    setNumA(a);
    setNumB(b);

    const ans = operation === "add" ? a + b : a - b;

    const opts = new Set<number>([ans]);
    while (opts.size < 3) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const val = ans + delta;
      if (val >= 0 && val <= 10) {
        opts.add(val);
      }
    }
    setOptions(Array.from(opts).sort((x, y) => x - y));

    setTimeout(() => {
      if (operation === "add") {
        speech.speak(`${a} ditambah ${b}, ada berapa semuanya?`, 0.9, 1.15);
      } else {
        speech.speak(`${a} dikurangi ${b}, tersisa berapa?`, 0.9, 1.15);
      }
    }, 300);
  }, [operation, maxRange]);

  useEffect(() => {
    generateProblem();
  }, [sessionStep, generateProblem]);

  const startNewSession = () => {
    setSessionStep(0);
    setIsSessionComplete(false);
    generateProblem();
  };

  const handleSelectAnswer = (ans: number) => {
    sounds.playPop();

    if (ans === correctAnswer) {
      setIsCompleted(true);
      setSelectedWrong(null);
      sounds.playCorrectChime();
      onEarnStar();

      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
      });

      const opText = operation === "add" ? "ditambah" : "dikurangi";
      setTimeout(() => {
        speech.speak(`Hebat! ${numA} ${opText} ${numB} sama dengan ${correctAnswer}!`, 0.85, 1.15);
      }, 400);
    } else {
      setSelectedWrong(ans);
      sounds.playGentleBoing();
      speech.speak("Belum pas, yuk hitung lagi gambarnya!", 0.9, 1.1);
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
      <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-md border-2 border-indigo-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-indigo-600">
            <Shuffle className="w-4 h-4" /> Soal {sessionStep + 1} dari {SESSION_SIZE}
          </span>
          <span className="text-slate-400 font-bold">
            Bank: {MATH_ITEMS.length} Tema Benda
          </span>
          <span className="text-amber-500 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> +1 Bintang
          </span>
        </div>

        {/* Visual Progress Track */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((sessionStep + (isCompleted ? 1 : 0)) / SESSION_SIZE) * 100}%` }}
          />
        </div>
      </div>

      {/* Mode Controls: Add vs Subtract & Difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur p-3 rounded-2xl border border-slate-200 shadow-sm">
        {/* Operation Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              sounds.playPop();
              setOperation("add");
              startNewSession();
            }}
            className={`px-4 py-2 rounded-xl font-black text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              operation === "add"
                ? "bg-indigo-600 text-white shadow-md scale-102"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Penjumlahan (+)</span>
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              setOperation("subtract");
              startNewSession();
            }}
            className={`px-4 py-2 rounded-xl font-black text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              operation === "subtract"
                ? "bg-indigo-600 text-white shadow-md scale-102"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Minus className="w-4 h-4 stroke-[3]" />
            <span>Pengurangan (-)</span>
          </button>
        </div>

        {/* Level toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => {
              sounds.playPop();
              setMaxRange(5);
              startNewSession();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              maxRange === 5
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Angka 1-5
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              setMaxRange(10);
              startNewSession();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              maxRange === 10
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Angka 1-10
          </button>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-indigo-200 text-center relative overflow-hidden">
        {/* Visual Equation Container */}
        {operation === "add" ? (
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
            {/* Group A */}
            <div className="flex-1 bg-indigo-50/90 rounded-2xl p-4 border-2 border-indigo-200 flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-1.5 min-h-[4rem] items-center">
                {Array.from({ length: numA }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl animate-bounce-slow">
                    {itemTheme.emoji}
                  </span>
                ))}
              </div>
              <span className="text-2xl sm:text-3xl font-black text-indigo-700 mt-2">
                {numA}
              </span>
            </div>

            {/* Plus sign */}
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md shrink-0">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>

            {/* Group B */}
            <div className="flex-1 bg-pink-50/90 rounded-2xl p-4 border-2 border-pink-200 flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-1.5 min-h-[4rem] items-center">
                {Array.from({ length: numB }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl animate-bounce-slow">
                    {itemTheme.emoji}
                  </span>
                ))}
              </div>
              <span className="text-2xl sm:text-3xl font-black text-pink-700 mt-2">
                {numB}
              </span>
            </div>

            {/* Equals sign */}
            <div className="text-3xl sm:text-4xl font-black text-slate-400 shrink-0">
              =
            </div>

            {/* Result Box */}
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-amber-100 rounded-2xl border-3 border-amber-400 border-dashed flex items-center justify-center font-black text-3xl sm:text-4xl text-amber-700 shrink-0 shadow-inner">
              {isCompleted ? correctAnswer : "?"}
            </div>
          </div>
        ) : (
          <div className="my-6 space-y-4">
            <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-black text-slate-800">
              <span className="text-indigo-600">{numA}</span>
              <span className="text-slate-400">-</span>
              <span className="text-rose-500">{numB}</span>
              <span className="text-slate-400">=</span>
              <span className="text-amber-600 underline decoration-dashed">
                {isCompleted ? correctAnswer : "?"}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 flex flex-wrap justify-center gap-3 items-center min-h-[5.5rem]">
              {Array.from({ length: numA - numB }).map((_, i) => (
                <div key={`rem-${i}`} className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl animate-bounce-slow">
                    {itemTheme.emoji}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">Sisa</span>
                </div>
              ))}
              {Array.from({ length: numB }).map((_, i) => (
                <div key={`sub-${i}`} className="relative p-2 bg-rose-50 rounded-xl border border-rose-200 opacity-60 flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl line-through grayscale">
                    {itemTheme.emoji}
                  </span>
                  <span className="text-xs font-bold text-rose-600">Hilang ❌</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Answer Choices */}
        <div className="mt-6 space-y-3">
          <p className="font-bold text-slate-600 text-sm sm:text-base">
            Pilih jawaban yang benar:
          </p>
          <div className="flex justify-center gap-3 sm:gap-4">
            {options.map((opt) => {
              const isWrong = selectedWrong === opt;
              const isCorrectAnswer = isCompleted && opt === correctAnswer;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={isCompleted}
                  className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl font-black text-3xl sm:text-4xl border-3 transition-all cursor-pointer shadow-md ${
                    isCorrectAnswer
                      ? "bg-emerald-500 text-white border-emerald-300 scale-110 shadow-lg ring-4 ring-emerald-200"
                      : isWrong
                      ? "bg-rose-100 text-rose-600 border-rose-300"
                      : "bg-white hover:bg-indigo-50 text-indigo-900 border-indigo-200 active:scale-95"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Success Banner */}
        {isCompleted && (
          <div className="mt-6 space-y-4 animate-bounce-slow">
            <div className="p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>
                Pintar Sekali! {numA} {operation === "add" ? "+" : "-"} {numB} = {correctAnswer}!
              </span>
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
          <Shuffle className="w-4 h-4 text-indigo-500" />
          <span>Mulai 10 Soal Baru</span>
        </button>
      </div>

      {/* Session Complete Modal */}
      <SessionCompleteModal
        isOpen={isSessionComplete}
        moduleName="Matematika Ceria"
        starsEarned={SESSION_SIZE}
        onPlayAgain={startNewSession}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
