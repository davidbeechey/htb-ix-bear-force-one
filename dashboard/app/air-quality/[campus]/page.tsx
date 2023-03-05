import { Sensor } from "@/app/types";
import { Card } from "@/components";
import axios from "axios";
import Link from "next/link";
import AirQualityGraph from "../AirQualityGraph";
import SensorsGrid from "../SensorsGrid";

async function getAirQualityPerCampus(campus: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=co2_mock&campus=${campus}`
        )
        .then((res) => res.data);

    const sensors: Sensor[] = sensorsData.sensors || [];

    return sensors;
}

export default async function AirQuality({ params }: { params: { campus: string } }) {
    const sensors = await getAirQualityPerCampus(params.campus);

    console.log("sensors", sensors);

    // TODO: temp, to be replaced with Ishan's function for averaging sensors
    const averageAirQuality = sensors[0];

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                <AirQualityGraph sensor={{ ...averageAirQuality, campus: "" }} />
            </div>
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                <SensorsGrid sensors={sensors} />
            </div>
        </div>
    );
}
