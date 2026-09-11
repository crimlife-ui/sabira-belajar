import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Star, BookOpen, Hash, Calculator, Award, Moon } from "lucide-react";
import { TopBar } from "./components/common/TopBar";
import { ParentalModal } from "./components/common/ParentalModal";
import { ProfileModal, UserProfile } from "./components/common/ProfileModal";
import { LetterExplorer } from "./components/letters/LetterExplorer";
import { SpellingGame } from "./components/letters/SpellingGame";
import { SyllableSpellingGame } from "./components/letters/SyllableSpellingGame";
import { BalloonSpellingGame } from "./components/letters/BalloonSpellingGame";
import { NumberExplorer } from "./components/numbers/NumberExplorer";
import { CountingGame } from "./components/numbers/CountingGame";
import { VisualMathGame } from "./components/math/VisualMathGame";
import { HijaiyahExplorer } from "./components/hijaiyah/HijaiyahExplorer";
import { ArabicNumberExplorer } from "./components/hijaiyah/ArabicNumberExplorer";
import { HijaiyahQuiz } from "./components/hijaiyah/HijaiyahQuiz";
import { StickerAlbum } from "./components/stickers/StickerAlbum";
import { sounds } from "./utils/audioEffects";
import { speech } from "./utils/speechHelper";
import { STICKERS_LIST } from "./data/stickersData";

type Screen = "home" | "letters" | "numbers" | "math" | "hijaiyah";
type LetterMode = "explore" | "spelling" | "syllables" | "balloon";
type HijaiyahMode = "letters" | "numbers" | "quiz";

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [letterTab, setLetterTab] = useState<LetterMode>("explore");
  const [numberTab, setNumberTab] = useState<"explore" | "counting">("explore");
  const [hijaiyahTab, setHijaiyahTab] = useState<HijaiyahMode>("letters");

  // Profile management (First-time onboarding detection)
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("sabira_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(() => {
    // If no profile saved yet, open modal immediately for first-time access
    return localStorage.getItem("sabira_profile") === null;
  });

  const [isFirstTimeProfile, setIsFirstTimeProfile] = useState(() => {
    return localStorage.getItem("sabira_profile") === null;
  });

  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem("sabira_stars");
    return saved ? parseInt(saved, 10) : 3;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("sabira_sound");
    return saved !== null ? saved === "true" : true;
  });

  const [isParentalOpen, setIsParentalOpen] = useState(false);
  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [unlockedCelebration, setUnlockedCelebration] = useState<string | null>(null);

  useEffect(() => {
    sounds.setSoundEnabled(soundEnabled);
    speech.setSpeechEnabled(soundEnabled);
    localStorage.setItem("sabira_sound", String(soundEnabled));
  }, [soundEnabled]);

  const handleEarnStar = () => {
    setStars((prev) => {
      const next = prev + 1;
      localStorage.setItem("sabira_stars", String(next));

      const newlyUnlocked = STICKERS_LIST.find((s) => s.requiredStars === next);
      if (newlyUnlocked) {
        setUnlockedCelebration(newlyUnlocked.name);
        sounds.playFanfare();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
        });
        setTimeout(() => {
          speech.speak(`Selamat! Kamu membuka stiker baru: ${newlyUnlocked.name}!`, 0.9, 1.15);
        }, 600);
      }

      return next;
    });
  };

  const handleResetProgress = () => {
    setStars(0);
    localStorage.setItem("sabira_stars", "0");
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleSaveProfile = (newProfile: UserProfile, isNewProfile?: boolean) => {
    setProfile(newProfile);
    localStorage.setItem("sabira_profile", JSON.stringify(newProfile));
    
    // Jika menambah profil baru, mulai progres baru dari awal (0 bintang)
    if (isNewProfile) {
      setStars(0);
      localStorage.setItem("sabira_stars", "0");
      setUnlockedCelebration(null);
    }

    setIsProfileModalOpen(false);
    setIsFirstTimeProfile(false);
  };

  const childName = profile ? profile.name : "Sabira";
  const childAvatar = profile ? profile.avatar : "👧🏻";

  const getScreenTitle = () => {
    switch (currentScreen) {
      case "letters":
        return letterTab === "explore"
          ? "🔤 Mengenal Huruf A-Z"
          : letterTab === "spelling"
          ? "🔤 Eja Huruf Kata"
          : letterTab === "syllables"
          ? "🗣️ Eja Suku Kata"
          : "🎈 Balon Huruf";
      case "numbers":
        return numberTab === "explore" ? "🔢 Mengenal Angka 0-20" : "🔢 Menghitung Benda";
      case "math":
        return "➕➖ Matematika Ceria";
      case "hijaiyah":
        return hijaiyahTab === "letters"
          ? "🌙 Mengenal Huruf Hijaiyah"
          : hijaiyahTab === "numbers"
          ? "🔢 Mengenal Angka Arab"
          : "🎯 Kuis Tebak Hijaiyah";
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-pink-300">
      {/* Top Bar */}
      <TopBar
        title={getScreenTitle()}
        onBack={currentScreen !== "home" ? () => setCurrentScreen("home") : undefined}
        stars={stars}
        soundEnabled={soundEnabled}
        profile={profile || undefined}
        onOpenProfile={() => {
          setIsFirstTimeProfile(false);
          setIsProfileModalOpen(true);
        }}
        onToggleSound={handleToggleSound}
        onOpenParental={() => setIsParentalOpen(true)}
        onOpenStickers={() => setIsStickersOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:py-6">
        {/* ===================== SCREEN: HOME ===================== */}
        {currentScreen === "home" && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Hero Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white shadow-xl border-4 border-white/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs sm:text-sm font-bold tracking-wide text-white">
                  <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-200" />
                  <span>Dunia Belajar {childName}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                  Halo {childName}! Ayo Belajar & Bermain!
                </h2>
                <p className="text-white/90 text-sm sm:text-base font-medium max-w-lg">
                  Pilih petualanganmu hari ini: mengenal huruf, mengeja suku kata, huruf hijaiyah & angka Arab, atau matematika seru!
                </p>
              </div>

              {/* Character Illustration / Badge */}
              <div
                onClick={() => {
                  sounds.playPop();
                  speech.speak(`Halo! Aku ${childName}! Ayo kita belajar bersama-sama ya!`, 0.95, 1.2);
                }}
                className="w-24 h-24 sm:w-32 sm:h-32 bg-white/30 backdrop-blur rounded-full border-4 border-white flex items-center justify-center text-5xl sm:text-6xl shadow-inner cursor-pointer active:scale-90 transition-transform hover:rotate-6 select-none shrink-0"
                title={`Profil ${childName} - Sentuh aku!`}
              >
                {childAvatar}
              </div>
            </div>

            {/* 5 Big Main Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Card 1: Huruf & Mengeja */}
              <button
                onClick={() => {
                  sounds.playPop();
                  speech.speak("Ayo belajar huruf dan mengeja kata!", 0.9, 1.15);
                  setCurrentScreen("letters");
                  setLetterTab("explore");
                }}
                className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-xl border-4 border-pink-300/60 hover:border-white transition-all duration-300 hover:scale-[1.02] active:scale-98 text-left cursor-pointer flex flex-col justify-between min-h-[12rem]"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl group-hover:scale-125 transition-transform">
                    🔤
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-black tracking-wide flex items-center gap-2">
                    <span>Huruf & Mengeja</span>
                  </h3>
                  <p className="text-white/85 text-sm font-medium mt-1">
                    Alfabet A-Z, Eja Huruf, Eja Suku Kata, dan Game Balon Huruf Terbang 🎈.
                  </p>
                </div>
              </button>

              {/* Card 2: Huruf Hijaiyah & Angka Arab */}
              <button
                onClick={() => {
                  sounds.playPop();
                  speech.speak("Ayo belajar huruf hijaiyah dan angka Arab!", 0.9, 1.15);
                  setCurrentScreen("hijaiyah");
                  setHijaiyahTab("letters");
                }}
                className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl border-4 border-emerald-300/60 hover:border-white transition-all duration-300 hover:scale-[1.02] active:scale-98 text-left cursor-pointer flex flex-col justify-between min-h-[12rem]"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                    <Moon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl group-hover:scale-125 transition-transform">
                    🌙
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-black tracking-wide flex items-center gap-2">
                    <span>Huruf Hijaiyah</span>
                  </h3>
                  <p className="text-white/85 text-sm font-medium mt-1">
                    Huruf Arab Alif-Ya, panduan harakat, angka Arab (٠-١٠), & kuis tebak ceria.
                  </p>
                </div>
              </button>

              {/* Card 3: Angka & Berhitung */}
              <button
                onClick={() => {
                  sounds.playPop();
                  speech.speak("Ayo mengenal angka dan menghitung benda!", 0.9, 1.15);
                  setCurrentScreen("numbers");
                  setNumberTab("explore");
                }}
                className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl border-4 border-sky-300/60 hover:border-white transition-all duration-300 hover:scale-[1.02] active:scale-98 text-left cursor-pointer flex flex-col justify-between min-h-[12rem]"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                    <Hash className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl group-hover:scale-125 transition-transform">
                    🔢
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-black tracking-wide flex items-center gap-2">
                    <span>Mengenal Angka</span>
                  </h3>
                  <p className="text-white/85 text-sm font-medium mt-1">
                    Pelajari angka 0-20 & hitung benda interaktif dengan sentuhan.
                  </p>
                </div>
              </button>

              {/* Card 4: Matematika Ceria (+ dan -) */}
              <button
                onClick={() => {
                  sounds.playPop();
                  speech.speak("Ayo bermain penjumlahan dan pengurangan!", 0.9, 1.15);
                  setCurrentScreen("math");
                }}
                className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl border-4 border-indigo-300/60 hover:border-white transition-all duration-300 hover:scale-[1.02] active:scale-98 text-left cursor-pointer flex flex-col justify-between min-h-[12rem]"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl group-hover:scale-125 transition-transform">
                    ➕➖
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-black tracking-wide flex items-center gap-2">
                    <span>Matematika Ceria</span>
                  </h3>
                  <p className="text-white/85 text-sm font-medium mt-1">
                    Operasi tambah (+) & kurang (-) dengan visual balon dan buah.
                  </p>
                </div>
              </button>

              {/* Card 5: Papan Stiker Hadiah */}
              <button
                onClick={() => {
                  sounds.playPop();
                  speech.speak("Lihat semua koleksi stiker hadiahmu!", 0.9, 1.15);
                  setIsStickersOpen(true);
                }}
                className="group relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950 shadow-xl border-4 border-yellow-200 hover:border-white transition-all duration-300 hover:scale-[1.02] active:scale-98 text-left cursor-pointer flex flex-col justify-between min-h-[12rem] sm:col-span-2 lg:col-span-2"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/30 rounded-2xl backdrop-blur">
                    <Award className="w-8 h-8 text-amber-900" />
                  </div>
                  <span className="text-4xl group-hover:scale-125 transition-transform">
                    🌟
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-black tracking-wide flex items-center justify-between">
                    <span>Papan Stiker</span>
                    <span className="text-sm bg-white/40 px-3 py-1 rounded-full font-bold">
                      {stars} ⭐
                    </span>
                  </h3>
                  <p className="text-amber-900/85 text-sm font-medium mt-1">
                    Buka hadiah stiker lucu setiap kali berhasil belajar!
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ===================== SCREEN: LETTERS ===================== */}
        {currentScreen === "letters" && (
          <div className="space-y-4">
            {/* Sub Tabs: 4 Pilihan Menu */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-pink-200 shadow-sm">
              <button
                onClick={() => {
                  sounds.playPop();
                  setLetterTab("explore");
                }}
                className={`flex-1 min-w-[6.5rem] py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  letterTab === "explore"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-pink-50"
                }`}
              >
                Mengenal A-Z
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setLetterTab("spelling");
                }}
                className={`flex-1 min-w-[6.5rem] py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  letterTab === "spelling"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-pink-50"
                }`}
              >
                Eja Huruf 🧩
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setLetterTab("syllables");
                }}
                className={`flex-1 min-w-[6.5rem] py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  letterTab === "syllables"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-pink-50"
                }`}
              >
                Eja Suku Kata 🗣️
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setLetterTab("balloon");
                }}
                className={`flex-1 min-w-[6.5rem] py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  letterTab === "balloon"
                    ? "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-pink-50"
                }`}
              >
                Balon Huruf 🎈
              </button>
            </div>

            {/* Active Sub Mode */}
            {letterTab === "explore" ? (
              <LetterExplorer />
            ) : letterTab === "spelling" ? (
              <SpellingGame onEarnStar={handleEarnStar} onBackToHome={() => setCurrentScreen("home")} />
            ) : letterTab === "syllables" ? (
              <SyllableSpellingGame onEarnStar={handleEarnStar} onBackToHome={() => setCurrentScreen("home")} />
            ) : (
              <BalloonSpellingGame onEarnStar={handleEarnStar} onBackToHome={() => setCurrentScreen("home")} />
            )}
          </div>
        )}

        {/* ===================== SCREEN: NUMBERS ===================== */}
        {currentScreen === "numbers" && (
          <div className="space-y-4">
            {/* Sub Tabs */}
            <div className="flex justify-center gap-2 max-w-md mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-sky-200 shadow-sm">
              <button
                onClick={() => {
                  sounds.playPop();
                  setNumberTab("explore");
                }}
                className={`flex-1 py-2.5 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                  numberTab === "explore"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                Mengenal Angka 0-20
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setNumberTab("counting");
                }}
                className={`flex-1 py-2.5 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                  numberTab === "counting"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                Hitung Benda 🍎
              </button>
            </div>

            {/* Active Sub Mode */}
            {numberTab === "explore" ? (
              <NumberExplorer />
            ) : (
              <CountingGame onEarnStar={handleEarnStar} onBackToHome={() => setCurrentScreen("home")} />
            )}
          </div>
        )}

        {/* ===================== SCREEN: MATH ===================== */}
        {currentScreen === "math" && (
          <VisualMathGame onEarnStar={handleEarnStar} onBackToHome={() => setCurrentScreen("home")} />
        )}

        {/* ===================== SCREEN: HIJAIYAH ===================== */}
        {currentScreen === "hijaiyah" && (
          <div className="space-y-4">
            {/* Sub Tabs */}
            <div className="flex justify-center gap-2 max-w-lg mx-auto p-1.5 bg-white/80 backdrop-blur rounded-2xl border border-emerald-200 shadow-sm">
              <button
                onClick={() => {
                  sounds.playPop();
                  setHijaiyahTab("letters");
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  hijaiyahTab === "letters"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-emerald-50"
                }`}
              >
                🌙 Huruf Hijaiyah
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setHijaiyahTab("numbers");
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  hijaiyahTab === "numbers"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-emerald-50"
                }`}
              >
                🔢 Angka Arab
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setHijaiyahTab("quiz");
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  hijaiyahTab === "quiz"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-102"
                    : "text-slate-600 hover:bg-emerald-50"
                }`}
              >
                🎯 Tebak Ceria
              </button>
            </div>

            {/* Active Sub Mode */}
            {hijaiyahTab === "letters" ? (
              <HijaiyahExplorer />
            ) : hijaiyahTab === "numbers" ? (
              <ArabicNumberExplorer />
            ) : (
              <HijaiyahQuiz onEarnStar={handleEarnStar} onBackToHome={() => setCurrentScreen("home")} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-3 text-center text-xs font-semibold text-slate-500">
        Sabira Belajar &bull; Teman Ceria Belajar Membaca & Menghitung
      </footer>

      {/* Profile Modal (First-time onboarding & Edit) */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        isFirstTime={isFirstTimeProfile}
        initialProfile={profile || undefined}
        onSave={handleSaveProfile}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Parental Gate Modal */}
      <ParentalModal
        isOpen={isParentalOpen}
        onClose={() => setIsParentalOpen(false)}
        onResetProgress={handleResetProgress}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Sticker Album Modal */}
      {isStickersOpen && (
        <StickerAlbum
          stars={stars}
          onClose={() => setIsStickersOpen(false)}
        />
      )}

      {/* Unlock Sticker Celebration Banner */}
      {unlockedCelebration && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black px-6 py-3 rounded-full shadow-2xl border-4 border-white flex items-center gap-3 animate-bounce">
          <Star className="w-6 h-6 fill-yellow-200 text-amber-800" />
          <span>Hore! Stiker "{unlockedCelebration}" Berhasil Dibuka!</span>
          <button
            onClick={() => setUnlockedCelebration(null)}
            className="ml-2 text-xs bg-amber-600 text-white px-2.5 py-1 rounded-full hover:bg-amber-700 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
};
