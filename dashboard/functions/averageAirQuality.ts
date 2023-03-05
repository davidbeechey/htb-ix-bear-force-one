import { Sensor } from "@/app/types";

/**
 * Averages an array of air quality sensor objects into one sensor object.
 * @param data An array of air quality sensor objects.
 */
export const averageAirQuality = (airQualitySensors: Sensor[]): Sensor | void => {
    // let data_avg: number[] = getAverageDataFromSensors(airQualitySensors);
    // let average: Sensor = {
    //     location: null, // location does not make sense for an average 
    //     data: {
    //         ...airQualitySensors[0].data,
    //         datasets: [{
    //             data: data_avg,
    //         }]
    //     }
    // }
    // return average;
};

// Function to average the data from an array of sensors
// const getAverageDataFromSensors = (Sensors: Sensor[]): number[] => {
//     let data_len: number = Sensors[0].data.datasets[0].data.length;
//     let data_avg: number[] = new Array(data_len);
//     for (let i = 0; i < data_len; i++) {
//         for (let j = 0; j < Sensors.length; j++) {
//             data_avg[i] += Sensors[j].data.datasets[0].data[i];
//         }
//         data_avg[i] /= Sensors.length;
//     }
//     return data_avg;
// };
