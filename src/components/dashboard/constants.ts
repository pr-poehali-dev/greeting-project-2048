export const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "dashboard", label: "Дашборд", icon: "LayoutDashboard" },
  { id: "reports", label: "Отчёты", icon: "FileBarChart" },
  { id: "analysis", label: "Анализ", icon: "TrendingUp" },
  { id: "integrations", label: "Интеграции", icon: "Plug" },
  { id: "settings", label: "Настройки", icon: "Settings2" },
];

export const METRICS = [
  { label: "Посетители", value: "248 391", delta: "+12.4%", up: true, icon: "Users" },
  { label: "Конверсия", value: "4.87%", delta: "+0.6%", up: true, icon: "MousePointerClick" },
  { label: "Выручка", value: "₽1.84М", delta: "+23.1%", up: true, icon: "CircleDollarSign" },
  { label: "Отказы", value: "28.3%", delta: "-4.2%", up: false, icon: "LogOut" },
];

export const CHART_DATA = [42, 67, 55, 80, 60, 90, 75, 95, 70, 85, 92, 78];

export const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export const HEATMAP_DATA = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 24 }, (_, col) => {
    const vals = [0.2,0.15,0.3,0.25,0.4,0.35,0.5,0.45,0.8,0.9,0.85,0.7,0.75,0.8,0.65,0.7,0.6,0.5,0.4,0.35,0.3,0.25,0.2,0.15];
    const base = vals[col] ?? 0.3;
    const weekday = row < 5 ? 1.2 : 0.6;
    return Math.min(1, base * weekday * (0.7 + Math.random() * 0.6));
  })
);

export const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const DONUT_SEGMENTS = [
  { label: "Органика", value: 42, color: "#63ffb4" },
  { label: "Реклама", value: 28, color: "#a78bfa" },
  { label: "Соцсети", value: 18, color: "#38bdf8" },
  { label: "Прямые", value: 12, color: "#fb923c" },
];

export const REPORTS = [
  { name: "Квартальный отчёт Q1", date: "01.04.2026", status: "Готов", size: "2.4 MB" },
  { name: "Воронка продаж — Март", date: "31.03.2026", status: "Готов", size: "1.1 MB" },
  { name: "Анализ трафика — Март", date: "30.03.2026", status: "Готов", size: "876 KB" },
  { name: "Сводка по интеграциям", date: "28.03.2026", status: "В работе", size: "—" },
  { name: "A/B тест лендинга", date: "25.03.2026", status: "Готов", size: "3.2 MB" },
];

export const INTEGRATIONS = [
  { name: "Google Analytics", icon: "BarChart2", connected: true, color: "#f97316" },
  { name: "Яндекс.Метрика", icon: "Activity", connected: true, color: "#63ffb4" },
  { name: "AmoCRM", icon: "Users", connected: false, color: "#a78bfa" },
  { name: "1С Бизнес", icon: "Building2", connected: false, color: "#38bdf8" },
  { name: "Telegram Бот", icon: "MessageCircle", connected: true, color: "#fbbf24" },
  { name: "Bitrix24", icon: "Layers", connected: false, color: "#fb7185" },
];
