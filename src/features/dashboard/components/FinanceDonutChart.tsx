"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function FinanceDonutChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="w-full h-[220px] sm:h-[200px] md:h-[220px]">
      <ResponsiveContainer>
        <PieChart>
          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="expense" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="url(#income)" />
            <Cell fill="url(#expense)" />
          </Pie>

          <Tooltip
            contentStyle={{
              background: "rgba(11,15,25,0.95)", 
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "8px 12px",
            }}
            labelStyle={{ color: "#fff" }} 
            itemStyle={{ color: "#fff" }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
