"use client"

import { motion } from "framer-motion"

export function KPICardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm"
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        style={{
          backgroundSize: "1000px 100%",
          animation: "shimmer 2s infinite linear"
        }}
      />
      
      <div className="relative space-y-4">
        {/* Icon skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-700/50" />
          <div className="h-6 w-16 animate-pulse rounded-md bg-slate-700/50" />
        </div>
        
        {/* Title skeleton */}
        <div className="h-4 w-24 animate-pulse rounded bg-slate-700/50" />
        
        {/* Value skeleton */}
        <div className="h-8 w-32 animate-pulse rounded bg-slate-700/50" />
        
        {/* Change skeleton */}
        <div className="h-4 w-20 animate-pulse rounded bg-slate-700/50" />
      </div>
    </motion.div>
  )
}

// Add shimmer animation to global CSS or tailwind config
// @keyframes shimmer {
//   100% {
//     transform: translateX(100%);
//   }
// }

// Made with Bob
