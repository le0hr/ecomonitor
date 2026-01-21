#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <esp_wireguard.h>
#include <PubSubClient.h>
#include <time.h>

// test wifi config
const char* ssid = "SSID";
const char* password = "12345678";

// wireguard vpn init
wireguard_config_t wg_config = ESP_WIREGUARD_CONFIG_DEFAULT();
wireguard_ctx_t ctx = {0};
esp_err_t err = ESP_FAIL;
esp_err_t esp_wireguard_init(wireguard_config_t *config, wireguard_ctx_t *ctx);

//mqtt and network init
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); 
    Serial.print("Connecting");
  }
  
  // time sync
  // (crutial for wg)
  configTime(2 * 3600, 0, "pool.ntp.org");

  // wg config
  wg_config.private_key ="WI3i8RI7NOM2NbI0eUHkGoFCgXloD1oXwLaCAiSZDW8=";
  wg_config.listen_port = 2008;
  wg_config.public_key = "EKJ1ewjni0n826dkHW+qh+tqjpDfGsdEooDR02rAylo=";
  wg_config.endpoint = "109.227.64.208";
  wg_config.port = 2008;
  wg_config.address = "10.10.0.2";
  wg_config.preshared_key = NULL;
  wg_config.netmask = "255.255.255.0";
  
  // start up of wg client
  err = esp_wireguard_init(&wg_config, &ctx);
  Serial.print(err);

  // connecting to host
  err = esp_wireguard_connect(&ctx);

  Serial.print(err);

}

void loop() {
  
}