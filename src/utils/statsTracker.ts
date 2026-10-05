// Statistik belajar per-profil untuk Laporan Orang Tua.
// Disimpan di localStorage: sabira_stats_<profileId>

import { loadActiveProfileId } from "./profileStore";

export type StatsModule =
  | "spelling"
  | "syllables"
  | "balloon"
  | "counting"
  | "math"
  | "hijaiyahQuiz";

export interface ModuleStat {
  answered: number;
  correct: number;
  sessions: number;
  lastPlayed: number; // timestamp
}

export type ProfileStats = Partial<Record<StatsModule, ModuleStat>>;

const keyFor = (profileId: string) => `sabira_stats_${profileId}`;

function readStats(profileId: string): ProfileStats {
  const raw = localStorage.getItem(keyFor(profileId));
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ProfileStats;
  } catch {
    return {};
  }
}

function writeStats(profileId: string, stats: ProfileStats): void {
  localStorage.setItem(keyFor(profileId), JSON.stringify(stats));
}

function update(module: StatsModule, mutate: (s: ModuleStat) => void): void {
  const profileId = loadActiveProfileId();
  if (!profileId) return;
  const stats = readStats(profileId);
  const current: ModuleStat = stats[module] ?? {
    answered: 0,
    correct: 0,
    sessions: 0,
    lastPlayed: 0,
  };
  mutate(current);
  stats[module] = current;
  writeStats(profileId, stats);
}

export function trackAnswer(module: StatsModule, correct: boolean): void {
  update(module, (s) => {
    s.answered += 1;
    if (correct) s.correct += 1;
    s.lastPlayed = Date.now();
  });
}

export function trackSessionComplete(module: StatsModule): void {
  update(module, (s) => {
    s.sessions += 1;
    s.lastPlayed = Date.now();
  });
}

export function loadStats(profileId: string): ProfileStats {
  return readStats(profileId);
}
