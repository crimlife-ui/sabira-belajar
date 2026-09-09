import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Lock, Star, Sparkles, X } from "lucide-react";
import { STICKERS_LIST, Sticker } from "../../data/stickersData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface StickerAlbumProps {
  stars: number;
  onClose: () => void;
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({ stars, onClose }) => {
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  const handleTapSticker = (sticker: Sticker) => {
    sounds.playPop();
    const isUnlocked = stars >= sticker.requiredStars;

    if (isUnlocked) {
      setSelectedSticker(sticker);
      sounds.playFanfare();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
      speech.speak(`Stiker ${sticker.name}! ${sticker.description}`, 0.9, 1.15);
    } else {
      const needed = sticker.requiredStars - stars;
      speech.speak(`Kumpulkan ${needed} bintang lagi untuk membuka stiker ini!`, 0.9, 1.1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-200 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌟</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Papan Stiker Hadiah
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Kumpulkan bintang dari belajar untuk membuka semua stiker!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-black text-sm border border-amber-300">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{stars} Bintang</span>
            </div>

            <button
              onClick={() => {
                sounds.playPop();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 p-2">
          {STICKERS_LIST.map((st) => {
            const isUnlocked = stars >= st.requiredStars;

            return (
              <button
                key={st.id}
                onClick={() => handleTapSticker(st)}
                className={`relative aspect-square rounded-3xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer border-3 ${
                  isUnlocked
                    ? `bg-gradient-to-br ${st.bgGradient} border-white shadow-lg hover:scale-105 active:scale-95 ring-2 ring-amber-300`
                    : "bg-slate-100 border-slate-200 opacity-65 hover:opacity-85"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <span className="text-4xl sm:text-5xl animate-bounce-slow filter drop-shadow">
                      {st.emoji}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900 mt-1 text-center line-clamp-1">
                      {st.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Lock className="w-8 h-8 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> {st.requiredStars}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Sticker Detail Preview Modal */}
        {selectedSticker && (
          <div className="mt-4 p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 flex items-center gap-4 animate-pop">
            <span className="text-5xl">{selectedSticker.emoji}</span>
            <div className="flex-1">
              <h4 className="font-black text-slate-800 text-lg flex items-center gap-1.5">
                <span>{selectedSticker.name}</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              </h4>
              <p className="text-sm text-slate-600">{selectedSticker.description}</p>
            </div>
            <button
              onClick={() => setSelectedSticker(null)}
              className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold rounded-xl text-xs cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
