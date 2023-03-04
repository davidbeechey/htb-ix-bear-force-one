import { Card } from "@/components";
import { ChartData } from "chart.js";
import { Sensor } from "../types";
import AllSensors from "./AllSensors";
import SensorGraph from "./SensorGraph";

async function getAirQualitySensors() {
    const tempData: ChartData<"line", number[], string> = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 40, 3, 5, 2, 3],
            },
        ],
    };

    const temp: Sensor[] = [
        {
            location: "Test Location 1",
            data: tempData,
        },
        {
            location: "Test Location 2",
            data: tempData,
        },
        {
            location: "Test Location 3",
            data: tempData,
        },
        {
            location: "Test Location 4",
            data: tempData,
        },
        {
            location: "Test Location 5",
            data: tempData,
        },
        {
            location: "Test Location 6",
            data: tempData,
        },
    ];

    return temp;
}

export default async function AirQuality() {
    const sensors = await getAirQualitySensors();

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                {/* TODO: temp sensor */}
                <SensorGraph sensor={sensors[0]} />
            </div>
            <div className="space-y-4">
                <Card>
                    <h1 className="text-3xl">All Sensors</h1>
                </Card>
                <AllSensors sensors={sensors} />
            </div>
        </div>
    );
}
