from fastapi import FastAPI
from fastapi_mqtt import FastMQTT, MQTTConfig
from config import settings
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import logging 
import datetime
import json

app = FastAPI()

mqtt_config = MQTTConfig(
    host=settings.mqtt_host,
    port=settings.mqtt_port,
    username=settings.mqtt_user,
    password=settings.mqtt_password,
    keepalive=60,
    version=5
)
conn_info = "dbname={0} user={1} password={2} host={3} port={4}".format(
    settings.db_name,
    settings.db_user,
    settings.db_password,
    settings.db_host,
    settings.db_port,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

fast_mqtt = FastMQTT(config=mqtt_config)
fast_mqtt.init_app(app)

@fast_mqtt.on_connect()
def connect(client, flags, rc, properties):
    logger.info("Connected: ")

@fast_mqtt.subscribe("Esp8266")
async def message_handler(client, topic, payload, qos, properties):
    logger.info(payload.decode())
    
    data = json.loads(payload.decode())
    data['time'] = datetime.datetime.fromtimestamp(float(data['time']))
    logger.info(data['time'])

    with psycopg2.connect(conn_info) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO sensor_readings (time, lpg, ch4, co, alcohol, benzene, hexane, lat, lng) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id, time",
                (data['time'], data['lpg'], data['ch4'], data['co'],
                  data['alcohol'], data['benzene'], data['hexane'], data['lat'],data['lng'])
            )
            user = cur.fetchone()
            logger.info(user)


@app.get("/")
async def get_data_from_db():
    with psycopg2.connect(conn_info) as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM sensor_readings LIMIT 100;",
            )
            data = cur.fetchall()
            for row in data:
                for key, value in row.items():
                    if isinstance(value, (datetime.datetime, datetime.date)):
                        row[key] = value.isoformat()
            
            return data


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=2000)