import React from "react";
import { Lock } from "lucide-react";
import { sounds } from "../../utils/audioEffects";

interface ScreenTimeOverlayProps {
  usedMinutes: number;
  onUnlock: () => void;
}

export const ScreenTimeOverlay: React.FC<ScreenTimeOverlayProps> = ({
  usedMinutes,
  onUnlock,
}) => {
  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-gradient-to-b from-sky-200 via-indigo-100 to-amber-100 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-indigo-200 text-center space-y-4">
        <div className="text-6xl animate-bounce-slow">🧸</div>
        <h2 className="text-2xl font-black text-slate-800">Waktunya Istirahat!</h2>
        <p className="text-sm font-semibold text-slate-600 leading-relaxed">
          Kamu sudah belajar dan bermain sekitar{" "}
          <span className="font-black text-indigo-600">{usedMinutes} menit</span> hari ini.
          Ayo istirahat dulu, minum air putih, dan main di luar ya! ☀️
        </p>
        <p className="text-xs font-bold text-slate-400">
          Aplikasi akan terkunci sampai besok, atau minta Ayah/Bunda untuk menambah waktu.
        </p>
        <button
          onClick={() => {
            sounds.playPop();
            onUnlock();
          }}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <Lock className="w-5 h-5" />
          <span>Ayah/Bunda, Buka Kunci</span>
        </button>
      </div>
    </div>
  );
};
