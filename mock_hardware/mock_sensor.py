import requests
from enum import Enum
from typing import Callable


# Modes of operation for mocking
class Mode(Enum):
    """
    RANDOM: random values from the range a typical sensor would have
    NORMAL: nominal values form the relevant sensor
    CRITICAL: values from the sensor that would indicate a potential issue
    DANGER: values from the sensor that would indicate a serious issue
    INVALID: values that the sensor would never have, but are used to test error handling
    """
    RANDOM = 1
    NORMAL = 2
    CRITICAL = 3
    DANGER = 4
    INVALID = 5


# Base class for all mock sensors
class MockSensor():
    """
    Class for mocking any type of sensor
    @param sensor_type: the type of sensor
    @param university: the university the sensor is located on
    @param campus: the campus the sensor is located on
    @param building: the building the sensor is located in
    @param room: the room the sensor is located in
    @param mode: the mode of operation for the sensor
    @param sensor_read: a function that returns a value from the sensor
    @return: a MockSensor object
    """
    # defining the api-endpoint
    API_ENDPOINT = "https://0ux3uyru60.execute-api.eu-west-1.amazonaws.com/DEV/sensors"

    def __init__(self, university: str, sensor_type: str, campus: str, building: str, room: str, mode: Mode, sensor_read: Callable[[], int]):
        self.sensor_type = sensor_type
        self.university = university
        self.campus = campus
        self.building = building
        self.room = room
        self.mode = mode
        self.sensor_read = sensor_read

    # return a typical value from the sensor (depending on the mode)
    def read(self) -> int:
        return self.sensor_read()

    # return the https response
    def post_to_api(self) -> int:
        sensor_reading = self.read()
        data = {'key': self.sensor_type,
                'location': self.building + ' - ' + self.room,
                'campus': self.campus,
                'data': sensor_reading,
                'university': self.university}
        # sending post request and saving response as response object
        r = requests.post(url=MockSensor.API_ENDPOINT, json=data)
        return r
