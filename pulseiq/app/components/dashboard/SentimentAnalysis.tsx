"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { sentimentData, topComplaints, topPraisedProducts } from "@/app/data/mockData"

export function SentimentAnalysis() {
  const sentimentChartData = [
    { name: "Positive", value: 1850, fill: "#10b981" },
    { name: "Neutral", value: 450, fill: "#94a3b8" },
    { name: "Negative", value: 200, fill: "#ef4444" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid gap-6 lg:grid-cols-3"
    >
      {/* Sentiment Pie Chart */}
      <motion.div
        className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-white">Sentiment Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={sentimentChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {sentimentChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Complaints */}
      <motion.div
        className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-white">Top Complaints</h3>
        <div className="space-y-3">
          {topComplaints.map((complaint, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{complaint.complaint}</span>
                <span className="font-semibold text-red-400">{complaint.frequency}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                  style={{ width: `${(complaint.frequency / 127) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Praised */}
      <motion.div
        className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-white">Top Praised Products</h3>
        <div className="space-y-3">
          {topPraisedProducts.map((product, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{product.name}</span>
                <span className="font-semibold text-green-400">{product.mentions}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  style={{ width: `${(product.mentions / 342) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
