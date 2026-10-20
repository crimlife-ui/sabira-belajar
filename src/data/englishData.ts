// Data modul "Mengenal Bahasa Inggris": warna, bentuk, kata dasar
// per kategori, dan kalimat sederhana sehari-hari (EN + terjemahan ID).

export interface EnglishColor {
  en: string;
  id: string;
  emoji: string;
  hex: string; // warna kotak yang ditampilkan
}

export interface EnglishShape {
  en: string;
  id: string;
  emoji: string;
}

export interface EnglishWord {
  en: string;
  id: string;
  emoji: string;
  category: EnglishWordCategory;
}

export type EnglishWordCategory =
  | "animals"
  | "fruits"
  | "family"
  | "body"
  | "around";

export const ENGLISH_WORD_CATEGORIES: { id: EnglishWordCategory; label: string; emoji: string }[] = [
  { id: "animals", label: "Hewan", emoji: "🐾" },
  { id: "fruits", label: "Buah", emoji: "🍎" },
  { id: "family", label: "Keluarga", emoji: "👨‍👩‍👧‍👦" },
  { id: "body", label: "Tubuh", emoji: "🧒" },
  { id: "around", label: "Sekitar Kita", emoji: "🏠" },
];

export interface EnglishSentence {
  text: string;
  translation: string;
  emoji: string;
}

export const ENGLISH_COLORS: EnglishColor[] = [
  { en: "Red", id: "Merah", emoji: "🔴", hex: "#ef4444" },
  { en: "Blue", id: "Biru", emoji: "🔵", hex: "#3b82f6" },
  { en: "Yellow", id: "Kuning", emoji: "🟡", hex: "#facc15" },
  { en: "Green", id: "Hijau", emoji: "🟢", hex: "#22c55e" },
  { en: "Orange", id: "Oranye", emoji: "🟠", hex: "#f97316" },
  { en: "Purple", id: "Ungu", emoji: "🟣", hex: "#a855f7" },
  { en: "Pink", id: "Pink", emoji: "🌸", hex: "#ec4899" },
  { en: "Brown", id: "Coklat", emoji: "🟤", hex: "#92400e" },
  { en: "Black", id: "Hitam", emoji: "⚫", hex: "#1e293b" },
  { en: "White", id: "Putih", emoji: "⚪", hex: "#f8fafc" },
];

export const ENGLISH_SHAPES: EnglishShape[] = [
  { en: "Circle", id: "Lingkaran", emoji: "⭕" },
  { en: "Square", id: "Persegi", emoji: "🟦" },
  { en: "Triangle", id: "Segitiga", emoji: "🔺" },
  { en: "Star", id: "Bintang", emoji: "⭐" },
  { en: "Heart", id: "Hati", emoji: "❤️" },
  { en: "Rectangle", id: "Persegi Panjang", emoji: "🚪" },
  { en: "Oval", id: "Oval", emoji: "🥚" },
  { en: "Diamond", id: "Belah Ketupat", emoji: "🔶" },
];

export const ENGLISH_WORDS: EnglishWord[] = [
  // Hewan
  { en: "Cat", id: "Kucing", emoji: "🐱", category: "animals" },
  { en: "Dog", id: "Anjing", emoji: "🐶", category: "animals" },
  { en: "Bird", id: "Burung", emoji: "🐦", category: "animals" },
  { en: "Fish", id: "Ikan", emoji: "🐟", category: "animals" },
  { en: "Cow", id: "Sapi", emoji: "🐮", category: "animals" },
  { en: "Horse", id: "Kuda", emoji: "🐴", category: "animals" },
  { en: "Elephant", id: "Gajah", emoji: "🐘", category: "animals" },
  { en: "Monkey", id: "Monyet", emoji: "🐵", category: "animals" },
  // Buah
  { en: "Apple", id: "Apel", emoji: "🍎", category: "fruits" },
  { en: "Banana", id: "Pisang", emoji: "🍌", category: "fruits" },
  { en: "Orange", id: "Jeruk", emoji: "🍊", category: "fruits" },
  { en: "Grape", id: "Anggur", emoji: "🍇", category: "fruits" },
  { en: "Watermelon", id: "Semangka", emoji: "🍉", category: "fruits" },
  { en: "Mango", id: "Mangga", emoji: "🥭", category: "fruits" },
  // Keluarga
  { en: "Mother", id: "Ibu", emoji: "👩", category: "family" },
  { en: "Father", id: "Ayah", emoji: "👨", category: "family" },
  { en: "Brother", id: "Kakak/Adik Laki-laki", emoji: "👦", category: "family" },
  { en: "Sister", id: "Kakak/Adik Perempuan", emoji: "👧", category: "family" },
  { en: "Baby", id: "Bayi", emoji: "👶", category: "family" },
  { en: "Family", id: "Keluarga", emoji: "👨‍👩‍👧‍👦", category: "family" },
  // Tubuh
  { en: "Eye", id: "Mata", emoji: "👁️", category: "body" },
  { en: "Nose", id: "Hidung", emoji: "👃", category: "body" },
  { en: "Ear", id: "Telinga", emoji: "👂", category: "body" },
  { en: "Mouth", id: "Mulut", emoji: "👄", category: "body" },
  { en: "Hand", id: "Tangan", emoji: "✋", category: "body" },
  { en: "Foot", id: "Kaki", emoji: "🦶", category: "body" },
  // Sekitar Kita
  { en: "House", id: "Rumah", emoji: "🏠", category: "around" },
  { en: "Car", id: "Mobil", emoji: "🚗", category: "around" },
  { en: "Ball", id: "Bola", emoji: "⚽", category: "around" },
  { en: "Book", id: "Buku", emoji: "📚", category: "around" },
  { en: "Sun", id: "Matahari", emoji: "☀️", category: "around" },
  { en: "Moon", id: "Bulan", emoji: "🌙", category: "around" },
  { en: "Star", id: "Bintang", emoji: "⭐", category: "around" },
  { en: "Water", id: "Air", emoji: "💧", category: "around" },
];

export const ENGLISH_SENTENCES: EnglishSentence[] = [
  { text: "Hello! How are you?", translation: "Halo! Apa kabar?", emoji: "👋" },
  { text: "My name is Sabira.", translation: "Namaku Sabira.", emoji: "😊" },
  { text: "Good morning, Mom!", translation: "Selamat pagi, Bu!", emoji: "🌅" },
  { text: "I am happy today.", translation: "Aku senang hari ini.", emoji: "😄" },
  { text: "I love you, Mom.", translation: "Aku sayang Ibu.", emoji: "❤️" },
  { text: "This is a red ball.", translation: "Ini bola merah.", emoji: "🔴" },
  { text: "I can jump high!", translation: "Aku bisa melompat tinggi!", emoji: "🤸" },
  { text: "Let's read a book.", translation: "Ayo baca buku.", emoji: "📖" },
  { text: "Thank you very much!", translation: "Terima kasih banyak!", emoji: "🙏" },
  { text: "The sun is bright.", translation: "Matahari bersinar terang.", emoji: "☀️" },
  { text: "I want to drink water.", translation: "Aku ingin minum air.", emoji: "💧" },
  { text: "One, two, three, four, five!", translation: "Satu, dua, tiga, empat, lima!", emoji: "🖐️" },
];
