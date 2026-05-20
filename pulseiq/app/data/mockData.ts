export const productData = [
  { id: 1, name: "Premium Serum", category: "Serums", revenue: 125000, rating: 4.8, price: 89.99, riskLevel: "Low", growth: 24.5 },
  { id: 2, name: "Moisturizer Pro", category: "Moisturizers", revenue: 98000, rating: 4.6, price: 59.99, riskLevel: "Medium", growth: -8.3 },
  { id: 3, name: "Sunscreen SPF 50", category: "Sunscreen", revenue: 156000, rating: 4.7, price: 45.99, riskLevel: "High", growth: -15.2 },
  { id: 4, name: "Face Mask Luxury", category: "Masks", revenue: 87000, rating: 4.9, price: 34.99, riskLevel: "Low", growth: 32.1 },
  { id: 5, name: "Eye Cream Night", category: "Eye Care", revenue: 112000, rating: 4.5, price: 72.99, riskLevel: "Low", growth: 18.7 },
  { id: 6, name: "Cleanser Deluxe", category: "Cleansers", revenue: 95000, rating: 4.4, price: 29.99, riskLevel: "Medium", growth: 12.3 },
  { id: 7, name: "Toner Advanced", category: "Toners", revenue: 76000, rating: 4.3, price: 39.99, riskLevel: "Medium", growth: 5.2 },
  { id: 8, name: "Lip Balm Premium", category: "Lip Care", revenue: 54000, rating: 4.6, price: 19.99, riskLevel: "Low", growth: 41.8 },
];

export const monthlySalesData = [
  { month: "Jan", sales: 240000, products: 1200 },
  { month: "Feb", sales: 280000, products: 1400 },
  { month: "Mar", sales: 320000, products: 1600 },
  { month: "Apr", sales: 305000, products: 1500 },
  { month: "May", sales: 350000, products: 1750 },
  { month: "Jun", sales: 385000, products: 1900 },
  { month: "Jul", sales: 420000, products: 2100 },
  { month: "Aug", sales: 398000, products: 1990 },
  { month: "Sep", sales: 380000, products: 1850 },
  { month: "Oct", sales: 425000, products: 2125 },
  { month: "Nov", sales: 520000, products: 2600 },
  { month: "Dec", sales: 580000, products: 2900 },
];

export const categoryDistributionData = [
  { name: "Serums", value: 28, fill: "#3b82f6" },
  { name: "Moisturizers", value: 22, fill: "#ef4444" },
  { name: "Sunscreen", value: 18, fill: "#f59e0b" },
  { name: "Masks", value: 15, fill: "#10b981" },
  { name: "Eye Care", value: 12, fill: "#8b5cf6" },
  { name: "Others", value: 5, fill: "#06b6d4" },
];

export const revenueByCategory = [
  { category: "Serums", revenue: 125000 },
  { category: "Moisturizers", revenue: 98000 },
  { category: "Sunscreen", revenue: 156000 },
  { category: "Masks", revenue: 87000 },
  { category: "Eye Care", revenue: 112000 },
  { category: "Cleansers", revenue: 95000 },
];

export const productGrowthData = [
  { month: "Q1", products: 1200, revenue: 280000, profit: 84000 },
  { month: "Q2", products: 1550, revenue: 358000, profit: 107400 },
  { month: "Q3", products: 1980, revenue: 420000, profit: 126000 },
  { month: "Q4", products: 2425, revenue: 525000, profit: 157500 },
];

export const sentimentData = [
  { sentiment: "Positive", count: 1850, percentage: 74 },
  { sentiment: "Neutral", count: 450, percentage: 18 },
  { sentiment: "Negative", count: 200, percentage: 8 },
];

export const topComplaints = [
  { complaint: "Product packaging too fragile", frequency: 127 },
  { complaint: "Slow shipping times", frequency: 95 },
  { complaint: "Inconsistent product quality", frequency: 78 },
  { complaint: "Poor customer service response", frequency: 62 },
  { complaint: "Price too high", frequency: 54 },
];

export const topPraisedProducts = [
  { name: "Premium Serum", mentions: 342 },
  { name: "Face Mask Luxury", mentions: 298 },
  { name: "Eye Cream Night", mentions: 256 },
  { name: "Sunscreen SPF 50", mentions: 215 },
  { name: "Cleanser Deluxe", mentions: 189 },
];

export const aiInsights = [
  {
    id: 1,
    title: "Serum Category Growth",
    description: "Serum category shows strongest growth at 24.5% YoY with premium positioning driving 28% of revenue.",
    impact: "High",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Premium Products Performance",
    description: "Premium products (>$50) achieve 4.7 avg rating vs 4.4 for budget products, indicating strong market demand for quality.",
    impact: "High",
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    title: "Sunscreen Sales Decline",
    description: "Sunscreen sales declining 15.2% in last quarter. Seasonal trend expected to reverse in Q2.",
    impact: "Medium",
    timestamp: "6 hours ago",
  },
  {
    id: 4,
    title: "Customer Satisfaction",
    description: "74% positive sentiment in customer reviews. Focus on packaging quality can improve satisfaction by 8-12%.",
    impact: "Medium",
    timestamp: "8 hours ago",
  },
];

export const aiRecommendations = [
  {
    id: 1,
    title: "Bundle Premium Products",
    description: "Create bundle deals combining top-rated serums with eye creams. Expected revenue impact: +12-15%",
    priority: "High",
    impact: "+12-15% Revenue",
  },
  {
    id: 2,
    title: "Improve Packaging",
    description: "Address packaging complaints mentioned in 7.2% of negative feedback. ROI: 18% reduction in returns.",
    priority: "High",
    impact: "-7.2% Returns",
  },
  {
    id: 3,
    title: "Launch Sunscreen Campaign",
    description: "Seasonal marketing push for sunscreen in spring. Expected sales recovery: 18-22%",
    priority: "Medium",
    impact: "+18-22% Sales",
  },
  {
    id: 4,
    title: "Expand Masks Category",
    description: "Masks showing strong growth potential (32% YoY). Allocate 25% more inventory.",
    priority: "Medium",
    impact: "+32% Growth",
  },
];

// Competitor Data
export const competitorData = [
  { id: 1, name: "BeautyPlus", rating: 4.5, avgPrice: 54.99, marketShare: 22, threatLevel: "High" },
  { id: 2, name: "SkinCare Elite", rating: 4.6, avgPrice: 72.99, marketShare: 18, threatLevel: "High" },
  { id: 3, name: "GlowNatural", rating: 4.3, avgPrice: 39.99, marketShare: 15, threatLevel: "Medium" },
  { id: 4, name: "DermaPro", rating: 4.4, avgPrice: 64.99, marketShare: 20, threatLevel: "High" },
  { id: 5, name: "NaturalRadiance", rating: 4.2, avgPrice: 44.99, marketShare: 12, threatLevel: "Medium" },
  { id: 6, name: "LuxurySkin", rating: 4.7, avgPrice: 89.99, marketShare: 13, threatLevel: "High" },
];

export const competitorPricingData = [
  { competitor: "PulseIQ", price: 59.99, rating: 4.6, products: 8 },
  { competitor: "BeautyPlus", price: 54.99, rating: 4.5, products: 12 },
  { competitor: "SkinCare Elite", price: 72.99, rating: 4.6, products: 10 },
  { competitor: "GlowNatural", price: 39.99, rating: 4.3, products: 15 },
  { competitor: "DermaPro", price: 64.99, rating: 4.4, products: 11 },
  { competitor: "NaturalRadiance", price: 44.99, rating: 4.2, products: 9 },
  { competitor: "LuxurySkin", price: 89.99, rating: 4.7, products: 6 },
];

export const marketShareData = [
  { name: "BeautyPlus", value: 22, fill: "#3b82f6" },
  { name: "DermaPro", value: 20, fill: "#ef4444" },
  { name: "SkinCare Elite", value: 18, fill: "#f59e0b" },
  { name: "NaturalRadiance", value: 15, fill: "#10b981" },
  { name: "LuxurySkin", value: 13, fill: "#8b5cf6" },
  { name: "GlowNatural", value: 12, fill: "#06b6d4" },
];

export const competitorInsights = [
  {
    id: 1,
    title: "Premium Segment Dominance",
    description: "LuxurySkin dominates premium segment with $89.99 average price and 4.7 rating. Our premium serum ($89.99) is competitive.",
    impact: "High",
  },
  {
    id: 2,
    title: "Pricing Undercut Risk",
    description: "GlowNatural undercuts market at $39.99 but maintains 4.3 rating. Recommend adopting value positioning in mid-tier.",
    impact: "High",
  },
  {
    id: 3,
    title: "Market Gap Opportunity",
    description: "No major player in $44-54 range with high ratings. Opportunity to launch premium-positioned budget line.",
    impact: "Medium",
  },
];

export const strategicRecommendations = [
  {
    id: 1,
    title: "Reposition Pricing",
    description: "Move premium products to $79.99-$99.99 range to compete with LuxurySkin. Expected margin improvement: 15-18%",
    priority: "High",
    impact: "+15-18% Margin",
  },
  {
    id: 2,
    title: "Launch Value Line",
    description: "Create $39.99-$49.99 budget-friendly line to capture GlowNatural's market. Revenue opportunity: +22%",
    priority: "High",
    impact: "+22% Revenue",
  },
  {
    id: 3,
    title: "Improve Ratings",
    description: "Achieve 4.7 rating to match LuxurySkin. Current: 4.6. Focus on quality and customer service.",
    priority: "Medium",
    impact: "+0.1 Rating",
  },
  {
    id: 4,
    title: "Strategic Bundling",
    description: "Bundle products across price points to combat market fragmentation. Similar to successful competitors.",
    priority: "Medium",
    impact: "+18% AOV",
  },
];

export const competitiveThreatMatrix = [
  { category: "Serums", ourRating: 4.8, competition: 4.5, ourPrice: 89.99, threat: "Low" },
  { category: "Moisturizers", ourRating: 4.6, competition: 4.6, ourPrice: 59.99, threat: "High" },
  { category: "Sunscreen", ourRating: 4.7, competition: 4.4, ourPrice: 45.99, threat: "Low" },
  { category: "Masks", ourRating: 4.9, competition: 4.3, ourPrice: 34.99, threat: "Very Low" },
  { category: "Eye Care", ourRating: 4.5, competition: 4.5, ourPrice: 72.99, threat: "High" },
  { category: "Cleansers", ourRating: 4.4, competition: 4.5, ourPrice: 29.99, threat: "Medium" },
];
