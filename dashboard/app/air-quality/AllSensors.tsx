"use client";

import { Sensor } from "../types";
import SensorGraph from "./SensorGraph";

export default function AllSensors({ sensors }: { sensors: Sensor[] }) {
    return (
        <div className="grid grid-cols-3 w-full gap-4">
            {sensors.map((sensor) => (
                <SensorGraph sensor={sensor} />
            ))}
        </div>
    );
}
