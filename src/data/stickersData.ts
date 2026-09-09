export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  requiredStars: number;
  bgGradient: string;
  description: string;
}

export const STICKERS_LIST: Sticker[] = [
  { id: "s1", name: "Bintang Ceria", emoji: "⭐", requiredStars: 0, bgGradient: "from-amber-300 to-yellow-400", description: "Bintang pertama Sabira!" },
  { id: "s2", name: "Singa Berani", emoji: "🦁", requiredStars: 2, bgGradient: "from-orange-300 to-amber-400", description: "Si raja hutan yang cerdas" },
  { id: "s3", name: "Roket Angkasa", emoji: "🚀", requiredStars: 4, bgGradient: "from-indigo-400 to-purple-500", description: "Meluncur tinggi ke bintang" },
  { id: "s4", name: "Kuda Poni Ajaib", emoji: "🦄", requiredStars: 6, bgGradient: "from-pink-300 to-rose-400", description: "Penuh keajaiban pelangi" },
  { id: "s5", name: "Panda Lucu", emoji: "🐼", requiredStars: 8, bgGradient: "from-emerald-300 to-teal-400", description: "Suka makan bambu manis" },
  { id: "s6", name: "Lumba-Lumba", emoji: "🐬", requiredStars: 10, bgGradient: "from-cyan-300 to-blue-400", description: "Sahabat laut yang ramah" },
  { id: "s7", name: "Stroberi Manis", emoji: "🍓", requiredStars: 13, bgGradient: "from-rose-300 to-red-400", description: "Buah segar kesukaan semua" },
  { id: "s8", name: "Dino Imut", emoji: "🦖", requiredStars: 16, bgGradient: "from-green-300 to-emerald-400", description: "Dinosaurus kecil yang pintar" },
  { id: "s9", name: "Es Krim Pelangi", emoji: "🍦", requiredStars: 20, bgGradient: "from-violet-300 to-fuchsia-400", description: "Dingin, manis, dan lezat" },
  { id: "s10", name: "Mobil Juara", emoji: "🚗", requiredStars: 25, bgGradient: "from-red-300 to-orange-400", description: "Brum brum! Cepat dan tangguh" },
  { id: "s11", name: "Balon Pesta", emoji: "🎈", requiredStars: 30, bgGradient: "from-yellow-300 to-pink-400", description: "Terbang riang di udara" },
  { id: "s12", name: "Mahkota Juara", emoji: "👑", requiredStars: 35, bgGradient: "from-amber-400 to-yellow-500", description: "Untuk anak super pintar!" },
];
