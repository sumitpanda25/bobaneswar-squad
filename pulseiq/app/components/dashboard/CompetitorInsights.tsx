"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { cn } from "@/app/utils/cn"
import { Lightbulb } from "lucide-react"

export function CompetitorInsights() {
  const competitors = useDashboardStore((state) => state.competitors)
  const products = useDashboardStore((state) => state.products)
  
  // Generate insights from real competitor data
  const competitorInsights = useMemo(() => {
    if (competitors.length === 0) return []
    
    const insights = []
    
    // Find high-rated competitors
    const highRatedCompetitors = competitors.filter(c => c.rating >= 4.6)
    if (highRatedCompetitors.length > 0) {
      insights.push({
        id: '1',
        title: 'High-Rated Competitors Detected',
        description: `${highRatedCompetitors.map(c => c.name).join(', ')} have ratings of 4.6+ stars. Consider quality improvements to match their standards.`,
        impact: 'High' as const
      })
    }
    
    // Find competitors with high market share
    const dominantCompetitors = competitors.filter(c => c.marketShare >= 20)
    if (dominantCompetitors.length > 0) {
      insights.push({
        id: '2',
        title: 'Market Share Leaders',
        description: `${dominantCompetitors.map(c => `${c.name} (${c.marketShare}%)`).join(', ')} dominate the market. Focus on differentiation strategies.`,
        impact: 'High' as const
      })
    }
    
    // Price comparison
    const avgCompetitorPrice = competitors.reduce((sum, c) => sum + c.avgPrice, 0) / competitors.length
    const avgOurPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length
    if (avgOurPrice > avgCompetitorPrice * 1.15) {
      insights.push({
        id: '3',
        title: 'Premium Pricing Position',
        description: `Our average price (₹${avgOurPrice.toFixed(0)}) is ${((avgOurPrice/avgCompetitorPrice - 1) * 100).toFixed(0)}% higher than competitors (₹${avgCompetitorPrice.toFixed(0)}). Ensure value justifies premium.`,
        impact: 'Medium' as const
      })
    }
    
    // Low-priced threats
    const budgetCompetitors = competitors.filter(c => c.avgPrice < avgCompetitorPrice * 0.8)
    if (budgetCompetitors.length > 0) {
      insights.push({
        id: '4',
        title: 'Budget Competitor Threat',
        description: `${budgetCompetitors.map(c => c.name).join(', ')} offer significantly lower prices. Consider value line to capture budget segment.`,
        impact: 'Medium' as const
      })
    }
    
    return insights
  }, [competitors, products])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Competitive Insights</h3>
      </div>

      <div className="space-y-3">
        {competitorInsights.length === 0 ? (
          <p className="text-sm text-slate-400">Loading competitive insights...</p>
        ) : (
          competitorInsights.map((insight, index) => (
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
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
