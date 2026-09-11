import React, { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Volume2, Star, Shuffle, AlertCircle } from "lucide-react";
import { SPELLING_WORDS, SpellingWord } from "../../data/spellingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface BalloonSpellingGameProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

interface BalloonItem {
  id: string;
  char: string;
  color: {
    bg: string;
    shadow: string;
    border: string;
    highlight: string;
    stringColor: string;
  };
  delaySec: number;
  bobDurationSec: number;
  isPopping?: boolean;
}

interface FlyingLetter {
  id: string;
  char: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  targetSlotIndex: number;
}

const SESSION_SIZE = 10;

const BALLOON_COLOR_PALETTES = [
  {
    bg: "from-rose-400 via-rose-500 to-red-500",
    shadow: "shadow-rose-300",
    border: "border-rose-300",
    highlight: "bg-white/40",
    stringColor: "text-rose-400",
  },
  {
    bg: "from-sky-400 via-sky-500 to-blue-500",
    shadow: "shadow-sky-300",
    border: "border-sky-300",
    highlight: "bg-white/40",
    stringColor: "text-sky-400",
  },
  {
    bg: "from-amber-300 via-amber-400 to-yellow-500",
    shadow: "shadow-amber-300",
    border: "border-amber-200",
    highlight: "bg-white/50",
    stringColor: "text-amber-400",
  },
  {
    bg: "from-emerald-400 via-emerald-500 to-teal-500",
    shadow: "shadow-emerald-300",
    border: "border-emerald-300",
    highlight: "bg-white/40",
    stringColor: "text-emerald-400",
  },
  {
    bg: "from-purple-400 via-purple-500 to-indigo-500",
    shadow: "shadow-purple-300",
    border: "border-purple-300",
    highlight: "bg-white/40",
    stringColor: "text-purple-400",
  },
  {
    bg: "from-pink-400 via-pink-500 to-rose-400",
    shadow: "shadow-pink-300",
    border: "border-pink-300",
    highlight: "bg-white/40",
    stringColor: "text-pink-400",
  },
  {
    bg: "from-orange-400 via-orange-500 to-amber-500",
    shadow: "shadow-orange-300",
    border: "border-orange-300",
    highlight: "bg-white/40",
    stringColor: "text-orange-400",
  },
];

const getRandomIndices = (total: number, count: number): number[] => {
  const indices = Array.from({ length: total }, (_, i) => i);
  const shuffled = indices.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, total));
};

export const BalloonSpellingGame: React.FC<BalloonSpellingGameProps> = ({
  onEarnStar,
  onBackToHome,
}) => {
  // Session random indices (10 words)
  const [sessionWordIndices, setSessionWordIndices] = useState<number[]>(() =>
    getRandomIndices(SPELLING_WORDS.length, SESSION_SIZE)
  );
  const [sessionStep, setSessionStep] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const currentWordIndex = sessionWordIndices[sessionStep] ?? 0;
  const currentWord: SpellingWord = SPELLING_WORDS[currentWordIndex] ?? SPELLING_WORDS[0];

  // Letters of the word
  const targetChars = currentWord.word.split("");

  // Placed letters in slots (array matching targetChars length)
  const [placedLetters, setPlacedLetters] = useState<(string | null)[]>([]);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wrongChar, setWrongChar] = useState<string | null>(null);
  const [correctionMsg, setCorrectionMsg] = useState<string | null>(null);

  // Active flying letter animation overlay
  const [flyingLetter, setFlyingLetter] = useState<FlyingLetter | null>(null);
  const [flyingProgress, setFlyingProgress] = useState(0); // 0 to 1

  // Slot element refs for calculating target positions
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Balloon element refs
  const balloonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Set up word round
  const setupWord = useCallback((wordObj: SpellingWord) => {
    setIsCompleted(false);
    setWrongChar(null);
    setCorrectionMsg(null);
    setFlyingLetter(null);
    setFlyingProgress(0);

    const chars = wordObj.word.split("");
    setPlacedLetters(new Array(chars.length).fill(null));

    // Scramble balloon letters of word + distractors
    const wordLetters = [...chars];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const distractors = alphabet
      .filter((c) => !wordLetters.includes(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.max(2, 6 - wordLetters.length));

    const allBalloonsChars = [...wordLetters, ...distractors].sort(() => Math.random() - 0.5);

    const newBalloons: BalloonItem[] = allBalloonsChars.map((char, index) => {
      const palette = BALLOON_COLOR_PALETTES[index % BALLOON_COLOR_PALETTES.length];
      return {
        id: `balloon-${char}-${index}-${Math.random()}`,
        char,
        color: palette,
        delaySec: (index * 0.25) % 1.5,
        bobDurationSec: 2.8 + (index % 3) * 0.4,
      };
    });

    setBalloons(newBalloons);

    setTimeout(() => {
      speech.speak(
        `Ayo pecahkan balon huruf untuk menyusun kata ${wordObj.word}! Mulai dari huruf ${chars[0]}!`,
        0.9,
        1.15
      );
    }, 400);
  }, []);

  useEffect(() => {
    setupWord(currentWord);
  }, [currentWordIndex, setupWord]);

  // Determine current needed letter
  const currentSlotIndex = placedLetters.findIndex((l) => l === null);
  const expectedChar = currentSlotIndex !== -1 ? targetChars[currentSlotIndex] : "";

  // Handle balloon click / touch
  const handleBalloonClick = (balloon: BalloonItem) => {
    if (isCompleted || flyingLetter) return;

    if (balloon.char === expectedChar) {
      // CORRECT BALLOON!
      sounds.playBalloonPop();
      speech.speak(balloon.char, 1.1, 1.3);
      setWrongChar(null);
      setCorrectionMsg(null);

      // Mark balloon popping
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, isPopping: true } : b))
      );

      // Find start & target bounding rect
      const balloonEl = balloonRefs.current.get(balloon.id);
      const targetSlotEl = slotRefs.current[currentSlotIndex];

      if (balloonEl && targetSlotEl) {
        const bRect = balloonEl.getBoundingClientRect();
        const tRect = targetSlotEl.getBoundingClientRect();

        const startX = bRect.left + bRect.width / 2;
        const startY = bRect.top + bRect.height / 2;
        const targetX = tRect.left + tRect.width / 2;
        const targetY = tRect.top + tRect.height / 2;

        const newFly: FlyingLetter = {
          id: `fly-${balloon.id}`,
          char: balloon.char,
          startX,
          startY,
          targetX,
          targetY,
          targetSlotIndex: currentSlotIndex,
        };

        sounds.playWhoosh();
        setFlyingLetter(newFly);
        setFlyingProgress(0);

        // Animate flying letter
        requestAnimationFrame(() => {
          setFlyingProgress(1);
        });

        // After fly animation finishes (approx 450ms)
        setTimeout(() => {
          sounds.playPop();
          setPlacedLetters((prev) => {
            const next = [...prev];
            next[currentSlotIndex] = balloon.char;

            // Check if entire word is finished
            const nextEmpty = next.findIndex((l) => l === null);
            if (nextEmpty === -1) {
              // ALL LETTERS PLACED!
              setIsCompleted(true);
              sounds.playCorrectChime();
              onEarnStar();
              confetti({
                particleCount: 70,
                spread: 80,
                origin: { y: 0.6 },
              });

              setTimeout(() => {
                speech.speak(
                  `Hebat sekali! Balon huruf lengkap, dibaca ${currentWord.word}! Pintar!`,
                  0.85,
                  1.15
                );
              }, 400);
            } else {
              // Next letter prompt
              const nextChar = targetChars[nextEmpty];
              speech.speak(`Bagus! Sekarang cari huruf ${nextChar}!`, 1.0, 1.2);
            }
            return next;
          });

          // Remove popped balloon from list
          setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
          setFlyingLetter(null);
          setFlyingProgress(0);
        }, 500);
      } else {
        // Fallback without coordinates
        setPlacedLetters((prev) => {
          const next = [...prev];
          next[currentSlotIndex] = balloon.char;
          return next;
        });
        setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
      }
    } else {
      // WRONG BALLOON
      sounds.playGentleBoing();
      setWrongChar(balloon.id);

      const msg = `Balon '${balloon.char}' belum pas. Cari balon huruf '${expectedChar}' ya!`;
      setCorrectionMsg(msg);
      speech.speak(
        `Bukan huruf ${balloon.char}. Ayo cari balon huruf ${expectedChar}!`,
        0.9,
        1.1
      );

      setTimeout(() => {
        setWrongChar(null);
      }, 650);
    }
  };

  const handleNextWord = () => {
    sounds.playPop();
    if (sessionStep + 1 >= SESSION_SIZE) {
      setIsSessionComplete(true);
    } else {
      setSessionStep((s) => s + 1);
    }
  };

  const handleResetWord = () => {
    sounds.playPop();
    setupWord(currentWord);
  };

  const startNewSession = () => {
    const newIndices = getRandomIndices(SPELLING_WORDS.length, SESSION_SIZE);
    setSessionWordIndices(newIndices);
    setSessionStep(0);
    setIsSessionComplete(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn relative">
      {/* Session Progress Bar (10 Soal per Sesi) */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-md border-2 border-pink-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-pink-600">
            <Shuffle className="w-4 h-4" /> Soal {sessionStep + 1} dari {SESSION_SIZE}
          </span>
          <span className="text-slate-400 font-bold">
            Bank: {SPELLING_WORDS.length} Kata
          </span>
          <span className="text-amber-500 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> +1 Bintang
          </span>
        </div>

        {/* Visual Progress Track */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((sessionStep + (isCompleted ? 1 : 0)) / SESSION_SIZE) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="bg-gradient-to-b from-sky-100/90 via-pink-50/80 to-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-pink-200 text-center relative overflow-hidden">
        {/* Floating clouds background decoration */}
        <div className="absolute top-2 left-4 text-3xl opacity-40 select-none pointer-events-none animate-float">
          ☁️
        </div>
        <div
          className="absolute top-8 right-6 text-2xl opacity-40 select-none pointer-events-none animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          ☁️
        </div>

        {/* Big Illustration */}
        <div
          onClick={() => {
            sounds.playPop();
            speech.speak(currentWord.word, 0.9, 1.15);
          }}
          className="text-7xl sm:text-8xl my-1 cursor-pointer transition-transform active:scale-95 animate-bounce-slow inline-block"
          title="Klik gambar untuk dengarkan kata!"
        >
          {currentWord.emoji}
        </div>

        {/* Word Display & Hint */}
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-wider mb-0.5">
          {currentWord.word}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-slate-500 mb-5">
          {currentWord.hint}
        </p>

        {/* TARGET LETTER BOXES (Box Huruf Tempat Balon Terbang) */}
        <div className="mb-6 p-3 sm:p-4 bg-white/90 rounded-3xl shadow-inner border-2 border-indigo-100">
          <div className="text-xs sm:text-sm font-black text-indigo-700 mb-2.5 flex items-center justify-center gap-1.5">
            <span>Kotak Huruf Kata:</span>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
              {targetChars.length} Huruf
            </span>
          </div>

          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {targetChars.map((_targetChar, idx) => {
              const placed = placedLetters[idx];
              const isCurrentTarget = idx === currentSlotIndex && !isCompleted;

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    slotRefs.current[idx] = el;
                  }}
                  className={`w-12 h-16 sm:w-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-black text-2xl sm:text-4xl transition-all border-3 relative ${
                    placed
                      ? "bg-gradient-to-b from-emerald-400 to-teal-500 text-white border-emerald-300 shadow-md scale-105"
                      : isCurrentTarget
                      ? "bg-amber-50 text-amber-500 border-amber-400 ring-4 ring-amber-200 animate-pulse"
                      : "bg-slate-100 text-slate-300 border-dashed border-slate-300"
                  }`}
                >
                  {placed ? (
                    <>
                      <span>{placed}</span>
                      <span className="text-[9px] uppercase tracking-widest text-emerald-100 font-bold -mt-1">
                        ok!
                      </span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-base font-bold text-slate-400">
                      {isCurrentTarget ? "?" : ""}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Correction Alert */}
        {correctionMsg && !isCompleted && (
          <div className="mb-4 p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center justify-center gap-2 text-rose-800 text-xs sm:text-sm font-bold animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{correctionMsg}</span>
          </div>
        )}

        {/* Whole Word Completed Celebration Banner */}
        {isCompleted ? (
          <div className="space-y-4 animate-bounce-slow my-4">
            <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg sm:text-xl flex items-center justify-center gap-2 shadow-md">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>
                Hebat Sekali! Semua Balon Huruf Berhasil Dikumpulkan: {currentWord.word}!
              </span>
            </div>
            <button
              onClick={handleNextWord}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>
                {sessionStep + 1 >= SESSION_SIZE
                  ? "Lihat Hasil Sesi 10 Soal 🎉"
                  : "Lanjut Kata Berikutnya 🎈"}
              </span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ) : (
          /* FLOATING BALLOONS CLOUD (Balon-Balon Melayang) */
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-600 mb-1">
              <span>🎈 Sentuh balon huruf yang benar:</span>
              <span className="px-2.5 py-0.5 bg-rose-500 text-white rounded-full font-black text-sm">
                {expectedChar}
              </span>
            </div>

            {/* Balloon Grid */}
            <div className="flex flex-wrap justify-center items-end gap-3 sm:gap-5 min-h-[9.5rem] pt-3 pb-2 px-2">
              {balloons.map((balloon) => {
                const isShaking = wrongChar === balloon.id;
                const isPopping = balloon.isPopping;

                return (
                  <div
                    key={balloon.id}
                    className="flex flex-col items-center select-none"
                    style={{
                      animation: isPopping ? "none" : `balloon-bob ${balloon.bobDurationSec}s ease-in-out infinite`,
                      animationDelay: `${balloon.delaySec}s`,
                    }}
                  >
                    <button
                      ref={(el) => {
                        if (el) balloonRefs.current.set(balloon.id, el);
                        else balloonRefs.current.delete(balloon.id);
                      }}
                      onClick={() => handleBalloonClick(balloon)}
                      className={`relative w-14 h-18 sm:w-16 sm:h-21 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br ${
                        balloon.color.bg
                      } ${balloon.color.shadow} border-2 ${
                        balloon.color.border
                      } shadow-lg flex items-center justify-center font-black text-3xl sm:text-4xl text-white cursor-pointer transition-transform active:scale-90 hover:scale-105 ${
                        isShaking ? "animate-shake ring-4 ring-rose-400" : ""
                      } ${isPopping ? "animate-balloon-pop pointer-events-none" : ""}`}
                      title={`Balon ${balloon.char}`}
                    >
                      {/* Glossy 3D Highlight Reflection */}
                      <span
                        className={`absolute top-2 left-2.5 w-3 h-3.5 sm:w-3.5 sm:h-4 rounded-full ${balloon.color.highlight} -rotate-45 pointer-events-none`}
                      />

                      {/* Letter on Balloon */}
                      <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-10">
                        {balloon.char}
                      </span>

                      {/* Balloon Knot at bottom */}
                      <span
                        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-2 sm:w-3.5 sm:h-2.5 bg-inherit rounded-b-md`}
                      />
                    </button>

                    {/* Balloon String / Ribbon */}
                    <svg
                      className={`w-3 h-6 sm:h-7 ${balloon.color.stringColor} stroke-current fill-none stroke-[2] pointer-events-none -mt-0.5 ${
                        isPopping ? "opacity-0" : "opacity-80"
                      }`}
                      viewBox="0 0 12 28"
                    >
                      <path d="M 6 0 Q 2 7, 6 14 T 6 28" />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* FLYING LETTER OVERLAY ANIMATION */}
      {flyingLetter && (
        <div
          className="fixed pointer-events-none z-50 transition-all ease-out"
          style={{
            top: 0,
            left: 0,
            width: "56px",
            height: "64px",
            transitionDuration: "480ms",
            transform: `translate(${
              flyingProgress === 0
                ? `${flyingLetter.startX - 28}px, ${flyingLetter.startY - 32}px`
                : `${flyingLetter.targetX - 28}px, ${flyingLetter.targetY - 32}px`
            }) scale(${flyingProgress === 0 ? 1.25 : 1.0}) rotate(${
              flyingProgress === 0 ? "0deg" : "360deg"
            })`,
          }}
        >
          {/* Flying Balloon Shard / Trail */}
          <div className="w-14 h-16 bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl border-2 border-white ring-4 ring-pink-300">
            <span>{flyingLetter.char}</span>
            <span className="absolute -top-1 -right-1 text-xs">✨</span>
          </div>
        </div>
      )}

      {/* Auxiliary action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            speech.speak(
              `Kata ${currentWord.word}. Huruf yang dicari adalah ${expectedChar}`,
              0.85,
              1.15
            );
          }}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <Volume2 className="w-4 h-4 text-pink-500" />
          <span>Dengarkan Kata</span>
        </button>
        <button
          onClick={startNewSession}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
          title="Mulai sesi 10 soal baru"
        >
          <Shuffle className="w-4 h-4 text-purple-500" />
          <span>Mulai 10 Soal Baru</span>
        </button>
        <button
          onClick={handleResetWord}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span>Ulangi Kata</span>
        </button>
      </div>

      {/* Session Complete Modal */}
      <SessionCompleteModal
        isOpen={isSessionComplete}
        moduleName="Balon Huruf"
        starsEarned={SESSION_SIZE}
        onPlayAgain={startNewSession}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};