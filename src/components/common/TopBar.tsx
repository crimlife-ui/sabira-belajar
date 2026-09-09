import React from "react";
import { ArrowLeft, Volume2, VolumeX, Shield, Star } from "lucide-react";
import { sounds } from "../../utils/audioEffects";

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenParental: () => void;
  onOpenStickers: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  onBack,
  stars,
  soundEnabled,
  onToggleSound,
  onOpenParental,
  onOpenStickers,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      {/* Left section: Back button or Logo */}
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            onClick={() => {
              sounds.playPop();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white/90 hover:bg-white text-slate-700 font-bold rounded-2xl shadow-md border-2 border-slate-200 active:scale-95 transition-all text-sm sm:text-base cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5 text-amber-500 stroke-[3]" />
            <span>Menu</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce-slow">🎈</span>
            <h1 className="text-xl sm:text-2xl font-black tracking-wide bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Sabira Belajar
            </h1>
          </div>
        )}
      </div>

      {/* Center title if in sub-screen */}
      {title && (
        <div className="hidden sm:block font-bold text-lg text-slate-700 bg-white/80 px-4 py-1.5 rounded-full border border-pink-200 shadow-sm">
          {title}
        </div>
      )}

      {/* Right section: Stars, Sound, Parents */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Stars Badge & Sticker Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenStickers();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black rounded-2xl shadow-md border-2 border-yellow-200 active:scale-95 transition-all cursor-pointer hover:brightness-105"
          title="Buka Koleksi Stiker Hadiah"
        >
          <Star className="w-5 h-5 text-yellow-100 fill-yellow-100 stroke-[2] animate-spin-slow" />
          <span className="text-base sm:text-lg">{stars}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            sounds.playPop();
            onToggleSound();
          }}
          className={`p-2.5 rounded-2xl border-2 transition-all shadow-md active:scale-95 cursor-pointer ${
            soundEnabled
              ? "bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50"
              : "bg-slate-100 text-slate-400 border-slate-300"
          }`}
          aria-label={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}
          title={soundEnabled ? "Suara Aktif" : "Suara Mati"}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <VolumeX className="w-5 h-5 stroke-[2.5]" />
          )}
        </button>

        {/* Parental Gate Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenParental();
          }}
          className="p-2.5 bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-200 rounded-2xl shadow-md active:scale-95 transition-all cursor-pointer"
          title="Area Orang Tua"
          aria-label="Area Orang Tua"
        >
          <Shield className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </header>
  );
};
