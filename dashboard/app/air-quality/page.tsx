import { Card } from "@/components";
import axios from "axios";
import Link from "next/link";
import { Sensor } from "../types";
import AirQualityGraph from "./AirQualityGraph";

const BASE_URL = "https://nbmgmb9465.execute-api.eu-west-1.amazonaws.com/DEV";

async function getAirQuality() {
    const sensorsData = await axios
        .get("https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=co2_mock")
        .then((res) => res.data);

    const sensors: Sensor[] = sensorsData.sensors || [];

    return sensors;
}

async function getCampuses() {
    const data = await axios
        .get(
            "https://nbmgmb9465.execute-api.eu-west-1.amazonaws.com/DEV/university?university=University%20of%20Edinburgh"
        )
        .then((res) => res.data);

    const campuses: string[] = data.university.Items[0].campuses || [];

    return campuses;
}

export default async function AirQuality() {
    const sensors = await getAirQuality();
    const campuses = await getCampuses();

    console.log("sensors", sensors);
    console.log("campuses", campuses);

    // TODO: temp, to be replaced with Ishan's function for averaging sensors
    const averageAirQuality = sensors[0];

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                <AirQualityGraph sensor={averageAirQuality} />
            </div>
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                    {campuses.map((campus) => {
                        // TODO: temp, to be replaced with Ishan's function for averaging sensors
                        const averageSensor = sensors.find((sensor) => sensor.campus === campus);
                        if (!averageSensor) return null;
                        return (
                            <Link href={`/air-quality/${campus}`}>
                                <AirQualityGraph sensor={averageSensor} hover />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
