import { Suspense } from "react"
import StockScreener from "@/components/stock-screener"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Value Stock Screener</h1>
            <p className="text-muted-foreground">
              Finding strong, cheap stocks with dividends based on proven value investing criteria
            </p>
          </div>
          <ThemeToggle />
        </div>

        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <StockScreener />
        </Suspense>
      </div>
    </main>
  )
}

