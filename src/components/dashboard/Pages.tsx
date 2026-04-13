import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SparkLine, DonutChart, BarChart, Heatmap } from "./Charts";
import { METRICS, CHART_DATA, REPORTS, INTEGRATIONS } from "./constants";

export function HomePage() {
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

export function DashboardPage() {
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

export function ReportsPage() {
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

export function AnalysisPage() {
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

export function IntegrationsPage() {
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

export function SettingsPage() {
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
