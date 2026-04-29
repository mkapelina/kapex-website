import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import type { Holding, AllocationSlice } from "@/lib/supabase";
import AllocationChart from "@/app/components/portal/AllocationChart";
import SectorChart from "@/app/components/portal/SectorChart";
import HoldingsTable from "@/app/components/portal/HoldingsTable";

async function getHoldings(): Promise<Holding[]> {
  const { data, error } = await supabase
    .from("holdings")
    .select("*")
    .order("allocation_pct", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as Holding[];
}

function rollupByAssetClass(holdings: Holding[]): AllocationSlice[] {
  const map: Record<string, number> = {};
  for (const h of holdings) {
    map[h.asset_class] = (map[h.asset_class] ?? 0) + h.allocation_pct;
  }
  return Object.entries(map)
    .map(([asset_class, allocation_pct]) => ({ asset_class, allocation_pct }))
    .sort((a, b) => b.allocation_pct - a.allocation_pct);
}

const cardClass =
  "rounded-lg border border-white/10 p-6" as const;
const cardBg = { background: "rgba(255,255,255,0.03)" } as const;

function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="rounded-lg animate-pulse"
      style={{ height, background: "rgba(255,255,255,0.05)" }}
    />
  );
}

async function PortfolioContent() {
  const holdings = await getHoldings();
  const allocationData = rollupByAssetClass(holdings);
  const totalPct = holdings.reduce((s, h) => s + h.allocation_pct, 0);
  const activeCount = holdings.filter((h) => h.status === "Active").length;

  return (
    <>
      {/* KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Holdings", value: holdings.length.toString() },
          { label: "Active", value: activeCount.toString() },
          { label: "Asset Classes", value: allocationData.length.toString() },
          { label: "Allocated", value: `${totalPct.toFixed(1)}%` },
        ].map((kpi) => (
          <div key={kpi.label} className={cardClass} style={cardBg}>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
              {kpi.label}
            </p>
            <p className="text-2xl font-semibold" style={{ color: "#c09040" }}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className={cardClass} style={cardBg}>
          <h2 className="text-sm font-medium text-white mb-4">
            Allocation by Asset Class
          </h2>
          <AllocationChart data={allocationData} />
        </div>
        <div className={cardClass} style={cardBg}>
          <h2 className="text-sm font-medium text-white mb-4">
            Allocation by Sector
          </h2>
          <SectorChart holdings={holdings} />
        </div>
      </div>

      {/* Holdings table */}
      <div className={cardClass} style={cardBg}>
        <h2 className="text-sm font-medium text-white mb-6">All Holdings</h2>
        <HoldingsTable holdings={holdings} />
      </div>
    </>
  );
}

export default function PortfolioPage() {
  return (
    <div>
      <div className="mb-8">
        <p
          className="text-sm uppercase tracking-widest mb-1"
          style={{ color: "#c09040" }}
        >
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Holdings Overview
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <ChartSkeleton key={i} height={80} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartSkeleton height={360} />
              <ChartSkeleton height={360} />
            </div>
            <ChartSkeleton height={300} />
          </div>
        }
      >
        <PortfolioContent />
      </Suspense>
    </div>
  );
}
