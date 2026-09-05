import { cn } from "@/lib/utils";

const LAYERS = [4, 6, 6, 4, 2];
const W = 1200;
const H = 520;
const PAD_X = 70;
const PAD_Y = 56;

/**
 * Deterministic jitter. `Math.random` here would bake one graph into the
 * prerender and draw a different one on the client, so the positions come from
 * a fixed hash instead.
 */
function noise(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

type Node = { x: number; y: number; layer: number; index: number };

function buildGraph() {
  const nodes: Node[][] = LAYERS.map((count, layer) => {
    const x = PAD_X + (layer * (W - PAD_X * 2)) / (LAYERS.length - 1);
    const span = H - PAD_Y * 2;
    return Array.from({ length: count }, (_, index) => {
      const t = count === 1 ? 0.5 : index / (count - 1);
      return {
        x: x + (noise(layer * 31 + index) - 0.5) * 46,
        y: PAD_Y + t * span + (noise(layer * 17 + index * 7) - 0.5) * 40,
        layer,
        index,
      };
    });
  });

  // Each node reaches forward to two or three neighbours, never the whole next
  // layer — a full mesh at this scale stops reading as a network and becomes
  // texture.
  const edges: { from: Node; to: Node; seed: number }[] = [];
  nodes.forEach((layer, li) => {
    const next = nodes[li + 1];
    if (!next) return;
    layer.forEach((node, ni) => {
      const fanout = 2 + Math.round(noise(li * 5 + ni));
      for (let k = 0; k < fanout; k++) {
        const target = next[Math.floor(noise(li * 43 + ni * 11 + k * 3) * next.length)];
        if (target) edges.push({ from: node, to: target, seed: li * 100 + ni * 10 + k });
      }
    });
  });

  return { nodes: nodes.flat(), edges };
}

const { nodes, edges } = buildGraph();

/**
 * A feed-forward graph with signals running along its edges.
 *
 * Sits behind copy, so everything is deliberately faint: the static edges are
 * barely visible and the pulses are what the eye actually catches. Each pulse
 * carries its own duration and delay, so the field never falls into lockstep.
 */
export function NeuralField({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="nf-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dd7a15" />
          <stop offset="50%" stopColor="#8a6ce2" />
          <stop offset="100%" stopColor="#2f43d6" />
        </linearGradient>
      </defs>

      {/* the graph itself, held right at the edge of visibility */}
      <g stroke="url(#nf-edge)" strokeWidth="1" opacity="0.16">
        {edges.map((e, i) => (
          <line key={`s-${i}`} x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} />
        ))}
      </g>

      {/* signals travelling forward through it */}
      <g stroke="url(#nf-edge)" strokeWidth="1.8" strokeLinecap="round">
        {edges.map((e, i) => (
          <line
            key={`p-${i}`}
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            className="net-pulse"
            style={{
              animationDuration: `${3.6 + noise(e.seed) * 3.4}s`,
              animationDelay: `${noise(e.seed * 2) * 6}s`,
            }}
          />
        ))}
      </g>

      <g>
        {nodes.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={2.6}
            fill="#5551c4"
            className="net-node"
            style={{
              animationDuration: `${3 + noise(i * 3) * 3}s`,
              animationDelay: `${noise(i * 9) * 5}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
