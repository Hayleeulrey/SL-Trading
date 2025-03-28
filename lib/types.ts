export interface NewsItem {
  id: string
  title: string
  date: string
  source: string
  summary: string
  url: string
  sentiment: "positive" | "negative" | "neutral"
}

export interface Stock {
  symbol: string
  name: string
  price: number
  priceToBook: number
  priceToEarnings: number
  dividendYield: number
  currentRatio: number
  debtToEquity: number
  analystRating: string
  marketCap: number
  volume: number
  low52Week: number
  high52Week: number
  eps: number
  sector: string
  industry: string
  description: string
  returnOnEquity: number
  profitMargin: number
  annualDividend: number
  payoutRatio: number
  dividendGrowth5Year: number
  dividendYears: number
  nextEarningsDate: string
  quarterlyData: {
    quarter: string
    revenue: number
    eps: number
    growth: number
  }[]
  dividendHistory: {
    date: string
    amount: number
  }[]
  priceHistory: {
    date: string
    price: number
  }[]
  news: NewsItem[]
  score?: number
  matchedCriteria?: string[]
  recommendation?: "Buy" | "Hold" | "Don't Buy"
}

