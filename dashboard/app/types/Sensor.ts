import { ChartData } from "chart.js";

export type Sensor = {
    location: string | null;
    data: ChartData<"line", number[], string>;
};
