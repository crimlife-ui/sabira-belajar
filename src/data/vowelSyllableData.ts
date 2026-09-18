// Data for Indonesian Phonics: Vowel Syllables (KV) & Closed Syllables with Endings (KVK)

export interface SyllableItem {
  syllable: string; // e.g. "da", "tak"
  vowel: "a" | "i" | "u" | "e" | "o";
  exampleWord: string; // e.g. "dadu", "kotak"
  emoji: string; // e.g. "🎲", "📦"
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface ConsonantSyllableGroup {
  consonant: string; // e.g. "D"
  label: string; // e.g. "Huruf D (da - di - du - de - do)"
  badgeColor: string;
  syllables: SyllableItem[];
}

// 1. DATA SUKU KATA VOKAL DASAR (POLA KV: DA - DI - DU - DE - DO)
export const VOWEL_SYLLABLE_GROUPS: ConsonantSyllableGroup[] = [
  {
    consonant: "D",
    label: "Huruf D (da - di - du - de - do)",
    badgeColor: "bg-amber-500",
    syllables: [
      { syllable: "da", vowel: "a", exampleWord: "dadu", emoji: "🎲", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "di", vowel: "i", exampleWord: "dinosaurus", emoji: "🦕", color: "text-sky-700", bgColor: "bg-sky-50", borderColor: "border-sky-300" },
      { syllable: "du", vowel: "u", exampleWord: "duri", emoji: "🌵", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "de", vowel: "e", exampleWord: "delman", emoji: "🐴", color: "text-purple-700", bgColor: "bg-purple-50", borderColor: "border-purple-300" },
      { syllable: "do", vowel: "o", exampleWord: "donat", emoji: "🍩", color: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-300" },
    ],
  },
  {
    consonant: "B",
    label: "Huruf B (ba - bi - bu - be - bo)",
    badgeColor: "bg-blue-500",
    syllables: [
      { syllable: "ba", vowel: "a", exampleWord: "balon", emoji: "🎈", color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-300" },
      { syllable: "bi", vowel: "i", exampleWord: "bintang", emoji: "⭐", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "bu", vowel: "u", exampleWord: "buku", emoji: "📖", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "be", vowel: "e", exampleWord: "bebek", emoji: "🦆", color: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-300" },
      { syllable: "bo", vowel: "o", exampleWord: "bola", emoji: "⚽", color: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-300" },
    ],
  },
  {
    consonant: "C",
    label: "Huruf C (ca - ci - cu - ce - co)",
    badgeColor: "bg-rose-500",
    syllables: [
      { syllable: "ca", vowel: "a", exampleWord: "cabai", emoji: "🌶️", color: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-300" },
      { syllable: "ci", vowel: "i", exampleWord: "cicak", emoji: "🦎", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "cu", vowel: "u", exampleWord: "cumi", emoji: "🦑", color: "text-pink-700", bgColor: "bg-pink-50", borderColor: "border-pink-300" },
      { syllable: "ce", vowel: "e", exampleWord: "ceri", emoji: "🍒", color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-300" },
      { syllable: "co", vowel: "o", exampleWord: "cokelat", emoji: "🍫", color: "text-amber-800", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
    ],
  },
  {
    consonant: "T",
    label: "Huruf T (ta - ti - tu - te - to)",
    badgeColor: "bg-teal-500",
    syllables: [
      { syllable: "ta", vowel: "a", exampleWord: "tas", emoji: "🎒", color: "text-teal-700", bgColor: "bg-teal-50", borderColor: "border-teal-300" },
      { syllable: "ti", vowel: "i", exampleWord: "tikus", emoji: "🐭", color: "text-slate-700", bgColor: "bg-slate-50", borderColor: "border-slate-300" },
      { syllable: "tu", vowel: "u", exampleWord: "tupai", emoji: "🐿️", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "te", vowel: "e", exampleWord: "telur", emoji: "🥚", color: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-300" },
      { syllable: "to", vowel: "o", exampleWord: "topi", emoji: "🧢", color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-300" },
    ],
  },
  {
    consonant: "S",
    label: "Huruf S (sa - si - su - se - so)",
    badgeColor: "bg-emerald-500",
    syllables: [
      { syllable: "sa", vowel: "a", exampleWord: "sapi", emoji: "🐮", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "si", vowel: "i", exampleWord: "singa", emoji: "🦁", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "su", vowel: "u", exampleWord: "susu", emoji: "🥛", color: "text-sky-700", bgColor: "bg-sky-50", borderColor: "border-sky-300" },
      { syllable: "se", vowel: "e", exampleWord: "sepatu", emoji: "👟", color: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-300" },
      { syllable: "so", vowel: "o", exampleWord: "sosis", emoji: "🌭", color: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-300" },
    ],
  },
  {
    consonant: "K",
    label: "Huruf K (ka - ki - ku - ke - ko)",
    badgeColor: "bg-orange-500",
    syllables: [
      { syllable: "ka", vowel: "a", exampleWord: "katak", emoji: "🐸", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "ki", vowel: "i", exampleWord: "kipas", emoji: "🪭", color: "text-cyan-700", bgColor: "bg-cyan-50", borderColor: "border-cyan-300" },
      { syllable: "ku", vowel: "u", exampleWord: "kucing", emoji: "🐱", color: "text-orange-700", bgColor: "bg-orange-50", borderColor: "border-orange-300" },
      { syllable: "ke", vowel: "e", exampleWord: "kelinci", emoji: "🐰", color: "text-pink-700", bgColor: "bg-pink-50", borderColor: "border-pink-300" },
      { syllable: "ko", vowel: "o", exampleWord: "kopi", emoji: "☕", color: "text-amber-800", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
    ],
  },
  {
    consonant: "M",
    label: "Huruf M (ma - mi - mu - me - mo)",
    badgeColor: "bg-purple-500",
    syllables: [
      { syllable: "ma", vowel: "a", exampleWord: "mata", emoji: "👀", color: "text-purple-700", bgColor: "bg-purple-50", borderColor: "border-purple-300" },
      { syllable: "mi", vowel: "i", exampleWord: "minyak", emoji: "🍶", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "mu", vowel: "u", exampleWord: "mulut", emoji: "👄", color: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-300" },
      { syllable: "me", vowel: "e", exampleWord: "meja", emoji: "🪵", color: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-300" },
      { syllable: "mo", vowel: "o", exampleWord: "mobil", emoji: "🚗", color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-300" },
    ],
  },
  {
    consonant: "P",
    label: "Huruf P (pa - pi - pu - pe - po)",
    badgeColor: "bg-pink-500",
    syllables: [
      { syllable: "pa", vowel: "a", exampleWord: "payung", emoji: "☂️", color: "text-pink-700", bgColor: "bg-pink-50", borderColor: "border-pink-300" },
      { syllable: "pi", vowel: "i", exampleWord: "pisang", emoji: "🍌", color: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-300" },
      { syllable: "pu", vowel: "u", exampleWord: "pohon", emoji: "🌳", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "pe", vowel: "e", exampleWord: "pensil", emoji: "✏️", color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-300" },
      { syllable: "po", vowel: "o", exampleWord: "popcorn", emoji: "🍿", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
    ],
  },
  {
    consonant: "L",
    label: "Huruf L (la - li - lu - le - lo)",
    badgeColor: "bg-cyan-500",
    syllables: [
      { syllable: "la", vowel: "a", exampleWord: "labu", emoji: "🎃", color: "text-orange-700", bgColor: "bg-orange-50", borderColor: "border-orange-300" },
      { syllable: "li", vowel: "i", exampleWord: "lilin", emoji: "🕯️", color: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-300" },
      { syllable: "lu", vowel: "u", exampleWord: "lumba-lumba", emoji: "🐬", color: "text-cyan-700", bgColor: "bg-cyan-50", borderColor: "border-cyan-300" },
      { syllable: "le", vowel: "e", exampleWord: "lebah", emoji: "🐝", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "lo", vowel: "o", exampleWord: "lobster", emoji: "🦞", color: "text-red-700", bgColor: "bg-red-50", borderColor: "border-red-300" },
    ],
  },
  {
    consonant: "R",
    label: "Huruf R (ra - ri - ru - re - ro)",
    badgeColor: "bg-indigo-500",
    syllables: [
      { syllable: "ra", vowel: "a", exampleWord: "radio", emoji: "📻", color: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-300" },
      { syllable: "ri", vowel: "i", exampleWord: "ring (cincin)", emoji: "💍", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
      { syllable: "ru", vowel: "u", exampleWord: "rumah", emoji: "🏠", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "re", vowel: "e", exampleWord: "reog", emoji: "🦁", color: "text-purple-700", bgColor: "bg-purple-50", borderColor: "border-purple-300" },
      { syllable: "ro", vowel: "o", exampleWord: "roti", emoji: "🍞", color: "text-amber-800", bgColor: "bg-amber-50", borderColor: "border-amber-300" },
    ],
  },
  {
    consonant: "G",
    label: "Huruf G (ga - gi - gu - ge - go)",
    badgeColor: "bg-lime-600",
    syllables: [
      { syllable: "ga", vowel: "a", exampleWord: "gajah", emoji: "🐘", color: "text-slate-700", bgColor: "bg-slate-50", borderColor: "border-slate-300" },
      { syllable: "gi", vowel: "i", exampleWord: "gitar", emoji: "🎸", color: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-300" },
      { syllable: "gu", vowel: "u", exampleWord: "gunung", emoji: "⛰️", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "ge", vowel: "e", exampleWord: "gelas", emoji: "🥛", color: "text-cyan-700", bgColor: "bg-cyan-50", borderColor: "border-cyan-300" },
      { syllable: "go", vowel: "o", exampleWord: "gorila", emoji: "🦍", color: "text-slate-800", bgColor: "bg-slate-50", borderColor: "border-slate-300" },
    ],
  },
  {
    consonant: "N",
    label: "Huruf N (na - ni - nu - ne - no)",
    badgeColor: "bg-emerald-600",
    syllables: [
      { syllable: "na", vowel: "a", exampleWord: "nanas", emoji: "🍍", color: "text-yellow-700", bgColor: "bg-yellow-50", borderColor: "border-yellow-300" },
      { syllable: "ni", vowel: "i", exampleWord: "ninja", emoji: "🥷", color: "text-slate-700", bgColor: "bg-slate-50", borderColor: "border-slate-300" },
      { syllable: "nu", vowel: "u", exampleWord: "nuri (burung)", emoji: "🦜", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300" },
      { syllable: "ne", vowel: "e", exampleWord: "nenek", emoji: "👵", color: "text-pink-700", bgColor: "bg-pink-50", borderColor: "border-pink-300" },
      { syllable: "no", vowel: "o", exampleWord: "nomor", emoji: "🔢", color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-300" },
    ],
  },
];

// 2. DATA SUKU KATA TERTUTUP DENGAN IMBUHAN (POLA KVK: TAK-TIK-TUK, TANG-TING-TUNG, BAT-BIT-BUT)
export interface EndingPreset {
  ending: string; // e.g. "k", "ng", "t", "n", "m", "p", "s"
  name: string; // e.g. "Imbuhan Akhir -k"
  description: string; // e.g. "Bunyi tutup lidah belakang: tak, tik, tuk, tek, tok"
  consonantExamples: {
    consonant: string;
    items: {
      syllable: string;
      vowel: "a" | "i" | "u" | "e" | "o";
      exampleWord: string;
      emoji: string;
    }[];
  }[];
}

export const ENDING_PRESETS: EndingPreset[] = [
  // --- IMBUHAN -K (tak, tik, tuk, tek, tok) ---
  {
    ending: "k",
    name: "Akhiran -K",
    description: "Bunyi letup henti: tak, tik, tuk, tek, tok",
    consonantExamples: [
      {
        consonant: "T",
        items: [
          { syllable: "tak", vowel: "a", exampleWord: "kotak", emoji: "📦" },
          { syllable: "tik", vowel: "i", exampleWord: "itik", emoji: "🦆" },
          { syllable: "tuk", vowel: "u", exampleWord: "batuk", emoji: "😷" },
          { syllable: "tek", vowel: "e", exampleWord: "arsitek", emoji: "📐" },
          { syllable: "tok", vowel: "o", exampleWord: "ketok", emoji: "🚪" },
        ],
      },
      {
        consonant: "B",
        items: [
          { syllable: "bak", vowel: "a", exampleWord: "ombak", emoji: "🌊" },
          { syllable: "bik", vowel: "i", exampleWord: "bibik", emoji: "👩" },
          { syllable: "buk", vowel: "u", exampleWord: "serbuk", emoji: "🌸" },
          { syllable: "bek", vowel: "e", exampleWord: "robek", emoji: "📄" },
          { syllable: "bok", vowel: "o", exampleWord: "tembok", emoji: "🧱" },
        ],
      },
      {
        consonant: "S",
        items: [
          { syllable: "sak", vowel: "a", exampleWord: "rusak", emoji: "🛠️" },
          { syllable: "sik", vowel: "i", exampleWord: "musik", emoji: "🎵" },
          { syllable: "suk", vowel: "u", exampleWord: "masuk", emoji: "🚪" },
          { syllable: "sek", vowel: "e", exampleWord: "gesek", emoji: "🎻" },
          { syllable: "sok", vowel: "o", exampleWord: "besok", emoji: "📅" },
        ],
      },
      {
        consonant: "K",
        items: [
          { syllable: "kak", vowel: "a", exampleWord: "kakak", emoji: "👧" },
          { syllable: "kik", vowel: "i", exampleWord: "pekik", emoji: "📢" },
          { syllable: "kuk", vowel: "u", exampleWord: "tekuk", emoji: "🤸" },
          { syllable: "kek", vowel: "e", exampleWord: "kakek", emoji: "👴" },
          { syllable: "kok", vowel: "o", exampleWord: "mangkok", emoji: "🥣" },
        ],
      },
    ],
  },

  // --- IMBUHAN -NG (tang, ting, tung, teng, tong) ---
  {
    ending: "ng",
    name: "Akhiran -NG",
    description: "Bunyi sengau dengung: tang, ting, tung, teng, tong",
    consonantExamples: [
      {
        consonant: "T",
        items: [
          { syllable: "tang", vowel: "a", exampleWord: "bintang", emoji: "⭐" },
          { syllable: "ting", vowel: "i", exampleWord: "gunting", emoji: "✂️" },
          { syllable: "tung", vowel: "u", exampleWord: "hitung", emoji: "🔢" },
          { syllable: "teng", vowel: "e", exampleWord: "benteng", emoji: "🏰" },
          { syllable: "tong", vowel: "o", exampleWord: "kantong", emoji: "🛍️" },
        ],
      },
      {
        consonant: "B",
        items: [
          { syllable: "bang", vowel: "a", exampleWord: "terbang", emoji: "🕊️" },
          { syllable: "bing", vowel: "i", exampleWord: "kambing", emoji: "🐐" },
          { syllable: "bung", vowel: "u", exampleWord: "tabung", emoji: "🏺" },
          { syllable: "beng", vowel: "e", exampleWord: "bengkok", emoji: "🪝" },
          { syllable: "bong", vowel: "o", exampleWord: "sombong", emoji: "🦁" },
        ],
      },
      {
        consonant: "K",
        items: [
          { syllable: "kang", vowel: "a", exampleWord: "tukang", emoji: "🔨" },
          { syllable: "king", vowel: "i", exampleWord: "kelingking", emoji: "🤙" },
          { syllable: "kung", vowel: "u", exampleWord: "kukung", emoji: "🦉" },
          { syllable: "keng", vowel: "e", exampleWord: "cengeng", emoji: "😢" },
          { syllable: "kong", vowel: "o", exampleWord: "singkong", emoji: "🍠" },
        ],
      },
      {
        consonant: "P",
        items: [
          { syllable: "pang", vowel: "a", exampleWord: "pedang", emoji: "⚔️" },
          { syllable: "ping", vowel: "i", exampleWord: "cuping", emoji: "👂" },
          { syllable: "pung", vowel: "u", exampleWord: "kampung", emoji: "🏡" },
          { syllable: "peng", vowel: "e", exampleWord: "topeng", emoji: "🎭" },
          { syllable: "pong", vowel: "o", exampleWord: "pingpong", emoji: "🏓" },
        ],
      },
    ],
  },

  // --- IMBUHAN -T (bat, bit, but, bet, bot / tat, tit, tut, tet, tot) ---
  {
    ending: "t",
    name: "Akhiran -T",
    description: "Bunyi sentuh lidah gigi: bat, bit, but / tat, tit, tut",
    consonantExamples: [
      {
        consonant: "B",
        items: [
          { syllable: "bat", vowel: "a", exampleWord: "obat", emoji: "💊" },
          { syllable: "bit", vowel: "i", exampleWord: "terbit", emoji: "🌅" },
          { syllable: "but", vowel: "u", exampleWord: "rambut", emoji: "💇" },
          { syllable: "bet", vowel: "e", exampleWord: "lebet", emoji: "🍇" },
          { syllable: "bot", vowel: "o", exampleWord: "robot", emoji: "🤖" },
        ],
      },
      {
        consonant: "T",
        items: [
          { syllable: "tat", vowel: "a", exampleWord: "catat", emoji: "📝" },
          { syllable: "tit", vowel: "i", exampleWord: "titit", emoji: "🐥" },
          { syllable: "tut", vowel: "u", exampleWord: "tutut", emoji: "🚂" },
          { syllable: "tet", vowel: "e", exampleWord: "petet", emoji: "🌾" },
          { syllable: "tot", vowel: "o", exampleWord: "totot", emoji: "🎺" },
        ],
      },
      {
        consonant: "K",
        items: [
          { syllable: "kat", vowel: "a", exampleWord: "dekat", emoji: "📍" },
          { syllable: "kit", vowel: "i", exampleWord: "bukit", emoji: "⛰️" },
          { syllable: "kut", vowel: "u", exampleWord: "lumut", emoji: "🌿" },
          { syllable: "ket", vowel: "e", exampleWord: "paket", emoji: "📦" },
          { syllable: "kot", vowel: "o", exampleWord: "maskot", emoji: "🧸" },
        ],
      },
      {
        consonant: "L",
        items: [
          { syllable: "lat", vowel: "a", exampleWord: "lalat", emoji: "🪰" },
          { syllable: "lit", vowel: "i", exampleWord: "kulit", emoji: "🧴" },
          { syllable: "lut", vowel: "u", exampleWord: "lutut", emoji: "🦵" },
          { syllable: "let", vowel: "e", exampleWord: "outlet", emoji: "🏬" },
          { syllable: "lot", vowel: "o", exampleWord: "pilot", emoji: "👨‍✈️" },
        ],
      },
    ],
  },

  // --- IMBUHAN -N (ban, bin, bun, ben, bon) ---
  {
    ending: "n",
    name: "Akhiran -N",
    description: "Bunyi sengau depan: ban, bin, bun, ben, bon",
    consonantExamples: [
      {
        consonant: "B",
        items: [
          { syllable: "ban", vowel: "a", exampleWord: "ban", emoji: "🛞" },
          { syllable: "bin", vowel: "i", exampleWord: "kabinet", emoji: "🗄️" },
          { syllable: "bun", vowel: "u", exampleWord: "sabun", emoji: "🧼" },
          { syllable: "ben", vowel: "e", exampleWord: "bensin", emoji: "⛽" },
          { syllable: "bon", vowel: "o", exampleWord: "kebon", emoji: "🌳" },
        ],
      },
      {
        consonant: "P",
        items: [
          { syllable: "pan", vowel: "a", exampleWord: "depan", emoji: "➡️" },
          { syllable: "pin", vowel: "i", exampleWord: "pintu", emoji: "🚪" },
          { syllable: "pun", vowel: "u", exampleWord: "ampun", emoji: "🙏" },
          { syllable: "pen", vowel: "e", exampleWord: "pulpen", emoji: "🖊️" },
          { syllable: "pon", vowel: "o", exampleWord: "telepon", emoji: "☎️" },
        ],
      },
    ],
  },

  // --- IMBUHAN -R (bar, bir, bur, ber, bor) ---
  {
    ending: "r",
    name: "Akhiran -R",
    description: "Bunyi getar lidah: bar, bir, bur, ber, bor",
    consonantExamples: [
      {
        consonant: "B",
        items: [
          { syllable: "bar", vowel: "a", exampleWord: "gambar", emoji: "🖼️" },
          { syllable: "bir", vowel: "i", exampleWord: "bibir", emoji: "👄" },
          { syllable: "bur", vowel: "u", exampleWord: "bubur", emoji: "🥣" },
          { syllable: "ber", vowel: "e", exampleWord: "ember", emoji: "🪣" },
          { syllable: "bor", vowel: "o", exampleWord: "obor", emoji: "🔥" },
        ],
      },
      {
        consonant: "P",
        items: [
          { syllable: "par", vowel: "a", exampleWord: "lempar", emoji: "⚾" },
          { syllable: "pir", vowel: "i", exampleWord: "supir", emoji: "🚗" },
          { syllable: "pur", vowel: "u", exampleWord: "dapur", emoji: "🍳" },
          { syllable: "per", vowel: "e", exampleWord: "lemper", emoji: "🍙" },
          { syllable: "por", vowel: "o", exampleWord: "kompor", emoji: "🔥" },
        ],
      },
    ],
  },
];
