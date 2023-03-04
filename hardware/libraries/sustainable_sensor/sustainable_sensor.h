#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <network_info.h>

#define WARNING_BUZZER 13

const String sensor_status[4] = {"Unhealthy", "Not ideal", "Good", "Excellent"};
const String network_status[3] = {"Connected", "Disconnected", "Failed"};

// Set display address, and display dimensions
static LiquidCrystal_I2C display(0x27, 20, 4);

// Define the data server
static IPAddress data_server(127, 0, 0, 1);
static WiFiClient client;

class SensorModule
{
public:
  SensorModule(String display_name, String location);
  void displayValues(String message);
  void setValue(int value);
  void sendData();
  void networkConnect();

private:
  String display_name_;
  String location_;
  int sensor_value_;
};
