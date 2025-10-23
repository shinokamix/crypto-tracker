import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/shared/ui/chart";

import { formatPrice } from "@/entities/coin";

const chartConfig = {
    value: {
        label: "Price",
        color: "var(--chart-1)",
    },
};

export default function CoinChart({ chartData, className }) {
    return (
        <ChartContainer
            config={chartConfig}
            className={className}
        >
            <LineChart data={chartData}>
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
                    domain={["auto", "auto"]}
                    hide={true}
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
                                const ts = item?.payload?.time;
                                const label = ts
                                    ? new Date(Number(ts)).toLocaleDateString(
                                          "en-US",
                                          {
                                              day: "2-digit",
                                              month: "2-digit",
                                              year: "2-digit",
                                          }
                                      )
                                    : "";
                                return [
                                    <div
                                        className="flex flex-col items-baseline justify-between gap-3"
                                        key="row"
                                    >
                                        <span className="text-muted-foreground text-xs">
                                            {label}
                                        </span>
                                        <span className="font-medium tabular-nums">
                                            {formatPrice(Number(value))}
                                        </span>
                                    </div>,
                                    "",
                                ];
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
    );
}
