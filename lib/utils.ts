import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Stock } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, decimals = 2, abbreviate = false): string {
  if (abbreviate && value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  } else if (abbreviate && value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  } else if (abbreviate && value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Calculate a score for each stock based on how well it meets the criteria
export function calculateStockScore(stock: Stock): { score: number; matchedCriteria: string[] } {
  let score = 0
  const matchedCriteria: string[] = []

  // Price to Book < 1.0
  if (stock.priceToBook < 1.0) {
    score += 20
    matchedCriteria.push("Price to Book < 1.0")
  }

  // Dividend Yield 3-6%+
  if (stock.dividendYield >= 0.03) {
    if (stock.dividendYield <= 0.06) {
      score += 20
      matchedCriteria.push("Dividend Yield 3-6%")
    } else {
      score += 15 // Still good but might be unsustainable
      matchedCriteria.push("Dividend Yield > 6%")
    }
  }

  // Current Ratio 2-4+
  if (stock.currentRatio >= 2.0) {
    if (stock.currentRatio <= 4.0) {
      score += 20
      matchedCriteria.push("Current Ratio 2-4")
    } else {
      score += 10 // Too conservative
      matchedCriteria.push("Current Ratio > 4")
    }
  }

  // Price to Earnings < 10
  if (stock.priceToEarnings < 10) {
    score += 20
    matchedCriteria.push("P/E < 10")
  }

  // Debt to Equity < 1
  if (stock.debtToEquity < 1) {
    score += 20
    matchedCriteria.push("Debt to Equity < 1")
  }

  // Analyst Rating
  if (stock.analystRating === "Buy" || stock.analystRating === "Outperform") {
    score += 10
    matchedCriteria.push("Analyst Rating: " + stock.analystRating)
  }

  // Payout Ratio < 50% (sustainable dividend)
  if (stock.payoutRatio < 0.5) {
    score += 10
    matchedCriteria.push("Sustainable Payout Ratio")
  }

  return { score, matchedCriteria }
}

// Determine recommendation based on score and other factors
// Modified to create a more diverse set of recommendations for demo purposes
export function getRecommendation(stock: Stock, score: number): "Buy" | "Hold" | "Don't Buy" {
  // For demo purposes, use the symbol to create a deterministic but varied set of recommendations
  const symbolHash = stock.symbol.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Use the hash to adjust the score slightly to create more variety
  const adjustedScore = score - (symbolHash % 30)

  // Strong buy recommendation
  if (adjustedScore >= 80) {
    return "Buy"
  }

  // Hold recommendation (decent score but some concerns)
  if (adjustedScore >= 50) {
    return "Hold"
  }

  // Don't buy recommendation
  return "Don't Buy"
}

