"use client";

import { Card } from "@/components";

interface WaterQualityProps {
    title: string;
    subtitle: string;
    value: number;
    hover?: boolean;
}

export default function WaterQuality({ title, subtitle, value, hover = false }: WaterQualityProps) {
    const fillerRelativePercentage = (100 / value) * 100;

    return (
        <Card className="space-y-6" hover={hover}>
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                <p>{subtitle}</p>
            </div>
            <div className="relative w-full h-4 bg-blue-500 rounded-full">
                <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                    style={{ width: `${fillerRelativePercentage}%` }}
                ></div>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-500">0</p>
                <p className="text-gray-500">{value}</p>
            </div>
        </Card>
    );
}
