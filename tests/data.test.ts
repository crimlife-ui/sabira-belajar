import { describe, it, expect } from "vitest";
import { ALPHABET_LIST } from "../src/data/alphabetData";
import { NUMBERS_LIST } from "../src/data/numberData";
import { HIJAIYAH_LIST, ARABIC_NUMBERS_LIST } from "../src/data/hijaiyahData";
import { SPELLING_WORDS } from "../src/data/spellingData";
import { VOWEL_SYLLABLE_GROUPS, ENDING_PRESETS } from "../src/data/vowelSyllableData";
import {
  BASIC_READING_LIST,
  CONNECTED_LETTERS_LIST,
  WORD_JOINING_EXAMPLES,
} from "../src/data/hijaiyahReadingData";
import { STICKERS_LIST } from "../src/data/stickersData";

describe("ALPHABET_LIST", () => {
  it("memuat 26 huruf A-Z tanpa duplikat", () => {
    expect(ALPHABET_LIST).toHaveLength(26);
    const letters = ALPHABET_LIST.map((a) => a.letter);
    expect(new Set(letters).size).toBe(26);
    expect(letters.join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  });

  it("setiap huruf punya kata asosiasi & emoji", () => {
    for (const item of ALPHABET_LIST) {
      expect(item.word.length).toBeGreaterThan(0);
      expect(item.emoji.length).toBeGreaterThan(0);
      expect(item.word.toUpperCase()).toContain(item.letter);
    }
  });
});

describe("NUMBERS_LIST", () => {
  it("memuat angka 0-20 berurutan tanpa duplikat", () => {
    expect(NUMBERS_LIST).toHaveLength(21);
    NUMBERS_LIST.forEach((n, i) => {
      expect(n.number).toBe(i);
      expect(n.word.length).toBeGreaterThan(0);
      expect(n.emoji.length).toBeGreaterThan(0);
    });
  });
});

describe("HIJAIYAH_LIST", () => {
  it("memuat 28 huruf hijaiyah unik", () => {
    expect(HIJAIYAH_LIST).toHaveLength(28);
    expect(new Set(HIJAIYAH_LIST.map((h) => h.arabic)).size).toBe(28);
    for (const h of HIJAIYAH_LIST) {
      expect(h.name.length).toBeGreaterThan(0);
    }
  });

  it("setiap huruf punya 3 harakat & contoh kata", () => {
    for (const h of HIJAIYAH_LIST) {
      expect(h.fathah).toBeDefined();
      expect(h.kasrah).toBeDefined();
      expect(h.dhommah).toBeDefined();
      expect(h.example.meaning.length).toBeGreaterThan(0);
    }
  });
});

describe("ARABIC_NUMBERS_LIST", () => {
  it("memuat angka Arab 0-10", () => {
    expect(ARABIC_NUMBERS_LIST.length).toBeGreaterThanOrEqual(11);
  });
});

describe("SPELLING_WORDS", () => {
  it("setiap kata konsisten antara word, parts, dan letters", () => {
    for (const w of SPELLING_WORDS) {
      const joined = w.parts.map((p) => p.syllable).join("");
      expect(joined.toLowerCase()).toBe(w.word.toLowerCase());
      const allLetters = w.parts.flatMap((p) => p.letters).join("");
      expect(allLetters.toLowerCase()).toBe(w.word.toLowerCase());
      for (const p of w.parts) {
        expect(p.letters.join("").toLowerCase()).toBe(p.syllable.toLowerCase());
      }
    }
  });

  it("tidak ada kata duplikat", () => {
    const words = SPELLING_WORDS.map((w) => w.word.toLowerCase());
    expect(new Set(words).size).toBe(words.length);
  });
});

describe("VOWEL_SYLLABLE_GROUPS & ENDING_PRESETS", () => {
  it("grup suku kata punya konsonan & baris vokal lengkap", () => {
    for (const g of VOWEL_SYLLABLE_GROUPS) {
      expect(g.consonant.length).toBe(1);
      expect(g.syllables.length).toBeGreaterThanOrEqual(3);
      for (const s of g.syllables) {
        expect(s.syllable.startsWith(g.consonant.toLowerCase())).toBe(true);
        expect(s.exampleWord.length).toBeGreaterThan(0);
      }
    }
  });

  it("preset akhiran memuat contoh per konsonan", () => {
    expect(ENDING_PRESETS.length).toBeGreaterThan(0);
    for (const p of ENDING_PRESETS) {
      expect(p.consonantExamples.length).toBeGreaterThan(0);
      for (const c of p.consonantExamples) {
        expect(c.items.length).toBeGreaterThan(0);
        for (const item of c.items) {
          expect(item.syllable.endsWith(p.ending)).toBe(true);
        }
      }
    }
  });
});

describe("Data membaca hijaiyah", () => {
  it("A-Ba-Ta memuat baris bacaan lengkap", () => {
    expect(BASIC_READING_LIST.length).toBeGreaterThan(0);
    for (const item of BASIC_READING_LIST) {
      expect(item.fullArabic.length).toBeGreaterThan(0);
      expect(item.fullLatin.length).toBeGreaterThan(0);
      expect(item.letters.length).toBeGreaterThan(0);
    }
  });

  it("huruf sambung punya 4 bentuk & contoh kata tergabung tersedia", () => {
    expect(CONNECTED_LETTERS_LIST).toHaveLength(28);
    for (const c of CONNECTED_LETTERS_LIST) {
      expect(c.isolated.length).toBeGreaterThan(0);
      expect(c.exampleWord.length).toBeGreaterThan(0);
    }
    expect(WORD_JOINING_EXAMPLES.length).toBeGreaterThan(0);
    for (const w of WORD_JOINING_EXAMPLES) {
      expect(w.connectedWord.length).toBeGreaterThan(0);
      expect(w.meaning.length).toBeGreaterThan(0);
    }
  });
});

describe("STICKERS_LIST", () => {
  it("syarat bintang naik secara ketat & id unik", () => {
    const thresholds = STICKERS_LIST.map((s) => s.requiredStars);
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i]).toBeGreaterThan(thresholds[i - 1]);
    }
    expect(new Set(STICKERS_LIST.map((s) => s.id)).size).toBe(STICKERS_LIST.length);
  });

  it("stiker pertama gratis (0 bintang)", () => {
    expect(STICKERS_LIST[0].requiredStars).toBe(0);
  });
});
