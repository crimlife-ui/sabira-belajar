// Data modul Belajar Membaca: kata bersuku kata, kalimat sederhana,
// dan bahan kuis tebak gambar.

export interface ReadingWord {
  word: string;
  syllables: string[];
  emoji: string;
}

export interface ReadingSentence {
  text: string;
  emoji: string;
}

export const READING_WORDS: ReadingWord[] = [
  { word: "buku", syllables: ["bu", "ku"], emoji: "📚" },
  { word: "bola", syllables: ["bo", "la"], emoji: "⚽" },
  { word: "sapi", syllables: ["sa", "pi"], emoji: "🐮" },
  { word: "kucing", syllables: ["ku", "cing"], emoji: "🐱" },
  { word: "bunga", syllables: ["bu", "nga"], emoji: "🌸" },
  { word: "rumah", syllables: ["ru", "mah"], emoji: "🏠" },
  { word: "buah", syllables: ["bu", "ah"], emoji: "🍎" },
  { word: "ikan", syllables: ["i", "kan"], emoji: "🐟" },
  { word: "kuda", syllables: ["ku", "da"], emoji: "🐴" },
  { word: "topi", syllables: ["to", "pi"], emoji: "🧢" },
  { word: "baju", syllables: ["ba", "ju"], emoji: "👕" },
  { word: "sepatu", syllables: ["se", "pa", "tu"], emoji: "👟" },
  { word: "susu", syllables: ["su", "su"], emoji: "🥛" },
  { word: "roti", syllables: ["ro", "ti"], emoji: "🍞" },
  { word: "pisang", syllables: ["pi", "sang"], emoji: "🍌" },
  { word: "jeruk", syllables: ["je", "ruk"], emoji: "🍊" },
  { word: "mangga", syllables: ["mang", "ga"], emoji: "🥭" },
  { word: "mobil", syllables: ["mo", "bil"], emoji: "🚗" },
  { word: "sepeda", syllables: ["se", "pe", "da"], emoji: "🚲" },
  { word: "payung", syllables: ["pa", "yung"], emoji: "☂️" },
  { word: "bulan", syllables: ["bu", "lan"], emoji: "🌙" },
  { word: "bintang", syllables: ["bin", "tang"], emoji: "⭐" },
  { word: "awan", syllables: ["a", "wan"], emoji: "☁️" },
  { word: "hujan", syllables: ["hu", "jan"], emoji: "🌧️" },
  { word: "telur", syllables: ["te", "lur"], emoji: "🥚" },
  { word: "kue", syllables: ["kue"], emoji: "🍰" },
];

export const READING_SENTENCES: ReadingSentence[] = [
  { text: "Ini bola.", emoji: "⚽" },
  { text: "Ibu masak.", emoji: "👩‍🍳" },
  { text: "Ayah baca.", emoji: "📖" },
  { text: "Adik tertawa.", emoji: "😄" },
  { text: "Kucing lari.", emoji: "🐱" },
  { text: "Sapi makan.", emoji: "🐮" },
  { text: "Bunga indah.", emoji: "🌸" },
  { text: "Awan tinggi.", emoji: "☁️" },
  { text: "Kakak nyanyi.", emoji: "🎤" },
  { text: "Kami bermain.", emoji: "🎈" },
  { text: "Ikan berenang.", emoji: "🐟" },
  { text: "Bulan terang.", emoji: "🌙" },
];
