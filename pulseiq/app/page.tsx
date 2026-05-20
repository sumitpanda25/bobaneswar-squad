"use client"

import { motion } from "framer-motion"
import { TrendingUp, Package, DollarSign, Star, Zap, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "./components/dashboard/DashboardLayout"
import { KPICard } from "./components/dashboard/KPICard"
import { KPICardSkeleton } from "./components/dashboard/KPICardSkeleton"
import { RevenueByCategory, MonthlySalesTrend, ProductDistribution, ProductGrowthTrend } from "./components/dashboard/Charts"
import { ProductTable } from "./components/dashboard/ProductTable"
import { AIInsightsPanel } from "./components/dashboard/AIInsightsPanel"
import { SentimentAnalysis } from "./components/dashboard/SentimentAnalysis"
import { AIRecommendations } from "./components/dashboard/AIRecommendations"
import { useKPIMetrics, useFilteredProducts, useDashboardStore } from "./store/dashboardStore"
import { formatCurrency } from "./utils/formatters"

export default function Home() {
  // Use dashboard store for reactive data
  const metrics = useKPIMetrics()
  const filteredProducts = useFilteredProducts()
  const { isLoading, dateRange } = useDashboardStore()
  
  const monthlyGrowth = 24.5

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
            Product Overview Dashboard
          </motion.h1>
          <motion.p
            className="mt-2 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Real-time AI-powered enterprise product intelligence
          </motion.p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {isLoading ? (
            <>
              <KPICardSkeleton />
              <KPICardSkeleton />
              <KPICardSkeleton />
              <KPICardSkeleton />
              <KPICardSkeleton />
            </>
          ) : (
            <>
              <KPICard
                title="Total Products"
                value={metrics.totalProducts}
                icon={<Package className="h-6 w-6" />}
                trend={8.2}
                description="Active products"
                delay={0}
              />
              <KPICard
                title="Total Revenue"
                value={formatCurrency(metrics.totalRevenue)}
                icon={<DollarSign className="h-6 w-6" />}
                trend={15.3}
                isCurrency={false}
                description="Last 30 days"
                delay={0.1}
                drillDownData={{
                  type: 'kpi',
                  title: 'Revenue Deep Dive',
                  data: {
                    metrics: [
                      { label: 'Total Revenue', value: formatCurrency(metrics.totalRevenue), change: 15.3 },
                      { label: 'Avg Order Value', value: '$127', change: 8.5 },
                      { label: 'Revenue/Product', value: formatCurrency(Math.round(metrics.totalRevenue / metrics.totalProducts)), change: 6.8 }
                    ],
                    trend: [
                      { period: 'Week 1', value: 180000 },
                      { period: 'Week 2', value: 220000 },
                      { period: 'Week 3', value: 250000 },
                      { period: 'Week 4', value: 253000 }
                    ],
                    breakdown: [
                      { name: 'Serums', value: '$125K', change: 24.5, status: 'Good' },
                      { name: 'Sunscreen', value: '$156K', change: -15.2, status: 'Risk' },
                      { name: 'Eye Care', value: '$112K', change: 18.7, status: 'Good' },
                      { name: 'Moisturizers', value: '$98K', change: -8.3, status: 'Warning' }
                    ]
                  },
                  insights: [
                    'Revenue growing 15.3% month-over-month',
                    'Serums category driving 28% of total revenue',
                    'Q1 performance exceeds forecast by 12%'
                  ],
                  recommendations: [
                    'Increase inventory for high-growth categories',
                    'Launch targeted campaign for declining products',
                    'Optimize pricing for premium segment'
                  ]
                }}
              />
              <KPICard
                title="Avg Rating"
                value={metrics.avgRating.toFixed(1)}
                icon={<Star className="h-6 w-6" />}
                trend={2.1}
                description="Out of 5.0"
                delay={0.2}
              />
              <KPICard
                title="Avg Price"
                value={formatCurrency(metrics.avgPrice)}
                icon={<DollarSign className="h-6 w-6" />}
                isCurrency={false}
                trend={-3.2}
                description="Average pricing"
                delay={0.3}
              />
              <KPICard
                title="Risk Products"
                value={metrics.riskProducts}
                icon={<AlertTriangle className="h-6 w-6" />}
                trend={-5.4}
                description="Needs attention"
                delay={0.4}
              />
            </>
          )}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueByCategory />
          <MonthlySalesTrend />
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ProductDistribution />
          <ProductGrowthTrend />
        </div>

        {/* Product Intelligence Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Product Intelligence</h2>
          <ProductTable />
        </motion.div>

        {/* Sentiment & AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">Sentiment & Customer Insights</h2>
          <SentimentAnalysis />
        </motion.div>

        {/* AI Insights & Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AIInsightsPanel />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
                <p className="text-sm text-blue-300">Top Performing Category</p>
                <p className="text-2xl font-bold text-blue-400">Serums (28%)</p>
                <p className="text-xs text-blue-200 mt-2">Revenue: $125,000 | Growth: +24.5%</p>
              </div>
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                <p className="text-sm text-green-300">Best Rated Product</p>
                <p className="text-2xl font-bold text-green-400">Face Mask Luxury (4.9 ⭐)</p>
                <p className="text-xs text-green-200 mt-2">Growth: +32.1% | Revenue: $87,000</p>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-300">Needs Attention</p>
                <p className="text-2xl font-bold text-red-400">Sunscreen (-15.2%)</p>
                <p className="text-xs text-red-200 mt-2">High risk | Seasonal decline expected</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white">AI-Powered Recommendations</h2>
          <AIRecommendations />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
