"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ViewerGaugeProps {
  value: number;
  max: number;
  label: string;
  status: "low" | "medium" | "high";
}

export function ViewerGauge({
  value,
  max,
  label,
  status,
}: ViewerGaugeProps) {
  const percentage = (value / max) * 100;
  const data = [
    { name: "Used", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const colors = {
    low: "#FA1665",
    medium: "#F96827",
    high: "#08F2F5",
  };

  const statusText = {
    low: "Low Engagement",
    medium: "Medium Engagement",
    high: "High Engagement",
  };

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
          >
            <Cell key="cell-0" fill={colors[status]} />
            <Cell key="cell-1" fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <div className="text-3xl font-bold text-foreground">{value.toLocaleString()}</div>
        <div className="text-sm text-foreground-muted mt-1 font-medium">
          {statusText[status]}
        </div>
      </div>
    </div>
  );
}

