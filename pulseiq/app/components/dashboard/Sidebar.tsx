"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, TrendingUp, Zap, Settings, LogOut, ChevronRight } from "lucide-react"
import { cn } from "@/app/utils/cn"

export interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  { name: "Product Overview", href: "/", icon: LayoutDashboard },
  { name: "Competitor Overview", href: "/competitor", icon: TrendingUp },
  { name: "AI Insights", href: "#", icon: Zap },
  { name: "Settings", href: "#", icon: Settings },
]

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-700/50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-lg md:sticky md:top-0 md:translate-x-0"
      >
        <div className="flex h-full flex-col overflow-y-auto py-6">
          {/* Logo */}
          <div className="px-6 pb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 font-bold text-white">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white">PulseIQ</span>
                <span className="text-xs text-blue-200">Enterprise AI</span>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 px-4 flex-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300",
                      isActive
                        ? "bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20 border border-blue-500/30"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-white",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 border-t border-slate-700/50 px-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
