import { Sensor } from "@/app/types";
import { Card } from "@/components";
import { averageFromSensors } from "@/functions/averageAirQuality";
import axios from "axios";
import Link from "next/link";
import AirQualityGraph from "../AirQualityGraph";

async function getAirQualityPerCampus(campus: string, university: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=co2&campus=${campus}&university=${university}`
        )
        .then((res) => res.data);

    const sensors: Sensor[] = sensorsData.sensors || [];

    return sensors;
}

export default async function AirQuality({
    params,
}: {
    params: { campus: string; university: string };
}) {
    const sensors = await getAirQualityPerCampus(params.campus, params.university);

    console.log("sensors", sensors);

    if (sensors.length === 0) return <div>No sensors found</div>;

    // const averageAirQuality = averageFromSensors(sensors);
    const averageAirQuality = sensors[0];

    if (!averageAirQuality) return <div>No sensors found</div>;

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-light">Campus: {params.campus}</h1>
            <div className="space-y-4">
                <AirQualityGraph
                    data={averageAirQuality.data}
                    timestamps={averageAirQuality.timestamps}
                    title="Average Air Quality"
                    subtitle={`Across campus: ${params.campus}`}
                />
            </div>
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
        </div>
    );
}
