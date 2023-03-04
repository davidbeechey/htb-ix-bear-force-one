import { Sensor } from "@/app/types";

/**
 * Merges different CO2 and VOC sensor objects into one sensor object for overall air quality.
 * @param CO2 A CO2 sensor object.
 * @param VOC A VOC sensor object.
 */
export const mergeAirQuality = (CO2_sensor: Sensor, VOC_sensor: Sensor): Sensor | void => {
    let merged: Sensor = {
        location: CO2_sensor.location,
        data: {
            ...CO2_sensor.data,
            datasets: [{
                data: CO2_sensor.data.datasets[0].data.map(function (data, index) { return [data, VOC_sensor.data.datasets[0].data[index]].reduce((a, b) => a + b, 0) / 2 })
            }]
        }
    }
    return merged;
};
