import { useState } from "react";
import { Sidebar, MobileSidebar, TopBar } from "@/components/dashboard/Sidebar";
import { HomePage, DashboardPage, ReportsPage, AnalysisPage, IntegrationsPage, SettingsPage } from "@/components/dashboard/Pages";

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
        <Sidebar active={active} onSelect={setActive} />

        {mobileOpen && (
          <MobileSidebar active={active} onSelect={setActive} onClose={() => setMobileOpen(false)} />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar active={active} onMenuClick={() => setMobileOpen(true)} />

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
