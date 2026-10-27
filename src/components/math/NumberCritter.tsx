import React from "react";
import { animalFor, type MathAnimal } from "../../data/mathAnimals";

// Karakter hewan bernomor untuk Tabel Hitung. Digambar penuh dengan SVG agar
// angka benar-benar menempel di perut (atau di cangkang untuk Kura-Kura) dan
// tetap tajam di layar mana pun tanpa aset gambar.

const OUTLINE = "#443c5c";
const EYE = "#2b2740";
const CHEEK = "#f79ab0";
const CRITTER_FONT = "Fredoka, Quicksand, ui-rounded, sans-serif";

interface NumberCritterProps {
  value: number;
  /** Opsional: pakai hewan tertentu, default dari animalFor(value). */
  animal?: MathAnimal;
  /** Saat true, hewan melompat-lompat (baris yang sedang dibacakan). */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Ears: React.FC<{ animal: MathAnimal }> = ({ animal: a }) => {
  switch (a.ears) {
    case "round":
      return (
        <>
          <circle cx={37} cy={31} r={13} fill={a.body} />
          <circle cx={37} cy={31} r={7} fill={a.inner} stroke="none" />
          <circle cx={83} cy={31} r={13} fill={a.body} />
          <circle cx={83} cy={31} r={7} fill={a.inner} stroke="none" />
        </>
      );
    case "pointy":
      return (
        <>
          <path d="M31 45 L35 12 L58 32 Z" fill={a.body} />
          <path d="M36 40 L38 21 L52 31 Z" fill={a.inner} stroke="none" />
          <path d="M89 45 L85 12 L62 32 Z" fill={a.body} />
          <path d="M84 40 L82 21 L68 31 Z" fill={a.inner} stroke="none" />
        </>
      );
    case "long":
      return (
        <>
          <ellipse
            cx={45}
            cy={21}
            rx={8}
            ry={18}
            transform="rotate(-14 45 21)"
            fill={a.body}
          />
          <ellipse
            cx={45}
            cy={23}
            rx={4}
            ry={12}
            transform="rotate(-14 45 23)"
            fill={a.inner}
            stroke="none"
          />
          <ellipse
            cx={75}
            cy={21}
            rx={8}
            ry={18}
            transform="rotate(14 75 21)"
            fill={a.body}
          />
          <ellipse
            cx={75}
            cy={23}
            rx={4}
            ry={12}
            transform="rotate(14 75 23)"
            fill={a.inner}
            stroke="none"
          />
        </>
      );
    case "floppy":
      return (
        <>
          <ellipse
            cx={30}
            cy={58}
            rx={11}
            ry={21}
            transform="rotate(15 30 58)"
            fill={a.inner}
          />
          <ellipse
            cx={90}
            cy={58}
            rx={11}
            ry={21}
            transform="rotate(-15 90 58)"
            fill={a.inner}
          />
        </>
      );
    case "bump":
      // Katak: dua tonjolan mata di atas kepala (matanya digambar di wajah)
      return (
        <>
          <circle cx={41} cy={33} r={13} fill={a.body} />
          <circle cx={79} cy={33} r={13} fill={a.body} />
        </>
      );
    case "bigRound":
      return (
        <>
          <ellipse cx={24} cy={57} rx={17} ry={25} fill={a.body} />
          <ellipse cx={24} cy={57} rx={10} ry={16} fill={a.inner} stroke="none" />
          <ellipse cx={94} cy={57} rx={17} ry={25} fill={a.body} />
          <ellipse cx={94} cy={57} rx={10} ry={16} fill={a.inner} stroke="none" />
        </>
      );
    case "side":
      return (
        <>
          <ellipse
            cx={33}
            cy={46}
            rx={8}
            ry={11}
            transform="rotate(-25 33 46)"
            fill={a.body}
          />
          <ellipse
            cx={87}
            cy={46}
            rx={8}
            ry={11}
            transform="rotate(25 87 46)"
            fill={a.body}
          />
        </>
      );
    default:
      return null;
  }
};

const Tail: React.FC<{ animal: MathAnimal }> = ({ animal: a }) => {
  if (!a.tail) return null;

  const paths: Record<string, string> = {
    curl: "M88 116 C110 118 114 92 97 87",
    drop: "M90 116 C102 122 104 130 97 134",
    thin: "M89 118 C104 122 108 108 99 104",
  };
  const width: Record<string, [number, number]> = {
    curl: [13, 7.5],
    drop: [15, 9],
    thin: [8, 4],
  };
  const color = a.tail === "thin" ? a.inner : a.body;
  const [outer, inner] = width[a.tail];

  return (
    <>
      <path
        d={paths[a.tail]}
        fill="none"
        stroke={OUTLINE}
        strokeWidth={outer}
        strokeLinecap="round"
      />
      <path
        d={paths[a.tail]}
        fill="none"
        stroke={color}
        strokeWidth={inner}
        strokeLinecap="round"
      />
    </>
  );
};

const Face: React.FC<{ animal: MathAnimal }> = ({ animal: a }) => {
  // Katak: matanya menempel di tonjolan kepala, mulutnya lebar
  if (a.ears === "bump") {
    return (
      <>
        <circle cx={41} cy={31} r={8} fill="#ffffff" />
        <circle cx={79} cy={31} r={8} fill="#ffffff" />
        <circle cx={42} cy={32} r={4} fill={EYE} stroke="none" />
        <circle cx={80} cy={32} r={4} fill={EYE} stroke="none" />
        <circle cx={43.4} cy={30.4} r={1.6} fill="#ffffff" stroke="none" />
        <circle cx={81.4} cy={30.4} r={1.6} fill="#ffffff" stroke="none" />
        <path d="M43 60 Q60 76 77 60" fill="none" strokeWidth={3.2} />
        <ellipse cx={37} cy={68} rx={6} ry={4} fill={CHEEK} stroke="none" opacity={0.7} />
        <ellipse cx={83} cy={68} rx={6} ry={4} fill={CHEEK} stroke="none" opacity={0.7} />
      </>
    );
  }

  return (
    <>
      <circle cx={49} cy={52} r={5.5} fill={EYE} stroke="none" />
      <circle cx={71} cy={52} r={5.5} fill={EYE} stroke="none" />
      <circle cx={50.8} cy={50.2} r={1.9} fill="#ffffff" stroke="none" />
      <circle cx={72.8} cy={50.2} r={1.9} fill="#ffffff" stroke="none" />
      <ellipse cx={40} cy={64} rx={6} ry={4} fill={CHEEK} stroke="none" opacity={0.7} />
      <ellipse cx={80} cy={64} rx={6} ry={4} fill={CHEEK} stroke="none" opacity={0.7} />
      {/* Mulut; ditimpa oleh paruh/hidung, dan dilewati oleh gajah (belalainya
          menggantung tepat di situ) */}
      {a.feature !== "trunk" && (
        <path d="M52 66 Q60 74 68 66" fill="none" strokeWidth={3} />
      )}
    </>
  );
};

const Feature: React.FC<{ animal: MathAnimal }> = ({ animal: a }) => {
  switch (a.feature) {
    case "bill":
      return (
        <>
          <ellipse cx={60} cy={69} rx={16} ry={9} fill={a.inner} />
          <path d="M47 70 Q60 75 73 70" fill="none" strokeWidth={2.4} />
        </>
      );
    case "muzzle":
      return (
        <>
          <ellipse cx={60} cy={70} rx={15} ry={11} fill={a.belly} />
          <ellipse cx={60} cy={65} rx={5} ry={4} fill="#3b3350" stroke="none" />
          <path d="M60 71 v3" fill="none" strokeWidth={2.4} />
          <path d="M60 74 q-5 4 -9 0" fill="none" strokeWidth={2.4} />
          <path d="M60 74 q5 4 9 0" fill="none" strokeWidth={2.4} />
        </>
      );
    case "trunk":
      // Belalai menggantung di sisi kiri agar angka di perut tetap terbaca
      return (
        <>
          <path
            d="M46 74 C36 88 34 100 40 108 C43 112 48 110 47 106"
            fill="none"
            stroke={OUTLINE}
            strokeWidth={16}
            strokeLinecap="round"
          />
          <path
            d="M46 74 C36 88 34 100 40 108 C43 112 48 110 47 106"
            fill="none"
            stroke={a.body}
            strokeWidth={11}
            strokeLinecap="round"
          />
        </>
      );
    case "ossicones":
      return (
        <>
          <path d="M51 36 L46 19" fill="none" stroke={OUTLINE} strokeWidth={9} />
          <path d="M51 36 L46 19" fill="none" stroke={a.body} strokeWidth={5} />
          <circle cx={45} cy={17} r={6.5} fill={a.inner} />
          <path d="M69 36 L74 19" fill="none" stroke={OUTLINE} strokeWidth={9} />
          <path d="M69 36 L74 19" fill="none" stroke={a.body} strokeWidth={5} />
          <circle cx={75} cy={17} r={6.5} fill={a.inner} />
        </>
      );
    default:
      return null;
  }
};

export const NumberCritter: React.FC<NumberCritterProps> = ({
  value,
  animal,
  active = false,
  className = "",
  style,
}) => {
  const a = animal ?? animalFor(value);
  const digitCount = String(Math.abs(value)).length;
  const numberSize = digitCount >= 3 ? 18 : digitCount === 2 ? 24 : 29;

  // Angka di punggang = cangkang heksagon, selain itu patch bulat di perut
  const isShell = a.place === "back";

  return (
    <svg
      viewBox="0 0 120 140"
      className={`select-none pointer-events-none ${active ? "animate-critter-jiggle" : "animate-bounce-slow"} ${className}`}
      style={style}
      role="img"
      aria-label={`${a.name} membawa angka ${value}`}
    >
      <g
        stroke={OUTLINE}
        strokeWidth={2.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Cangkang di belakang badan (Kura-Kura) */}
        {a.shell && <ellipse cx={60} cy={102} rx={40} ry={31} fill={a.shell} />}

        <Tail animal={a} />
        <Ears animal={a} />

        {/* Kaki */}
        <ellipse cx={44} cy={127} rx={11} ry={8} fill={a.body} />
        <ellipse cx={76} cy={127} rx={11} ry={8} fill={a.body} />

        {/* Badan */}
        <ellipse cx={60} cy={104} rx={33} ry={25} fill={a.body} />

        {/* Bintik (Jerapah) */}
        {a.spots && (
          <>
            <ellipse cx={33} cy={97} rx={6} ry={5} fill={a.inner} stroke="none" />
            <ellipse cx={87} cy={101} rx={6} ry={5} fill={a.inner} stroke="none" />
            <ellipse cx={37} cy={115} rx={5.5} ry={4.5} fill={a.inner} stroke="none" />
          </>
        )}

        {/* Patch angka: perut (bulat) atau punggung/cangkang (heksagon) */}
        {isShell ? (
          <polygon points="80,108 70,125 50,125 40,108 50,91 70,91" fill={a.belly} />
        ) : (
          <ellipse cx={60} cy={108} rx={22} ry={17} fill={a.belly} />
        )}

        <text
          x={60}
          y={108}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={numberSize}
          fontWeight={900}
          fontFamily={CRITTER_FONT}
          fill="#3b3350"
          stroke="none"
        >
          {value}
        </text>

        {/* Kepala */}
        <circle cx={60} cy={56} r={27} fill={a.body} />
        <Face animal={a} />
        <Feature animal={a} />
      </g>
    </svg>
  );
};