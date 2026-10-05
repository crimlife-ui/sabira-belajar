// Batas waktu bermain harian. Pemakaian dihitung per tanggal (detik) selama
// aplikasi terlihat aktif, dan dibersihkan otomatis untuk tanggal lama.

const KEY_LIMIT = "sabira_screen_time_limit";
const USAGE_PREFIX = "sabira_screen_usage_";

const todayKey = () => new Date().toISOString().slice(0, 10);
const usageKeyFor = (date: string) => `${USAGE_PREFIX}${date}`;

export function getLimitMinutes(): number {
  const raw = localStorage.getItem(KEY_LIMIT);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function setLimitMinutes(minutes: number): void {
  localStorage.setItem(KEY_LIMIT, String(Math.max(0, Math.round(minutes))));
}

export function getTodayUsageSeconds(): number {
  const raw = localStorage.getItem(usageKeyFor(todayKey()));
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function addUsageSeconds(seconds: number): void {
  const key = usageKeyFor(todayKey());
  localStorage.setItem(key, String(getTodayUsageSeconds() + seconds));
}

export function pruneOldUsage(): void {
  Object.keys(localStorage).forEach((k) => {
    if (k.startsWith(USAGE_PREFIX) && k !== usageKeyFor(todayKey())) {
      localStorage.removeItem(k);
    }
  });
}
