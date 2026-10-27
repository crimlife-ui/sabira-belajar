// Kebun Hewan Berhitung: 10 teman hewan untuk angka 1-10 di menu Tabel Hitung.
// Urutannya sengaja mengikuti besaran tubuh secara kasar — makin besar angkanya,
// makin besar teman hewannya — supaya anak mengaitkan angka dengan "banyak/besar".
// Setiap hewan membawa angka di perutnya, kecuali Kura-Kura yang membawa angka
// di punggung (cangkang berbentuk heksagon).

export type CritterEars =
  | "round"
  | "pointy"
  | "long"
  | "floppy"
  | "bump"
  | "bigRound"
  | "side"
  | "none";

export type CritterFeature = "none" | "bill" | "muzzle" | "trunk" | "ossicones";
export type CritterNumberPlace = "belly" | "back";
export type CritterTail = "curl" | "drop" | "thin";

export interface MathAnimal {
  number: number;
  name: string;
  emoji: string;
  /** Warna tubuh utama */
  body: string;
  /** Warna patch perut / alas angka */
  belly: string;
  /** Warna telinga dalam, hidung, bintik, dll. */
  inner: string;
  /** Warna cangkang (hanya Kura-Kura) */
  shell?: string;
  ears: CritterEars;
  feature: CritterFeature;
  place: CritterNumberPlace;
  tail?: CritterTail;
  spots?: boolean;
}

export const MATH_ANIMALS: MathAnimal[] = [
  {
    number: 1,
    name: "Tikus",
    emoji: "🐭",
    body: "#a9a3d1",
    belly: "#efecfb",
    inner: "#f7b0c4",
    ears: "round",
    feature: "none",
    place: "belly",
    tail: "thin",
  },
  {
    number: 2,
    name: "Katak",
    emoji: "🐸",
    body: "#5ecf8f",
    belly: "#ddf8ea",
    inner: "#3fa870",
    ears: "bump",
    feature: "none",
    place: "belly",
  },
  {
    number: 3,
    name: "Kucing",
    emoji: "🐱",
    body: "#f9a24b",
    belly: "#ffe9cd",
    inner: "#ffc9d6",
    ears: "pointy",
    feature: "none",
    place: "belly",
    tail: "curl",
  },
  {
    number: 4,
    name: "Kelinci",
    emoji: "🐰",
    body: "#f0e6fb",
    belly: "#ffffff",
    inner: "#f9c6dc",
    ears: "long",
    feature: "none",
    place: "belly",
  },
  {
    number: 5,
    name: "Kura-Kura",
    emoji: "🐢",
    body: "#8fd8a8",
    belly: "#e6f9ee",
    inner: "#e6f9ee",
    shell: "#3fa870",
    ears: "none",
    feature: "none",
    place: "back",
  },
  {
    number: 6,
    name: "Bebek",
    emoji: "🦆",
    body: "#ffd24e",
    belly: "#fff4cc",
    inner: "#ffab2e",
    ears: "none",
    feature: "bill",
    place: "belly",
  },
  {
    number: 7,
    name: "Anjing",
    emoji: "🐶",
    body: "#d2915f",
    belly: "#f8e5d1",
    inner: "#8f5a35",
    ears: "floppy",
    feature: "muzzle",
    place: "belly",
    tail: "curl",
  },
  {
    number: 8,
    name: "Kuda",
    emoji: "🐴",
    body: "#dfa870",
    belly: "#f9ecd9",
    inner: "#b87a42",
    ears: "pointy",
    feature: "muzzle",
    place: "belly",
    tail: "drop",
  },
  {
    number: 9,
    name: "Gajah",
    emoji: "🐘",
    body: "#a3b9db",
    belly: "#e5eefb",
    inner: "#8ba3c9",
    ears: "bigRound",
    feature: "trunk",
    place: "belly",
  },
  {
    number: 10,
    name: "Jerapah",
    emoji: "🦒",
    body: "#f6c95c",
    belly: "#fdf3d0",
    inner: "#d99b3a",
    ears: "side",
    feature: "ossicones",
    place: "belly",
    spots: true,
  },
];

export const MATH_ANIMAL_COUNT = MATH_ANIMALS.length;

/**
 * Teman hewan untuk sebuah angka. Angka di luar 1-10 dibungkus (mis. 11 = 1,
 * 0 = 10) agar setiap nilai pada tabel selalu punya karakter.
 */
export function animalFor(value: number): MathAnimal {
  const rounded = Number.isFinite(value) ? Math.round(value) : 1;
  const index =
    (((rounded - 1) % MATH_ANIMAL_COUNT) + MATH_ANIMAL_COUNT) % MATH_ANIMAL_COUNT;
  return MATH_ANIMALS[index];
}