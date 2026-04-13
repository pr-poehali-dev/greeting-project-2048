import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./constants";

interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}

interface MobileSidebarProps extends SidebarProps {
  onClose: () => void;
}

function SidebarContent({ active, onSelect, onItemClick }: { active: string; onSelect: (id: string) => void; onItemClick?: () => void }) {
  return (
    <>
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
            <button key={item.id} onClick={() => { onSelect(item.id); onItemClick?.(); }}
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
    </>
  );
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-white/[0.05]" style={{ background: "#0a0d16" }}>
      <SidebarContent active={active} onSelect={onSelect} />
    </aside>
  );
}

export function MobileSidebar({ active, onSelect, onClose }: MobileSidebarProps) {
  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative z-10 w-52 flex flex-col border-r border-white/[0.05]" style={{ background: "#0a0d16" }}>
        <SidebarContent active={active} onSelect={onSelect} onItemClick={onClose} />
      </aside>
    </div>
  );
}

interface TopBarProps {
  active: string;
  onMenuClick: () => void;
}

export function TopBar({ active, onMenuClick }: TopBarProps) {
  const currentItem = NAV_ITEMS.find((n) => n.id === active);
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] shrink-0" style={{ background: "#0a0d16" }}>
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5">
          <Icon name="Menu" size={17} className="text-white/45" />
        </button>
        <div>
          <p className="font-golos font-bold text-white text-sm">{currentItem?.label}</p>
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
  );
}
