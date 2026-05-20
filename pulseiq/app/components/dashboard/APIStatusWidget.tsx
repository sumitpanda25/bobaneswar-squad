"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { cn } from "@/app/utils/cn"

export function APIStatusWidget() {
  const { apiStatus, refreshData, isLoading } = useDashboardStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />
      case 'disconnected':
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-400" />
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-400" />
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'text-green-400'
      case 'disconnected':
      case 'inactive':
        return 'text-red-400'
      case 'loading':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  const formatLastSync = () => {
    if (!apiStatus.lastSync) return 'Never'
    const now = new Date()
    const diff = now.getTime() - apiStatus.lastSync.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'Just now'
    if (minutes === 1) return '1 min ago'
    if (minutes < 60) return `${minutes} mins ago`
    const hours = Math.floor(minutes / 60)
    if (hours === 1) return '1 hour ago'
    return `${hours} hours ago`
  }

  return (
    <div className="flex items-center gap-4">
      {/* API Status Indicators */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-1.5"
          title="Products API"
        >
          {getStatusIcon(apiStatus.products)}
          <span className={cn("text-xs font-medium", getStatusColor(apiStatus.products))}>
            Products
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-1.5"
          title="Competitors API"
        >
          {getStatusIcon(apiStatus.competitors)}
          <span className={cn("text-xs font-medium", getStatusColor(apiStatus.competitors))}>
            Competitors
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-1.5"
          title="Chatbot API"
        >
          {getStatusIcon(apiStatus.chatbot)}
          <span className={cn("text-xs font-medium", getStatusColor(apiStatus.chatbot))}>
            AI
          </span>
        </motion.div>
      </div>

      {/* Last Sync */}
      <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
        <span>Last sync:</span>
        <span className="font-medium text-slate-400">
          {mounted ? formatLastSync() : 'Loading...'}
        </span>
      </div>

      {/* Refresh Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={refreshData}
        disabled={isLoading}
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white disabled:opacity-50"
        title="Refresh data"
      >
        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
      </motion.button>
    </div>
  )
}

// Made with Bob
