#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <network_info.h>

#define DEBUG_FLAG false

#define WARNING_BUZZER 13

const String network_status[3] = {"Connected", "Disconnected", "Failed"};

// Network constants and objects
static WiFiClient client;
static HTTPClient http;

// Set display address, and display dimensions
static LiquidCrystal_I2C display(0x27, 20, 4);

class SensorModule
{
public:
  SensorModule(String sensor_type, String display_name, String campus, String building, String room);
  void displayValues(String message);
  void setValue(int value);
  void sendData();
  void networkConnect();

private:
  String sensor_type_;
  String display_name_;
  String campus_;
  String building_;
  String room_;
  int sensor_value_;
};
