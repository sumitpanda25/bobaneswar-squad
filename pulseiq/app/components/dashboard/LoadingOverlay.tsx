"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useDashboardStore } from "@/app/store/dashboardStore"

export function LoadingOverlay() {
  const { isLoading } = useDashboardStore()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-lg"
          >
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
            <div className="text-center">
              <p className="text-lg font-semibold text-white">Updating Dashboard</p>
              <p className="mt-1 text-sm text-slate-400">Fetching latest data...</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Made with Bob
