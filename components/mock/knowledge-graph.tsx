"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ */
/* The index                                                           */
/* ------------------------------------------------------------------ */

type Cluster = {
  id: string;
  label: string;
  colour: string;
  count: number;
  kind: string;
  stats: [string, string][];
  note: string;
};

const CLUSTERS: Cluster[] = [
  {
    id: "inspection",
    label: "Inspection",
    colour: "#5551c4",
    count: 92,
    kind: "Field records",
    stats: [
      ["Documents", "412"],
      ["Chunks", "38,900"],
      ["Cited this run", "6"],
    ],
    note: "Scanned reports going back nine turnarounds. OCR and layout parsing ran locally before any of it was indexed.",
  },
  {
    id: "drawings",
    label: "Drawings",
    colour: "#b0670f",
    count: 76,
    kind: "Engineering",
    stats: [
      ["Drawings", "1,860"],
      ["Tags extracted", "24,100"],
      ["Latest revision", "Rev-C"],
    ],
    note: "P&IDs and isometrics read by the vision model, so line numbers and instrument tags are searchable rather than pictures.",
  },
  {
    id: "procedures",
    label: "Procedures",
    colour: "#2338cc",
    count: 84,
    kind: "SOPs",
    stats: [
      ["Procedures", "630"],
      ["Sections", "9,240"],
      ["Cited this run", "3"],
    ],
    note: "Retrieved on the findings themselves, not because someone tagged them — SOP-114 and SOP-232 surfaced this way.",
  },
  {
    id: "standards",
    label: "Standards",
    colour: "#8a6ce2",
    count: 60,
    kind: "Reference",
    stats: [
      ["Standards", "78"],
      ["Clauses indexed", "31,500"],
      ["Cited this run", "4"],
    ],
    note: "API, ASME and internal codes. The reasoning layer cites the clause it used, so a reviewer can check the source.",
  },
  {
    id: "photos",
    label: "Photographs",
    colour: "#7e96f6",
    count: 68,
    kind: "Image sets",
    stats: [
      ["Images", "12,700"],
      ["Captioned", "12,700"],
      ["Corrosion flags", "214"],
    ],
    note: "Shot on the floor, described by the vision model, then linked back to the equipment they show.",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    colour: "#0f8b55",
    count: 64,
    kind: "Work history",
    stats: [
      ["Work orders", "8,400"],
      ["Linked assets", "1,120"],
      ["Open", "37"],
    ],
    note: "Every repair, replacement and deferral against the asset, so history is one hop from the current finding.",
  },
  {
    id: "commercial",
    label: "Commercial",
    colour: "#c2557a",
    count: 44,
    kind: "Procurement",
    stats: [
      ["Orders", "3,260"],
      ["Vendors", "180"],
      ["Linked to work", "62%"],
    ],
    note: "Purchase orders and invoices in the same index, so cost context sits beside the technical answer.",
  },
];

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

type Node3 = {
  x: number;
  y: number;
  z: number;
  r: number;
  cluster: number;
  hub: boolean;
};

/** deterministic, so the server and the client build the same graph */
function noise(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

function build() {
  const nodes: Node3[] = [];
  const edges: [number, number][] = [];
  const hubs: number[] = [];

  CLUSTERS.forEach((cluster, ci) => {
    // hubs spread over a sphere by golden angle, so no two sit on top of each
    // other from any viewing angle
    const t = (ci + 0.5) / CLUSTERS.length;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * ci;
    const R = 138;

    const hub = nodes.length;
    hubs.push(hub);
    nodes.push({
      x: R * Math.sin(phi) * Math.cos(theta),
      y: R * Math.sin(phi) * Math.sin(theta) * 0.66,
      z: R * Math.cos(phi),
      r: 7,
      cluster: ci,
      hub: true,
    });

    const centre = nodes[hub];

    for (let i = 0; i < cluster.count; i++) {
      const s = ci * 977 + i * 31;
      const u = noise(s) * 2 - 1;
      const a = noise(s + 1) * Math.PI * 2;
      const rad = 26 + noise(s + 2) * 74;
      const k = Math.sqrt(1 - u * u);

      const index = nodes.length;
      nodes.push({
        x: centre.x + rad * k * Math.cos(a),
        y: centre.y + rad * k * Math.sin(a) * 0.72,
        z: centre.z + rad * u,
        r: 1.3 + noise(s + 3) * 2.4,
        cluster: ci,
        hub: false,
      });
      edges.push([hub, index]);

      // a few sibling links, which is what turns a star into a mesh
      if (noise(s + 4) > 0.62 && index > hub + 2) {
        edges.push([index, hub + 1 + Math.floor(noise(s + 5) * (index - hub - 1))]);
      }
    }
  });

  // bridges between clusters — the reason it reads as one index and not seven
  hubs.forEach((h, i) => {
    edges.push([h, hubs[(i + 1) % hubs.length]]);
    edges.push([h, hubs[(i + 3) % hubs.length]]);
  });

  return { nodes, edges };
}

const { nodes: NODES, edges: EDGES } = build();

const TOUR_MS = 1900;
const FOCAL = 700;
const SPIN = 0.00014; // radians per ms — a little over a minute per turn

/**
 * A slow nod about X on top of the spin. A single-axis rotation reads as a flat
 * disc turning; adding a second, slower axis is what makes the cloud read as a
 * volume.
 */
const TILT = 0.2;
const TILT_RATE = 0.55;

/** how fast a cluster fades in or out of focus — see `lit` in the draw loop */
const EASE = 0.09;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * The whole index as one rotating graph — roughly 500 nodes across seven
 * clusters.
 *
 * Canvas rather than SVG: this is ~250 nodes and ~350 edges redrawn every
 * frame, and that many DOM elements carrying their own transforms drops frames
 * on a laptop. The perspective is done by hand — points live in 3D, spin around
 * Y, and project through a focal length — which is a few lines of maths against
 * the several hundred kilobytes a 3D library would add for one panel.
 *
 * Selection dims every cluster but one, so a click answers "how much of the
 * index is that" before the panel underneath has been read.
 */
export function KnowledgeGraph({
  tour = false,
  onInteract,
}: {
  tour?: boolean;
  onInteract?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [taken, setTaken] = useState(false);
  const reduce = useReducedMotion();

  // The draw loop reads the selection every frame but must not restart when it
  // changes, so it goes through a ref — synced in an effect rather than during
  // render, which would be a write in the render pass.
  const selectedRef = useRef(selected);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  // hover is read only by the draw loop, so it never needs to be React state
  const hoverRef = useRef(-1);

  // the graph walks itself until someone clicks, then hands over for good
  useEffect(() => {
    if (!tour || taken || reduce) return;
    const timer = setTimeout(
      () => setSelected((s) => (s + 1) % CLUSTERS.length),
      TOUR_MS,
    );
    return () => clearTimeout(timer);
  }, [tour, taken, selected, reduce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let angle = 0;
    let last = performance.now();
    let running = false;

    const projected = NODES.map(() => ({ x: 0, y: 0, s: 0, z: 0 }));
    const order = NODES.map((_, i) => i);
    const lit = CLUSTERS.map((_, i) => (i === selectedRef.current ? 1 : 0));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = () => {
      const cx = width / 2;
      const cy = height / 2;
      const fit = Math.min(width / 640, height / 460);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tilt = Math.sin(angle * TILT_RATE) * TILT;
      const tcos = Math.cos(tilt);
      const tsin = Math.sin(tilt);

      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        const x = n.x * cos - n.z * sin;
        const zy = n.x * sin + n.z * cos;
        const y = n.y * tcos - zy * tsin;
        const z = n.y * tsin + zy * tcos;
        const s = (FOCAL / (FOCAL + z)) * fit;
        const p = projected[i];
        p.x = cx + x * s;
        p.y = cy + y * s;
        p.s = s;
        p.z = z;
      }
    };

    const draw = (now: number) => {
      if (!running) return;
      const dt = now - last;
      last = now;
      if (!reduce) angle += dt * SPIN;

      project();
      ctx.clearRect(0, 0, width, height);

      // Focus is a per-cluster value eased toward its target rather than a
      // boolean. Switching clusters on the tour would otherwise snap two
      // hundred nodes at once, which reads as a glitch; easing turns the same
      // change into a cross-fade.
      const target = selectedRef.current;
      for (let c = 0; c < CLUSTERS.length; c++) {
        const want = c === target ? 1 : c === hoverRef.current ? 0.6 : 0;
        lit[c] += (want - lit[c]) * EASE;
      }

      // edges first, faint, and faded by depth so the far side recedes
      ctx.lineWidth = 0.6;
      for (const [a, b] of EDGES) {
        const pa = projected[a];
        const pb = projected[b];
        const ca = NODES[a].cluster;
        const cb = NODES[b].cluster;
        const focus = Math.max(lit[ca], lit[cb]);
        const depth = (pa.s + pb.s) / 2;
        ctx.globalAlpha = (0.045 + focus * 0.26) * Math.min(1, depth * 1.4);
        ctx.strokeStyle = focus > 0.5 ? CLUSTERS[ca].colour : "#111113";
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // back to front, so near nodes correctly overlap far ones. The order
      // array is reused and sorted in place — rebuilding it every frame at this
      // node count is measurable garbage.
      order.sort((a, b) => projected[b].z - projected[a].z);

      for (let k = 0; k < order.length; k++) {
        const i = order[k];
        const n = NODES[i];
        const p = projected[i];
        const focus = lit[n.cluster];
        const cluster = CLUSTERS[n.cluster];

        ctx.globalAlpha = (0.18 + focus * 0.78) * Math.min(1, p.s * 1.6);
        ctx.fillStyle = focus > 0.35 ? cluster.colour : "#8a8a92";

        // hubs get a halo, which is what stops them reading as slightly larger
        // dots once the cloud is this dense
        if (n.hub && focus > 0.02) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 34 * p.s);
          glow.addColorStop(0, `${cluster.colour}${Math.round(focus * 54).toString(16).padStart(2, "0")}`);
          glow.addColorStop(1, `${cluster.colour}00`);
          ctx.save();
          ctx.globalAlpha = 1;
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 34 * p.s, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          ctx.fillStyle = cluster.colour;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, n.r * p.s), 0, Math.PI * 2);
        ctx.fill();
      }

      // hub labels last, with a paper halo so they stay readable over the mesh
      ctx.font = "500 11px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        if (!n.hub) continue;
        const p = projected[i];
        const focus = lit[n.cluster];
        ctx.globalAlpha = 0.36 + focus * 0.64;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fcfbf9";
        ctx.strokeText(CLUSTERS[n.cluster].label, p.x, p.y - 14 * p.s);
        ctx.fillStyle = focus > 0.5 ? "#111113" : "#56565c";
        ctx.fillText(CLUSTERS[n.cluster].label, p.x, p.y - 14 * p.s);
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const sizes = new ResizeObserver(resize);
    sizes.observe(wrap);
    resize();

    // pause off screen — no reason to spin a graph nobody is looking at
    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === running) return;
        running = entry.isIntersecting;
        if (running) {
          last = performance.now();
          frame = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.05 },
    );
    visible.observe(wrap);

    const nearest = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      let best = -1;
      let bestDist = 26;
      for (let i = 0; i < NODES.length; i++) {
        const p = projected[i];
        // hubs win ties, so a click near a label picks its cluster
        const d = Math.hypot(p.x - mx, p.y - my) - (NODES[i].hub ? 14 : 0);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      return best;
    };

    const onClick = (event: MouseEvent) => {
      const hit = nearest(event);
      if (hit < 0) return;
      setTaken(true);
      setSelected(NODES[hit].cluster);
      onInteract?.();
    };

    const onMove = (event: MouseEvent) => {
      const hit = nearest(event);
      hoverRef.current = hit < 0 ? -1 : NODES[hit].cluster;
      canvas.style.cursor = hit < 0 ? "default" : "pointer";
    };

    const onLeave = () => {
      hoverRef.current = -1;
    };

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      sizes.disconnect();
      visible.disconnect();
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, onInteract]);

  const active = CLUSTERS[selected];

  return (
    <div className="space-y-3">
      <div
        ref={wrapRef}
        className="relative h-[330px] overflow-hidden rounded-[13px] bg-veil/60 sm:h-[430px]"
      >
        <div className="grid-paper absolute inset-0 opacity-45" />
        <canvas
          ref={canvasRef}
          className="relative block h-full w-full"
          role="img"
          aria-label="Rotating graph of the indexed knowledge base"
        />
        <p className="label pointer-events-none absolute right-3 top-3 text-[9px]">
          {taken ? active.label : "Click a cluster"}
        </p>
      </div>

      <motion.div
        key={active.id}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[13px] bg-surface p-4 shadow-e1 ring-1 ring-line"
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: active.colour }}
          />
          <p className="text-[13.5px] text-ink">{active.label}</p>
          <span
            className="rounded-full px-1.5 py-px font-mono text-[9.5px] tracking-[0.04em]"
            style={{ background: `${active.colour}1a`, color: active.colour }}
          >
            {active.kind}
          </span>
        </div>

        <dl className="mt-3.5 grid grid-cols-3 gap-2">
          {active.stats.map(([k, v]) => (
            <div key={k} className="rounded-[9px] bg-veil/70 px-2.5 py-2">
              <dt className="text-[10.5px] leading-tight text-muted">{k}</dt>
              <dd className="mt-1 font-mono text-[12.5px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-3.5 text-[12px] leading-relaxed text-body">{active.note}</p>
      </motion.div>
    </div>
  );
}
