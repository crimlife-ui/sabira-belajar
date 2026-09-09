export interface SpellingWord {
  id: string;
  word: string; // e.g. "BOLA"
  syllables: string[]; // ["BO", "LA"]
  emoji: string;
  hint: string;
  color: string;
}

export const SPELLING_WORDS: SpellingWord[] = [
  { id: "bola", word: "BOLA", syllables: ["BO", "LA"], emoji: "⚽", hint: "Benda bulat untuk ditendang", color: "from-blue-400 to-indigo-500" },
  { id: "buku", word: "BUKU", syllables: ["BU", "KU"], emoji: "📚", hint: "Tempat membaca cerita", color: "from-emerald-400 to-teal-500" },
  { id: "apel", word: "APEL", syllables: ["A", "PEL"], emoji: "🍎", hint: "Buah manis berwarna merah", color: "from-red-400 to-rose-500" },
  { id: "sapi", word: "SAPI", syllables: ["SA", "PI"], emoji: "🐮", hint: "Hewan yang menghasilkan susu", color: "from-amber-400 to-orange-500" },
  { id: "roti", word: "ROTI", syllables: ["RO", "TI"], emoji: "🍞", hint: "Makanan lezat untuk sarapan", color: "from-yellow-400 to-amber-500" },
  { id: "ikan", word: "IKAN", syllables: ["I", "KAN"], emoji: "🐟", hint: "Hewan yang berenang di air", color: "from-cyan-400 to-blue-500" },
  { id: "ayam", word: "AYAM", syllables: ["A", "YAM"], emoji: "🐔", hint: "Hewan yang berkokok kukuruyuk", color: "from-rose-400 to-pink-500" },
  { id: "meja", word: "MEJA", syllables: ["ME", "JA"], emoji: "🪵", hint: "Tempat meletakkan buku", color: "from-orange-400 to-amber-600" },
  { id: "topi", word: "TOPI", syllables: ["TO", "PI"], emoji: "🧢", hint: "Dipakai di kepala saat panas", color: "from-violet-400 to-purple-500" },
  { id: "susu", word: "SUSU", syllables: ["SU", "SU"], emoji: "🥛", hint: "Minuman sehat bikin kuat", color: "from-sky-300 to-blue-400" },
  { id: "kuda", word: "KUDA", syllables: ["KU", "DA"], emoji: "🐴", hint: "Hewan gagah bisa berlari kencang", color: "from-amber-500 to-orange-600" },
  { id: "mata", word: "MATA", syllables: ["MA", "TA"], emoji: "👀", hint: "Untuk melihat hal indah", color: "from-pink-400 to-purple-500" }
];
