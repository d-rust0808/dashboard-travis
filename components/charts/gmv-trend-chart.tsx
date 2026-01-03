"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  time: string;
  target: number;
  expected: number;
  actual: number;
}

interface GMVTrendChartProps {
  data: DataPoint[];
  showAlert?: boolean;
  alertMessage?: string;
}

export function GMVTrendChart({ data, showAlert = false, alertMessage }: GMVTrendChartProps) {
  return (
    <div className="relative h-full w-full">
      {showAlert && (
        <div className="bg-accent-pink border-accent-pink/30 absolute right-2 top-2 z-10 flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-semibold text-white shadow-lg sm:right-4 sm:top-4 sm:max-w-none sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm">
          <span className="flex-shrink-0 text-sm sm:text-base">▲</span>
          <span className="break-words font-medium">{alertMessage}</span>
        </div>
      )}
      <div className="-mx-4 w-full overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ResponsiveContainer width="100%" height={250} className="min-w-[400px] sm:h-[350px]">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#475569" tick={{ fill: "#475569" }} />
            <YAxis stroke="#475569" tick={{ fill: "#475569" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeDasharray="5 5"
              strokeWidth={2}
              name="Target"
            />
            <Line
              type="monotone"
              dataKey="expected"
              stroke="#08F2F5"
              strokeDasharray="5 5"
              strokeWidth={2}
              name="Expected"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#F96827"
              strokeWidth={3}
              name="Actual"
              dot={{ fill: "#F96827", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
