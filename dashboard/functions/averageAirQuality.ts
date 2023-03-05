import { Sensor } from "@/app/types";

/**
 * Averages an array of sensor objects into one sensor object.
 * @param data An array of sensor objects.
 * @returns A sensor object with averaged data.
 */
// export const averageFromSensors = (sensors: Sensor[]): Sensor | void => {
//     let data_avg: number[] = getAverageDataFromSensors(sensors);
//     let average: Sensor = {
//         location: null, // location does not make sense for an average 
//         data: {
//             ...airQualitySensors[0].data,
//             datasets: [{
//                 data: data_avg,
//             }]
//         }
//     }
//     return average;
// };

// // Function to average the data from an array of sensors
// const getAverageDataFromSensors = (sensors: Sensor[]): number[] => {
//     let data_len: number = sensors.length;
//     let data_avg: number[] = new Array(data_len);
//     for (let i = 0; i < data_len; i++) {
//         for (let j = 0; j < Sensors.length; j++) {
//             data_avg[i] += Sensors[j].data.datasets[0].data[i];
//         }
//         data_avg[i] /= Sensors.length;
//     }
//     return data_avg;
// };
