import React, { useState, useEffect } from "react";
import { X, Check, RotateCcw, Volume2, ShieldAlert } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

interface ParentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ParentalModal: React.FC<ParentalModalProps> = ({
  isOpen,
  onClose,
  onResetProgress,
  soundEnabled,
  onToggleSound,
}) => {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(4);
  const [userAnswer, setUserAnswer] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Generate a random math question whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const a = Math.floor(Math.random() * 6) + 3; // 3 to 8
      const b = Math.floor(Math.random() * 5) + 2; // 2 to 6
      setNum1(a);
      setNum2(b);
      setUserAnswer("");
      setIsUnlocked(false);
      setErrorMessage("");
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

  const handleReset = () => {
    if (window.confirm("Apakah Ayah/Bunda yakin ingin mereset bintang dan koleksi stiker?")) {
      onResetProgress();
      sounds.playPop();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-indigo-100 relative">
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
              Pengaturan Aplikasi
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

            {/* Voice Test */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <p className="font-bold text-slate-800 text-sm">Tes Suara Narasi</p>
                <p className="text-xs text-slate-500">Uji pelafalan bahasa Indonesia</p>
              </div>
              <button
                onClick={() => {
                  speech.speak("Halo Sabira! Selamat belajar huruf dan angka ya!", 1.0, 1.1);
                  sounds.playPop();
                }}
                className="px-3.5 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Uji Suara 🔊
              </button>
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
