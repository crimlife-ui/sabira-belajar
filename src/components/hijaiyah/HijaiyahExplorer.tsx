import React, { useState } from "react";
import { Volume2, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { HIJAIYAH_LIST, HijaiyahItem } from "../../data/hijaiyahData";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";

type HarakatType = "asli" | "fathah" | "kasrah" | "dhommah";

export const HijaiyahExplorer: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<HijaiyahItem>(HIJAIYAH_LIST[0]);
  const [activeHarakat, setActiveHarakat] = useState<HarakatType>("asli");

  const getCurrentDisplay = () => {
    switch (activeHarakat) {
      case "fathah":
        return {
          arabic: selectedLetter.fathah.arabic,
          sound: selectedLetter.fathah.sound,
          label: "Fathah (A)",
          speechHarakat: "Fathah",
        };
      case "kasrah":
        return {
          arabic: selectedLetter.kasrah.arabic,
          sound: selectedLetter.kasrah.sound,
          label: "Kasrah (I)",
          speechHarakat: "Kasrah",
        };
      case "dhommah":
        return {
          arabic: selectedLetter.dhommah.arabic,
          sound: selectedLetter.dhommah.sound,
          label: "Dhommah (U)",
          speechHarakat: "Dhommah",
        };
      default:
        return {
          arabic: selectedLetter.arabic,
          sound: selectedLetter.transliteration,
          label: "Nama Asli",
          speechHarakat: undefined,
        };
    }
  };

  const currentDisplay = getCurrentDisplay();

  const handleSelectLetter = (item: HijaiyahItem) => {
    sounds.playPop();
    setSelectedLetter(item);
    if (activeHarakat === "asli") {
      speech.speak(`Huruf ${item.name}`, 0.9, 1.15);
    } else {
      const hInfo =
        activeHarakat === "fathah"
          ? item.fathah
          : activeHarakat === "kasrah"
          ? item.kasrah
          : item.dhommah;
      speech.speakHijaiyah(item.name, hInfo.name, hInfo.sound);
    }
  };

  const handleSelectHarakat = (type: HarakatType) => {
    sounds.playPop();
    setActiveHarakat(type);
    if (type === "asli") {
      speech.speak(`Huruf ${selectedLetter.name}`, 0.9, 1.15);
    } else {
      const hInfo =
        type === "fathah"
          ? selectedLetter.fathah
          : type === "kasrah"
          ? selectedLetter.kasrah
          : selectedLetter.dhommah;
      speech.speakHijaiyah(selectedLetter.name, hInfo.name, hInfo.sound);
    }
  };

  const handleNext = () => {
    const currentIndex = HIJAIYAH_LIST.findIndex((a) => a.arabic === selectedLetter.arabic);
    const nextIndex = (currentIndex + 1) % HIJAIYAH_LIST.length;
    handleSelectLetter(HIJAIYAH_LIST[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = HIJAIYAH_LIST.findIndex((a) => a.arabic === selectedLetter.arabic);
    const prevIndex = (currentIndex - 1 + HIJAIYAH_LIST.length) % HIJAIYAH_LIST.length;
    handleSelectLetter(HIJAIYAH_LIST[prevIndex]);
  };

  const handleSpeakCurrent = () => {
    sounds.playPop();
    if (activeHarakat === "asli") {
      speech.speak(`Huruf ${selectedLetter.name}`, 0.9, 1.15);
    } else {
      speech.speakHijaiyah(
        selectedLetter.name,
        currentDisplay.speechHarakat,
        currentDisplay.sound
      );
    }
  };

  const handleSpeakExample = () => {
    sounds.playPop();
    speech.speak(
      `Contoh: ${selectedLetter.example.wordLatin}, artinya ${selectedLetter.example.meaning}!`,
      0.9,
      1.15
    );
  };

  return (
    <div className="space-y-6">
      {/* Featured Big Hijaiyah Card */}
      <div className="bg-white/95 backdrop-blur rounded-3xl p-5 sm:p-7 shadow-xl border-4 border-emerald-200 max-w-xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
          aria-label="Huruf Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full shadow-md active:scale-90 transition-all cursor-pointer z-10"
          aria-label="Huruf Selanjutnya"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Harakat Selector Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 bg-emerald-50/80 p-1.5 rounded-2xl border border-emerald-200/80 max-w-sm w-full">
          <button
            onClick={() => handleSelectHarakat("asli")}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeHarakat === "asli"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-900 hover:bg-emerald-100/60"
            }`}
          >
            Asli
          </button>
          <button
            onClick={() => handleSelectHarakat("fathah")}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeHarakat === "fathah"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-900 hover:bg-emerald-100/60"
            }`}
          >
            Fathah (ـَ)
          </button>
          <button
            onClick={() => handleSelectHarakat("kasrah")}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeHarakat === "kasrah"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-900 hover:bg-emerald-100/60"
            }`}
          >
            Kasrah (ـِ)
          </button>
          <button
            onClick={() => handleSelectHarakat("dhommah")}
            className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeHarakat === "dhommah"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-emerald-900 hover:bg-emerald-100/60"
            }`}
          >
            Dhommah (ـُ)
          </button>
        </div>

        {/* Big Arabic Letter Display */}
        <div
          onClick={handleSpeakCurrent}
          className="cursor-pointer active:scale-95 transition-transform my-2 group select-none"
          title="Klik untuk mendengarkan pelafalan huruf!"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white flex items-center justify-center border-4 border-emerald-300 shadow-inner group-hover:border-emerald-400 group-hover:shadow-lg transition-all mx-auto">
            <span
              className="text-7xl sm:text-8xl font-black text-emerald-800 leading-none select-none tracking-normal"
              dir="rtl"
              style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', 'Amiri', serif" }}
            >
              {currentDisplay.arabic}
            </span>
          </div>
        </div>

        {/* Letter Name & Sound Badges */}
        <div className="mt-2 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/70 text-emerald-800 rounded-full font-bold text-xs">
            <span>Mode: {currentDisplay.label}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-wide">
            {activeHarakat === "asli" ? selectedLetter.name : currentDisplay.sound}
          </h3>
          <p className="text-sm font-semibold text-slate-500">
            {activeHarakat === "asli"
              ? `Huruf ${selectedLetter.transliteration}`
              : `Dibaca: "${currentDisplay.sound}"`}
          </p>
        </div>

        {/* Example Word Card */}
        <div
          onClick={handleSpeakExample}
          className="mt-4 p-3 bg-emerald-50 hover:bg-emerald-100/80 rounded-2xl border-2 border-dashed border-emerald-300 flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-98 max-w-sm w-full"
          title="Klik untuk mendengar contoh kata!"
        >
          <div className="flex items-center gap-3 text-left">
            <span className="text-3xl sm:text-4xl select-none">{selectedLetter.example.emoji}</span>
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-bold text-lg text-emerald-900 leading-none"
                  dir="rtl"
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {selectedLetter.example.wordArabic}
                </span>
                <span className="font-extrabold text-sm text-slate-700">
                  ({selectedLetter.example.wordLatin})
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                Artinya: {selectedLetter.example.meaning}
              </p>
            </div>
          </div>
          <Volume2 className="w-5 h-5 text-emerald-600 shrink-0" />
        </div>

        {/* Listen Button */}
        <button
          onClick={handleSpeakCurrent}
          className="mt-5 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center gap-2 active:scale-95 transition-all cursor-pointer text-sm sm:text-base"
        >
          <Volume2 className="w-5 h-5" />
          <span>Dengarkan Suara</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </button>
      </div>

      {/* 28 Hijaiyah Letters Grid */}
      <div className="bg-white/85 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-slate-200 max-w-4xl mx-auto">
        <h4 className="text-center font-bold text-slate-700 mb-3 text-sm sm:text-base flex items-center justify-center gap-2">
          <span>Pilih huruf Hijaiyah yang ingin dipelajari:</span>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            {HIJAIYAH_LIST.length} Huruf
          </span>
        </h4>
        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 gap-2 sm:gap-3" dir="rtl">
          {HIJAIYAH_LIST.map((item) => {
            const isSelected = item.arabic === selectedLetter.arabic;
            return (
              <button
                key={item.arabic}
                onClick={() => handleSelectLetter(item)}
                className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer border-3 ${
                  isSelected
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-white shadow-lg scale-105 ring-4 ring-emerald-300 z-10"
                    : `${item.bgColor} hover:bg-white text-slate-800 ${item.borderColor} hover:shadow-md active:scale-95`
                }`}
                title={`Huruf ${item.name}`}
              >
                <span
                  className={`text-2xl sm:text-3xl font-black leading-tight ${
                    isSelected ? "text-white" : item.color
                  }`}
                  style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif" }}
                >
                  {item.arabic}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-bold mt-0.5 ${
                    isSelected ? "text-emerald-100" : "text-slate-600"
                  }`}
                  dir="ltr"
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
