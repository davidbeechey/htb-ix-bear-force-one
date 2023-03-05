#include "sustainable_sensor.h"

SensorModule::SensorModule(String sensor_type, String display_name, String campus, String building, String room)
{
  sensor_type_ = sensor_type;
  display_name_ = display_name;
  campus_ = campus;
  building_ = building;
  room_ = room;

  // Connect to local network
  connectNetwork();

  display_.init();
  display_.backlight();

  display_.setCursor(0, 0);
  display_.print("Sustainability Meter");
  display_.setCursor(0, 2);
  display_.print("Status: ");
  display_.setCursor(0, 3);
  display_.print("Net: ");
};

void SensorModule::setValue(int value)
{
  sensor_value_ = value;
  return;
}

void SensorModule::displayValues(String message)
{
  int network_state = WiFi.status();
  display_.setCursor(0, 1);
  display_.print(display_name_);
  display_.setCursor(11, 1);
  display_.print(sensor_value_);
  display_.setCursor(8, 2);
  display_.print(message);
  display_.setCursor(5, 3);
  display_.print(network_states[network_state]);

  if (DEBUG_FLAG)
  {
    Serial.print(display_name_);
    Serial.println(sensor_value_);
    Serial.print("Status: ");
    Serial.println(message);
    Serial.print("Current network state code: ");
    Serial.println(network_state);
    sd_file_ = startSD(LOGS_FILE);
    if (sd_file_ != NULL)
    {
      sd_file_.print("Current network state code: ");
      sd_file_.println(network_state);
      sd_file_.close();
    }
  }
  // Try to reconnect if not connected
  if (network_state != WL_CONNECTED)
  {
    connectNetwork();
  }
  return;
}

void SensorModule::processData()
{
  if (WiFi.status() == WL_CONNECTED && client_.connected())
  {
    http_.begin(client_, DATA_SERVER);
    http_.addHeader("Content-Type", "application/json");
    String httpRequestData = "{\",\"key\":\"";
    httpRequestData += sensor_type_;
    httpRequestData += "\",\"campus\":\"";
    httpRequestData += campus_;
    httpRequestData += "\",\"location\":\"";
    httpRequestData += building_;
    httpRequestData += "-";
    httpRequestData += room_;
    httpRequestData += "\",\"data\":\"";
    httpRequestData += sensor_value_;
    httpRequestData == "\"}";
    int http_code = http_.POST(httpRequestData);
    if (DEBUG_FLAG)
    {
      Serial.println("HTTP POST Result: " + http_code);
    }
    http_.end();
  }
  else
  {
    if (DEBUG_FLAG)
    {
      sd_file_ = startSD(LOGS_FILE);
      if (sd_file_ != NULL)
      {
        sd_file_.print("Post unsuccessful. Network Status: ");
        sd_file_.println(network_states[WiFi.status()]);
        sd_file_.close();
      }

      Serial.print("Post unsuccessful. Network Status: ");
      Serial.println(network_states[WiFi.status()]);
    }
  }
  sd_file_ = startSD(RESULTS_FILE);
  if (sd_file_ != NULL)
  {
    sd_file_.println(sensor_value_);
    sd_file_.close();
  }
  return;
}

File SensorModule::startSD(String file_name)
{
  File file;
  if (SD.begin(SD_PIN))
  {
    file = SD.open(file_name, FILE_WRITE);
    file.print(millis());
    file.print(": ");
  }
  return file;
}

void SensorModule::connectNetwork()
{
  int network_state = WiFi.begin(SSID, PASSWORD);
  if (DEBUG_FLAG)
  {
    if (network_state == WL_CONNECTED)
    {
      local_ip_ = WiFi.localIP();
      Serial.print("Network connection established! Address: ");
      Serial.println(local_ip_);
    }
    else
    {
      Serial.print("Network connection failed. Code: ");
      Serial.println(network_states[network_state]);
    }
    sd_file_ = startSD(LOGS_FILE);
    if (sd_file_)
    {
      if (network_state == WL_CONNECTED)
      {
        sd_file_.print("Network connection established! Address: ");
        sd_file_.println(local_ip_);
      }
      else
      {
        sd_file_.print("Network connection failed. Code: ");
        sd_file_.println(network_states[network_state]);
      }
      sd_file_.close();
    }
  }
  return;
}