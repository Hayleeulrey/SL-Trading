"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Stock } from "@/lib/types"
import { formatCurrency, formatPercent } from "@/lib/utils"
import StockChart from "@/components/stock-chart"
import { CheckCircle2, AlertTriangle, XCircle, DollarSign, Percent, Scale, BarChart4, Calendar } from "lucide-react"

interface TopStockCardProps {
  stock: Stock
}

export default function TopStockCard({ stock }: TopStockCardProps) {
  const recommendationIcon =
    stock.recommendation === "Buy" ? (
      <CheckCircle2 className="h-6 w-6 text-green-500" />
    ) : stock.recommendation === "Hold" ? (
      <AlertTriangle className="h-6 w-6 text-amber-500" />
    ) : (
      <XCircle className="h-6 w-6 text-red-500" />
    )

  const recommendationColor =
    stock.recommendation === "Buy"
      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
      : stock.recommendation === "Hold"
        ? "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800"
        : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{stock.symbol}</CardTitle>
            <CardDescription className="text-base">{stock.name}</CardDescription>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">{formatCurrency(stock.price)}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">Score:</span>
              <span className="font-medium">{stock.score}/100</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`flex items-center justify-between p-3 rounded-lg border ${recommendationColor}`}>
          <div className="flex items-center gap-2">
            {recommendationIcon}
            <span className="font-medium text-lg">
              {stock.recommendation === "Buy"
                ? "Strong Buy Recommendation"
                : stock.recommendation === "Hold"
                  ? "Hold Recommendation"
                  : "Not Recommended"}
            </span>
          </div>
          <Badge
            variant={
              stock.recommendation === "Buy" ? "success" : stock.recommendation === "Hold" ? "warning" : "destructive"
            }
            className="text-sm"
          >
            {stock.recommendation}
          </Badge>
        </div>

        <div className="flex justify-end">
          <div className="inline-flex items-center gap-2 p-2 rounded-lg border bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 text-sm">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium">Next Earnings:</span>
            <span>{stock.nextEarningsDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Price/Book</span>
            </div>
            <div className="font-medium">{stock.priceToBook.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <BarChart4 className="h-3.5 w-3.5" />
              <span>P/E Ratio</span>
            </div>
            <div className="font-medium">{stock.priceToEarnings.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Percent className="h-3.5 w-3.5" />
              <span>Dividend Yield</span>
            </div>
            <div className="font-medium">{formatPercent(stock.dividendYield)}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Scale className="h-3.5 w-3.5" />
              <span>Current Ratio</span>
            </div>
            <div className="font-medium">{stock.currentRatio.toFixed(2)}</div>
          </div>
        </div>

        <StockChart stock={stock} />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Debt to Equity</div>
            <div className="font-medium">{stock.debtToEquity.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Analyst Rating</div>
            <div className="font-medium">{stock.analystRating}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="font-medium">{formatCurrency(stock.marketCap, 0, true)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">52-Week Range</div>
            <div className="font-medium">
              {formatCurrency(stock.low52Week)} - {formatCurrency(stock.high52Week)}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm">
            {stock.name} ({stock.symbol}) is a {stock.industry} company that{" "}
            {stock.description.split(".")[0].toLowerCase()}. With a P/E ratio of {stock.priceToEarnings.toFixed(2)} and
            price-to-book of {stock.priceToBook.toFixed(2)}, it{" "}
            {stock.priceToBook < 1 ? "trades below its book value" : "trades at a reasonable valuation"}. The company
            offers a {formatPercent(stock.dividendYield)} dividend yield with a {formatPercent(stock.payoutRatio)}{" "}
            payout ratio, making it{" "}
            {stock.payoutRatio < 0.5 ? "sustainable for the long term" : "potentially at risk if earnings decline"}.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

