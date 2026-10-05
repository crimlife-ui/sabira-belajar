import React, { useState, useEffect } from "react";
import { X, Check, RotateCcw, Volume2, ShieldAlert, Mic, Sparkles, Timer, BarChart3, Music } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech, VOICE_PERSONAS, VoicePersona } from "../../utils/speechHelper";
import { ProfileStats, StatsModule } from "../../utils/statsTracker";
import { MusicStyle } from "../../utils/backgroundMusic";

interface ParentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  screenTimeLimit: number;
  todayUsageMinutes: number;
  onSetScreenTimeLimit: (minutes: number) => void;
  stats: ProfileStats;
  musicEnabled: boolean;
  musicVolume: number;
  musicStyle: MusicStyle;
  onToggleMusic: () => void;
  onSetMusicVolume: (v: number) => void;
  onSetMusicStyle: (style: MusicStyle) => void;
}

const SCREEN_TIME_OPTIONS = [0, 15, 30, 60];

const MODULE_LABELS: Record<StatsModule, string> = {
  spelling: "Eja Huruf 🧩",
  syllables: "Eja Suku Kata 🗣️",
  balloon: "Balon Huruf 🎈",
  counting: "Hitung Benda 🍎",
  math: "Matematika ➕➖",
  hijaiyahQuiz: "Kuis Hijaiyah 🎯",
  reading: "Belajar Membaca 📖",
};

function formatLastPlayed(ts: number): string {
  if (!ts) return "-";
  const days = Math.floor((Date.now() - ts) / 86400000);
  if (days <= 0) return "hari ini";
  if (days === 1) return "kemarin";
  return `${days} hari lalu`;
}

export const ParentalModal: React.FC<ParentalModalProps> = ({
  isOpen,
  onClose,
  onResetProgress,
  soundEnabled,
  onToggleSound,
  screenTimeLimit,
  todayUsageMinutes,
  onSetScreenTimeLimit,
  stats,
  musicEnabled,
  musicVolume,
  musicStyle,
  onToggleMusic,
  onSetMusicVolume,
  onSetMusicStyle,
}) => {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(4);
  const [userAnswer, setUserAnswer] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Narrator voice settings
  const [currentPersonaId, setCurrentPersonaId] = useState(() => speech.getPersonaId());
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(() => speech.getSelectedVoiceURI() || "");

  // Generate a random math question whenever modal opens & load voices
  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 6) + 3; // 3 to 8
      const b = Math.floor(Math.random() * 5) + 2; // 2 to 6
      setNum1(a);
      setNum2(b);
      setUserAnswer("");
      setIsUnlocked(false);
      setErrorMessage("");

      // Refresh voices
      const voices = speech.getAvailableVoices();
      setAvailableVoices(voices);
      setSelectedVoiceURI(speech.getSelectedVoiceURI() || "");
      setCurrentPersonaId(speech.getPersonaId());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = num1 * num2;
    if (parseInt(userAnswer.trim(), 10) === expected) {
      setIsUnlocked(true);
      setErrorMessage("");
      sounds.playCorrectChime();
    } else {
      setErrorMessage("Jawaban kurang tepat. Coba lagi ya!");
      sounds.playGentleBoing();
    }
  };

  const handleSelectPersona = (p: VoicePersona) => {
    sounds.playPop();
    setCurrentPersonaId(p.id);
    speech.setPersona(p.id);
    speech.testVoice(p);
  };

  const handleSelectSystemVoice = (uri: string) => {
    sounds.playPop();
    setSelectedVoiceURI(uri);
    speech.setSelectedVoiceURI(uri);
    speech.testVoice();
  };

  const handleReset = () => {
    if (window.confirm("Apakah Ayah/Bunda yakin ingin mereset bintang dan koleksi stiker?")) {
      onResetProgress();
      sounds.playPop();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-indigo-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!isUnlocked ? (
          /* Parental Gate Verification */
          <div className="text-center space-y-4 pt-2">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-800">
              Area Khusus Orang Tua
            </h2>
            <p className="text-sm text-slate-600">
              Untuk memastikan anak didampingi, mohon jawab soal perkalian di bawah ini:
            </p>

            <div className="p-4 bg-indigo-50/80 rounded-2xl border-2 border-indigo-200">
              <span className="text-2xl font-black text-indigo-700 tracking-wider">
                {num1} &times; {num2} = ?
              </span>
            </div>

            <form onSubmit={handleVerify} className="space-y-3">
              <input
                type="number"
                pattern="[0-9]*"
                autoFocus
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Masukkan jawaban..."
                className="w-full text-center text-xl font-bold py-2.5 px-4 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:outline-none"
              />
              {errorMessage && (
                <p className="text-xs text-rose-500 font-bold">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Buka Pengaturan</span>
              </button>
            </form>
          </div>
        ) : (
          /* Settings Menu */
          <div className="space-y-5 pt-2">
            <h2 className="text-xl font-black text-slate-800 text-center border-b pb-3">
              Pengaturan Aplikasi & Orang Tua
            </h2>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="font-bold text-slate-800 text-sm">Efek Suara & Musik</p>
                  <p className="text-xs text-slate-500">Bunyi tombol dan nada gembira</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onToggleSound();
                  sounds.playPop();
                }}
                className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  soundEnabled
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {soundEnabled ? "Aktif" : "Mati"}
              </button>
            </div>

            {/* NEW SECTION: Voice Narrator Persona Selection */}
            <div className="space-y-3 p-4 bg-indigo-50/70 rounded-2xl border-2 border-indigo-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-900 font-black text-sm">
                  <Mic className="w-4 h-4 text-indigo-600" />
                  <span>Karakter Suara Narator:</span>
                </div>
                <button
                  type="button"
                  onClick={() => speech.testVoice()}
                  className="px-3 py-1 bg-white hover:bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                  <span>Uji Suara</span>
                </button>
              </div>

              {/* 4 Persona Cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {VOICE_PERSONAS.map((p) => {
                  const isSelected = currentPersonaId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPersona(p)}
                      className={`p-3 rounded-2xl text-left transition-all border-2 cursor-pointer relative ${
                        isSelected
                          ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-300 scale-102"
                          : "bg-white/70 hover:bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{p.emoji}</span>
                        {isSelected && (
                          <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="font-black text-xs sm:text-sm text-slate-800 mt-1">
                        {p.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">
                        {p.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Browser System Voice Selector (if device supports multiple voices) */}
              {availableVoices.length > 0 && (
                <div className="space-y-1 pt-1">
                  <label className="block text-[11px] font-bold text-slate-600">
                    Pilihan Mesin Suara Perangkat (Browser Voice):
                  </label>
                  <select
                    value={selectedVoiceURI}
                    onChange={(e) => handleSelectSystemVoice(e.target.value)}
                    className="w-full bg-white text-xs font-bold py-2 px-3 rounded-xl border border-indigo-200 text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {availableVoices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Musik Latar */}
            <div className="space-y-2.5 p-3 bg-violet-50/70 rounded-2xl border-2 border-violet-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="w-6 h-6 text-violet-600" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Musik Latar</p>
                    <p className="text-xs text-slate-500">Melodi lembut ala lagu pengantar tidur</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onToggleMusic();
                    sounds.playPop();
                  }}
                  className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer ${
                    musicEnabled
                      ? "bg-violet-500 text-white"
                      : "bg-slate-300 text-slate-700"
                  }`}
                >
                  {musicEnabled ? "Aktif" : "Mati"}
                </button>
              </div>
              {/* Pemilih gaya musik */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-violet-700 shrink-0">Gaya:</span>
                <div className="flex flex-1 gap-1.5">
                  {(
                    [
                      { id: "lullaby" as MusicStyle, label: "🎵 Nurseri" },
                      { id: "8bit" as MusicStyle, label: "🎮 8-Bit" },
                    ]
                  ).map((opt) => {
                    const isSelected = musicStyle === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          sounds.playPop();
                          onSetMusicStyle(opt.id);
                        }}
                        className={`flex-1 py-1.5 rounded-xl font-black text-xs border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-violet-500 text-white border-violet-500 shadow-sm"
                            : "bg-white text-slate-600 hover:bg-violet-50 border-slate-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {musicEnabled && (
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[11px] font-bold text-violet-700 shrink-0">Volume:</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(musicVolume * 100)}
                    onChange={(e) => onSetMusicVolume(parseInt(e.target.value, 10) / 100)}
                    className="flex-1 accent-violet-500 cursor-pointer"
                    aria-label="Volume musik latar"
                  />
                  <span className="text-[11px] font-black text-violet-700 w-8 text-right">
                    {Math.round(musicVolume * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Batas Waktu Belajar Harian */}
            <div className="space-y-2.5 p-4 bg-amber-50/70 rounded-2xl border-2 border-amber-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                  <Timer className="w-4 h-4 text-amber-600" />
                  <span>Batas Waktu Belajar Harian:</span>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                  Terpakai hari ini: {todayUsageMinutes} mnt
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SCREEN_TIME_OPTIONS.map((opt) => {
                  const isSelected = screenTimeLimit === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        sounds.playPop();
                        onSetScreenTimeLimit(opt);
                      }}
                      className={`py-2 rounded-xl font-black text-xs border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 border-amber-400 shadow-sm"
                          : "bg-white text-slate-600 hover:bg-amber-50 border-slate-200"
                      }`}
                    >
                      {opt === 0 ? "Mati" : `${opt} mnt`}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] font-semibold text-amber-700/80">
                Saat waktu habis, aplikasi terkunci lembut dan anak bisa meminta Ayah/Bunda
                menambah waktu. Peringatan ramah diberikan 5 menit sebelum berakhir.
              </p>
            </div>

            {/* Laporan Belajar */}
            <div className="space-y-2.5 p-4 bg-sky-50/70 rounded-2xl border-2 border-sky-200">
              <div className="flex items-center gap-2 text-sky-900 font-black text-sm">
                <BarChart3 className="w-4 h-4 text-sky-600" />
                <span>Laporan Belajar:</span>
              </div>
              {Object.values(stats).some((s) => s && s.answered > 0) ? (
                <div className="space-y-1.5">
                  {(Object.keys(MODULE_LABELS) as StatsModule[]).map((mod) => {
                    const s = stats[mod];
                    if (!s || s.answered === 0) return null;
                    const accuracy = Math.round((s.correct / s.answered) * 100);
                    return (
                      <div
                        key={mod}
                        className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-sky-100"
                      >
                        <span className="text-xs font-black text-slate-700">
                          {MODULE_LABELS[mod]}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 text-right">
                          {s.sessions} sesi selesai &bull; akurasi {accuracy}%
                          <br />
                          <span className="text-slate-400">
                            terakhir main: {formatLastPlayed(s.lastPlayed)}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs font-semibold text-sky-700/80">
                  Belum ada data. Setelah anak menyelesaikan soal, laporan akan muncul di sini.
                </p>
              )}
            </div>

            {/* Reset Progress */}
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-rose-800 text-sm">Reset Progres Belajar</p>
                  <p className="text-xs text-rose-600">Hapus semua bintang dan stiker</p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400">
              Sabira Belajar v1.0 &bull; 100% Bebas Iklan & Aman untuk Anak
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
