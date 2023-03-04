#include <sustainable_sensor.h>
#include "Adafruit_SGP40.h"
#include "Adafruit_SHT31.h"

#define CAMPUS "KB"
#define BUILDING "FJ"
#define ROOM "TLB"

// Define VOC Index values
#define VOC_TOO_HIGH 400
#define VOC_VERY_HIGH 300
#define VOC_HIGH 200
#define VOC_OKAY 100
#define VOC_EXCELLENT 0
const String sensor_status[5] = {"Dangerous", "Unhealthy", "Not ideal", "Good", "Excellent"};

// Initalise the VOC sensor and its data collection instance
Adafruit_SGP40 sgp;
Adafruit_SHT31 sht31;
uint16_t sraw;
int32_t voc_index;
SensorModule voc("VOC", "VOC Index: ", CAMPUS, BUILDING, ROOM);

void setup()
{
  if (DEBUG_FLAG)
  {
    Serial.begin(9600);
    Serial.println("Debug open");
  }
}

void loop()
{
  float temperature = sht31.readTemperature();
  float humidity = sht31.readHumidity();
  voc_index = sgp.measureVocIndex(temperature, humidity);
  int i;
  voc.setValue(voc_index);
  if (voc_index >= VOC_TOO_HIGH)
  {
    i = 0;
    digitalWrite(WARNING_BUZZER, HIGH);
    delay(250);
    digitalWrite(WARNING_BUZZER, LOW);
  }
  else if (voc_index >= VOC_VERY_HIGH)
  {
    i = 1;
  }
  else if (voc_index >= VOC_HIGH)
  {
    i = 2;
  }
  else if (voc_index >= VOC_OKAY)
  {
    i = 3;
  }
  else
  {
    i = 4;
  }
  voc.displayValues(sensor_status[i]);

  voc.sendData();

  delay(1000);
}
