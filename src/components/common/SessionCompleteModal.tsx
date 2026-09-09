import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw, Home, Star, Trophy } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface SessionCompleteModalProps {
  isOpen: boolean;
  moduleName: string;
  starsEarned: number;
  onPlayAgain: () => void;
  onBackToHome?: () => void;
}

export const SessionCompleteModal: React.FC<SessionCompleteModalProps> = ({
  isOpen,
  moduleName,
  starsEarned,
  onPlayAgain,
  onBackToHome,
}) => {
  useEffect(() => {
    if (isOpen) {
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        speech.speak(
          `Hore! Luar biasa! Kamu sudah menyelesaikan 10 soal di ${moduleName}! Sabira hebat sekali!`,
          0.9,
          1.15
        );
      }, 400);
    }
  }, [isOpen, moduleName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden animate-pop">
        {/* Big Trophy and Stars */}
        <div className="relative my-2 inline-block">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center mx-auto shadow-lg border-4 border-white text-5xl animate-bounce-slow">
            <Trophy className="w-14 h-14 text-amber-950 fill-yellow-100" />
          </div>
          <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-300 absolute -top-2 -right-3 animate-spin-slow" />
          <Star className="w-6 h-6 text-amber-500 fill-amber-400 absolute -bottom-1 -left-2 animate-bounce" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-3">
          Hore! Selesai 10 Soal!
        </h2>
        <p className="text-sm font-bold text-slate-500 mt-1">
          {moduleName}
        </p>

        {/* Stars earned badge */}
        <div className="my-5 p-3.5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 flex items-center justify-center gap-3">
          <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
          <span className="text-lg sm:text-xl font-black text-amber-950">
            +{starsEarned} Bintang Hadiah!
          </span>
          <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
        </div>

        <p className="text-sm text-slate-600 font-medium mb-6">
          Kamu sudah belajar dengan sangat tekun hari ini. Mau lanjut main 10 soal baru lagi?
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              sounds.playPop();
              onPlayAgain();
            }}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>Main 10 Soal Baru Lagi</span>
          </button>

          {onBackToHome && (
            <button
              onClick={() => {
                sounds.playPop();
                onBackToHome();
              }}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm sm:text-base rounded-2xl border-2 border-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Menu Utama</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
