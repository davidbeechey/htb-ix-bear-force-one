import requests

URL = " https://wvhaz86wh2.execute-api.eu-west-1.amazonaws.com/DEV/goals"

if __name__ == "__main__":
  def makeReq(university, co2_concentration, voc_index, energy_consumption, tds_solids): 
    data = requests.post(URL, json={"university": university, "co2_concentration": co2_concentration, "voc_index": voc_index, "energy_consumption": energy_consumption, "tds_solids": tds_solids}) 
    print(data.status_code)

  makeReq("University of Oxford", 0.5, 0.5, 0.5, 0.5)
  makeReq("University of Cambridge", 0.5, 0.5, 0.5, 0.5)
  makeReq("University of London", 0.5, 0.5, 0.5, 0.5)
  makeReq("University of Bristol", 0.5, 0.5, 0.5, 0.5)

