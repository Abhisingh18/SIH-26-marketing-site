import { cn } from "@/lib/utils";

/**
 * The mascot as a moon rover, in pixel art: a tilted amber solar panel, a mast
 * with a dish, a blue chassis with a camera window, and three wheels. Drawn on
 * a unit grid so it stays crisp at any size (shapeRendering=crispEdges).
 */
type Cell = [x: number, y: number, w: number, h: number, fill: string];

const BLUE = "#3f49d8";
const AMBER = "#e2a83c";
const GREY = "#8a8a92";
const DARK = "#3a3a3f";
const GLASS = "#bfe0ff";

const CELLS: Cell[] = [
  // dish + mast (top right)
  [17, 0, 2, 1, AMBER],
  [16, 1, 1, 1, GREY],
  [15, 2, 1, 4, GREY],

  // solar panel, stepped so it reads as tilted
  [3, 1, 9, 1, AMBER],
  [4, 2, 9, 1, "#c8902a"],
  [8, 3, 1, 3, GREY], // panel support strut into the body

  // chassis
  [2, 6, 15, 4, BLUE],
  [1, 7, 1, 2, BLUE],
  [17, 7, 1, 2, BLUE],

  // camera window + lens
  [4, 7, 3, 2, GLASS],
  [12, 7, 2, 2, "#1b2233"],
  [13, 7, 1, 1, GLASS],

  // wheels with hubs
  [3, 10, 3, 3, GREY],
  [4, 11, 1, 1, DARK],
  [8, 10, 3, 3, GREY],
  [9, 11, 1, 1, DARK],
  [13, 10, 3, 3, GREY],
  [14, 11, 1, 1, DARK],
];

const COLS = 20;
const ROWS = 14;

export function PixelRover({ unit = 4, className }: { unit?: number; className?: string }) {
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
