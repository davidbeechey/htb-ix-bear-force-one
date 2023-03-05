from mock_sensor import MockSensor, Mode
from typing import Callable
import time
import random

map_dict = {"Kings": ["Nucleus", "Sanderson", "JCMB", "Murchison",
                      "Fleeming_Jenkings", "Swann_Building", "Grant_Institute", "Alrick"],
            "Central": ["Appleton", "Informatics_Forum", "Potterow", "Teviot", "Business_School", "Gordon_Aikman_Theatre", "McEwan_Hall"],
            "Bioquarter": ["Chancellor's_Building", "Building_NNE", "Scottish_Centre_for_Regenarative_Medicine"]}
rooms = ["Room_1", "Room_2", "Room_3", "Room_4", "Room_5",
         "Room_6", "Room_7", "Room_8", "Room_9", "Room_10"]


def get_sensor_type(id: int) -> str:
    if (id == 1):
        return "co2"
    if (id == 2):
        return "energy"
    if (id == 3):
        return "water"
    if (id == 4):
        return "voc"


def co2_sensor_read(mode: Mode) -> int:
    if (mode == Mode.RANDOM):
        return random.randint(350, 10000)
    elif (mode == Mode.NORMAL):
        return random.randint(350, 800)
    elif (mode == Mode.CRITICAL):
        return random.randint(800, 1500)
    elif (mode == Mode.DANGER):
        return random.randint(1500, 10000)
    else:
        return random.randint(-5000, 0)


def energy_sensor_read(mode: Mode) -> int:
    if (mode == Mode.RANDOM):
        return random.randint(0, 1000000)
    elif (mode == Mode.NORMAL):
        return random.randint(100, 3000)
    elif (mode == Mode.CRITICAL):
        return random.randint(3000, 10000)
    elif (mode == Mode.DANGER):
        return random.randint(10000, 100000)
    else:
        return random.randint(-10000, 0)


def voc_sensor_read(mode: Mode) -> int:
    if (mode == Mode.RANDOM):
        return random.randint(0, 500)
    elif (mode == Mode.NORMAL):
        return random.randint(0, 3175)
    elif (mode == Mode.CRITICAL):
        return random.randint(175, 400)
    elif (mode == Mode.DANGER):
        return random.randint(400, 500)
    else:
        return random.randint(-500, 0)


def water_sensor_read(mode: Mode) -> int:
    if (mode == Mode.RANDOM):
        return random.randint(0, 1000000)
    elif (mode == Mode.NORMAL):
        return random.randint(100, 3000)
    elif (mode == Mode.CRITICAL):
        return random.randint(3000, 10000)
    elif (mode == Mode.DANGER):
        return random.randint(10000, 100000)
    else:
        return random.randint(-10000, 0)


def get_sensor_read(id: int, mode: Mode) -> Callable[[], int]:
    if (id == 1):
        return lambda: co2_sensor_read(mode)
    if (id == 2):
        return lambda: energy_sensor_read(mode)
    if (id == 3):
        return lambda: water_sensor_read(mode)
    if (id == 4):
        return lambda: voc_sensor_read(mode)


if __name__ == "__main__":
    mode = int(input(
        "Enter mode (1 : random, 2 : normal, 3 : critical, 4 : danger, 5 : invalid): "))
    if (mode < 1 or mode > 5):
        print("Invalid mode")
        exit()
    mode = Mode(mode)
    while (True):
        sensor_id = int(
            input("Enter sensor type (1 : co2, 2 : energy, 3 : water, 4 : voc): "))
        if (sensor_id < 1 or sensor_id > 4):
            print("Invalid sensor type")
            continue
        sensor_type = get_sensor_type(sensor_id)
        num_sensors = int(input("Enter number of sensors (max 10): "))
        if (num_sensors < 0 or num_sensors > 10):
            print("Invalid number of sensors")
            continue
        for i in range(num_sensors):
            campus = random.choice(list(map_dict.keys()))
            building = map_dict[campus][random.randint(
                0, len(map_dict[campus]) - 1)]
            room = rooms[random.randint(0, len(rooms) - 1)]
            sensor = MockSensor("University of Edinburgh", sensor_type, campus, building,
                                room, mode, get_sensor_read(sensor_id, mode))
            for i in range(10):
                response = sensor.post_to_api()
                time.sleep(0.1)
                if (response.status_code != 200):
                    print(response.json().get("msg"))
        cont = input("Continue? (y/n): ")
        if (cont == "y"):
            continue
        else:
            break
    print("Exiting...")
    exit()
