"use client"

import * as React from "react"
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  views: {
    label: "Consumption(m^3)",
  },
  kWh: {
    label: "m^3",
    color: "var(--chart-1)",
  },

}

export function ChartLineInteractive({chartDataPrep = []}) {
  const [activeChart, setActiveChart] =
    React.useState("kWh")

  console.log("dataPrep charts", chartDataPrep)

  const chartData = chartDataPrep.map((entry) => ({
    date: entry.date,
    kWh: entry.kWh
  })) || []

  // const total = React.useMemo(
  //   () => ({
  //     kWh: chartData.reduce((acc, curr) => acc + curr.kWh, 0)
  //   }),
  //   []
  // )
  //
  // function calculateTotalKWh(data) {
  //   let total = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     total += data[i].kWh;
  //   }
  //   return total;
  // }

  const total = ()=>{
    let summ = 0
    for (let i = 0; i < chartData.length; i++) {
      summ += chartData[i].kWh;
    }
    return summ
  }

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total Consumption for the last {chartData.length/30} months
          </CardDescription>
        </div>
        <div className="flex">
          {["kWh"].map((chart) => (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                {/*{total[chart].toLocaleString()}*/}
                {total()}
                </span>
              </button>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
