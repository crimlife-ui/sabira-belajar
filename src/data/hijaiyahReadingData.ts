// Data for Basic Arabic Reading (A-Ba-Ta) and Connected Hijaiyah Letters

export interface BasicReadingItem {
  id: string;
  category: "2-huruf" | "3-berurutan" | "kata-kombinasi";
  fullArabic: string; // Teks lengkap, e.g. "اَ بَ تَ" atau "كَتَبَ"
  fullLatin: string; // "A - Ba - Ta" atau "Ka-Ta-Ba"
  letters: {
    arabic: string; // e.g. "اَ"
    latin: string; // "A"
    color: string;
    bgColor: string;
  }[];
  meaning?: string;
}

export const BASIC_READING_LIST: BasicReadingItem[] = [
  // --- 2 HURUF DASAR ---
  {
    id: "2-1",
    category: "2-huruf",
    fullArabic: "اَ بَ",
    fullLatin: "A - Ba",
    letters: [
      { arabic: "اَ", latin: "A", color: "text-emerald-700", bgColor: "bg-emerald-100" },
      { arabic: "بَ", latin: "Ba", color: "text-blue-700", bgColor: "bg-blue-100" },
    ],
  },
  {
    id: "2-2",
    category: "2-huruf",
    fullArabic: "بَ تَ",
    fullLatin: "Ba - Ta",
    letters: [
      { arabic: "بَ", latin: "Ba", color: "text-blue-700", bgColor: "bg-blue-100" },
      { arabic: "تَ", latin: "Ta", color: "text-rose-700", bgColor: "bg-rose-100" },
    ],
  },
  {
    id: "2-3",
    category: "2-huruf",
    fullArabic: "تَ ثَ",
    fullLatin: "Ta - Tsa",
    letters: [
      { arabic: "تَ", latin: "Ta", color: "text-rose-700", bgColor: "bg-rose-100" },
      { arabic: "ثَ", latin: "Tsa", color: "text-amber-700", bgColor: "bg-amber-100" },
    ],
  },
  {
    id: "2-4",
    category: "2-huruf",
    fullArabic: "جَ حَ",
    fullLatin: "Ja - Ha",
    letters: [
      { arabic: "جَ", latin: "Ja", color: "text-teal-700", bgColor: "bg-teal-100" },
      { arabic: "حَ", latin: "Ha", color: "text-orange-700", bgColor: "bg-orange-100" },
    ],
  },
  {
    id: "2-5",
    category: "2-huruf",
    fullArabic: "دَ ذَ",
    fullLatin: "Da - Dza",
    letters: [
      { arabic: "دَ", latin: "Da", color: "text-cyan-700", bgColor: "bg-cyan-100" },
      { arabic: "ذَ", latin: "Dza", color: "text-purple-700", bgColor: "bg-purple-100" },
    ],
  },
  {
    id: "2-6",
    category: "2-huruf",
    fullArabic: "رَ زَ",
    fullLatin: "Ro - Za",
    letters: [
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
      { arabic: "زَ", latin: "Za", color: "text-lime-700", bgColor: "bg-lime-100" },
    ],
  },
  {
    id: "2-7",
    category: "2-huruf",
    fullArabic: "سَ شَ",
    fullLatin: "Sa - Sya",
    letters: [
      { arabic: "سَ", latin: "Sa", color: "text-sky-700", bgColor: "bg-sky-100" },
      { arabic: "شَ", latin: "Sya", color: "text-red-700", bgColor: "bg-red-100" },
    ],
  },
  {
    id: "2-8",
    category: "2-huruf",
    fullArabic: "صَ ضَ",
    fullLatin: "Sho - Dho",
    letters: [
      { arabic: "صَ", latin: "Sho", color: "text-amber-800", bgColor: "bg-amber-100" },
      { arabic: "ضَ", latin: "Dho", color: "text-emerald-800", bgColor: "bg-emerald-100" },
    ],
  },

  // --- 3 HURUF BERURUTAN (IQRO 1 KLASIK) ---
  {
    id: "3-1",
    category: "3-berurutan",
    fullArabic: "اَ بَ تَ",
    fullLatin: "A - Ba - Ta",
    letters: [
      { arabic: "اَ", latin: "A", color: "text-emerald-700", bgColor: "bg-emerald-100" },
      { arabic: "بَ", latin: "Ba", color: "text-blue-700", bgColor: "bg-blue-100" },
      { arabic: "تَ", latin: "Ta", color: "text-rose-700", bgColor: "bg-rose-100" },
    ],
  },
  {
    id: "3-2",
    category: "3-berurutan",
    fullArabic: "بَ تَ ثَ",
    fullLatin: "Ba - Ta - Tsa",
    letters: [
      { arabic: "بَ", latin: "Ba", color: "text-blue-700", bgColor: "bg-blue-100" },
      { arabic: "تَ", latin: "Ta", color: "text-rose-700", bgColor: "bg-rose-100" },
      { arabic: "ثَ", latin: "Tsa", color: "text-amber-700", bgColor: "bg-amber-100" },
    ],
  },
  {
    id: "3-3",
    category: "3-berurutan",
    fullArabic: "تَ ثَ جَ",
    fullLatin: "Ta - Tsa - Ja",
    letters: [
      { arabic: "تَ", latin: "Ta", color: "text-rose-700", bgColor: "bg-rose-100" },
      { arabic: "ثَ", latin: "Tsa", color: "text-amber-700", bgColor: "bg-amber-100" },
      { arabic: "جَ", latin: "Ja", color: "text-teal-700", bgColor: "bg-teal-100" },
    ],
  },
  {
    id: "3-4",
    category: "3-berurutan",
    fullArabic: "جَ حَ خَ",
    fullLatin: "Ja - Ha - Kho",
    letters: [
      { arabic: "جَ", latin: "Ja", color: "text-teal-700", bgColor: "bg-teal-100" },
      { arabic: "حَ", latin: "Ha", color: "text-orange-700", bgColor: "bg-orange-100" },
      { arabic: "خَ", latin: "Kho", color: "text-indigo-700", bgColor: "bg-indigo-100" },
    ],
  },
  {
    id: "3-5",
    category: "3-berurutan",
    fullArabic: "دَ ذَ رَ",
    fullLatin: "Da - Dza - Ro",
    letters: [
      { arabic: "دَ", latin: "Da", color: "text-cyan-700", bgColor: "bg-cyan-100" },
      { arabic: "ذَ", latin: "Dza", color: "text-purple-700", bgColor: "bg-purple-100" },
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
    ],
  },
  {
    id: "3-6",
    category: "3-berurutan",
    fullArabic: "رَ زَ سَ",
    fullLatin: "Ro - Za - Sa",
    letters: [
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
      { arabic: "زَ", latin: "Za", color: "text-lime-700", bgColor: "bg-lime-100" },
      { arabic: "سَ", latin: "Sa", color: "text-sky-700", bgColor: "bg-sky-100" },
    ],
  },
  {
    id: "3-7",
    category: "3-berurutan",
    fullArabic: "سَ شَ صَ",
    fullLatin: "Sa - Sya - Sho",
    letters: [
      { arabic: "سَ", latin: "Sa", color: "text-sky-700", bgColor: "bg-sky-100" },
      { arabic: "شَ", latin: "Sya", color: "text-red-700", bgColor: "bg-red-100" },
      { arabic: "صَ", latin: "Sho", color: "text-amber-800", bgColor: "bg-amber-100" },
    ],
  },
  {
    id: "3-8",
    category: "3-berurutan",
    fullArabic: "صَ ضَ طَ",
    fullLatin: "Sho - Dho - Tho",
    letters: [
      { arabic: "صَ", latin: "Sho", color: "text-amber-800", bgColor: "bg-amber-100" },
      { arabic: "ضَ", latin: "Dho", color: "text-emerald-800", bgColor: "bg-emerald-100" },
      { arabic: "طَ", latin: "Tho", color: "text-blue-800", bgColor: "bg-blue-100" },
    ],
  },
  {
    id: "3-9",
    category: "3-berurutan",
    fullArabic: "طَ ظَ عَ",
    fullLatin: "Tho - Zho - 'A",
    letters: [
      { arabic: "طَ", latin: "Tho", color: "text-blue-800", bgColor: "bg-blue-100" },
      { arabic: "ظَ", latin: "Zho", color: "text-violet-800", bgColor: "bg-violet-100" },
      { arabic: "عَ", latin: "'A", color: "text-teal-800", bgColor: "bg-teal-100" },
    ],
  },
  {
    id: "3-10",
    category: "3-berurutan",
    fullArabic: "عَ غَ فَ",
    fullLatin: "'A - Gho - Fa",
    letters: [
      { arabic: "عَ", latin: "'A", color: "text-teal-800", bgColor: "bg-teal-100" },
      { arabic: "غَ", latin: "Gho", color: "text-fuchsia-800", bgColor: "bg-fuchsia-100" },
      { arabic: "فَ", latin: "Fa", color: "text-rose-700", bgColor: "bg-rose-100" },
    ],
  },
  {
    id: "3-11",
    category: "3-berurutan",
    fullArabic: "فَ قَ كَ",
    fullLatin: "Fa - Qo - Ka",
    letters: [
      { arabic: "فَ", latin: "Fa", color: "text-rose-700", bgColor: "bg-rose-100" },
      { arabic: "قَ", latin: "Qo", color: "text-purple-700", bgColor: "bg-purple-100" },
      { arabic: "كَ", latin: "Ka", color: "text-indigo-700", bgColor: "bg-indigo-100" },
    ],
  },
  {
    id: "3-12",
    category: "3-berurutan",
    fullArabic: "كَ لَ مَ",
    fullLatin: "Ka - La - Ma",
    letters: [
      { arabic: "كَ", latin: "Ka", color: "text-indigo-700", bgColor: "bg-indigo-100" },
      { arabic: "لَ", latin: "La", color: "text-cyan-800", bgColor: "bg-cyan-100" },
      { arabic: "مَ", latin: "Ma", color: "text-emerald-700", bgColor: "bg-emerald-100" },
    ],
  },
  {
    id: "3-13",
    category: "3-berurutan",
    fullArabic: "مَ نَ وَ",
    fullLatin: "Ma - Na - Wa",
    letters: [
      { arabic: "مَ", latin: "Ma", color: "text-emerald-700", bgColor: "bg-emerald-100" },
      { arabic: "نَ", latin: "Na", color: "text-orange-700", bgColor: "bg-orange-100" },
      { arabic: "وَ", latin: "Wa", color: "text-amber-700", bgColor: "bg-amber-100" },
    ],
  },
  {
    id: "3-14",
    category: "3-berurutan",
    fullArabic: "هَـ لاَ يَ",
    fullLatin: "Ha - La - Ya",
    letters: [
      { arabic: "هَـ", latin: "Ha", color: "text-teal-700", bgColor: "bg-teal-100" },
      { arabic: "لاَ", latin: "La", color: "text-indigo-700", bgColor: "bg-indigo-100" },
      { arabic: "يَ", latin: "Ya", color: "text-sky-700", bgColor: "bg-sky-100" },
    ],
  },

  // --- KATA KOMBINASI 3 HURUF BERMAKNA ---
  {
    id: "k-1",
    category: "kata-kombinasi",
    fullArabic: "بَ دَ رَ",
    fullLatin: "Ba - Da - Ro",
    meaning: "Bulan Purnama",
    letters: [
      { arabic: "بَ", latin: "Ba", color: "text-blue-700", bgColor: "bg-blue-100" },
      { arabic: "دَ", latin: "Da", color: "text-cyan-700", bgColor: "bg-cyan-100" },
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
    ],
  },
  {
    id: "k-2",
    category: "kata-kombinasi",
    fullArabic: "دَ رَ سَ",
    fullLatin: "Da - Ro - Sa",
    meaning: "Belajar",
    letters: [
      { arabic: "دَ", latin: "Da", color: "text-cyan-700", bgColor: "bg-cyan-100" },
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
      { arabic: "سَ", latin: "Sa", color: "text-sky-700", bgColor: "bg-sky-100" },
    ],
  },
  {
    id: "k-3",
    category: "kata-kombinasi",
    fullArabic: "كَتَبَ",
    fullLatin: "Ka - Ta - Ba",
    meaning: "Menulis",
    letters: [
      { arabic: "كَ", latin: "Ka", color: "text-indigo-700", bgColor: "bg-indigo-100" },
      { arabic: "تَ", latin: "Ta", color: "text-rose-700", bgColor: "bg-rose-100" },
      { arabic: "بَ", latin: "Ba", color: "text-blue-700", bgColor: "bg-blue-100" },
    ],
  },
  {
    id: "k-4",
    category: "kata-kombinasi",
    fullArabic: "سَجَدَ",
    fullLatin: "Sa - Ja - Da",
    meaning: "Sujud",
    letters: [
      { arabic: "سَ", latin: "Sa", color: "text-sky-700", bgColor: "bg-sky-100" },
      { arabic: "جَ", latin: "Ja", color: "text-teal-700", bgColor: "bg-teal-100" },
      { arabic: "دَ", latin: "Da", color: "text-cyan-700", bgColor: "bg-cyan-100" },
    ],
  },
  {
    id: "k-5",
    category: "kata-kombinasi",
    fullArabic: "قَرَأَ",
    fullLatin: "Qo - Ro - A",
    meaning: "Membaca",
    letters: [
      { arabic: "قَ", latin: "Qo", color: "text-purple-700", bgColor: "bg-purple-100" },
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
      { arabic: "أَ", latin: "A", color: "text-emerald-700", bgColor: "bg-emerald-100" },
    ],
  },
  {
    id: "k-6",
    category: "kata-kombinasi",
    fullArabic: "نَصَرَ",
    fullLatin: "Na - Sho - Ro",
    meaning: "Menolong",
    letters: [
      { arabic: "نَ", latin: "Na", color: "text-orange-700", bgColor: "bg-orange-100" },
      { arabic: "صَ", latin: "Sho", color: "text-amber-800", bgColor: "bg-amber-100" },
      { arabic: "رَ", latin: "Ro", color: "text-pink-700", bgColor: "bg-pink-100" },
    ],
  },
  {
    id: "k-7",
    category: "kata-kombinasi",
    fullArabic: "جَلَسَ",
    fullLatin: "Ja - La - Sa",
    meaning: "Duduk",
    letters: [
      { arabic: "جَ", latin: "Ja", color: "text-teal-700", bgColor: "bg-teal-100" },
      { arabic: "لَ", latin: "La", color: "text-cyan-800", bgColor: "bg-cyan-100" },
      { arabic: "سَ", latin: "Sa", color: "text-sky-700", bgColor: "bg-sky-100" },
    ],
  },
  {
    id: "k-8",
    category: "kata-kombinasi",
    fullArabic: "خَلَقَ",
    fullLatin: "Kho - La - Qo",
    meaning: "Menciptakan",
    letters: [
      { arabic: "خَ", latin: "Kho", color: "text-indigo-700", bgColor: "bg-indigo-100" },
      { arabic: "لَ", latin: "La", color: "text-cyan-800", bgColor: "bg-cyan-100" },
      { arabic: "قَ", latin: "Qo", color: "text-purple-700", bgColor: "bg-purple-100" },
    ],
  },
];

// --- DATA HURUF HIJAIYAH SAMBUNG (4 BENTUK: TUNGGAL, AWAL, TENGAH, AKHIR) ---
export interface ConnectedLetterItem {
  name: string;
  isolated: string; // Bentuk tunggal / lepas
  initial: string; // Di awal kata
  medial: string; // Di tengah kata
  final: string; // Di akhir kata
  canConnectLeft: boolean; // Huruf yang tidak bisa menyambung ke kiri: ا, د, ذ, ر, ز, و
  exampleWord: string;
  exampleTransliteration: string;
}

export const CONNECTED_LETTERS_LIST: ConnectedLetterItem[] = [
  { name: "Alif", isolated: "ا", initial: "ا", medial: "ـا", final: "ـا", canConnectLeft: false, exampleWord: "أَسَدٌ", exampleTransliteration: "Asad" },
  { name: "Ba", isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب", canConnectLeft: true, exampleWord: "بَيْتٌ", exampleTransliteration: "Bait" },
  { name: "Ta", isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت", canConnectLeft: true, exampleWord: "كِتَابٌ", exampleTransliteration: "Kitab" },
  { name: "Tsa", isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث", canConnectLeft: true, exampleWord: "ثَعْلَبٌ", exampleTransliteration: "Tsa'lab" },
  { name: "Jim", isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج", canConnectLeft: true, exampleWord: "مَسْجِدٌ", exampleTransliteration: "Masjid" },
  { name: "Ha", isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح", canConnectLeft: true, exampleWord: "حَبْلٌ", exampleTransliteration: "Habl" },
  { name: "Kho", isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ", canConnectLeft: true, exampleWord: "نَخْلَةٌ", exampleTransliteration: "Nakhlah" },
  { name: "Dal", isolated: "د", initial: "د", medial: "ـد", final: "ـد", canConnectLeft: false, exampleWord: "دَرْسٌ", exampleTransliteration: "Dars" },
  { name: "Dzal", isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ", canConnectLeft: false, exampleWord: "ذِئْبٌ", exampleTransliteration: "Dzi'b" },
  { name: "Ro", isolated: "ر", initial: "ر", medial: "ـر", final: "ـر", canConnectLeft: false, exampleWord: "رَأْسٌ", exampleTransliteration: "Ra's" },
  { name: "Zay", isolated: "ز", initial: "ز", medial: "ـز", final: "ـز", canConnectLeft: false, exampleWord: "زَهْرَةٌ", exampleTransliteration: "Zahrah" },
  { name: "Sin", isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس", canConnectLeft: true, exampleWord: "شَمْسٌ", exampleTransliteration: "Syams" },
  { name: "Syin", isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش", canConnectLeft: true, exampleWord: "شَجَرَةٌ", exampleTransliteration: "Syajarah" },
  { name: "Shod", isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص", canConnectLeft: true, exampleWord: "صَبَاحٌ", exampleTransliteration: "Shabah" },
  { name: "Dhod", isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض", canConnectLeft: true, exampleWord: "أَرْضٌ", exampleTransliteration: "Ardh" },
  { name: "Tho", isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط", canConnectLeft: true, exampleWord: "مَطَرٌ", exampleTransliteration: "Mathar" },
  { name: "Zho", isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ", canConnectLeft: true, exampleWord: "ظِلٌّ", exampleTransliteration: "Zhill" },
  { name: "'Ain", isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع", canConnectLeft: true, exampleWord: "عِلْمٌ", exampleTransliteration: "'Ilm" },
  { name: "Ghoin", isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ", canConnectLeft: true, exampleWord: "غَابَةٌ", exampleTransliteration: "Ghabah" },
  { name: "Fa", isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف", canConnectLeft: true, exampleWord: "فَمٌ", exampleTransliteration: "Fam" },
  { name: "Qof", isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق", canConnectLeft: true, exampleWord: "قَلَمٌ", exampleTransliteration: "Qalam" },
  { name: "Kaf", isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك", canConnectLeft: true, exampleWord: "كَلْبٌ", exampleTransliteration: "Kalb" },
  { name: "Lam", isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل", canConnectLeft: true, exampleWord: "لَيْلٌ", exampleTransliteration: "Lail" },
  { name: "Mim", isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم", canConnectLeft: true, exampleWord: "مَاءٌ", exampleTransliteration: "Maa'" },
  { name: "Nun", isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن", canConnectLeft: true, exampleWord: "نُوْرٌ", exampleTransliteration: "Nuur" },
  { name: "Ha", isolated: "هـ", initial: "هـ", medial: "ـهـ", final: "ـه", canConnectLeft: true, exampleWord: "هَدِيَّةٌ", exampleTransliteration: "Hadiyyah" },
  { name: "Waw", isolated: "و", initial: "و", medial: "ـو", final: "ـو", canConnectLeft: false, exampleWord: "وَلَدٌ", exampleTransliteration: "Walad" },
  { name: "Ya", isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي", canConnectLeft: true, exampleWord: "يَوْمٌ", exampleTransliteration: "Yaum" },
];

// Contoh Penggabungan Kata Sambung Interaktif
export interface WordJoiningExample {
  id: string;
  separateParts: { letter: string; name: string; position: "awal" | "tengah" | "akhir" | "tunggal" }[];
  connectedWord: string;
  transliteration: string;
  meaning: string;
  emoji: string;
}

export const WORD_JOINING_EXAMPLES: WordJoiningExample[] = [
  {
    id: "wj-1",
    separateParts: [
      { letter: "كَ", name: "Kaf (Awal)", position: "awal" },
      { letter: "تَ", name: "Ta (Tengah)", position: "tengah" },
      { letter: "بَ", name: "Ba (Akhir)", position: "akhir" },
    ],
    connectedWord: "كَتَبَ",
    transliteration: "Ka - Ta - Ba",
    meaning: "Menulis",
    emoji: "✍️",
  },
  {
    id: "wj-2",
    separateParts: [
      { letter: "سَ", name: "Sin (Awal)", position: "awal" },
      { letter: "جَ", name: "Jim (Tengah)", position: "tengah" },
      { letter: "دَ", name: "Dal (Akhir)", position: "akhir" },
    ],
    connectedWord: "سَجَدَ",
    transliteration: "Sa - Ja - Da",
    meaning: "Sujud / Sholat",
    emoji: "🕌",
  },
  {
    id: "wj-3",
    separateParts: [
      { letter: "عَ", name: "'Ain (Awal)", position: "awal" },
      { letter: "لِ", name: "Lam (Tengah)", position: "tengah" },
      { letter: "مَ", name: "Mim (Akhir)", position: "akhir" },
    ],
    connectedWord: "عَلِمَ",
    transliteration: "'A - Li - Ma",
    meaning: "Mengetahui / Belajar",
    emoji: "💡",
  },
  {
    id: "wj-4",
    separateParts: [
      { letter: "نَ", name: "Nun (Awal)", position: "awal" },
      { letter: "صَ", name: "Shod (Tengah)", position: "tengah" },
      { letter: "رَ", name: "Ro (Akhir)", position: "akhir" },
    ],
    connectedWord: "نَصَرَ",
    transliteration: "Na - Sho - Ro",
    meaning: "Menolong",
    emoji: "🤝",
  },
  {
    id: "wj-5",
    separateParts: [
      { letter: "جَ", name: "Jim (Awal)", position: "awal" },
      { letter: "لَ", name: "Lam (Tengah)", position: "tengah" },
      { letter: "سَ", name: "Sin (Akhir)", position: "akhir" },
    ],
    connectedWord: "جَلَسَ",
    transliteration: "Ja - La - Sa",
    meaning: "Duduk",
    emoji: "🪑",
  },
  {
    id: "wj-6",
    separateParts: [
      { letter: "بَ", name: "Ba (Awal)", position: "awal" },
      { letter: "يْ", name: "Ya Sukun (Tengah)", position: "tengah" },
      { letter: "تٌ", name: "Ta (Akhir)", position: "akhir" },
    ],
    connectedWord: "بَيْتٌ",
    transliteration: "Bait",
    meaning: "Rumah",
    emoji: "🏠",
  },
  {
    id: "wj-7",
    separateParts: [
      { letter: "قَ", name: "Qof (Awal)", position: "awal" },
      { letter: "لَ", name: "Lam (Tengah)", position: "tengah" },
      { letter: "مٌ", name: "Mim (Akhir)", position: "akhir" },
    ],
    connectedWord: "قَلَمٌ",
    transliteration: "Qalam",
    meaning: "Pena / Pulpen",
    emoji: "✏️",
  },
  {
    id: "wj-8",
    separateParts: [
      { letter: "وَ", name: "Waw (Awal - Tak Nyambung Kiri)", position: "awal" },
      { letter: "لَ", name: "Lam (Tengah)", position: "tengah" },
      { letter: "دٌ", name: "Dal (Akhir)", position: "akhir" },
    ],
    connectedWord: "وَلَدٌ",
    transliteration: "Walad",
    meaning: "Anak Laki-laki",
    emoji: "👦",
  },
];
