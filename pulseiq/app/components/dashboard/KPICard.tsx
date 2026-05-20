"use client"

import { motion } from "framer-motion"
import { TrendingDown, TrendingUp, ChevronRight } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/app/utils/cn"
import { formatCurrency, formatNumber, getTrendBgColor, getTrendColor } from "@/app/utils/formatters"
import { useDashboardStore } from "@/app/store/dashboardStore"

interface KPICardProps {
  title: string
  value: number | string
  icon: ReactNode
  trend?: number
  isCurrency?: boolean
  isPercent?: boolean
  description?: string
  delay?: number
  onClick?: () => void
  drillDownData?: any
}

export function KPICard({
  title,
  value,
  icon,
  trend,
  isCurrency,
  isPercent,
  description,
  delay = 0,
  onClick,
  drillDownData,
}: KPICardProps) {
  const { openDrillDown } = useDashboardStore()
  
  const formattedValue =
    typeof value === "string"
      ? value
      : isCurrency
        ? formatCurrency(value)
        : isPercent
          ? `${value}%`
          : formatNumber(value)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (drillDownData) {
      openDrillDown(drillDownData)
    }
  }

  const isInteractive = onClick || drillDownData

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5, scale: isInteractive ? 1.02 : 1 }}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10",
        isInteractive && "cursor-pointer"
      )}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            {isInteractive && (
              <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
            )}
          </div>
          <div className="mt-2 flex items-end gap-3">
            <h3 className="text-3xl font-bold text-white">{formattedValue}</h3>
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm font-semibold", getTrendColor(trend))}>
                {trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
          {description && <p className="mt-2 text-xs text-slate-500">{description}</p>}
          {isInteractive && (
            <p className="mt-3 text-xs text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
              Click for detailed analytics →
            </p>
          )}
        </div>

        <motion.div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300",
            trend && trend > 0
              ? "bg-green-500/20 text-green-400"
              : trend && trend < 0
                ? "bg-red-500/20 text-red-400"
                : "bg-blue-500/20 text-blue-400",
          )}
          whileHover={{ scale: 1.1 }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Subtle bottom accent */}
      <div className="-mb-6 -ml-6 mt-4 h-1 w-20 bg-gradient-to-r from-blue-500/50 to-purple-500/50 blur-sm" />
    </motion.div>
  )
}
