// Original source code: https://wiki.keyestudio.com/KS0429_keyestudio_TDS_Meter_V1.0#Test_Code

#include <sustainable_sensor.h>

#define CAMPUS "CENTRAL"
#define BUILDING "40GS"
#define ROOM "LTC"

#define TDS_AIN A0
#define VREF 5.0              // analog reference voltage(Volt) of the ADC
#define SCOUNT  30            // sum of sample point

// Define TDS Index values
#define TDS_TOO_HIGH 400
#define TDS_VERY_HIGH 300
#define TDS_HIGH 200
#define TDS_OKAY 100
#define TDS_EXCELLENT 0

// TDS Variables
int analogBuffer[SCOUNT];     // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0;
int copyIndex = 0;
float averageVoltage = 0;
float tdsValue = 0;
float temperature = 16;       // current temperature for compensation

// Initalise the TDS sensor data collection instance
SensorModule tds("TDS", "TDS (ppm): ", CAMPUS, BUILDING, ROOM);

void setup(){
  if (DEBUG_FLAG)
  {
    Serial.begin(9600);
    Serial.println("Debug begin");
    sd_file_ = tds.startSD(LOGS_FILE);
    if(sd_file_){
      sd_file_.println("Debug begin.");
      sd_file_.close();
    }
  }
  pinMode(TDS_AIN,INPUT);
}

void loop(){
  getTDSValue();
  int i;
  tds.setValue((int)tdsValue);
  if (tdsValue >= TDS_TOO_HIGH)
  {
    i = 0;
    digitalWrite(WARNING_BUZZER, HIGH);
    delay(250);
    digitalWrite(WARNING_BUZZER, LOW);
  }
  else if (tdsValue >= TDS_VERY_HIGH)
  {
    i = 1;
  }
  else if (tdsValue >= TDS_HIGH)
  {
    i = 2;
  }
  else if (tdsValue >= TDS_OKAY)
  {
    i = 3;
  }
  else
  {
    i = 4;
  }
  tds.displayValues(sensor_status[i]);
  if(WiFi.status() != WL_CONNECTED){
    tds.connectNetwork();
  }
  tds.processData();
  delay(1000);
}

// Median filtering algorithm
int getMedianNum(int bArray[], int iFilterLen){
  int bTab[iFilterLen];
  for (byte i = 0; i<iFilterLen; i++)
  bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0){
    bTemp = bTab[(iFilterLen - 1) / 2];
  }
  else {
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  }
  return bTemp;
}

void getTDSValue(){
  static unsigned long analogSampleTimepoint = millis();
  if(millis()-analogSampleTimepoint > 40U){     //every 40 milliseconds,read the analog value from the ADC
    analogSampleTimepoint = millis();
    analogBuffer[analogBufferIndex] = analogRead(TDS_AIN);    //read the analog value and store into the buffer
    analogBufferIndex++;
    if(analogBufferIndex == SCOUNT){ 
      analogBufferIndex = 0;
    }
  }   
  
  static unsigned long printTimepoint = millis();
  if(millis()-printTimepoint > 800U){
    printTimepoint = millis();
    for(copyIndex=0; copyIndex<SCOUNT; copyIndex++){
      analogBufferTemp[copyIndex] = analogBuffer[copyIndex];
      
      // read the analog value more stable by the median filtering algorithm, and convert to voltage value
      averageVoltage = getMedianNum(analogBufferTemp,SCOUNT) * (float)VREF / 1024.0;
      
      //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0)); 
      float compensationCoefficient = 1.0+0.02*(temperature-25.0);
      //temperature compensation
      float compensationVoltage=averageVoltage/compensationCoefficient;
      
      //convert voltage value to tds value
      tdsValue = (133.42*compensationVoltage*compensationVoltage*compensationVoltage - 255.86*compensationVoltage*compensationVoltage + 857.39*compensationVoltage)*0.5;
    }
  }
}
