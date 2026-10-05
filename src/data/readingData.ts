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
  // 2 suku kata
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
  { word: "susu", syllables: ["su", "su"], emoji: "🥛" },
  { word: "roti", syllables: ["ro", "ti"], emoji: "🍞" },
  { word: "pisang", syllables: ["pi", "sang"], emoji: "🍌" },
  { word: "jeruk", syllables: ["je", "ruk"], emoji: "🍊" },
  { word: "mobil", syllables: ["mo", "bil"], emoji: "🚗" },
  { word: "payung", syllables: ["pa", "yung"], emoji: "☂️" },
  { word: "bulan", syllables: ["bu", "lan"], emoji: "🌙" },
  { word: "bintang", syllables: ["bin", "tang"], emoji: "⭐" },
  { word: "awan", syllables: ["a", "wan"], emoji: "☁️" },
  { word: "hujan", syllables: ["hu", "jan"], emoji: "🌧️" },
  { word: "telur", syllables: ["te", "lur"], emoji: "🥚" },
  { word: "kue", syllables: ["kue"], emoji: "🍰" },
  // 3 suku kata
  { word: "sepatu", syllables: ["se", "pa", "tu"], emoji: "👟" },
  { word: "sepeda", syllables: ["se", "pe", "da"], emoji: "🚲" },
  { word: "mangga", syllables: ["mang", "ga"], emoji: "🥭" },
  { word: "semangka", syllables: ["se", "mang", "ka"], emoji: "🍉" },
  { word: "stroberi", syllables: ["stro", "be", "ri"], emoji: "🍓" },
  { word: "kelapa", syllables: ["ke", "la", "pa"], emoji: "🥥" },
  { word: "jerapah", syllables: ["je", "ra", "pah"], emoji: "🦒" },
  { word: "kereta", syllables: ["ke", "re", "ta"], emoji: "🚆" },
  { word: "pesawat", syllables: ["pe", "sa", "wat"], emoji: "✈️" },
  { word: "boneka", syllables: ["bo", "ne", "ka"], emoji: "🧸" },
  { word: "sekolah", syllables: ["se", "ko", "lah"], emoji: "🏫" },
  { word: "kelinci", syllables: ["ke", "lin", "ci"], emoji: "🐰" },
  { word: "kepiting", syllables: ["ke", "pi", "ting"], emoji: "🦀" },
  { word: "penggaris", syllables: ["peng", "ga", "ris"], emoji: "📏" },
  // 4 suku kata
  { word: "kupu-kupu", syllables: ["ku", "pu", "ku", "pu"], emoji: "🦋" },
  { word: "kura-kura", syllables: ["ku", "ra", "ku", "ra"], emoji: "🐢" },
  { word: "kakatua", syllables: ["ka", "ka", "tu", "a"], emoji: "🦜" },
  { word: "keluarga", syllables: ["ke", "lu", "ar", "ga"], emoji: "👨‍👩‍👧‍👦" },
  { word: "segitiga", syllables: ["se", "gi", "ti", "ga"], emoji: "🔺" },
  { word: "belalang", syllables: ["be", "la", "lang"], emoji: "🦗" },
];

export const READING_SENTENCES: ReadingSentence[] = [
  { text: "Ini bola baru.", emoji: "⚽" },
  { text: "Ibu masak nasi.", emoji: "👩‍🍳" },
  { text: "Ayah membaca buku.", emoji: "📖" },
  { text: "Adik tertawa riang.", emoji: "😄" },
  { text: "Kucing berlari cepat.", emoji: "🐱" },
  { text: "Sapi makan rumput.", emoji: "🐮" },
  { text: "Bunga itu indah sekali.", emoji: "🌸" },
  { text: "Kami bermain bersama.", emoji: "🎈" },
  { text: "Ikan berenang di kolam.", emoji: "🐟" },
  { text: "Bulan bersinar malam ini.", emoji: "🌙" },
  { text: "Kupu-kupu hinggap di bunga.", emoji: "🦋" },
  { text: "Kura-kura berjalan pelan.", emoji: "🐢" },
  { text: "Kakak menyanyi lagu baru.", emoji: "🎤" },
  { text: "Ayah pergi dengan kereta.", emoji: "🚆" },
  { text: "Sekolah kami bersih.", emoji: "🏫" },
  { text: "Kakatua bisa berbicara.", emoji: "🦜" },
];

// Pecahan suku kata untuk setiap kata yang dipakai di kalimat,
// agar anak bisa mengeja kata-per-kata sebelum kalimat tampil utuh.
export const SENTENCE_WORD_SYLLABLES: Record<string, string[]> = {
  ini: ["i", "ni"],
  itu: ["i", "tu"],
  bola: ["bo", "la"],
  baru: ["ba", "ru"],
  ibu: ["i", "bu"],
  masak: ["ma", "sak"],
  nasi: ["na", "si"],
  ayah: ["a", "yah"],
  membaca: ["mem", "ba", "ca"],
  buku: ["bu", "ku"],
  adik: ["a", "dik"],
  tertawa: ["ter", "ta", "wa"],
  riang: ["ri", "ang"],
  kucing: ["ku", "cing"],
  berlari: ["ber", "la", "ri"],
  cepat: ["ce", "pat"],
  sapi: ["sa", "pi"],
  makan: ["ma", "kan"],
  rumput: ["rum", "put"],
  bunga: ["bu", "nga"],
  indah: ["in", "dah"],
  sekali: ["se", "ka", "li"],
  kami: ["ka", "mi"],
  bermain: ["ber", "main"],
  bersama: ["ber", "sa", "ma"],
  ikan: ["i", "kan"],
  berenang: ["be", "re", "nang"],
  di: ["di"],
  kolam: ["ko", "lam"],
  bulan: ["bu", "lan"],
  bersinar: ["ber", "si", "nar"],
  malam: ["ma", "lam"],
  "kupu-kupu": ["ku", "pu", "ku", "pu"],
  hinggap: ["hing", "gap"],
  "kura-kura": ["ku", "ra", "ku", "ra"],
  berjalan: ["ber", "ja", "lan"],
  pelan: ["pe", "lan"],
  kakak: ["ka", "kak"],
  menyanyi: ["me", "nya", "nyi"],
  lagu: ["la", "gu"],
  pergi: ["per", "gi"],
  dengan: ["de", "ngan"],
  kereta: ["ke", "re", "ta"],
  sekolah: ["se", "ko", "lah"],
  bersih: ["ber", "sih"],
  kakatua: ["ka", "ka", "tu", "a"],
  bisa: ["bi", "sa"],
  berbicara: ["ber", "bi", "ca", "ra"],
};

export function getWordSyllables(word: string): string[] {
  return SENTENCE_WORD_SYLLABLES[word.toLowerCase()] ?? [word.toLowerCase()];
}

// Nama huruf (eja) gaya sekolah Indonesia: b = "be", k = "ka", dst.
// Digraf dihitung satu unit bunyi: ng = "nga", ny = "nya", sy = "sya", kh = "kha".
export const LETTER_NAMES: Record<string, string> = {
  a: "a", b: "be", c: "ce", d: "de", e: "e", f: "ef", g: "ge", h: "ha",
  i: "i", j: "je", k: "ka", l: "el", m: "em", n: "en", o: "o", p: "pe",
  q: "ki", r: "er", s: "es", t: "te", u: "u", v: "fe", w: "we", x: "eks",
  y: "ye", z: "zet",
  ng: "nga", ny: "nya", sy: "sya", kh: "kha",
};

const DIGRAPH_UNITS = ["ng", "ny", "sy", "kh"];

// Pecah kata menjadi unit huruf (digraf tetap satu unit, tanda hubung diabaikan).
export function getLetterUnits(word: string): string[] {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  const units: string[] = [];
  let i = 0;
  while (i < clean.length) {
    const pair = clean.slice(i, i + 2);
    if (DIGRAPH_UNITS.includes(pair)) {
      units.push(pair);
      i += 2;
    } else {
      units.push(clean[i]);
      i += 1;
    }
  }
  return units;
}

export function getLetterName(unit: string): string {
  return LETTER_NAMES[unit] ?? unit;
}
