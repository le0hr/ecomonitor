#include "./gps/mqtt.h"
#include "./gps/wifi.h"
// #include "./gps/callback.h"


Mqtt::Mqtt(Wifi* wifi, const char* brokers_IP, const int brokers_port){
    topic ="gps1";
    testMessage = "TestMessage";
    mqttClient.setClient(wifi->wifiClient );
    Serial.print("Setting up connection to mqtt server");
    Serial.print("\n");
    mqttClient.setServer(brokers_IP, brokers_port);
    // mqttClient.setCallback(message_hendeling::callback);
    reconnect();


}

void Mqtt::reconnect(){
    while (!mqttClient.connected()){
        Serial.print("MQTT connection state: ");
        Serial.println(mqttClient.state());
        Serial.print("Attempting to connect to mqtt server...");
        Serial.print("\n");
        if (mqttClient.connect("ESP8266")){
            Serial.println("MQTT connected!");
            mqttClient.subscribe("gps1");
            mqttClient.publish(topic, testMessage);
        }  
        else{
            Serial.print("Failed, rc=");
            Serial.println(mqttClient.state());
            delay(500);
        }
    }

}