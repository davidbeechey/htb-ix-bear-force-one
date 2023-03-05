# HTB IX - Bear Force One
## **Bear-ly Sustainable**

![flag](https://cdn.discordapp.com/attachments/1072492927047172146/1081543714901590057/flag.png)
![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)

### Overview
With a focus on the UN's Sustainable Development Goals, our project is a serverless solution provided to Universities for measuring, monitoring, and improving sustainability across multiple campuses. Data is gathered by a series of Arduino-based modules which upload gathered data to an online dashboard hosted with AWS.

The project allows for a high degree of scalability across universities of different sizes, with any number of possible sensor connections and configurations supported.

*Please note that no servers were harmed in the making of this project.*

### Software Overview

### Hardware Overview
![draw.io_summary](https://cdn.discordapp.com/attachments/1072492927047172146/1081838317726875698/HardwareSummary.png)

This project deploys several IoT microcontrollers to measure and collect data to be served online. All modules share a common design of:

- An ESP32 WiFi enabled microcontroller
- An LCD Display
- A sensor for monitoring the surrounding enviroment

This sensor can be customised and easily configured for use in the module prior to installation. An example of the module schematic can be found [here](https://github.com/davidbeechey/htb-ix-bear-force-one/blob/main/hardware/docs/Sensor%20Module%20Schematic.jpg). Once powered, the module maintains its internet connection and sends any gathered data to the internet for analysis. The LCD display allows users to observe the real time measurements from the sensor.

The current implementation supports measuring CO2 levels, generating a [VOC Index](https://en.wikipedia.org/wiki/Volatile_organic_compound), measuring the quality of drinking water from water fountains, and monitoring power usage.