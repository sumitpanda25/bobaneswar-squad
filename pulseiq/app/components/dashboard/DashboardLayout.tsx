"use client"

import { ReactNode, useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { AIAssistant } from "@/app/components/ai/AIAssistant"
import { DrillDownModal } from "./DrillDownModal"
import { LoadingOverlay } from "./LoadingOverlay"

export interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* PulseIQ AI Assistant */}
      <AIAssistant />

      {/* Drill-Down Modal */}
      <DrillDownModal />

      {/* Loading Overlay */}
      <LoadingOverlay />
    </div>
  )
}
