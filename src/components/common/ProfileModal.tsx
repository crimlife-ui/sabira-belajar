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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-pink-300 relative overflow-hidden animate-pop">
        {/* Close Button (only if not first time setup) */}
        {!isFirstTime && onClose && (
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Mode Switcher (only shown if not first time) */}
        {!isFirstTime && (
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl mb-4 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setMode("edit");
                setName(initialProfile?.name || "Sabira");
                setSelectedAvatar(initialProfile?.avatar || "👧🏻");
                setSelectedAge(initialProfile?.age || 5);
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
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
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
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
        <div className="text-center space-y-1.5 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-black">
            <Sparkles className="w-4 h-4 fill-pink-500 text-pink-600" />
            <span>
              {isFirstTime
                ? "Selamat Datang Sahabat Cilik!"
                : mode === "new"
                ? "Tambah Sahabat Cilik Baru"
                : "Ubah Profil Sahabat Cilik"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
            {isFirstTime
              ? "Siapa Nama Teman Baru Kita?"
              : mode === "new"
              ? "Selamat Datang Anak Hebat!"
              : "Profil Petualang Belajar"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {mode === "new" || isFirstTime
              ? "Menambahkan profil baru akan memulai progres belajar dari awal (0 bintang)."
              : "Perbarui nama, avatar, atau usia tanpa mereset progres bintangmu."}
          </p>
        </div>

        {mode === "new" && !isFirstTime && (
          <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-xs font-bold text-center flex items-center justify-center gap-2">
            <span>✨</span>
            <span>Profil baru akan memulai progres dan petualangan bintang dari awal!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Selection */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-black text-slate-700 text-left">
              Pilih Karakter Favoritmu:
            </label>
            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
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
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-3xl sm:text-4xl transition-all cursor-pointer border-3 ${
                      isSelected
                        ? "bg-pink-100 border-pink-500 scale-110 shadow-lg ring-4 ring-pink-200 -translate-y-1"
                        : "bg-slate-50 hover:bg-pink-50 border-slate-200 hover:border-pink-200"
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
          <div className="space-y-1.5 text-left">
            <label className="block text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-pink-500" />
              <span>Nama Panggilan Anak:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Contoh: Sabira, Kenzo, Aisyah..."
              maxLength={20}
              className="w-full text-lg sm:text-xl font-bold py-3 px-4 rounded-2xl border-2 border-slate-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 text-center text-slate-800"
              autoFocus
            />
            {error && (
              <p className="text-xs text-rose-500 font-bold text-center mt-1">{error}</p>
            )}
          </div>

          {/* Age Selection */}
          <div className="space-y-2 text-left">
            <label className="block text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Usia Anak:</span>
            </label>
            <div className="flex justify-between gap-2">
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
                    className={`flex-1 py-2 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md scale-105"
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
            className="w-full py-4 mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl border-2 border-pink-300 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-6 h-6 stroke-[3]" />
            <span>
              {isFirstTime
                ? "Mulai Belajar & Bermain! 🎈"
                : mode === "new"
                ? "Mulai Progres Baru dengan Profil Ini! 🌟"
                : "Simpan Perubahan Profil ✨"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
