/**
 * PulseIQ Global Dashboard Store
 * Centralized state management for enterprise intelligence platform
 */

import { create } from 'zustand'
import { productData, competitorData } from '@/app/data/mockData'
import { ibmAgentStudioAPI } from '@/app/services/api/ibm-agent-studio'
import { transformProductsData, transformCompetitorsData } from '@/app/services/api/data-transformers'

// Feature flags from environment
const ENABLE_REAL_API = process.env.NEXT_PUBLIC_ENABLE_REAL_API === 'true'
const ENABLE_MOCK_DATA = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA !== 'false'

export type DateRange = '7days' | '30days' | '90days' | 'yearly' | 'custom'

export interface DrillDownData {
  type: 'kpi' | 'chart' | 'product' | 'competitor'
  title: string
  data: any
  insights?: string[]
  recommendations?: string[]
}

export interface APIStatus {
  products: 'connected' | 'disconnected' | 'loading'
  competitors: 'connected' | 'disconnected' | 'loading'
  chatbot: 'active' | 'inactive' | 'loading'
  lastSync: Date | null
}

interface DashboardState {
  // Filters
  dateRange: DateRange
  selectedCategory: string | null
  selectedCompetitor: string | null
  searchQuery: string

  // Data
  products: typeof productData
  competitors: typeof competitorData
  isLoading: boolean
  error: string | null

  // Drill-down
  drillDownOpen: boolean
  drillDownData: DrillDownData | null

  // API Status
  apiStatus: APIStatus

  // Actions
  setDateRange: (range: DateRange) => void
  setSelectedCategory: (category: string | null) => void
  setSelectedCompetitor: (competitor: string | null) => void
  setSearchQuery: (query: string) => void
  openDrillDown: (data: DrillDownData) => void
  closeDrillDown: () => void
  refreshData: () => Promise<void>
  updateAPIStatus: (service: keyof APIStatus, status: APIStatus[keyof APIStatus]) => void
  resetFilters: () => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  dateRange: '30days',
  selectedCategory: null,
  selectedCompetitor: null,
  searchQuery: '',
  products: productData,
  competitors: competitorData,
  isLoading: false,
  error: null,
  drillDownOpen: false,
  drillDownData: null,
  apiStatus: {
    products: 'connected',
    competitors: 'connected',
    chatbot: 'active',
    lastSync: new Date(),
  },

  // Actions
  setDateRange: (range) => {
    set({ dateRange: range, isLoading: true })
    // Simulate API call
    setTimeout(() => {
      set({ isLoading: false })
    }, 500)
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
  },

  setSelectedCompetitor: (competitor) => {
    set({ selectedCompetitor: competitor })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  openDrillDown: (data) => {
    set({ drillDownOpen: true, drillDownData: data })
  },

  closeDrillDown: () => {
    set({ drillDownOpen: false, drillDownData: null })
  },

  refreshData: async () => {
    set({ isLoading: true, error: null })
    
    try {
      if (ENABLE_REAL_API) {
        // Fetch data from IBM Agent Studio API
        console.log('Fetching data from IBM Agent Studio API...')
        
        set((state) => ({
          apiStatus: {
            ...state.apiStatus,
            products: 'loading',
            competitors: 'loading',
          },
        }))
        
        // Fetch products and competitors in parallel
        const [productsResponse, competitorsResponse] = await Promise.all([
          ibmAgentStudioAPI.getProducts().catch((error) => {
            console.error('Products API failed:', error)
            return null
          }),
          ibmAgentStudioAPI.getCompetitors().catch((error) => {
            console.error('Competitors API failed:', error)
            return null
          }),
        ])
        
        // Transform API responses to dashboard format
        const products = productsResponse
          ? transformProductsData(productsResponse)
          : (ENABLE_MOCK_DATA ? productData : [])
        
        const competitors = competitorsResponse
          ? transformCompetitorsData(competitorsResponse)
          : (ENABLE_MOCK_DATA ? competitorData : [])
        
        set({
          products,
          competitors,
          isLoading: false,
          apiStatus: {
            products: productsResponse ? 'connected' : 'disconnected',
            competitors: competitorsResponse ? 'connected' : 'disconnected',
            chatbot: get().apiStatus.chatbot,
            lastSync: new Date(),
          },
        })
        
        console.log('Data fetched successfully from IBM Agent Studio API')
      } else {
        // Use mock data
        console.log('Using mock data (ENABLE_REAL_API=false)')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        set({
          products: productData,
          competitors: competitorData,
          isLoading: false,
          apiStatus: {
            ...get().apiStatus,
            lastSync: new Date(),
          },
        })
      }
    } catch (error) {
      console.error('Failed to refresh data:', error)
      
      // Fallback to mock data on error
      if (ENABLE_MOCK_DATA) {
        console.log('Falling back to mock data due to error')
        set({
          products: productData,
          competitors: competitorData,
          isLoading: false,
          error: 'API unavailable, using cached data',
          apiStatus: {
            products: 'disconnected',
            competitors: 'disconnected',
            chatbot: get().apiStatus.chatbot,
            lastSync: get().apiStatus.lastSync,
          },
        })
      } else {
        set({
          isLoading: false,
          error: 'Failed to refresh data',
        })
      }
    }
  },

  updateAPIStatus: (service, status) => {
    set((state) => ({
      apiStatus: {
        ...state.apiStatus,
        [service]: status,
      },
    }))
  },

  resetFilters: () => {
    set({
      dateRange: '30days',
      selectedCategory: null,
      selectedCompetitor: null,
      searchQuery: '',
    })
  },
}))

// Selectors for computed values
export const useFilteredProducts = () => {
  const { products, selectedCategory, searchQuery } = useDashboardStore()
  
  return products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })
}

export const useFilteredCompetitors = () => {
  const { competitors, searchQuery } = useDashboardStore()
  
  return competitors.filter((competitor) => {
    const matchesSearch = !searchQuery || 
      competitor.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })
}

export const useKPIMetrics = () => {
  const products = useFilteredProducts()
  
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0)
  const avgRating = products.length > 0 
    ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
    : '0.0'
  const avgPrice = products.length > 0
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : '0.00'
  const riskProducts = products.filter(p => p.riskLevel === 'High' || p.riskLevel === 'Medium').length
  const avgGrowth = products.length > 0
    ? (products.reduce((sum, p) => sum + p.growth, 0) / products.length).toFixed(1)
    : '0.0'

  return {
    totalProducts: products.length,
    totalRevenue,
    avgRating: parseFloat(avgRating),
    avgPrice: parseFloat(avgPrice),
    riskProducts,
    avgGrowth: parseFloat(avgGrowth),
  }
}

// Made with Bob
