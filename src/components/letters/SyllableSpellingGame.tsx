import React, { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Volume2, Star, Shuffle, AlertCircle } from "lucide-react";
import { SPELLING_WORDS, SpellingWord } from "../../data/spellingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface SyllableSpellingGameProps {
  onEarnStar: () => void;
}

interface SyllableOption {
  id: string;
  syllable: string;
}

export const SyllableSpellingGame: React.FC<SyllableSpellingGameProps> = ({ onEarnStar }) => {
  // Shuffled deck of word indices
  const initialDeck = useMemo(() => {
    return Array.from({ length: SPELLING_WORDS.length }, (_, i) => i)
      .sort(() => Math.random() - 0.5);
  }, []);

  const [deck, setDeck] = useState<number[]>(initialDeck);
  const [deckIndex, setDeckIndex] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);

  const currentWordIndex = deck[deckIndex] ?? 0;
  const currentWord: SpellingWord = SPELLING_WORDS[currentWordIndex] ?? SPELLING_WORDS[0];

  // Syllables array, e.g. ["A", "YA", "M"]
  const targetSyllables = currentWord.phonicSyllables || currentWord.syllables;

  // Game state: current step index (0, 1, 2...)
  const [currentStep, setCurrentStep] = useState(0);
  // Options presented to user (scrambled)
  const [availableOptions, setAvailableOptions] = useState<SyllableOption[]>([]);
  // Placed syllables in order
  const [placedSyllables, setPlacedSyllables] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [correctionMsg, setCorrectionMsg] = useState<string | null>(null);
  const [wrongTileId, setWrongTileId] = useState<string | null>(null);

  useEffect(() => {
    setupRound(currentWord);
  }, [currentWordIndex]);

  const setupRound = (wordObj: SpellingWord) => {
    setIsCompleted(false);
    setCurrentStep(0);
    setPlacedSyllables([]);
    setCorrectionMsg(null);
    setWrongTileId(null);

    const syls = wordObj.phonicSyllables || wordObj.syllables;

    // Create unique options
    const rawOptions: SyllableOption[] = syls.map((s, idx) => ({
      id: `${s}-${idx}-${Math.random()}`,
      syllable: s,
    }));

    // Scramble options
    let scrambled = [...rawOptions].sort(() => Math.random() - 0.5);
    // Avoid accidentally already in correct sequence if length > 1
    if (syls.length > 1 && scrambled.map((o) => o.syllable).join("") === syls.join("")) {
      scrambled = scrambled.reverse();
    }

    setAvailableOptions(scrambled);

    // Speak initial intro
    setTimeout(() => {
      speech.speak(`Ayo eja suku kata untuk kata ${wordObj.word}!`, 0.9, 1.15);
    }, 350);
  };

  // When child taps a syllable tile
  const handleSelectSyllable = (opt: SyllableOption) => {
    sounds.playPop();
    const expectedSyllable = targetSyllables[currentStep];

    if (opt.syllable === expectedSyllable) {
      // CORRECT CHOICE!
      setCorrectionMsg(null);
      setWrongTileId(null);

      // Play syllable voice
      speech.speak(opt.syllable, 1.05, 1.25);

      const nextPlaced = [...placedSyllables, opt.syllable];
      setPlacedSyllables(nextPlaced);

      // Remove chosen tile from available
      setAvailableOptions((prev) => prev.filter((o) => o.id !== opt.id));

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Check if all syllables completed
      if (nextStep >= targetSyllables.length) {
        setIsCompleted(true);
        sounds.playFanfare();
        onEarnStar();

        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });

        // Speak full syllable breakdown then word
        const breakdownSpoken = targetSyllables.join("... ");
        setTimeout(() => {
          speech.speak(
            `Pintar sekali! ${breakdownSpoken}... ${currentWord.word}!`,
            0.85,
            1.15
          );
        }, 500);
      }
    } else {
      // WRONG CHOICE -> CORRECT THE CHILD IMMEDIATELY!
      sounds.playGentleBoing();
      setWrongTileId(opt.id);

      const stepNames = ["pertama", "kedua", "ketiga", "keempat"];
      const stepName = stepNames[currentStep] || `ke-${currentStep + 1}`;

      const msg = `Bukan '${opt.syllable}'. Suku kata ${stepName} adalah '${expectedSyllable}'. Yuk coba sentuh '${expectedSyllable}'!`;
      setCorrectionMsg(msg);

      // Speak encouraging correction
      speech.speak(
        `Bukan ${opt.syllable}. Untuk kata ${currentWord.word}, pilih ${expectedSyllable} dulu ya!`,
        0.9,
        1.1
      );

      // Clear shaking after 600ms
      setTimeout(() => {
        setWrongTileId(null);
      }, 600);
    }
  };

  const handleNextWord = () => {
    sounds.playPop();
    setQuestionCount((c) => c + 1);

    if (deckIndex + 1 >= deck.length) {
      const newDeck = Array.from({ length: SPELLING_WORDS.length }, (_, i) => i)
        .sort(() => Math.random() - 0.5);
      setDeck(newDeck);
      setDeckIndex(0);
    } else {
      setDeckIndex((prev) => prev + 1);
    }
  };

  const handleShuffleRandom = () => {
    sounds.playPop();
    const randomOffset = Math.floor(Math.random() * (SPELLING_WORDS.length - 1)) + 1;
    setDeckIndex((prev) => (prev + randomOffset) % deck.length);
    setQuestionCount((c) => c + 1);
  };

  const handleReset = () => {
    sounds.playPop();
    setupRound(currentWord);
  };

  const expectedSyllable = targetSyllables[currentStep];

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Question Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-rose-200 text-center relative overflow-hidden">
        {/* Header Badges */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 bg-rose-100/70 text-rose-900 px-3 py-1 rounded-full border border-rose-200">
            <Shuffle className="w-3.5 h-3.5 text-rose-600" />
            <span>Eja Suku Kata #{questionCount}</span>
          </div>
          <span className="text-amber-500 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> +1 Bintang
          </span>
        </div>

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

        {/* Word Display with syllables hint */}
        <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wider mb-1">
          {currentWord.word}
        </h3>
        <p className="text-sm sm:text-base font-bold text-slate-500 mb-6">
          {currentWord.hint}
        </p>

        {/* Syllable Slots in Sequence */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6">
          {targetSyllables.map((_, idx) => {
            const isFilled = idx < placedSyllables.length;
            const isCurrent = idx === currentStep && !isCompleted;

            return (
              <React.Fragment key={idx}>
                <div
                  className={`min-w-[4.5rem] sm:min-w-[5.5rem] h-18 sm:h-22 px-3 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl transition-all border-3 ${
                    isFilled
                      ? "bg-emerald-100 text-emerald-800 border-emerald-400 scale-105 shadow-md"
                      : isCurrent
                      ? "bg-rose-50 text-rose-700 border-rose-400 ring-4 ring-rose-200 animate-pulse"
                      : "bg-slate-100 border-dashed border-slate-300 text-slate-400"
                  }`}
                >
                  {isFilled ? placedSyllables[idx] : isCurrent ? "?" : ""}
                </div>
                {idx < targetSyllables.length - 1 && (
                  <span className="text-2xl sm:text-3xl font-black text-slate-400">-</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Real-Time Correction Banner */}
        {correctionMsg && !isCompleted && (
          <div className="mb-5 p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-2.5 text-rose-800 text-left animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-xs sm:text-sm font-bold leading-tight">
              {correctionMsg}
            </p>
          </div>
        )}

        {/* Success Banner */}
        {isCompleted ? (
          <div className="space-y-4 animate-bounce-slow">
            <div className="p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg sm:text-xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>
                Hebat! Ejaannya: {targetSyllables.join(" - ")} = {currentWord.word}!
              </span>
            </div>
            <button
              onClick={handleNextWord}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>Lanjut Soal Suku Kata Berikutnya</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ) : (
          /* Syllable Selection Tiles */
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Pilih suku kata selanjutnya:
            </p>
            <div className="flex flex-wrap justify-center gap-3 min-h-[4.5rem]">
              {availableOptions.map((opt) => {
                const isWrong = wrongTileId === opt.id;
                // If there's an error, give a gentle glowing hint to the correct one!
                const isHintTarget = correctionMsg !== null && opt.syllable === expectedSyllable;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectSyllable(opt)}
                    className={`min-w-[4.5rem] sm:min-w-[5.5rem] h-16 sm:h-20 px-4 rounded-2xl font-black text-2xl sm:text-3xl border-3 transition-all cursor-pointer shadow-md flex items-center justify-center active:scale-90 ${
                      isWrong
                        ? "bg-rose-200 text-rose-700 border-rose-400 animate-shake"
                        : isHintTarget
                        ? "bg-amber-100 text-amber-900 border-amber-400 ring-4 ring-amber-300 animate-bounce"
                        : "bg-white hover:bg-rose-50 text-indigo-700 border-indigo-200 hover:border-indigo-400"
                    }`}
                  >
                    {opt.syllable}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Auxiliary action buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            const breakdown = targetSyllables.join("... ");
            speech.speak(`${breakdown}... ${currentWord.word}!`, 0.85, 1.15);
          }}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <Volume2 className="w-4 h-4 text-pink-500" />
          <span>Dengarkan Suku Kata</span>
        </button>
        <button
          onClick={handleShuffleRandom}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <Shuffle className="w-4 h-4 text-purple-500" />
          <span>Ganti Kata Acak</span>
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span>Ulangi Dari Awal</span>
        </button>
      </div>
    </div>
  );
};
