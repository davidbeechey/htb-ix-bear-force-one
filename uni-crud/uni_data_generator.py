import requests

URL = "https://nbmgmb9465.execute-api.eu-west-1.amazonaws.com/DEV/university"

if __name__ == "__main__":
  makeReq = lambda university, campuses, buildings: requests.post(URL, json={"university": university, "campuses": campuses, "buildings": buildings})

  makeReq("University of Oxford", ["Oxford", "Abingdon"], ["St. John's College", "Balliol College", "Magdalen College"])
  makeReq("University of Cambridge", ["Cambridge", "Newnham"], ["Trinity College", "St. John's College", "St. Catharine's College"])
  makeReq("University of London", ["London", "Birkbeck"], ["University College London", "King's College London", "Imperial College London"])
  makeReq("University of Bristol", ["Bristol", "Frenchay"], ["University of Bristol", "University of the West of England", "Bristol University"])
  makeReq("University of Birmingham", ["Birmingham", "Edgbaston"], ["University of Birmingham", "Birmingham City University", "University College Birmingham"])

