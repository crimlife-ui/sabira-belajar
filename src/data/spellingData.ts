export interface SyllablePart {
  syllable: string;
  letters: string[];
}

export interface SpellingWord {
  id: string;
  word: string;
  parts: SyllablePart[];
  emoji: string;
  hint: string;
  color: string;
}

export const SPELLING_WORDS: SpellingWord[] = [
  {
    "id": "pensil",
    "word": "PENSIL",
    "parts": [
      {
        "syllable": "PEN",
        "letters": [
          "P",
          "E",
          "N"
        ]
      },
      {
        "syllable": "SIL",
        "letters": [
          "S",
          "I",
          "L"
        ]
      }
    ],
    "emoji": "✏️",
    "hint": "Alat untuk menulis dan menggambar",
    "color": "from-amber-400 to-orange-500"
  },
  {
    "id": "ayam",
    "word": "AYAM",
    "parts": [
      {
        "syllable": "A",
        "letters": [
          "A"
        ]
      },
      {
        "syllable": "YAM",
        "letters": [
          "Y",
          "A",
          "M"
        ]
      }
    ],
    "emoji": "🐔",
    "hint": "Hewan yang berkokok kukuruyuk",
    "color": "from-rose-400 to-pink-500"
  },
  {
    "id": "ikan",
    "word": "IKAN",
    "parts": [
      {
        "syllable": "I",
        "letters": [
          "I"
        ]
      },
      {
        "syllable": "KAN",
        "letters": [
          "K",
          "A",
          "N"
        ]
      }
    ],
    "emoji": "🐟",
    "hint": "Hewan yang berenang di air",
    "color": "from-cyan-400 to-blue-500"
  },
  {
    "id": "apel",
    "word": "APEL",
    "parts": [
      {
        "syllable": "A",
        "letters": [
          "A"
        ]
      },
      {
        "syllable": "PEL",
        "letters": [
          "P",
          "E",
          "L"
        ]
      }
    ],
    "emoji": "🍎",
    "hint": "Buah manis berwarna merah",
    "color": "from-red-400 to-rose-500"
  },
  {
    "id": "bola",
    "word": "BOLA",
    "parts": [
      {
        "syllable": "BO",
        "letters": [
          "B",
          "O"
        ]
      },
      {
        "syllable": "LA",
        "letters": [
          "L",
          "A"
        ]
      }
    ],
    "emoji": "⚽",
    "hint": "Benda bulat untuk ditendang",
    "color": "from-blue-400 to-indigo-500"
  },
  {
    "id": "buku",
    "word": "BUKU",
    "parts": [
      {
        "syllable": "BU",
        "letters": [
          "B",
          "U"
        ]
      },
      {
        "syllable": "KU",
        "letters": [
          "K",
          "U"
        ]
      }
    ],
    "emoji": "📚",
    "hint": "Tempat membaca cerita seru",
    "color": "from-emerald-400 to-teal-500"
  },
  {
    "id": "sapi",
    "word": "SAPI",
    "parts": [
      {
        "syllable": "SA",
        "letters": [
          "S",
          "A"
        ]
      },
      {
        "syllable": "PI",
        "letters": [
          "P",
          "I"
        ]
      }
    ],
    "emoji": "🐮",
    "hint": "Hewan penghasil susu segar",
    "color": "from-amber-400 to-orange-500"
  },
  {
    "id": "roti",
    "word": "ROTI",
    "parts": [
      {
        "syllable": "RO",
        "letters": [
          "R",
          "O"
        ]
      },
      {
        "syllable": "TI",
        "letters": [
          "T",
          "I"
        ]
      }
    ],
    "emoji": "🍞",
    "hint": "Makanan lezat untuk sarapan",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "meja",
    "word": "MEJA",
    "parts": [
      {
        "syllable": "ME",
        "letters": [
          "M",
          "E"
        ]
      },
      {
        "syllable": "JA",
        "letters": [
          "J",
          "A"
        ]
      }
    ],
    "emoji": "🪵",
    "hint": "Tempat meletakkan buku dan pensil",
    "color": "from-orange-400 to-amber-600"
  },
  {
    "id": "topi",
    "word": "TOPI",
    "parts": [
      {
        "syllable": "TO",
        "letters": [
          "T",
          "O"
        ]
      },
      {
        "syllable": "PI",
        "letters": [
          "P",
          "I"
        ]
      }
    ],
    "emoji": "🧢",
    "hint": "Dipakai di kepala saat panas",
    "color": "from-violet-400 to-purple-500"
  },
  {
    "id": "susu",
    "word": "SUSU",
    "parts": [
      {
        "syllable": "SU",
        "letters": [
          "S",
          "U"
        ]
      },
      {
        "syllable": "SU",
        "letters": [
          "S",
          "U"
        ]
      }
    ],
    "emoji": "🥛",
    "hint": "Minuman sehat bikin tulang kuat",
    "color": "from-sky-300 to-blue-400"
  },
  {
    "id": "kuda",
    "word": "KUDA",
    "parts": [
      {
        "syllable": "KU",
        "letters": [
          "K",
          "U"
        ]
      },
      {
        "syllable": "DA",
        "letters": [
          "D",
          "A"
        ]
      }
    ],
    "emoji": "🐴",
    "hint": "Hewan gagah bisa lari kencang",
    "color": "from-amber-500 to-orange-600"
  },
  {
    "id": "mata",
    "word": "MATA",
    "parts": [
      {
        "syllable": "MA",
        "letters": [
          "M",
          "A"
        ]
      },
      {
        "syllable": "TA",
        "letters": [
          "T",
          "A"
        ]
      }
    ],
    "emoji": "👀",
    "hint": "Untuk melihat pemandangan indah",
    "color": "from-pink-400 to-purple-500"
  },
  {
    "id": "gigi",
    "word": "GIGI",
    "parts": [
      {
        "syllable": "GI",
        "letters": [
          "G",
          "I"
        ]
      },
      {
        "syllable": "GI",
        "letters": [
          "G",
          "I"
        ]
      }
    ],
    "emoji": "🦷",
    "hint": "Untuk mengunyah makanan lezat",
    "color": "from-cyan-400 to-sky-500"
  },
  {
    "id": "kaki",
    "word": "KAKI",
    "parts": [
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      },
      {
        "syllable": "KI",
        "letters": [
          "K",
          "I"
        ]
      }
    ],
    "emoji": "🦶",
    "hint": "Untuk berjalan dan melompat",
    "color": "from-orange-400 to-amber-500"
  },
  {
    "id": "jari",
    "word": "JARI",
    "parts": [
      {
        "syllable": "JA",
        "letters": [
          "J",
          "A"
        ]
      },
      {
        "syllable": "RI",
        "letters": [
          "R",
          "I"
        ]
      }
    ],
    "emoji": "🖐️",
    "hint": "Ada lima di setiap tangan",
    "color": "from-yellow-400 to-orange-500"
  },
  {
    "id": "baju",
    "word": "BAJU",
    "parts": [
      {
        "syllable": "BA",
        "letters": [
          "B",
          "A"
        ]
      },
      {
        "syllable": "JU",
        "letters": [
          "J",
          "U"
        ]
      }
    ],
    "emoji": "👕",
    "hint": "Pakaian kita sehari-hari",
    "color": "from-blue-400 to-indigo-500"
  },
  {
    "id": "dasi",
    "word": "DASI",
    "parts": [
      {
        "syllable": "DA",
        "letters": [
          "D",
          "A"
        ]
      },
      {
        "syllable": "SI",
        "letters": [
          "S",
          "I"
        ]
      }
    ],
    "emoji": "👔",
    "hint": "Hiasan kerah baju yang rapi",
    "color": "from-purple-400 to-indigo-500"
  },
  {
    "id": "sapu",
    "word": "SAPU",
    "parts": [
      {
        "syllable": "SA",
        "letters": [
          "S",
          "A"
        ]
      },
      {
        "syllable": "PU",
        "letters": [
          "P",
          "U"
        ]
      }
    ],
    "emoji": "🧹",
    "hint": "Alat pembersih lantai rumah",
    "color": "from-amber-400 to-yellow-500"
  },
  {
    "id": "tali",
    "word": "TALI",
    "parts": [
      {
        "syllable": "TA",
        "letters": [
          "T",
          "A"
        ]
      },
      {
        "syllable": "LI",
        "letters": [
          "L",
          "I"
        ]
      }
    ],
    "emoji": "🪢",
    "hint": "Benda panjang untuk mengikat",
    "color": "from-stone-400 to-amber-600"
  },
  {
    "id": "bumi",
    "word": "BUMI",
    "parts": [
      {
        "syllable": "BU",
        "letters": [
          "B",
          "U"
        ]
      },
      {
        "syllable": "MI",
        "letters": [
          "M",
          "I"
        ]
      }
    ],
    "emoji": "🌍",
    "hint": "Planet tempat tinggal kita",
    "color": "from-emerald-400 to-blue-500"
  },
  {
    "id": "daun",
    "word": "DAUN",
    "parts": [
      {
        "syllable": "DA",
        "letters": [
          "D",
          "A"
        ]
      },
      {
        "syllable": "UN",
        "letters": [
          "U",
          "N"
        ]
      }
    ],
    "emoji": "🍃",
    "hint": "Bagian hijau dari pohon",
    "color": "from-lime-400 to-green-600"
  },
  {
    "id": "awan",
    "word": "AWAN",
    "parts": [
      {
        "syllable": "A",
        "letters": [
          "A"
        ]
      },
      {
        "syllable": "WAN",
        "letters": [
          "W",
          "A",
          "N"
        ]
      }
    ],
    "emoji": "☁️",
    "hint": "Gumpalan putih lembut di langit",
    "color": "from-sky-300 to-cyan-400"
  },
  {
    "id": "batu",
    "word": "BATU",
    "parts": [
      {
        "syllable": "BA",
        "letters": [
          "B",
          "A"
        ]
      },
      {
        "syllable": "TU",
        "letters": [
          "T",
          "U"
        ]
      }
    ],
    "emoji": "🪨",
    "hint": "Benda keras yang ada di tanah",
    "color": "from-slate-400 to-zinc-600"
  },
  {
    "id": "ceri",
    "word": "CERI",
    "parts": [
      {
        "syllable": "CE",
        "letters": [
          "C",
          "E"
        ]
      },
      {
        "syllable": "RI",
        "letters": [
          "R",
          "I"
        ]
      }
    ],
    "emoji": "🍒",
    "hint": "Buah kecil manis warna merah",
    "color": "from-red-400 to-rose-600"
  },
  {
    "id": "padi",
    "word": "PADI",
    "parts": [
      {
        "syllable": "PA",
        "letters": [
          "P",
          "A"
        ]
      },
      {
        "syllable": "DI",
        "letters": [
          "D",
          "I"
        ]
      }
    ],
    "emoji": "🌾",
    "hint": "Tanaman penghasil butir beras",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "kera",
    "word": "KERA",
    "parts": [
      {
        "syllable": "KE",
        "letters": [
          "K",
          "E"
        ]
      },
      {
        "syllable": "RA",
        "letters": [
          "R",
          "A"
        ]
      }
    ],
    "emoji": "🐵",
    "hint": "Hewan lincah suka makan pisang",
    "color": "from-amber-500 to-orange-600"
  },
  {
    "id": "pita",
    "word": "PITA",
    "parts": [
      {
        "syllable": "PI",
        "letters": [
          "P",
          "I"
        ]
      },
      {
        "syllable": "TA",
        "letters": [
          "T",
          "A"
        ]
      }
    ],
    "emoji": "🎀",
    "hint": "Hiasan cantik untuk rambut",
    "color": "from-pink-400 to-rose-500"
  },
  {
    "id": "kado",
    "word": "KADO",
    "parts": [
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      },
      {
        "syllable": "DO",
        "letters": [
          "D",
          "O"
        ]
      }
    ],
    "emoji": "🎁",
    "hint": "Hadiah kejutan saat ulang tahun",
    "color": "from-fuchsia-400 to-purple-500"
  },
  {
    "id": "kaca",
    "word": "KACA",
    "parts": [
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      },
      {
        "syllable": "CA",
        "letters": [
          "C",
          "A"
        ]
      }
    ],
    "emoji": "🪞",
    "hint": "Untuk melihat bayangan wajah",
    "color": "from-cyan-300 to-blue-400"
  },
  {
    "id": "madu",
    "word": "MADU",
    "parts": [
      {
        "syllable": "MA",
        "letters": [
          "M",
          "A"
        ]
      },
      {
        "syllable": "DU",
        "letters": [
          "D",
          "U"
        ]
      }
    ],
    "emoji": "🍯",
    "hint": "Cairan manis buatan lebah",
    "color": "from-amber-400 to-yellow-500"
  },
  {
    "id": "gula",
    "word": "GULA",
    "parts": [
      {
        "syllable": "GU",
        "letters": [
          "G",
          "U"
        ]
      },
      {
        "syllable": "LA",
        "letters": [
          "L",
          "A"
        ]
      }
    ],
    "emoji": "🍬",
    "hint": "Pemanis teh dan kue lezat",
    "color": "from-pink-300 to-rose-400"
  },
  {
    "id": "naga",
    "word": "NAGA",
    "parts": [
      {
        "syllable": "NA",
        "letters": [
          "N",
          "A"
        ]
      },
      {
        "syllable": "GA",
        "letters": [
          "G",
          "A"
        ]
      }
    ],
    "emoji": "🐉",
    "hint": "Makhluk dongeng yang gagah",
    "color": "from-emerald-500 to-teal-600"
  },
  {
    "id": "rusa",
    "word": "RUSA",
    "parts": [
      {
        "syllable": "RU",
        "letters": [
          "R",
          "U"
        ]
      },
      {
        "syllable": "SA",
        "letters": [
          "S",
          "A"
        ]
      }
    ],
    "emoji": "🦌",
    "hint": "Hewan bertanduk elok di hutan",
    "color": "from-amber-500 to-orange-600"
  },
  {
    "id": "singa",
    "word": "SINGA",
    "parts": [
      {
        "syllable": "SI",
        "letters": [
          "S",
          "I"
        ]
      },
      {
        "syllable": "NGA",
        "letters": [
          "N",
          "G",
          "A"
        ]
      }
    ],
    "emoji": "🦁",
    "hint": "Raja rimba yang sangat berani",
    "color": "from-yellow-500 to-amber-600"
  },
  {
    "id": "bebek",
    "word": "BEBEK",
    "parts": [
      {
        "syllable": "BE",
        "letters": [
          "B",
          "E"
        ]
      },
      {
        "syllable": "BEK",
        "letters": [
          "B",
          "E",
          "K"
        ]
      }
    ],
    "emoji": "🦆",
    "hint": "Hewan berenang suara kwek-kwek",
    "color": "from-teal-400 to-emerald-500"
  },
  {
    "id": "semut",
    "word": "SEMUT",
    "parts": [
      {
        "syllable": "SE",
        "letters": [
          "S",
          "E"
        ]
      },
      {
        "syllable": "MUT",
        "letters": [
          "M",
          "U",
          "T"
        ]
      }
    ],
    "emoji": "🐜",
    "hint": "Hewan kecil yang suka gotong royong",
    "color": "from-rose-500 to-red-600"
  },
  {
    "id": "gajah",
    "word": "GAJAH",
    "parts": [
      {
        "syllable": "GA",
        "letters": [
          "G",
          "A"
        ]
      },
      {
        "syllable": "JAH",
        "letters": [
          "J",
          "A",
          "H"
        ]
      }
    ],
    "emoji": "🐘",
    "hint": "Hewan besar berbelalai panjang",
    "color": "from-slate-400 to-gray-600"
  },
  {
    "id": "jeruk",
    "word": "JERUK",
    "parts": [
      {
        "syllable": "JE",
        "letters": [
          "J",
          "E"
        ]
      },
      {
        "syllable": "RUK",
        "letters": [
          "R",
          "U",
          "K"
        ]
      }
    ],
    "emoji": "🍊",
    "hint": "Buah segar kaya vitamin C",
    "color": "from-orange-400 to-amber-500"
  },
  {
    "id": "pisang",
    "word": "PISANG",
    "parts": [
      {
        "syllable": "PI",
        "letters": [
          "P",
          "I"
        ]
      },
      {
        "syllable": "SANG",
        "letters": [
          "S",
          "A",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🍌",
    "hint": "Buah manis berwarna kuning",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "wortel",
    "word": "WORTEL",
    "parts": [
      {
        "syllable": "WOR",
        "letters": [
          "W",
          "O",
          "R"
        ]
      },
      {
        "syllable": "TEL",
        "letters": [
          "T",
          "E",
          "L"
        ]
      }
    ],
    "emoji": "🥕",
    "hint": "Sayur sehat kesukaan kelinci",
    "color": "from-orange-400 to-red-500"
  },
  {
    "id": "kelinci",
    "word": "KELINCI",
    "parts": [
      {
        "syllable": "KE",
        "letters": [
          "K",
          "E"
        ]
      },
      {
        "syllable": "LIN",
        "letters": [
          "L",
          "I",
          "N"
        ]
      },
      {
        "syllable": "CI",
        "letters": [
          "C",
          "I"
        ]
      }
    ],
    "emoji": "🐰",
    "hint": "Hewan imut bertelinga panjang",
    "color": "from-pink-300 to-rose-400"
  },
  {
    "id": "bunga",
    "word": "BUNGA",
    "parts": [
      {
        "syllable": "BU",
        "letters": [
          "B",
          "U"
        ]
      },
      {
        "syllable": "NGA",
        "letters": [
          "N",
          "G",
          "A"
        ]
      }
    ],
    "emoji": "🌸",
    "hint": "Tanaman cantik dan beraroma harum",
    "color": "from-pink-400 to-rose-500"
  },
  {
    "id": "rumah",
    "word": "RUMAH",
    "parts": [
      {
        "syllable": "RU",
        "letters": [
          "R",
          "U"
        ]
      },
      {
        "syllable": "MAH",
        "letters": [
          "M",
          "A",
          "H"
        ]
      }
    ],
    "emoji": "🏠",
    "hint": "Tempat berkumpul bersama keluarga",
    "color": "from-indigo-400 to-purple-500"
  },
  {
    "id": "pohon",
    "word": "POHON",
    "parts": [
      {
        "syllable": "PO",
        "letters": [
          "P",
          "O"
        ]
      },
      {
        "syllable": "HON",
        "letters": [
          "H",
          "O",
          "N"
        ]
      }
    ],
    "emoji": "🌳",
    "hint": "Tanaman rindang penghasil udara sejuk",
    "color": "from-emerald-500 to-green-600"
  },
  {
    "id": "kereta",
    "word": "KERETA",
    "parts": [
      {
        "syllable": "KE",
        "letters": [
          "K",
          "E"
        ]
      },
      {
        "syllable": "RE",
        "letters": [
          "R",
          "E"
        ]
      },
      {
        "syllable": "TA",
        "letters": [
          "T",
          "A"
        ]
      }
    ],
    "emoji": "🚂",
    "hint": "Kendaraan panjang di atas rel",
    "color": "from-blue-500 to-indigo-600"
  },
  {
    "id": "kapal",
    "word": "KAPAL",
    "parts": [
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      },
      {
        "syllable": "PAL",
        "letters": [
          "P",
          "A",
          "L"
        ]
      }
    ],
    "emoji": "🚢",
    "hint": "Kendaraan megah di laut lepas",
    "color": "from-cyan-500 to-blue-600"
  },
  {
    "id": "mobil",
    "word": "MOBIL",
    "parts": [
      {
        "syllable": "MO",
        "letters": [
          "M",
          "O"
        ]
      },
      {
        "syllable": "BIL",
        "letters": [
          "B",
          "I",
          "L"
        ]
      }
    ],
    "emoji": "🚗",
    "hint": "Kendaraan beroda empat di jalan",
    "color": "from-red-400 to-rose-600"
  },
  {
    "id": "balon",
    "word": "BALON",
    "parts": [
      {
        "syllable": "BA",
        "letters": [
          "B",
          "A"
        ]
      },
      {
        "syllable": "LON",
        "letters": [
          "L",
          "O",
          "N"
        ]
      }
    ],
    "emoji": "🎈",
    "hint": "Benda ringan terbang di udara",
    "color": "from-pink-400 to-red-500"
  },
  {
    "id": "bintang",
    "word": "BINTANG",
    "parts": [
      {
        "syllable": "BIN",
        "letters": [
          "B",
          "I",
          "N"
        ]
      },
      {
        "syllable": "TANG",
        "letters": [
          "T",
          "A",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "⭐",
    "hint": "Benda langit yang berkelip malam hari",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "bulan",
    "word": "BULAN",
    "parts": [
      {
        "syllable": "BU",
        "letters": [
          "B",
          "U"
        ]
      },
      {
        "syllable": "LAN",
        "letters": [
          "L",
          "A",
          "N"
        ]
      }
    ],
    "emoji": "🌙",
    "hint": "Benda langit yang menerangi malam",
    "color": "from-indigo-400 to-violet-500"
  },
  {
    "id": "piring",
    "word": "PIRING",
    "parts": [
      {
        "syllable": "PI",
        "letters": [
          "P",
          "I"
        ]
      },
      {
        "syllable": "RING",
        "letters": [
          "R",
          "I",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🍽️",
    "hint": "Tempat meletakkan makanan enak",
    "color": "from-slate-400 to-blue-400"
  },
  {
    "id": "gelas",
    "word": "GELAS",
    "parts": [
      {
        "syllable": "GE",
        "letters": [
          "G",
          "E"
        ]
      },
      {
        "syllable": "LAS",
        "letters": [
          "L",
          "A",
          "S"
        ]
      }
    ],
    "emoji": "🥛",
    "hint": "Wadah untuk minum air segar",
    "color": "from-sky-400 to-blue-500"
  },
  {
    "id": "sendok",
    "word": "SENDOK",
    "parts": [
      {
        "syllable": "SEN",
        "letters": [
          "S",
          "E",
          "N"
        ]
      },
      {
        "syllable": "DOK",
        "letters": [
          "D",
          "O",
          "K"
        ]
      }
    ],
    "emoji": "🥄",
    "hint": "Alat untuk menyuap makanan lezat",
    "color": "from-slate-400 to-zinc-500"
  },
  {
    "id": "garpu",
    "word": "GARPU",
    "parts": [
      {
        "syllable": "GAR",
        "letters": [
          "G",
          "A",
          "R"
        ]
      },
      {
        "syllable": "PU",
        "letters": [
          "P",
          "U"
        ]
      }
    ],
    "emoji": "🍴",
    "hint": "Alat makan pendamping sendok",
    "color": "from-zinc-400 to-gray-600"
  },
  {
    "id": "pintu",
    "word": "PINTU",
    "parts": [
      {
        "syllable": "PIN",
        "letters": [
          "P",
          "I",
          "N"
        ]
      },
      {
        "syllable": "TU",
        "letters": [
          "T",
          "U"
        ]
      }
    ],
    "emoji": "🚪",
    "hint": "Jalan masuk ke dalam ruangan",
    "color": "from-amber-600 to-yellow-700"
  },
  {
    "id": "kasur",
    "word": "KASUR",
    "parts": [
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      },
      {
        "syllable": "SUR",
        "letters": [
          "S",
          "U",
          "R"
        ]
      }
    ],
    "emoji": "🛏️",
    "hint": "Tempat tidur yang empuk dan nyaman",
    "color": "from-blue-400 to-indigo-500"
  },
  {
    "id": "lampu",
    "word": "LAMPU",
    "parts": [
      {
        "syllable": "LAM",
        "letters": [
          "L",
          "A",
          "M"
        ]
      },
      {
        "syllable": "PU",
        "letters": [
          "P",
          "U"
        ]
      }
    ],
    "emoji": "💡",
    "hint": "Penerang ruangan saat malam gelap",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "bantal",
    "word": "BANTAL",
    "parts": [
      {
        "syllable": "BAN",
        "letters": [
          "B",
          "A",
          "N"
        ]
      },
      {
        "syllable": "TAL",
        "letters": [
          "T",
          "A",
          "L"
        ]
      }
    ],
    "emoji": "🛋️",
    "hint": "Alas kepala empuk saat tidur",
    "color": "from-rose-300 to-pink-400"
  },
  {
    "id": "sepatu",
    "word": "SEPATU",
    "parts": [
      {
        "syllable": "SE",
        "letters": [
          "S",
          "E"
        ]
      },
      {
        "syllable": "PA",
        "letters": [
          "P",
          "A"
        ]
      },
      {
        "syllable": "TU",
        "letters": [
          "T",
          "U"
        ]
      }
    ],
    "emoji": "👟",
    "hint": "Alas kaki untuk ke sekolah",
    "color": "from-indigo-400 to-blue-500"
  },
  {
    "id": "celana",
    "word": "CELANA",
    "parts": [
      {
        "syllable": "CE",
        "letters": [
          "C",
          "E"
        ]
      },
      {
        "syllable": "LA",
        "letters": [
          "L",
          "A"
        ]
      },
      {
        "syllable": "NA",
        "letters": [
          "N",
          "A"
        ]
      }
    ],
    "emoji": "👖",
    "hint": "Pakaian penutup kaki yang nyaman",
    "color": "from-sky-500 to-indigo-600"
  },
  {
    "id": "sekolah",
    "word": "SEKOLAH",
    "parts": [
      {
        "syllable": "SE",
        "letters": [
          "S",
          "E"
        ]
      },
      {
        "syllable": "KO",
        "letters": [
          "K",
          "O"
        ]
      },
      {
        "syllable": "LAH",
        "letters": [
          "L",
          "A",
          "H"
        ]
      }
    ],
    "emoji": "🏫",
    "hint": "Tempat menuntut ilmu dan bermain",
    "color": "from-red-400 to-orange-500"
  },
  {
    "id": "taman",
    "word": "TAMAN",
    "parts": [
      {
        "syllable": "TA",
        "letters": [
          "T",
          "A"
        ]
      },
      {
        "syllable": "MAN",
        "letters": [
          "M",
          "A",
          "N"
        ]
      }
    ],
    "emoji": "🏞️",
    "hint": "Tempat asri banyak bunga dan pohon",
    "color": "from-emerald-400 to-teal-500"
  },
  {
    "id": "pasar",
    "word": "PASAR",
    "parts": [
      {
        "syllable": "PA",
        "letters": [
          "P",
          "A"
        ]
      },
      {
        "syllable": "SAR",
        "letters": [
          "S",
          "A",
          "R"
        ]
      }
    ],
    "emoji": "🏪",
    "hint": "Tempat belanja sayur dan buah segar",
    "color": "from-orange-400 to-amber-500"
  },
  {
    "id": "sungai",
    "word": "SUNGAI",
    "parts": [
      {
        "syllable": "SUNG",
        "letters": [
          "S",
          "U",
          "N",
          "G"
        ]
      },
      {
        "syllable": "AI",
        "letters": [
          "A",
          "I"
        ]
      }
    ],
    "emoji": "🌊",
    "hint": "Aliran air jernih yang mengalir",
    "color": "from-cyan-400 to-blue-500"
  },
  {
    "id": "pantai",
    "word": "PANTAI",
    "parts": [
      {
        "syllable": "PAN",
        "letters": [
          "P",
          "A",
          "N"
        ]
      },
      {
        "syllable": "TAI",
        "letters": [
          "T",
          "A",
          "I"
        ]
      }
    ],
    "emoji": "🏖️",
    "hint": "Tepi laut dengan pasir yang indah",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "hutan",
    "word": "HUTAN",
    "parts": [
      {
        "syllable": "HU",
        "letters": [
          "H",
          "U"
        ]
      },
      {
        "syllable": "TAN",
        "letters": [
          "T",
          "A",
          "N"
        ]
      }
    ],
    "emoji": "🌲",
    "hint": "Kawasan rimbun banyak satwa",
    "color": "from-green-500 to-emerald-600"
  },
  {
    "id": "pelangi",
    "word": "PELANGI",
    "parts": [
      {
        "syllable": "PE",
        "letters": [
          "P",
          "E"
        ]
      },
      {
        "syllable": "LA",
        "letters": [
          "L",
          "A"
        ]
      },
      {
        "syllable": "NGI",
        "letters": [
          "N",
          "G",
          "I"
        ]
      }
    ],
    "emoji": "🌈",
    "hint": "Lengkungan tujuh warna di langit",
    "color": "from-pink-400 to-violet-500"
  },
  {
    "id": "hujan",
    "word": "HUJAN",
    "parts": [
      {
        "syllable": "HU",
        "letters": [
          "H",
          "U"
        ]
      },
      {
        "syllable": "JAN",
        "letters": [
          "J",
          "A",
          "N"
        ]
      }
    ],
    "emoji": "🌧️",
    "hint": "Air sejuk turun dari langit",
    "color": "from-blue-400 to-sky-500"
  },
  {
    "id": "matahari",
    "word": "MATAHARI",
    "parts": [
      {
        "syllable": "MA",
        "letters": [
          "M",
          "A"
        ]
      },
      {
        "syllable": "TA",
        "letters": [
          "T",
          "A"
        ]
      },
      {
        "syllable": "HA",
        "letters": [
          "H",
          "A"
        ]
      },
      {
        "syllable": "RI",
        "letters": [
          "R",
          "I"
        ]
      }
    ],
    "emoji": "☀️",
    "hint": "Pusat tata surya yang menghangatkan",
    "color": "from-amber-400 to-yellow-500"
  },
  {
    "id": "kucing",
    "word": "KUCING",
    "parts": [
      {
        "syllable": "KU",
        "letters": [
          "K",
          "U"
        ]
      },
      {
        "syllable": "CING",
        "letters": [
          "C",
          "I",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🐱",
    "hint": "Hewan menggemaskan bersuara meong",
    "color": "from-orange-400 to-amber-500"
  },
  {
    "id": "burung",
    "word": "BURUNG",
    "parts": [
      {
        "syllable": "BU",
        "letters": [
          "B",
          "U"
        ]
      },
      {
        "syllable": "RUNG",
        "letters": [
          "R",
          "U",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🐦",
    "hint": "Hewan bersayap merdu berkicau",
    "color": "from-sky-400 to-blue-500"
  },
  {
    "id": "katak",
    "word": "KATAK",
    "parts": [
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      },
      {
        "syllable": "TAK",
        "letters": [
          "T",
          "A",
          "K"
        ]
      }
    ],
    "emoji": "🐸",
    "hint": "Hewan hijau yang suka melompat",
    "color": "from-green-400 to-emerald-500"
  },
  {
    "id": "kupu",
    "word": "KUPU",
    "parts": [
      {
        "syllable": "KU",
        "letters": [
          "K",
          "U"
        ]
      },
      {
        "syllable": "PU",
        "letters": [
          "P",
          "U"
        ]
      }
    ],
    "emoji": "🦋",
    "hint": "Serangga bersayap corak indah",
    "color": "from-purple-400 to-pink-500"
  },
  {
    "id": "lebah",
    "word": "LEBAH",
    "parts": [
      {
        "syllable": "LE",
        "letters": [
          "L",
          "E"
        ]
      },
      {
        "syllable": "BAH",
        "letters": [
          "B",
          "A",
          "H"
        ]
      }
    ],
    "emoji": "🐝",
    "hint": "Serangga penghasil madu bergizi",
    "color": "from-amber-400 to-yellow-500"
  },
  {
    "id": "lumba",
    "word": "LUMBA",
    "parts": [
      {
        "syllable": "LUM",
        "letters": [
          "L",
          "U",
          "M"
        ]
      },
      {
        "syllable": "BA",
        "letters": [
          "B",
          "A"
        ]
      }
    ],
    "emoji": "🐬",
    "hint": "Sahabat cerdas penyelam samudera",
    "color": "from-cyan-400 to-blue-500"
  },
  {
    "id": "paus",
    "word": "PAUS",
    "parts": [
      {
        "syllable": "PA",
        "letters": [
          "P",
          "A"
        ]
      },
      {
        "syllable": "US",
        "letters": [
          "U",
          "S"
        ]
      }
    ],
    "emoji": "🐋",
    "hint": "Raksasa laut yang ramah",
    "color": "from-blue-500 to-indigo-600"
  },
  {
    "id": "udang",
    "word": "UDANG",
    "parts": [
      {
        "syllable": "U",
        "letters": [
          "U"
        ]
      },
      {
        "syllable": "DANG",
        "letters": [
          "D",
          "A",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🦐",
    "hint": "Hewan air berantena panjang",
    "color": "from-rose-400 to-red-500"
  },
  {
    "id": "kepiting",
    "word": "KEPITING",
    "parts": [
      {
        "syllable": "KE",
        "letters": [
          "K",
          "E"
        ]
      },
      {
        "syllable": "PI",
        "letters": [
          "P",
          "I"
        ]
      },
      {
        "syllable": "TING",
        "letters": [
          "T",
          "I",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🦀",
    "hint": "Hewan bercangkang dan bercapit",
    "color": "from-red-400 to-orange-500"
  },
  {
    "id": "mangga",
    "word": "MANGGA",
    "parts": [
      {
        "syllable": "MANG",
        "letters": [
          "M",
          "A",
          "N",
          "G"
        ]
      },
      {
        "syllable": "GA",
        "letters": [
          "G",
          "A"
        ]
      }
    ],
    "emoji": "🥭",
    "hint": "Buah manis harum berdaging kuning",
    "color": "from-amber-400 to-yellow-500"
  },
  {
    "id": "anggur",
    "word": "ANGGUR",
    "parts": [
      {
        "syllable": "ANG",
        "letters": [
          "A",
          "N",
          "G"
        ]
      },
      {
        "syllable": "GUR",
        "letters": [
          "G",
          "U",
          "R"
        ]
      }
    ],
    "emoji": "🍇",
    "hint": "Buah ungu manis dalam gerombolan",
    "color": "from-purple-500 to-indigo-600"
  },
  {
    "id": "melon",
    "word": "MELON",
    "parts": [
      {
        "syllable": "ME",
        "letters": [
          "M",
          "E"
        ]
      },
      {
        "syllable": "LON",
        "letters": [
          "L",
          "O",
          "N"
        ]
      }
    ],
    "emoji": "🍈",
    "hint": "Buah hijau segar banyak air",
    "color": "from-lime-400 to-green-500"
  },
  {
    "id": "nanas",
    "word": "NANAS",
    "parts": [
      {
        "syllable": "NA",
        "letters": [
          "N",
          "A"
        ]
      },
      {
        "syllable": "NAS",
        "letters": [
          "N",
          "A",
          "S"
        ]
      }
    ],
    "emoji": "🍍",
    "hint": "Buah tropis bermahkota daun",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "pepaya",
    "word": "PEPAYA",
    "parts": [
      {
        "syllable": "PE",
        "letters": [
          "P",
          "E"
        ]
      },
      {
        "syllable": "PA",
        "letters": [
          "P",
          "A"
        ]
      },
      {
        "syllable": "YA",
        "letters": [
          "Y",
          "A"
        ]
      }
    ],
    "emoji": "🍈",
    "hint": "Buah oranye manis kaya serat",
    "color": "from-orange-400 to-amber-500"
  },
  {
    "id": "tomat",
    "word": "TOMAT",
    "parts": [
      {
        "syllable": "TO",
        "letters": [
          "T",
          "O"
        ]
      },
      {
        "syllable": "MAT",
        "letters": [
          "M",
          "A",
          "T"
        ]
      }
    ],
    "emoji": "🍅",
    "hint": "Sayur buah merah kaya vitamin",
    "color": "from-red-500 to-rose-600"
  },
  {
    "id": "sepeda",
    "word": "SEPEDA",
    "parts": [
      {
        "syllable": "SE",
        "letters": [
          "S",
          "E"
        ]
      },
      {
        "syllable": "PE",
        "letters": [
          "P",
          "E"
        ]
      },
      {
        "syllable": "DA",
        "letters": [
          "D",
          "A"
        ]
      }
    ],
    "emoji": "🚲",
    "hint": "Kendaraan dua roda dikayuh kaki",
    "color": "from-teal-400 to-emerald-500"
  },
  {
    "id": "pesawat",
    "word": "PESAWAT",
    "parts": [
      {
        "syllable": "PE",
        "letters": [
          "P",
          "E"
        ]
      },
      {
        "syllable": "SA",
        "letters": [
          "S",
          "A"
        ]
      },
      {
        "syllable": "WAT",
        "letters": [
          "W",
          "A",
          "T"
        ]
      }
    ],
    "emoji": "✈️",
    "hint": "Kendaraan terbang melintasi awan",
    "color": "from-blue-400 to-indigo-500"
  },
  {
    "id": "payung",
    "word": "PAYUNG",
    "parts": [
      {
        "syllable": "PA",
        "letters": [
          "P",
          "A"
        ]
      },
      {
        "syllable": "YUNG",
        "letters": [
          "Y",
          "U",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "☂️",
    "hint": "Pelindung dari rintik air hujan",
    "color": "from-purple-400 to-pink-500"
  },
  {
    "id": "boneka",
    "word": "BONEKA",
    "parts": [
      {
        "syllable": "BO",
        "letters": [
          "B",
          "O"
        ]
      },
      {
        "syllable": "NE",
        "letters": [
          "N",
          "E"
        ]
      },
      {
        "syllable": "KA",
        "letters": [
          "K",
          "A"
        ]
      }
    ],
    "emoji": "🧸",
    "hint": "Mainan beruang yang menggemaskan",
    "color": "from-amber-400 to-orange-500"
  },
  {
    "id": "roket",
    "word": "ROKET",
    "parts": [
      {
        "syllable": "RO",
        "letters": [
          "R",
          "O"
        ]
      },
      {
        "syllable": "KET",
        "letters": [
          "K",
          "E",
          "T"
        ]
      }
    ],
    "emoji": "🚀",
    "hint": "Meluncur kencang menembus angkasa",
    "color": "from-indigo-500 to-purple-600"
  },
  {
    "id": "robot",
    "word": "ROBOT",
    "parts": [
      {
        "syllable": "RO",
        "letters": [
          "R",
          "O"
        ]
      },
      {
        "syllable": "BOT",
        "letters": [
          "B",
          "O",
          "T"
        ]
      }
    ],
    "emoji": "🤖",
    "hint": "Sahabat mekanik yang pintar",
    "color": "from-slate-400 to-blue-500"
  },
  {
    "id": "gitar",
    "word": "GITAR",
    "parts": [
      {
        "syllable": "GI",
        "letters": [
          "G",
          "I"
        ]
      },
      {
        "syllable": "TAR",
        "letters": [
          "T",
          "A",
          "R"
        ]
      }
    ],
    "emoji": "🎸",
    "hint": "Alat musik berdawai dipetik",
    "color": "from-amber-500 to-red-500"
  },
  {
    "id": "trofi",
    "word": "TROFI",
    "parts": [
      {
        "syllable": "TRO",
        "letters": [
          "T",
          "R",
          "O"
        ]
      },
      {
        "syllable": "FI",
        "letters": [
          "F",
          "I"
        ]
      }
    ],
    "emoji": "🏆",
    "hint": "Piala emas untuk sang juara",
    "color": "from-yellow-400 to-amber-500"
  },
  {
    "id": "zebra",
    "word": "ZEBRA",
    "parts": [
      {
        "syllable": "ZE",
        "letters": [
          "Z",
          "E"
        ]
      },
      {
        "syllable": "BRA",
        "letters": [
          "B",
          "R",
          "A"
        ]
      }
    ],
    "emoji": "🦓",
    "hint": "Kuda belang hitam dan putih",
    "color": "from-slate-600 to-zinc-800"
  },
  {
    "id": "jerapah",
    "word": "JERAPAH",
    "parts": [
      {
        "syllable": "JE",
        "letters": [
          "J",
          "E"
        ]
      },
      {
        "syllable": "RA",
        "letters": [
          "R",
          "A"
        ]
      },
      {
        "syllable": "PAH",
        "letters": [
          "P",
          "A",
          "H"
        ]
      }
    ],
    "emoji": "🦒",
    "hint": "Satwa bertubuh tinggi semampai",
    "color": "from-yellow-500 to-amber-600"
  },
  {
    "id": "beruang",
    "word": "BERUANG",
    "parts": [
      {
        "syllable": "BE",
        "letters": [
          "B",
          "E"
        ]
      },
      {
        "syllable": "RU",
        "letters": [
          "R",
          "U"
        ]
      },
      {
        "syllable": "ANG",
        "letters": [
          "A",
          "N",
          "G"
        ]
      }
    ],
    "emoji": "🐻",
    "hint": "Satwa berbulu tebal penyuka madu",
    "color": "from-amber-600 to-yellow-700"
  }
];
