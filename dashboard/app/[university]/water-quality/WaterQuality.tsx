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
            <div
                className="wrapper"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
            >
                <div className="barContainer">
                    <div className="filler" style={{ width: `${value}%` }}>
                        <div
                            className="fillerBackground"
                            style={{ width: `${fillerRelativePercentage}%` }}
                        />
                    </div>
                </div>
                <div className="textValue">{`${value}%`}</div>
            </div>
        </Card>
    );
}
