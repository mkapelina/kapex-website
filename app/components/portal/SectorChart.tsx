"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Holding } from "@/lib/supabase";

type SectorRow = { sector: string; allocation_pct: number };

function rollupBySector(holdings: Holding[]): SectorRow[] {
  const map: Record<string, number> = {};
  for (const h of holdings) {
    map[h.sector] = (map[h.sector] ?? 0) + h.allocation_pct;
  }
  return Object.entries(map)
    .map(([sector, allocation_pct]) => ({ sector, allocation_pct }))
    .sort((a, b) => b.allocation_pct - a.allocation_pct);
}

type Props = { holdings: Holding[] };

export default function SectorChart({ holdings }: Props) {
  const data = rollupBySector(holdings);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
        <XAxis
          type="number"
          domain={[0, "dataMax"]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="sector"
          width={120}
          tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#0d1e36",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "13px",
          }}
          formatter={(value) => [typeof value === "number" ? `${value.toFixed(1)}%` : value, "Allocation"]}
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
        />
        <Bar dataKey="allocation_pct" radius={[0, 4, 4, 0]} maxBarSize={18}>
          {data.map((_, i) => (
            <Cell
              key={i}
              fill={i === 0 ? "#c09040" : `rgba(192,144,64,${0.65 - i * 0.08})`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
