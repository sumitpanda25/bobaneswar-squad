"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Settings, LogOut, Menu, X, RefreshCw, CheckCircle2, User, Shield, Palette, Database } from "lucide-react"
import { useDashboardStore, type DateRange } from "@/app/store/dashboardStore"
import { APIStatusWidget } from "./APIStatusWidget"

export interface HeaderProps {
  onMenuToggle?: (open: boolean) => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { dateRange, setDateRange, isLoading } = useDashboardStore()
  
  const notificationsRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)

  const handleMenuToggle = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    onMenuToggle?.(newState)
  }
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notifications = [
    { id: 1, title: 'New Product Added', message: 'Hydra Boost Serum added to inventory', time: '5 min ago', unread: true },
    { id: 2, title: 'Revenue Milestone', message: 'Monthly revenue exceeded $1M', time: '1 hour ago', unread: true },
    { id: 3, title: 'Competitor Alert', message: 'GlowSkin launched new product line', time: '2 hours ago', unread: false },
    { id: 4, title: 'Low Stock Warning', message: 'Sunscreen SPF 50 running low', time: '3 hours ago', unread: false },
  ]

  // Settings handlers
  const handleProfileSettings = () => {
    setShowSettings(false)
    alert('👤 Profile Settings - Coming Soon!')
  }

  const handlePrivacySecurity = () => {
    setShowSettings(false)
    alert('🔒 Privacy & Security Settings - Coming Soon!')
  }

  const handleAppearance = () => {
    setShowSettings(false)
    alert('🎨 Appearance Settings - Coming Soon! (Dark/Light Theme)')
  }

  const handleDataSources = () => {
    setShowSettings(false)
    alert('🔌 Data Sources Configuration - Coming Soon!')
  }

  const handleSignOut = () => {
    setShowSettings(false)
    if (confirm('Are you sure you want to sign out?')) {
      alert('👋 Signing out...')
      // In a real app, this would clear session and redirect to login
      setTimeout(() => {
        alert('Signed out successfully!')
      }, 1000)
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/80 to-slate-900/40 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={handleMenuToggle}
            className="hidden text-slate-400 transition-colors hover:text-white md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Search Bar */}
          <div className="relative hidden flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products, insights..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500/50 focus:bg-slate-800"
            />
          </div>
        </div>

        {/* Right Items */}
        <div className="flex items-center gap-4">
          {/* Date Range Filter */}
          <div className="hidden items-center gap-2 sm:flex">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              disabled={isLoading}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* API Status Widget */}
          <APIStatusWidget />

          {/* Notification Icon */}
          <div className="relative" ref={notificationsRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 w-80 rounded-lg border border-slate-700/50 bg-slate-900/95 backdrop-blur-lg shadow-2xl"
                >
                  <div className="border-b border-slate-700/50 p-4">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <p className="text-xs text-slate-400">You have {notifications.filter(n => n.unread).length} unread messages</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`border-b border-slate-700/30 p-4 transition-colors hover:bg-slate-800/50 ${
                          notif.unread ? 'bg-blue-500/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{notif.title}</p>
                            <p className="mt-1 text-xs text-slate-400">{notif.message}</p>
                            <p className="mt-1 text-xs text-slate-500">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-700/50 p-3 text-center">
                    <button className="text-sm text-blue-400 hover:text-blue-300">View all notifications</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </motion.button>

            {/* Settings Dropdown */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 w-64 rounded-lg border border-slate-700/50 bg-slate-900/95 backdrop-blur-lg shadow-2xl"
                >
                  <div className="border-b border-slate-700/50 p-4">
                    <h3 className="font-semibold text-white">Settings</h3>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleProfileSettings}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-slate-800/50"
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-white">Profile Settings</span>
                    </button>
                    <button
                      onClick={handlePrivacySecurity}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-slate-800/50"
                    >
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-white">Privacy & Security</span>
                    </button>
                    <button
                      onClick={handleAppearance}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-slate-800/50"
                    >
                      <Palette className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-white">Appearance</span>
                    </button>
                    <button
                      onClick={handleDataSources}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-slate-800/50"
                    >
                      <Database className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-white">Data Sources</span>
                    </button>
                  </div>
                  <div className="border-t border-slate-700/50 p-2">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-medium text-white">Admin</span>
              <span className="text-xs text-slate-500">Product Manager</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
