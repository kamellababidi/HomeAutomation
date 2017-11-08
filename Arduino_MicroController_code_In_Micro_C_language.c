char data = 0;                                                       // declaring a data variable  that will store the data from the server.
int counter = 0;                                                     // declaring a counter  variable  that will store the number of motions detected.
int pirPin = 4;                                                      // declaring a pirPin  variable  that will store the number of the pin that the pir "The Motion sensor"  will be connected to.
int tempSenPin = A1;                                                 // declaring a temperature pin   variable  that will store the number of the pin that the temperature sensor   will be connected to.
int lightSenPin = A0;                                                // declaring a light sensor pin variable  that will store the number of the pin that the light sensor will be connected to.
int lightPin = 10;                                                   // declaring a light pin   variable  that will store the number of the pin that the light will be connected to.
float lightVolt;                                                     // lightVolt is a variable that will store the voltage of the light sensor;
float tempVolt;                                                      // tempVolt is a variable that will store the voltage of the temperature sensor;
int tempCel;                                                         // tempCel is a variable that sores the value of the temperature in celsius;
float tempSum;                                                       // A variable that stores the sum of the of temperature measuring rounds;
int fanPin = 2;                                                      // declaring a fan pin variable  that will store the number of the pin that the fan will be connected to.
int buzzer = 8;                                                      // The variable that stores the the pin number of the buzzer "The tool that we use to make sound in emergency cases";
float gasVolt;                                                       // The variable that stores the value of the gas sensor voltage ;
float gasVal;                                                        // The variable that stored the value of the output of the gas sensor before calulating the voltage;
int gasPin = A2;                                                     // The variablr that stores the pin number of the gas sensor;
int on = 1;                                                          // on is the variable that sores the value of 1 as digital number wich means 5 volts in circuits and it will turn  on the device connected to this pin;
int off = 0;                                                         // off is the variable that sores the value of 0 as digital number wich means 0 volts in circuits and it will turn  on the device connected to this pin;




// The function that calculates the temperature and display the value of it on the serial
void tempCalulatot() {
  tempSum = 0;
  for (int i = 0; i < 10; i++) {
    tempVolt = analogRead(tempSenPin);
    delay(10);
    tempSum = tempSum + tempVolt;
  }
  tempCel = tempSum / 29.5 + 100;
  Serial.print(tempCel);

  delay(1000);
}



// the function that check the gas status and make alram when gas leaking detedted
void gasAlert() {
  gasVal = analogRead(gasPin);
  gasVolt = gasVal / 1024 * 5.0;
  if (gasVolt > 1) {
    Serial.write('g');
    digitalWrite(buzzer, on);
    delay(2000);
    digitalWrite(buzzer, 0);
  }
  else if (gasVolt <= 1) {
    //    Serial.print("f");
    digitalWrite(buzzer, 0);
  }
  delay(100);
}



// the function that detetects the motion and gives alert if amotion detected
void detectMotion() {
  counter = 0;
  for (int i = 0 ; i < 100 ; i++) {
    if ( digitalRead(pirPin) == 1) {
      counter ++ ;
    }
  }
  if (counter > 50) {
    Serial.flush() ;
    Serial.write('y');
    Serial.flush() ;
    for (int i = 0; i < 8; i++) {
      digitalWrite(buzzer, on);
      delay(200);
      digitalWrite(buzzer, off);
      delay(100);
    }
    digitalWrite(buzzer, off);

  }
  if (counter <= 50) {
    Serial.flush() ;

    Serial.write('n');

    Serial.flush() ;
    digitalWrite(buzzer, off);
  }

}



// the function that turn the light on
void turnLightOn() {
  digitalWrite(lightPin, on);
}


// the function that turn the light off
void turnLightOff() {
  digitalWrite(lightPin, off);
}



// this function is turning the light on or off automatically depending on the amount of the light around the sensor
void autoLight() {
  lightVolt = analogRead(lightSenPin);
  //  Serial.print( "Volt");
  //  Serial.println( lightVolt);
  if (lightVolt < 50)
    turnLightOn();
  if (lightVolt > 120)
    turnLightOff();
}



// the function that turns on the fan
void turnFanOn() {
  digitalWrite(2, on);
}


// the function that turns off the fan
void turnFanOff() {
  digitalWrite(fanPin, off);
}




// the main function in arduino code here we define the setup of the arduino and determin the output and input pins
void setup()
{
  Serial.begin(9600);
  pinMode(fanPin, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(lightPin, OUTPUT);
  pinMode(lightSenPin, INPUT);
  pinMode(lightSenPin, INPUT);
  pinMode(gasPin, INPUT);
}




// the loop function in arduino this function makes arduino iterates the code so we can run the code for ever not only once
void loop()
{
  autoLight();
  if (Serial.available() > 0) {
    data = Serial.read();
    if (data == 'i') {
      gasAlert();
    }
    if (data == 't') {
      tempCalulatot();
    }
    if (data == 'd' ) {
      detectMotion();
    }
    if (data == '1') {
      turnFanOn();
    }
    if (data == '0') {
      turnFanOff();
    }
    if (data == '2') {
      turnLightOn();
    }
    if (data == '3') {
      turnLightOff();
    }

  }
}

