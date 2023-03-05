"use client";

import { Card } from "@/components";
import { getGradient, LineGraph } from "@/components/LineGraph";
import { ChartDataset, ChartData } from "chart.js";
import { Sensor } from "../types";

interface AirQualityGraphProps {
    sensor: Sensor;
    hover?: boolean;
}

export default function AirQualityGraph({ sensor, hover = false }: AirQualityGraphProps) {
    const data: ChartData<"line", number[], string> = {
        labels: sensor.timestamps.map((timestamp) => new Date(timestamp).toLocaleTimeString()),
        datasets: [
            {
                data: sensor.data,
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
                <h1 className="text-xl font-bold">{sensor.campus}</h1>
                <p>{sensor.location}</p>
            </div>
            <LineGraph data={data} />
        </Card>
    );
}
