import { describe, it, expect } from "vitest";
import {
  MATH_ANIMALS,
  MATH_ANIMAL_COUNT,
  animalFor,
} from "../src/data/mathAnimals";
import { buildMathTable, MATH_TABLE_NUMBERS } from "../src/data/mathTableData";

describe("MATH_ANIMALS (teman hewan Tabel Hitung)", () => {
  it("punya tepat 10 hewan untuk angka 1-10 tanpa duplikat", () => {
    expect(MATH_ANIMAL_COUNT).toBe(10);
    expect(MATH_ANIMALS).toHaveLength(10);
    expect(MATH_ANIMALS.map((a) => a.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("setiap hewan punya nama, emoji, dan warna yang valid", () => {
    const hex = /^#[0-9a-f]{6}$/i;
    for (const animal of MATH_ANIMALS) {
      expect(animal.name.length).toBeGreaterThan(0);
      expect(animal.emoji.length).toBeGreaterThan(0);
      expect(animal.body).toMatch(hex);
      expect(animal.belly).toMatch(hex);
      expect(animal.inner).toMatch(hex);
    }
  });

  it("nama hewan unik agar tiap angka punya teman yang berbeda", () => {
    const names = MATH_ANIMALS.map((a) => a.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("hanya Kura-Kura yang membawa angka di punggung (cangkang)", () => {
    const onBack = MATH_ANIMALS.filter((a) => a.place === "back");
    expect(onBack).toHaveLength(1);
    expect(onBack[0].name).toBe("Kura-Kura");
    expect(onBack[0].shell).toBeDefined();
  });
});

describe("animalFor", () => {
  it("mengembalikan hewan yang cocok untuk angka 1-10", () => {
    for (const number of MATH_TABLE_NUMBERS) {
      expect(animalFor(number).number).toBe(number);
    }
  });

  it("membungkus angka di luar 1-10 (11 -> 1, 0 -> 10)", () => {
    expect(animalFor(11).number).toBe(1);
    expect(animalFor(21).number).toBe(1);
    expect(animalFor(0).number).toBe(10);
    expect(animalFor(-9).number).toBe(1);
    expect(animalFor(100).number).toBe(10);
  });

  it("angka pecahan/nan dibulatkan dengan aman", () => {
    expect(animalFor(4.4).number).toBe(4);
    expect(animalFor(Number.NaN).number).toBe(1);
  });

  it("semua nilai pada tabel operasi manapun selalu punya hewan", () => {
    const operations = ["multiply", "divide", "add", "subtract"] as const;
    for (const operation of operations) {
      for (const n of MATH_TABLE_NUMBERS) {
        for (const row of buildMathTable(operation, n)) {
          for (const value of [row.left, row.right, row.result]) {
            const animal = animalFor(value);
            expect(animal.name.length).toBeGreaterThan(0);
            expect(animal.body).toMatch(/^#/);
          }
        }
      }
    }
  });
});