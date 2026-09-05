/**
 * Two crossing waves carrying a handful of soft orbs, under the solutions hero.
 *
 * The waves are cubic approximations of a sine rather than hand-drawn curves, so
 * both are generated from the same node list and the mirrored one crosses the
 * first exactly at every midpoint. Drawing these by eye is how you end up with
 * two curves that nearly touch.
 *
 * Pure SVG and CSS: it is decorative, it sits above the fold on a page that
 * should paint immediately, and none of it needs to wait on hydration.
 */

const MID = 190;
const AMP = 60;
const HALF = 262;
const START = -70;
const NODES = 8;

/** cubic through alternating extremes — a clean sine at this segment count */
function wavePath(invert: boolean) {
  const y = (i: number) => (i % 2 === (invert ? 1 : 0) ? MID - AMP : MID + AMP);
  let d = `M ${START} ${y(0)}`;
  for (let i = 0; i < NODES; i++) {
    const x0 = START + i * HALF;
    const x1 = x0 + HALF;
    const k = HALF * 0.42;
    d += ` C ${x0 + k} ${y(i)}, ${x1 - k} ${y(i + 1)}, ${x1} ${y(i + 1)}`;
  }
  return d;
}

type Orb = {
  x: number;
  y: number;
  size: number;
  shape: "flower" | "burst" | "star" | "orb";
  from: string;
  to: string;
  spin: string;
  dur: number;
  delay: number;
};

const ORBS: Orb[] = [
  { x: 250, y: 250, size: 46, shape: "burst", from: "#f2d79a", to: "#e8f0c8", spin: "-10deg", dur: 9, delay: 0 },
  { x: 545, y: 148, size: 52, shape: "flower", from: "#5b63e0", to: "#3f49d8", spin: "12deg", dur: 11, delay: 1.4 },
  { x: 800, y: 158, size: 44, shape: "flower", from: "#8fa8f5", to: "#f0e2a8", spin: "-14deg", dur: 10, delay: 0.6 },
  { x: 1085, y: 238, size: 48, shape: "burst", from: "#e9d488", to: "#8fbf6a", spin: "9deg", dur: 12, delay: 2.1 },
  { x: 1355, y: 268, size: 44, shape: "star", from: "#f0855c", to: "#e0563f", spin: "-11deg", dur: 10.5, delay: 1 },
  { x: 1560, y: 212, size: 40, shape: "orb", from: "#dfe4fb", to: "#c3cbf5", spin: "8deg", dur: 13, delay: 0.3 },
];

/** a four-petal bloom, drawn once at unit scale and reused */
const FLOWER =
  "M0 -1 C .34 -.72 .72 -.34 1 0 C .72 .34 .34 .72 0 1 C -.34 .72 -.72 .34 -1 0 C -.72 -.34 -.34 -.72 0 -1 Z";

function burstPath(points = 12) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 1 : 0.84;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"} ${(Math.cos(a) * r).toFixed(3)} ${(Math.sin(a) * r).toFixed(3)} `;
  }
  return `${d}Z`;
}

const BURST = burstPath();
const STAR =
  "M0 -1 C .18 -.32 .32 -.18 1 0 C .32 .18 .18 .32 0 1 C -.18 .32 -.32 .18 -1 0 C -.32 -.18 -.18 -.32 0 -1 Z";

export function SolutionsWave() {
  return (
    <svg
      viewBox="0 0 1600 380"
      className="pointer-events-none h-[190px] w-full sm:h-[240px]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="sw-rail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dfe3fa" stopOpacity="0" />
          <stop offset="18%" stopColor="#dfe3fa" stopOpacity="1" />
          <stop offset="82%" stopColor="#e6e2f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#e6e2f6" stopOpacity="0" />
        </linearGradient>
        {ORBS.map((o, i) => (
          <linearGradient key={i} id={`sw-o${i}`} x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor={o.from} />
            <stop offset="100%" stopColor={o.to} />
          </linearGradient>
        ))}
      </defs>

      <path d={wavePath(false)} stroke="url(#sw-rail)" strokeWidth="14" strokeLinecap="round" />
      <path d={wavePath(true)} stroke="url(#sw-rail)" strokeWidth="14" strokeLinecap="round" />

      {ORBS.map((o, i) => (
        <g
          key={i}
          className="orb-bob"
          style={
            {
              ["--spin" as string]: o.spin,
              animationDuration: `${o.dur}s`,
              animationDelay: `${o.delay}s`,
            } as React.CSSProperties
          }
        >
          <g transform={`translate(${o.x} ${o.y}) scale(${o.size / 2})`}>
            {o.shape === "orb" ? (
              <circle r="1" fill={`url(#sw-o${i})`} />
            ) : (
              <path
                d={o.shape === "flower" ? FLOWER : o.shape === "burst" ? BURST : STAR}
                fill={`url(#sw-o${i})`}
              />
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}
