import { Sensor } from "@/app/types";

/**
 * Merges different CO2 and VOC sensor objects into one sensor object for overall air quality.
 * @param CO2 A CO2 sensor object.
 * @param VOC A VOC sensor object.
 */
export const mergeAirQuality = (CO2_sensor: Sensor, VOC_sensor: Sensor): Sensor[] | void => {};
