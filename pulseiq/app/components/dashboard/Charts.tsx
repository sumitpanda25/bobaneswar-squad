"use client"

import { BarChart, LineChart, PieChart, AreaChart, Bar, Line, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { motion } from "framer-motion"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { useMemo } from "react"

const chartColors = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"]

export function RevenueByCategory() {
  const products = useDashboardStore((state) => state.products)
  
  // Calculate revenue by category from real product data
  const revenueByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>()
    
    products.forEach(product => {
      const current = categoryMap.get(product.category) || 0
      categoryMap.set(product.category, current + product.revenue)
    })
    
    return Array.from(categoryMap.entries()).map(([category, revenue]) => ({
      category,
      revenue
    }))
  }, [products])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Revenue by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueByCategory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="category" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function MonthlySalesTrend() {
  const products = useDashboardStore((state) => state.products)
  
  // Generate monthly sales data from products (simulated trend based on revenue)
  const monthlySalesData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0)
    
    return months.map((month, index) => ({
      month,
      sales: Math.round(totalRevenue * (0.8 + Math.random() * 0.4) / 6),
      products: products.length + Math.floor(Math.random() * 3 - 1)
    }))
  }, [products])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Monthly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlySalesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="products" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function ProductDistribution() {
  const products = useDashboardStore((state) => state.products)
  
  // Calculate category distribution from real products
  const categoryDistributionData = useMemo(() => {
    const categoryMap = new Map<string, number>()
    
    products.forEach(product => {
      categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1)
    })
    
    const total = products.length
    return Array.from(categoryMap.entries()).map(([name, count], index) => ({
      name,
      value: Math.round((count / total) * 100),
      fill: chartColors[index % chartColors.length]
    }))
  }, [products])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Product Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function ProductGrowthTrend() {
  const products = useDashboardStore((state) => state.products)
  
  // Generate growth trend data from products
  const productGrowthData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const avgGrowth = products.reduce((sum, p) => sum + p.growth, 0) / products.length
    
    return months.map((month, index) => ({
      month,
      growth: Math.round(avgGrowth * (0.8 + index * 0.1))
    }))
  }, [products])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-white">Product Growth Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={productGrowthData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
          <Legend />
          <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
