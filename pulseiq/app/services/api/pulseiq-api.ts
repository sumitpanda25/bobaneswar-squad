/**
 * PulseIQ API Service
 * Handles all API calls to PulseIQ backend services
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export interface Product {
  id: number;
  name: string;
  category: string;
  revenue: number;
  rating: number;
  price: number;
  riskLevel: string;
  growth: number;
}

export interface Competitor {
  id: number;
  name: string;
  rating: number;
  avgPrice: number;
  marketShare: number;
  threatLevel: string;
}

export interface SalesData {
  month: string;
  sales: number;
  products: number;
}

export interface APIResponse<T> {
  data: T;
  status: string;
  timestamp: string;
}

class PulseIQAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Product APIs
   */
  async getProducts(): Promise<Product[]> {
    return this.fetchAPI<Product[]>('/products');
  }

  async getProductById(id: number): Promise<Product> {
    return this.fetchAPI<Product>(`/products/${id}`);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.fetchAPI<Product[]>(`/products?category=${category}`);
  }

  /**
   * Competitor APIs
   */
  async getCompetitors(): Promise<Competitor[]> {
    return this.fetchAPI<Competitor[]>('/competitors');
  }

  async getCompetitorById(id: number): Promise<Competitor> {
    return this.fetchAPI<Competitor>(`/competitors/${id}`);
  }

  /**
   * Sales & Analytics APIs
   */
  async getSalesData(period: 'monthly' | 'quarterly' | 'yearly' = 'monthly'): Promise<SalesData[]> {
    return this.fetchAPI<SalesData[]>(`/sales?period=${period}`);
  }

  async getRevenueByCategory(): Promise<any[]> {
    return this.fetchAPI<any[]>('/analytics/revenue-by-category');
  }

  async getCategoryDistribution(): Promise<any[]> {
    return this.fetchAPI<any[]>('/analytics/category-distribution');
  }

  /**
   * Sentiment & Insights APIs
   */
  async getSentimentAnalysis(): Promise<any> {
    return this.fetchAPI<any>('/sentiment/analysis');
  }

  async getAIInsights(): Promise<any[]> {
    return this.fetchAPI<any[]>('/insights/ai');
  }

  async getAIRecommendations(): Promise<any[]> {
    return this.fetchAPI<any[]>('/insights/recommendations');
  }

  /**
   * Pricing Intelligence APIs
   */
  async getPricingIntelligence(): Promise<any> {
    return this.fetchAPI<any>('/pricing/intelligence');
  }

  async getCompetitorPricing(): Promise<any[]> {
    return this.fetchAPI<any[]>('/pricing/competitors');
  }

  /**
   * Market Analysis APIs
   */
  async getMarketShare(): Promise<any[]> {
    return this.fetchAPI<any[]>('/market/share');
  }

  async getCompetitiveThreatMatrix(): Promise<any[]> {
    return this.fetchAPI<any[]>('/market/threat-matrix');
  }

  /**
   * Refresh/Sync APIs
   */
  async refreshDashboardData(): Promise<APIResponse<any>> {
    return this.fetchAPI<APIResponse<any>>('/dashboard/refresh', {
      method: 'POST',
    });
  }

  async syncWithIBMOrchestration(): Promise<APIResponse<any>> {
    return this.fetchAPI<APIResponse<any>>('/sync/ibm-orchestration', {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const pulseiqAPI = new PulseIQAPI();

// Export class for custom instances
export default PulseIQAPI;

// Made with Bob
