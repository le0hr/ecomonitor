#include "./modules/gps.h"
#include <iostream>

Gps::Gps() {
    Serial.println("GPS: Setting up GPS");
    // init gps variables
    TXPin = 17;
    RXPin = 16;
    GPSBaud = 9600;
    bus = new SoftwareSerial(RXPin, TXPin);
    bus->begin(GPSBaud);
}
Gps::~Gps(){
}
void Gps::update() {
    while (bus->available()) {
        GPS.encode(bus->read());
    }
}
bool Gps::getPosition(double* lng, double* lat) {
    if (GPS.location.isValid()) {
        *lat = GPS.location.lat();
        *lng = GPS.location.lng();
        return true;
    }
    return false;
}