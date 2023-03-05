import { Sensor } from "@/app/types";
import axios from "axios";
import EnergyConsumptionGraph from "../EnergyConsumptionGraph";

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
            <h1 className="text-3xl font-light">Campus: {params.campus}</h1>
            <div className="space-y-4">
                <EnergyConsumptionGraph
                    data={averageAirQuality.data}
                    timestamps={averageAirQuality.timestamps}
                    title="Average Air Quality"
                    subtitle={`Across campus: ${params.campus}`}
                />
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
