"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { AllocationSlice } from "@/lib/supabase";

// Muted, sophisticated palette — complements navy + gold
const COLORS: Record<string, string> = {
  "Real Estate":    "#c09040",
  "Private Equity": "#4a7c9e",
  "Venture Capital":"#5a8a6a",
  "Fixed Income":   "#8a6a9e",
  "Public Equity":  "#4a7a8a",
  "Liquid":         "#7a6a5a",
};
const FALLBACK_COLORS = ["#c09040","#4a7c9e","#5a8a6a","#8a6a9e","#4a7a8a","#7a6a5a"];

type Props = { data: AllocationSlice[] };

export default function AllocationChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="allocation_pct"
          nameKey="asset_class"
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={120}
          paddingAngle={3}
          strokeWidth={0}
        >
          {data.map((slice, i) => (
            <Cell
              key={slice.asset_class}
              fill={COLORS[slice.asset_class] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#0d1e36",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "13px",
          }}
          formatter={(value) => [typeof value === "number" ? `${value.toFixed(1)}%` : value, "Allocation"]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
