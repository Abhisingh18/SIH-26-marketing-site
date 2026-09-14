import { cn } from "@/lib/utils";

/**
 * The mascot as a moon rover, in pixel art: a tilted amber solar array on a
 * strut, a mast with a dish and a beacon, a blue chassis with a camera window
 * and a lit instrument panel, and three wheels with hubs. Drawn on a unit grid
 * so it stays crisp at any size (shapeRendering=crispEdges).
 */
type Cell = [x: number, y: number, w: number, h: number, fill: string];

const BLUE = "#3f49d8";
const BLUE2 = "#6670ee";
const AMBER = "#e2a83c";
const AMBER2 = "#b9781f";
const GREY = "#8a8a92";
const DARK = "#3a3a3f";
const GLASS = "#bfe0ff";
const RED = "#e0563f";
const GREEN = "#3ddc84";
const HUB = "#b9bcc7";

const CELLS: Cell[] = [
  // solar array — two offset rows with grid dividers, on a strut
  [3, 2, 12, 1, AMBER],
  [4, 3, 12, 1, AMBER],
  [6, 2, 1, 1, AMBER2],
  [9, 2, 1, 1, AMBER2],
  [12, 2, 1, 1, AMBER2],
  [7, 3, 1, 1, AMBER2],
  [10, 3, 1, 1, AMBER2],
  [13, 3, 1, 1, AMBER2],
  [9, 4, 1, 3, GREY],

  // mast, dish, beacon
  [20, 2, 1, 5, GREY],
  [18, 1, 5, 1, AMBER],
  [17, 2, 1, 1, AMBER],
  [22, 2, 1, 1, AMBER2],
  [20, 0, 1, 1, RED],

  // chassis
  [4, 6, 18, 1, BLUE2],
  [3, 7, 20, 4, BLUE],
  [2, 8, 1, 2, BLUE],
  [23, 8, 1, 2, BLUE],
  [5, 7, 4, 2, GLASS], // camera window
  [17, 7, 4, 3, "#1b2233"], // instrument box
  [18, 8, 1, 1, GREEN],
  [20, 8, 1, 1, AMBER],

  // wheels with hubs
  [4, 11, 4, 4, GREY],
  [5, 12, 2, 2, DARK],
  [5, 12, 1, 1, HUB],
  [12, 11, 4, 4, GREY],
  [13, 12, 2, 2, DARK],
  [13, 12, 1, 1, HUB],
  [19, 11, 4, 4, GREY],
  [20, 12, 2, 2, DARK],
  [20, 12, 1, 1, HUB],
];

const COLS = 26;
const ROWS = 17;

export function PixelRover({ unit = 3, className }: { unit?: number; className?: string }) {
  return (
    <svg
      width={COLS * unit}
      height={ROWS * unit}
      viewBox={`0 0 ${COLS} ${ROWS}`}
      className={cn("block", className)}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {CELLS.map(([x, y, w, h, fill], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
      ))}
    </svg>
  );
}
