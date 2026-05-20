"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"
import { useDashboardStore, type DrillDownData } from "@/app/store/dashboardStore"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function DrillDownModal() {
  const { drillDownOpen, drillDownData, closeDrillDown } = useDashboardStore()

  if (!drillDownData) return null

  return (
    <AnimatePresence>
      {drillDownOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrillDown}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/95 to-slate-900/90 p-8 shadow-2xl backdrop-blur-lg"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {drillDownData.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">Detailed Analytics & Insights</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeDrillDown}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] space-y-6 overflow-y-auto">
              {/* Render based on type */}
              {drillDownData.type === 'kpi' && <KPIDrillDown data={drillDownData} />}
              {drillDownData.type === 'chart' && <ChartDrillDown data={drillDownData} />}
              {drillDownData.type === 'product' && <ProductDrillDown data={drillDownData} />}
              {drillDownData.type === 'competitor' && <CompetitorDrillDown data={drillDownData} />}

              {/* AI Insights */}
              {drillDownData.insights && drillDownData.insights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-6"
                >
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-400">
                    <TrendingUp className="h-5 w-5" />
                    AI-Generated Insights
                  </h3>
                  <ul className="space-y-2">
                    {drillDownData.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Recommendations */}
              {drillDownData.recommendations && drillDownData.recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-6"
                >
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-purple-400">
                    <AlertTriangle className="h-5 w-5" />
                    Strategic Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {drillDownData.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="flex-shrink-0 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-400">
                          {idx + 1}
                        </span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function KPIDrillDown({ data }: { data: DrillDownData }) {
  const { metrics, trend, breakdown } = data.data

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {metrics?.map((metric: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4"
          >
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{metric.value}</p>
            {metric.change && (
              <div className={`mt-2 flex items-center gap-1 text-sm ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Trend Chart */}
      {trend && (
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
          <h4 className="mb-4 text-lg font-semibold text-white">Trend Analysis</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="period" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Breakdown Table */}
      {breakdown && (
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
          <h4 className="mb-4 text-lg font-semibold text-white">Detailed Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 text-left text-sm font-semibold text-slate-300">Item</th>
                  <th className="pb-3 text-right text-sm font-semibold text-slate-300">Value</th>
                  <th className="pb-3 text-right text-sm font-semibold text-slate-300">Change</th>
                  <th className="pb-3 text-right text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-3 text-sm text-white">{item.name}</td>
                    <td className="py-3 text-right text-sm text-slate-300">{item.value}</td>
                    <td className={`py-3 text-right text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </td>
                    <td className="py-3 text-right">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        item.status === 'Good' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function ChartDrillDown({ data }: { data: DrillDownData }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
      <p className="text-slate-300">Chart drill-down visualization</p>
    </div>
  )
}

function ProductDrillDown({ data }: { data: DrillDownData }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
      <p className="text-slate-300">Product details and analytics</p>
    </div>
  )
}

function CompetitorDrillDown({ data }: { data: DrillDownData }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6">
      <p className="text-slate-300">Competitor intelligence and comparison</p>
    </div>
  )
}

// Made with Bob
