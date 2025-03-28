"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Stock } from "@/lib/types"
import { CheckCircle2, XCircle } from "lucide-react"

interface StockCriteriaMatchProps {
  stock: Stock
}

export default function StockCriteriaMatch({ stock }: StockCriteriaMatchProps) {
  // Define all criteria we're checking for
  const allCriteria = [
    {
      name: "Price to Book < 1.0",
      description:
        "Paying less than the tangible book value means you're getting the company at a discount to what it would be worth if all assets were liquidated.",
      met: stock.priceToBook < 1.0,
      value: stock.priceToBook.toFixed(2),
      target: "< 1.0",
    },
    {
      name: "Dividend Yield 3-6%",
      description: "Consistent dividend payments provide income while waiting for stock appreciation.",
      met: stock.dividendYield >= 0.03 && stock.dividendYield <= 0.06,
      value: (stock.dividendYield * 100).toFixed(2) + "%",
      target: "3-6%",
    },
    {
      name: "Current Ratio 2-4",
      description:
        "A current ratio of 2+ indicates a conservatively run company with twice as much in current assets as current liabilities.",
      met: stock.currentRatio >= 2.0 && stock.currentRatio <= 4.0,
      value: stock.currentRatio.toFixed(2),
      target: "2-4",
    },
    {
      name: "Price to Earnings < 10",
      description: "Paying less than 10 times earnings provides a margin of safety and potential for higher returns.",
      met: stock.priceToEarnings < 10,
      value: stock.priceToEarnings.toFixed(2),
      target: "< 10",
    },
    {
      name: "Debt to Equity < 1",
      description:
        "Lower debt relative to equity indicates financial strength and reduces risk during economic downturns.",
      met: stock.debtToEquity < 1,
      value: stock.debtToEquity.toFixed(2),
      target: "< 1",
    },
    {
      name: "Analyst Rating: Buy/Outperform",
      description: "Outperform or Buy ratings from analysts provide additional validation of the investment thesis.",
      met: stock.analystRating === "Buy" || stock.analystRating === "Outperform",
      value: stock.analystRating,
      target: "Buy/Outperform",
    },
    {
      name: "Payout Ratio < 50%",
      description: "A lower payout ratio indicates the dividend is well-covered by earnings and sustainable.",
      met: stock.payoutRatio < 0.5,
      value: (stock.payoutRatio * 100).toFixed(2) + "%",
      target: "< 50%",
    },
  ]

  // Count how many criteria are met
  const metCount = allCriteria.filter((c) => c.met).length
  const percentMet = (metCount / allCriteria.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criteria Match Analysis</CardTitle>
        <CardDescription>How well {stock.symbol} matches your value investing criteria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Criteria Met: {metCount}/{allCriteria.length}
            </span>
            <span className="font-medium">{percentMet.toFixed(0)}%</span>
          </div>
          <Progress value={percentMet} className="h-2" />
        </div>

        <div className="space-y-4">
          {allCriteria.map((criteria, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-start border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {criteria.met ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                  <span className="font-medium">{criteria.name}</span>
                </div>
                <p className="text-sm text-muted-foreground pl-7">{criteria.description}</p>
              </div>
              <div className="text-right md:text-center">
                <div className="text-sm text-muted-foreground">Current</div>
                <div
                  className={`font-medium ${criteria.met ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {criteria.value}
                </div>
              </div>
              <div className="text-right md:text-center">
                <div className="text-sm text-muted-foreground">Target</div>
                <div className="font-medium">{criteria.target}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

