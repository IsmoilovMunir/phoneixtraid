"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import kamaz from "@/assets/kamaz-cutout.png";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

interface DrivingKamazProps {
  /** 0–1: появление справа → на место */
  enterProgress: number;
  /** 0–1: с места полностью уезжает влево за край */
  driveProgress?: number;
  /** Общая прозрачность (выход со сцены) */
  opacity?: number;
}

export function DrivingKamaz({
  enterProgress,
  driveProgress = 0,
  opacity = 1,
}: DrivingKamazProps) {
  const truckRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const truck = truckRef.current;
    const road = roadRef.current;
    const dash = dashRef.current;
    if (!truck) return;

    const enter = easeInOutCubic(clamp01(enterProgress));
    const drive = easeInOutCubic(clamp01(driveProgress));

    // Справа → на место → влево по дороге
    const fromRight = (1 - enter) * 55;
    const driveLeft = -drive * 115;
    const y = drive * 2;
    const rotate = -drive * 1.2;
    const scale = 0.92 + enter * 0.08 - drive * 0.05;

    const visible =
      drive >= 0.98
        ? 0
        : clamp01(enterProgress) * opacity * (1 - Math.max(0, drive - 0.82) / 0.16);

    truck.style.opacity = String(visible);
    truck.style.transform = `translate3d(calc(${fromRight}vw + ${driveLeft}vw), ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;

    if (road) {
      road.style.opacity = String(visible * 0.95);
    }
    if (dash) {
      // Разметка «бежит» назад при движении — ощущение езды
      dash.style.backgroundPosition = `${drive * -220}% 50%`;
    }
  }, [enterProgress, driveProgress, opacity]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden="true">
      {/* Дорога */}
      <div
        ref={roadRef}
        className="absolute bottom-0 left-[-5%] right-[-5%] h-[16%] min-h-[72px] md:h-[18%] md:min-h-[96px]"
        style={{
          opacity: 0,
          transform: "perspective(700px) rotateX(42deg)",
          transformOrigin: "50% 100%",
        }}
      >
        {/* Обочина */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(40,32,22,0.35) 18%, rgba(28,24,18,0.55) 100%)",
          }}
        />

        {/* Асфальт */}
        <div
          className="absolute left-[2%] right-[2%] top-[22%] bottom-[8%] rounded-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 35%, #1f1f1f 70%, #171717 100%)",
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.06), inset 0 -3px 8px rgba(0,0,0,0.45), 0 10px 28px rgba(0,0,0,0.35)",
          }}
        >
          {/* Края дороги */}
          <div className="absolute left-0 right-0 top-[10%] h-[2px] bg-[#e8d9a8]/70" />
          <div className="absolute left-0 right-0 bottom-[12%] h-[2px] bg-[#e8d9a8]/55" />

          {/* Пунктир по центру */}
          <div
            ref={dashRef}
            className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #f0e0b8 0 28px, transparent 28px 52px)",
              backgroundSize: "200% 100%",
              opacity: 0.75,
              filter: "drop-shadow(0 0 2px rgba(240,224,184,0.35))",
            }}
          />
        </div>
      </div>

      {/* Мягкая тень под колёсами */}
      <div
        className="absolute bottom-[4%] left-0 right-0 h-6 md:h-8"
        style={{
          opacity: Math.min(1, enterProgress) * opacity * 0.55,
          background:
            "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 70%)",
        }}
      />

      <div
        ref={truckRef}
        className="absolute bottom-[2%] right-[-2%] w-[min(88%,820px)] sm:w-[min(78%,760px)] md:bottom-[3%] md:right-[-1%] md:w-[min(70%,720px)] lg:w-[min(62%,680px)]"
        style={{
          opacity: 0,
          transform: "translate3d(55vw, 0, 0) scale(0.92)",
          transformOrigin: "55% 95%",
          willChange: "transform, opacity",
          filter: "drop-shadow(0 10px 12px rgba(0,0,0,0.5))",
        }}
      >
        <Image
          src={kamaz}
          alt=""
          width={2601}
          height={1101}
          sizes="(max-width: 768px) 90vw, 55vw"
          className="h-auto w-full select-none"
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}
