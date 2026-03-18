from fastapi_mqtt import FastMQTT, MQTTConfig
from config import settings
from .logic import process_mqtt_payload
import logging

mqtt_config = MQTTConfig(
    host=settings.mqtt_host,
    port=settings.mqtt_port,
    username=settings.mqtt_user,
    password=settings.mqtt_password,
    keepalive=60,
    version=5,
)

fast_mqtt = FastMQTT(config=mqtt_config)


def init_mqtt(app):
    fast_mqtt.init_app(app)


@fast_mqtt.on_connect()
def connect(client, flags, rc, properties):
    logging.info("MQTT connected")


@fast_mqtt.subscribe("Esp8266")
async def message_handler(client, topic, payload, qos, properties):
    payload_str = payload.decode()
    logging.info("MQTT payload: %s", payload_str)
    process_mqtt_payload(payload_str)

