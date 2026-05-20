"use client"

import { motion } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { categoryDistributionData } from "@/app/data/mockData"

export function CategoryDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 backdrop-blur-md"
    >
      <h3 className="mb-6 text-lg font-semibold text-white">Product Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
