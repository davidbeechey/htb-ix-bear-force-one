"use client";

import { Sensor } from "../types";
import AirQualityGraph from "./AirQualityGraph";

export default function SensorsGrid({ sensors }: { sensors: Sensor[] }) {
    return (
        <div className="grid grid-cols-3 w-full gap-4">
            {sensors.map((sensor) => (
                <AirQualityGraph
                    data={sensor.data}
                    timestamps={sensor.timestamps}
                    title={sensor.location}
                    subtitle={sensor.uniqueID}
                />
            ))}
        </div>
    );
}
