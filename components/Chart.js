"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import format from "@/app/misc/format"


const chartConfig = {
  value: {
    label: "Price",
    color: "var(--chart-1)",
  },
}

export function Chart({chartData}) {
  return (
        <ChartContainer config={chartConfig} className={"xl:h-[320px] lg:h-[240px] md:h-[200px] w-full"}>
          <LineChart
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              type="number"
              interval="preserveStartEnd"
              domain={["auto", "auto"]}
              tickFormatter={(t) =>
                new Date(Number(t)).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                })
              }
            />

            <YAxis 
              orientation="right"
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  nameKey="value"
                  labelKey="time"
                  hideLabel={false}
                  hideIndicator={true}
                  formatter={(value, _name, item) => {
                    const ts = item?.payload?.time
                    const label = ts
                      ? new Date(Number(ts)).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "2-digit" })
                      : ""
                    return [
                      <div className="flex flex-col items-baseline justify-between gap-3" key="row">
                        <span className="text-muted-foreground text-xs">{label}</span>
                        <span className="font-medium tabular-nums">{format(Number(value))}</span>
                      </div>,
                      "" // label (вторая позиция) нам не нужен
                    ]
                  }}
                />
              }
            />
            <Line
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
            />
          </LineChart>
        </ChartContainer>
  )
}
