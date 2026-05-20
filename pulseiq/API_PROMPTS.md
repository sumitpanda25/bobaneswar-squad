# PulseIQ API Prompt Templates & Response Schemas

## Platform

PulseIQ Enterprise Product Intelligence Platform

## Purpose

This document defines:

* Prompt templates
* Expected JSON structures
* Visualization-ready response formats
* Dashboard integration contracts
* AI insights response formats

These prompts will be used by IBM BOB / ICA Agent Studio APIs.

---

## 1. PRODUCTS DATA API

---

**Purpose:**
Fetch product overview information for dashboard rendering.

### Prompt Template:

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

### Expected JSON Response:

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

**Frontend Usage:**
* KPI cards
* Product tables
* Product overview dashboard
* Revenue charts

---

## 2. COMPETITORS DATA API

---

**Purpose:**
Fetch competitor intelligence and market comparison data.

### Prompt Template:

```
Analyze competitor data and return structured competitor intelligence.

Include:
* competitor name
* category
* pricing
* average rating
* market share
* threat level
* positioning

Return concise structured JSON only.
```

### Expected JSON Response:

```json
{
  "competitors": [
    {
      "id": "C001",
      "name": "GlowSkin",
      "category": "Serum",
      "average_price": 549,
      "average_rating": 4.3,
      "market_share": 18.5,
      "threat_level": "High",
      "positioning": "Premium"
    }
  ],
  "summary": {
    "total_competitors": 18,
    "highest_threat_category": "Serum",
    "average_market_share": 12.4
  }
}
```

**Frontend Usage:**
* Competitor dashboard
* Pricing comparison charts
* Market positioning matrix
* Threat heatmaps

---

## 3. SALES DATA API

---

**Purpose:**
Fetch sales trends and forecasting data.

### Prompt Template:

```
Analyze sales history and return structured sales trend data.

Include:
* monthly sales
* quarterly sales
* growth trends
* category performance
* forecast indicators

Return concise structured JSON only.
```

### Expected JSON Response:

```json
{
  "monthly_sales": [
    {
      "month": "January",
      "sales": 240000,
      "growth": 5.2
    },
    {
      "month": "February",
      "sales": 260000,
      "growth": 8.1
    }
  ],
  "quarterly_summary": {
    "quarter": "Q1",
    "total_sales": 780000,
    "growth_percentage": 11.5
  },
  "forecast": {
    "trend": "Upward",
    "forecast_growth": 14.2
  }
}
```

**Frontend Usage:**
* Line charts
* Area charts
* Trend dashboards
* Forecast widgets

---

## 4. ANALYTICS DATA API

---

**Purpose:**
Fetch aggregated business analytics for visual dashboards.

### Prompt Template:

```
Analyze business intelligence metrics and return structured analytics data.

Include:
* revenue by category
* category distribution
* sentiment analysis
* pricing intelligence
* growth metrics

Return concise structured JSON only.
```

### Expected JSON Response:

```json
{
  "revenue_by_category": [
    {
      "category": "Serum",
      "revenue": 320000
    },
    {
      "category": "Moisturizer",
      "revenue": 220000
    }
  ],
  "sentiment_analysis": {
    "positive_percentage": 74,
    "negative_percentage": 18,
    "neutral_percentage": 8
  },
  "pricing_analysis": {
    "overpriced_products": 4,
    "underpriced_products": 2
  }
}
```

**Frontend Usage:**
* Pie charts
* Bar charts
* Sentiment dashboards
* Pricing intelligence cards

---

## 5. AI INSIGHTS API

---

**Purpose:**
Generate executive insights and business recommendations.

### Prompt Template:

```
Analyze all available business data and generate executive-level insights.

Include:
* growth opportunities
* business risks
* competitor threats
* strategic recommendations
* pricing insights

Return concise structured JSON only.
```

### Expected JSON Response:

```json
{
  "insights": [
    {
      "type": "Growth Opportunity",
      "message": "Serum category shows strongest quarterly growth."
    },
    {
      "type": "Business Risk",
      "message": "Sunscreen products are losing market share."
    }
  ],
  "recommendations": [
    {
      "priority": "High",
      "action": "Reduce pricing gap in sunscreen category.",
      "expected_impact": "Improve competitiveness by 12%"
    }
  ]
}
```

**Frontend Usage:**
* AI insights panel
* Executive dashboard
* Recommendation widgets
* Strategic intelligence cards

---

## 6. CHATBOT RESPONSE API

---

**Purpose:**
Support conversational AI responses with structured business data.

### Prompt Template:

```
Answer the business question using the provided business intelligence datasets.

Requirements:
* keep responses concise
* use markdown tables when relevant
* provide business insights
* provide recommendations when useful
* suggest follow-up questions

Return markdown-compatible response.
```

### Expected Response Format:

```markdown
# Product Performance Summary

| Product           | Revenue | Rating | Risk |
| ----------------- | ------- | ------ | ---- |
| Hydra Boost Serum | ₹125K   | 4.6    | Low  |

## Insights

* Serum products show strongest growth.
* Premium products maintain highest ratings.

## Recommendations

* Increase marketing for premium serum category.

## Suggested Questions

* Show competitor comparison
* Analyze pricing risks
* Visualize sales trends
```

**Frontend Usage:**
* AI chatbot
* Markdown rendering
* Business table rendering
* Interactive conversational analytics

---

## 7. VISUALIZATION API

---

**Purpose:**
Generate visualization-ready metadata.

### Prompt Template:

```
Analyze the business request and return chart-ready visualization metadata.

Include:
* chart type
* chart title
* x-axis
* y-axis
* chart data

Return concise structured JSON only.
```

### Expected JSON Response:

```json
{
  "chart_type": "bar",
  "title": "Revenue by Category",
  "x_axis": "Category",
  "y_axis": "Revenue",
  "data": [
    {
      "category": "Serum",
      "revenue": 320000
    },
    {
      "category": "Moisturizer",
      "revenue": 220000
    }
  ]
}
```

**Frontend Usage:**
* Dynamic chart rendering
* Recharts integration
* Interactive dashboards

---

## SPECIAL FORMATTING REQUIREMENTS

1. Always return valid JSON for APIs.
2. Avoid explanations outside JSON.
3. Use concise field names.
4. Keep numbers numeric (not strings).
5. Use markdown formatting only for chatbot responses.
6. Support chart-ready arrays for visualizations.
7. Ensure frontend compatibility with React and Recharts.

---

## API KEY

Use environment variable:
```
PULSEIQ_API_KEY
```

Do NOT hardcode API keys in frontend code.

Store securely in:
```
.env.local
```

Example:
```env
PULSEIQ_API_KEY=your_api_key_here
```

---

## FINAL ARCHITECTURE

**Frontend:**
* React
* Next.js
* Recharts
* Tailwind CSS

**Backend:**
* IBM ICA Agent Studio
* PulseIQ APIs
* IBM BOB orchestration

The APIs must support:
* executive dashboards
* AI chatbot
* visual analytics
* drill-down intelligence
* competitor analysis
* real-time business insights