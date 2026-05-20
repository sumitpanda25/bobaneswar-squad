"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { DashboardLayout } from "@/app/components/dashboard/DashboardLayout"
import { CompetitorKPIs } from "@/app/components/dashboard/CompetitorKPIs"
import { CompetitorTable } from "@/app/components/dashboard/CompetitorTable"
import { CompetitorPricingChart, PriceVsRatingScatter, MarketSharePie, CompetitiveThreatMatrix } from "@/app/components/dashboard/CompetitorCharts"
import { CompetitorInsights } from "@/app/components/dashboard/CompetitorInsights"
import { StrategicRecommendations } from "@/app/components/dashboard/CompetitorRecommendations"

export default function CompetitorOverviewPage() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
        {/* Page Title */}
        <div className="mb-8">
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Competitor Overview Dashboard
          </motion.h1>
          <motion.p
            className="mt-2 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Real-time competitive intelligence and market analysis
          </motion.p>
        </div>

        {/* Competitor KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CompetitorKPIs />
        </motion.div>

        {/* Competitor Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Competitor Overview</h2>
          <CompetitorTable />
        </motion.div>

        {/* Pricing Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Pricing & Rating Analysis</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <CompetitorPricingChart />
            <PriceVsRatingScatter />
          </div>
        </motion.div>

        {/* Market Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Market Positioning</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <MarketSharePie />
            <CompetitiveThreatMatrix />
          </div>
        </motion.div>

        {/* Insights & Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white">Competitive Intelligence</h2>
            <CompetitorInsights />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Market Intelligence</h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                <p className="text-sm text-blue-300">Market Leader</p>
                <p className="text-2xl font-bold text-blue-400">BeautyPlus (22%)</p>
                <p className="text-xs text-blue-200 mt-2">Rating: 4.5 | Avg Price: $54.99</p>
              </div>
              <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
                <p className="text-sm text-purple-300">Premium Competitor</p>
                <p className="text-2xl font-bold text-purple-400">LuxurySkin (4.7 ⭐)</p>
                <p className="text-xs text-purple-200 mt-2">Pricing: $89.99 | Share: 13%</p>
              </div>
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-300">Budget Competitor</p>
                <p className="text-2xl font-bold text-yellow-400">GlowNatural (15%)</p>
                <p className="text-xs text-yellow-200 mt-2">Pricing: $39.99 | Rating: 4.3 ⭐</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strategic Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Strategic Recommendations</h2>
          <StrategicRecommendations />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
