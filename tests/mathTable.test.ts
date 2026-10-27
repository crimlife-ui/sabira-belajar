import { describe, it, expect } from "vitest";
import {
  buildMathTable,
  clampTableNumber,
  getOperationInfo,
  MATH_TABLE_OPERATIONS,
  type MathTableOperation,
} from "../src/data/mathTableData";

const OPERATIONS: MathTableOperation[] = ["multiply", "divide", "add", "subtract"];

describe("MATH_TABLE_OPERATIONS", () => {
  it("memuat empat operasi hitung: × ÷ + −", () => {
    expect(MATH_TABLE_OPERATIONS).toHaveLength(4);
    expect(MATH_TABLE_OPERATIONS.map((o) => o.id)).toEqual(OPERATIONS);
    expect(MATH_TABLE_OPERATIONS.map((o) => o.symbol)).toEqual(["×", "÷", "+", "−"]);
  });

  it("setiap operasi punya label, emoji, dan deskripsi", () => {
    for (const operation of MATH_TABLE_OPERATIONS) {
      expect(operation.label.length).toBeGreaterThan(0);
      expect(operation.emoji.length).toBeGreaterThan(0);
      expect(operation.description.length).toBeGreaterThan(0);
    }
  });
});

describe("buildMathTable", () => {
  it("tabel perkalian 3 berisi 10 baris 3 × 1 sampai 3 × 10", () => {
    const rows = buildMathTable("multiply", 3);
    expect(rows).toHaveLength(10);
    expect(rows[0]).toMatchObject({ left: 3, right: 1, result: 3 });
    expect(rows[9]).toMatchObject({ left: 3, right: 10, result: 30 });
    expect(rows[9].equation).toBe("3 × 10 = 30");
  });

  it("tabel pembagian 4 berisi kelipatan 4 dibagi 4", () => {
    const rows = buildMathTable("divide", 4);
    expect(rows).toHaveLength(10);
    expect(rows.map((r) => r.result)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(rows[0].equation).toBe("4 ÷ 4 = 1");
    expect(rows[9].equation).toBe("40 ÷ 4 = 10");
  });

  it("tabel penjumlahan 7 berisi 10 baris 7 + 1 sampai 7 + 10", () => {
    const rows = buildMathTable("add", 7);
    expect(rows).toHaveLength(10);
    expect(rows[0]).toMatchObject({ left: 7, right: 1, result: 8 });
    expect(rows[9]).toMatchObject({ left: 7, right: 10, result: 17 });
  });

  it("tabel pengurangan 6 berhenti di 6 − 6 = 0", () => {
    const rows = buildMathTable("subtract", 6);
    expect(rows).toHaveLength(6);
    expect(rows[0]).toMatchObject({ left: 6, right: 1, result: 5 });
    expect(rows[5]).toMatchObject({ left: 6, right: 6, result: 0 });
  });

  it("setiap baris pada semua operasi & angka 1-10 selalu benar", () => {
    for (const operation of OPERATIONS) {
      for (let n = 1; n <= 10; n++) {
        const rows = buildMathTable(operation, n);
        expect(rows.length).toBeGreaterThan(0);

        for (const row of rows) {
          switch (operation) {
            case "multiply":
              expect(row.left * row.right).toBe(row.result);
              break;
            case "divide":
              expect(row.left / row.right).toBe(row.result);
              break;
            case "add":
              expect(row.left + row.right).toBe(row.result);
              break;
            case "subtract":
              expect(row.left - row.right).toBe(row.result);
              break;
          }
          expect(row.result).toBeGreaterThanOrEqual(0);
          expect(row.equation).toContain("=");
        }
      }
    }
  });

  it("teks ucapan memakai kata operasi yang mudah dipahami TTS", () => {
    expect(buildMathTable("multiply", 2)[0].spoken).toBe("2 kali 1 sama dengan 2");
    expect(buildMathTable("divide", 2)[0].spoken).toBe("2 dibagi 2 sama dengan 1");
    expect(buildMathTable("add", 2)[0].spoken).toBe("2 ditambah 1 sama dengan 3");
    expect(buildMathTable("subtract", 2)[1].spoken).toBe("2 dikurangi 2 sama dengan 0");
  });
});

describe("clampTableNumber", () => {
  it("membatasi angka tabel ke rentang 1-10", () => {
    expect(clampTableNumber(0)).toBe(1);
    expect(clampTableNumber(-5)).toBe(1);
    expect(clampTableNumber(11)).toBe(10);
    expect(clampTableNumber(4.4)).toBe(4);
    expect(clampTableNumber(Number.NaN)).toBe(1);
  });

  it("getOperationInfo punya fallback yang aman", () => {
    expect(getOperationInfo("multiply").symbol).toBe("×");
    expect(getOperationInfo("unknown" as MathTableOperation).symbol).toBe("×");
  });
});
