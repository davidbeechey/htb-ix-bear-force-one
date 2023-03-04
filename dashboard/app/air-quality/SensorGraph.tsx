"use client";

import { Card } from "@/components";
import { getGradient, LineGraph } from "@/components/LineGraph";
import { ChartDataset } from "chart.js";
import { Sensor } from "../types";

interface SensorGraphProps {
    sensor: Sensor;
}

export default function SensorGraph({ sensor }: SensorGraphProps) {
    const data = {
        ...sensor.data,
        datasets: sensor.data.datasets.map((dataset) => {
            return {
                ...dataset,
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
            } as ChartDataset<"line", number[]>;
        }),
    };

    return (
        <Card className="space-y-6">
            <div>
                <h1 className="text-xl font-bold">{sensor.location}</h1>
            </div>
            <LineGraph data={data} />
        </Card>
    );
}
