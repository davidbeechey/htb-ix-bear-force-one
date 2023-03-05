#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include <SD.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <network_info.h>

#define DEBUG_FLAG false

#define WARNING_BUZZER 5
#define SD_PIN 10
#define LOGS_FILE "logs.txt"
#define RESULTS_FILE "results.txt"

const String sensor_status[5] = {"Dangerous", "Bad", "Satisfactory", "Good", "Excellent"};
const String network_states[7] = {"Idle", "SSID Not Found", "Scan Complete", "Connected", "Failed", "Lost", "Disconnected"};

// Network objects
static WiFiClient client;
static HTTPClient http;

// Set display address, and display dimensions
static LiquidCrystal_I2C display(0x27, 20, 4);

static File sd_file_;

class SensorModule
{
public:
  SensorModule(String sensor_type, String display_name, String campus, String building, String room);
  void setValue(int value);

  /**
   * @brief Print module info to the LCD display
   */
  void displayValues(String message);

  /**
   * @brief Send module data to the data server
   *        via HTTP/POST
   */
  void sendData();

  /**
   * @brief Confirm if network is available and print
   *        current network status to the LCD display
   */
  void displayNetworkStatus();

private:
  String sensor_type_;
  String display_name_;
  String campus_;
  String building_;
  String room_;
  int sensor_value_;
};
