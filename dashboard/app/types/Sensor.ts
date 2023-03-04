import { ChartData } from "chart.js";

export type Sensor = {
    location: string;
    data: ChartData<"line", number[], string>;
};
