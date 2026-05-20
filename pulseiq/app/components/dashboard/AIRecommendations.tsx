"use client"

import { motion } from "framer-motion"
import { aiRecommendations } from "@/app/data/mockData"
import { cn } from "@/app/utils/cn"
import { Zap, TrendingUp, AlertCircle } from "lucide-react"

export function AIRecommendations() {
  const priorityConfig = {
    High: { bg: "bg-red-500/20", border: "border-red-500/30", text: "text-red-400", icon: AlertCircle },
    Medium: { bg: "bg-yellow-500/20", border: "border-yellow-500/30", text: "text-yellow-400", icon: TrendingUp },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <div className="mb-6 flex items-center gap-2">
        <Zap className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {aiRecommendations.map((rec, index) => {
          const config = priorityConfig[rec.priority as keyof typeof priorityConfig]
          const PriorityIcon = config.icon

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "relative overflow-hidden rounded-lg border p-4 backdrop-blur-sm transition-all",
                config.bg,
                config.border,
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{rec.title}</h4>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        config.bg,
                        config.text,
                      )}
                    >
                      <PriorityIcon className="h-3 w-3" />
                      {rec.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{rec.description}</p>
                  <div className="mt-3 inline-block rounded-lg bg-black/30 px-3 py-1">
                    <span className={cn("text-xs font-semibold", config.text)}>{rec.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
