import Link from "next/link";
import { Sensor } from "../types";

export default function HeatMap({ sensors, campuses }: { sensors: Sensor[]; campuses: string[] }) {
    return (
        <div className="flex gap-2">
            {campuses.map((campus, index) => {
                // TODO: temp, to be replaced with Ishan's function for averaging sensors
                const averageSensor = sensors.find((sensor) => sensor.campus === campus);
                if (!averageSensor) return null;
                const average = averageSensor.data.reduce((acc, p) => acc + p) / 2;
                return (
                    <Link key={index} href={`/energy-consumption/${campus}`}>
                        <div className="bg-red-800 rounded-lg w-48 h-48 flex items-center justify-center">
                            <div>
                                <p className="text-center font-bold">{campus}</p>
                                <p>{average} W</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
