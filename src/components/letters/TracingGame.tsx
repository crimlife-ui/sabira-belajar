import React, { useState, useRef, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Undo2, Trash2, CheckCircle2, ChevronLeft, ChevronRight, Brush } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { speech } from "../../utils/speechHelper";
import { ALPHABET_LIST } from "../../data/alphabetData";
import { NUMBERS_LIST } from "../../data/numberData";

interface TracingGameProps {
  charset: "letters" | "numbers";
  onEarnStar: () => void;
}

interface Point {
  x: number; // normalisasi 0-1
  y: number;
}

const COMPLETE_COVERAGE = 0.65; // Toleransi ramah anak: 65% area huruf terisi
const STARS_EVERY = 2; // 1 bintang setiap 2 huruf selesai

export const TracingGame: React.FC<TracingGameProps> = ({ charset, onEarnStar }) => {
  const items: ((typeof ALPHABET_LIST)[number] | (typeof NUMBERS_LIST)[number])[] =
    charset === "letters" ? ALPHABET_LIST : NUMBERS_LIST.slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [coverage, setCoverage] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [justCompleted, setJustCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const paintCanvasRef = useRef<HTMLCanvasElement>(null);
  // Offscreen: mask huruf & mask goresan untuk hitung persentase
  const glyphMaskRef = useRef<HTMLCanvasElement | null>(null);
  const strokeMaskRef = useRef<HTMLCanvasElement | null>(null);
  const strokesRef = useRef<Point[][]>([]);
  const drawingRef = useRef(false);
  const hueRef = useRef(0);
  const completedCountRef = useRef(0);
  // Guard ref (bukan state): event pointerup beruntun dalam satu tick
  // tidak boleh memicu selebrasi/bintang ganda sebelum React re-render.
  const completedFlagRef = useRef(false);

  const item = items[currentIndex];
  const glyph =
    charset === "letters"
      ? (item as (typeof ALPHABET_LIST)[number]).letter
      : String((item as (typeof NUMBERS_LIST)[number]).number);

  const canvasSize = () => paintCanvasRef.current?.width ?? 0;

  // ---------- Menggambar ----------
  const drawGlyphOn = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${Math.round(size * 0.72)}px Fredoka, "Quicksand", sans-serif`;
    ctx.fillText(glyph, size / 2, size / 2 + size * 0.02);
  };

  const drawGuide = useCallback(() => {
    const guide = guideCanvasRef.current;
    const ctx = guide?.getContext("2d");
    const size = canvasSize();
    if (!guide || !ctx || !size) return;
    drawGlyphOn(ctx, size, "#f8fafc");
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = Math.max(2, size * 0.008);
    ctx.setLineDash([size * 0.03, size * 0.025]);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${Math.round(size * 0.72)}px Fredoka, "Quicksand", sans-serif`;
    ctx.strokeText(glyph, size / 2, size / 2 + size * 0.02);
    ctx.restore();
  }, [glyph]);

  const redrawStrokes = useCallback(() => {
    const paint = paintCanvasRef.current;
    const pctx = paint?.getContext("2d");
    const mask = strokeMaskRef.current;
    const mctx = mask?.getContext("2d");
    const size = canvasSize();
    if (!paint || !pctx || !mask || !mctx || !size) return;

    pctx.clearRect(0, 0, size, size);
    mctx.clearRect(0, 0, size, size);
    mctx.strokeStyle = "#000";
    mctx.fillStyle = "#000";

    const brush = size * 0.13;
    pctx.lineCap = "round";
    pctx.lineJoin = "round";
    mctx.lineCap = "round";
    mctx.lineJoin = "round";
    pctx.lineWidth = brush;
    mctx.lineWidth = brush;

    let pointIndex = 0;
    strokesRef.current.forEach((stroke, strokeIdx) => {
      const baseHue = (strokeIdx * 55) % 360;
      stroke.forEach((p, i) => {
        if (i === 0) {
          pctx.fillStyle = `hsl(${(baseHue + i * 3) % 360}, 85%, 60%)`;
          mctx.beginPath();
          mctx.arc(p.x * size, p.y * size, brush / 2, 0, Math.PI * 2);
          mctx.fill();
          pctx.beginPath();
          pctx.arc(p.x * size, p.y * size, brush / 2, 0, Math.PI * 2);
          pctx.fill();
        } else {
          const prev = stroke[i - 1];
          const hue = (baseHue + i * 3) % 360;
          pctx.strokeStyle = `hsl(${hue}, 85%, 60%)`;
          mctx.beginPath();
          mctx.moveTo(prev.x * size, prev.y * size);
          mctx.lineTo(p.x * size, p.y * size);
          mctx.stroke();
          pctx.beginPath();
          pctx.moveTo(prev.x * size, prev.y * size);
          pctx.lineTo(p.x * size, p.y * size);
          pctx.stroke();
        }
        pointIndex++;
      });
    });
  }, []);

  // ---------- Ukuran kanvas & mask ----------
  const setupCanvases = useCallback(() => {
    const container = containerRef.current;
    const paint = paintCanvasRef.current;
    const guide = guideCanvasRef.current;
    if (!container || !paint || !guide) return;

    const cssSize = container.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pxSize = Math.max(1, Math.round(cssSize * dpr));
    if (paint.width !== pxSize) {
      paint.width = pxSize;
      paint.height = pxSize;
      guide.width = pxSize;
      guide.height = pxSize;

      const glyphMask = glyphMaskRef.current ?? document.createElement("canvas");
      const strokeMask = strokeMaskRef.current ?? document.createElement("canvas");
      glyphMask.width = pxSize;
      glyphMask.height = pxSize;
      strokeMask.width = pxSize;
      strokeMask.height = pxSize;
      glyphMaskRef.current = glyphMask;
      strokeMaskRef.current = strokeMask;

      const gctx = glyphMask.getContext("2d");
      if (gctx) drawGlyphOn(gctx, pxSize, "#000");

      redrawStrokes();
      evaluateCoverage();
    }
    drawGuide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawGuide, redrawStrokes, glyph]);

  const evaluateCoverage = useCallback(() => {
    const glyphMask = glyphMaskRef.current;
    const strokeMask = strokeMaskRef.current;
    if (!glyphMask || !strokeMask) return;
    const gctx = glyphMask.getContext("2d");
    const sctx = strokeMask.getContext("2d");
    if (!gctx || !sctx) return;
    const size = glyphMask.width;
    if (!size) return;

    const glyphData = gctx.getImageData(0, 0, size, size).data;
    const strokeData = sctx.getImageData(0, 0, size, size).data;
    let total = 0;
    let covered = 0;
    for (let i = 3; i < glyphData.length; i += 4) {
      if (glyphData[i] > 128) {
        total++;
        if (strokeData[i] > 128) covered++;
      }
    }
    const pct = total > 0 ? covered / total : 0;
    setCoverage(pct);
    return pct;
  }, []);

  // ---------- Interaksi pointer ----------
  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    };
  };

  const paintSegment = (from: Point | null, to: Point) => {
    const paint = paintCanvasRef.current;
    const pctx = paint?.getContext("2d");
    const mctx = strokeMaskRef.current?.getContext("2d");
    const size = canvasSize();
    if (!pctx || !mctx || !size) return;

    const brush = size * 0.13;
    pctx.lineCap = "round";
    pctx.lineJoin = "round";
    mctx.lineCap = "round";
    mctx.lineJoin = "round";
    pctx.lineWidth = brush;
    mctx.lineWidth = brush;
    mctx.strokeStyle = "#000";
    mctx.fillStyle = "#000";

    const px = to.x * size;
    const py = to.y * size;
    if (!from) {
      pctx.fillStyle = `hsl(${hueRef.current}, 85%, 60%)`;
      mctx.beginPath();
      mctx.arc(px, py, brush / 2, 0, Math.PI * 2);
      mctx.fill();
      pctx.beginPath();
      pctx.arc(px, py, brush / 2, 0, Math.PI * 2);
      pctx.fill();
    } else {
      pctx.strokeStyle = `hsl(${hueRef.current}, 85%, 60%)`;
      mctx.beginPath();
      mctx.moveTo(from.x * size, from.y * size);
      mctx.lineTo(px, py);
      mctx.stroke();
      pctx.beginPath();
      pctx.moveTo(from.x * size, from.y * size);
      pctx.lineTo(px, py);
      pctx.stroke();
    }
    hueRef.current = (hueRef.current + 4) % 360;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (justCompleted) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = getPointerPos(e);
    strokesRef.current.push([p]);
    paintSegment(null, p);
    sounds.playPop();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const stroke = strokesRef.current[strokesRef.current.length - 1];
    if (!stroke) return;
    const p = getPointerPos(e);
    const prev = stroke[stroke.length - 1];
    stroke.push(p);
    paintSegment(prev, p);
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const pct = evaluateCoverage() ?? 0;
    if (pct >= COMPLETE_COVERAGE && !completedFlagRef.current) {
      completedFlagRef.current = true;
      setJustCompleted(true);
      setCompleted((prev) => new Set(prev).add(currentIndex));
      sounds.playFanfare();
      confetti({ particleCount: 90, spread: 90, origin: { y: 0.45 } });
      const label =
        charset === "letters"
          ? `Hebat! Kamu berhasil menjiplak huruf ${glyph}!`
          : `Hebat! Kamu berhasil menjiplak angka ${glyph}!`;
      speech.speak(label, 0.9, 1.15);

      const totalDone = completedCountRef.current + 1;
      completedCountRef.current = totalDone;
      if (totalDone % STARS_EVERY === 0) {
        onEarnStar();
      }
    }
  };

  // ---------- Aksi ----------
  const handleUndo = () => {
    sounds.playWhoosh();
    strokesRef.current.pop();
    redrawStrokes();
    evaluateCoverage();
  };

  const handleClear = () => {
    sounds.playWhoosh();
    strokesRef.current = [];
    completedFlagRef.current = false;
    setJustCompleted(false);
    redrawStrokes();
    evaluateCoverage();
  };

  const goToIndex = (idx: number) => {
    sounds.playPop();
    const safe = (idx + items.length) % items.length;
    setCurrentIndex(safe);
    setJustCompleted(false);
    setCoverage(0);
    strokesRef.current = [];
    // redrawStrokes dipanggil via effect saat glyph berubah
    const target = items[safe];
    if (charset === "letters") {
      const l = target as (typeof ALPHABET_LIST)[number];
      speech.speak(`Huruf ${l.letter}! ${l.letter} untuk ${l.word}`, 0.9, 1.15);
    } else {
      const n = target as (typeof NUMBERS_LIST)[number];
      speech.speak(`Angka ${n.word}! Ayo jiplak angka ${n.number}`, 0.9, 1.15);
    }
  };

  // ---------- Effects ----------
  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      // Tunggu font self-hosted siap agar glyph huruf tampil dengan Fredoka
      try {
        await document.fonts.ready;
      } catch {
        /* abaikan */
      }
      if (!cancelled) setupCanvases();
    };
    init();
    const onResize = () => setupCanvases();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, [setupCanvases]);

  // Saat pindah huruf/angka: perbarui mask & bersihkan goresan
  useEffect(() => {
    const size = canvasSize();
    const gctx = glyphMaskRef.current?.getContext("2d");
    if (gctx && size) drawGlyphOn(gctx, size, "#000");
    strokesRef.current = [];
    completedFlagRef.current = false;
    setJustCompleted(false);
    setCoverage(0);
    redrawStrokes();
    drawGuide();
  }, [glyph, redrawStrokes, drawGuide]);

  const pctLabel = Math.round(coverage * 100);

  return (
    <div className="space-y-4">
      {/* Pemilih huruf/angka */}
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-pink-200 shadow-sm p-3">
        <div
          className={`grid gap-1.5 ${
            charset === "letters" ? "grid-cols-7 sm:grid-cols-9" : "grid-cols-5 sm:grid-cols-10"
          }`}
        >
          {items.map((it, idx) => {
            const isActive = idx === currentIndex;
            const isDone = completed.has(idx);
            return (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`relative h-10 sm:h-11 rounded-xl font-black text-lg transition-all cursor-pointer border-2 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md scale-105"
                    : "bg-slate-50 hover:bg-pink-50 border-slate-200 text-slate-700"
                }`}
              >
                {charset === "letters" ? (it as (typeof ALPHABET_LIST)[number]).letter : (it as (typeof NUMBERS_LIST)[number]).number}
                {isDone && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[9px]">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
        {/* Papan Jiplak */}
        <div className="bg-white/90 rounded-3xl border-4 border-pink-200 shadow-lg p-4 sm:p-5 space-y-3">
          {/* Info huruf aktif */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-4xl ${item.bgColor} ${item.borderColor} border-2 rounded-2xl p-2`}>
                {item.emoji}
              </span>
              <div>
                <p className="font-black text-slate-800 text-lg leading-tight">
                  {charset === "letters"
                    ? `Huruf ${(item as (typeof ALPHABET_LIST)[number]).letter}`
                    : `Angka ${(item as (typeof NUMBERS_LIST)[number]).word}`}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {charset === "letters"
                    ? `${(item as (typeof ALPHABET_LIST)[number]).letter} untuk ${(item as (typeof ALPHABET_LIST)[number]).word}`
                    : "Jiplak dengan jarimu"}
                </p>
              </div>
            </div>
            <span className="text-3xl">✍️</span>
          </div>

          {/* Kanvas */}
          <div
            ref={containerRef}
            className="relative w-full max-w-[360px] mx-auto aspect-square rounded-2xl bg-white border-4 border-dashed border-pink-300 overflow-hidden"
          >
            <canvas ref={guideCanvasRef} className="absolute inset-0 w-full h-full" />
            <canvas
              ref={paintCanvasRef}
              className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
            {/* Overlay selesai */}
            {justCompleted && (
              <div className="absolute inset-0 bg-emerald-500/25 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 drop-shadow-lg" />
                <p className="font-black text-emerald-800 text-xl">Hebat Sekali! 🎉</p>
              </div>
            )}
          </div>

          {/* Progres & kontrol */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <Brush className="w-3.5 h-3.5 text-pink-500" />
                Isi hurufnya
              </span>
              <span className={pctLabel >= COMPLETE_COVERAGE * 100 ? "text-emerald-600" : ""}>
                {pctLabel}%
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  pctLabel >= COMPLETE_COVERAGE * 100
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                    : "bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"
                }`}
                style={{ width: `${Math.min(100, pctLabel)}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-black rounded-xl border-2 border-slate-200 shadow-sm text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Undo2 className="w-4 h-4" />
                  <span>Batalin</span>
                </button>
                <button
                  onClick={handleClear}
                  className="px-3 py-2 bg-white hover:bg-slate-50 text-rose-600 font-black rounded-xl border-2 border-rose-200 shadow-sm text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus</span>
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => goToIndex(currentIndex - 1)}
                  className="p-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-xl border-2 border-slate-200 shadow-sm cursor-pointer active:scale-95 transition-all"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => goToIndex(currentIndex + 1)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-xl shadow-md text-xs flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                >
                  <span>{justCompleted ? "Lanjut" : "Berikutnya"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel tips */}
        <div className="lg:w-56 space-y-3">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-200 p-4">
            <p className="font-black text-pink-700 text-sm mb-1">Cara Main 🖍️</p>
            <ul className="text-xs font-semibold text-pink-600/90 space-y-1.5 list-disc list-inside">
              <li>Warnai huruf besar dengan jarimu!</li>
              <li>Isi sampai progress jadi hijau.</li>
              <li>Kumpulkan 1 ⭐ setiap {STARS_EVERY} huruf selesai.</li>
            </ul>
          </div>
          <div className="bg-white/80 rounded-2xl border-2 border-emerald-200 p-4 text-center">
            <p className="text-xs font-bold text-slate-500">Sudah Selesai</p>
            <p className="text-2xl font-black text-emerald-600">
              {completed.size}
              <span className="text-base text-slate-400">/{items.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
