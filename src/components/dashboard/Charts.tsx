import { CHART_DATA, MONTHS, HEATMAP_DATA, DAYS, DONUT_SEGMENTS } from "./constants";

export function SparkLine({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 400; const h = 80;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 8) - 4}`).join(" ");
  const fillPoints = `0,${h} ${points} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#63ffb4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#63ffb4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill="url(#sg)" />
      <polyline points={points} fill="none" stroke="#63ffb4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DonutChart() {
  const total = DONUT_SEGMENTS.reduce((s, d) => s + d.value, 0);
  let angle = -90;
  const r = 68; const cx = 88; const cy = 88;
  function polar(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  const arcs = DONUT_SEGMENTS.map((seg) => {
    const start = angle;
    const sweep = (seg.value / total) * 358;
    angle += sweep + 1;
    const s = polar(cx, cy, r, start);
    const e = polar(cx, cy, r, start + sweep);
    const large = sweep > 180 ? 1 : 0;
    return { ...seg, d: `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}` };
  });
  return (
    <div className="flex items-center gap-8">
      <svg viewBox="0 0 176 176" className="w-36 h-36 shrink-0">
        {arcs.map((a) => (
          <path key={a.label} d={a.d} fill="none" stroke={a.color} strokeWidth="18" strokeLinecap="round" />
        ))}
        <circle cx={cx} cy={cy} r="38" fill="#0c0f1a" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="IBM Plex Mono">42%</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#555" fontSize="9" fontFamily="IBM Plex Mono">органика</text>
      </svg>
      <div className="space-y-2.5">
        {DONUT_SEGMENTS.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-white/50 text-sm">{s.label}</span>
            <span className="font-mono text-white text-sm font-semibold ml-auto pl-4">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart() {
  const max = Math.max(...CHART_DATA);
  return (
    <div className="flex items-end gap-1.5 h-28 w-full">
      {CHART_DATA.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1 group">
          <div className="relative w-full rounded-t-sm cursor-pointer overflow-visible"
            style={{ height: `${(v / max) * 100}px`, background: i === 3 ? "linear-gradient(to top, #63ffb4, #38bdf8)" : "rgba(99,255,180,0.18)", transition: "all 0.2s", boxShadow: i === 3 ? "0 0 12px rgba(99,255,180,0.3)" : "none" }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1a2030] text-[#63ffb4] text-[10px] px-1.5 py-0.5 rounded font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {v}k
            </div>
          </div>
          <span className="text-[9px] text-white/25 font-mono">{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function Heatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="flex gap-0.5 mb-1 ml-8">
          {Array.from({ length: 24 }, (_, h) => (
            <div key={h} className="flex-1 text-center text-[8px] text-white/20 font-mono">{h}</div>
          ))}
        </div>
        {HEATMAP_DATA.map((row, ri) => (
          <div key={ri} className="flex items-center gap-0.5 mb-0.5">
            <span className="w-7 text-[9px] text-white/30 font-mono shrink-0">{DAYS[ri]}</span>
            {row.map((val, ci) => (
              <div key={ci} className="flex-1 h-4 rounded-[2px] transition-transform duration-150 hover:scale-125 cursor-pointer"
                style={{ background: `rgba(99,255,180,${val * 0.9})` }} />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-1.5 mt-3 ml-8">
          <span className="text-[9px] text-white/20">Меньше</span>
          {[0.08, 0.22, 0.42, 0.62, 0.85].map((v) => (
            <div key={v} className="w-4 h-4 rounded-sm" style={{ background: `rgba(99,255,180,${v})` }} />
          ))}
          <span className="text-[9px] text-white/20">Больше</span>
        </div>
      </div>
    </div>
  );
}
