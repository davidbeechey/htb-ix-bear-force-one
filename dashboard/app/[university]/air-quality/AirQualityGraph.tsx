"use client";

import { Card } from "@/components";
import { LineGraph } from "@/components/LineGraph";
import { ChartDataset, ChartData, ChartArea } from "chart.js";

interface AirQualityGraphProps {
    title: string;
    subtitle: string;
    data: number[];
    timestamps: Date[];
    hover?: boolean;
}

export default function AirQualityGraph({
    title,
    subtitle,
    data,
    timestamps,
    hover = false,
}: AirQualityGraphProps) {
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

function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "rgba(6, 122, 8)");
    gradient.addColorStop(0.5, "rgba(255, 132, 0)");
    gradient.addColorStop(1, "rgba(255,0,0)");

    return gradient;
}
