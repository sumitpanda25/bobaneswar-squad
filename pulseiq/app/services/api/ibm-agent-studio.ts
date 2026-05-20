/**
 * IBM Agent Studio API Service
 * Handles all API calls to IBM ICA Agent Studio for PulseIQ data
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_IBM_AGENT_STUDIO_URL || 'https://agentstudio.servicesessentials.ibm.com/api/v1/run';
const FLOW_ID = process.env.NEXT_PUBLIC_FLOW_ID || 'ce0bea51-8829-4115-990b-6cbd8bb51ca3';
const API_KEY = process.env.NEXT_PUBLIC_PULSEIQ_API_KEY || '';

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
  PRODUCTS: `Analyze the product dataset and return structured product intelligence data.

Include:
* product name
* category
* revenue
* average rating
* price
* monthly growth percentage
* risk level

Return concise structured JSON only.`,

  COMPETITORS: `Analyze competitor data and return structured competitor intelligence.

Include:
* competitor name
* category
* pricing
* average rating
* market share
* threat level
* positioning

Return concise structured JSON only.`,

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
  private flowId: string;
  private apiKey: string;

  constructor() {
    this.baseURL = API_BASE_URL;
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

      // Use Langflow proxy endpoint
      const response = await fetch(`${this.baseURL}/api/v1/run/${this.flowId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Parse the response - IBM Agent Studio returns data in specific format
      // Adjust this based on actual response structure
      const parsedData = this.parseResponse<T>(data);
      
      return parsedData;
    } catch (error) {
      console.error('IBM Agent Studio API call failed:', error);
      throw error;
    }
  }

  /**
   * Parse IBM Agent Studio response
   */
  private parseResponse<T>(response: any): T {
    try {
      // IBM Agent Studio may return data in different formats
      // Try to extract JSON from the response
      
      if (response.outputs && response.outputs.length > 0) {
        const output = response.outputs[0];
        
        // Check if output contains results
        if (output.results) {
          const message = output.results.message?.text || output.results.text || '';
          
          // Try to parse JSON from message
          const jsonMatch = message.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      }
      
      // If direct JSON response
      if (typeof response === 'object' && response !== null) {
        return response as T;
      }
      
      throw new Error('Unable to parse response');
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

      // Use Langflow proxy endpoint
      const response = await fetch(`${this.baseURL}/api/v1/run/${this.flowId}`, {
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
