import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, User, Check, X, Heart } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

export interface UserProfile {
  name: string;
  avatar: string;
  age: number;
}

interface ProfileModalProps {
  isOpen: boolean;
  isFirstTime?: boolean;
  initialProfile?: UserProfile;
  onSave: (profile: UserProfile, isNewProfile?: boolean) => void;
  onClose?: () => void;
}

const AVATAR_CHOICES = [
  { emoji: "👧🏻", label: "Putri Ceria" },
  { emoji: "👦🏻", label: "Jagoan Cilik" },
  { emoji: "👧🏽", label: "Gadis Manis" },
  { emoji: "👦🏽", label: "Petualang" },
  { emoji: "🦁", label: "Singa Berani" },
  { emoji: "🐱", label: "Kucing Lucu" },
  { emoji: "🐰", label: "Kelinci Cerdas" },
  { emoji: "🐼", label: "Panda Ceria" },
  { emoji: "🚀", label: "Astronot" },
  { emoji: "🦄", label: "Kuda Poni" },
];

const AGE_OPTIONS = [3, 4, 5, 6, 7];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  isFirstTime = false,
  initialProfile,
  onSave,
  onClose,
}) => {
  // Mode: "edit" (keep progress) vs "new" (start fresh progress 0 stars)
  const [mode, setMode] = useState<"edit" | "new">(isFirstTime ? "new" : "edit");
  const [name, setName] = useState(initialProfile?.name || "Sabira");
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile?.avatar || "👧🏻");
  const [selectedAge, setSelectedAge] = useState(initialProfile?.age || 5);
  const [error, setError] = useState("");

  // Update state whenever modal opens or initialProfile changes
  React.useEffect(() => {
    if (isOpen) {
      if (isFirstTime) {
        setMode("new");
        setName("");
        setSelectedAvatar("👧🏻");
        setSelectedAge(5);
      } else {
        setMode("edit");
        setName(initialProfile?.name || "Sabira");
        setSelectedAvatar(initialProfile?.avatar || "👧🏻");
        setSelectedAge(initialProfile?.age || 5);
      }
      setError("");
    }
  }, [isOpen, isFirstTime, initialProfile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Yuk tuliskan nama panggilanmu!");
      sounds.playGentleBoing();
      return;
    }

    const newProfile: UserProfile = {
      name: cleanName,
      avatar: selectedAvatar,
      age: selectedAge,
    };

    sounds.playFanfare();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
    });

    const isNew = isFirstTime || mode === "new";

    speech.speak(
      `Halo ${cleanName}! Selamat belajar dan bermain di Sabira Belajar!`,
      0.9,
      1.15
    );

    onSave(newProfile, isNew);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-2xl border-4 border-pink-300 relative overflow-hidden animate-pop my-auto">
        {/* Close Button (only if not first time setup) */}
        {!isFirstTime && onClose && (
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Mode Switcher (only shown if not first time) */}
        {!isFirstTime && (
          <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl mb-3 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setMode("edit");
                setName(initialProfile?.name || "Sabira");
                setSelectedAvatar(initialProfile?.avatar || "👧🏻");
                setSelectedAge(initialProfile?.age || 5);
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                mode === "edit"
                  ? "bg-white text-slate-800 shadow-sm border border-slate-200 font-black"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Ubah Profil ({initialProfile?.name})
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setMode("new");
                setName("");
                setSelectedAvatar("👧🏻");
                setSelectedAge(5);
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                mode === "new"
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md font-black"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              + Tambah Anak Baru
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-0.5 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-[11px] font-black">
            <Sparkles className="w-3.5 h-3.5 fill-pink-500 text-pink-600" />
            <span>
              {isFirstTime
                ? "Selamat Datang Sahabat Cilik!"
                : mode === "new"
                ? "Tambah Anak Baru (Mulai 0 ⭐)"
                : "Ubah Profil Sahabat Cilik"}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
            {isFirstTime
              ? "Siapa Nama Teman Baru Kita?"
              : mode === "new"
              ? "Profil Sahabat Cilik Baru"
              : "Profil Petualang Belajar"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Avatar Selection */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 text-left">
              Pilih Karakter Favorit:
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {AVATAR_CHOICES.map((av) => {
                const isSelected = selectedAvatar === av.emoji;
                return (
                  <button
                    key={av.emoji}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setSelectedAvatar(av.emoji);
                    }}
                    className={`h-11 sm:h-12 rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-all cursor-pointer border-2 ${
                      isSelected
                        ? "bg-pink-100 border-pink-500 scale-105 shadow-md ring-2 ring-pink-200"
                        : "bg-slate-50 hover:bg-pink-50 border-slate-200"
                    }`}
                    title={av.label}
                  >
                    <span>{av.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-pink-500" />
              <span>Nama Panggilan:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Contoh: Sabira, Kenzo, Cia..."
              maxLength={20}
              className="w-full text-base sm:text-lg font-bold py-2 px-3 rounded-xl border-2 border-slate-300 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-100 text-center text-slate-800"
              autoFocus
            />
            {error && (
              <p className="text-[11px] text-rose-500 font-bold text-center mt-0.5">{error}</p>
            )}
          </div>

          {/* Age Selection */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Usia Anak:</span>
            </label>
            <div className="flex justify-between gap-1.5">
              {AGE_OPTIONS.map((ageVal) => {
                const isSelected = selectedAge === ageVal;
                return (
                  <button
                    key={ageVal}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setSelectedAge(ageVal);
                    }}
                    className={`flex-1 py-1.5 rounded-lg font-black text-xs border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
                    }`}
                  >
                    {ageVal} Thn
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 mt-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base rounded-xl shadow-lg border-2 border-pink-300 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-5 h-5 stroke-[3]" />
            <span>
              {isFirstTime
                ? "Mulai Belajar & Bermain! 🎈"
                : mode === "new"
                ? "Mulai Progres Baru! 🌟"
                : "Simpan Perubahan ✨"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
