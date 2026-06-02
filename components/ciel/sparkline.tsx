import { cn } from "@/lib/utils";
import type { StatusTone } from "@/components/ui/status-dot";

const stroke: Record<StatusTone, string> = {
  success: "stroke-success",
  warning: "stroke-warning",
  danger: "stroke-destructive",
  info: "stroke-brand",
  neutral: "stroke-muted-foreground",
};

const fill: Record<StatusTone, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  info: "text-brand",
  neutral: "text-muted-foreground",
};

/**
 * Tiny inline trend sparkline (byronwade-ui metric/table pattern). Tone-aware
 * line with an optional soft area fill and an endpoint dot.
 */
export function Sparkline({
  data,
  tone = "success",
  width = 120,
  height = 32,
  area = true,
  dot = true,
  strokeWidth = 1.5,
  className,
}: {
  data: number[];
  tone?: StatusTone;
  width?: number;
  height?: number;
  area?: boolean;
  dot?: boolean;
  strokeWidth?: number;
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth + 1;
  const innerH = height - pad * 2;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = pad + innerH - ((value - min) / range) * innerH;
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const areaPath = `${line} L${width},${height} L0,${height} Z`;
  const [lastX, lastY] = points[points.length - 1];
  const gradientId = `spark-${tone}-${width}-${height}-${data.length}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={cn(fill[tone], className)}
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} />
        </>
      )}
      <path
        d={line}
        className={stroke[tone]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {dot && <circle cx={lastX} cy={lastY} r={strokeWidth + 0.5} fill="currentColor" />}
    </svg>
  );
}
