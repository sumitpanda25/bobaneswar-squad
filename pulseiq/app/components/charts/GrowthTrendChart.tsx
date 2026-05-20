"use client"

import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { productGrowthData } from "@/app/data/mockData"

export function GrowthTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 backdrop-blur-md"
    >
      <h3 className="mb-6 text-lg font-semibold text-white">Product Growth Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={productGrowthData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
            }}
            formatter={(value) => (value !== undefined ? `$${value.toLocaleString()}` : "N/A")}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
