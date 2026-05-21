"use client"

import { motion } from "framer-motion"
import { TrendingUp, Lightbulb, AlertCircle } from "lucide-react"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { cn } from "@/app/utils/cn"
import { useMemo } from "react"

export function AIInsightsPanel() {
  const products = useDashboardStore((state) => state.products)
  const competitors = useDashboardStore((state) => state.competitors)
  
  // Generate AI insights from real data
  const aiInsights = useMemo(() => {
    const insights = []
    
    // Insight 1: High revenue products
    const highRevenueProducts = products.filter(p => p.revenue > 800000)
    if (highRevenueProducts.length > 0) {
      insights.push({
        id: 1,
        title: "High Revenue Performers",
        description: `${highRevenueProducts.map(p => p.name).join(', ')} are generating exceptional revenue. Consider expanding these product lines.`,
        impact: "High",
        timestamp: new Date().toISOString()
      })
    }
    
    // Insight 2: Competitor threat analysis
    const highThreatCompetitors = competitors.filter(c => c.threatLevel === 'high')
    if (highThreatCompetitors.length > 0) {
      insights.push({
        id: 2,
        title: "Competitive Threats Detected",
        description: `${highThreatCompetitors.map(c => c.name).join(', ')} pose high competitive threats. Monitor pricing and features closely.`,
        impact: "High",
        timestamp: new Date().toISOString()
      })
    }
    
    // Insight 3: Growth opportunities
    const highGrowthProducts = products.filter(p => p.growth > 15)
    if (highGrowthProducts.length > 0) {
      insights.push({
        id: 3,
        title: "Growth Opportunities",
        description: `Products showing strong growth momentum: ${highGrowthProducts.map(p => p.name).join(', ')}. Invest in marketing for these items.`,
        impact: "Medium",
        timestamp: new Date().toISOString()
      })
    }
    
    return insights
  }, [products, competitors])
  
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
