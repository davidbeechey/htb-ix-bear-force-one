import requests
import random
from enum import Enum


# defining the api-endpoint
API_ENDPOINT = "https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors"


class Mode(Enum):
    RANDOM = 1
    NORMAL = 2
    CRITICAL = 3
    DANGER = 4
    INVALID = 5


class CO2Mock:
    def __init__(self, campus, buidling, room, mode: Mode):
        self.campus = campus
        self.building = buidling
        self.room = room
        self.mode = mode

    def get_co2_reading(self):
        if (self.mode == Mode.RANDOM):
            return random.randint(350, 10000)
        elif (self.mode == Mode.NORMAL):
            return random.randint(350, 800)
        elif (self.mode == Mode.CRITICAL):
            return random.randint(800, 1500)
        elif (self.mode == Mode.DANGER):
            return random.randint(1500, 10000)
        else:
            return random.randint(-5000, 0)

    def post_to_api(self):
        co2_reading = self.get_co2_reading()
        data = {'key': 'co2_mock',
                'location': self.campus + ' - ' + self.building + ' - ' + self.room,
                'data': co2_reading}
        # sending post request and saving response as response object
        r = requests.post(url=API_ENDPOINT, json=data)
        return r.status_code
