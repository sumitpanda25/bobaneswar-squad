"use client"

import { BarChart, LineChart, PieChart, AreaChart, Bar, Line, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { motion } from "framer-motion"
import { revenueByCategory, monthlySalesData, categoryDistributionData, productGrowthData } from "@/app/data/mockData"

const chartColors = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"]

export function RevenueByCategory() {
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
