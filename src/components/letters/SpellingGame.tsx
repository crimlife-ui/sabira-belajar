import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, RotateCcw, Volume2, Star } from "lucide-react";
import { SPELLING_WORDS, SpellingWord } from "../../data/spellingData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface SpellingGameProps {
  onEarnStar: () => void;
}

interface LetterTile {
  id: string;
  char: string;
}

export const SpellingGame: React.FC<SpellingGameProps> = ({ onEarnStar }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord: SpellingWord = SPELLING_WORDS[wordIndex];

  // Available letter tiles (scrambled)
  const [availableTiles, setAvailableTiles] = useState<LetterTile[]>([]);
  // Placed letter tiles in slots
  const [placedTiles, setPlacedTiles] = useState<(LetterTile | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Setup current word
  useEffect(() => {
    setupWord(currentWord);
  }, [wordIndex]);

  const setupWord = (wordObj: SpellingWord) => {
    setIsCompleted(false);
    setHasError(false);

    const chars = wordObj.word.split("");
    // create unique tiles
    const tiles: LetterTile[] = chars.map((ch, idx) => ({
      id: `${ch}-${idx}-${Math.random()}`,
      char: ch,
    }));

    // Scramble tiles (ensure it does not accidentally match target order)
    const scrambled = [...tiles].sort(() => Math.random() - 0.5);
    setAvailableTiles(scrambled);
    setPlacedTiles(new Array(chars.length).fill(null));

    // Speak initial hint
    setTimeout(() => {
      speech.speak(`Susun huruf untuk kata ${wordObj.word}!`, 0.9, 1.1);
    }, 400);
  };

  // When child taps an available tile
  const handleSelectTile = (tile: LetterTile) => {
    sounds.playPop();
    speech.speak(tile.char, 1.1, 1.3);

    // Find first empty slot
    const emptyIndex = placedTiles.findIndex((t) => t === null);
    if (emptyIndex === -1) return; // all slots full

    const newPlaced = [...placedTiles];
    newPlaced[emptyIndex] = tile;
    setPlacedTiles(newPlaced);

    // Remove from available
    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));

    // Check if slots are now all filled
    if (emptyIndex === placedTiles.length - 1) {
      validateSolution(newPlaced);
    }
  };

  // When child taps a placed tile to return it to pool
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

  // Check if assembled letters match target word
  const validateSolution = (placed: (LetterTile | null)[]) => {
    const assembled = placed.map((t) => t?.char || "").join("");
    if (assembled === currentWord.word) {
      // SUCCESS!
      setIsCompleted(true);
      setHasError(false);
      sounds.playCorrectChime();
      onEarnStar();

      // Confetti burst
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Speak spelling and praise
      const spelled = currentWord.word.split("").join("-");
      setTimeout(() => {
        speech.speak(`Hebat sekali! ${spelled}, ${currentWord.word}!`, 0.85, 1.15);
      }, 500);
    } else {
      // Try again
      setHasError(true);
      sounds.playGentleBoing();
      speech.encourage();
    }
  };

  const handleNextWord = () => {
    sounds.playPop();
    setWordIndex((prev) => (prev + 1) % SPELLING_WORDS.length);
  };

  const handleResetWord = () => {
    sounds.playPop();
    setupWord(currentWord);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Question Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-200 text-center relative overflow-hidden">
        {/* Progress indicator */}
        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500 mb-2">
          <span>Kata {wordIndex + 1} dari {SPELLING_WORDS.length}</span>
          <span className="text-amber-500 flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> +1 Bintang jika benar
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

        {/* Success or Try-Again Banner */}
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
              <span>Lanjut Kata Berikutnya</span>
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

      {/* Auxiliary action: Speak word button */}
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
