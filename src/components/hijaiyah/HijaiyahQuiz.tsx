import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Volume2, RotateCcw, Home } from "lucide-react";
import { HIJAIYAH_LIST, ARABIC_NUMBERS_LIST } from "../../data/hijaiyahData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface HijaiyahQuizProps {
  onEarnStar: () => void;
  onBackToHome: () => void;
}

type QuizType = "letters" | "numbers";

interface Question {
  promptText: string;
  speakText: string;
  correctAnswer: string;
  correctLabel: string;
  options: {
    display: string;
    label: string;
    isCorrect: boolean;
  }[];
  hintEmoji?: string;
}

const QUESTIONS_PER_SESSION = 10;

export const HijaiyahQuiz: React.FC<HijaiyahQuizProps> = ({ onEarnStar, onBackToHome }) => {
  const [quizType, setQuizType] = useState<QuizType>("letters");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Generate 10 randomized questions based on quizType
  const generateQuestions = (type: QuizType): Question[] => {
    const generated: Question[] = [];

    if (type === "letters") {
      // Shuffle hijaiyah list and pick 10
      const shuffled = [...HIJAIYAH_LIST].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, QUESTIONS_PER_SESSION);

      selected.forEach((item) => {
        // Pick 3 wrong options
        const otherOptions = HIJAIYAH_LIST.filter((h) => h.arabic !== item.arabic)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const allOptions = [
          { display: item.arabic, label: item.name, isCorrect: true },
          ...otherOptions.map((o) => ({ display: o.arabic, label: o.name, isCorrect: false })),
        ].sort(() => 0.5 - Math.random());

        generated.push({
          promptText: `Yang mana huruf "${item.name}"?`,
          speakText: `Pilihlah huruf ${item.name}!`,
          correctAnswer: item.arabic,
          correctLabel: item.name,
          options: allOptions,
          hintEmoji: item.example.emoji,
        });
      });
    } else {
      // Numbers quiz: pick 10 numbers (with repetition or full set 0-10)
      const shuffled = [...ARABIC_NUMBERS_LIST].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, QUESTIONS_PER_SESSION);

      selected.forEach((item) => {
        const otherOptions = ARABIC_NUMBERS_LIST.filter((n) => n.latin !== item.latin)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const allOptions = [
          { display: item.arabic, label: `${item.latin} (${item.arabicName})`, isCorrect: true },
          ...otherOptions.map((o) => ({
            display: o.arabic,
            label: `${o.latin} (${o.arabicName})`,
            isCorrect: false,
          })),
        ].sort(() => 0.5 - Math.random());

        generated.push({
          promptText: `Yang mana angka Arab "${item.arabicName}" (${item.latin})?`,
          speakText: `Manakah angka Arab ${item.arabicName}, yang artinya ${item.indonesianName}?`,
          correctAnswer: item.arabic,
          correctLabel: `${item.arabicName} (${item.latin})`,
          options: allOptions,
          hintEmoji: item.emoji,
        });
      });
    }

    return generated;
  };

  const startNewSession = (type: QuizType) => {
    setQuizType(type);
    const newQuestions = generateQuestions(type);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCompleted(false);

    if (newQuestions.length > 0) {
      setTimeout(() => {
        speech.speak(newQuestions[0].speakText, 0.9, 1.15);
      }, 300);
    }
  };

  useEffect(() => {
    startNewSession(quizType);
  }, []);

  const currentQ = questions[currentIndex];

  const handleSpeakQuestion = () => {
    if (currentQ) {
      sounds.playPop();
      speech.speak(currentQ.speakText, 0.9, 1.15);
    }
  };

  const handleSelectAnswer = (option: { display: string; label: string; isCorrect: boolean }) => {
    if (isAnswered) return;

    setSelectedOption(option.display);
    setIsAnswered(true);

    if (option.isCorrect) {
      sounds.playSuccess();
      setScore((s) => s + 1);
      onEarnStar();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      speech.praise();
    } else {
      sounds.playError();
      speech.encourage();
    }

    // Move to next question after short delay
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        const nextQ = questions[currentIndex + 1];
        if (nextQ) {
          speech.speak(nextQ.speakText, 0.9, 1.15);
        }
      } else {
        setIsCompleted(true);
        sounds.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
        speech.speak(
          `Hore! Kamu berhasil menyelesaikan kuis dan mendapat bintang! Hebat sekali!`,
          0.9,
          1.15
        );
      }
    }, 1600);
  };

  return (
    <div className="space-y-6">
      {/* Quiz Type Selector Tabs */}
      <div className="flex justify-center gap-2 max-w-md mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-emerald-200 shadow-sm">
        <button
          onClick={() => startNewSession("letters")}
          className={`flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            quizType === "letters"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          🌙 Tebak Huruf
        </button>
        <button
          onClick={() => startNewSession("numbers")}
          className={`flex-1 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            quizType === "numbers"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-emerald-900 hover:bg-emerald-50"
          }`}
        >
          🔢 Tebak Angka
        </button>
      </div>

      {/* Main Quiz Area or Session Completed Card */}
      {!isCompleted && currentQ ? (
        <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
          {/* Header Progress */}
          <div className="w-full flex items-center justify-between mb-4 text-xs sm:text-sm font-bold text-emerald-900">
            <span className="bg-emerald-100 px-3 py-1 rounded-full">
              Soal {currentIndex + 1} / {QUESTIONS_PER_SESSION}
            </span>
            <span className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full flex items-center gap-1">
              <span>⭐ {score} Bintang</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-emerald-100 rounded-full h-2.5 mb-6 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUESTIONS_PER_SESSION) * 100}%` }}
            />
          </div>

          {/* Prompt / Question */}
          <div className="flex flex-col items-center gap-3">
            {currentQ.hintEmoji && (
              <span className="text-4xl sm:text-5xl animate-bounce select-none">
                {currentQ.hintEmoji}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              {currentQ.promptText}
            </h3>
            <button
              onClick={handleSpeakQuestion}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm rounded-full border border-emerald-200 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span>Dengarkan Ulang</span>
            </button>
          </div>

          {/* 4 Big Options */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-6" dir="rtl">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt.display;
              const showSuccess = isAnswered && opt.isCorrect;
              const showFailed = isAnswered && isSelected && !opt.isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={isAnswered}
                  className={`h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer border-3 select-none ${
                    showSuccess
                      ? "bg-emerald-500 text-white border-white scale-105 shadow-xl ring-4 ring-emerald-300"
                      : showFailed
                      ? "bg-rose-500 text-white border-white scale-95 shadow-md"
                      : "bg-gradient-to-b from-white to-emerald-50 hover:to-emerald-100 text-slate-800 border-emerald-200 hover:border-emerald-400 hover:shadow-lg active:scale-95"
                  }`}
                >
                  <span
                    className="text-4xl sm:text-5xl font-black leading-none"
                    style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                  >
                    {opt.display}
                  </span>
                  {isAnswered && (
                    <span
                      className={`text-[10px] sm:text-xs font-bold mt-1 ${
                        showSuccess || showFailed ? "text-white" : "text-slate-500"
                      }`}
                      dir="ltr"
                    >
                      {opt.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Completion Card */
        <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-300 max-w-md mx-auto text-center space-y-5 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto shadow-xl border-4 border-white animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              Sesi Kuis Selesai!
            </h3>
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              Hebat sekali! Kamu berhasil menjawab dengan benar dan mengumpulkan bintang!
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-dashed border-emerald-300 inline-block px-8">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Skor Kamu
            </span>
            <span className="text-4xl sm:text-5xl font-black text-emerald-700">
              {score} / {QUESTIONS_PER_SESSION}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => startNewSession(quizType)}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Lagi</span>
            </button>
            <button
              onClick={onBackToHome}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl shadow flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
            >
              <Home className="w-4 h-4" />
              <span>Menu Utama</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
