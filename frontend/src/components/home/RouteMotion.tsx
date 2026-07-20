import Image from "next/image";
import worldMap from "@/assets/world-map.png";

/** Траектории 1920×720 — сеть по центру кадра */
const CX = 960;
const CY = 360;

const routes = [
  { from: { x: CX - 420, y: CY + 80 }, to: { x: CX + 280, y: CY - 60 }, delay: 0 },
  { from: { x: CX - 300, y: CY - 120 }, to: { x: CX + 420, y: CY + 40 }, delay: 0.8 },
  { from: { x: CX - 480, y: CY + 140 }, to: { x: CX + 160, y: CY - 140 }, delay: 1.4 },
  { from: { x: CX - 160, y: CY + 160 }, to: { x: CX + 480, y: CY - 20 }, delay: 0.4 },
  { from: { x: CX - 360, y: CY - 160 }, to: { x: CX + 240, y: CY + 140 }, delay: 1.8 },
  { from: { x: CX - 80, y: CY - 40 }, to: { x: CX + 520, y: CY - 100 }, delay: 1.1 },
  { from: { x: CX - 240, y: CY + 180 }, to: { x: CX + 360, y: CY - 160 }, delay: 2.2 },
];

const hubs = [
  [CX - 420, CY + 80],
  [CX - 300, CY - 120],
  [CX - 160, CY + 160],
  [CX + 160, CY - 140],
  [CX + 280, CY - 60],
  [CX + 240, CY + 140],
  [CX + 420, CY + 40],
  [CX + 360, CY - 160],
  [CX + 480, CY - 20],
  [CX + 520, CY - 100],
  [CX - 480, CY + 140],
  [CX - 80, CY - 40],
  [CX, CY],
];

const LINE = "#f0e0b8";
const DOT = "#f7ecd0";
const HUB = "#efe2bc";

interface RouteMotionProps {
  /** 0–1 видимость слоя */
  opacity?: number;
}

export function RouteMotion({ opacity = 1 }: RouteMotionProps) {
  if (opacity < 0.02) return null;

  return (
    <div
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
      style={{ opacity }}
      aria-hidden
    >
      {/* Карта (паутина) — центр, ширина под 1920 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[72%] max-w-[1400px] aspect-[1857/985]">
          <Image
            src={worldMap}
            alt=""
            fill
            sizes="(max-width: 1400px) 72vw, 1400px"
            className="object-contain object-center opacity-[0.22] brightness-125 contrast-110"
            priority={false}
          />
        </div>
      </div>

      {/* Траектории поверх карты */}
      <svg
        viewBox="0 0 1920 720"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {routes.map((route, i) => (
            <g key={`route-${i}`}>
              <line
                x1={route.from.x}
                y1={route.from.y}
                x2={route.to.x}
                y2={route.to.y}
                stroke={LINE}
                strokeWidth="2.4"
                opacity="0.55"
                strokeDasharray="8,6"
              />
              <circle r="5.5" fill={DOT}>
                <animateMotion
                  dur="3.6s"
                  repeatCount="indefinite"
                  begin={`${route.delay}s`}
                  path={`M${route.from.x},${route.from.y} L${route.to.x},${route.to.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="3.6s"
                  repeatCount="indefinite"
                  begin={`${route.delay}s`}
                />
              </circle>
            </g>
          ))}

          {hubs.map(([cx, cy], i) => (
            <g key={`hub-${i}`}>
              <circle cx={cx} cy={cy} r="6.5" fill={HUB} opacity="0.9">
                <animate
                  attributeName="r"
                  values="6.5;10;6.5"
                  dur="2.2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.2}s`}
                />
              </circle>
              <circle cx={cx} cy={cy} r="16" fill={HUB} opacity="0.2">
                <animate
                  attributeName="r"
                  values="16;26;16"
                  dur="2.2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.2}s`}
                />
              </circle>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
