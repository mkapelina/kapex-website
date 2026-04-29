"use client";

import { useState } from "react";
import type { Holding } from "@/lib/supabase";

const STATUS_COLORS: Record<string, string> = {
  Active:   "text-emerald-400 bg-emerald-400/10",
  Realized: "text-white/40 bg-white/5",
  Pending:  "text-amber-400 bg-amber-400/10",
};

type SortKey = "name" | "asset_class" | "allocation_pct" | "vintage_year";

type Props = { holdings: Holding[] };

export default function HoldingsTable({ holdings }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("allocation_pct");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...holdings].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="opacity-20">↕</span>;
    return <span>{sortDir === "asc" ? "↑" : "↓"}</span>;
  }

  const th = "text-left text-xs uppercase tracking-wider text-white/40 font-medium pb-3 cursor-pointer hover:text-white/70 transition-colors select-none";
  const td = "py-3.5 text-sm text-white/70";

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className={th} onClick={() => handleSort("name")}>
              Name <SortIcon col="name" />
            </th>
            <th className={th} onClick={() => handleSort("asset_class")}>
              Asset Class <SortIcon col="asset_class" />
            </th>
            <th className={`${th} hidden md:table-cell`}>Sector</th>
            <th className={`${th} hidden sm:table-cell`} onClick={() => handleSort("vintage_year")}>
              Vintage <SortIcon col="vintage_year" />
            </th>
            <th className={th} onClick={() => handleSort("allocation_pct")}>
              Allocation <SortIcon col="allocation_pct" />
            </th>
            <th className={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((h, i) => (
            <tr
              key={h.id}
              className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                i % 2 === 0 ? "" : "bg-white/[0.01]"
              }`}
            >
              <td className={`${td} font-medium text-white`}>{h.name}</td>
              <td className={td}>{h.asset_class}</td>
              <td className={`${td} hidden md:table-cell`}>{h.sector}</td>
              <td className={`${td} hidden sm:table-cell`}>
                {h.vintage_year ?? "—"}
              </td>
              <td className={td}>
                <span style={{ color: "#c09040" }}>
                  {h.allocation_pct.toFixed(1)}%
                </span>
              </td>
              <td className={td}>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    STATUS_COLORS[h.status] ?? "text-white/40"
                  }`}
                >
                  {h.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
