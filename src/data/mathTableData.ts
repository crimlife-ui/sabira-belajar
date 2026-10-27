// Data Tabel Hitung (×, ÷, +, −) untuk menu Matematika.
// Setiap tabel berisi baris operasi untuk satu angka 1-10, lengkap dengan
// teks ucapan agar dibaca jelas oleh TTS (simbol × ÷ tidak selalu terbaca).

export type MathTableOperation = "multiply" | "divide" | "add" | "subtract";

export interface MathTableOperationInfo {
  id: MathTableOperation;
  symbol: string;
  label: string;
  emoji: string;
  description: string;
}

export const MATH_TABLE_OPERATIONS: MathTableOperationInfo[] = [
  {
    id: "multiply",
    symbol: "×",
    label: "Perkalian",
    emoji: "✖️",
    description: "Mengulang penjumlahan angka yang sama, misalnya 3 × 2 = 2 + 2 + 2.",
  },
  {
    id: "divide",
    symbol: "÷",
    label: "Pembagian",
    emoji: "➗",
    description: "Membagi banyak benda menjadi beberapa kelompok sama banyak.",
  },
  {
    id: "add",
    symbol: "+",
    label: "Penjumlahan",
    emoji: "➕",
    description: "Menggabungkan dua angka supaya jumlahnya bertambah banyak.",
  },
  {
    id: "subtract",
    symbol: "−",
    label: "Pengurangan",
    emoji: "➖",
    description: "Mengambil sebagian benda supaya jumlahnya berkurang.",
  },
];

export const MATH_TABLE_NUMBERS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const MATH_TABLE_MAX = 10;

export interface MathTableRow {
  left: number;
  right: number;
  symbol: string;
  result: number;
  equation: string;
  spoken: string;
}

export function clampTableNumber(tableNumber: number): number {
  if (!Number.isFinite(tableNumber)) return 1;
  return Math.min(MATH_TABLE_MAX, Math.max(1, Math.round(tableNumber)));
}

export function getOperationInfo(operation: MathTableOperation): MathTableOperationInfo {
  return (
    MATH_TABLE_OPERATIONS.find((item) => item.id === operation) ??
    MATH_TABLE_OPERATIONS[0]
  );
}

export function buildMathTable(
  operation: MathTableOperation,
  tableNumber: number
): MathTableRow[] {
  const n = clampTableNumber(tableNumber);
  const symbol = getOperationInfo(operation).symbol;
  const rowCount = operation === "subtract" ? n : MATH_TABLE_MAX;
  const rows: MathTableRow[] = [];

  for (let i = 1; i <= rowCount; i++) {
    let left: number;
    let right: number;
    let result: number;
    let spoken: string;

    switch (operation) {
      case "multiply":
        left = n;
        right = i;
        result = n * i;
        spoken = `${n} kali ${i} sama dengan ${result}`;
        break;
      case "divide":
        left = n * i;
        right = n;
        result = i;
        spoken = `${left} dibagi ${n} sama dengan ${i}`;
        break;
      case "subtract":
        left = n;
        right = i;
        result = n - i;
        spoken = `${n} dikurangi ${i} sama dengan ${result}`;
        break;
      case "add":
      default:
        left = n;
        right = i;
        result = n + i;
        spoken = `${n} ditambah ${i} sama dengan ${result}`;
        break;
    }

    rows.push({
      left,
      right,
      symbol,
      result,
      equation: `${left} ${symbol} ${right} = ${result}`,
      spoken,
    });
  }

  return rows;
}
