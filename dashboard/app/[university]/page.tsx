import { Card } from "@/components";
import { scoreSensor } from "@/functions/scoring";
import axios from "axios";
import { Sensor } from "../types";
import ConfettiTime from "./ConfettiTime";

async function getAirQualitySensors() {
    const data = await axios
        .get(`https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors?type=co2`)
        .then((res) => res.data);

    const sensors: Sensor[] = data.sensors;

    return sensors;
}

async function getGoals(university: string) {
    const data = await axios
        .get(
            `https://wvhaz86wh2.execute-api.eu-west-1.amazonaws.com/DEV/goals?university=${university}`
        )
        .then((res) => res.data);

    console.log(data.university.items);
    return data.university.Items;
}

export default async function Page({ params }: { params: { university: string } }) {
    const GOALS = await getGoals(params.university);

    let AIR_QUALITY_SCORE: string | null = null;
    if (GOALS.length > 0) {
        // Air Quality Goal
        const AIR_QUALITY_SENSORS = await getAirQualitySensors();
        const AIR_QUALITY_GOAL = GOALS[0]["co2_concentration"];
        AIR_QUALITY_SCORE = AIR_QUALITY_SENSORS.reduce((acc: number, sensor: Sensor) => {
            const AVG_AIR_QUALITY =
                sensor.data.reduce((acc: number, value: number) => acc + value, 0) /
                sensor.data.length;
            return acc + scoreSensor(AVG_AIR_QUALITY, 4500);
        }, 0).toFixed(0);
    }

    return (
        <div className="space-y-8">
            <h1 className="text-6xl font-bold">
                Overview - {decodeURIComponent(params.university)}
            </h1>
            <div className="flex gap-8">
                {AIR_QUALITY_SCORE ? (
                    <>
                        <Card className="max-w-max">
                            <ConfettiTime show={parseInt(AIR_QUALITY_SCORE) >= 70} />
                            <h2 className="text-2xl font-bold">Sustainability Score</h2>
                            <p className="text-6xl text-green-600 font-black">
                                {AIR_QUALITY_SCORE}
                            </p>
                        </Card>
                        <Card className="">
                            <h2 className="text-2xl font-bold">Goals</h2>
                            <div>
                                {GOALS.map((goal: any) => {
                                    return (
                                        <div className="flex gap-4">
                                            <p>Air Quality Score: {AIR_QUALITY_SCORE}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </>
                ) : (
                    <Card>
                        <p>No Goals Set</p>
                    </Card>
                )}
            </div>
        </div>
    );
}
