"use client"

import { BarChart, ScatterChart, PieChart, Bar, Scatter, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { motion } from "framer-motion"
import { competitorPricingData, marketShareData, competitiveThreatMatrix } from "@/app/data/mockData"

export function CompetitorPricingChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Competitor Pricing Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={competitorPricingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="competitor" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
          <Bar dataKey="price" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function PriceVsRatingScatter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Price vs Rating Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis type="number" dataKey="price" stroke="#94a3b8" name="Price" />
          <YAxis type="number" dataKey="rating" stroke="#94a3b8" name="Rating" domain={[0, 5]} />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} cursor={{ fill: "rgba(59, 130, 246, 0.1)" }} />
          <Scatter name="Competitors" data={competitorPricingData} fill="#3b82f6" />
        </ScatterChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function MarketSharePie() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Market Share Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={marketShareData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {marketShareData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function CompetitiveThreatMatrix() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Competitive Threat Heatmap</h3>
      <div className="space-y-3">
        {competitiveThreatMatrix.map((item) => {
          const threatColors: Record<string, string> = {
            "Very Low": "bg-green-500/30 border-green-500/50",
            Low: "bg-blue-500/30 border-blue-500/50",
            Medium: "bg-yellow-500/30 border-yellow-500/50",
            High: "bg-red-500/30 border-red-500/50",
          }
          return (
            <div key={item.category} className={`rounded-lg border p-3 ${threatColors[item.threat]}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">{item.category}</span>
                <div className="flex gap-4 text-sm text-slate-300">
                  <span>Our: {item.ourRating} ⭐</span>
                  <span>Comp: {item.competition} ⭐</span>
                  <span className={`font-semibold ${item.threat === "Very Low" ? "text-green-400" : item.threat === "Low" ? "text-blue-400" : item.threat === "Medium" ? "text-yellow-400" : "text-red-400"}`}>
                    {item.threat}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
