"use client";

import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
    ChartArea,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        line: {
            tension: 0,
            borderWidth: 2,
            borderColor: "rgba(47,97,68,1",
            fill: "start",
            backgroundColor: "rgba(47,97,68,0.3)",
        },
        point: {
            radius: 3,
            hitRadius: 10,
        },
    },
    scales: {
        xAxis: {
            display: false,
        },
        yAxis: {
            display: false,
        },
    },
};

interface LineGraphType {
    data: ChartData<"line", number[], string>;
}

export const LineGraph = ({ data }: LineGraphType) => {
    return (
        <div className="w-full h-full">
            <Line data={data} width={100} height={40} options={options} />
        </div>
    );
};

