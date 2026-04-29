import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Single shared client — safe to use in server components and route handlers.
// Uses the publishable (anon) key; Supabase RLS policies control row access.
export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export type Holding = {
  id: string;
  name: string;
  asset_class: string;
  sector: string;
  allocation_pct: number;
  vintage_year: number | null;
  status: "Active" | "Realized" | "Pending";
  notes: string | null;
};

export type AllocationSlice = {
  asset_class: string;
  allocation_pct: number;
};
