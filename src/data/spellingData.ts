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
  }
];
