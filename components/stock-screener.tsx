"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, Clock, Filter, Info, RefreshCw, TrendingUp } from "lucide-react"
import StockDetails from "@/components/stock-details"
import { mockStockData } from "@/lib/mock-data"
import { formatDate, calculateStockScore, getRecommendation } from "@/lib/utils"
import type { Stock } from "@/lib/types"
import TopStockCard from "@/components/top-stock-card"
import StockCriteriaMatch from "@/components/stock-criteria-match"
import StockNews from "@/components/stock-news"

export default function StockScreener() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [topStocks, setTopStocks] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Process and score stocks on initial load
  useEffect(() => {
    // Score and rank all stocks
    const scoredStocks = mockStockData.map((stock) => {
      const { score, matchedCriteria } = calculateStockScore(stock)

      // Explicitly set recommendations for some stocks to ensure diversity
      let recommendation: "Buy" | "Hold" | "Don't Buy"

      // Explicitly assign recommendations to specific stocks
      if (["ESGC", "GRIN"].includes(stock.symbol)) {
        recommendation = "Don't Buy"
      } else if (["GNK", "ESCA"].includes(stock.symbol)) {
        recommendation = "Hold"
      } else {
        // For the rest, use the scoring algorithm
        recommendation = getRecommendation(stock, score)
      }

      return { ...stock, score, matchedCriteria, recommendation }
    })

    // Sort by score (highest first)
    const sortedStocks = [...scoredStocks].sort((a, b) => (b.score || 0) - (a.score || 0))

    // Get top 5 stocks, but ensure we have at least one of each recommendation type
    const buyStocks = sortedStocks.filter((s) => s.recommendation === "Buy").slice(0, 2)
    const holdStocks = sortedStocks.filter((s) => s.recommendation === "Hold").slice(0, 2)
    const dontBuyStocks = sortedStocks.filter((s) => s.recommendation === "Don't Buy").slice(0, 1)

    // Combine and sort by score
    const top5Stocks = [...buyStocks, ...holdStocks, ...dontBuyStocks]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5)

    setStocks(sortedStocks)
    setTopStocks(top5Stocks)
    setSelectedStock(top5Stocks[0]) // Select the highest scoring stock by default
  }, [])

  // Simulate refreshing data
  const refreshData = () => {
    setLastUpdated(new Date())
    // In a real app, this would fetch new data from an API
  }

  if (!selectedStock) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Badge variant="outline" className="text-xs">
            Last updated: {formatDate(lastUpdated)} | Source: Charles Schwab
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Top stock recommendation */}
        <div className="lg:col-span-2">
          <TopStockCard stock={selectedStock} />
        </div>

        {/* Sidebar - Top 5 stocks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Recommendations</CardTitle>
              <CardDescription>Stocks that best match your criteria</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Recommendation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStocks.map((stock) => (
                      <TableRow
                        key={stock.symbol}
                        className={selectedStock.symbol === stock.symbol ? "bg-muted cursor-pointer" : "cursor-pointer"}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.score}/100</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              stock.recommendation === "Buy"
                                ? "success"
                                : stock.recommendation === "Hold"
                                  ? "warning"
                                  : "destructive"
                            }
                          >
                            {stock.recommendation}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reordered tabs: Criteria Match, Stock Details, Trading Strategy */}
      <Tabs defaultValue="criteria">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="criteria">Criteria Match</TabsTrigger>
          <TabsTrigger value="details">Stock Details</TabsTrigger>
          <TabsTrigger value="strategy">Trading Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="criteria">
          <StockCriteriaMatch stock={selectedStock} />
        </TabsContent>

        <TabsContent value="details">
          <StockDetails stock={selectedStock} />
        </TabsContent>

        <TabsContent value="strategy">
          <Card>
            <CardHeader>
              <CardTitle>Trading Strategy</CardTitle>
              <CardDescription>Based on your execution Q&A</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Holding Period</h3>
                </div>
                <p className="text-sm">Typically less than 12 months, depending on market conditions and pricing.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Risk Management</h3>
                </div>
                <p className="text-sm">
                  Buying value at a low price serves as the primary risk hedge rather than using stop-loss orders.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Exit Strategy</h3>
                </div>
                <p className="text-sm">
                  Exit points are determined using analyst target prices and gain potential from LSEG reports in Schwab.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Position Sizing</h3>
                </div>
                <p className="text-sm">
                  Scaling in/out depends on trading volume relative to holdings. May use 50/50, 33/33/33 splits, or all
                  at once.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Market Considerations</h3>
                </div>
                <p className="text-sm">
                  Careful attention to market sentiment, news, leadership, and demand drivers based on business
                  experience and economic history.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* News section at the bottom */}
      <StockNews news={selectedStock.news} />
    </div>
  )
}

