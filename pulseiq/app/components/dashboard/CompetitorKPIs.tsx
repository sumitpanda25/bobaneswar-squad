"use client"

import { motion } from "framer-motion"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { formatCurrency } from "@/app/utils/formatters"
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react"
import { KPICard } from "./KPICard"

export function CompetitorKPIs() {
  // Get competitors from dashboard store instead of mock data
  const competitors = useDashboardStore((state) => state.competitors)
  
  const totalCompetitors = competitors.length
  const avgRating = competitors.length > 0
    ? (competitors.reduce((acc, c) => acc + c.rating, 0) / totalCompetitors).toFixed(1)
    : "0.0"
  const lowestPrice = competitors.length > 0
    ? Math.min(...competitors.map((c) => c.avgPrice))
    : 0
  const totalMarketShare = competitors.length > 0
    ? competitors.reduce((acc, c) => acc + c.marketShare, 0)
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Competitors"
        value={totalCompetitors}
        icon={<Users className="h-6 w-6" />}
        description="Active market players"
        delay={0}
      />
      <KPICard
        title="Avg Competitor Rating"
        value={avgRating}
        icon={<Activity className="h-6 w-6" />}
        description="Average market rating"
        delay={0.1}
      />
      <KPICard
        title="Lowest Price Point"
        value={formatCurrency(lowestPrice)}
        icon={<DollarSign className="h-6 w-6" />}
        isCurrency={false}
        description="Lowest average price"
        delay={0.2}
      />
      <KPICard
        title="Market Threat Level"
        value="High"
        icon={<TrendingUp className="h-6 w-6" />}
        description="5 high-threat competitors"
        delay={0.3}
      />
    </div>
  )
}
