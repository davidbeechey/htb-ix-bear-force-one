import { Card } from "@/components";
import axios from "axios";
import Link from "next/link";
import { Sensor } from "../../types";
import EnergyConsumptionGraph from "./EnergyConsumptionGraph";
import HeatMap from "./HeatMap";

async function getEnergyConsumption() {
    const sensorsData = await axios
        .get("https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=energy")
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

export default async function EnergyConsumption() {
    const sensors = await getEnergyConsumption();
    const campuses = await getCampuses();

    console.log("sensors", sensors);
    console.log("campuses", campuses);

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
                <HeatMap sensors={sensors} campuses={campuses} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {campuses.map((campus) => {
                    // TODO: temp, to be replaced with Ishan's function for averaging sensors
                    const averageSensor = sensors.find((sensor) => sensor.campus === campus);
                    if (!averageSensor) return null;
                    return (
                        <Link href={`/energy-consumption/${campus}`}>
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
