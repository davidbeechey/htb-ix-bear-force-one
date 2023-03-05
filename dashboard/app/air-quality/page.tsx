import { Card } from "@/components";
import axios from "axios";
import { Sensor } from "../types";
import CampusAirQualitySensors from "./CampusAirQualitySensors";
import SensorGraph from "./AirQualityGraph";

const BASE_URL = "https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors";

async function getAirQuality() {
    const data = await axios.get(BASE_URL + "?type=co2_mock").then((res) => res.data);

    const sensors: Sensor[] = data.sensors || [];

    return sensors;
}

export default async function AirQuality() {
    const sensors = await getAirQuality();

    const averageAirQuality = sensors[0];

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                {/* TODO: temp sensor - replace with average */}
                <SensorGraph sensor={averageAirQuality} />
            </div>
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                <CampusAirQualitySensors sensors={sensors} />
            </div>
        </div>
    );
}
