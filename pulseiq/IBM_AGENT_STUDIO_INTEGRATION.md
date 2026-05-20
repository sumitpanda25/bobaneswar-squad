# IBM Agent Studio API Integration Guide

## Overview

PulseIQ is now integrated with **IBM Agent Studio API** for real-time enterprise intelligence data. This document explains the integration architecture, configuration, and usage.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   PulseIQ Dashboard                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  React Components (KPI Cards, Charts, Tables)      │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│  ┌────────────────▼───────────────────────────────────┐    │
│  │  Zustand Store (dashboardStore.ts)                 │    │
│  │  - State Management                                 │    │
│  │  - Data Fetching Logic                             │    │
│  │  - Error Handling & Fallback                       │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│  ┌────────────────▼───────────────────────────────────┐    │
│  │  IBM Agent Studio Service (ibm-agent-studio.ts)    │    │
│  │  - API Wrapper                                      │    │
│  │  - Prompt Templates                                 │    │
│  │  - Response Parsing                                 │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│  ┌────────────────▼───────────────────────────────────┐    │
│  │  Data Transformers (data-transformers.ts)          │    │
│  │  - API Response → Dashboard Format                 │    │
│  │  - Type Conversions                                 │    │
│  │  - Data Enrichment                                  │    │
│  └────────────────┬───────────────────────────────────┘    │
└───────────────────┼───────────────────────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │   IBM Agent Studio API                │
    │   https://agentstudio.                │
    │   servicesessentials.ibm.com          │
    │                                       │
    │   Flow ID: ce0bea51-8829-4115-       │
    │            990b-6cbd8bb51ca3          │
    └───────────────────────────────────────┘
```

---

## Configuration

### 1. Environment Variables

Update `.env.local` with your IBM Agent Studio credentials:

```env
# IBM Agent Studio API Configuration
NEXT_PUBLIC_IBM_AGENT_STUDIO_URL=https://agentstudio.servicesessentials.ibm.com/api/v1/run
NEXT_PUBLIC_FLOW_ID=ce0bea51-8829-4115-990b-6cbd8bb51ca3
NEXT_PUBLIC_PULSEIQ_API_KEY=YOUR_ACTUAL_API_KEY_HERE

# Feature Flags
NEXT_PUBLIC_ENABLE_REAL_API=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

### 2. API Key Setup

**IMPORTANT**: Replace `YOUR_ACTUAL_API_KEY_HERE` with your real IBM Agent Studio API key.

**Security Best Practices**:
- Never commit `.env.local` to version control
- Use environment-specific keys (dev, staging, prod)
- Rotate keys regularly
- Monitor API usage

---

## API Integration Details

### Supported Data Types

The integration fetches the following data types from IBM Agent Studio:

1. **Products Data** (`/getProducts`)
   - Product name, category, revenue, rating, price
   - Growth percentage, risk level
   - Used for: KPI cards, product tables, revenue charts

2. **Competitors Data** (`/getCompetitors`)
   - Competitor name, pricing, ratings
   - Market share, threat level, positioning
   - Used for: Competitor dashboard, pricing analysis

3. **Sales Data** (`/getSalesData`)
   - Monthly/quarterly sales trends
   - Growth metrics, forecasts
   - Used for: Line charts, trend analysis

4. **Analytics Data** (`/getAnalytics`)
   - Revenue by category
   - Sentiment analysis
   - Pricing intelligence
   - Used for: Pie charts, bar charts, insights

5. **AI Insights** (`/getAIInsights`)
   - Growth opportunities
   - Business risks
   - Strategic recommendations
   - Used for: AI insights panel, recommendations

---

## Data Flow

### 1. Initial Load

```typescript
// On dashboard mount
dashboardStore.refreshData()
  ↓
ibmAgentStudioAPI.getProducts()
ibmAgentStudioAPI.getCompetitors()
  ↓
transformProductsData(apiResponse)
transformCompetitorsData(apiResponse)
  ↓
Update Zustand store
  ↓
React components re-render
```

### 2. Manual Refresh

User clicks refresh button in APIStatusWidget:
```typescript
refreshData() → Fetch from API → Transform → Update UI
```

### 3. Error Handling

```typescript
try {
  // Fetch from IBM Agent Studio API
  const data = await ibmAgentStudioAPI.getProducts()
  // Transform and use data
} catch (error) {
  // Fallback to mock data if ENABLE_MOCK_DATA=true
  console.error('API failed, using mock data')
  return mockData
}
```

---

## Feature Flags

### `NEXT_PUBLIC_ENABLE_REAL_API`

- **`true`**: Fetch data from IBM Agent Studio API
- **`false`**: Use mock data only (development mode)

### `NEXT_PUBLIC_ENABLE_MOCK_DATA`

- **`true`**: Fallback to mock data on API errors
- **`false`**: Show error message on API failures

### Recommended Configurations

**Development**:
```env
NEXT_PUBLIC_ENABLE_REAL_API=false
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

**Staging**:
```env
NEXT_PUBLIC_ENABLE_REAL_API=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

**Production**:
```env
NEXT_PUBLIC_ENABLE_REAL_API=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=false
```

---

## API Status Monitoring

The dashboard includes real-time API status monitoring:

### Status Indicators

- **🟢 Green (Connected)**: API responding successfully
- **🔴 Red (Disconnected)**: API unavailable or error
- **🟡 Yellow (Loading)**: API request in progress

### Monitoring Components

1. **APIStatusWidget** (Header)
   - Shows status for Products, Competitors, AI APIs
   - Displays last sync time
   - Refresh button to manually fetch data

2. **LoadingOverlay** (Full screen)
   - Appears during data refresh
   - Prevents user interaction during loading

3. **KPICardSkeleton** (Dashboard)
   - Animated loading placeholders
   - Shown while data is being fetched

---

## Prompt Templates

All API prompts are documented in [`API_PROMPTS.md`](./API_PROMPTS.md).

### Example: Products Data Prompt

```
Analyze the product dataset and return structured product intelligence data.

Include:
* product name
* category
* revenue
* average rating
* price
* monthly growth percentage
* risk level

Return concise structured JSON only.
```

### Expected Response Format

```json
{
  "products": [
    {
      "id": "P001",
      "name": "Hydra Boost Serum",
      "category": "Serum",
      "revenue": 125000,
      "rating": 4.6,
      "price": 599,
      "growth_percentage": 12.5,
      "risk_level": "Low"
    }
  ],
  "summary": {
    "total_products": 42,
    "total_revenue": 1200000,
    "average_rating": 4.4,
    "average_price": 699
  }
}
```

---

## Testing

### 1. Test with Mock Data

```bash
# Set in .env.local
NEXT_PUBLIC_ENABLE_REAL_API=false
NEXT_PUBLIC_ENABLE_MOCK_DATA=true

# Run application
npm run dev
```

### 2. Test with Real API

```bash
# Set in .env.local
NEXT_PUBLIC_ENABLE_REAL_API=true
NEXT_PUBLIC_PULSEIQ_API_KEY=your_actual_key

# Run application
npm run dev

# Check browser console for API logs
```

### 3. Test Error Handling

```bash
# Use invalid API key
NEXT_PUBLIC_PULSEIQ_API_KEY=invalid_key

# Dashboard should fallback to mock data
```

---

## Troubleshooting

### Issue: API Status shows "Disconnected"

**Solutions**:
1. Verify API key in `.env.local`
2. Check IBM Agent Studio service status
3. Review browser console for error messages
4. Ensure `NEXT_PUBLIC_ENABLE_REAL_API=true`

### Issue: Data not updating

**Solutions**:
1. Click refresh button in APIStatusWidget
2. Check network tab for API requests
3. Verify Flow ID is correct
4. Clear browser cache and reload

### Issue: CORS errors

**Solutions**:
1. IBM Agent Studio should have CORS enabled
2. Contact IBM support if CORS issues persist
3. Use server-side API calls if needed

---

## Performance Optimization

### Caching Strategy

- Data cached in Zustand store
- Refresh only on user action or time interval
- Minimize API calls to reduce costs

### Parallel Requests

```typescript
// Fetch multiple data types in parallel
const [products, competitors] = await Promise.all([
  ibmAgentStudioAPI.getProducts(),
  ibmAgentStudioAPI.getCompetitors(),
])
```

### Error Recovery

- Automatic fallback to mock data
- Retry logic for transient failures
- User-friendly error messages

---

## Security Considerations

1. **API Key Protection**
   - Store in environment variables only
   - Never expose in client-side code
   - Use server-side API routes for sensitive operations

2. **Rate Limiting**
   - Implement request throttling
   - Cache responses when possible
   - Monitor API usage

3. **Data Validation**
   - Validate all API responses
   - Sanitize user inputs
   - Handle malformed data gracefully

---

## Future Enhancements

1. **Real-time Updates**
   - WebSocket integration for live data
   - Push notifications for critical insights

2. **Advanced Caching**
   - Redis/IndexedDB for persistent cache
   - Stale-while-revalidate strategy

3. **Analytics**
   - Track API performance metrics
   - Monitor error rates
   - Usage analytics dashboard

---

## Support

For issues or questions:
- Review [`API_PROMPTS.md`](./API_PROMPTS.md) for prompt templates
- Check browser console for detailed error logs
- Contact IBM Agent Studio support for API issues

---

**Last Updated**: 2026-05-20  
**Version**: 1.0.0  
**Integration Status**: ✅ Complete