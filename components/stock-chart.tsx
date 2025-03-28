"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import type { Stock } from "@/lib/types"

interface StockChartProps {
  stock: Stock
}

export default function StockChart({ stock }: StockChartProps) {
  const [timeframe, setTimeframe] = useState<"1M" | "3M" | "6M" | "1Y" | "5Y">("1Y")

  // In a real app, we would fetch different data based on the timeframe
  // For this demo, we'll just use the same data but slice it differently
  const getChartData = () => {
    const sliceAmount =
      timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : timeframe === "6M" ? 180 : timeframe === "1Y" ? 365 : 1825 // 5Y

    return stock.priceHistory.slice(-Math.min(sliceAmount, stock.priceHistory.length))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Price History</div>
        <div className="flex items-center space-x-1">
          {(["1M", "3M", "6M", "1Y", "5Y"] as const).map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "ghost"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getChartData()}>
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
              }}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              width={40}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
              labelFormatter={(label) => {
                const date = new Date(label)
                return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })
              }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

