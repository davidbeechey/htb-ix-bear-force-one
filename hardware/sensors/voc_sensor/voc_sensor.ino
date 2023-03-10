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
    if(SD.begin(SD_PIN)){
      sd_file_ = SD.open(LOGS_FILE, FILE_WRITE);
      sd_file_.print(millis());
      sd_file_.print(": ");
      sd_file_.println("Debug begin.");
      sd_file_.close();
    }
    Serial.println("Debug begin");
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
  voc.displayNetworkStatus();
  delay(1000);
}
