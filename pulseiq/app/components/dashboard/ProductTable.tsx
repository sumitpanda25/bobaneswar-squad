"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { cn } from "@/app/utils/cn"
import { formatCurrency, getTrendColor } from "@/app/utils/formatters"
import { useDashboardStore } from "@/app/store/dashboardStore"
import { useDebounce } from "@/app/hooks/useDebounce"

type SortKey = 'name' | 'category' | 'revenue' | 'rating' | 'price' | 'riskLevel' | 'growth'

export function ProductTable() {
  // Get products from dashboard store instead of mock data
  const products = useDashboardStore((state) => state.products)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("revenue")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const debouncedSearch = useDebounce(searchTerm, 300)

  const filtered = useMemo(() => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
  }, [debouncedSearch, products])

  const sorted = useMemo(() => {
    const data = [...filtered]
    data.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      const comparison = (typeof aVal === "number" && typeof bVal === "number") ? (aVal > bVal ? 1 : -1) : 0
      return sortOrder === "desc" ? comparison * -1 : comparison
    })

    return data
  }, [filtered, sortKey, sortOrder])

  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const paginatedData = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("desc")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm"
    >
      {/* Search Bar */}
      <div className="border-b border-slate-700/50 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50 bg-slate-800/30">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 font-semibold text-slate-400 hover:text-white"
                >
                  Product Name
                  <ChevronsUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button onClick={() => handleSort("category")} className="flex items-center gap-2 font-semibold text-slate-400 hover:text-white">
                  Category
                  <ChevronsUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort("revenue")} className="ml-auto flex items-center gap-2 font-semibold text-slate-400 hover:text-white">
                  Revenue
                  {sortKey === "revenue" &&
                    (sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort("rating")} className="ml-auto flex items-center gap-2 font-semibold text-slate-400 hover:text-white">
                  Rating
                  {sortKey === "rating" &&
                    (sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort("price")} className="ml-auto flex items-center gap-2 font-semibold text-slate-400 hover:text-white">
                  Price
                  {sortKey === "price" &&
                    (sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
                </button>
              </th>
              <th className="px-4 py-3 text-center font-semibold text-slate-400">Risk</th>
              <th className="px-4 py-3 text-right">
                <button onClick={() => handleSort("growth")} className="ml-auto flex items-center gap-2 font-semibold text-slate-400 hover:text-white">
                  Growth
                  {sortKey === "growth" &&
                    (sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-700/30 transition-colors hover:bg-slate-800/30"
              >
                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                <td className="px-4 py-3 text-slate-400">{item.category}</td>
                <td className="px-4 py-3 text-right text-white">{formatCurrency(item.revenue)}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-block rounded-lg bg-yellow-500/20 px-2 py-1 text-sm text-yellow-400">{item.rating} ⭐</span>
                </td>
                <td className="px-4 py-3 text-right text-white">{formatCurrency(item.price)}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={cn(
                      "inline-block rounded-lg px-2 py-1 text-sm font-medium",
                      item.riskLevel === "Low" && "bg-green-500/20 text-green-400",
                      item.riskLevel === "Medium" && "bg-yellow-500/20 text-yellow-400",
                      item.riskLevel === "High" && "bg-red-500/20 text-red-400",
                    )}
                  >
                    {item.riskLevel}
                  </span>
                </td>
                <td className={cn("px-4 py-3 text-right font-semibold", getTrendColor(item.growth))}>
                  {item.growth > 0 ? "+" : ""}
                  {item.growth}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-slate-700/50 px-4 py-3">
        <span className="text-sm text-slate-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-700 px-4 py-1 text-sm text-slate-400 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "rounded-lg border px-3 py-1 text-sm transition-colors",
                  currentPage === page
                    ? "border-blue-500 bg-blue-500/20 text-blue-400"
                    : "border-slate-700 text-slate-400 hover:border-slate-600",
                )}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-700 px-4 py-1 text-sm text-slate-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  )
}
