#include <sustainable_sensor.h>
#include <CO2Sensor.h>

#define CO2_AIN 14

#define CO2_INERTIAL_COEFF 0.99
#define CO2_NUM_OF_READINGS 100

// Define CO2 ppm values
#define CO2_TOO_HIGH 900
#define CO2_HIGH 750
#define CO2_OKAY 500
#define CO2_EXCELLENT 400

const bool DEBUG_FLAG = false;

// Initalise the CO2 sensor and its data struct
SensorModule co2("CO2 (ppm): ", "AT");
CO2Sensor co2Sensor (CO2_AIN, CO2_INERTIAL_COEFF, CO2_NUM_OF_READINGS);

void setup() {
  if(DEBUG_FLAG){
    Serial.begin(9600);
    Serial.println("Debug open");
  }
}

void loop() {
  int val = co2Sensor.read();
  int i;
  co2.setValue(val);
  if(val >= CO2_TOO_HIGH){
    i = 0;
    digitalWrite(WARNING_BUZZER, HIGH);
    delay(250);
    digitalWrite(WARNING_BUZZER, LOW);
  }
  else if(val >= CO2_HIGH){
    i = 1;
  }
  else if(val >= CO2_OKAY){
    i = 2;
  }
  else{
    i = 3;
  }
  co2.displayValues(sensor_status[i]);
  
  co2.sendData();

  delay(1000);
}
