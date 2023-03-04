import { Sensor } from "@/app/types";
import { co2Score } from "@/functions/score";
import axios from 'axios'

const base_url: string = 'https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors';

export const request = async () => {
    const data = await axios.get(base_url).then((res) => res.data);
    return data
}

request().then((data) => {
    console.log(data)
}

