import { Sensor } from "../../types";
import axios from "axios";
import WaterQuality from "./WaterQuality";
import Link from "next/link";
import { averageFromSensors } from "@/functions/averageAirQuality";

async function getAirQuality(university: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=water&university=${university}`
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

    // const average = averageFromSensors(sensors);
    const average = sensors[0];

    if (!average) return <div>No sensors found</div>;

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <WaterQuality
                    value={average.data[sensors[0].data.length - 1]}
                    title="Average Water Quality"
                    subtitle="Across all sensors"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {campuses.map((campus) => {
                    // TODO: temp, to be replaced with Ishan's function for averaging sensors
                    const averageSensor = sensors.find((sensor) => sensor.campus === campus);
                    if (!averageSensor) return null;
                    return (
                        <Link href={`/${params.university}/water-quality/${campus}`}>
                            <WaterQuality
                                value={averageSensor.data[sensors[0].data.length - 1]}
                                title={campus}
                                subtitle="Average Water Quality"
                                hover
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
