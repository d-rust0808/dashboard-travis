"use client";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface RiskGaugeProps {
  risk: "stable" | "caution" | "danger" | "high-risk";
}

export function RiskGauge({ risk }: RiskGaugeProps) {
  const riskLevels = {
    stable: { value: 25, color: "#10b981", label: "Stable" },
    caution: { value: 50, color: "#F96827", label: "Caution" },
    danger: { value: 75, color: "#F96827", label: "Danger" },
    "high-risk": { value: 100, color: "#FA1665", label: "HIGH RISK" },
  };

  const current = riskLevels[risk];
  const data = [
    { name: "Risk", value: current.value },
    { name: "Remaining", value: 100 - current.value },
  ];

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
            <Cell key="cell-0" fill={current.color} />
            <Cell key="cell-1" fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <div
          className={`text-2xl font-bold ${
            risk === "high-risk"
              ? "text-accent-pink"
              : risk === "danger" || risk === "caution"
                ? "text-accent-orange"
                : ""
          }`}
        >
          {current.label}
        </div>
      </div>
    </div>
  );
}
