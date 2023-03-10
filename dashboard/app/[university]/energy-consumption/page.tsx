import { Card } from "@/components";
import { averageFromSensors } from "@/functions/averageAirQuality";
import axios from "axios";
import Link from "next/link";
import { Sensor } from "../../types";
import EnergyConsumptionGraph from "./EnergyConsumptionGraph";
import HeatMap from "./HeatMap";

async function getEnergyConsumption(university: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=energy&${university}`
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

export default async function EnergyConsumption({ params }: { params: { university: string } }) {
    const sensors = await getEnergyConsumption(params.university);
    const campuses = await getCampuses(params.university);

    console.log("sensors", sensors);
    console.log("campuses", campuses);

    if (sensors.length === 0) return <div>No sensors found</div>;

    const currentEnergyConsumption = sensors.reduce((acc, sensor) => {
        const lastValue = sensor.data[sensor.data.length - 1];
        return acc + lastValue;
    }, 0);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3">
                <Card className="space-y-2">
                    <h1 className="text-2xl">Current Energy Consumption</h1>
                    <p className="text-6xl font-bold text-green-500">
                        {currentEnergyConsumption} W
                    </p>
                </Card>
            </div>
            <div className="space-y-4">
                <HeatMap sensors={sensors} campuses={campuses} university={params.university} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {campuses.map((campus) => {
                    // const averageSensor = averageFromSensors(
                    //     sensors.filter((sensor) => sensor.campus == campus)
                    // );
                    const averageSensor = sensors.filter((sensor) => sensor.campus == campus)[0];
                    if (!averageSensor) return null;
                    console.log("averageSensor", averageSensor);
                    return (
                        <Link href={`/${params.university}/energy-consumption/${campus}`}>
                            <EnergyConsumptionGraph
                                data={averageSensor.data}
                                title={campus}
                                subtitle="Average Energy Consumption"
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
