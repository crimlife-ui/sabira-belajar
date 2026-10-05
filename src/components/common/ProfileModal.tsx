import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, User, Check, X, Heart, Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { UserProfile, createProfileId } from "../../utils/profileStore";

export type { UserProfile } from "../../utils/profileStore";

interface ProfileModalProps {
  isOpen: boolean;
  isFirstTime?: boolean;
  profiles: UserProfile[];
  activeProfile?: UserProfile;
  onSaveProfile: (profile: UserProfile, isNew: boolean) => void;
  onSwitchProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
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

type View = "list" | "form";
type FormMode = "new" | "edit";

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  isFirstTime = false,
  profiles,
  activeProfile,
  onSaveProfile,
  onSwitchProfile,
  onDeleteProfile,
  onClose,
}) => {
  const [view, setView] = useState<View>(isFirstTime ? "form" : "list");
  const [formMode, setFormMode] = useState<FormMode>(isFirstTime ? "new" : "edit");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👧🏻");
  const [selectedAge, setSelectedAge] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (isFirstTime) {
      setView("form");
      setFormMode("new");
      setEditingId(null);
      setName("");
      setSelectedAvatar("👧🏻");
      setSelectedAge(5);
    } else {
      setView("list");
    }
  }, [isOpen, isFirstTime]);

  if (!isOpen) return null;

  const openForm = (mode: FormMode, profile?: UserProfile) => {
    sounds.playPop();
    setFormMode(mode);
    setEditingId(profile?.id ?? null);
    setName(profile?.name ?? "");
    setSelectedAvatar(profile?.avatar ?? "👧🏻");
    setSelectedAge(profile?.age ?? 5);
    setError("");
    setView("form");
  };

  const handleSwitch = (profile: UserProfile) => {
    if (profile.id === activeProfile?.id) {
      openForm("edit", profile);
      return;
    }
    sounds.playPop();
    speech.speak(`Halo ${profile.name}! Ayo belajar dan bermain bersama!`, 0.9, 1.15);
    onSwitchProfile(profile.id);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Yuk tuliskan nama panggilanmu!");
      sounds.playGentleBoing();
      return;
    }

    const isNew = formMode === "new";
    const profile: UserProfile = {
      id: editingId ?? createProfileId(),
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

    speech.speak(
      isNew
        ? `Halo ${cleanName}! Selamat belajar dan bermain di Sabira Belajar!`
        : `Profil ${cleanName} berhasil disimpan!`,
      0.9,
      1.15
    );

    onSaveProfile(profile, isNew);
  };

  const handleDelete = () => {
    if (!editingId) return;
    const target = profiles.find((p) => p.id === editingId);
    if (!target) return;
    const isLast = profiles.length <= 1;
    const confirmMsg = isLast
      ? `Ini satu-satunya profil. Menghapus ${target.name} akan mengulang pengaturan awal. Lanjutkan?`
      : `Hapus profil ${target.name}? Bintang dan stiker milik ${target.name} juga akan dihapus.`;
    if (window.confirm(confirmMsg)) {
      sounds.playPop();
      onDeleteProfile(editingId);
    }
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

        {/* ==================== VIEW: DAFTAR PROFIL ==================== */}
        {view === "list" && (
          <div className="space-y-3">
            <div className="text-center space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-[11px] font-black">
                <Sparkles className="w-3.5 h-3.5 fill-pink-500 text-pink-600" />
                <span>Pilih Petualang</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
                Siapa yang Belajar Hari Ini?
              </h2>
            </div>

            {/* Kartu Profil */}
            <div className="grid grid-cols-2 gap-2">
              {profiles.map((p) => {
                const isActive = p.id === activeProfile?.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSwitch(p)}
                    className={`p-3 rounded-2xl text-center transition-all border-2 cursor-pointer relative ${
                      isActive
                        ? "bg-pink-50 border-pink-500 shadow-md ring-2 ring-pink-200"
                        : "bg-slate-50 hover:bg-pink-50 border-slate-200"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-pink-600 text-white rounded-full flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl block">{p.avatar}</span>
                    <p className="font-black text-sm text-slate-800 mt-1 truncate">{p.name}</p>
                    <p className="text-[11px] text-slate-500 font-bold">{p.age} Thn</p>
                  </button>
                );
              })}
            </div>

            {/* Aksi: Ubah aktif / Tambah baru */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                disabled={!activeProfile}
                onClick={() => activeProfile && openForm("edit", activeProfile)}
                className={`py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 border-2 transition-all ${
                  activeProfile
                    ? "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer"
                    : "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                }`}
              >
                <Pencil className="w-4 h-4" />
                <span>Ubah Profil</span>
              </button>
              <button
                type="button"
                onClick={() => openForm("new")}
                className="py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:from-pink-600 hover:to-rose-600 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Anak</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Setiap anak punya bintang & stikernya sendiri
            </p>
          </div>
        )}

        {/* ==================== VIEW: FORM PROFIL ==================== */}
        {view === "form" && (
          <>
            {/* Header */}
            <div className="text-center space-y-0.5 mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-pink-100 text-pink-700 rounded-full text-[11px] font-black">
                <Sparkles className="w-3.5 h-3.5 fill-pink-500 text-pink-600" />
                <span>
                  {isFirstTime
                    ? "Selamat Datang Sahabat Cilik!"
                    : formMode === "new"
                    ? "Tambah Anak Baru (Mulai 0 ⭐)"
                    : "Ubah Profil Sahabat Cilik"}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
                {isFirstTime
                  ? "Siapa Nama Teman Baru Kita?"
                  : formMode === "new"
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
                    : formMode === "new"
                    ? "Mulai Progres Baru! 🌟"
                    : "Simpan Perubahan ✨"}
                </span>
              </button>
            </form>

            {/* Bottom actions: kembali ke daftar / hapus */}
            {!isFirstTime && (
              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    setView("list");
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Pilih Profil Lain</span>
                </button>
                {formMode === "edit" && editingId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Profil</span>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
