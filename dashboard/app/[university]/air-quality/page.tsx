import { Card } from "@/components";
import { ChartData } from "chart.js";
import { Sensor } from "../../types";
import axios from "axios";
import AirQualityGraph from "./AirQualityGraph";
import Link from "next/link";
import { averageFromSensors } from "@/functions/averageAirQuality";

async function getAirQuality(university: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=co2&university=${university}`
        )
        .then((res) => res.data);

    const sensors: Sensor[] = sensorsData.sensors || [];

    return sensors;
}

async function getCampuses(university: string) {
    const data = await axios
        .get(
            `https://nbmgmb9465.execute-api.eu-west-1.amazonaws.com/DEV/university?university=${university}`
        )
        .then((res) => res.data);

    const campuses: string[] = data.university.Items[0].campuses || [];

    return campuses;
}

export default async function AirQuality({ params }: { params: { university: string } }) {
    const sensors = await getAirQuality(params.university);
    const campuses = await getCampuses(params.university);

    console.log("sensors", sensors);
    console.log("campuses", campuses);

    if (sensors.length === 0) return <div>No sensors found</div>;

    // TODO: temp, to be replaced with Ishan's function for averaging sensors
    // const averageAirQuality = averageFromSensors(sensors);
    const averageAirQuality = sensors[0];

    if (!averageAirQuality) return <div>No sensors found</div>;

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <AirQualityGraph
                    data={averageAirQuality.data}
                    title="Average Air Quality"
                    subtitle="Across all sensors"
                    timestamps={averageAirQuality.timestamps}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {campuses.map((campus) => {
                    // const averageSensor = averageFromSensors(
                    //     sensors.filter((sensor) => sensor.campus === campus)
                    // );
                    const averageSensor = sensors.filter((sensor) => sensor.campus == campus)[0];
                    if (!averageSensor) return null;
                    return (
                        <Link href={`/${params.university}/air-quality/${campus}`}>
                            <AirQualityGraph
                                data={averageSensor.data}
                                title={campus}
                                subtitle="Average Air Quality"
                                timestamps={averageSensor.timestamps}
                                hover
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
