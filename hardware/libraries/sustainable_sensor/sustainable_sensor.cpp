#include "sustainable_sensor.h"

SensorModule::SensorModule(String display_name, String location)
{
  display_name = display_name;
  location_ = location;
  int network_status;
  bool data_server_status;

  // Connect to local network, get real time, and connect to data server
  network_status = WiFi.begin(SSID, PASSWORD);
  data_server_status = client.connect(data_server, DATA_SERVER_PORT);

  display.init();
  display.backlight();

  display.setCursor(0, 0);
  display.print("Sustainability Meter");
  display.setCursor(0, 2);
  display.print("Status: ");
  display.setCursor(0, 3);
  display.print("Net: ");
};

void SensorModule::setValue(int value)
{
  sensor_value_ = value;
  return;
}

void SensorModule::displayValues(String message)
{
  display.setCursor(0, 1);
  display.print(display_name_);
  display.setCursor(11, 1);
  display.print(sensor_value_);
  display.setCursor(8, 2);
  display.print(message);
  return;
}

void SensorModule::sendData()
{
  if (WiFi.status() == WL_CONNECTED && client.connected())
  {
    // TODOLater: Make a better POST fucntion than this!
    client.write(sensor_value_);
  }
  else
  {
    networkConnect();
  }
  return;
}

void SensorModule::networkConnect()
{
  // TODOLater: Deal with this 😎
  return;
}
