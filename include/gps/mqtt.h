#pragma once

#include <PubSubClient.h>

#include "wifi.h"

class Mqtt{
public:
    const char* topic;
    const char* testMessage;
    Mqtt(Wifi* wifi, const char* brokers_IP, const int brokers_port);
    void reconnect();
    PubSubClient mqttClient;
};