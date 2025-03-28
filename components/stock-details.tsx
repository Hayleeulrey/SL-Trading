"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Stock } from "@/lib/types"
import { formatCurrency, formatPercent } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface StockDetailsProps {
  stock: Stock
}

export default function StockDetails({ stock }: StockDetailsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "financials" | "dividends">("overview")

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Stock Details</CardTitle>
        <CardDescription>Comprehensive information about {stock.symbol}</CardDescription>

        {/* Custom styled tabs that look different from the main tabs */}
        <div className="flex space-x-1 mt-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-none border-b-2 ${
              activeTab === "overview"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-none border-b-2 ${
              activeTab === "financials"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
            onClick={() => setActiveTab("financials")}
          >
            Financials
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-none border-b-2 ${
              activeTab === "dividends"
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            }`}
            onClick={() => setActiveTab("dividends")}
          >
            Dividends
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <p className="text-sm">{stock.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Key Statistics</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Market Cap</TableCell>
                      <TableCell className="py-1 text-right">{formatCurrency(stock.marketCap, 0, true)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">P/E Ratio</TableCell>
                      <TableCell className="py-1 text-right">{stock.priceToEarnings.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">P/B Ratio</TableCell>
                      <TableCell className="py-1 text-right">{stock.priceToBook.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">EPS (TTM)</TableCell>
                      <TableCell className="py-1 text-right">{formatCurrency(stock.eps)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="text-sm font-medium">Trading Information</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-1 pl-0">52-Week Range</TableCell>
                      <TableCell className="py-1 text-right">
                        {formatCurrency(stock.low52Week)} - {formatCurrency(stock.high52Week)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Avg. Volume</TableCell>
                      <TableCell className="py-1 text-right">{(stock.volume / 1000000).toFixed(1)}M</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Dividend Yield</TableCell>
                      <TableCell className="py-1 text-right">{formatPercent(stock.dividendYield)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Analyst Rating</TableCell>
                      <TableCell className="py-1 text-right">{stock.analystRating}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "financials" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Balance Sheet Highlights</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Industry Avg</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Current Ratio</TableCell>
                    <TableCell className="text-right">{stock.currentRatio.toFixed(2)}</TableCell>
                    <TableCell className="text-right">1.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Debt to Equity</TableCell>
                    <TableCell className="text-right">{stock.debtToEquity.toFixed(2)}</TableCell>
                    <TableCell className="text-right">1.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Return on Equity</TableCell>
                    <TableCell className="text-right">{formatPercent(stock.returnOnEquity)}</TableCell>
                    <TableCell className="text-right">12.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Profit Margin</TableCell>
                    <TableCell className="text-right">{formatPercent(stock.profitMargin)}</TableCell>
                    <TableCell className="text-right">8.2%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Revenue & Earnings (Last 4 Quarters)</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quarter</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">EPS</TableHead>
                    <TableHead className="text-right">YoY Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stock.quarterlyData.map((quarter, index) => (
                    <TableRow key={index}>
                      <TableCell>{quarter.quarter}</TableCell>
                      <TableCell className="text-right">{formatCurrency(quarter.revenue, 0, true)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(quarter.eps)}</TableCell>
                      <TableCell className="text-right">{formatPercent(quarter.growth)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === "dividends" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Dividend Summary</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Current Yield</TableCell>
                      <TableCell className="py-1 text-right">{formatPercent(stock.dividendYield)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Annual Dividend</TableCell>
                      <TableCell className="py-1 text-right">{formatCurrency(stock.annualDividend)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">Payout Ratio</TableCell>
                      <TableCell className="py-1 text-right">{formatPercent(stock.payoutRatio)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-1 pl-0">5-Year Growth</TableCell>
                      <TableCell className="py-1 text-right">{formatPercent(stock.dividendGrowth5Year)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Payment Schedule</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ex-Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stock.dividendHistory.map((dividend, index) => (
                      <TableRow key={index}>
                        <TableCell>{dividend.date}</TableCell>
                        <TableCell className="text-right">{formatCurrency(dividend.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Dividend Analysis</h4>
              <p className="text-sm">
                {stock.name} has maintained a consistent dividend payment history for {stock.dividendYears} years. The
                current payout ratio of {formatPercent(stock.payoutRatio)} indicates that the dividend is{" "}
                {stock.payoutRatio < 0.5 ? "well-covered by earnings" : "potentially at risk if earnings decline"}.
                Based on the company's financial health and historical patterns, the dividend appears{" "}
                {stock.payoutRatio < 0.6 && stock.currentRatio > 2 ? "sustainable" : "potentially at risk"}.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

