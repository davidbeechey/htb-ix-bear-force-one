import requests
import random

URL = " https://wvhaz86wh2.execute-api.eu-west-1.amazonaws.com/DEV/goals"


university = ["University of Edinburgh", "University of Bristol",
              "University of Birmingham", "University of Cambridge", "University of London"]


def makeReq(university: str):
    data = requests.post(URL, json={"university": university, "co2_concentration": mock_co2_goal(),
                                    "voc_index": mock_voc_goal(), "energy_consumption": mock_energy_goal(), "tds_solids": mock_water_goal()})
    return data.status_code


def mock_co2_goal() -> int:
    return random.randint(400, 2001)


def mock_voc_goal() -> int:
    return random.randint(0, 500)


def mock_energy_goal() -> int:
    return random.randint(0, 5001)


def mock_water_goal() -> int:
    return random.randint(0, 500)


if __name__ == "__main__":
    for uni in university:
        req_result = makeReq(uni)
        if (req_result != 200):
            print("Error in making request for " + uni)
