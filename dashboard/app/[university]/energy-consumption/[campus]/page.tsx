import { Sensor } from "@/app/types";
import { Card } from "@/components";
import axios from "axios";
import EnergyConsumptionGraph from "../EnergyConsumptionGraph";
import HeatMap from "../HeatMap";

async function getEnergyConsumptionPerCampus(campus: string, university: string) {
    const sensorsData = await axios
        .get(
            `https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=energy&campus=${campus}&university=${university}`
        )
        .then((res) => res.data);

    const sensors: Sensor[] = sensorsData.sensors || [];

    return sensors;
}

export default async function EnergyConsumption({
    params,
}: {
    params: { campus: string; university: string };
}) {
    const sensors = await getEnergyConsumptionPerCampus(params.campus, params.university);

    if (sensors.length === 0) return <div>No sensors found</div>;

    console.log("sensors", sensors);

    const currentEnergyConsumption = sensors.reduce((acc, sensor) => {
        const lastValue = sensor.data[sensor.data.length - 1];
        return acc + lastValue;
    }, 0);

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-light">Campus: {params.campus}</h1>
            <div className="space-y-4">
                <div className="grid grid-cols-3">
                    <Card className="space-y-2">
                        <h1 className="text-2xl">Current Energy Consumption</h1>
                        <p className="text-6xl font-bold text-green-500">
                            {currentEnergyConsumption} W
                        </p>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-3 w-full gap-4">
                {sensors.map((sensor) => (
                    <EnergyConsumptionGraph
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
