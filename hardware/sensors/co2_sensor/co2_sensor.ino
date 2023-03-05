#include <sustainable_sensor.h>
#include <CO2Sensor.h>

#define CAMPUS "CENTRAL"
#define BUILDING "AT"
#define ROOM "AT5.04"

#define CO2_AIN A0

#define CO2_INERTIAL_COEFF 0.99
#define CO2_NUM_OF_READINGS 100

// Define CO2 ppm values
#define CO2_TOO_HIGH 3500
#define CO2_VERY_HIGH 2000
#define CO2_HIGH 1000
#define CO2_OKAY 800
#define CO2_EXCELLENT 400

// Initalise the CO2 sensor and its data collection instance
SensorModule co2("CO2", "CO2 (ppm): ", CAMPUS, BUILDING, ROOM);
CO2Sensor co2Sensor(CO2_AIN, CO2_INERTIAL_COEFF, CO2_NUM_OF_READINGS);

void setup()
{
  if (DEBUG_FLAG)
  {
    Serial.begin(9600);
    Serial.println("Debug begin");
    sd_file_ = co2.startSD(LOGS_FILE);
    if(sd_file_){
      sd_file_.println("Debug begin.");
      sd_file_.close();
    }
  }
  pinMode(CO2_AIN, INPUT);
}

void loop()
{
  int val = co2Sensor.read();
  int i;
  co2.setValue(val);
  if (val >= CO2_TOO_HIGH)
  {
    i = 0;
    digitalWrite(WARNING_BUZZER, HIGH);
    delay(250);
    digitalWrite(WARNING_BUZZER, LOW);
  }
  else if (val >= CO2_VERY_HIGH)
  {
    i = 1;
  }
  else if (val >= CO2_HIGH)
  {
    i = 2;
  }
  else if (val >= CO2_OKAY)
  {
    i = 3;
  }
  else
  {
    i = 4;
  }
  co2.displayValues(sensor_status[i]);
  if(WiFi.status() != WL_CONNECTED){
    co2.connectNetwork();
  }
  co2.processData();
  delay(1000);
}
