import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
  { id: "reports", label: "Отчёты", icon: "FileBarChart" },
  { id: "analysis", label: "Анализ", icon: "TrendingUp" },
  { id: "integrations", label: "Интеграции", icon: "Plug" },
  { id: "settings", label: "Настройки", icon: "Settings2" },
];

const METRICS = [
  { label: "Посетители", value: "248 391", delta: "+12.4%", up: true, icon: "Users" },
  { label: "Конверсия", value: "4.87%", delta: "+0.6%", up: true, icon: "MousePointerClick" },
  { label: "Выручка", value: "₽1.84М", delta: "+23.1%", up: true, icon: "CircleDollarSign" },
  { label: "Отказы", value: "28.3%", delta: "-4.2%", up: false, icon: "LogOut" },
];

const CHART_DATA = [42, 67, 55, 80, 60, 90, 75, 95, 70, 85, 92, 78];
const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const HEATMAP_DATA = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 24 }, (_, col) => {
    const vals = [0.2,0.15,0.3,0.25,0.4,0.35,0.5,0.45,0.8,0.9,0.85,0.7,0.75,0.8,0.65,0.7,0.6,0.5,0.4,0.35,0.3,0.25,0.2,0.15];
    const base = vals[col] ?? 0.3;
    const weekday = row < 5 ? 1.2 : 0.6;
    return Math.min(1, base * weekday * (0.7 + Math.random() * 0.6));
  })
);
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const DONUT_SEGMENTS = [
  { label: "Органика", value: 42, color: "#63ffb4" },
  { label: "Реклама", value: 28, color: "#a78bfa" },
  { label: "Соцсети", value: 18, color: "#38bdf8" },
  { label: "Прямые", value: 12, color: "#fb923c" },
];

const REPORTS = [
  { name: "Квартальный отчёт Q1", date: "01.04.2026", status: "Готов", size: "2.4 MB" },
  { name: "Воронка продаж — Март", date: "31.03.2026", status: "Готов", size: "1.1 MB" },
  { name: "Анализ трафика — Март", date: "30.03.2026", status: "Готов", size: "876 KB" },
  { name: "Сводка по интеграциям", date: "28.03.2026", status: "В работе", size: "—" },
  { name: "A/B тест лендинга", date: "25.03.2026", status: "Готов", size: "3.2 MB" },
];

const INTEGRATIONS = [
  { name: "Google Analytics", icon: "BarChart2", connected: true, color: "#f97316" },
  { name: "Яндекс.Метрика", icon: "Activity", connected: true, color: "#63ffb4" },
  { name: "AmoCRM", icon: "Users", connected: false, color: "#a78bfa" },
  { name: "1С Бизнес", icon: "Building2", connected: false, color: "#38bdf8" },
  { name: "Telegram Бот", icon: "MessageCircle", connected: true, color: "#fbbf24" },
  { name: "Bitrix24", icon: "Layers", connected: false, color: "#fb7185" },
];

function SparkLine({ data }: { data: number[] }) {
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

function DonutChart() {
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

function BarChart() {
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

function Heatmap() {
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

function HomePage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 border border-white/[0.06]" style={{ background: "linear-gradient(135deg,#0c0f1a 0%,#101525 100%)" }}>
        <div className="absolute -top-20 -left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle,rgba(99,255,180,0.08),transparent)" }} />
        <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle,rgba(56,189,248,0.06),transparent)" }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#63ffb4]/20 bg-[#63ffb4]/8 text-[#63ffb4] text-xs font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#63ffb4] animate-pulse" />
            LIVE · обновлено 2 мин назад
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-golos font-black text-white leading-tight mb-3">
            Ваша аналитика<br />
            <span style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg,#63ffb4,#38bdf8)", backgroundClip: "text" }}>в одном месте</span>
          </h1>
          <p className="text-white/40 text-base mb-7 max-w-lg">Отслеживайте метрики, стройте отчёты и принимайте решения на основе данных.</p>
          <div className="flex gap-3 flex-wrap">
            <button className="px-5 py-2.5 rounded-xl font-golos font-semibold text-sm text-[#080b12] hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(90deg,#63ffb4,#38bdf8)", boxShadow: "0 0 20px rgba(99,255,180,0.2)" }}>
              Открыть дашборд
            </button>
            <button className="px-5 py-2.5 rounded-xl font-golos font-semibold text-sm text-white/60 border border-white/10 hover:border-white/25 hover:text-white transition-all">
              Смотреть отчёты
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {METRICS.map((m, i) => (
          <div key={m.label} className="p-4 rounded-2xl border border-white/[0.06] hover:border-white/10 transition-all hover:scale-[1.02]"
            style={{ background: "#0c0f1a", animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,255,180,0.07)" }}>
                <Icon name={m.icon as string} size={16} className="text-[#63ffb4]" />
              </div>
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${m.up ? "text-[#63ffb4] bg-[#63ffb4]/10" : "text-[#fb923c] bg-[#fb923c]/10"}`}>{m.delta}</span>
            </div>
            <div className="text-xl font-mono font-bold text-white mb-0.5">{m.value}</div>
            <div className="text-white/35 text-xs">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-3 p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          <p className="font-golos font-bold text-white text-sm mb-0.5">Трафик за год</p>
          <p className="text-white/30 text-xs mb-5">тысяч посетителей по месяцам</p>
          <BarChart />
        </div>
        <div className="md:col-span-2 p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          <p className="font-golos font-bold text-white text-sm mb-0.5">Источники</p>
          <p className="text-white/30 text-xs mb-5">распределение по каналам</p>
          <DonutChart />
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [period, setPeriod] = useState(1);
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-golos font-black text-white">Дашборд</h2>
          <p className="text-white/30 text-xs">Апрель 2026 — текущий период</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          {["7д", "30д", "3м", "12м"].map((p, i) => (
            <button key={p} onClick={() => setPeriod(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${period === i ? "text-[#080b12] font-semibold" : "text-white/35 hover:text-white"}`}
              style={period === i ? { background: "linear-gradient(90deg,#63ffb4,#38bdf8)" } : {}}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {METRICS.map((m) => (
          <div key={m.label} className="p-4 rounded-2xl border border-white/[0.06] hover:border-[#63ffb4]/15 transition-all" style={{ background: "#0c0f1a" }}>
            <div className="flex items-center gap-2 mb-2.5">
              <Icon name={m.icon as string} size={13} className="text-[#63ffb4]" />
              <span className="text-white/35 text-xs">{m.label}</span>
            </div>
            <div className="text-xl font-mono font-bold text-white">{m.value}</div>
            <div className={`text-[11px] font-mono mt-0.5 ${m.up ? "text-[#63ffb4]" : "text-[#fb923c]"}`}>{m.delta} vs прошлый мес.</div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-golos font-bold text-white text-sm">Динамика посещаемости</p>
          <div className="flex gap-3 text-[11px] text-white/30">
            <span className="flex items-center gap-1.5"><span className="w-4 h-px bg-[#63ffb4] inline-block" />Посетители</span>
          </div>
        </div>
        <SparkLine data={CHART_DATA} />
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
        <p className="font-golos font-bold text-white text-sm mb-0.5">Тепловая карта активности</p>
        <p className="text-white/30 text-xs mb-5">по часам и дням недели</p>
        <Heatmap />
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-golos font-black text-white">Отчёты</h2>
          <p className="text-white/30 text-xs">Все сформированные отчёты</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-golos font-semibold text-[#080b12] hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(90deg,#63ffb4,#38bdf8)" }}>
          <Icon name="Plus" size={14} />
          Новый отчёт
        </button>
      </div>
      <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "#0c0f1a" }}>
        <div className="grid grid-cols-4 px-5 py-3 border-b border-white/[0.05] text-[10px] text-white/20 uppercase font-mono tracking-widest">
          <span>Название</span><span className="text-center">Дата</span><span className="text-center">Статус</span><span className="text-right">Размер</span>
        </div>
        {REPORTS.map((r, i) => (
          <div key={i} className="grid grid-cols-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.015] transition-colors cursor-pointer items-center">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(99,255,180,0.06)" }}>
                <Icon name="FileText" size={13} className="text-[#63ffb4]" />
              </div>
              <span className="font-golos text-white/65 text-sm truncate">{r.name}</span>
            </div>
            <span className="text-center font-mono text-white/30 text-xs">{r.date}</span>
            <div className="flex justify-center">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${r.status === "Готов" ? "bg-[#63ffb4]/10 text-[#63ffb4]" : "bg-[#fbbf24]/10 text-[#fbbf24]"}`}>{r.status}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-mono text-white/25 text-xs">{r.size}</span>
              {r.status === "Готов" && (
                <button className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/8 transition-colors">
                  <Icon name="Download" size={12} className="text-white/30" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-golos font-black text-white">Анализ</h2>
        <p className="text-white/30 text-xs">Глубокий анализ данных</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Filter" size={14} className="text-[#63ffb4]" />
            <p className="font-golos font-bold text-white text-sm">Воронка продаж</p>
          </div>
          <div className="space-y-3">
            {[
              { l: "Посетители", v: 100, c: "#63ffb4" },
              { l: "Лиды", v: 42, c: "#38bdf8" },
              { l: "Заявки", v: 18, c: "#a78bfa" },
              { l: "Сделки", v: 7, c: "#fb923c" },
            ].map((item) => (
              <div key={item.l}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/45">{item.l}</span>
                  <span className="font-mono text-white">{item.v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${item.v}%`, background: item.c }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="BarChart3" size={14} className="text-[#a78bfa]" />
            <p className="font-golos font-bold text-white text-sm">Сравнение периодов</p>
          </div>
          <div className="flex items-end gap-4" style={{ height: "130px" }}>
            {["Янв", "Фев", "Мар", "Апр"].map((m, i) => {
              const cur = [65, 80, 72, 90][i];
              const prev = [50, 60, 68, 75][i];
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end" style={{ height: "104px" }}>
                    <div className="flex-1 rounded-t" style={{ height: `${prev}px`, background: "rgba(167,139,250,0.2)", border: "1px solid rgba(167,139,250,0.35)" }} />
                    <div className="flex-1 rounded-t" style={{ height: `${cur}px`, background: "linear-gradient(to top,#63ffb4,#38bdf8)", boxShadow: "0 0 10px rgba(99,255,180,0.2)" }} />
                  </div>
                  <span className="text-[10px] text-white/30 font-mono">{m}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[11px] text-white/30"><span className="w-3 h-3 rounded-sm" style={{ background: "rgba(167,139,250,0.3)", display: "inline-block" }} />2025</span>
            <span className="flex items-center gap-1.5 text-[11px] text-white/30"><span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(#63ffb4,#38bdf8)", display: "inline-block" }} />2026</span>
          </div>
        </div>
      </div>
      <div className="p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Flame" size={14} className="text-[#fb923c]" />
          <p className="font-golos font-bold text-white text-sm">Тепловая карта поведения</p>
        </div>
        <Heatmap />
      </div>
    </div>
  );
}

function IntegrationsPage() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-golos font-black text-white">Интеграции</h2>
        <p className="text-white/30 text-xs">Подключите внешние сервисы</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {INTEGRATIONS.map((int) => (
          <div key={int.name} className="p-5 rounded-2xl border border-white/[0.06] hover:border-white/10 transition-all hover:scale-[1.01]" style={{ background: "#0c0f1a" }}>
            <div className="flex items-start justify-between mb-3.5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${int.color}10`, border: `1px solid ${int.color}25` }}>
                <Icon name={int.icon as string} size={20} style={{ color: int.color }} />
              </div>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${int.connected ? "bg-[#63ffb4]/10 text-[#63ffb4]" : "bg-white/5 text-white/25"}`}>
                {int.connected ? "● Активно" : "○ Откл."}
              </span>
            </div>
            <p className="font-golos font-semibold text-white text-sm mb-1">{int.name}</p>
            <p className="text-white/28 text-xs mb-4">{int.connected ? "Данные синхронизированы" : "Нажмите для подключения"}</p>
            <button className={`w-full py-2 rounded-xl text-xs font-golos font-semibold transition-all ${int.connected ? "border border-white/10 text-white/45 hover:text-white hover:border-white/20" : "text-[#080b12]"}`}
              style={!int.connected ? { background: `linear-gradient(90deg,${int.color},${int.color}cc)` } : {}}>
              {int.connected ? "Управление" : "Подключить"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [toggles, setToggles] = useState([true, true, true, false]);
  const settings = [
    { label: "Уведомления по email", desc: "Получать отчёты на почту" },
    { label: "Тёмная тема", desc: "Всегда включена" },
    { label: "Автообновление", desc: "Каждые 5 минут" },
    { label: "Экспорт в CSV", desc: "Массовый экспорт данных" },
  ];
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-golos font-black text-white">Настройки</h2>
        <p className="text-white/30 text-xs">Управление параметрами платформы</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          <p className="font-golos font-bold text-white text-sm mb-4">Основные параметры</p>
          {settings.map((s, i) => (
            <div key={s.label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
              <div>
                <p className="font-golos text-white/70 text-sm">{s.label}</p>
                <p className="text-white/25 text-xs">{s.desc}</p>
              </div>
              <button onClick={() => setToggles(t => t.map((v, j) => j === i ? !v : v))}
                className="w-10 h-[22px] rounded-full relative shrink-0 transition-all duration-300"
                style={toggles[i] ? { background: "linear-gradient(90deg,#63ffb4,#38bdf8)" } : { background: "rgba(255,255,255,0.08)" }}>
                <span className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${toggles[i] ? "left-[22px]" : "left-[3px]"}`} />
              </button>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-2xl border border-white/[0.06]" style={{ background: "#0c0f1a" }}>
          <p className="font-golos font-bold text-white text-sm mb-4">Профиль</p>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-[#080b12]"
              style={{ background: "linear-gradient(135deg,#63ffb4,#38bdf8)" }}>А</div>
            <div>
              <p className="font-golos font-semibold text-white text-sm">Александр Петров</p>
              <p className="text-white/30 text-xs">admin@company.ru</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {[{ f: "Имя", v: "Александр Петров" }, { f: "Email", v: "admin@company.ru" }, { f: "Пароль", v: "••••••••" }].map(({ f, v }) => (
              <div key={f}>
                <label className="text-[10px] text-white/20 font-mono uppercase tracking-widest block mb-1">{f}</label>
                <div className="h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 flex items-center text-white/35 text-sm cursor-pointer hover:border-white/12 transition-colors">
                  {v}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2.5 rounded-xl font-golos font-semibold text-sm text-[#080b12] hover:scale-[1.02] transition-transform"
            style={{ background: "linear-gradient(90deg,#63ffb4,#38bdf8)" }}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
}

const PAGES: Record<string, React.ReactNode> = {
  home: <HomePage />,
  dashboard: <DashboardPage />,
  reports: <ReportsPage />,
  analysis: <AnalysisPage />,
  integrations: <IntegrationsPage />,
  settings: <SettingsPage />,
};

export default function Index() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen font-golos" style={{ background: "#080b12", color: "#fff" }}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-white/[0.05]" style={{ background: "#0a0d16" }}>
          <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.05]">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#63ffb4,#38bdf8)" }}>
              <Icon name="Activity" size={14} className="text-[#080b12]" />
            </div>
            <span className="font-golos font-black text-white tracking-tight">DataPulse</span>
          </div>
          <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => setActive(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm font-semibold ${isActive ? "text-[#080b12]" : "text-white/35 hover:text-white hover:bg-white/[0.04]"}`}
                  style={isActive ? { background: "linear-gradient(90deg,#63ffb4,#38bdf8)" } : {}}>
                  <Icon name={item.icon as string} size={15} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-white/[0.05]">
            <div className="flex items-center gap-2.5 px-2 py-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-[#080b12] shrink-0"
                style={{ background: "linear-gradient(135deg,#63ffb4,#38bdf8)" }}>А</div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Александр</p>
                <p className="text-[10px] text-white/25 truncate">Администратор</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <aside className="relative z-10 w-52 flex flex-col border-r border-white/[0.05]" style={{ background: "#0a0d16" }}>
              <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.05]">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#63ffb4,#38bdf8)" }}>
                  <Icon name="Activity" size={14} className="text-[#080b12]" />
                </div>
                <span className="font-golos font-black text-white">DataPulse</span>
              </div>
              <nav className="flex-1 py-3 px-2 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button key={item.id} onClick={() => { setActive(item.id); setMobileOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${isActive ? "text-[#080b12]" : "text-white/35"}`}
                      style={isActive ? { background: "linear-gradient(90deg,#63ffb4,#38bdf8)" } : {}}>
                      <Icon name={item.icon as string} size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] shrink-0" style={{ background: "#0a0d16" }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5">
                <Icon name="Menu" size={17} className="text-white/45" />
              </button>
              <div>
                <p className="font-golos font-bold text-white text-sm">{NAV_ITEMS.find((n) => n.id === active)?.label}</p>
                <p className="text-white/20 text-[10px] font-mono">13 апреля 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.07] text-white/20 text-xs w-40 cursor-pointer hover:border-white/12">
                <Icon name="Search" size={12} />
                <span>Поиск...</span>
              </div>
              <button className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/[0.07] hover:border-white/15 relative">
                <Icon name="Bell" size={14} className="text-white/45" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#63ffb4]" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-5xl mx-auto">
              {PAGES[active]}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}