/**
 * Data Transformers
 * Convert IBM Agent Studio API responses to PulseIQ dashboard format
 */

import type { ProductsAPIResponse, CompetitorsAPIResponse, SalesAPIResponse, AnalyticsAPIResponse, AIInsightsAPIResponse } from './ibm-agent-studio';

// Dashboard data types (matching mockData.ts structure)
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

export interface MonthlySales {
  month: string;
  sales: number;
  products: number;
}

export interface RevenueByCategory {
  category: string;
  revenue: number;
}

export interface SentimentData {
  sentiment: string;
  count: number;
  percentage: number;
}

export interface AIInsight {
  id: number;
  title: string;
  description: string;
  impact: string;
  timestamp: string;
}

export interface AIRecommendation {
  id: number;
  title: string;
  description: string;
  priority: string;
  impact: string;
}

/**
 * Transform Products API response to dashboard format
 */
export function transformProductsData(apiResponse: ProductsAPIResponse): Product[] {
  return apiResponse.products.map((product, index) => ({
    id: parseInt(product.id.replace(/\D/g, '')) || index + 1,
    name: product.name,
    category: product.category,
    revenue: product.revenue,
    rating: product.rating,
    price: product.price,
    riskLevel: product.risk_level,
    growth: product.growth_percentage,
  }));
}

/**
 * Transform Competitors API response to dashboard format
 */
export function transformCompetitorsData(apiResponse: CompetitorsAPIResponse): Competitor[] {
  return apiResponse.competitors.map((competitor, index) => ({
    id: parseInt(competitor.id.replace(/\D/g, '')) || index + 1,
    name: competitor.name,
    rating: competitor.average_rating,
    avgPrice: competitor.average_price,
    marketShare: competitor.market_share,
    threatLevel: competitor.threat_level,
  }));
}

/**
 * Transform Sales API response to dashboard format
 */
export function transformSalesData(apiResponse: SalesAPIResponse): MonthlySales[] {
  return apiResponse.monthly_sales.map((sale) => ({
    month: sale.month,
    sales: sale.sales,
    products: Math.round(sale.sales / 200), // Estimate products from sales
  }));
}

/**
 * Transform Analytics API response to revenue by category
 */
export function transformRevenueByCategory(apiResponse: AnalyticsAPIResponse): RevenueByCategory[] {
  return apiResponse.revenue_by_category.map((item) => ({
    category: item.category,
    revenue: item.revenue,
  }));
}

/**
 * Transform Analytics API response to sentiment data
 */
export function transformSentimentData(apiResponse: AnalyticsAPIResponse): SentimentData[] {
  const sentiment = apiResponse.sentiment_analysis;
  
  // Calculate counts based on percentages (assuming 2500 total reviews)
  const totalReviews = 2500;
  
  return [
    {
      sentiment: 'Positive',
      count: Math.round((sentiment.positive_percentage / 100) * totalReviews),
      percentage: sentiment.positive_percentage,
    },
    {
      sentiment: 'Neutral',
      count: Math.round((sentiment.neutral_percentage / 100) * totalReviews),
      percentage: sentiment.neutral_percentage,
    },
    {
      sentiment: 'Negative',
      count: Math.round((sentiment.negative_percentage / 100) * totalReviews),
      percentage: sentiment.negative_percentage,
    },
  ];
}

/**
 * Transform AI Insights API response to dashboard format
 */
export function transformAIInsights(apiResponse: AIInsightsAPIResponse): AIInsight[] {
  return apiResponse.insights.map((insight, index) => ({
    id: index + 1,
    title: insight.type,
    description: insight.message,
    impact: insight.type.includes('Risk') ? 'High' : 'Medium',
    timestamp: `${Math.floor(Math.random() * 8) + 1} hours ago`,
  }));
}

/**
 * Transform AI Insights API response to recommendations
 */
export function transformAIRecommendations(apiResponse: AIInsightsAPIResponse): AIRecommendation[] {
  return apiResponse.recommendations.map((rec, index) => ({
    id: index + 1,
    title: rec.action.split('.')[0], // Use first sentence as title
    description: rec.action,
    priority: rec.priority,
    impact: rec.expected_impact,
  }));
}

/**
 * Calculate category distribution from products
 */
export function calculateCategoryDistribution(products: Product[]): Array<{ name: string; value: number; fill: string }> {
  const categoryMap = new Map<string, number>();
  
  products.forEach((product) => {
    const count = categoryMap.get(product.category) || 0;
    categoryMap.set(product.category, count + 1);
  });
  
  const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'];
  let colorIndex = 0;
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    value: Math.round((count / products.length) * 100),
    fill: colors[colorIndex++ % colors.length],
  }));
}

/**
 * Calculate product growth data from sales
 */
export function calculateProductGrowth(salesData: MonthlySales[]): Array<{ month: string; products: number; revenue: number; profit: number }> {
  // Group by quarters
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const result = [];
  
  for (let i = 0; i < 4; i++) {
    const startIdx = i * 3;
    const quarterSales = salesData.slice(startIdx, startIdx + 3);
    
    const totalSales = quarterSales.reduce((sum, s) => sum + s.sales, 0);
    const totalProducts = quarterSales.reduce((sum, s) => sum + s.products, 0);
    
    result.push({
      month: quarters[i],
      products: Math.round(totalProducts / 3),
      revenue: totalSales,
      profit: Math.round(totalSales * 0.3), // 30% profit margin
    });
  }
  
  return result;
}

/**
 * Generate market share data from competitors
 */
export function generateMarketShareData(competitors: Competitor[]): Array<{ name: string; value: number; fill: string }> {
  const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'];
  
  return competitors.map((competitor, index) => ({
    name: competitor.name,
    value: competitor.marketShare,
    fill: colors[index % colors.length],
  }));
}

/**
 * Generate competitor pricing data
 */
export function generateCompetitorPricing(competitors: Competitor[], ourProducts: Product[]): Array<{ competitor: string; price: number; rating: number; products: number }> {
  const ourAvgPrice = ourProducts.reduce((sum, p) => sum + p.price, 0) / ourProducts.length;
  const ourAvgRating = ourProducts.reduce((sum, p) => sum + p.rating, 0) / ourProducts.length;
  
  const result = [
    {
      competitor: 'PulseIQ',
      price: Math.round(ourAvgPrice),
      rating: parseFloat(ourAvgRating.toFixed(1)),
      products: ourProducts.length,
    },
  ];
  
  competitors.forEach((competitor) => {
    result.push({
      competitor: competitor.name,
      price: Math.round(competitor.avgPrice),
      rating: competitor.rating,
      products: Math.floor(Math.random() * 10) + 5, // Estimate
    });
  });
  
  return result;
}

// Made with Bob
