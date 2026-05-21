/**
 * IBM Agent Studio API Service
 * Handles all API calls to IBM ICA Agent Studio for PulseIQ data
 */

// Langflow MCP Configuration
const IBM_AGENT_STUDIO_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:3000/langflow';
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '71844c1f-6513-45ef-b289-571bbab913fd';
const FLOW_ID = process.env.NEXT_PUBLIC_FLOW_ID || 'ce0bea51-8829-4115-990b-6cbd8bb51ca3';
const API_KEY = process.env.NEXT_PUBLIC_CHATBOT_API_KEY || 'sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU';

// Response type definitions
export interface ProductsAPIResponse {
  products: Array<{
    id: string;
    name: string;
    category: string;
    revenue: number;
    rating: number;
    price: number;
    growth_percentage: number;
    risk_level: string;
  }>;
  summary: {
    total_products: number;
    total_revenue: number;
    average_rating: number;
    average_price: number;
  };
}

export interface CompetitorsAPIResponse {
  competitors: Array<{
    id: string;
    name: string;
    category: string;
    average_price: number;
    average_rating: number;
    market_share: number;
    threat_level: string;
    positioning: string;
  }>;
  summary: {
    total_competitors: number;
    highest_threat_category: string;
    average_market_share: number;
  };
}

export interface SalesAPIResponse {
  monthly_sales: Array<{
    month: string;
    sales: number;
    growth: number;
  }>;
  quarterly_summary: {
    quarter: string;
    total_sales: number;
    growth_percentage: number;
  };
  forecast: {
    trend: string;
    forecast_growth: number;
  };
}

export interface AnalyticsAPIResponse {
  revenue_by_category: Array<{
    category: string;
    revenue: number;
  }>;
  sentiment_analysis: {
    positive_percentage: number;
    negative_percentage: number;
    neutral_percentage: number;
  };
  pricing_analysis: {
    overpriced_products: number;
    underpriced_products: number;
  };
}

export interface AIInsightsAPIResponse {
  insights: Array<{
    type: string;
    message: string;
  }>;
  recommendations: Array<{
    priority: string;
    action: string;
    expected_impact: string;
  }>;
}

// Prompt templates
const PROMPTS = {
  PRODUCTS: `Show me all GlowLab products with their details in a markdown table format.

Include these columns:
- Product Name
- Category
- MRP
- COGS
- Pack Size
- Price per Unit
- Key Claims
- Vegan
- Cruelty Free
- Harmful Ingredient
- Reformulated
- Launch Year

Return the data as a markdown table under the heading "### GlowLab Products"`,

  COMPETITORS: `Show me all competitor products with their details in a markdown table format.

Include these columns:
- Product Name
- Brand
- Category
- MRP
- COGS
- Pack Size
- Price per Unit
- Key Claims
- Vegan
- Cruelty Free
- Harmful Ingredient
- Launch Year

Return the data as a markdown table under the heading "### Competitor Products"`,

  SALES: `Analyze sales history and return structured sales trend data.

Include:
* monthly sales
* quarterly sales
* growth trends
* category performance
* forecast indicators

Return concise structured JSON only.`,

  ANALYTICS: `Analyze business intelligence metrics and return structured analytics data.

Include:
* revenue by category
* category distribution
* sentiment analysis
* pricing intelligence
* growth metrics

Return concise structured JSON only.`,

  AI_INSIGHTS: `Analyze all available business data and generate executive-level insights.

Include:
* growth opportunities
* business risks
* competitor threats
* strategic recommendations
* pricing insights

Return concise structured JSON only.`,
};

class IBMAgentStudioAPI {
  private baseURL: string;
  private projectId: string;
  private flowId: string;
  private apiKey: string;

  constructor() {
    this.baseURL = IBM_AGENT_STUDIO_URL;
    this.projectId = PROJECT_ID;
    this.flowId = FLOW_ID;
    this.apiKey = API_KEY;
  }

  /**
   * Generic method to call IBM Agent Studio API
   */
  private async callAPI<T>(prompt: string): Promise<T> {
    try {
      const sessionId = this.generateSessionId();
      
      const payload = {
        output_type: 'chat',
        input_type: 'chat',
        input_value: prompt,
        session_id: sessionId,
      };

      // Use Langflow run endpoint through proxy (200 OK instead of 406)
      const endpoint = `${this.baseURL}/api/v1/run/${this.flowId}`;
      console.log('[IBM API] Base URL:', this.baseURL);
      console.log('[IBM API] Full endpoint:', endpoint);
      console.log('[IBM API] Flow ID:', this.flowId);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[IBM API] Error ${response.status}:`, errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[IBM API] ========== RAW RESPONSE START ==========');
      console.log('[IBM API] Response keys:', Object.keys(data));
      console.log('[IBM API] Full response:', JSON.stringify(data, null, 2));
      console.log('[IBM API] ========== RAW RESPONSE END ==========');
      
      // Parse the response - IBM Agent Studio returns data in specific format
      // Adjust this based on actual response structure
      const parsedData = this.parseResponse<T>(data);
      console.log('[IBM API] ========== PARSED DATA START ==========');
      console.log('[IBM API] Parsed data type:', typeof parsedData);
      console.log('[IBM API] Parsed data:', JSON.stringify(parsedData, null, 2));
      console.log('[IBM API] ========== PARSED DATA END ==========');
      
      return parsedData;
    } catch (error) {
      console.error('IBM Agent Studio API call failed:', error);
      throw error;
    }
  }

  /**
   * Parse Langflow response - extracts markdown tables and converts to structured data
   */
  private parseResponse<T>(response: any): T {
    try {
      // Langflow returns data in: response.outputs[0].outputs[0].results.message.text
      if (response.outputs && response.outputs.length > 0) {
        const firstOutput = response.outputs[0];
        
        if (firstOutput.outputs && firstOutput.outputs.length > 0) {
          const nestedOutput = firstOutput.outputs[0];
          
          if (nestedOutput.results && nestedOutput.results.message) {
            const messageText = nestedOutput.results.message.text || '';
            
            // Parse markdown tables from the message
            return this.parseMarkdownTables(messageText) as T;
          }
        }
      }
      
      throw new Error('Unable to parse Langflow response structure');
    } catch (error) {
      console.error('Response parsing failed:', error);
      throw error;
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `pulseiq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Parse markdown tables from Langflow response into structured data
   * Converts markdown table format to JSON objects
   */
  private parseMarkdownTables(text: string): any {
    try {
      console.log('[parseMarkdownTables] ========== PARSE START ==========');
      console.log('[parseMarkdownTables] Text length:', text.length);
      console.log('[parseMarkdownTables] First 500 chars:', text.substring(0, 500));
      console.log('[parseMarkdownTables] Text includes "GlowLab":', text.includes('GlowLab'));
      console.log('[parseMarkdownTables] Text includes "Competitor":', text.includes('Competitor'));
      
      // Extract GlowLab Products table
      const glowLabMatch = text.match(/### GlowLab Products\s*\n\s*\|([\s\S]*?)(?=\n\n###|$)/);
      const competitorMatch = text.match(/### Competitor Products\s*\n\s*\|([\s\S]*?)(?=\n\n|$)/);
      
      console.log('[parseMarkdownTables] GlowLab match found:', !!glowLabMatch);
      console.log('[parseMarkdownTables] Competitor match found:', !!competitorMatch);
      
      const products: any[] = [];
      const competitors: any[] = [];
      
      if (glowLabMatch) {
        const tableText = glowLabMatch[1];
        const rows = tableText.split('\n').filter(row => row.trim() && !row.includes('---'));
        
        // Skip header row
        for (let i = 1; i < rows.length; i++) {
          const cells = rows[i].split('|').map(cell => cell.trim()).filter(cell => cell);
          if (cells.length >= 11) {
            products.push({
              id: `PROD${i}`,
              name: cells[0],
              category: cells[1],
              mrp: parseFloat(cells[2]) || 0,
              cogs: parseFloat(cells[3]) || 0,
              pack_size: cells[4],
              price_per_unit: parseFloat(cells[5]) || 0,
              key_claims: cells[6],
              vegan: cells[7].toLowerCase() === 'yes',
              cruelty_free: cells[8].toLowerCase() === 'yes',
              harmful_ingredient: cells[9].toLowerCase() === 'yes',
              reformulated: cells[10]?.toLowerCase() === 'yes',
              launch_year: parseInt(cells[11]) || new Date().getFullYear(),
              // Additional fields for dashboard compatibility
              revenue: parseFloat(cells[2]) * 1000, // Mock revenue
              rating: 4.5,
              price: parseFloat(cells[2]),
              risk_level: cells[9].toLowerCase() === 'yes' ? 'high' : 'low',
              growth_percentage: 15.3,
            });
          }
        }
      }
      
      if (competitorMatch) {
        const tableText = competitorMatch[1];
        const rows = tableText.split('\n').filter(row => row.trim() && !row.includes('---'));
        
        // Skip header row
        for (let i = 1; i < rows.length; i++) {
          const cells = rows[i].split('|').map(cell => cell.trim()).filter(cell => cell);
          if (cells.length >= 10) {
            competitors.push({
              id: `COMP${i}`,
              name: cells[0],
              brand: cells[1],
              category: cells[2],
              mrp: parseFloat(cells[3]) || 0,
              cogs: parseFloat(cells[4]) || 0,
              pack_size: cells[5],
              price_per_unit: parseFloat(cells[6]) || 0,
              key_claims: cells[7],
              vegan: cells[8].toLowerCase() === 'yes',
              cruelty_free: cells[9].toLowerCase() === 'yes',
              harmful_ingredient: cells[10].toLowerCase() === 'yes',
              launch_year: parseInt(cells[11]) || new Date().getFullYear(),
              // Additional fields for dashboard compatibility
              market_share: 15.5,
              growth_rate: 12.3,
              threat_level: cells[10].toLowerCase() === 'yes' ? 'high' : 'medium',
            });
          }
        }
      }
      
      const result = {
        products,
        competitors,
        summary: {
          total_products: products.length,
          total_competitors: competitors.length,
          timestamp: new Date().toISOString(),
        }
      };
      
      console.log('[parseMarkdownTables] Final result:', {
        productsCount: result.products.length,
        competitorsCount: result.competitors.length,
        sampleProduct: result.products[0]
      });
      
      return result;
    } catch (error) {
      console.error('Failed to parse markdown tables:', error);
      throw error;
    }
  }

  /**
   * Fetch products data
   */
  async getProducts(): Promise<ProductsAPIResponse> {
    return this.callAPI<ProductsAPIResponse>(PROMPTS.PRODUCTS);
  }

  /**
   * Fetch competitors data
   */
  async getCompetitors(): Promise<CompetitorsAPIResponse> {
    return this.callAPI<CompetitorsAPIResponse>(PROMPTS.COMPETITORS);
  }

  /**
   * Fetch sales data
   */
  async getSalesData(): Promise<SalesAPIResponse> {
    return this.callAPI<SalesAPIResponse>(PROMPTS.SALES);
  }

  /**
   * Fetch analytics data
   */
  async getAnalytics(): Promise<AnalyticsAPIResponse> {
    return this.callAPI<AnalyticsAPIResponse>(PROMPTS.ANALYTICS);
  }

  /**
   * Fetch AI insights
   */
  async getAIInsights(): Promise<AIInsightsAPIResponse> {
    return this.callAPI<AIInsightsAPIResponse>(PROMPTS.AI_INSIGHTS);
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/${this.flowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify({
          output_type: 'chat',
          input_type: 'chat',
          input_value: 'health check',
          session_id: this.generateSessionId(),
        }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Custom query for chatbot
   */
  async query(message: string): Promise<string> {
    try {
      const sessionId = this.generateSessionId();
      
      const payload = {
        output_type: 'chat',
        input_type: 'chat',
        input_value: message,
        session_id: sessionId,
      };

      // Use Langflow run endpoint through proxy (200 OK instead of 406)
      const endpoint = `${this.baseURL}/api/v1/run/${this.flowId}`;
      console.log('[IBM API Query] Calling endpoint:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract text response
      if (data.outputs && data.outputs.length > 0) {
        const output = data.outputs[0];
        const messageText = output.results?.message?.text || output.results?.text;
        return messageText || 'No response';
      }
      
      return 'No response';
    } catch (error) {
      console.error('Query failed:', error);
      return 'Error processing query';
    }
  }
}

// Export singleton instance
export const ibmAgentStudioAPI = new IBMAgentStudioAPI();

// Export class for custom instances
export default IBMAgentStudioAPI;

// Made with Bob
