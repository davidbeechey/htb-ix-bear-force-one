import { Sensor } from "@/app/types";

/**
 * Averages an array of sensor objects into one sensor object.
 * @param data An array of sensor objects.
 * @returns A sensor object with averaged data.
 */
export const averageFromSensors = (sensors: Sensor[]): Sensor | void => {
    if (sensors.length === 0) return undefined;
    let data_avg: number[] = getAverageDataFromSensors(sensors);
    console.log(data_avg);
    let averageSensor: Sensor = {
        campus: sensors[0].campus,
        location: sensors[0].location,
        uniqueID: sensors[0].uniqueID,
        timestamps: sensors[0].timestamps,
        data: data_avg,
    };
    return averageSensor;
};

// Function to average the data from an array of sensors
const getAverageDataFromSensors = (sensors: Sensor[]): number[] => {
    let data_len: number = sensors.length;
    let data_avg: number[] = new Array(data_len).fill(0);
    for (let i = 0; i < data_len; i++) {
        for (let j = 0; j < sensors.length; j++) {
            data_avg[i] += sensors[j].data[i];
        }
        data_avg[i] /= sensors.length;
    }
    return data_avg;
};
