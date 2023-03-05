import { Sensor } from "@/app/types";
import { Card } from "@/components";
import axios from "axios";
import Link from "next/link";
import AirQualityGraph from "../WaterQuality";

async function getWaterQualityPerCampus(campus: string, university: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=water&campus=${campus}&university=${university}`
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
    const sensors = await getWaterQualityPerCampus(params.campus, params.university);

    console.log("sensors", sensors);

    if (sensors.length === 0) return <div>No sensors found</div>;

    // TODO: temp, to be replaced with Ishan's function for averaging sensors
    const averageWaterQuality = sensors[0];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-light">Campus: {params.campus}</h1>
            <div className="space-y-4">
                <AirQualityGraph
                    value={averageWaterQuality.data[averageWaterQuality.data.length - 1]}
                    title="Average Water Quality"
                    subtitle={`Across campus: ${params.campus}`}
                />
            </div>
            <div className="grid grid-cols-3 w-full gap-4">
                {sensors.map((sensor) => (
                    <AirQualityGraph
                        value={sensor.data[sensor.data.length - 1]}
                        title={sensor.location}
                        subtitle={sensor.uniqueID}
                    />
                ))}
            </div>
        </div>
    );
}
