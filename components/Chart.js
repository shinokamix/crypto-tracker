"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)",
  },
}

export function Chart({chartData}) {
  return (
    <Card>
      <CardContent className={"p-6"}>
        <ChartContainer config={chartConfig} className={"h-[320px] w-full"}>
          <LineChart
            
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={(t) => new Date(t).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
              })}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
