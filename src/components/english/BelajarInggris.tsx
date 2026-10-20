import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Palette,
  Shapes,
  MessageSquareText,
  Target,
} from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import {
  ENGLISH_COLORS,
  ENGLISH_SHAPES,
  ENGLISH_WORDS,
  ENGLISH_WORD_CATEGORIES,
  ENGLISH_SENTENCES,
  EnglishColor,
  EnglishWord,
  EnglishWordCategory,
  EnglishShape,
} from "../../data/englishData";
import { trackAnswer, trackSessionComplete } from "../../utils/statsTracker";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface BelajarInggrisProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

type EnglishTab = "colors" | "shapes" | "words" | "sentences" | "quiz";

const QUIZ_SIZE = 8;

function shuffleIndices(total: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

// Dengarkan bahasa Inggris dulu, lalu arti Indonesianya menyusul.
const speakPair = (en: string, id: string) => {
  speech.speakEnglish(en, 0.8, 1.15);
  window.setTimeout(() => speech.speak(id, 0.9, 1.15), 1500);
};

export const BelajarInggris: React.FC<BelajarInggrisProps> = ({ onEarnStar, onBackToHome }) => {
  const [tab, setTab] = useState<EnglishTab>("colors");

  const TABS: { id: EnglishTab; label: string }[] = [
    { id: "colors", label: "🎨 Warna" },
    { id: "shapes", label: "🔷 Bentuk" },
    { id: "words", label: "🧩 Kata Dasar" },
    { id: "sentences", label: "💬 Kalimat" },
    { id: "quiz", label: "🎯 Kuis" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub Tab */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-cyan-200 shadow-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              sounds.playPop();
              setTab(t.id);
            }}
            className={`flex-1 min-w-[6rem] py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              tab === t.id
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md scale-102"
                : "text-slate-600 hover:bg-cyan-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "colors" && <ColorExplorer />}
      {tab === "shapes" && <ShapeExplorer />}
      {tab === "words" && <WordExplorer />}
      {tab === "sentences" && <SentenceExplorer />}
      {tab === "quiz" && <EnglishQuiz onEarnStar={onEarnStar} onBackToHome={onBackToHome} />}
    </div>
  );
};

// ==================== TAB 1: WARNA ====================
const ColorExplorer: React.FC = () => {
  const [step, setStep] = useState(0);
  const [heardCount, setHeardCount] = useState<Set<number>>(new Set());

  const item = ENGLISH_COLORS[step];

  const handlePrev = () => {
    sounds.playPop();
    setStep((s) => (s - 1 + ENGLISH_COLORS.length) % ENGLISH_COLORS.length);
  };

  const handleNext = () => {
    sounds.playPop();
    setStep((s) => (s + 1) % ENGLISH_COLORS.length);
  };

  const handleHear = () => {
    sounds.playPop();
    speakPair(`It is ${item.en}! ${item.en}!`, `${item.en} artinya ${item.id}!`);
    if (!heardCount.has(step)) {
      const next = new Set(heardCount);
      next.add(step);
      setHeardCount(next);
      if (next.size % 5 === 0) {
        sounds.playFanfare();
        speech.speakEnglish(`Wow! You know ${next.size} colors! Great job!`, 0.85, 1.15);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
      {/* Progress */}
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-cyan-200 flex items-center justify-between text-xs sm:text-sm font-black text-slate-600">
        <span className="flex items-center gap-1.5 text-cyan-600">
          <Palette className="w-4 h-4" /> Warna {step + 1} dari {ENGLISH_COLORS.length}
        </span>
        <span>Sudah dikenal: {heardCount.size} warna</span>
      </div>

      {/* Kartu Warna */}
      <div className="bg-white/95 rounded-3xl border-4 border-cyan-200 shadow-lg p-6 sm:p-8 text-center space-y-4">
        <button
          onClick={handleHear}
          className="mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full border-8 border-white shadow-xl flex items-center justify-center text-7xl active:scale-90 hover:rotate-3 transition-all cursor-pointer select-none"
          style={{ backgroundColor: item.hex, boxShadow: "0 10px 25px rgba(0,0,0,0.15), inset 0 -8px 16px rgba(0,0,0,0.08)" }}
          title={`Sentuh untuk dengar "${item.en}"`}
        >
          {item.emoji}
        </button>

        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-black tracking-wide text-slate-800">
            {item.en}
          </p>
          <p className="text-xl sm:text-2xl font-black text-cyan-600">
            artinya <span className="underline decoration-cyan-300 decoration-4">{item.id}</span>
          </p>
        </div>

        <button
          onClick={handleHear}
          className="mx-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Bahasa Inggris</span>
        </button>

        <p className="text-xs font-bold text-slate-400">
          Sentuh bola warna untuk mendengar namanya!
        </p>
      </div>

      {/* Navigasi */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handlePrev}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl border-2 border-slate-200 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Mundur</span>
        </button>
        <button
          onClick={handleNext}
          className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Warna Berikutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ==================== TAB 2: BENTUK ====================
const ShapeExplorer: React.FC = () => {
  const [step, setStep] = useState(0);
  const [heardCount, setHeardCount] = useState<Set<number>>(new Set());

  const item = ENGLISH_SHAPES[step];

  const handlePrev = () => {
    sounds.playPop();
    setStep((s) => (s - 1 + ENGLISH_SHAPES.length) % ENGLISH_SHAPES.length);
  };

  const handleNext = () => {
    sounds.playPop();
    setStep((s) => (s + 1) % ENGLISH_SHAPES.length);
  };

  const handleHear = () => {
    sounds.playPop();
    speakPair(`This is a ${item.en}! ${item.en}!`, `${item.en} artinya ${item.id}!`);
    if (!heardCount.has(step)) {
      const next = new Set(heardCount);
      next.add(step);
      setHeardCount(next);
      if (next.size % 4 === 0) {
        sounds.playFanfare();
        speech.speakEnglish(`Fantastic! You know ${next.size} shapes!`, 0.85, 1.15);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
      {/* Progress */}
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-cyan-200 flex items-center justify-between text-xs sm:text-sm font-black text-slate-600">
        <span className="flex items-center gap-1.5 text-cyan-600">
          <Shapes className="w-4 h-4" /> Bentuk {step + 1} dari {ENGLISH_SHAPES.length}
        </span>
        <span>Sudah dikenal: {heardCount.size} bentuk</span>
      </div>

      {/* Kartu Bentuk */}
      <div className="bg-white/95 rounded-3xl border-4 border-cyan-200 shadow-lg p-6 sm:p-8 text-center space-y-4">
        <button
          onClick={handleHear}
          className="mx-auto w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-3xl border-4 border-cyan-200 shadow-xl flex items-center justify-center text-8xl active:scale-90 hover:rotate-3 transition-all cursor-pointer select-none"
          title={`Sentuh untuk dengar "${item.en}"`}
        >
          {item.emoji}
        </button>

        <div className="space-y-1">
          <p className="text-4xl sm:text-5xl font-black tracking-wide text-slate-800">
            {item.en}
          </p>
          <p className="text-xl sm:text-2xl font-black text-cyan-600">
            artinya <span className="underline decoration-cyan-300 decoration-4">{item.id}</span>
          </p>
        </div>

        <button
          onClick={handleHear}
          className="mx-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Bahasa Inggris</span>
        </button>

        <p className="text-xs font-bold text-slate-400">
          Sentuh bentuknya untuk mendengar namanya!
        </p>
      </div>

      {/* Navigasi */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handlePrev}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl border-2 border-slate-200 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Mundur</span>
        </button>
        <button
          onClick={handleNext}
          className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Bentuk Berikutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ==================== TAB 3: KATA DASAR ====================
const WordExplorer: React.FC = () => {
  const [category, setCategory] = useState<EnglishWordCategory | "all">("all");
  const [heardEn, setHeardEn] = useState<Set<string>>(new Set());

  const words =
    category === "all" ? ENGLISH_WORDS : ENGLISH_WORDS.filter((w) => w.category === category);

  const handleHear = (word: EnglishWord) => {
    sounds.playPop();
    speakPair(word.en, `${word.en} artinya ${word.id}!`);
    if (!heardEn.has(word.en)) {
      const next = new Set(heardEn);
      next.add(word.en);
      setHeardEn(next);
      if (next.size % 5 === 0) {
        sounds.playFanfare();
        speech.speakEnglish(`Amazing! You learned ${next.size} English words!`, 0.85, 1.15);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fadeIn">
      {/* Filter kategori */}
      <div className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-cyan-200 shadow-sm">
        <button
          onClick={() => {
            sounds.playPop();
            setCategory("all");
          }}
          className={`px-3 py-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            category === "all"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
              : "text-slate-600 hover:bg-cyan-50"
          }`}
        >
          ✨ Semua
        </button>
        {ENGLISH_WORD_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              sounds.playPop();
              setCategory(c.id);
            }}
            className={`px-3 py-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              category === c.id
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                : "text-slate-600 hover:bg-cyan-50"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <p className="text-center text-xs font-black text-slate-500">
        Sudah dipelajari: {heardEn.size} kata • Sentuh kartu untuk dengar bunyinya!
      </p>

      {/* Grid kata */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {words.map((word) => {
          const isHeard = heardEn.has(word.en);
          return (
            <button
              key={word.en}
              onClick={() => handleHear(word)}
              className={`p-4 rounded-3xl border-4 shadow-md text-center space-y-1 cursor-pointer active:scale-95 hover:scale-105 transition-all select-none ${
                isHeard
                  ? "bg-emerald-50 border-emerald-300"
                  : "bg-white border-cyan-200 hover:border-cyan-400"
              }`}
              title={`"${word.en}" — ${word.id}`}
            >
              <div className="text-5xl sm:text-6xl">{word.emoji}</div>
              <p className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
                {word.en}
              </p>
              <p className="text-xs sm:text-sm font-black text-cyan-600">{word.id}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==================== TAB 4: KALIMAT ====================
const SentenceExplorer: React.FC = () => {
  const [order] = useState<number[]>(() => shuffleIndices(ENGLISH_SENTENCES.length));
  const [step, setStep] = useState(0);
  const [heardCount, setHeardCount] = useState<Set<number>>(new Set());

  const sentence = ENGLISH_SENTENCES[order[step]];
  const words = sentence.text.replace(/([!?.,])$/g, "").split(" ");

  const handlePrev = () => {
    sounds.playPop();
    setStep((s) => (s - 1 + order.length) % order.length);
  };

  const handleNext = () => {
    sounds.playPop();
    setStep((s) => (s + 1) % order.length);
  };

  const handleHear = () => {
    sounds.playPop();
    speech.speakEnglish(sentence.text, 0.75, 1.15);
    if (!heardCount.has(step)) {
      const next = new Set(heardCount);
      next.add(step);
      setHeardCount(next);
      if (next.size % 4 === 0) {
        sounds.playFanfare();
        speech.speakEnglish(`Super! You practiced ${next.size} sentences!`, 0.85, 1.15);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
      {/* Progress */}
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-cyan-200 flex items-center justify-between text-xs sm:text-sm font-black text-slate-600">
        <span className="flex items-center gap-1.5 text-cyan-600">
          <MessageSquareText className="w-4 h-4" /> Kalimat {step + 1} dari {order.length}
        </span>
        <span>Sudah didengar: {heardCount.size}</span>
      </div>

      {/* Kartu Kalimat */}
      <div className="bg-white/95 rounded-3xl border-4 border-cyan-200 shadow-lg p-6 sm:p-8 text-center space-y-4">
        <div className="text-7xl select-none">{sentence.emoji}</div>

        {/* Kalimat Inggris */}
        <p className="text-2xl sm:text-4xl font-black tracking-wide text-slate-800 leading-snug">
          {sentence.text}
        </p>

        {/* Artinya */}
        <p className="text-base sm:text-xl font-black text-cyan-600 italic">
          “{sentence.translation}”
        </p>

        {/* Kata per kata bisa disentuh */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => {
                sounds.playPop();
                speech.speakEnglish(w, 0.7, 1.2);
              }}
              className="px-2.5 py-1.5 bg-cyan-50 hover:bg-cyan-100 border-2 border-cyan-200 rounded-xl font-black text-sm sm:text-lg text-cyan-700 cursor-pointer active:scale-95 transition-all"
              title="Sentuh untuk dengar kata ini"
            >
              {w}
            </button>
          ))}
        </div>

        <button
          onClick={handleHear}
          className="mx-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Kalimatnya</span>
        </button>

        <p className="text-xs font-bold text-slate-400">
          Dengarkan, lalu tirukan bunyinya ya! Sentuh kata untuk dengar per kata.
        </p>
      </div>

      {/* Navigasi */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handlePrev}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl border-2 border-slate-200 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Mundur</span>
        </button>
        <button
          onClick={handleNext}
          className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black rounded-2xl shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Kalimat Berikutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ==================== TAB 5: KUIS ====================
type QuizQuestion =
  | { kind: "color"; target: EnglishColor; options: EnglishColor[] }
  | { kind: "shape"; target: EnglishShape; options: EnglishShape[] }
  | { kind: "wordToEmoji"; target: EnglishWord; options: EnglishWord[] }
  | { kind: "emojiToWord"; target: EnglishWord; options: EnglishWord[] };

const EnglishQuiz: React.FC<{ onEarnStar: () => void; onBackToHome?: () => void }> = ({
  onEarnStar,
  onBackToHome,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => makeQuiz());
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  function makeQuiz(): QuizQuestion[] {
    const result: QuizQuestion[] = [];

    // 2 soal warna: pilih swatch warna sesuai kata Inggris
    shuffleIndices(ENGLISH_COLORS.length)
      .slice(0, 2)
      .forEach((idx) => {
        const target = ENGLISH_COLORS[idx];
        const distractors = shuffleIndices(ENGLISH_COLORS.length)
          .filter((i) => i !== idx)
          .slice(0, 2);
        const options = shuffleIndices(3).map((slot) =>
          [target, ...distractors.map((d) => ENGLISH_COLORS[d])][slot]
        );
        result.push({ kind: "color", target, options });
      });

    // 2 soal bentuk: pilih bentuk sesuai kata Inggris
    shuffleIndices(ENGLISH_SHAPES.length)
      .slice(0, 2)
      .forEach((idx) => {
        const target = ENGLISH_SHAPES[idx];
        const distractors = shuffleIndices(ENGLISH_SHAPES.length)
          .filter((i) => i !== idx)
          .slice(0, 2);
        const options = shuffleIndices(3).map((slot) =>
          [target, ...distractors.map((d) => ENGLISH_SHAPES[d])][slot]
        );
        result.push({ kind: "shape", target, options });
      });

    // 2 soal "kata Inggris -> gambar"
    shuffleIndices(ENGLISH_WORDS.length)
      .slice(0, 2)
      .forEach((idx) => {
        const target = ENGLISH_WORDS[idx];
        const distractors = shuffleIndices(ENGLISH_WORDS.length)
          .filter((i) => i !== idx)
          .slice(0, 2);
        const options = shuffleIndices(3).map((slot) =>
          [target, ...distractors.map((d) => ENGLISH_WORDS[d])][slot]
        );
        result.push({ kind: "wordToEmoji", target, options });
      });

    // 2 soal "gambar -> kata Inggris"
    shuffleIndices(ENGLISH_WORDS.length)
      .slice(0, 2)
      .forEach((idx) => {
        const target = ENGLISH_WORDS[idx];
        const distractors = shuffleIndices(ENGLISH_WORDS.length)
          .filter((i) => i !== idx)
          .slice(0, 2);
        const options = shuffleIndices(3).map((slot) =>
          [target, ...distractors.map((d) => ENGLISH_WORDS[d])][slot]
        );
        result.push({ kind: "emojiToWord", target, options });
      });

    return shuffleIndices(result.length).map((i) => result[i]);
  }

  const current = questions[step];

  const promptText = (q: QuizQuestion): string => {
    switch (q.kind) {
      case "color":
        return `Sentuh warna ${q.target.en}! (${q.target.id})`;
      case "shape":
        return `Sentuh bentuk ${q.target.en}! (${q.target.id})`;
      case "wordToEmoji":
        return `Which one is "${q.target.en}"? (${q.target.id})`;
      case "emojiToWord":
        return `Apa bahasa Inggrisnya ${q.target.id}?`;
    }
  };

  const speakPrompt = () => {
    sounds.playPop();
    if (current.kind === "color" || current.kind === "shape") {
      speech.speak(promptText(current), 0.85, 1.15);
    } else if (current.kind === "wordToEmoji") {
      speech.speakEnglish(`Which one is ${current.target.en}?`, 0.8, 1.15);
    } else {
      speech.speak(promptText(current), 0.85, 1.15);
    }
  };

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = current.options[optIdx].en === current.target.en;
    trackAnswer("english", correct);
    if (correct) {
      setScore((s) => s + 1);
      sounds.playCorrectChime();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      speech.praiseEnglish();
    } else {
      sounds.playGentleBoing();
      speech.encourageEnglish();
    }

    window.setTimeout(() => {
      setSelected(null);
      if (step + 1 >= QUIZ_SIZE) {
        setIsSessionComplete(true);
        trackSessionComplete("english");
        onEarnStar();
      } else {
        setStep((s) => s + 1);
      }
    }, 1400);
  };

  const handlePlayAgain = () => {
    sounds.playPop();
    setQuestions(makeQuiz());
    setStep(0);
    setScore(0);
    setIsSessionComplete(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
      {/* Progress */}
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-cyan-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-cyan-600">
            <Target className="w-4 h-4" /> Soal {step + 1} dari {QUIZ_SIZE}
          </span>
          <span>Benar: {score} &bull; +1 ⭐ di akhir sesi</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / QUIZ_SIZE) * 100}%` }}
          />
        </div>
      </div>

      {/* Pertanyaan */}
      <div className="bg-white/95 rounded-3xl border-4 border-cyan-200 shadow-lg p-6 sm:p-8 text-center space-y-5">
        <p className="text-lg sm:text-2xl font-black text-slate-700">{promptText(current)}</p>
        <button
          onClick={speakPrompt}
          className="mx-auto px-4 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-black rounded-xl border-2 border-cyan-200 text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Lagi</span>
        </button>

        {/* Pilihan jawaban */}
        <div className="grid grid-cols-3 gap-3">
          {current.options.map((opt, optIdx) => {
            const isSelected = selected === optIdx;
            const showSuccess = selected !== null && opt.en === current.target.en;
            const showFailed = isSelected && opt.en !== current.target.en;
            const base =
              "aspect-square rounded-3xl border-4 flex items-center justify-center transition-all select-none";
            const state = showSuccess
              ? "bg-emerald-100 border-emerald-500 scale-105 shadow-lg"
              : showFailed
              ? "bg-rose-100 border-rose-400 opacity-70"
              : selected !== null
              ? "bg-slate-50 border-slate-200 opacity-60"
              : "bg-white hover:bg-cyan-50 border-cyan-200 shadow-md hover:scale-105 cursor-pointer active:scale-95";
            return (
              <button
                key={optIdx}
                onClick={() => handleSelect(optIdx)}
                className={`${base} ${state} ${
                  current.kind === "emojiToWord" ? "p-1" : ""
                }`}
              >
                {current.kind === "color" ? (
                  <span
                    className="w-4/5 h-4/5 rounded-full border-4 border-white shadow-inner"
                    style={{ backgroundColor: (opt as EnglishColor).hex }}
                  />
                ) : current.kind === "emojiToWord" ? (
                  <span className="text-lg sm:text-2xl font-black text-slate-800 leading-tight break-words">
                    {opt.en}
                  </span>
                ) : (
                  <span className="text-6xl sm:text-7xl">{(opt as EnglishWord | EnglishShape).emoji}</span>
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && current.options[selected].en !== current.target.en && (
          <p className="text-sm font-black text-emerald-600">
            Jawabannya: {current.target.en}
          </p>
        )}
      </div>

      <SessionCompleteModal
        isOpen={isSessionComplete}
        moduleName="Bahasa Inggris"
        starsEarned={1}
        onPlayAgain={handlePlayAgain}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
