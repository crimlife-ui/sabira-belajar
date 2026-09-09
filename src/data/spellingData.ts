export interface SpellingWord {
  id: string;
  word: string;
  syllables: string[];
  emoji: string;
  hint: string;
  color: string;
}

export const SPELLING_WORDS: SpellingWord[] = [
  { id: "bola", word: "BOLA", syllables: ["BO", "LA"], emoji: "⚽", hint: "Benda bulat untuk ditendang", color: "from-blue-400 to-indigo-500" },
  { id: "buku", word: "BUKU", syllables: ["BU", "KU"], emoji: "📚", hint: "Tempat membaca cerita seru", color: "from-emerald-400 to-teal-500" },
  { id: "apel", word: "APEL", syllables: ["A", "PEL"], emoji: "🍎", hint: "Buah manis berwarna merah", color: "from-red-400 to-rose-500" },
  { id: "sapi", word: "SAPI", syllables: ["SA", "PI"], emoji: "🐮", hint: "Hewan penghasil susu segar", color: "from-amber-400 to-orange-500" },
  { id: "roti", word: "ROTI", syllables: ["RO", "TI"], emoji: "🍞", hint: "Makanan lezat untuk sarapan", color: "from-yellow-400 to-amber-500" },
  { id: "ikan", word: "IKAN", syllables: ["I", "KAN"], emoji: "🐟", hint: "Hewan yang berenang di air", color: "from-cyan-400 to-blue-500" },
  { id: "ayam", word: "AYAM", syllables: ["A", "YAM"], emoji: "🐔", hint: "Hewan yang berkokok kukuruyuk", color: "from-rose-400 to-pink-500" },
  { id: "meja", word: "MEJA", syllables: ["ME", "JA"], emoji: "🪵", hint: "Tempat meletakkan buku dan pensil", color: "from-orange-400 to-amber-600" },
  { id: "topi", word: "TOPI", syllables: ["TO", "PI"], emoji: "🧢", hint: "Dipakai di kepala saat panas", color: "from-violet-400 to-purple-500" },
  { id: "susu", word: "SUSU", syllables: ["SU", "SU"], emoji: "🥛", hint: "Minuman sehat bikin tulang kuat", color: "from-sky-300 to-blue-400" },
  { id: "kuda", word: "KUDA", syllables: ["KU", "DA"], emoji: "🐴", hint: "Hewan gagah bisa lari kencang", color: "from-amber-500 to-orange-600" },
  { id: "mata", word: "MATA", syllables: ["MA", "TA"], emoji: "👀", hint: "Untuk melihat pemandangan indah", color: "from-pink-400 to-purple-500" },
  { id: "gigi", word: "GIGI", syllables: ["GI", "GI"], emoji: "🦷", hint: "Untuk mengunyah makanan lezat", color: "from-cyan-400 to-sky-500" },
  { id: "kaki", word: "KAKI", syllables: ["KA", "KI"], emoji: "🦶", hint: "Untuk berjalan dan melompat", color: "from-orange-400 to-amber-500" },
  { id: "jari", word: "JARI", syllables: ["JA", "RI"], emoji: "🖐️", hint: "Ada lima di setiap tangan", color: "from-yellow-400 to-orange-500" },
  { id: "baju", word: "BAJU", syllables: ["BA", "JU"], emoji: "👕", hint: "Pakaian kita sehari-hari", color: "from-blue-400 to-indigo-500" },
  { id: "dasi", word: "DASI", syllables: ["DA", "SI"], emoji: "👔", hint: "Hiasan kerah baju yang rapi", color: "from-purple-400 to-indigo-500" },
  { id: "sapu", word: "SAPU", syllables: ["SA", "PU"], emoji: "🧹", hint: "Alat pembersih lantai rumah", color: "from-amber-400 to-yellow-500" },
  { id: "tali", word: "TALI", syllables: ["TA", "LI"], emoji: "🪢", hint: "Benda panjang untuk mengikat", color: "from-stone-400 to-amber-600" },
  { id: "bumi", word: "BUMI", syllables: ["BU", "MI"], emoji: "🌍", hint: "Planet tempat tinggal kita", color: "from-emerald-400 to-blue-500" },
  { id: "daun", word: "DAUN", syllables: ["DA", "UN"], emoji: "🍃", hint: "Bagian hijau dari pohon", color: "from-lime-400 to-green-600" },
  { id: "awan", word: "AWAN", syllables: ["A", "WAN"], emoji: "☁️", hint: "Gumpalan putih lembut di langit", color: "from-sky-300 to-cyan-400" },
  { id: "batu", word: "BATU", syllables: ["BA", "TU"], emoji: "🪨", hint: "Benda keras yang ada di tanah", color: "from-slate-400 to-zinc-600" },
  { id: "ceri", word: "CERI", syllables: ["CE", "RI"], emoji: "🍒", hint: "Buah kecil manis warna merah", color: "from-red-400 to-rose-600" },
  { id: "padi", word: "PADI", syllables: ["PA", "DI"], emoji: "🌾", hint: "Tanaman penghasil butir beras", color: "from-yellow-400 to-amber-500" },
  { id: "kera", word: "KERA", syllables: ["KE", "RA"], emoji: "🐵", hint: "Hewan lincah suka makan pisang", color: "from-amber-500 to-orange-600" },
  { id: "pita", word: "PITA", syllables: ["PI", "TA"], emoji: "🎀", hint: "Hiasan cantik untuk rambut", color: "from-pink-400 to-rose-500" },
  { id: "kado", word: "KADO", syllables: ["KA", "DO"], emoji: "🎁", hint: "Hadiah kejutan saat ulang tahun", color: "from-fuchsia-400 to-purple-500" },
  { id: "kaca", word: "KACA", syllables: ["KA", "CA"], emoji: "🪞", hint: "Untuk melihat bayangan wajah", color: "from-cyan-300 to-blue-400" },
  { id: "madu", word: "MADU", syllables: ["MA", "DU"], emoji: "🍯", hint: "Cairan manis buatan lebah", color: "from-amber-400 to-yellow-500" },
  { id: "gula", word: "GULA", syllables: ["GU", "LA"], emoji: "🍬", hint: "Pemanis teh dan kue lezat", color: "from-pink-300 to-rose-400" },
  { id: "naga", word: "NAGA", syllables: ["NA", "GA"], emoji: "🐉", hint: "Makhluk dongeng yang gagah", color: "from-emerald-500 to-teal-600" },
  { id: "rusa", word: "RUSA", syllables: ["RU", "SA"], emoji: "🦌", hint: "Hewan bertanduk elok di hutan", color: "from-amber-500 to-orange-600" },
  { id: "singa", word: "SINGA", syllables: ["SI", "NGA"], emoji: "🦁", hint: "Raja rimba yang sangat berani", color: "from-yellow-500 to-amber-600" },
  { id: "bebek", word: "BEBEK", syllables: ["BE", "BEK"], emoji: "🦆", hint: "Hewan berenang suara kwek-kwek", color: "from-teal-400 to-emerald-500" },
  { id: "semut", word: "SEMUT", syllables: ["SE", "MUT"], emoji: "🐜", hint: "Hewan kecil yang suka gotong royong", color: "from-rose-500 to-red-600" },
  { id: "gajah", word: "GAJAH", syllables: ["GA", "JAH"], emoji: "🐘", hint: "Hewan besar berbelalai panjang", color: "from-slate-400 to-gray-600" },
  { id: "jeruk", word: "JERUK", syllables: ["JE", "RUK"], emoji: "🍊", hint: "Buah segar kaya vitamin C", color: "from-orange-400 to-amber-500" },
  { id: "pisang", word: "PISANG", syllables: ["PI", "SANG"], emoji: "🍌", hint: "Buah manis berwarna kuning", color: "from-yellow-400 to-amber-500" },
  { id: "wortel", word: "WORTEL", syllables: ["WOR", "TEL"], emoji: "🥕", hint: "Sayur sehat kesukaan kelinci", color: "from-orange-400 to-red-500" },
  { id: "kelinci", word: "KELINCI", syllables: ["KE", "LIN", "CI"], emoji: "🐰", hint: "Hewan imut bertelinga panjang", color: "from-pink-300 to-rose-400" },
  { id: "bunga", word: "BUNGA", syllables: ["BU", "NGA"], emoji: "🌸", hint: "Tanaman cantik dan beraroma harum", color: "from-pink-400 to-rose-500" },
  { id: "rumah", word: "RUMAH", syllables: ["RU", "MAH"], emoji: "🏠", hint: "Tempat berkumpul bersama keluarga", color: "from-indigo-400 to-purple-500" },
  { id: "pohon", word: "POHON", syllables: ["PO", "HON"], emoji: "🌳", hint: "Tanaman rindang penghasil udara sejuk", color: "from-emerald-500 to-green-600" },
  { id: "kereta", word: "KERETA", syllables: ["KE", "RE", "TA"], emoji: "🚂", hint: "Kendaraan panjang di atas rel", color: "from-blue-500 to-indigo-600" },
  { id: "kapal", word: "KAPAL", syllables: ["KA", "PAL"], emoji: "🚢", hint: "Kendaraan megah di laut lepas", color: "from-cyan-500 to-blue-600" },
  { id: "mobil", word: "MOBIL", syllables: ["MO", "BIL"], emoji: "🚗", hint: "Kendaraan beroda empat di jalan", color: "from-red-400 to-rose-600" },
  { id: "balon", word: "BALON", syllables: ["BA", "LON"], emoji: "🎈", hint: "Benda ringan terbang di udara", color: "from-pink-400 to-red-500" },
  { id: "bintang", word: "BINTANG", syllables: ["BIN", "TANG"], emoji: "⭐", hint: "Benda langit yang berkelip malam hari", color: "from-yellow-400 to-amber-500" },
  { id: "bulan", word: "BULAN", syllables: ["BU", "LAN"], emoji: "🌙", hint: "Benda langit yang menerangi malam", color: "from-indigo-400 to-violet-500" },
  { id: "pensil", word: "PENSIL", syllables: ["PEN", "SIL"], emoji: "✏️", hint: "Alat untuk menggambar dan menulis", color: "from-amber-400 to-orange-500" },
  { id: "piring", word: "PIRING", syllables: ["PI", "RING"], emoji: "🍽️", hint: "Tempat meletakkan makanan enak", color: "from-slate-400 to-blue-400" }
];
