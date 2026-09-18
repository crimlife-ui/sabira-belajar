// Utility to keep the screen awake while the app is running
// Uses the Screen Wake Lock API with automatic re-acquisition on visibility change and user interaction.

type WakeLockSentinelType = {
  released: boolean;
  type: string;
  release: () => Promise<void>;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
};

class WakeLockManager {
  private sentinel: WakeLockSentinelType | null = null;
  private isSupported: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "navigator" in window) {
      this.isSupported = "wakeLock" in navigator;
    }
  }

  public async requestLock(): Promise<boolean> {
    if (!this.isSupported) {
      return false;
    }

    try {
      if (this.sentinel && !this.sentinel.released) {
        return true;
      }

      const nav = navigator as unknown as {
        wakeLock: {
          request: (type: string) => Promise<WakeLockSentinelType>;
        };
      };

      this.sentinel = await nav.wakeLock.request("screen");

      this.sentinel.addEventListener("release", () => {
        this.sentinel = null;
      });

      return true;
    } catch (err) {
      console.debug("Wake lock could not be acquired:", err);
      return false;
    }
  }

  public async releaseLock(): Promise<void> {
    if (this.sentinel) {
      try {
        await this.sentinel.release();
      } catch (err) {
        console.debug("Error releasing wake lock:", err);
      }
      this.sentinel = null;
    }
  }

  public init(): () => void {
    if (this.isInitialized || !this.isSupported) {
      return () => {};
    }

    this.isInitialized = true;

    // Try to acquire immediately
    this.requestLock();

    // Re-acquire lock when app tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        this.requestLock();
      }
    };

    // Browsers often require a user gesture if the initial request was blocked
    const handleUserInteraction = () => {
      if (!this.sentinel || this.sentinel.released) {
        this.requestLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });

    return () => {
      this.isInitialized = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      this.releaseLock();
    };
  }
}

export const wakeLockManager = new WakeLockManager();
