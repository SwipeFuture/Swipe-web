"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { YearPoint } from "./calculations";
import type { Currency } from "../shared/currency";
import { formatCompactCurrency, formatCurrency } from "../shared/formatters";

const VB_W = 1000;
const VB_H = 420;
const MARGIN = { top: 24, right: 16, bottom: 40, left: 64 };
const PLOT_W = VB_W - MARGIN.left - MARGIN.right;
const PLOT_H = VB_H - MARGIN.top - MARGIN.bottom;

const PORTFOLIO_COLOR = "#D97706"; // amber-600 — the hero series
const INVESTED_COLOR = "#A8A29E"; // stone-400 — the muted reference series

// Paul Heckbert's "nice numbers" — round axis ticks (0 / 1,000 / 2,000…) instead of
// whatever the raw max happens to be.
function niceNumber(range: number, round: boolean): number {
  if (range <= 0) return 1;
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction: number;
  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}

function niceTicks(max: number, tickCount = 5): { ticks: number[]; niceMax: number } {
  if (max <= 0) return { ticks: [0], niceMax: 1 };
  const niceRange = niceNumber(max, false);
  const step = niceNumber(niceRange / (tickCount - 1), true);
  const niceMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= niceMax + step * 0.5; v += step) ticks.push(v);
  return { ticks, niceMax };
}

function buildLinePath(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

export default function GrowthChart({ years, currency }: { years: YearPoint[]; currency: Currency }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const durationYears = years.length - 1;

  const { ticks, niceMax, portfolioPoints, investedPoints, xScale } = useMemo(() => {
    const maxVal = Math.max(1, ...years.map((y) => y.endingBalance));
    const { niceMax: rawNiceMax, ticks } = niceTicks(maxVal, 5);
    const niceMax = Number.isFinite(rawNiceMax) && rawNiceMax > 0 ? rawNiceMax : 1;

    const xScale = (yearIdx: number) => MARGIN.left + (durationYears === 0 ? 0 : (yearIdx / durationYears) * PLOT_W);
    const yScale = (value: number) => MARGIN.top + PLOT_H - (value / niceMax) * PLOT_H;

    const portfolioPoints = years.map((y) => ({ x: xScale(y.year), y: yScale(y.endingBalance) }));
    const investedPoints = years.map((y) => ({ x: xScale(y.year), y: yScale(y.totalInvested) }));

    return { ticks, niceMax, portfolioPoints, investedPoints, xScale };
  }, [years, durationYears]);

  const baselineY = MARGIN.top + PLOT_H;
  const portfolioLine = buildLinePath(portfolioPoints);
  const investedLine = buildLinePath(investedPoints);
  const portfolioArea = `${portfolioLine} L${portfolioPoints[portfolioPoints.length - 1].x.toFixed(2)},${baselineY} L${portfolioPoints[0].x.toFixed(2)},${baselineY} Z`;

  // A handful of evenly-spaced X labels — never one per year, that's unreadable past ~15 years.
  const xLabelCount = Math.min(durationYears, 8) || 1;
  const xLabelStep = Math.max(1, Math.round(durationYears / xLabelCount));
  const xLabels = years.filter((y) => y.year % xLabelStep === 0 || y.year === durationYears);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || durationYears === 0) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * VB_W;
    const fraction = (relX - MARGIN.left) / PLOT_W;
    const idx = Math.round(fraction * durationYears);
    setHoverIdx(Math.min(durationYears, Math.max(0, idx)));
  };

  const hovered = hoverIdx !== null && hoverIdx < years.length ? years[hoverIdx] : null;
  const tooltipLeftPct = hoverIdx !== null ? (xScale(hoverIdx) / VB_W) * 100 : 0;
  const tooltipAlign = tooltipLeftPct < 18 ? "left" : tooltipLeftPct > 82 ? "right" : "center";

  return (
    <div className="relative">

      <div className="absolute -inset-px rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-amber-500/0 via-amber-500/40 to-orange-400/0 blur-md opacity-60 -z-10" />

      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] border border-white/70 bg-white/60 backdrop-blur-xl p-6 sm:p-9 lg:p-10 shadow-xl">

        <div className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

        <div className="relative flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-stone-800">Portfolio Growth</h3>

          {/* Legend — line keys, not boxes */}
          <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-stone-500">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-[2px] w-4 rounded-full" style={{ backgroundColor: PORTFOLIO_COLOR }} />
              Portfolio Value
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-[2px] w-4 rounded-full" style={{ backgroundColor: INVESTED_COLOR }} />
              Total Invested
            </span>
          </div>
        </div>

        <div ref={wrapperRef} className="relative mt-5 sm:mt-7">

          <svg
            ref={svgRef}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full h-[280px] sm:h-[360px] lg:h-[420px] touch-none"
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setHoverIdx(null)}
          >
            <defs>
              <linearGradient id="portfolioAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PORTFOLIO_COLOR} stopOpacity={0.1} />
                <stop offset="100%" stopColor={PORTFOLIO_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Gridlines — hairline, recessive, solid */}
            {ticks.map((t) => {
              const y = MARGIN.top + PLOT_H - (t / niceMax) * PLOT_H;
              return (
                <g key={t}>
                  <line x1={MARGIN.left} x2={VB_W - MARGIN.right} y1={y} y2={y} stroke="#E7E5E4" strokeWidth={1} />
                  <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" className="fill-stone-400" fontSize={12}>
                    {formatCompactCurrency(t, currency)}
                  </text>
                </g>
              );
            })}

            {/* X axis labels */}
            {xLabels.map((y) => (
              <text
                key={y.year}
                x={xScale(y.year)}
                y={VB_H - MARGIN.bottom + 22}
                textAnchor="middle"
                className="fill-stone-400"
                fontSize={12}
              >
                {y.year}
              </text>
            ))}

            {/* Area wash under the hero series only */}
            <path d={portfolioArea} fill="url(#portfolioAreaFill)" stroke="none" />

            {/* Total Invested — muted reference line */}
            <path
              d={investedLine}
              fill="none"
              stroke={INVESTED_COLOR}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: visible ? 0 : 1,
                transition: "stroke-dashoffset 1.4s ease-out",
              }}
            />

            {/* Portfolio Value — hero series */}
            <path
              d={portfolioLine}
              fill="none"
              stroke={PORTFOLIO_COLOR}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: visible ? 0 : 1,
                transition: "stroke-dashoffset 1.4s ease-out 0.1s",
              }}
            />

            {/* End markers — 8px dot, 2px surface ring */}
            <circle cx={portfolioPoints[portfolioPoints.length - 1].x} cy={portfolioPoints[portfolioPoints.length - 1].y} r={5} fill={PORTFOLIO_COLOR} stroke="#fff" strokeWidth={2} />
            <circle cx={investedPoints[investedPoints.length - 1].x} cy={investedPoints[investedPoints.length - 1].y} r={5} fill={INVESTED_COLOR} stroke="#fff" strokeWidth={2} />

            {/* Direct end-label on the hero series */}
            <text
              x={portfolioPoints[portfolioPoints.length - 1].x - 8}
              y={portfolioPoints[portfolioPoints.length - 1].y - 12}
              textAnchor="end"
              fontSize={13}
              fontWeight={700}
              className="fill-stone-800"
            >
              {formatCompactCurrency(years[years.length - 1].endingBalance, currency)}
            </text>

            {/* Crosshair */}
            {hovered && (
              <g>
                <line
                  x1={xScale(hovered.year)}
                  x2={xScale(hovered.year)}
                  y1={MARGIN.top}
                  y2={baselineY}
                  stroke="#D6D3D1"
                  strokeWidth={1}
                />
                <circle cx={xScale(hovered.year)} cy={portfolioPoints[hovered.year].y} r={6} fill={PORTFOLIO_COLOR} stroke="#fff" strokeWidth={2} />
                <circle cx={xScale(hovered.year)} cy={investedPoints[hovered.year].y} r={6} fill={INVESTED_COLOR} stroke="#fff" strokeWidth={2} />
              </g>
            )}
          </svg>

          {/* Tooltip */}
          {hovered && (
            <div
              className="pointer-events-none absolute top-2 z-10 rounded-2xl border border-white/80 bg-white/95 backdrop-blur-xl px-4 py-3 shadow-xl transition-[left] duration-100 ease-out"
              style={{
                left: `${tooltipLeftPct}%`,
                transform: tooltipAlign === "left" ? "translateX(0%)" : tooltipAlign === "right" ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              <div className="text-xs font-semibold text-stone-400">Year {hovered.year}</div>
              <div className="mt-1.5 flex items-center gap-2 text-sm">
                <span className="inline-block h-[2px] w-3 rounded-full" style={{ backgroundColor: PORTFOLIO_COLOR }} />
                <span className="font-bold text-stone-800">{formatCurrency(hovered.endingBalance, currency)}</span>
                <span className="text-stone-400">Portfolio</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="inline-block h-[2px] w-3 rounded-full" style={{ backgroundColor: INVESTED_COLOR }} />
                <span className="font-bold text-stone-800">{formatCurrency(hovered.totalInvested, currency)}</span>
                <span className="text-stone-400">Invested</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
