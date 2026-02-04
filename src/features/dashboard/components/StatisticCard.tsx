"use client";

import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, Tooltip } from "recharts";
import { useFinancialSummary } from "../hooks/useFinanceSummary";

export default function StatisticCard() {
  const { statisticData, isLoading } = useFinancialSummary();
  if (isLoading) return null;

  return (
    <div className="relative rounded-3xl border border-white/5 bg-[#121826] p-5 h-full min-h-[260px] overflow-hidden hover:shadow-xl transition-shadow">
      <div className="absolute w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full -top-10 -right-10"></div>

      <p className="text-sm text-gray-400 mb-6 font-medium">Weekly Activity (Sun - Sat)</p>

      <div className="w-full h-[250px] sm:h-[220px] md:h-[250px] mt-12">
        <ResponsiveContainer>
          <LineChart data={statisticData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />

            <Tooltip
              contentStyle={{
                background: "#0B0F19",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff"
              }}
              itemStyle={{ fontSize: '12px' }}
            />

            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#4ade80" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#4ade80' }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#fb7185" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#fb7185' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
