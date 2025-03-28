import type { Stock, NewsItem } from "./types"

// Generate random price history data
function generatePriceHistory(basePrice: number, days = 365) {
  const data = []
  let price = basePrice
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Random price movement with some trend
    const change = (Math.random() - 0.48) * (basePrice * 0.03)
    price = Math.max(price + change, basePrice * 0.5)

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(price.toFixed(2)),
    })
  }

  return data
}

// Generate quarterly data
function generateQuarterlyData(baseRevenue: number, baseEps: number) {
  const quarters = ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"]
  return quarters.map((quarter, index) => {
    const growth = Math.random() * 0.2 - 0.05 // -5% to +15%
    const revenue = baseRevenue * (1 + index * 0.05 + growth * 0.5)
    const eps = baseEps * (1 + index * 0.05 + growth)

    return {
      quarter,
      revenue,
      eps,
      growth,
    }
  })
}

// Generate dividend history
function generateDividendHistory(annualDividend: number) {
  const dividends = []
  const today = new Date()

  for (let i = 0; i < 4; i++) {
    const date = new Date()
    date.setMonth(today.getMonth() - i * 3)

    dividends.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      amount: annualDividend / 4,
    })
  }

  return dividends
}

// Generate next earnings date (1-90 days in the future)
function generateNextEarningsDate() {
  const today = new Date()
  const daysToAdd = Math.floor(Math.random() * 90) + 1
  const nextDate = new Date(today)
  nextDate.setDate(today.getDate() + daysToAdd)

  return nextDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Generate news items for a stock
function generateNewsItems(symbol: string, name: string, industry: string): NewsItem[] {
  const sentiments: ("positive" | "negative" | "neutral")[] = ["positive", "negative", "neutral"]
  const newsCount = Math.floor(Math.random() * 3) + 3 // 3-5 news items
  const news: NewsItem[] = []

  const today = new Date()

  const positiveTemplates = [
    `${name} exceeds quarterly earnings expectations`,
    `${name} announces expansion into new markets`,
    `Analysts upgrade ${symbol} citing strong growth potential`,
    `${name} secures major contract with Fortune 500 company`,
    `${name} increases dividend by 10%`,
    `${industry} sector rally boosts ${symbol} shares`,
    `${name} reports record revenue growth`,
    `${name} announces share buyback program`,
  ]

  const negativeTemplates = [
    `${name} misses earnings expectations`,
    `${name} faces regulatory scrutiny over business practices`,
    `${name} announces layoffs amid restructuring`,
    `Supply chain issues impact ${name}'s quarterly outlook`,
    `${name} lowers guidance for upcoming quarter`,
    `Analyst downgrades weigh on ${symbol} stock`,
    `${name} faces increased competition in ${industry} sector`,
    `${name} delays product launch, shares fall`,
  ]

  const neutralTemplates = [
    `${name} appoints new Chief Financial Officer`,
    `${name} to present at upcoming industry conference`,
    `${name} announces board of directors changes`,
    `${name} opens new headquarters`,
    `Insider transactions reported for ${symbol}`,
    `${name} releases sustainability report`,
    `${name} maintains dividend at current levels`,
    `${name} completes previously announced acquisition`,
  ]

  for (let i = 0; i < newsCount; i++) {
    const daysAgo = Math.floor(Math.random() * 14) // 0-14 days ago
    const newsDate = new Date(today)
    newsDate.setDate(today.getDate() - daysAgo)

    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
    let title = ""

    if (sentiment === "positive") {
      title = positiveTemplates[Math.floor(Math.random() * positiveTemplates.length)]
    } else if (sentiment === "negative") {
      title = negativeTemplates[Math.floor(Math.random() * negativeTemplates.length)]
    } else {
      title = neutralTemplates[Math.floor(Math.random() * neutralTemplates.length)]
    }

    const sources = [
      "Bloomberg",
      "Reuters",
      "CNBC",
      "Wall Street Journal",
      "Financial Times",
      "MarketWatch",
      "Barron's",
      "Investor's Business Daily",
    ]

    news.push({
      id: `news-${symbol}-${i}`,
      title,
      date: newsDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      source: sources[Math.floor(Math.random() * sources.length)],
      summary: `${title}. This is a summary of the news article about ${name} (${symbol}) in the ${industry} industry.`,
      url: "#",
      sentiment,
    })
  }

  // Sort by date (newest first)
  return news.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Modify some stock data to ensure we have a mix of recommendations
export const mockStockData: Stock[] = [
  {
    symbol: "ALCO",
    name: "Alico, Inc.",
    price: 28.75,
    priceToBook: 0.82,
    priceToEarnings: 6.63,
    dividendYield: 0.056,
    currentRatio: 2.47,
    debtToEquity: 0.39,
    analystRating: "Buy",
    marketCap: 218_500_000,
    volume: 12_500,
    low52Week: 22.58,
    high52Week: 32.15,
    eps: 4.33,
    sector: "Consumer Staples",
    industry: "Farm Products",
    description:
      "Alico, Inc., together with its subsidiaries, operates as an agribusiness and land management company in the United States. The company operates in two segments, Alico Citrus, and Land Management and Other Operations.",
    returnOnEquity: 0.12,
    profitMargin: 0.18,
    annualDividend: 1.6,
    payoutRatio: 0.24,
    dividendGrowth5Year: 0.0372,
    dividendYears: 5,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(25_000_000, 1.08),
    dividendHistory: generateDividendHistory(1.6),
    priceHistory: generatePriceHistory(28.75),
    news: generateNewsItems("ALCO", "Alico", "Farm Products"),
  },
  {
    symbol: "CAAP",
    name: "Corporación América Airports S.A.",
    price: 14.2,
    priceToBook: 0.7,
    priceToEarnings: 4.12,
    dividendYield: 0.042,
    currentRatio: 3.1,
    debtToEquity: 0.56,
    analystRating: "Outperform",
    marketCap: 2_300_000_000,
    volume: 456_000,
    low52Week: 10.42,
    high52Week: 16.85,
    eps: 3.45,
    sector: "Industrials",
    industry: "Airports & Air Services",
    description:
      "Corporación América Airports S.A., through its subsidiaries, engages in the acquisition, development, and operation of airport concessions. It operates 52 airports in Latin America, Europe, and Eurasia.",
    returnOnEquity: 0.16,
    profitMargin: 0.22,
    annualDividend: 0.6,
    payoutRatio: 0.18,
    dividendGrowth5Year: 0.0425,
    dividendYears: 3,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(350_000_000, 0.86),
    dividendHistory: generateDividendHistory(0.6),
    priceHistory: generatePriceHistory(14.2),
    news: generateNewsItems("CAAP", "Corporación América Airports", "Airports & Air Services"),
  },
  {
    symbol: "GNK",
    name: "Genco Shipping & Trading Limited",
    price: 19.85,
    priceToBook: 1.25, // Modified to be > 1.0 to reduce score
    priceToEarnings: 8.25,
    dividendYield: 0.051,
    currentRatio: 3.85,
    debtToEquity: 0.28,
    analystRating: "Hold", // Changed from Buy to Hold
    marketCap: 845_000_000,
    volume: 725_000,
    low52Week: 14.62,
    high52Week: 21.35,
    eps: 2.41,
    sector: "Industrials",
    industry: "Marine Shipping",
    description:
      "Genco Shipping & Trading Limited, together with its subsidiaries, engages in the ocean transportation of dry bulk cargoes worldwide. The company owns and operates dry bulk carrier vessels to transports iron ore, coal, grains, steel products, and other dry-bulk cargoes.",
    returnOnEquity: 0.085,
    profitMargin: 0.31,
    annualDividend: 1.0,
    payoutRatio: 0.42,
    dividendGrowth5Year: 0.0625,
    dividendYears: 4,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(95_000_000, 0.6),
    dividendHistory: generateDividendHistory(1.0),
    priceHistory: generatePriceHistory(19.85),
    news: generateNewsItems("GNK", "Genco Shipping & Trading", "Marine Shipping"),
  },
  {
    symbol: "TX",
    name: "Ternium S.A.",
    price: 42.75,
    priceToBook: 0.58,
    priceToEarnings: 9.12,
    dividendYield: 0.048,
    currentRatio: 2.95,
    debtToEquity: 0.22,
    analystRating: "Outperform",
    marketCap: 8_400_000_000,
    volume: 185_000,
    low52Week: 35.28,
    high52Week: 45.95,
    eps: 4.69,
    sector: "Materials",
    industry: "Steel",
    description:
      "Ternium S.A. manufactures, processes, and sells various steel products in Mexico, Argentina, Brazil, Colombia, the United States, Central America, and internationally. It provides flat steel products, such as slabs, hot and cold-rolled coils and sheets, hot-dipped galvanized and electrogalvanized sheets, and tinplates.",
    returnOnEquity: 0.11,
    profitMargin: 0.14,
    annualDividend: 2.05,
    payoutRatio: 0.44,
    dividendGrowth5Year: 0.0525,
    dividendYears: 10,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(3_800_000_000, 1.17),
    dividendHistory: generateDividendHistory(2.05),
    priceHistory: generatePriceHistory(42.75),
    news: generateNewsItems("TX", "Ternium", "Steel"),
  },
  {
    symbol: "SBLK",
    name: "Star Bulk Carriers Corp.",
    price: 22.45,
    priceToBook: 0.78,
    priceToEarnings: 7.85,
    dividendYield: 0.064,
    currentRatio: 2.65,
    debtToEquity: 0.56,
    analystRating: "Buy",
    marketCap: 1_850_000_000,
    volume: 950_000,
    low52Week: 16.85,
    high52Week: 25.75,
    eps: 2.86,
    sector: "Industrials",
    industry: "Marine Shipping",
    description:
      "Star Bulk Carriers Corp., a shipping company, engages in the ocean transportation of dry bulk cargoes worldwide. The company's vessels transport a range of bulk commodities, including iron ores, minerals and grains, bauxite, fertilizers, and steel products.",
    returnOnEquity: 0.14,
    profitMargin: 0.28,
    annualDividend: 1.44,
    payoutRatio: 0.64,
    dividendGrowth5Year: 0.0725,
    dividendYears: 5,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(275_000_000, 0.72),
    dividendHistory: generateDividendHistory(1.44),
    priceHistory: generatePriceHistory(22.45),
    news: generateNewsItems("SBLK", "Star Bulk Carriers", "Marine Shipping"),
  },
  {
    symbol: "ESGC",
    name: "Eros STX Global Corporation",
    price: 3.25,
    priceToBook: 1.45, // Modified to be > 1.0 to reduce score
    priceToEarnings: 15.25, // Modified to be > 10 to reduce score
    dividendYield: 0.018, // Modified to be < 3% to reduce score
    currentRatio: 1.15, // Modified to be < 2.0 to reduce score
    debtToEquity: 1.85, // Modified to be > 1.0 to reduce score
    analystRating: "Underperform", // Changed to negative rating
    marketCap: 625_000_000,
    volume: 1_250_000,
    low52Week: 2.15,
    high52Week: 4.95,
    eps: 0.62,
    sector: "Communication Services",
    industry: "Entertainment",
    description:
      "Eros STX Global Corporation produces, markets, and distributes content to audiences around the world across traditional and digital media platforms. The company produces and distributes films, television shows, and digital original content.",
    returnOnEquity: 0.08,
    profitMargin: 0.12,
    annualDividend: 0.12,
    payoutRatio: 0.22,
    dividendGrowth5Year: 0.0125,
    dividendYears: 2,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(85_000_000, 0.15),
    dividendHistory: generateDividendHistory(0.12),
    priceHistory: generatePriceHistory(3.25),
    news: generateNewsItems("ESGC", "Eros STX Global", "Entertainment"),
  },
  {
    symbol: "ESCA",
    name: "Escalade, Incorporated",
    price: 14.85,
    priceToBook: 0.92,
    priceToEarnings: 9.75,
    dividendYield: 0.045,
    currentRatio: 3.25,
    debtToEquity: 0.32,
    analystRating: "Hold",
    marketCap: 205_000_000,
    volume: 18_500,
    low52Week: 12.55,
    high52Week: 17.95,
    eps: 1.52,
    sector: "Consumer Discretionary",
    industry: "Leisure Products",
    description:
      "Escalade, Incorporated, together with its subsidiaries, manufactures, distributes, imports, and sells sporting goods in North America, Europe, and internationally. The company provides various sporting goods brands in basketball goals, archery, indoor and outdoor game recreation.",
    returnOnEquity: 0.095,
    profitMargin: 0.11,
    annualDividend: 0.6,
    payoutRatio: 0.39,
    dividendGrowth5Year: 0.0325,
    dividendYears: 8,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(65_000_000, 0.38),
    dividendHistory: generateDividendHistory(0.6),
    priceHistory: generatePriceHistory(14.85),
    news: generateNewsItems("ESCA", "Escalade", "Leisure Products"),
  },
  {
    symbol: "STNG",
    name: "Scorpio Tankers Inc.",
    price: 58.25,
    priceToBook: 0.88,
    priceToEarnings: 5.15,
    dividendYield: 0.052,
    currentRatio: 2.85,
    debtToEquity: 0.65,
    analystRating: "Outperform",
    marketCap: 3_250_000_000,
    volume: 850_000,
    low52Week: 45.85,
    high52Week: 64.25,
    eps: 11.31,
    sector: "Energy",
    industry: "Oil & Gas Midstream",
    description:
      "Scorpio Tankers Inc., together with its subsidiaries, engages in the seaborne transportation of refined petroleum products in the shipping markets worldwide. As of March 31, 2021, its fleet consisted of 131 owned, finance leased, or bareboat chartered-in tankers.",
    returnOnEquity: 0.22,
    profitMargin: 0.36,
    annualDividend: 3.0,
    payoutRatio: 0.28,
    dividendGrowth5Year: 0.0825,
    dividendYears: 7,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(325_000_000, 2.83),
    dividendHistory: generateDividendHistory(3.0),
    priceHistory: generatePriceHistory(58.25),
    news: generateNewsItems("STNG", "Scorpio Tankers", "Oil & Gas Midstream"),
  },
  {
    symbol: "GRIN",
    name: "Grindrod Shipping Holdings Ltd.",
    price: 12.35,
    priceToBook: 1.12, // Modified to be > 1.0 to reduce score
    priceToEarnings: 11.85, // Modified to be > 10 to reduce score
    dividendYield: 0.028, // Modified to be < 3% to reduce score
    currentRatio: 1.55, // Modified to be < 2.0 to reduce score
    debtToEquity: 1.48, // Modified to be > 1.0 to reduce score
    analystRating: "Sell", // Changed to negative rating
    marketCap: 235_000_000,
    volume: 125_000,
    low52Week: 9.85,
    high52Week: 15.75,
    eps: 2.55,
    sector: "Industrials",
    industry: "Marine Shipping",
    description:
      "Grindrod Shipping Holdings Ltd., an international shipping company, owns, charters-in, and operates a fleet of dry bulk carriers and tankers worldwide. It operates a fleet of 23 owned dry bulk carriers and 8 long-term chartered-in dry bulk carriers.",
    returnOnEquity: 0.18,
    profitMargin: 0.24,
    annualDividend: 0.72,
    payoutRatio: 0.32,
    dividendGrowth5Year: 0.0425,
    dividendYears: 3,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(105_000_000, 0.64),
    dividendHistory: generateDividendHistory(0.72),
    priceHistory: generatePriceHistory(12.35),
    news: generateNewsItems("GRIN", "Grindrod Shipping", "Marine Shipping"),
  },
  {
    symbol: "CMRE",
    name: "Costamare Inc.",
    price: 10.85,
    priceToBook: 0.62,
    priceToEarnings: 3.95,
    dividendYield: 0.055,
    currentRatio: 2.75,
    debtToEquity: 0.72,
    analystRating: "Outperform",
    marketCap: 1_350_000_000,
    volume: 650_000,
    low52Week: 8.55,
    high52Week: 12.95,
    eps: 2.75,
    sector: "Industrials",
    industry: "Marine Shipping",
    description:
      "Costamare Inc. owns and charters containerships to liner companies worldwide. As of June 14, 2021, it had a fleet of 81 containerships with a total capacity of approximately 581,000 twenty foot equivalent units.",
    returnOnEquity: 0.21,
    profitMargin: 0.32,
    annualDividend: 0.6,
    payoutRatio: 0.22,
    dividendGrowth5Year: 0.0525,
    dividendYears: 12,
    nextEarningsDate: generateNextEarningsDate(),
    quarterlyData: generateQuarterlyData(285_000_000, 0.69),
    dividendHistory: generateDividendHistory(0.6),
    priceHistory: generatePriceHistory(10.85),
    news: generateNewsItems("CMRE", "Costamare", "Marine Shipping"),
  },
]

