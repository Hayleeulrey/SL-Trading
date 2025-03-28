"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { NewsItem } from "@/lib/types"
import { Calendar, ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StockNewsProps {
  news: NewsItem[]
}

export default function StockNews({ news }: StockNewsProps) {
  if (!news || news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent News</CardTitle>
          <CardDescription>No recent news available</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent News</CardTitle>
        <CardDescription>Latest news and market sentiment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border-b pb-4 last:border-0 last:pb-0 border-border">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium text-base">{item.title}</h3>
              <Badge
                variant={
                  item.sentiment === "positive"
                    ? "success"
                    : item.sentiment === "negative"
                      ? "destructive"
                      : "secondary"
                }
                className="whitespace-nowrap"
              >
                {item.sentiment === "positive" && <TrendingUp className="w-3 h-3 mr-1" />}
                {item.sentiment === "negative" && <TrendingDown className="w-3 h-3 mr-1" />}
                {item.sentiment === "neutral" && <Minus className="w-3 h-3 mr-1" />}
                {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{item.date}</span>
              <span className="mx-2">•</span>
              <span>{item.source}</span>
            </div>

            <p className="text-sm">{item.summary}</p>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center mt-2 hover:underline"
            >
              Read full article <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

