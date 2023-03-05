# HTB IX - Bear Force One
## **Bear-ly Sustainable**

![flag](https://cdn.discordapp.com/attachments/1072492927047172146/1081844162955055174/flag.png)
![contributors_badge](https://img.shields.io/github/contributors/davidbeechey/htb-ix-bear-force-one)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/davidbeechey/htb-ix-bear-force-one)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/davidbeechey/htb-ix-bear-force-one)
![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)


### Overview
With a focus on the UN's Sustainable Development Goals, our project is a serverless solution provided to Universities for measuring, monitoring, and improving sustainability across multiple campuses. Data is gathered by a series of Arduino-based modules which upload gathered data to an online dashboard hosted with AWS.

The project allows for a high degree of scalability across universities of different sizes, with any number of possible sensor connections and configurations supported.

*Please note that no servers were harmed in the making of this project.*

<p align="center">
  <strong style=”font-size: 150%;”>Our Focuses:</strong> 
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/58626285/222949829-eebf8624-2294-474c-bfe3-ac87cc1ffa42.png" width="100" height="100">
  <img src="https://user-images.githubusercontent.com/58626285/222949840-a8d25fbd-723b-4c42-961c-ab624364206f.png" width="100" height="100">
  <img src="https://user-images.githubusercontent.com/58626285/222949897-6e4e58b8-b1d9-47d5-9b2e-526a85794e57.png" width="100" height="100">
</p>


### Software Overview

![software_architecture](https://cdn.discordapp.com/attachments/760925116992585812/1081849623959851018/Screenshot_2023-03-05_at_08.04.01.png)

The project employs a serverless architecture leveraging AWS Lambda and AWS DynamoDB to create rest APIs which are used by both our IOT enabled sensing platforms (described below) as well as the management frontend. The lambda functions are written in Javascript with the AWS-SDK and deployed as REST APIs using AWS's Web API gateway. 

While we were able to design our hardware systems, due to the time constraints we weren't enable to create it physically. Therefore, we implemented some random data generation script for testing nominal behaviour using uniform random data as well as critical and failure conditions using out of bounds values.

Our frontend is powered by Next.js as well as Tailwind CSS and deployed by Vercel to a serverless cloud provider. We picked this stack due to familiarity but also ease of use, which was demonstrated when several members of our team with almost no frontend experience were able to prototype and design components with relative ease. 

To avoid possible cybersecurity failures as well as reduce complexity, we used Auth0 as our authentication and authorisation platforms. We used Auth0 to implement login, registering and authorisation middleware. This also allows out platform to scale with relative ease when a potential user growth spike occurs. 

We are firm believers in open source data and would prioritise the data dashboard being public for democratisation of data but also holding universities accountable to their _self assigned_ goals as well as international standards. 

#### *Scoring Algorithm*
The algorithm measures how close our sensor reading is to the goal set by the user. It uses dynamic weightage based on how near the reading is to the goal set. If the reading is below the goal, we made it so that the actual distance (% difference) to the goal is multiplied by a decreasing weightage as the reading gets near the goal. The motivation behind this is essentially getting users to push closer towards their goal regardless of how far away they are at the moment - the actual increase in sustainability gives a bigger rise in the sustainability score when the gap between current readings and goal is wide.  

On the other hand, if the readings are greater than the goal, the weightage applied increases as the reading gets further away from the goal. This penalty enforces the idea that values beyond the possible goal values indicate a less than desirable circumstance. For example, in the case of our CO2 sensors, values above 2000 indicate possible adverse health effects which should definitely be avoided. 

For the overall sustainable score, we simply average scores across all sensors for an organization. 

### Hardware Overview
![draw.io_summary](https://cdn.discordapp.com/attachments/1072492927047172146/1081838317726875698/HardwareSummary.png)

This project deploys several IoT microcontrollers to measure and collect data to be served online. All modules share a common design of:

- An ESP32 WiFi enabled microcontroller
- An LCD Display
- A sensor for monitoring the surrounding enviroment

This sensor can be customised and easily configured for use in the module prior to installation. An example of the module schematic is shown below. Once powered, the module maintains its internet connection and sends any gathered data to the internet for analysis. The ESP32 was chosen both for its ease of use and familiarity, being programmable in C++, and also for having WiFi capabilities included out-the-box. The LCD display allows users to observe the real time measurements from the sensor on the module itself. If values become critical, a buzzer sounds to alert nearby users of the problem.

The current implementation supports measuring CO2 levels, generating a [VOC Index](https://en.wikipedia.org/wiki/Volatile_organic_compound), measuring the quality of drinking water from water fountains, and monitoring power usage. However, as stated before, code for any additional type of sensor can be implemented with ease.

![image](https://github.com/davidbeechey/htb-ix-bear-force-one/blob/main/hardware/docs/Sensor%20Module%20Schematic.jpg)

## SGD Innovation Goals:

#### *Innovation / Creativity:*

We make use of the current best and affordable tech. The specifics about the software and hardware have been mentioned above!

#### *Impact:*
Our idea and implementation can be picked up by any university but it is not necessarily limited to it. Since we monitor buildings themselves, anyone, anywhere can use our solution and check their sustainability score easily. Our hope is to push for a more sustainable city in general and we hope by being able to track scores (and filter by the different factors affecting it), we incentivise our users to strive for a more sustainable environment.

#### *Feasability:*

We strived to make our solution as afforadable as possible, and with that in mind, provide a breakdown of potential costs below:
- [ESP32 microcontroller](https://www.mouser.co.uk/ProductDetail/Espressif-Systems/ESP32-DevKitC-32E?qs=GedFDFLaBXFpgD0kAZWDrQ%3D%3D&mgh=1&vip=1&gclid=Cj0KCQiA9YugBhCZARIsAACXxeJ89AZzJ2C-8a7q3wvQzPK-0x3hb9HcdMbImyLcVQLG3rJoBKit30AaAl5vEALw_wcB) - £9.92 
- [Youmile IIC/I2C/TWI Serial LCD Display](https://www.amazon.co.uk/Youmile-Serial-Display-Backlight-Arduino/dp/B099F2KPR4/ref=asc_df_B099F2KPR4/?tag=googshopuk-21&linkCode=df0&hvadid=534996565582&hvpos=&hvnetw=g&hvrand=6720465128582679622&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9046888&hvtargid=pla-1416553735824&psc=1) - £8.29 
- [MG-11 CO2 sensor]( https://www.aliexpress.com/item/32859295115.html?spm=a2g0o.productlist.main.19.39a01927a36rqo&algo_pvid=08b62301-6c97-4dd5-b3d5-ac6210a5c745&algo_exp_id=08b62301-6c97-4dd5-b3d5-ac6210a5c745-9&pdp_ext_f=%7B%22sku_id%22%3A%2265339769524%22%7D&pdp_npi=3%40dis%21GBP%2127.91%2123.17%21%21%21%21%21%402100b5dc16779989712215429d06d7%2165339769524%21sea%21UK%210&curPageLogUid=R0w5ZzSfRu67
) - £23.17
- Our in-house smart meter (to measure energy consumption) - £50  
- Total for a pack of each individual sensor: £91.38 (sensor pack)

#### *Additional Costs (estimates):*
- setting up cost / building - £25
- travel cost - £20 (based on current petrol prices and considering max travel distance to roughly 150km) (assuming 10.58km/L of tank can be travelled at 147.56 pence per litre)
- AWS hosting cost - depends on user-base (ignoring in calculation)

**Results**:   
Assuming each building takes 4 sensor packs and there are 4 buildings on one campus, the total price for a campus would be £1,583.68 *(4 * 4 * 91.48 + 4 * 25 + 20)* - rounding up -> £1,600
