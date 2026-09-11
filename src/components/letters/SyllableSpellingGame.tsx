import React, { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Volume2, Star, Shuffle, AlertCircle, CheckCircle2 } from "lucide-react";
import { SPELLING_WORDS, SpellingWord } from "../../data/spellingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface SyllableSpellingGameProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

interface BalloonChoice {
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

// Helper to pick N distinct random indices from array
const getRandomIndices = (total: number, count: number): number[] => {
  const indices = Array.from({ length: total }, (_, i) => i);
  const shuffled = indices.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, total));
};

export const SyllableSpellingGame: React.FC<SyllableSpellingGameProps> = ({ onEarnStar, onBackToHome }) => {
  // Session indices of 10 random words
  const [sessionWordIndices, setSessionWordIndices] = useState<number[]>(() =>
    getRandomIndices(SPELLING_WORDS.length, SESSION_SIZE)
  );
  // Current question index in this session (0 to 9)
  const [sessionStep, setSessionStep] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const currentWordIndex = sessionWordIndices[sessionStep] ?? 0;
  const currentWord: SpellingWord = SPELLING_WORDS[currentWordIndex] ?? SPELLING_WORDS[0];
  const parts = currentWord.parts;

  // Active syllable index (0 for 1st syllable, 1 for 2nd, etc.)
  const [activePartIndex, setActivePartIndex] = useState(0);
  // Active letter index inside current syllable
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  // Letters placed in each syllable part: array of arrays
  const [placedLetters, setPlacedLetters] = useState<string[][]>([]);

  // Feedback states
  const [correctionMsg, setCorrectionMsg] = useState<string | null>(null);
  const [wrongBalloonId, setWrongBalloonId] = useState<string | null>(null);
  const [partSuccessBanner, setPartSuccessBanner] = useState<string | null>(null);
  const [isWordCompleted, setIsWordCompleted] = useState(false);

  // Available balloon choices to display
  const [balloons, setBalloons] = useState<BalloonChoice[]>([]);

  // Flying letter overlay
  const [flyingLetter, setFlyingLetter] = useState<FlyingLetter | null>(null);
  const [flyingProgress, setFlyingProgress] = useState(0);

  // Refs for element positions
  const slotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const balloonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setupWord = useCallback((wordObj: SpellingWord) => {
    setActivePartIndex(0);
    setActiveLetterIndex(0);
    setPlacedLetters(wordObj.parts.map(() => []));
    setCorrectionMsg(null);
    setWrongBalloonId(null);
    setPartSuccessBanner(null);
    setIsWordCompleted(false);
    setFlyingLetter(null);
    setFlyingProgress(0);

    // Collect all unique letters from word
    const wordChars = Array.from(new Set(wordObj.word.split("")));
    // Add 2-3 random distractors from alphabet
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const distractors = alphabet
      .filter((c) => !wordChars.includes(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const allChoices = [...wordChars, ...distractors].sort(() => Math.random() - 0.5);
    const newBalloons: BalloonChoice[] = allChoices.map((char, index) => {
      const palette = BALLOON_COLOR_PALETTES[index % BALLOON_COLOR_PALETTES.length];
      return {
        id: `balloon-syllable-${char}-${index}-${Math.random()}`,
        char,
        color: palette,
        delaySec: (index * 0.22) % 1.4,
        bobDurationSec: 2.8 + (index % 3) * 0.4,
      };
    });

    setBalloons(newBalloons);

    const firstPart = wordObj.parts[0];
    const firstLetter = firstPart.letters[0];

    setTimeout(() => {
      speech.speak(
        `Ayo eja kata ${wordObj.word}. Suku kata pertama: ${firstPart.syllable}. Cari balon huruf ${firstLetter}!`,
        0.9,
        1.15
      );
    }, 350);
  }, []);

  // Setup round when word changes
  useEffect(() => {
    setupWord(currentWord);
  }, [currentWordIndex, setupWord]);

  // Start a fresh 10-question session
  const startNewSession = () => {
    const newIndices = getRandomIndices(SPELLING_WORDS.length, SESSION_SIZE);
    setSessionWordIndices(newIndices);
    setSessionStep(0);
    setIsSessionComplete(false);
  };

  const currentPart = parts[activePartIndex];
  const expectedLetter = currentPart ? currentPart.letters[activeLetterIndex] : "";

  // When child taps a balloon
  const handleSelectBalloon = (balloon: BalloonChoice) => {
    if (isWordCompleted || partSuccessBanner || flyingLetter) return;

    if (balloon.char === expectedLetter) {
      // CORRECT BALLOON!
      sounds.playBalloonPop();
      speech.speak(balloon.char, 1.1, 1.3);
      setCorrectionMsg(null);
      setWrongBalloonId(null);

      // Start pop animation
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, isPopping: true } : b))
      );

      const balloonEl = balloonRefs.current.get(balloon.id);
      const slotKey = `${activePartIndex}-${activeLetterIndex}`;
      const targetSlotEl = slotRefs.current.get(slotKey);

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
        };

        sounds.playWhoosh();
        setFlyingLetter(newFly);
        setFlyingProgress(0);

        requestAnimationFrame(() => {
          setFlyingProgress(1);
        });

        setTimeout(() => {
          sounds.playPop();

          // Add letter to placed letters of active syllable
          const newPlaced = placedLetters.map((arr, idx) =>
            idx === activePartIndex ? [...arr, balloon.char] : arr
          );
          setPlacedLetters(newPlaced);

          const nextLetterIdx = activeLetterIndex + 1;

          if (nextLetterIdx >= currentPart.letters.length) {
            // Current syllable completed! E.g. PEN is done!
            sounds.playCorrectChime();

            const spelledLetters = currentPart.letters.join("-");
            const successText = `${spelledLetters} dibaca ${currentPart.syllable}!`;
            setPartSuccessBanner(successText);

            const nextPartIdx = activePartIndex + 1;

            if (nextPartIdx >= parts.length) {
              // WHOLE WORD COMPLETED!
              setIsWordCompleted(true);
              sounds.playFanfare();
              onEarnStar();

              confetti({
                particleCount: 70,
                spread: 80,
                origin: { y: 0.6 },
              });

              const fullPhonics = parts
                .map((p) => `${p.letters.join("-")}: ${p.syllable}`)
                .join(", ");

              setTimeout(() => {
                speech.speak(
                  `Luar biasa! ${fullPhonics}... dibaca ${currentWord.word}! Pintar sekali!`,
                  0.85,
                  1.15
                );
              }, 450);
            } else {
              // Move to next syllable
              const nextPart = parts[nextPartIdx];
              setTimeout(() => {
                speech.speak(
                  `Hebat! ${currentPart.syllable}! Sekarang lanjut suku kata kedua: ${nextPart.syllable}! Cari balon huruf ${nextPart.letters[0]}!`,
                  0.9,
                  1.15
                );
              }, 300);

              setTimeout(() => {
                setActivePartIndex(nextPartIdx);
                setActiveLetterIndex(0);
                setPartSuccessBanner(null);
              }, 1800);
            }
          } else {
            // More letters left in current syllable
            setActiveLetterIndex(nextLetterIdx);
            const nextExp = currentPart.letters[nextLetterIdx];
            speech.speak(`Pintar! Lanjut cari balon huruf ${nextExp}!`, 1.0, 1.2);
          }

          // Un-pop balloon for reuse if needed, or recreate choices
          setBalloons((prev) =>
            prev.map((b) => (b.id === balloon.id ? { ...b, isPopping: false } : b))
          );
          setFlyingLetter(null);
          setFlyingProgress(0);
        }, 480);
      } else {
        // Fallback without coordinates
        const newPlaced = placedLetters.map((arr, idx) =>
          idx === activePartIndex ? [...arr, balloon.char] : arr
        );
        setPlacedLetters(newPlaced);
        const nextLetterIdx = activeLetterIndex + 1;
        if (nextLetterIdx >= currentPart.letters.length) {
          const nextPartIdx = activePartIndex + 1;
          if (nextPartIdx >= parts.length) {
            setIsWordCompleted(true);
          } else {
            setActivePartIndex(nextPartIdx);
            setActiveLetterIndex(0);
          }
        } else {
          setActiveLetterIndex(nextLetterIdx);
        }
      }
    } else {
      // WRONG BALLOON
      sounds.playGentleBoing();
      setWrongBalloonId(balloon.id);

      const stepName =
        activeLetterIndex === 0
          ? "pertama"
          : activeLetterIndex === 1
          ? "kedua"
          : activeLetterIndex === 2
          ? "ketiga"
          : `ke-${activeLetterIndex + 1}`;

      const msg = `Bukan balon '${balloon.char}'. Huruf ${stepName} untuk suku kata '${currentPart.syllable}' adalah '${expectedLetter}'. Yuk cari balon '${expectedLetter}'!`;
      setCorrectionMsg(msg);

      speech.speak(
        `Bukan ${balloon.char}. Hurufnya adalah ${expectedLetter}. Coba cari balon ${expectedLetter} ya!`,
        0.9,
        1.1
      );

      setTimeout(() => {
        setWrongBalloonId(null);
      }, 650);
    }
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    if (sessionStep + 1 >= SESSION_SIZE) {
      // Session finished!
      setIsSessionComplete(true);
    } else {
      setSessionStep((s) => s + 1);
    }
  };

  const handleResetWord = () => {
    sounds.playPop();
    setupWord(currentWord);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Session Progress Bar (10 Soal per Sesi) */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-md border-2 border-rose-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-rose-600">
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
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((sessionStep + (isWordCompleted ? 1 : 0)) / SESSION_SIZE) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-rose-200 text-center relative overflow-hidden">
        {/* Big Illustration */}
        <div
          onClick={() => {
            sounds.playPop();
            speech.speak(currentWord.word, 0.9, 1.15);
          }}
          className="text-7xl sm:text-9xl my-2 cursor-pointer transition-transform active:scale-95 animate-bounce-slow"
          title="Klik gambar untuk dengarkan kata!"
        >
          {currentWord.emoji}
        </div>

        {/* Word Display & Hint */}
        <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider mb-1">
          {currentWord.word}
        </h3>
        <p className="text-sm sm:text-base font-bold text-slate-500 mb-6">
          {currentWord.hint}
        </p>

        {/* Syllable Sections Layout */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-6">
          {parts.map((part, pIdx) => {
            const isCurrentPart = pIdx === activePartIndex && !isWordCompleted;
            const isCompletedPart = pIdx < activePartIndex || isWordCompleted;
            const placedInThisPart = placedLetters[pIdx] || [];

            return (
              <div
                key={pIdx}
                className={`p-3 sm:p-4 rounded-3xl transition-all border-3 flex flex-col items-center gap-2 ${
                  isCompletedPart
                    ? "bg-emerald-50/90 border-emerald-400 shadow-md scale-102"
                    : isCurrentPart
                    ? "bg-rose-50/90 border-rose-400 ring-4 ring-rose-200 shadow-lg"
                    : "bg-slate-50/80 border-slate-200 opacity-60"
                }`}
              >
                {/* Syllable Label */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-700">
                  <span>Suku Kata {pIdx + 1}:</span>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-white font-black ${
                      isCompletedPart ? "bg-emerald-600" : isCurrentPart ? "bg-rose-500" : "bg-slate-400"
                    }`}
                  >
                    {part.syllable}
                  </span>
                  {isCompletedPart && <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />}
                </div>

                {/* Letter Slots within this syllable */}
                <div className="flex items-center gap-2">
                  {part.letters.map((_, lIdx) => {
                    const isLetterPlaced = lIdx < placedInThisPart.length;
                    const isWaitingThisLetter = isCurrentPart && lIdx === activeLetterIndex;
                    const slotKey = `${pIdx}-${lIdx}`;

                    return (
                      <div
                        key={lIdx}
                        ref={(el) => {
                          if (el) slotRefs.current.set(slotKey, el);
                          else slotRefs.current.delete(slotKey);
                        }}
                        className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl transition-all border-3 ${
                          isLetterPlaced
                            ? "bg-emerald-500 text-white border-emerald-300 shadow-md scale-105"
                            : isWaitingThisLetter
                            ? "bg-white text-rose-500 border-rose-400 ring-2 ring-rose-300 animate-pulse shadow-inner"
                            : "bg-slate-100 text-transparent border-dashed border-slate-300"
                        }`}
                      >
                        {isLetterPlaced ? placedInThisPart[lIdx] : isWaitingThisLetter ? "?" : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-Time Correction Alert Banner */}
        {correctionMsg && !isWordCompleted && !partSuccessBanner && (
          <div className="mb-5 p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-2.5 text-rose-800 text-left animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs sm:text-sm font-bold leading-tight">
              {correctionMsg}
            </p>
          </div>
        )}

        {/* Intermediate Syllable Part Completed Banner */}
        {partSuccessBanner && !isWordCompleted && (
          <div className="mb-5 p-3.5 bg-emerald-100 border-2 border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-emerald-800 animate-bounce-slow font-black text-base sm:text-lg">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-200" />
            <span>Hebat! {partSuccessBanner}</span>
          </div>
        )}

        {/* Whole Word Completed Celebration Banner */}
        {isWordCompleted ? (
          <div className="space-y-4 animate-bounce-slow">
            <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg sm:text-xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>
                Hebat Sekali! Kamu Berhasil Mengeja {currentWord.word}!
              </span>
            </div>
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>{sessionStep + 1 >= SESSION_SIZE ? "Lihat Hasil Sesi 10 Soal 🎉" : "Lanjut Soal Berikutnya 🎈"}</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ) : (
          /* FLOATING BALLOON CHOICES */
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-600 mb-1">
              <span>🎈 Sentuh balon huruf untuk suku kata:</span>
              <span className="px-2.5 py-0.5 bg-rose-500 text-white rounded-full font-black text-sm">
                {currentPart.syllable}
              </span>
            </div>

            {/* Floating Balloons */}
            <div className="flex flex-wrap justify-center items-end gap-3 sm:gap-5 min-h-[9.5rem] pt-3 pb-2 px-2">
              {balloons.map((balloon) => {
                const isShaking = wrongBalloonId === balloon.id;
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
                      onClick={() => handleSelectBalloon(balloon)}
                      className={`relative w-14 h-18 sm:w-16 sm:h-21 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br ${
                        balloon.color.bg
                      } ${balloon.color.shadow} border-2 ${
                        balloon.color.border
                      } shadow-lg flex items-center justify-center font-black text-3xl sm:text-4xl text-white cursor-pointer transition-transform active:scale-90 hover:scale-105 ${
                        isShaking ? "animate-shake ring-4 ring-rose-400" : ""
                      } ${isPopping ? "animate-balloon-pop pointer-events-none" : ""}`}
                      title={`Balon ${balloon.char}`}
                    >
                      {/* Glossy 3D Highlight */}
                      <span
                        className={`absolute top-2 left-2.5 w-3 h-3.5 sm:w-3.5 sm:h-4 rounded-full ${balloon.color.highlight} -rotate-45 pointer-events-none`}
                      />

                      {/* Letter on Balloon */}
                      <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-10">
                        {balloon.char}
                      </span>

                      {/* Balloon Knot */}
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
          <div className="w-14 h-16 bg-gradient-to-br from-rose-400 via-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-2xl border-2 border-white ring-4 ring-rose-300">
            <span>{flyingLetter.char}</span>
            <span className="absolute -top-1 -right-1 text-xs">✨</span>
          </div>
        </div>
      )}

      {/* Auxiliary action buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            speech.speak(
              `Kata ${currentWord.word}. Suku katanya adalah: ${parts.map((p) => p.syllable).join(" dan ")}`,
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
        moduleName="Eja Suku Kata"
        starsEarned={SESSION_SIZE}
        onPlayAgain={startNewSession}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
