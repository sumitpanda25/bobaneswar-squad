"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { monthlySalesData } from "@/app/data/mockData"

export function MonthlySalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 backdrop-blur-md"
    >
      <h3 className="mb-6 text-lg font-semibold text-white">Monthly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlySalesData}>
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
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
