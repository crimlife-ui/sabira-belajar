// Penyimpanan multi-profil anak di localStorage.
// Data lama (satu profil di "sabira_profile" + bintang global) dimigrasi otomatis.

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
}

const KEY_PROFILES = "sabira_profiles";
const KEY_ACTIVE_PROFILE = "sabira_active_profile";
const LEGACY_KEY_PROFILE = "sabira_profile";
const LEGACY_KEY_STARS = "sabira_stars";

export const starsStorageKey = (profileId: string) => `sabira_stars_${profileId}`;

export const createProfileId = (): string =>
  `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

function readJson<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function migrateLegacyStorage(): void {
  if (localStorage.getItem(KEY_PROFILES)) return;

  const legacyRaw = localStorage.getItem(LEGACY_KEY_PROFILE);
  if (!legacyRaw) return;

  try {
    const legacy = JSON.parse(legacyRaw) as Omit<UserProfile, "id">;
    if (!legacy || !legacy.name) return;

    const profile: UserProfile = { ...legacy, id: createProfileId() };
    localStorage.setItem(KEY_PROFILES, JSON.stringify([profile]));
    localStorage.setItem(KEY_ACTIVE_PROFILE, profile.id);

    const legacyStars = localStorage.getItem(LEGACY_KEY_STARS);
    if (legacyStars !== null) {
      localStorage.setItem(starsStorageKey(profile.id), legacyStars);
    }
    localStorage.removeItem(LEGACY_KEY_PROFILE);
    localStorage.removeItem(LEGACY_KEY_STARS);
  } catch {
    // Data korup: biarkan aplikasi mulai dari onboarding segar.
  }
}

export function loadProfiles(): UserProfile[] {
  return readJson<UserProfile[]>(KEY_PROFILES, []).filter((p) => p && p.id && p.name);
}

export function saveProfiles(profiles: UserProfile[]): void {
  localStorage.setItem(KEY_PROFILES, JSON.stringify(profiles));
}

export function loadActiveProfileId(): string | null {
  return localStorage.getItem(KEY_ACTIVE_PROFILE);
}

export function saveActiveProfileId(id: string | null): void {
  if (id) {
    localStorage.setItem(KEY_ACTIVE_PROFILE, id);
  } else {
    localStorage.removeItem(KEY_ACTIVE_PROFILE);
  }
}

export function loadStars(profileId: string): number {
  const raw = localStorage.getItem(starsStorageKey(profileId));
  const parsed = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function saveStars(profileId: string, stars: number): void {
  localStorage.setItem(starsStorageKey(profileId), String(stars));
}

export function removeStars(profileId: string): void {
  localStorage.removeItem(starsStorageKey(profileId));
}
