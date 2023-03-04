#include <sustainable_sensor.h>

#define DEBUG_FLAG False

#define CO2_AIN 14

#define CO2_INTERIAL_COEFF 0.99
#define CO2_NUM_OF_READINGS 100

// Define CO2 ppm values
#define CO2_TOO_HIGH 900
#define CO2_HIGH 750
#define CO2_OKAY 500
#define CO2_EXCELLENT 400

void setup() {
  if(DEBUG_FLAG){
    Serial.begin(9600);
    Serial.println("Debug open");
  }

  // Initalise the CO2 sensor and its data struct
  SensorModule co2("CO2 (ppm): ", ) ;
  CO2Sensor co2Sensor (CO2_AIN, CO2_INERTIAL_COEFF, CO2_NUM_OF_READINGS);
}

void loop() {
  int val = co2Sensor.read();
  co2.setValue(val);
  if(val >= CO2_TOO_HIGH){
    i = 0;
    digitalWrite(BUZZER, HIGH);
    delay(250);
    digitalWrite(BUZZER, LOW);
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
  co2.displayValues(status_messages[i]);
  
  if(Wifi.status() == WL_CONNECTED && client.connected()){
    //TODOLater: Make a better POST fucntion than this!
    client.write(co2_data);
  }
  else{
    co2.networkConnect();
  }
  delay(1000);
}
