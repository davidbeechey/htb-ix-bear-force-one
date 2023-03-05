"use client";

import { Card } from "@/components";
import { getGradient, LineGraph } from "@/components/LineGraph";
import { ChartDataset, ChartData } from "chart.js";

interface EnergyConsumptionGraphProps {
    title: string;
    subtitle: string;
    data: number[];
    timestamps: Date[];
    hover?: boolean;
}

export default function EnergyConsumptionGraph({
    title,
    subtitle,
    data,
    timestamps,
    hover = false,
}: EnergyConsumptionGraphProps) {
    const graphData: ChartData<"line", number[], string> = {
        labels: timestamps.map((timestamp) => new Date(timestamp).toLocaleTimeString()),
        datasets: [
            {
                data: data,
                label: "CO2?",
                borderColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart load
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                fill: false,
                borderWidth: 2,
            } as ChartDataset<"line", number[]>,
        ],
    };

    return (
        <Card className="space-y-6" hover={hover}>
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p>{subtitle}</p>
            </div>
            <LineGraph data={graphData} />
        </Card>
    );
}
