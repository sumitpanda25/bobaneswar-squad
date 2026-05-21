"use client"

import { motion } from "framer-motion"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { formatCurrency } from "@/app/utils/formatters"
import { cn } from "@/app/utils/cn"
import { TrendingUp } from "lucide-react"

export function CompetitorTable() {
  // Get competitors from dashboard store instead of mock data
  const competitors = useDashboardStore((state) => state.competitors)
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/30">
              <th className="px-4 py-3 text-left font-semibold text-slate-400">Competitor</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-400">Rating</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-400">Avg Price</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-400">Market Share</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-400">Threat</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor, index) => (
              <motion.tr
                key={competitor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="border-b border-slate-700/30 transition-colors hover:bg-slate-800/30"
              >
                <td className="px-4 py-3 font-medium text-white">{competitor.name}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-block rounded-lg bg-yellow-500/20 px-2 py-1 text-sm text-yellow-400">
                    {competitor.rating} ⭐
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-white">{formatCurrency(competitor.avgPrice)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-white">{competitor.marketShare}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-block rounded-lg px-3 py-1 text-xs font-medium",
                      competitor.threatLevel === "High"
                        ? "bg-red-500/20 text-red-400"
                        : competitor.threatLevel === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400",
                    )}
                  >
                    {competitor.threatLevel}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
