import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  BookOpen,
  MessageSquareText,
  Target,
} from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { READING_WORDS, READING_SENTENCES } from "../../data/readingData";
import { trackAnswer, trackSessionComplete } from "../../utils/statsTracker";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface BelajarMembacaProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

type ReadingTab = "words" | "sentences" | "quiz";

const QUIZ_SIZE = 10;

function shuffleIndices(total: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export const BelajarMembaca: React.FC<BelajarMembacaProps> = ({ onEarnStar, onBackToHome }) => {
  const [tab, setTab] = useState<ReadingTab>("words");

  return (
    <div className="space-y-4">
      {/* Sub Tab */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-violet-200 shadow-sm">
        {(
          [
            { id: "words" as ReadingTab, label: "📖 Baca Kata" },
            { id: "sentences" as ReadingTab, label: "💬 Baca Kalimat" },
            { id: "quiz" as ReadingTab, label: "🎯 Tebak Gambar" },
          ]
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => {
              sounds.playPop();
              setTab(t.id);
            }}
            className={`flex-1 min-w-[6.5rem] py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
              tab === t.id
                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md scale-102"
                : "text-slate-600 hover:bg-violet-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "words" && <WordReader />}
      {tab === "sentences" && <SentenceReader />}
      {tab === "quiz" && <PictureQuiz onEarnStar={onEarnStar} onBackToHome={onBackToHome} />}
    </div>
  );
};

// ==================== TAB 1: BACA KATA ====================
const WordReader: React.FC = () => {
  const [order] = useState<number[]>(() => shuffleIndices(READING_WORDS.length));
  const [step, setStep] = useState(0);
  const [readCount, setReadCount] = useState<Set<number>>(new Set());

  const item = READING_WORDS[order[step]];

  const handleNext = () => {
    sounds.playPop();
    setStep((s) => (s + 1) % order.length);
  };

  const handlePrev = () => {
    sounds.playPop();
    setStep((s) => (s - 1 + order.length) % order.length);
  };

  const handleSpeakWord = () => {
    sounds.playPop();
    speech.speak(`${item.syllables.join("... ")}. ${item.word}!`, 0.85, 1.15);
    if (!readCount.has(step)) {
      const next = new Set(readCount);
      next.add(step);
      setReadCount(next);
      if (next.size % 5 === 0) {
        sounds.playFanfare();
        speech.speak(`Wah, kamu sudah membaca ${next.size} kata! Hebat!`, 0.9, 1.15);
      }
    }
  };

  const handleSpeakSyllable = (syl: string) => {
    sounds.playPop();
    speech.speak(syl, 0.75, 1.2);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
      {/* Progress */}
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-violet-200 flex items-center justify-between text-xs sm:text-sm font-black text-slate-600">
        <span className="flex items-center gap-1.5 text-violet-600">
          <BookOpen className="w-4 h-4" /> Kata {step + 1} dari {order.length}
        </span>
        <span>Sudah dibaca: {readCount.size} kata</span>
      </div>

      {/* Kartu Kata */}
      <div className="bg-white/95 rounded-3xl border-4 border-violet-200 shadow-lg p-6 sm:p-8 text-center space-y-4">
        <div className="text-7xl sm:text-8xl animate-bounce-slow select-none">{item.emoji}</div>

        {/* Potongan suku kata */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {item.syllables.map((syl, i) => (
            <button
              key={i}
              onClick={() => handleSpeakSyllable(syl)}
              className="px-4 sm:px-6 py-3 bg-gradient-to-br from-violet-100 to-purple-100 hover:from-violet-200 border-2 border-violet-300 rounded-2xl font-black text-3xl sm:text-4xl text-violet-700 shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Sentuh untuk dengar suku kata"
            >
              {syl}
            </button>
          ))}
        </div>

        {/* Kata utuh */}
        <p className="text-4xl sm:text-5xl font-black tracking-wide text-slate-800">
          {item.word}
        </p>

        <button
          onClick={handleSpeakWord}
          className="mx-auto px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-black rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Bunyinya</span>
        </button>

        <p className="text-xs font-bold text-slate-400">
          Sentuh potongan kata untuk dengar per suku kata!
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
          className="px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-black rounded-2xl shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Kata Berikutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ==================== TAB 2: BACA KALIMAT ====================
const SentenceReader: React.FC = () => {
  const [order] = useState<number[]>(() => shuffleIndices(READING_SENTENCES.length));
  const [step, setStep] = useState(0);

  const item = READING_SENTENCES[order[step]];
  const words = item.text.replace(".", "").split(" ");

  const handleSpeakSentence = () => {
    sounds.playPop();
    speech.speak(item.text, 0.8, 1.1);
  };

  const handleSpeakWord = (w: string) => {
    sounds.playPop();
    speech.speak(w, 0.75, 1.2);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 animate-fadeIn">
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-violet-200 flex items-center justify-between text-xs sm:text-sm font-black text-slate-600">
        <span className="flex items-center gap-1.5 text-violet-600">
          <MessageSquareText className="w-4 h-4" /> Kalimat {step + 1} dari {order.length}
        </span>
        <span>Sentuh kata untuk dengar!</span>
      </div>

      <div className="bg-white/95 rounded-3xl border-4 border-violet-200 shadow-lg p-6 sm:p-8 text-center space-y-5">
        <div className="text-7xl select-none">{item.emoji}</div>

        {/* Kata per kata, bisa disentuh */}
        <div className="flex flex-wrap justify-center gap-2">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => handleSpeakWord(w)}
              className="px-3.5 py-2 bg-violet-50 hover:bg-violet-100 border-2 border-violet-200 rounded-xl font-black text-2xl sm:text-3xl text-slate-800 cursor-pointer active:scale-95 transition-all"
            >
              {w}
            </button>
          ))}
        </div>

        <p className="text-2xl sm:text-3xl font-black text-violet-700">{item.text}</p>

        <button
          onClick={handleSpeakSentence}
          className="mx-auto px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-black rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Kalimatnya</span>
        </button>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            setStep((s) => (s - 1 + order.length) % order.length);
          }}
          className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-2xl border-2 border-slate-200 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Mundur</span>
        </button>
        <button
          onClick={() => {
            sounds.playPop();
            setStep((s) => (s + 1) % order.length);
          }}
          className="px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-black rounded-2xl shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Kalimat Berikutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ==================== TAB 3: TEBAK GAMBAR (KUIS) ====================
interface QuizQuestion {
  wordIndex: number;
  optionIndices: number[];
}

const PictureQuiz: React.FC<{ onEarnStar: () => void; onBackToHome?: () => void }> = ({
  onEarnStar,
  onBackToHome,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => makeQuiz());
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  function makeQuiz(): QuizQuestion[] {
    return shuffleIndices(READING_WORDS.length)
      .slice(0, QUIZ_SIZE)
      .map((wordIndex) => {
        const distractors = shuffleIndices(READING_WORDS.length)
          .filter((i) => i !== wordIndex)
          .slice(0, 2);
        const options = shuffleIndices(3).map(
          (slot) => [wordIndex, ...distractors][slot]
        );
        return { wordIndex, optionIndices: options };
      });
  }

  const current = questions[step];
  const target = READING_WORDS[current.wordIndex];

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = optIdx === current.wordIndex;
    trackAnswer("reading", correct);
    if (correct) {
      setScore((s) => s + 1);
      sounds.playCorrectChime();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      speech.speak(`Benar! Itu ${target.word}!`, 0.9, 1.15);
    } else {
      sounds.playGentleBoing();
      speech.encourage();
    }

    window.setTimeout(() => {
      setSelected(null);
      if (step + 1 >= QUIZ_SIZE) {
        setIsSessionComplete(true);
        trackSessionComplete("reading");
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
      <div className="bg-white/90 rounded-2xl p-3 shadow-md border-2 border-violet-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-violet-600">
            <Target className="w-4 h-4" /> Soal {step + 1} dari {QUIZ_SIZE}
          </span>
          <span>Benar: {score} &bull; +1 ⭐ di akhir sesi</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / QUIZ_SIZE) * 100}%` }}
          />
        </div>
      </div>

      {/* Pertanyaan */}
      <div className="bg-white/95 rounded-3xl border-4 border-violet-200 shadow-lg p-6 sm:p-8 text-center space-y-5">
        <p className="text-sm font-bold text-slate-500">Kata apa ini? Pilih gambarnya!</p>
        <p className="text-5xl sm:text-6xl font-black tracking-wide text-slate-800 uppercase">
          {target.word}
        </p>
        <button
          onClick={() => {
            sounds.playPop();
            speech.speak(target.word, 0.75, 1.2);
          }}
          className="mx-auto px-4 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 font-black rounded-xl border-2 border-violet-200 text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Kata</span>
        </button>

        {/* Pilihan gambar */}
        <div className="grid grid-cols-3 gap-3">
          {current.optionIndices.map((optIdx) => {
            const opt = READING_WORDS[optIdx];
            const isSelected = selected === optIdx;
            const showSuccess = selected !== null && optIdx === current.wordIndex;
            const showFailed = isSelected && optIdx !== current.wordIndex;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelect(optIdx)}
                className={`aspect-square rounded-3xl border-4 flex items-center justify-center text-6xl sm:text-7xl transition-all select-none ${
                  showSuccess
                    ? "bg-emerald-100 border-emerald-500 scale-105 shadow-lg"
                    : showFailed
                    ? "bg-rose-100 border-rose-400 opacity-70"
                    : selected !== null
                    ? "bg-slate-50 border-slate-200 opacity-60"
                    : "bg-white hover:bg-violet-50 border-violet-200 shadow-md hover:scale-105 cursor-pointer active:scale-95"
                }`}
              >
                {opt.emoji}
              </button>
            );
          })}
        </div>

        {selected !== null && selected !== current.wordIndex && (
          <p className="text-sm font-black text-emerald-600">
            Jawabannya: {target.emoji} {target.word}
          </p>
        )}
      </div>

      <SessionCompleteModal
        isOpen={isSessionComplete}
        moduleName="Belajar Membaca"
        starsEarned={1}
        onPlayAgain={handlePlayAgain}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
