"use client"

import { motion } from "framer-motion"
import { TrendingUp, Lightbulb, AlertCircle } from "lucide-react"
import { aiInsights } from "@/app/data/mockData"
import { cn } from "@/app/utils/cn"

export function AIInsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={cn(
              "relative overflow-hidden rounded-lg border p-4 backdrop-blur-sm",
              insight.impact === "High"
                ? "border-red-500/30 bg-red-500/10"
                : "border-yellow-500/30 bg-yellow-500/10",
            )}
          >
            <div className="flex gap-3">
              <div
                className={cn(
                  "mt-1 h-2 w-2 rounded-full flex-shrink-0",
                  insight.impact === "High" ? "bg-red-400" : "bg-yellow-400",
                )}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{insight.title}</h4>
                <p className="mt-1 text-sm text-slate-400">{insight.description}</p>
                <span className="mt-2 inline-block text-xs text-slate-500">{insight.timestamp}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
