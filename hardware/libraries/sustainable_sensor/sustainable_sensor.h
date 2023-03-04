#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <CO2Sensor.h>
#include <network_info.h>

#define WARNING_BUZZER 13

const string sensor_status[4] = {"Unhealthy", "Not ideal", "Good", "Excellent"};
const string network_status[3] = {"Connected", "Disconnected", "Failed"};

// Set display address, and display dimensions
LiquidCrystal_I2C display(0x27,20,4);
    
// Define the data server
static IPAddress data_server(127,0,0,1);
WiFiClient client;

class Sensor{
  Sensor(string display_name, string location, int sensor_value);
  void displayValues(string message);
  void setValue(int value);
  void networkConnect();

  private:
    string display_name_;
    string location_;
    int sensor_value_;
}