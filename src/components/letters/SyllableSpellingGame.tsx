import React, { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Volume2, Star, Shuffle, AlertCircle, CheckCircle2 } from "lucide-react";
import { SPELLING_WORDS, SpellingWord } from "../../data/spellingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface SyllableSpellingGameProps {
  onEarnStar: () => void;
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

  // Syllable parts of current word
  const parts = currentWord.parts;

  // Active syllable index (0 for 1st syllable, 1 for 2nd, etc.)
  const [activePartIndex, setActivePartIndex] = useState(0);
  // Active letter index inside current syllable
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  // Letters placed in each syllable part: array of arrays
  const [placedLetters, setPlacedLetters] = useState<string[][]>([]);

  // Feedback states
  const [correctionMsg, setCorrectionMsg] = useState<string | null>(null);
  const [wrongLetter, setWrongLetter] = useState<string | null>(null);
  const [partSuccessBanner, setPartSuccessBanner] = useState<string | null>(null);
  const [isWordCompleted, setIsWordCompleted] = useState(false);

  // Available letter choices to display (scrambled letters of word + distractors)
  const [choices, setChoices] = useState<string[]>([]);

  // Setup round when word changes
  useEffect(() => {
    setupWord(currentWord);
  }, [currentWordIndex]);

  const setupWord = (wordObj: SpellingWord) => {
    setActivePartIndex(0);
    setActiveLetterIndex(0);
    setPlacedLetters(wordObj.parts.map(() => []));
    setCorrectionMsg(null);
    setWrongLetter(null);
    setPartSuccessBanner(null);
    setIsWordCompleted(false);

    // Collect all unique letters from word
    const wordChars = Array.from(new Set(wordObj.word.split("")));
    // Add 2-3 random distractors from alphabet
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const distractors = alphabet
      .filter((c) => !wordChars.includes(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const allChoices = [...wordChars, ...distractors].sort(() => Math.random() - 0.5);
    setChoices(allChoices);

    const firstPart = wordObj.parts[0];
    const firstLetter = firstPart.letters[0];

    setTimeout(() => {
      speech.speak(
        `Ayo eja kata ${wordObj.word}. Suku kata pertama: ${firstPart.syllable}. Mulai dari huruf ${firstLetter}!`,
        0.9,
        1.15
      );
    }, 350);
  };

  const currentPart = parts[activePartIndex];
  const expectedLetter = currentPart ? currentPart.letters[activeLetterIndex] : "";

  // When child taps a letter button
  const handleSelectLetter = (letter: string) => {
    if (isWordCompleted || partSuccessBanner) return;

    sounds.playPop();

    if (letter === expectedLetter) {
      // CORRECT LETTER!
      setCorrectionMsg(null);
      setWrongLetter(null);

      // Play letter sound
      speech.speak(letter, 1.1, 1.3);

      // Add letter to placed letters of active syllable
      const newPlaced = placedLetters.map((arr, idx) =>
        idx === activePartIndex ? [...arr, letter] : arr
      );
      setPlacedLetters(newPlaced);

      const nextLetterIdx = activeLetterIndex + 1;

      // Check if current syllable part is completed
      if (nextLetterIdx >= currentPart.letters.length) {
        // Current syllable completed! E.g. PEN is done!
        sounds.playCorrectChime();

        const spelledLetters = currentPart.letters.join("-");
        const successText = `${spelledLetters} dibaca ${currentPart.syllable}!`;
        setPartSuccessBanner(successText);

        // Check if this was the last syllable of the whole word
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

          // Pronounce full word breakdown
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
          // Move to next syllable after brief encouraging voice
          const nextPart = parts[nextPartIdx];
          setTimeout(() => {
            speech.speak(
              `Hebat! ${currentPart.syllable}! Sekarang lanjut suku kata kedua: ${nextPart.syllable}! Mulai dari huruf ${nextPart.letters[0]}!`,
              0.9,
              1.15
            );
          }, 300);

          // Auto-advance to next syllable part after 1.8s
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
        speech.speak(`Pintar! Lanjut huruf ${nextExp}!`, 1.0, 1.2);
      }
    } else {
      // WRONG LETTER -> REAL-TIME CORRECTION!
      sounds.playGentleBoing();
      setWrongLetter(letter);

      const stepName =
        activeLetterIndex === 0
          ? "pertama"
          : activeLetterIndex === 1
          ? "kedua"
          : activeLetterIndex === 2
          ? "ketiga"
          : `ke-${activeLetterIndex + 1}`;

      const msg = `Bukan huruf '${letter}'. Huruf ${stepName} untuk suku kata '${currentPart.syllable}' adalah '${expectedLetter}'. Yuk cari huruf '${expectedLetter}'!`;
      setCorrectionMsg(msg);

      speech.speak(
        `Bukan ${letter}. Hurufnya adalah ${expectedLetter}. Coba cari ${expectedLetter} ya!`,
        0.9,
        1.1
      );

      // Clear shaking state after 600ms
      setTimeout(() => {
        setWrongLetter(null);
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

  const handleResetWord = () => {
    sounds.playPop();
    setupWord(currentWord);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Main Question Card */}
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
                  <span className={`px-2 py-0.5 rounded-lg text-white font-black ${
                    isCompletedPart ? "bg-emerald-600" : isCurrentPart ? "bg-rose-500" : "bg-slate-400"
                  }`}>
                    {part.syllable}
                  </span>
                  {isCompletedPart && <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />}
                </div>

                {/* Letter Slots within this syllable */}
                <div className="flex items-center gap-2">
                  {part.letters.map((_, lIdx) => {
                    const isLetterPlaced = lIdx < placedInThisPart.length;
                    const isWaitingThisLetter = isCurrentPart && lIdx === activeLetterIndex;

                    return (
                      <div
                        key={lIdx}
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
              onClick={handleNextWord}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>Lanjut Kata Berikutnya</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ) : (
          /* Letter Choice Buttons */
          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Pilih huruf untuk suku kata <span className="text-rose-600 font-black">{currentPart.syllable}</span>:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 min-h-[4.5rem]">
              {choices.map((char, cIdx) => {
                const isWrong = wrongLetter === char;
                // If correction is shown, give gentle pulse hint on the correct letter!
                const isHintTarget = correctionMsg !== null && char === expectedLetter;

                return (
                  <button
                    key={`${char}-${cIdx}`}
                    onClick={() => handleSelectLetter(char)}
                    className={`w-14 h-16 sm:w-16 sm:h-18 rounded-2xl font-black text-2xl sm:text-3xl border-3 transition-all cursor-pointer shadow-md flex items-center justify-center active:scale-90 ${
                      isWrong
                        ? "bg-rose-200 text-rose-800 border-rose-400 animate-shake"
                        : isHintTarget
                        ? "bg-amber-100 text-amber-900 border-amber-400 ring-4 ring-amber-300 animate-bounce"
                        : "bg-white hover:bg-rose-50 text-indigo-800 border-indigo-200 hover:border-indigo-400"
                    }`}
                  >
                    {char}
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
          onClick={handleShuffleRandom}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <Shuffle className="w-4 h-4 text-purple-500" />
          <span>Ganti Kata Acak</span>
        </button>
        <button
          onClick={handleResetWord}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span>Ulangi Kata</span>
        </button>
      </div>
    </div>
  );
};
