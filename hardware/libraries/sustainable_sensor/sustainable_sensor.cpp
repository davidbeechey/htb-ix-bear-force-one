#include <sustainable_sensor.h>

Sensor Sensor::Sensor(string display_name, string location)
  : display_name_(display_name),
    location_(location),
  {
    int network_status;
    bool data_server_status;

    // Connect to local network, get real time, and connect to data server
    network_status = Wifi.begin(SSID, PASSWORD);
    data_server_status = client.connect(data_server, DATA_SERVER_PORT);
    
    display.init();
    display.backlight();

    display.setCursor(0,0);
    display.print("Sustainability Meter");
    display.setCursor(0,2);
    display.print("Status: ");
    display.setCursor(0,3);
    display.print("Net: ");
  };

void Sensor::setValue(int value){
  sensor_value_ = value;
  return;
}

void Sensor::displayValues(string message){
  display.setCursor(0,1);
  display.print(display_name_);
  display.setCursor(11,1);
  display.print(sensor_value_);
  display.setCursor(8,2);
  display.print(message)
  return;
}

void Sensor::networkConnect(){
  //Deal with this later 😎
}
