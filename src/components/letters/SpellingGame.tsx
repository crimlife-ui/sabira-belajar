import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Volume2, Star, Shuffle } from "lucide-react";
import { SPELLING_WORDS, SpellingWord } from "../../data/spellingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { SessionCompleteModal } from "../common/SessionCompleteModal";

interface SpellingGameProps {
  onEarnStar: () => void;
  onBackToHome?: () => void;
}

interface LetterTile {
  id: string;
  char: string;
}

const SESSION_SIZE = 10;

const getRandomIndices = (total: number, count: number): number[] => {
  const indices = Array.from({ length: total }, (_, i) => i);
  const shuffled = indices.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, total));
};

export const SpellingGame: React.FC<SpellingGameProps> = ({ onEarnStar, onBackToHome }) => {
  // 10 randomized words per session
  const [sessionWordIndices, setSessionWordIndices] = useState<number[]>(() =>
    getRandomIndices(SPELLING_WORDS.length, SESSION_SIZE)
  );
  const [sessionStep, setSessionStep] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const currentWordIndex = sessionWordIndices[sessionStep] ?? 0;
  const currentWord: SpellingWord = SPELLING_WORDS[currentWordIndex] ?? SPELLING_WORDS[0];

  // Available letter tiles (scrambled)
  const [availableTiles, setAvailableTiles] = useState<LetterTile[]>([]);
  // Placed letter tiles in slots
  const [placedTiles, setPlacedTiles] = useState<(LetterTile | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const setupWord = useCallback((wordObj: SpellingWord) => {
    setIsCompleted(false);
    setHasError(false);

    const chars = wordObj.word.split("");
    const tiles: LetterTile[] = chars.map((ch, idx) => ({
      id: `${ch}-${idx}-${Math.random()}`,
      char: ch,
    }));

    let scrambled = [...tiles].sort(() => Math.random() - 0.5);
    if (scrambled.map((t) => t.char).join("") === wordObj.word && wordObj.word.length > 2) {
      scrambled = scrambled.reverse();
    }
    setAvailableTiles(scrambled);
    setPlacedTiles(new Array(chars.length).fill(null));

    setTimeout(() => {
      speech.speak(`Susun huruf untuk kata ${wordObj.word}!`, 0.9, 1.1);
    }, 400);
  }, []);

  useEffect(() => {
    setupWord(currentWord);
  }, [currentWordIndex, setupWord]);

  const startNewSession = () => {
    const newIndices = getRandomIndices(SPELLING_WORDS.length, SESSION_SIZE);
    setSessionWordIndices(newIndices);
    setSessionStep(0);
    setIsSessionComplete(false);
  };

  const handleSelectTile = (tile: LetterTile) => {
    sounds.playPop();
    speech.speak(tile.char, 1.1, 1.3);

    const emptyIndex = placedTiles.findIndex((t) => t === null);
    if (emptyIndex === -1) return;

    const newPlaced = [...placedTiles];
    newPlaced[emptyIndex] = tile;
    setPlacedTiles(newPlaced);

    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));

    if (emptyIndex === placedTiles.length - 1) {
      validateSolution(newPlaced);
    }
  };

  const handleRemoveTile = (index: number) => {
    const tile = placedTiles[index];
    if (!tile || isCompleted) return;

    sounds.playPop();
    const newPlaced = [...placedTiles];
    newPlaced[index] = null;
    setPlacedTiles(newPlaced);

    setAvailableTiles((prev) => [...prev, tile]);
    setHasError(false);
  };

  const validateSolution = (placed: (LetterTile | null)[]) => {
    const assembled = placed.map((t) => t?.char || "").join("");
    if (assembled === currentWord.word) {
      setIsCompleted(true);
      setHasError(false);
      sounds.playCorrectChime();
      onEarnStar();

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });

      const spelled = currentWord.word.split("").join("-");
      setTimeout(() => {
        speech.speak(`Hebat sekali! ${spelled}, ${currentWord.word}!`, 0.85, 1.15);
      }, 500);
    } else {
      setHasError(true);
      sounds.playGentleBoing();
      speech.encourage();
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

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Session Progress Bar (10 Soal per Sesi) */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-md border-2 border-amber-200">
        <div className="flex justify-between items-center text-xs sm:text-sm font-black text-slate-600 mb-1.5">
          <span className="flex items-center gap-1.5 text-amber-600">
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
            className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((sessionStep + (isCompleted ? 1 : 0)) / SESSION_SIZE) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 text-center relative overflow-hidden">
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

        <p className="text-sm sm:text-base font-bold text-slate-600 mb-6">
          {currentWord.hint}
        </p>

        {/* Target Word Slots */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6">
          {placedTiles.map((tile, idx) => (
            <button
              key={idx}
              onClick={() => handleRemoveTile(idx)}
              className={`w-14 h-16 sm:w-18 sm:h-20 rounded-2xl flex items-center justify-center font-black text-3xl sm:text-4xl transition-all border-3 ${
                tile
                  ? hasError
                    ? "bg-rose-100 text-rose-600 border-rose-400 animate-shake"
                    : isCompleted
                    ? "bg-emerald-100 text-emerald-700 border-emerald-400 scale-105"
                    : "bg-amber-100 text-amber-800 border-amber-400 shadow-md cursor-pointer active:scale-90"
                  : "bg-slate-100 border-dashed border-slate-300 text-transparent"
              }`}
            >
              {tile ? tile.char : ""}
            </button>
          ))}
        </div>

        {/* Success Banner */}
        {isCompleted ? (
          <div className="space-y-4 animate-bounce-slow">
            <div className="p-3 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-emerald-800 font-black text-lg sm:text-xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />
              <span>Pintar! Kamu Berhasil Mengeja {currentWord.word}!</span>
            </div>
            <button
              onClick={handleNextWord}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <span>{sessionStep + 1 >= SESSION_SIZE ? "Lihat Hasil Sesi 10 Soal 🎉" : "Lanjut Kata Berikutnya"}</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        ) : (
          /* Available Scrambled Letter Tiles */
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Sentuh huruf di bawah ini untuk menyusun kata:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 min-h-[4.5rem]">
              {availableTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleSelectTile(tile)}
                  className="w-14 h-16 sm:w-18 sm:h-20 bg-white hover:bg-amber-50 text-indigo-700 font-black text-3xl sm:text-4xl rounded-2xl border-3 border-indigo-200 shadow-md hover:border-indigo-400 active:scale-90 transition-all cursor-pointer flex items-center justify-center"
                >
                  {tile.char}
                </button>
              ))}
            </div>

            {hasError && (
              <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-sm">
                <span>Susunannya belum pas. Sentuh huruf di atas untuk mengganti!</span>
                <button
                  onClick={handleResetWord}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  title="Ulangi"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Auxiliary actions */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            speech.speak(currentWord.word, 0.9, 1.15);
          }}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
        >
          <Volume2 className="w-4 h-4 text-pink-500" />
          <span>Dengarkan Kata</span>
        </button>
        <button
          onClick={startNewSession}
          className="px-4 py-2.5 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm"
          title="Mulai 10 soal baru"
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
        moduleName="Eja Huruf Kata"
        starsEarned={SESSION_SIZE}
        onPlayAgain={startNewSession}
        onBackToHome={onBackToHome}
      />
    </div>
  );
};
